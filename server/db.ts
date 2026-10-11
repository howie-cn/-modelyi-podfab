import pg from 'pg';

const connectionString = 'postgresql://podfab:Podfab_1324@8.136.93.213:5432/podfab';

export const pool = new pg.Pool({
  connectionString,
  ssl: false,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

let isConnected = false;

// Seed orders in memory fallback
export interface DbOrder {
  id: string;
  productType: string;
  imageUrl: string | null;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  color: string;
  size: string;
  status: string;
  timestamp: string;
}

export const inMemoryOrders: DbOrder[] = [
  {
    id: 'POD-847291',
    productType: 'Acrylic',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
    customerName: '王思齐',
    customerPhone: '138****5920',
    customerAddress: '上海市徐汇区龙腾大道智能云创园5栋3楼',
    color: '水晶双层板材',
    size: '常限比例 15cm',
    status: 'shipping',
    timestamp: '2026-06-04T10:15:30Z'
  },
  {
    id: 'POD-395720',
    productType: 'Mug',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    customerName: '李林楠',
    customerPhone: '159****2384',
    customerAddress: '北京市朝阳区三里屯高定工艺坊5号仓',
    color: '哑致微晶黑',
    size: '标准装 350ml',
    status: 'firing',
    timestamp: '2026-06-05T08:30:15Z'
  },
  {
    id: 'POD-204859',
    productType: 'Pillow',
    imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop',
    customerName: '张墨涵',
    customerPhone: '177****1010',
    customerAddress: '深圳市南山区科技园北重工合伙总部',
    color: '抗菌慢回弹天丝柔滑绒',
    size: '轻奢方形 48x48cm',
    status: 'printing',
    timestamp: '2026-06-05T12:05:44Z'
  }
];

export async function initDatabase() {
  try {
    console.log('[DB] Connecting to PostgreSQL at 8.136.93.213...');
    const client = await pool.connect();
    isConnected = true;
    console.log('[DB] PostgreSQL connected successfully.');

    // 1. Create Schema
    await client.query('CREATE SCHEMA IF NOT EXISTS dev;');
    console.log('[DB] Verified "dev" schema existence.');

    // 2. Create Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS dev.orders (
        id VARCHAR(50) PRIMARY KEY,
        product_type VARCHAR(50) NOT NULL,
        image_url TEXT,
        customer_name VARCHAR(100) NOT NULL,
        customer_phone VARCHAR(50) NOT NULL,
        customer_address TEXT NOT NULL,
        color VARCHAR(100),
        size VARCHAR(100),
        status VARCHAR(50) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('[DB] Verified "dev.orders" table structure.');

    // 3. Seed Table if empty
    const checkCount = await client.query('SELECT COUNT(*) FROM dev.orders;');
    const count = parseInt(checkCount.rows[0].count, 10);
    if (count === 0) {
      console.log('[DB] Orders table is empty. Seeding initial records...');
      for (const order of inMemoryOrders) {
        await client.query(`
          INSERT INTO dev.orders (
            id, product_type, image_url, customer_name, customer_phone, customer_address, color, size, status, created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `, [
          order.id,
          order.productType,
          order.imageUrl,
          order.customerName,
          order.customerPhone,
          order.customerAddress,
          order.color,
          order.size,
          order.status,
          order.timestamp
        ]);
      }
      console.log('[DB] Finished seeding database records.');
    }

    client.release();
    return true;
  } catch (error) {
    console.error('[DB] PostgreSQL initialization failed:', error);
    isConnected = false;
    return false;
  }
}

export async function getOrders(): Promise<DbOrder[]> {
  if (!isConnected) {
    console.warn('[DB] Fallback to In-Memory storage: getOrders()');
    return inMemoryOrders;
  }

  try {
    const res = await pool.query('SELECT * FROM dev.orders ORDER BY created_at DESC;');
    return res.rows.map(row => ({
      id: row.id,
      productType: row.product_type,
      imageUrl: row.image_url,
      customerName: row.customer_name,
      customerPhone: row.customer_phone,
      customerAddress: row.customer_address,
      color: row.color,
      size: row.size,
      status: row.status,
      timestamp: row.created_at.toISOString(),
    }));
  } catch (error) {
    console.error('[DB] Failed to query dev.orders:', error);
    return inMemoryOrders;
  }
}

export async function insertOrder(order: Omit<DbOrder, 'timestamp'>): Promise<DbOrder> {
  const timestamp = new Date().toISOString();
  if (!isConnected) {
    console.warn('[DB] Fallback to In-Memory storage: insertOrder()');
    const newOrder: DbOrder = { ...order, timestamp };
    inMemoryOrders.unshift(newOrder);
    return newOrder;
  }

  try {
    await pool.query(`
      INSERT INTO dev.orders (
        id, product_type, image_url, customer_name, customer_phone, customer_address, color, size, status, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `, [
      order.id,
      order.productType,
      order.imageUrl,
      order.customerName,
      order.customerPhone,
      order.customerAddress,
      order.color,
      order.size,
      order.status,
      timestamp
    ]);
    return { ...order, timestamp };
  } catch (error) {
    console.error('[DB] Failed to insert dev.orders:', error);
    const newOrder: DbOrder = { ...order, timestamp };
    inMemoryOrders.unshift(newOrder);
    return newOrder;
  }
}

export async function updateOrderStatus(id: string, status: string): Promise<boolean> {
  // Update in-memory fallback
  const fallbackIdx = inMemoryOrders.findIndex(o => o.id === id);
  if (fallbackIdx >= 0) {
    inMemoryOrders[fallbackIdx].status = status;
  }

  if (!isConnected) {
    return true;
  }

  try {
    const res = await pool.query(
      'UPDATE dev.orders SET status = $1 WHERE id = $2',
      [status, id]
    );
    return (res.rowCount ?? 0) > 0;
  } catch (error) {
    console.error(`[DB] Failed to update order status for ${id}:`, error);
    return false;
  }
}

