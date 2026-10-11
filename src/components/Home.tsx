import React from 'react';
import { ArrowRight, Sparkles, Wand2, ShieldCheck, Cpu, Package, Truck, Compass, Zap, Flame, Printer, Box } from 'lucide-react';
import { useCreatorStore } from '../store/useCreatorStore';
import { useLanguageStore } from '../store/useLanguageStore';
import { getTranslation } from '../store/translations';

interface HomeProps {
  onStartCreation: () => void;
  onViewMaterials: () => void;
  onTrackOrders: () => void;
  onNavigate?: (tab: 'home' | 'studio' | 'print2d' | 'print3d' | 'craft' | 'tracker' | 'dashboard') => void;
}

export function Home(props: HomeProps) {
  const { setSelectedProduct } = useCreatorStore();
  const { language } = useLanguageStore();
  const t = (key: any) => getTranslation(language, key);
  const [selectedCategory, setSelectedCategory] = React.useState<'all' | 'textile' | 'daily' | 'geek'>('all');

  const categories = [
    { id: 'all' as const, label: language === 'ZH' ? '全部载体' : 'All Carriers' },
    { id: 'textile' as const, label: language === 'ZH' ? '🌟 品质家纺类' : '🌟 Home Textiles', isHot: true },
    { id: 'daily' as const, label: language === 'ZH' ? '👕 日常穿配' : 'Clothing & Daily' },
    { id: 'geek' as const, label: language === 'ZH' ? '🔮 极客潮流' : 'Geek Trends' }
  ];

  const QUICK_PRODUCTS = [
    {
      id: 'Bedding' as const,
      title: t('p_bedding_title'),
      tag: t('p_bedding_tag'),
      desc: t('p_bedding_desc'),
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format&fit=crop',
      badge: t('p_bedding_badge')
    },
    {
      id: 'Blanket' as const,
      title: t('p_blanket_title'),
      tag: t('p_blanket_tag'),
      desc: t('p_blanket_desc'),
      image: 'https://images.unsplash.com/photo-1543294001-f7cbfe92237e?q=80&w=800&auto=format&fit=crop',
      badge: t('p_blanket_badge')
    },
    {
      id: 'Pillow' as const,
      title: t('p_pillow_title'),
      tag: t('p_pillow_tag'),
      desc: t('p_pillow_desc'),
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop',
      badge: t('p_pillow_badge')
    },
    {
      id: 'Tapestry' as const,
      title: t('p_tapestry_title'),
      tag: t('p_tapestry_tag'),
      desc: t('p_tapestry_desc'),
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop',
      badge: t('p_tapestry_badge')
    },
    {
      id: 'Mug' as const,
      title: t('p_mug_title'),
      tag: t('p_mug_tag'),
      desc: t('p_mug_desc'),
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
      badge: t('p_mug_badge')
    },
    {
      id: 'Acrylic' as const,
      title: t('p_acrylic_title'),
      tag: t('p_acrylic_tag'),
      desc: t('p_acrylic_desc'),
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
      badge: t('p_acrylic_badge')
    },
    {
      id: 'Sticker' as const,
      title: t('p_sticker_title'),
      tag: t('p_sticker_tag'),
      desc: t('p_sticker_desc'),
      image: 'https://images.unsplash.com/photo-1608155686393-8fdd966d784d?q=80&w=800&auto=format&fit=crop',
      badge: t('p_sticker_badge')
    },
    {
      id: 'Toy' as const,
      title: t('p_toy_title'),
      tag: t('p_toy_tag'),
      desc: t('p_toy_desc'),
      image: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?q=80&w=800&auto=format&fit=crop',
      badge: t('p_toy_badge')
    },
    {
      id: 'BlindBox' as const,
      title: t('p_blindbox_title'),
      tag: t('p_blindbox_tag'),
      desc: t('p_blindbox_desc'),
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop',
      badge: t('p_blindbox_badge')
    }
  ];

  const filteredProducts = QUICK_PRODUCTS.filter(prod => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'textile') return ['Bedding', 'Pillow', 'Blanket', 'Tapestry'].includes(prod.id);
    if (selectedCategory === 'daily') return ['Mug', 'Sticker'].includes(prod.id);
    if (selectedCategory === 'geek') return ['Acrylic', 'Toy', 'BlindBox'].includes(prod.id);
    return true;
  });

  return (
    <div id="home-view" className="w-full bg-[#fcfcfd] text-slate-900 font-sans min-h-screen y2k-grid relative overflow-hidden">
      {/* Dynamic scanline element for retro flare */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(240,240,240,0)_50%,rgba(0,0,0,0.015)_50%),linear-gradient(90deg,rgba(0,0,0,0.01),rgba(0,0,0,0.01),rgba(0,0,0,0.01))] bg-[size:100%_4px,6px_100%] z-30"></div>

      {/* Hero Header Banner with futuristic 2000 design */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-48 md:pb-40 border-b border-gray-200 bg-[#fcfcfd] text-slate-900">
        {/* Decorative Grid Patterns and Metallic Orbs */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[300px] bg-cyan-200/40 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[250px] bg-indigo-200/40 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10 space-y-10">
          {/* Cyber Capsule Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur border border-slate-200 text-[10px] sm:text-xs font-mono font-bold text-slate-900 uppercase tracking-[0.2em] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse shadow-[0_0_8px_#00F0FF]" />
            <span>[ SYSTEM: {t('hero_tag')} ]</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-slate-950 tracking-tighter leading-[1.1] max-w-5xl mx-auto">
            {t('hero_title')}<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 font-extrabold drop-shadow-sm">
              {t('hero_title_2')}
            </span>
          </h1>

          <p className="text-slate-500 text-sm md:text-base max-w-3xl mx-auto leading-relaxed font-sans tracking-wide">
            {t('hero_desc')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8">
            <button
              id="hero-go-studio-btn"
              onClick={props.onStartCreation}
              className="w-full sm:w-auto px-10 py-5 rounded-none bg-black text-white hover:bg-slate-900 transition-all text-sm font-black tracking-widest uppercase shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-center gap-3 cursor-pointer group transform active:scale-95"
            >
              <Wand2 size={18} className="text-cyan-400 group-hover:animate-pulse" />
              <span>{t('hero_btn_studio')}</span>
              <ArrowRight size={18} className="transform transition-transform group-hover:translate-x-1" />
            </button>
            <button
              id="hero-view-materials-btn"
              onClick={props.onViewMaterials}
              className="w-full sm:w-auto px-10 py-5 rounded-none bg-transparent text-slate-900 border border-slate-300 hover:border-slate-500 hover:bg-slate-50 transition-all text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>{t('hero_btn_materials')}</span>
            </button>
          </div>

          {/* Millennium LCD Diagnostics Panel */}
          <div className="pt-12 flex justify-center">
            <div className="bg-white/80 backdrop-blur border border-slate-200 shadow-sm p-5 pl-6 pr-6 rounded-none flex flex-wrap justify-center items-center gap-8 md:gap-12 text-[11px] font-mono text-slate-600">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
                <span className="text-slate-400">SYS_STATUS:</span> <span className="text-emerald-600 font-bold">{t('live_status')}</span>
              </span>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <span>
                <span className="text-slate-400">COMPLETED_LOTS:</span> <span className="text-slate-900 font-semibold">{t('live_completed')}</span>
              </span>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <span>
                <span className="text-slate-400">FACTORY_TIME:</span> <span className="text-slate-900 font-semibold">{t('live_time')}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 载体甄选与一键切入 Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 space-y-12">
        <div id="materials-gallery" className="text-center space-y-3">
          <div className="text-[10px] font-mono font-bold text-cyan-600 tracking-[0.15em] uppercase inline-block">
            // PHYSICAL ASSETS SELECTION PROTOCOL //
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase drop-shadow-sm">{t('carrier_title')}</h2>
          <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto font-sans">
            {t('carrier_desc')}
          </p>
        </div>

        {/* Category filtering bar */}
        <div className="flex flex-wrap justify-center items-center gap-3 max-w-3xl mx-auto p-2 bg-slate-100/80 border border-slate-200 rounded-full backdrop-blur-sm shadow-inner">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase cursor-pointer transition-all flex items-center gap-2 ${
                selectedCategory === cat.id 
                  ? 'bg-black text-white shadow-md border-transparent' 
                  : 'text-slate-500 hover:text-slate-900 bg-transparent border border-transparent hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span>{cat.label}</span>
              {cat.isHot && (
                <span className="text-[8px] bg-red-500 text-white px-1 leading-normal rounded-sm uppercase tracking-tighter animate-pulse">
                  HOT
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Dedicated high-end banner space for Home Textiles when category is texttile or all */}
        {(selectedCategory === 'all' || selectedCategory === 'textile') && (
          <div className="p-8 md:p-12 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900 relative overflow-hidden shadow-xl animate-in fade-in duration-500">
            {/* Visual background gloss elements resembling velvet fold */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/40 blur-[90px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-12 w-64 h-64 bg-cyan-100/40 blur-[80px] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <span className="inline-block text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest border border-blue-200 bg-blue-50/50 px-2.5 py-1 rounded">
                  NEW // 品质家纺柔性打印定制舱 (Premium Fabrics Portal)
                </span>
                <h3 className="text-xl md:text-3xl font-black font-sans uppercase tracking-tight text-slate-900 leading-tight">
                  {language === 'ZH' ? '智绘温暖：AI 高端贡缎寝具与高弹抱枕印刷定制' : 'Warmth of AI: Customized Bedding Sateen & Fine Velvet Print'}
                </h3>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-mono">
                  {language === 'ZH' 
                    ? '针对高奢六十支长绒棉贡缎、高回弹性慢回弹精梳棉材料，AI自动调整打版预应力与图像球面膨胀系数。在保留纤维原始自然丝滑质感的同时，完美映射云端AI渲染的超现实梦境色彩。' 
                    : 'Leveraging active direct reactive ink-injection for long-staple cotton satin. Ensures no color variance, 3D curved distortion correction, and cloud-rendered seamless design integrity.'}
                </p>
              </div>

              <div className="shrink-0 space-y-3 w-full md:w-auto">
                <button
                  onClick={() => {
                    setSelectedProduct('Bedding');
                    props.onStartCreation();
                  }}
                  className="w-full md:w-auto px-6 py-3.5 bg-gradient-to-r from-blue-600 to-[#00d5ff] rounded-xl text-xs font-black uppercase tracking-widest flex justify-center items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.3)] text-white"
                >
                  <Sparkles size={14} />
                  <span>{language === 'ZH' ? '立即定制高奢寝具' : 'Design Bedding Set'}</span>
                </button>
                
                <button
                  onClick={() => {
                    setSelectedProduct('Pillow');
                    props.onStartCreation();
                  }}
                  className="w-full md:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-750 border border-slate-700/80 rounded-xl text-xs font-black uppercase tracking-widest flex justify-center items-center gap-2 transition-all cursor-pointer text-slate-300 hover:text-white"
                >
                  <span>{language === 'ZH' ? '立即定制柔肤靠枕' : 'Design Custom Pillow'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dedicated high-end banner space for Pop Art Toys when category is geek or all */}
        {(selectedCategory === 'all' || selectedCategory === 'geek') && (
          <div className="p-8 md:p-12 rounded-2xl border border-slate-200 bg-white relative overflow-hidden shadow-xl animate-in fade-in duration-500 my-8">
            {/* Visual background gloss elements / neon grid / orbit rings */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100/50 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100/50 blur-[130px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 space-y-8">
              {/* Portal Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-cyan-600 uppercase tracking-widest border border-cyan-200 bg-cyan-50 px-3 py-1 rounded-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                    GEEK // 潮玩臻致智造次元舱 (Trendy Designer Toy Hub)
                  </span>
                  <h3 className="text-xl md:text-3xl font-black font-sans uppercase tracking-tight text-slate-900 leading-tight">
                    {language === 'ZH' ? '潮玩多维定制廊：数字艺术的物化星轨' : 'Pop Toy Hub: Multi-Channel Digital Materialization'}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono leading-relaxed max-w-4xl">
                    {language === 'ZH'
                      ? '汇集 2D 高张力丝网印、3D 零隙光固化和 AI 智绘共创。无论您需要极细致的贴纸对位、高难度榫卯手办拆件、还是盲盒卡纸高延展防爆，在这里皆能一秒精准切入对应的工艺模块。'
                      : 'Connecting 2D silkscreen simulation, 3D SLA modeling, and AI co-design pipelines for your pop objects.'}
                  </p>
                </div>
                <div className="text-right hidden md:block shrink-0">
                  <span className="text-[10px] font-mono text-slate-400 block">SYSTEM GATEWAY: ACTIVE</span>
                  <span className="text-[9px] font-mono text-emerald-600 font-bold block">✓ 2D/3D PROCESSORS ONLINE</span>
                </div>
              </div>

              {/* Three Entrance Channels */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Entrance Block A: 2D Decal Printer Area */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between hover:border-cyan-400 hover:bg-white hover:shadow-md transition-all duration-300 group/card shadow-sm">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-white text-cyan-600 border border-slate-200 flex items-center justify-center group-hover/card:scale-105 transition-transform duration-300 shadow-sm">
                        <Printer size={18} />
                      </div>
                      <span className="text-[9px] font-mono text-cyan-600 font-black uppercase tracking-wider">CHANNEL_01 // 2D PLOT</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                        {language === 'ZH' ? '2D 丝网微标与多色套位' : '2D Silk Screen Decals'}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-mono mt-2">
                        {language === 'ZH'
                          ? '体验鑫宇高张力丝网厚度及极开孔率。模拟高品质油墨抗切剪流变，完美适配手办彩贴、潮玩包装不爆色对色工艺。'
                          : 'Verify screen mesh pore width, fluid transit metrics, and ink shear tolerances for premium decal films.'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (props.onNavigate) {
                        props.onNavigate('print2d');
                      }
                    }}
                    className="mt-6 w-full py-3 px-3 rounded-xl border border-slate-200 bg-white hover:bg-cyan-50 text-cyan-700 hover:text-cyan-800 hover:border-cyan-300 text-xs font-black tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer uppercase shadow-sm"
                  >
                    <span>{language === 'ZH' ? '进入 2D 筛网工艺模拟' : 'Load 2D Mesh Simulator'}</span>
                    <ArrowRight size={12} className="group-hover/card:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Entrance Block B: 3D SLA modeling Area */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between hover:border-blue-400 hover:bg-white hover:shadow-md transition-all duration-300 group/card shadow-sm">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-white text-blue-600 border border-slate-200 flex items-center justify-center group-hover/card:scale-105 transition-transform duration-300 shadow-sm">
                        <Box size={18} />
                      </div>
                      <span className="text-[9px] font-mono text-blue-600 font-black uppercase tracking-wider">CHANNEL_02 // 3D RP</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                        {language === 'ZH' ? '3D 光固化高精成型舱' : '3D SLA High-Res Molding'}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-mono mt-2">
                        {language === 'ZH'
                          ? '采用 0.05mm 光敏树脂熔池层析。重力质心榫卯一键自动分切，攻克 AI 原生浮空长悬空难关，实现极客品质。'
                          : 'Experience SLA level resolution, print speed calculation, and stress balance parameters for designer models.'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (props.onNavigate) {
                        props.onNavigate('print3d');
                      }
                    }}
                    className="mt-6 w-full py-3 px-3 rounded-xl border border-slate-200 bg-white hover:bg-blue-50 text-blue-700 hover:text-blue-800 hover:border-blue-300 text-xs font-black tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer uppercase shadow-sm"
                  >
                    <span>{language === 'ZH' ? '进入 3D 物理打印成型' : 'Load 3D SLA Lab'}</span>
                    <ArrowRight size={12} className="group-hover/card:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Entrance Block C: AI Designer Co-creation */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between hover:border-indigo-400 hover:bg-white hover:shadow-md transition-all duration-300 group/card shadow-sm">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-white text-indigo-600 border border-slate-200 flex items-center justify-center group-hover/card:scale-105 transition-transform duration-300 shadow-sm">
                        <Wand2 size={18} />
                      </div>
                      <span className="text-[9px] font-mono text-indigo-600 font-black uppercase tracking-wider">CHANNEL_03 // STUDIO</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                        {language === 'ZH' ? 'AI 潮玩臻选智绘中心' : 'AI Pop-Toy Co-Design'}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-mono mt-2">
                        {language === 'ZH'
                          ? '输入设计直白文字，由云端大模型极速投影渲染。完美订制盲盒外壳与潮流摆件（并连接后台实时结算）。'
                          : 'Interact directly with server-side AI generative design, wrapping gorgeous custom skins on pop carriers.'}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 mt-6">
                    <button
                      onClick={() => {
                        setSelectedProduct('Toy');
                        if (props.onNavigate) {
                          props.onNavigate('studio');
                        } else {
                          props.onStartCreation();
                        }
                      }}
                      className="py-2.5 px-1.5 rounded-xl border border-indigo-200 bg-white hover:bg-indigo-50 text-[10px] font-black text-indigo-700 transition-all flex items-center justify-center gap-1 cursor-pointer truncate uppercase shadow-sm"
                    >
                      <span>手办定制 🤖</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProduct('BlindBox');
                        if (props.onNavigate) {
                          props.onNavigate('studio');
                        } else {
                          props.onStartCreation();
                        }
                      }}
                      className="py-2.5 px-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-[10px] font-black text-slate-700 transition-all flex items-center justify-center gap-1 cursor-pointer truncate uppercase shadow-sm"
                    >
                      <span>盲盒定制 🎁</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              id={`quick-product-${prod.id}`}
              className="bg-white border-2 border-slate-200 hover:border-blue-400 rounded-2xl p-5 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative metallic-bevel"
            >
              {/* Gloss shine card header overlay */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-2xl pointer-events-none"></div>

              <div className="space-y-4">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border-2 border-slate-300 shadow-sm">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95 contrast-105"
                  />
                  <span className="absolute top-3 left-3 bg-blue-600/90 text-[9px] font-mono font-black text-white px-2 py-0.5 rounded-sm uppercase tracking-wider shadow-md border border-cyan-300">
                    {prod.badge}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-blue-600 tracking-wider bg-blue-50 border border-blue-200/50 px-2 py-0.5 rounded uppercase">
                    {prod.tag}
                  </span>
                  <h3 className="text-md font-black text-slate-900 mt-2.5 uppercase tracking-tight">{prod.title}</h3>
                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-3 leading-relaxed">
                    {prod.desc}
                  </p>
                </div>
              </div>

              <button
                id={`start-carrier-btn-${prod.id}`}
                onClick={() => {
                  setSelectedProduct(prod.id);
                  props.onStartCreation();
                }}
                className="mt-6 w-full py-3 rounded-xl border-2 border-slate-350 text-xs font-black text-slate-700 bg-slate-50 hover:bg-slate-900 hover:text-[#00e5ff] hover:border-slate-900 transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
              >
                <span>{t('start_carrier_btn')}</span>
                <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transform translate-x-1 transition-all" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 工艺流水线 4大黄金支柱 */}
      <section className="bg-slate-100 border-y-2 border-slate-300 py-24 px-6 relative">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b-2 border-slate-350">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest block">
                [ PRODUCTION GRID PROTOCOL - Y2K SPEC ]
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight uppercase">
                {t('pillars_title')}
              </h2>
            </div>
            <p className="text-xs md:text-sm text-slate-400 max-w-sm uppercase font-mono">
              {t('pillars_sub')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div id="pillar-card-1" className="p-6 border-2 border-slate-200 rounded-2xl bg-white space-y-4 shadow-sm metallic-bevel hover:border-blue-400 transition-all">
              <div className="w-12 h-12 rounded-xl bg-slate-950 text-[#00e5ff] y2k-glow-cyan flex items-center justify-center">
                <Compass size={22} />
              </div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{t('pillar_1_title')}</h4>
              <p className="text-xs text-slate-400 leading-relaxed uppercase font-mono">
                {t('pillar_1_desc')}
              </p>
            </div>

            <div id="pillar-card-2" className="p-6 border-2 border-slate-200 rounded-2xl bg-white space-y-4 shadow-sm metallic-bevel hover:border-blue-400 transition-all">
              <div className="w-12 h-12 rounded-xl bg-slate-950 text-[#00e5ff] y2k-glow-cyan flex items-center justify-center">
                <Cpu size={22} />
              </div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{t('pillar_2_title')}</h4>
              <p className="text-xs text-slate-400 leading-relaxed uppercase font-mono">
                {t('pillar_2_desc')}
              </p>
            </div>

            <div id="pillar-card-3" className="p-6 border-2 border-slate-200 rounded-2xl bg-white space-y-4 shadow-sm metallic-bevel hover:border-blue-400 transition-all">
              <div className="w-12 h-12 rounded-xl bg-slate-950 text-orange-400 flex items-center justify-center">
                <Flame size={22} />
              </div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{t('pillar_3_title')}</h4>
              <p className="text-xs text-slate-400 leading-relaxed uppercase font-mono">
                {t('pillar_3_desc')}
              </p>
            </div>

            <div id="pillar-card-4" className="p-6 border-2 border-slate-200 rounded-2xl bg-white space-y-4 shadow-sm metallic-bevel hover:border-blue-400 transition-all">
              <div className="w-12 h-12 rounded-xl bg-slate-950 text-emerald-400 y2k-glow-green flex items-center justify-center">
                <Truck size={22} />
              </div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{t('pillar_4_title')}</h4>
              <p className="text-xs text-slate-400 leading-relaxed uppercase font-mono">
                {t('pillar_4_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 承诺和保障 banner */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center shadow-md y2k-glow-cyan text-blue-600">
            <ShieldCheck size={36} />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-black text-slate-950 uppercase">{t('assurance_title')}</h3>
          <p className="text-xs md:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed uppercase font-mono">
            {t('assurance_desc')}
          </p>
        </div>

        <div>
          <button
            id="assurance-start-btn"
            onClick={props.onStartCreation}
            className="px-10 py-4.5 rounded-xl bg-slate-950 text-white hover:bg-blue-650 hover:text-white transition-all text-xs font-black tracking-widest uppercase cursor-pointer border-b-4 border-slate-800 shadow-md active:border-b-0 active:translate-y-1 transform"
          >
            {t('assurance_btn')}
          </button>
        </div>
      </section>
    </div>
  );
}
