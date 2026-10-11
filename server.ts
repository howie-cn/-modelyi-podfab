import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { initDatabase, getOrders, insertOrder, updateOrderStatus } from './server/db';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Support JSON request bodies
  app.use(express.json());

  // Initialize DB asynchronously
  const dbOk = await initDatabase();
  console.log(`[DB Status] Core Database Status: ${dbOk ? 'SECURE_ONLINE' : 'FALLBACK_LOCAL_STORE'}`);

  // 1. API: Fetch Orders from DB
  app.get('/api/orders', async (req, res) => {
    try {
      const orders = await getOrders();
      res.json({ success: true, orders });
    } catch (error) {
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  });

  // 2. API: Submit New Order to DB
  app.post('/api/orders', async (req, res) => {
    try {
      const orderData = req.body;
      if (!orderData || !orderData.id) {
        res.status(400).json({ success: false, error: 'Malformed order payload' });
        return;
      }
      
      const newOrder = await insertOrder(orderData);
      res.json({ success: true, order: newOrder });
    } catch (error) {
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  });

  // 2b. API: Update Order Status in DB
  app.put('/api/orders/:id/status', async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      if (!status) {
        res.status(400).json({ success: false, error: 'Missing required field: status' });
        return;
      }
      const updated = await updateOrderStatus(id, status);
      if (updated) {
        res.json({ success: true, message: 'Order status updated successfully' });
      } else {
        res.status(404).json({ success: false, error: 'Order not found or no change' });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  });

  // 3. API: Database status indicator
  app.get('/api/db-status', (req, res) => {
    res.json({
      status: 'online',
      usingPostgres: dbOk,
      schema: 'dev',
      user: 'podfab',
      host: '8.136.93.213:5432'
    });
  });

  // Vite integration and static asset serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('[Mode] Running in development mode with active Vite middleware.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('[Mode] Serving compiled static assets in production mode.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Under system control. Podfab is listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
