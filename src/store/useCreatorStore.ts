import { create } from 'zustand';

export type ProductType = 'Mug' | 'Acrylic' | 'Bedding' | 'Pillow' | 'Sticker' | 'Toy' | 'BlindBox' | 'Blanket' | 'Tapestry';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface CustomOrder {
  id: string;
  productType: ProductType;
  imageUrl: string | null;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  color: string;
  size: string;
  status: 'planning' | 'printing' | 'firing' | 'assembling' | 'shipping' | 'completed';
  timestamp: string;
}

interface CreatorState {
  imageUrl: string | null;
  uploadedBlueprintUrl: string | null; // holds the uploaded user design blueprint
  chatHistory: ChatMessage[];
  selectedProduct: ProductType;
  orderStatus: string;
  isGenerating: boolean;
  orderStep: 'design' | 'configure' | 'checkout' | 'success'; // for workspace orchestration
  orders: CustomOrder[];
  latestOrderId: string | null;
  
  setImageUrl: (url: string | null) => void;
  setUploadedBlueprintUrl: (url: string | null) => void;
  addMessage: (msg: Omit<ChatMessage, 'id'>) => void;
  setSelectedProduct: (product: ProductType) => void;
  setOrderStatus: (status: string) => void;
  setOrderStep: (step: 'design' | 'configure' | 'checkout' | 'success') => void;
  handleGenerate: (prompt: string) => Promise<void>;
  handleUploadBlueprint: (url: string, actionType: 'direct' | 'ai-modify') => Promise<void>;
  handleModifyBlueprint: (prompt: string) => Promise<void>;
  submitOrderToERP: (customerInfo: { name: string; phone: string; address: string; color?: string; size?: string }) => Promise<void>;
  addOrder: (order: CustomOrder) => Promise<void>;
  fetchOrders: () => Promise<void>;
  updateOrderStatus: (id: string, status: CustomOrder['status']) => Promise<boolean>;
}

export const useCreatorStore = create<CreatorState>((set, get) => ({
  imageUrl: null,
  uploadedBlueprintUrl: null,
  chatHistory: [
    { id: '1', role: 'assistant', content: '您好，我是您的专属 AI 设计助理。请在下方选择：1. 提供自定义设计图直接提交/修改； 2. 通过创意提示词由 AI 全新生成。' }
  ],
  selectedProduct: 'Mug',
  orderStatus: 'idle',
  isGenerating: false,
  orderStep: 'design',
  latestOrderId: null,
  orders: [
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
  ],

  setImageUrl: (url) => set({ imageUrl: url }),
  setUploadedBlueprintUrl: (url) => set({ uploadedBlueprintUrl: url }),
  
  addMessage: (msg) => set((state) => ({ 
    chatHistory: [...state.chatHistory, { ...msg, id: Math.random().toString(36).substring(7) }] 
  })),
  
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  
  setOrderStatus: (status) => set({ orderStatus: status }),
  
  setOrderStep: (step) => set({ orderStep: step }),

  handleGenerate: async (prompt: string) => {
    set({ isGenerating: true });
    get().addMessage({ role: 'user', content: prompt });
    get().addMessage({ role: 'assistant', content: 'AI 正在分析提示词并渲染高精度模型中，请稍候...' });

    // 2-second simulation delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const imageUrls: Record<ProductType, string> = {
      'Mug': 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1000&auto=format&fit=crop',
      'Acrylic': 'https://images.unsplash.com/photo-1621360841013-c76831f13c6b?q=80&w=1000&auto=format&fit=crop',
      'Bedding': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1000&auto=format&fit=crop',
      'Pillow': 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop',
      'Sticker': 'https://images.unsplash.com/photo-1608155686393-8fdd966d784d?q=80&w=1000&auto=format&fit=crop',
      'Toy': 'https://images.unsplash.com/photo-1559251606-c623743a6d76?q=80&w=1000&auto=format&fit=crop',
      'BlindBox': 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop',
      'Blanket': 'https://images.unsplash.com/photo-1543294001-f7cbfe92237e?q=80&w=1000&auto=format&fit=crop',
      'Tapestry': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop'
    };

    set((state) => {
      const history = [...state.chatHistory];
      history.pop(); // Remove "rendering..."
      history.push({ 
        id: Math.random().toString(36).substring(7),
        role: 'assistant', 
        content: `已为您的高端定制 [${state.selectedProduct}] 完成模型渲染工作。您可以进行查看和细节调整，或随即提交生产。` 
      });

      return {
        chatHistory: history,
        imageUrl: imageUrls[state.selectedProduct] || imageUrls['Mug'],
        isGenerating: false,
        orderStep: 'configure'
      };
    });
  },

  handleUploadBlueprint: async (url: string, actionType: 'direct' | 'ai-modify') => {
    set({ isGenerating: true, uploadedBlueprintUrl: url });
    get().addMessage({ role: 'user', content: `[上传自定义设计图] (${actionType === 'direct' ? '直接确认排版' : '需要 AI 协同微调'})` });
    
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (actionType === 'direct') {
      get().addMessage({ role: 'assistant', content: '设计图已成功接收，已将您的原图无损投影至生成式实物渲染底版。已帮您开启生产通道。' });
      set((state) => ({
        imageUrl: url, // Directly use uploaded blueprint for quick preview
        isGenerating: false,
        orderStep: 'configure'
      }));
    } else {
      get().addMessage({ role: 'assistant', content: '设计底稿已加载。请在下方输入您的“修改微调指令”（例如：叠加黄金镶边，或者转换成赛博朋克极简风格）。' });
      set({
        imageUrl: url,
        isGenerating: false,
        orderStep: 'design' // Stay on design step to receive prompt instructions
      });
    }
  },

  handleModifyBlueprint: async (prompt: string) => {
    set({ isGenerating: true });
    get().addMessage({ role: 'user', content: `修改指令: ${prompt}` });
    get().addMessage({ role: 'assistant', content: 'AI Co-designer 正在融合原有设计图与您的微调指令，重新运算高保真贴图...' });

    // Simulate blending original blueprint with creative edits
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Refined premium mockup results
    const modifiedImages: Record<ProductType, string> = {
      'Mug': 'https://images.unsplash.com/photo-1517256064527-09c53b2d0ec6?q=80&w=1000&auto=format&fit=crop',
      'Acrylic': 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop',
      'Bedding': 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1000&auto=format&fit=crop',
      'Pillow': 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?q=80&w=1000&auto=format&fit=crop',
      'Sticker': 'https://images.unsplash.com/photo-1572945281861-18dd8a287878?q=80&w=1000&auto=format&fit=crop',
      'Toy': 'https://images.unsplash.com/photo-1599740831146-80a527efe30b?q=80&w=1000&auto=format&fit=crop',
      'BlindBox': 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1000&auto=format&fit=crop',
      'Blanket': 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?q=80&w=1000&auto=format&fit=crop',
      'Tapestry': 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000&auto=format&fit=crop'
    };

    set((state) => {
      const history = [...state.chatHistory];
      // pop loading
      history.pop();
      history.push({
        id: Math.random().toString(36).substring(7),
        role: 'assistant',
        content: `恭喜！设计图已根据指令「${prompt}」调整完毕。高精度 [${state.selectedProduct}] 贴图已合成为全新的高端成品方案。`
      });

      return {
        chatHistory: history,
        imageUrl: modifiedImages[state.selectedProduct] || modifiedImages['Mug'],
        isGenerating: false,
        orderStep: 'configure'
      };
    });
  },

  submitOrderToERP: async (customerInfo) => {
    const { imageUrl, selectedProduct } = get();
    set({ orderStatus: 'submitting' });
    
    const newOrderId = `POD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: CustomOrder = {
      id: newOrderId,
      productType: selectedProduct,
      imageUrl: imageUrl,
      customerName: customerInfo.name || '特邀设计师',
      customerPhone: customerInfo.phone || '未绑定号码',
      customerAddress: customerInfo.address || '标准自提仓',
      color: customerInfo.color || '默认配色',
      size: customerInfo.size || '标准规格',
      status: 'planning',
      timestamp: new Date().toISOString()
    };
    
    const payload = {
      ai_design_file_url: imageUrl,
      product_type: selectedProduct,
      customer_info: customerInfo,
      order_id: newOrderId,
      timestamp: new Date().toISOString()
    };
    
    console.log("=== [Zustand Store] Pushing Custom Order payload to database endpoint ===");
    console.log(JSON.stringify(payload, null, 2));

    await new Promise(resolve => setTimeout(resolve, 1500)); // smooth visual feedback

    try {
      const resp = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrder)
      });
      const data = await resp.json();
      if (data.success && data.order) {
        set((state) => ({ 
          orderStatus: 'success',
          orderStep: 'success',
          latestOrderId: newOrderId,
          orders: [data.order, ...state.orders]
        }));
        return;
      }
    } catch (e) {
      console.error('[Store] Failed to sync order with database, fallback to memory', e);
    }

    set((state) => ({ 
      orderStatus: 'success',
      orderStep: 'success',
      latestOrderId: newOrderId,
      orders: [newOrder, ...state.orders]
    }));
  },

  addOrder: async (order) => {
    try {
      const resp = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      });
      const data = await resp.json();
      if (data.success && data.order) {
        set((state) => ({
          orders: [data.order, ...state.orders]
        }));
        return;
      }
    } catch (e) {
      console.error('[Store] Failed to sync added order with database, fallback to memory', e);
    }
    set((state) => ({
      orders: [order, ...state.orders]
    }));
  },

  fetchOrders: async () => {
    try {
      const resp = await fetch('/api/orders');
      const data = await resp.json();
      if (data.success && data.orders) {
        set({ orders: data.orders });
      }
    } catch (e) {
      console.error('[Store] Failed to fetch live orders from database:', e);
    }
  },

  updateOrderStatus: async (id, status) => {
    try {
      const resp = await fetch(`/api/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      const data = await resp.json();
      if (data.success) {
        set((state) => ({
          orders: state.orders.map(o => o.id === id ? { ...o, status } : o)
        }));
        return true;
      }
    } catch (e) {
      console.error(`[Store] Failed to update status of ${id} in backend:`, e);
    }
    // Fallback/Opt-out update
    set((state) => ({
      orders: state.orders.map(o => o.id === id ? { ...o, status } : o)
    }));
    return false;
  }
}));
