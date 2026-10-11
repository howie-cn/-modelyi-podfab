import React, { useState } from 'react';
import { useCreatorStore, type CustomOrder, type ProductType } from '../store/useCreatorStore';
import { Package, Search, ChevronRight, CheckCircle2, Clock, Truck, ShieldCheck, Cpu, ArrowRight, CornerDownRight, RefreshCw } from 'lucide-react';

export function OrderTracker() {
  const { orders, fetchOrders } = useCreatorStore();
  const [searchId, setSearchId] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || '');

  React.useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  React.useEffect(() => {
    if (!selectedOrderId && orders.length > 0) {
      setSelectedOrderId(orders[0].id);
    }
  }, [orders, selectedOrderId]);

  // Find currently selected order details
  const activeOrder = orders.find(o => o.id.toLowerCase() === selectedOrderId.toLowerCase() || o.id.toLowerCase() === searchId.trim().toLowerCase()) 
    || orders.find(o => o.id === selectedOrderId) 
    || orders[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    const found = orders.find(o => o.id.toLowerCase() === searchId.trim().toLowerCase());
    if (found) {
      setSelectedOrderId(found.id);
    }
  };

  // Human friendly names for status
  const STATUS_DETAILS = {
    planning: { label: '智能排单及AI校对', color: 'text-amber-600 bg-amber-50 border-amber-200' },
    printing: { label: '直喷印花中', color: 'text-blue-600 bg-blue-50 border-blue-200' },
    firing: { label: '1200℃窑炉缎烧中', color: 'text-orange-600 bg-orange-50 border-orange-200' },
    assembling: { label: '纯手质量核检级精修中', color: 'text-purple-600 bg-purple-50 border-purple-200' },
    shipping: { label: '已发货，配送中', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    completed: { label: '已送达签收', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' }
  };

  // Define logical stages for selected item based on type
  const getStages = (order: CustomOrder) => {
    const isMug = order.productType === 'Mug';
    const isBedding = order.productType === 'Bedding';
    const isBlanket = order.productType === 'Blanket';
    const isTapestry = order.productType === 'Tapestry';
    
    // Customize core terms
    const mediumAction = isMug 
      ? '1200℃ 高温还原精密二次入窑缎烧' 
      : isBedding 
        ? '大宽幅无阻尼纺织整经与活性渗透印染' 
        : isBlanket
          ? '双面高弹短长丝毛羽高温渗墨热升华透透染'
          : isTapestry
            ? '巨幅涤纶面料激光裁剪封口与热度定型'
            : '98%光感晶敏片多维五轴激光雕刻';

    const qualityAction = isMug
      ? '瓷骨抗热震冷喷级防裂检测与杯口覆膜'
      : isBedding
        ? '六十支贡缎预缩水汽熨平与全拼缝错位质检'
        : isBlanket
          ? '亲肤去静电阻尼检验与微尘手工深度净化'
          : isTapestry
            ? '超宽画幅悬挂抗皱校验与防脱线双排牙合锁边检查'
            : '双面防刮高保真保护套件装夹';

    const baseStages = [
      {
        title: 'AI 自动化排版与手稿深度分辨率重构',
        desc: '智能大模型核算矢量投影曲面公式，补偿拉伸膨胀形变率，生成无损物理定位文件。',
        time: '下单 10 秒内',
        status: 'completed'
      },
      {
        title: '物性原厂基底选取与参数匹配校准',
        desc: `分拣高端 ${order.color} 胚件。校准特调环保耗材比例与微落差喷排厚度。`,
        time: '下单 10 分钟内',
        status: 'completed'
      },
      {
        title: mediumAction,
        desc: '工业高精物理模组精准控制运行，彻底令图纸理念融合为微分子纤维或晶质结构。',
        time: '智造工序 // 加工中',
        status: 'active'
      },
      {
        title: qualityAction,
        desc: '精工师傅全程人工二次精修切边除尘。历经热敏、浸水、防油、抗跌摔三位一体育留检验。',
        time: '等待前序工艺完成',
        status: 'pending'
      },
      {
        title: '包装与发货',
        desc: '安全防震环保打包，交由物流中心发往目的地。',
        time: '等待出货揽件',
        status: 'pending'
      }
    ];

    // Adjust status highlights based on actual order status
    if (order.status === 'shipping' || order.status === 'completed') {
      baseStages[2].status = 'completed';
      baseStages[3].status = 'completed';
      baseStages[4].status = 'completed';
      baseStages[2].time = '智造成品合格';
      baseStages[3].time = '质检测试通过';
      baseStages[4].time = '物流配送中';
    } else if (order.status === 'assembling') {
      baseStages[2].status = 'completed';
      baseStages[2].time = '智造成品合格';
      baseStages[3].status = 'active';
      baseStages[3].time = '精磨校核质控中';
    } else if (order.status === 'printing' || order.status === 'firing') {
      // stages[2] is active
    } else if (order.status === 'planning') {
      baseStages[1].status = 'active';
      baseStages[1].time = '胚料排定与温差控制测算中';
      baseStages[2].status = 'pending';
    }

    return baseStages;
  };

  const stages = activeOrder ? getStages(activeOrder) : [];

  return (
    <div id="tracker-view" className="w-full bg-[#fcfcfc] text-gray-900 font-sans min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Title */}
        <div className="text-left space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-white text-[10px] font-mono tracking-widest uppercase">
            <Cpu size={12} className="text-purple-400" />
            <span>FABRICATION TRACKING CENTER</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight">智造生产追踪中心</h1>
          <p className="text-xs md:text-sm text-gray-400 max-w-xl">
            输入您的物化订单编号（如 `POD-847291`），查看您由想法至现实工艺的精密自动化蜕变过程。
          </p>
        </div>

        {/* Search & Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left panel: Search & Order selection list */}
          <div className="space-y-6">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="搜索订单 (POD-XXXXXX)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full bg-white border border-gray-200 text-sm py-3 pl-4 pr-10 rounded-2xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black font-mono"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer">
                <Search size={16} />
              </button>
            </form>

            <div className="space-y-3 bg-white border border-gray-150 rounded-3xl p-5">
              <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest px-1">当前存管的订单队列 ({orders.length})</h3>
              
              <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
                {orders.map((ord) => {
                  const isSelected = activeOrder?.id === ord.id;
                  const labelDetail = STATUS_DETAILS[ord.status] || { label: '排队审核中', color: 'text-gray-500 bg-gray-50 border-gray-250' };
                  
                  const productLabels: Record<ProductType, string> = {
                    'Mug': '精品高白陶瓷马克杯',
                    'Acrylic': '高端亚克力立牌摆件',
                    'Bedding': '高奢贡缎长绒棉四件套',
                    'Pillow': '超柔高弹饱满靠背抱枕',
                    'Sticker': '纳米高耐候防水不干胶贴',
                    'Toy': '限定级3D手做潮流玩具',
                    'BlindBox': '压线撕口惊喜保密盲盒',
                    'Blanket': '柔麂法兰绒/羊羔绒温暖毛毯',
                    'Tapestry': '高宽幅精细织造艺术挂毯'
                  };
                  const formattedProduct = productLabels[ord.productType] || ord.productType;
                  
                  return (
                    <div
                      key={ord.id}
                    onClick={() => {
                      setSelectedOrderId(ord.id);
                      if (window.innerWidth < 1024) {
                        setTimeout(() => {
                          document.getElementById('active-order-details')?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }
                    }}
                      className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-black bg-gray-50/70 shadow-xs' 
                          : 'border-gray-150 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-mono font-bold text-gray-950">{ord.id}</span>
                        <span className={`text-[9px] font-sans font-bold px-2 py-0.5 rounded-full border ${labelDetail.color}`}>
                          {labelDetail.label}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-2.5">
                        {ord.imageUrl ? (
                          <div className="w-9 h-9 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                            <img src={ord.imageUrl} alt={ord.id} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-100 flex items-center justify-center shrink-0">
                            <Package size={14} className="text-gray-400" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-bold text-gray-900 truncate">{formattedProduct}</p>
                          <p className="text-[9px] text-gray-400 mt-0.5 truncate">收件人: {ord.customerName} · {ord.size}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right panel: Live Stepper Progression */}
          <div className="lg:col-span-2 space-y-6">
            {activeOrder ? (
              <div id="active-order-details" className="bg-white border border-gray-200/60 rounded-3xl p-6 lg:p-8 space-y-8 shadow-xs scroll-mt-20">
                {/* Order Meta Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-150">
                  <div className="space-y-1 text-left">
                    <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest">Selected Order Details</span>
                    <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                      <span className="font-mono">{activeOrder.id}</span>
                      <span className="text-gray-300">/</span>
                      <span className="text-xs font-normal text-gray-500">
                        {(() => {
                          const productCategoryNames: Record<ProductType, string> = {
                            'Mug': '精品高白骨瓷杯',
                            'Acrylic': '高端光感亚克力立牌',
                            'Bedding': '全幅贡缎长绒棉寝具',
                            'Pillow': '超柔蓬松防塌家居品',
                            'Sticker': '纳米耐候自粘不干胶纸',
                            'Toy': '手办级高精3D打印潮玩',
                            'BlindBox': '奇遇大样潮流包装盒',
                            'Blanket': '柔麂温暖情感盖毯',
                            'Tapestry': '巨幅超轻悬挂织挂'
                          };
                          return productCategoryNames[activeOrder.productType] || activeOrder.productType;
                        })()}
                      </span>
                    </h2>
                  </div>

                  <div className="text-left sm:text-right space-y-1">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">最新生产状态</span>
                    <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${STATUS_DETAILS[activeOrder.status]?.color}`}>
                      {STATUS_DETAILS[activeOrder.status]?.label}
                    </span>
                  </div>
                </div>

                {/* Grid specifics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div className="p-3 bg-gray-50/60 rounded-xl border border-gray-100">
                    <span className="text-[10px] text-gray-400 font-mono block uppercase">精选规格 / Size</span>
                    <span className="font-bold text-gray-900 inline-block mt-0.5">{activeOrder.size}</span>
                  </div>
                  <div className="p-3 bg-gray-50/60 rounded-xl border border-gray-100">
                    <span className="text-[10px] text-gray-400 font-mono block uppercase">高定色彩 / Tone</span>
                    <span className="font-bold text-gray-900 inline-block mt-0.5">{activeOrder.color}</span>
                  </div>
                  <div className="p-3 bg-gray-50/60 rounded-xl border border-gray-100">
                    <span className="text-[10px] text-gray-400 font-mono block uppercase">收货委托人</span>
                    <span className="font-bold text-gray-900 inline-block mt-0.5 truncate max-w-full">{activeOrder.customerName}</span>
                  </div>
                  <div className="p-3 bg-gray-50/60 rounded-xl border border-gray-100">
                    <span className="text-[10px] text-gray-400 font-mono block uppercase">发货方式 / Logistic</span>
                    <span className="font-bold text-indigo-600 inline-block mt-0.5">标准配送</span>
                  </div>
                </div>

                {/* Actual Stepper */}
                <div className="space-y-6 text-left">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 leading-none">
                    <Clock size={13} className="text-black" />
                    云端物理生产实时链 (Fabrication Timeline)
                  </h3>

                  <div className="relative pl-6 space-y-8 md:space-y-10 border-l border-gray-200/80 ml-2 mt-4">
                    {stages.map((stg, sIndex) => {
                      const isCompleted = stg.status === 'completed';
                      const isActive = stg.status === 'active';
                      return (
                        <div key={sIndex} className="relative">
                          {/* Circle indicator */}
                          <div className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center transition-all ${
                            isCompleted 
                              ? 'border-black bg-black text-white text-[8px]' 
                              : isActive 
                                ? 'border-indigo-600 ring-4 ring-indigo-100 animate-pulse' 
                                : 'border-gray-200'
                          }`}>
                            {isCompleted && '✓'}
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <h4 className={`text-xs font-black tracking-tight ${
                                isCompleted ? 'text-gray-500 line-through decoration-gray-300' : isActive ? 'text-indigo-600' : 'text-gray-700'
                              }`}>
                                {stg.title}
                              </h4>
                              <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md ${
                                isCompleted ? 'bg-gray-100 text-gray-400' : isActive ? 'bg-indigo-50 text-indigo-600 animate-pulse' : 'bg-gray-50 text-gray-400'
                              }`}>
                                {stg.time}
                              </span>
                            </div>
                            <p className="text-[11px] leading-relaxed text-gray-400 max-w-2xl font-normal">
                              {stg.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Assurance */}
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-150 flex items-start gap-3">
                  <ShieldCheck size={18} className="text-gray-900 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-gray-400 leading-relaxed font-sans text-left">
                    <span className="font-bold text-gray-900">质量双向赔付承诺：</span>
                    高定物化件由于胚件材质天然（精梳棉纯天然棉短绒或高煅深烧黏瓷等），表面存在万分之一的细微尘粒、气眼属于传统精工特色。
                    若存在重大图案位移、色彩晕杂、破损情况，即行无理由极速补融重烧。
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-96 flex flex-col items-center justify-center border border-dashed border-gray-200 rounded-3xl bg-white text-center">
                <Package size={36} className="text-gray-300 mb-3" />
                <p className="text-sm font-semibold text-gray-800">暂未选定物化单号</p>
                <p className="text-xs text-gray-400 mt-1">请在左侧列表中选择您的定制工况订单或在搜索框键入编号查询。</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
