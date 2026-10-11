import React, { useState, useEffect } from 'react';
import { 
  BarChart2, 
  Search, 
  Filter, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  Truck, 
  RefreshCw, 
  Database,
  Layers,
  Wand2,
  ChevronDown
} from 'lucide-react';
import { useCreatorStore, type CustomOrder } from '../store/useCreatorStore';
import { useLanguageStore } from '../store/useLanguageStore';
import { getTranslation } from '../store/translations';

export function Dashboard() {
  const { language } = useLanguageStore();
  const { orders, fetchOrders, updateOrderStatus } = useCreatorStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Auto-refresh orders list on mount
  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    await fetchOrders();
    setIsLoading(false);
  };

  const handleStatusChange = async (orderId: string, newStatus: CustomOrder['status']) => {
    setUpdatingId(orderId);
    await updateOrderStatus(orderId, newStatus);
    setUpdatingId(null);
  };

  // Translations
  const tx = {
    title: language === 'ZH' ? '智能中央生产看板 / ERP Dashboard' : 'Central Fabrication ERP Dashboard',
    subtitle: language === 'ZH' ? '实时调谐、追踪并校正由 AI 智造注入 PostgreSQL 中枢的全链路订单。' : 'Real-time pipeline monitoring, tracking, and management for DB orders.',
    totalCount: language === 'ZH' ? '总物化队列 (Total Orders)' : 'Total Queue',
    pendingLabel: language === 'ZH' ? '待产/规划中 (Planning)' : 'Planning/Pending',
    activeLabel: language === 'ZH' ? '精工熔铸中 (In Production)' : 'In Fabrication',
    shippedLabel: language === 'ZH' ? '空地标准发运 (Shipped & Deliv.)' : 'Dispatched',
    searchPlaceholder: language === 'ZH' ? '搜索委托人姓名、订单号或联系电话...' : 'Search by ID, name, phone...',
    refreshTooltip: language === 'ZH' ? '同步数据库状态' : 'Sync Database State',
    tableID: language === 'ZH' ? 'ERP 编号' : 'ID',
    tableProduct: language === 'ZH' ? '定制类型' : 'Product',
    tableRecipient: language === 'ZH' ? '收领人 / 委托人' : 'Recipient',
    tableSpecs: language === 'ZH' ? '工艺规格' : 'Specifications',
    tableStatus: language === 'ZH' ? '智造阶段' : 'Fabrication State',
    tableActions: language === 'ZH' ? '现场调度' : 'Operations',
    noOrders: language === 'ZH' ? '未找到匹配的工况订单' : 'No matching orders found.',
    dbOnline: language === 'ZH' ? '安全中枢: PostgreSQL 安全连接 (dev)' : 'Data Source: PostgreSQL Server (dev.orders)',
    statusOptions: {
      planning: language === 'ZH' ? '智能排单及AI校对' : 'AI Overlook & Planning',
      printing: language === 'ZH' ? '直喷印花中' : 'Active Direct Printing',
      firing: language === 'ZH' ? '碳窑二次精烧' : '1200℃ Kiln Firing',
      assembling: language === 'ZH' ? '手工质量精修' : 'Manual QA Finishing',
      shipping: language === 'ZH' ? '已发运配送中' : 'Shipped & Transit',
      completed: language === 'ZH' ? '已送达签收' : 'Completed & Closed',
    }
  };

  // Calculate statistics
  const totalOrdersCount = orders.length;
  const planningCount = orders.filter(o => o.status === 'planning').length;
  const inProgressCount = orders.filter(o => ['printing', 'firing', 'assembling'].includes(o.status)).length;
  const shippedCount = orders.filter(o => ['shipping', 'completed'].includes(o.status)).length;

  // Filter orders
  const filteredOrders = orders.filter(order => {
    // Search query match
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery);

    if (!matchesSearch) return false;

    // Status filter match
    if (statusFilter === 'all') return true;
    if (statusFilter === 'pending') return order.status === 'planning';
    if (statusFilter === 'printing') return order.status === 'printing';
    if (statusFilter === 'firing') return order.status === 'firing';
    if (statusFilter === 'assembling') return order.status === 'assembling';
    if (statusFilter === 'shipping') return order.status === 'shipping';
    if (statusFilter === 'completed') return order.status === 'completed';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8 pb-20 w-full text-slate-800 terminal-mode-text-green">
      
      {/* Header with Title and DB Connection status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-xs text-slate-500 flex items-center gap-1.5 uppercase">
              <Database size={12} className="text-emerald-500" />
              {tx.dbOnline}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-sans uppercase tracking-tight text-slate-900 border-b-2 border-transparent terminal-mode-border">
            {tx.title}
          </h2>
          <p className="text-sm font-mono text-slate-500 mt-1">{tx.subtitle}</p>
        </div>

        {/* Action controls */}
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className={`px-4 py-2.5 border-2 border-slate-300 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-mono text-xs uppercase flex items-center gap-2 cursor-pointer transition-all ${
            isLoading ? 'opacity-60 pointer-events-none' : ''
          }`}
          title={tx.refreshTooltip}
        >
          <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
          {isLoading ? 'SYNCING...' : 'FORCE REFRESH'}
        </button>
      </div>

      {/* Grid of Interactive Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        
        {/* Metric card 1 */}
        <div className="p-5 bg-white border border-slate-200/80 rounded-2xl flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
            <Layers size={22} />
          </div>
          <div>
            <div className="text-2xl font-black font-sans tracking-tight text-slate-950">{totalOrdersCount}</div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">{tx.totalCount}</div>
          </div>
        </div>

        {/* Metric card 2 */}
        <div className="p-5 bg-white border border-slate-200/80 rounded-2xl flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Clock size={22} />
          </div>
          <div>
            <div className="text-2xl font-black font-sans tracking-tight text-amber-600">{planningCount}</div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">{tx.pendingLabel}</div>
          </div>
        </div>

        {/* Metric card 3 */}
        <div className="p-5 bg-white border border-slate-200/80 rounded-2xl flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <TrendingUp size={22} />
          </div>
          <div>
            <div className="text-2xl font-black font-sans tracking-tight text-blue-600">{inProgressCount}</div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">{tx.activeLabel}</div>
          </div>
        </div>

        {/* Metric card 4 */}
        <div className="p-5 bg-white border border-slate-200/80 rounded-2xl flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Truck size={22} />
          </div>
          <div>
            <div className="text-2xl font-black font-sans tracking-tight text-emerald-600">{shippedCount}</div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">{tx.shippedLabel}</div>
          </div>
        </div>

      </div>

      {/* Table search and filters bar */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search input */}
        <div className="relative w-full md:w-96">
          <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
            <Search size={16} />
          </span>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={tx.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-sans text-xs placeholder:text-slate-400 text-slate-800 transition-all focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto items-center">
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1 uppercase mr-2">
            <Filter size={12} />
            Filter:
          </span>
          {[
            { id: 'all', label: language === 'ZH' ? '全览 (All)' : 'All' },
            { id: 'pending', label: language === 'ZH' ? '排单 (Pending)' : 'Pending' },
            { id: 'printing', label: language === 'ZH' ? '直喷 (Printing)' : 'Printing' },
            { id: 'firing', label: language === 'ZH' ? '精烧 (Firing)' : 'Firing' },
            { id: 'assembling', label: language === 'ZH' ? '检测精修' : 'Finishing' },
            { id: 'shipping', label: language === 'ZH' ? '配送中' : 'Shipped' },
            { id: 'completed', label: language === 'ZH' ? '已签收' : 'Completed' },
          ].map((itm) => (
            <button
              key={itm.id}
              onClick={() => setStatusFilter(itm.id)}
              className={`px-3 py-1.5 font-mono text-[11px] uppercase border rounded-lg cursor-pointer transition-colors ${
                statusFilter === itm.id 
                  ? 'bg-slate-900 border-slate-900 text-white font-bold' 
                  : 'bg-white border-slate-300 text-slate-600 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {itm.label}
            </button>
          ))}
        </div>

      </div>

      {/* Orders Summary Master Table */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono uppercase tracking-wider select-none font-semibold">
                <th className="py-4 px-5 w-24">{tx.tableID}</th>
                <th className="py-4 px-4 w-32">{tx.tableProduct}</th>
                <th className="py-4 px-5">{tx.tableRecipient}</th>
                <th className="py-4 px-5">{tx.tableSpecs}</th>
                <th className="py-4 px-5 w-48">{tx.tableStatus}</th>
                <th className="py-4 px-5 w-48 text-right">{tx.tableActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-mono text-sm">
                    {tx.noOrders}
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    
                    {/* ID */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <span className="font-mono font-bold text-slate-900 select-all">{order.id}</span>
                    </td>
                    
                    {/* Product */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        {order.imageUrl ? (
                          <img 
                            src={order.imageUrl} 
                            alt={order.productType} 
                            referrerPolicy="no-referrer"
                            className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-3xs"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                            <Wand2 size={12} />
                          </div>
                        )}
                        <span className="font-bold text-slate-800">{order.productType}</span>
                      </div>
                    </td>

                    {/* Recipient */}
                    <td className="py-4 px-5">
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-900">{order.customerName}</div>
                        <div className="text-[10px] font-mono text-slate-400">{order.customerPhone}</div>
                        <div className="text-[10px] text-slate-500 break-all max-w-xs line-clamp-1" title={order.customerAddress}>
                          {order.customerAddress}
                        </div>
                      </div>
                    </td>

                    {/* Specs */}
                    <td className="py-4 px-5 text-slate-600">
                      <div className="space-y-0.5">
                        <div className="font-medium text-slate-800">{order.color}</div>
                        <div className="text-[10px] font-mono text-slate-500">{order.size}</div>
                      </div>
                    </td>

                    {/* Status badge */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <StatusBadge status={order.status} labels={tx.statusOptions} />
                    </td>

                    {/* Operations dropdown / state machine shifter */}
                    <td className="py-4 px-5 whitespace-nowrap text-right">
                      <div className="inline-flex items-center">
                        {updatingId === order.id ? (
                          <span className="text-[10px] font-mono text-slate-400 animate-pulse flex items-center gap-1 uppercase">
                            <RefreshCw size={10} className="animate-spin" />
                            updating...
                          </span>
                        ) : (
                          <div className="relative group/opt">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value as CustomOrder['status'])}
                              className="px-2 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-lg text-[11px] font-mono text-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-slate-400 transition-colors"
                            >
                              <option value="planning">📋 {tx.statusOptions.planning}</option>
                              <option value="printing">🖨️ {tx.statusOptions.printing}</option>
                              <option value="firing">🔥 {tx.statusOptions.firing}</option>
                              <option value="assembling">🛠️ {tx.statusOptions.assembling}</option>
                              <option value="shipping">📦 {tx.statusOptions.shipping}</option>
                              <option value="completed">✅ {tx.statusOptions.completed}</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

// Internal reusable lightweight status badge with color coding
function StatusBadge({ status, labels }: { status: CustomOrder['status']; labels: any }) {
  let colorStyle = 'text-gray-600 bg-gray-50 border-gray-200';
  let emoji = '📋';

  switch (status) {
    case 'planning':
      colorStyle = 'text-amber-600 bg-amber-50 border-amber-200';
      emoji = '📋';
      break;
    case 'printing':
      colorStyle = 'text-blue-600 bg-blue-50 border-blue-200';
      emoji = '🖨️';
      break;
    case 'firing':
      colorStyle = 'text-orange-600 bg-orange-50 border-orange-200';
      emoji = '🔥';
      break;
    case 'assembling':
      colorStyle = 'text-purple-600 bg-purple-50 border-purple-200';
      emoji = '🛠️';
      break;
    case 'shipping':
      colorStyle = 'text-indigo-600 bg-indigo-50 border-indigo-200';
      emoji = '📦';
      break;
    case 'completed':
      colorStyle = 'text-emerald-600 bg-emerald-50 border-emerald-200';
      emoji = '✅';
      break;
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono leading-none rounded-full border ${colorStyle}`}>
      <span>{emoji}</span>
      <span>{labels[status] || status}</span>
    </span>
  );
}
