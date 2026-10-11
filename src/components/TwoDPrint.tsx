import React, { useState } from 'react';
import { Printer, Upload, Sparkles, Image, RefreshCw, Layers, ShieldCheck, Download, Check, Plus, AlertCircle, Sliders, Activity } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';
import { useCreatorStore } from '../store/useCreatorStore';

interface PaperSubstrate {
  id: string;
  name: string;
  nameEn: string;
  desc: string;
  descEn: string;
  dpi: number;
  priceFactor: number;
  tags: string[];
}

const PAPER_SUBSTRATES: PaperSubstrate[] = [
  {
    id: 'hahnemuehle',
    name: '🇩🇪 哈内姆勒收藏级无酸纯棉纸',
    nameEn: 'Hahnemühle Photo Rag 308g',
    desc: '全球画廊标准首选，100% 纯棉纤维制，表面微糙细毛，墨色过渡深沉柔和，阻燃防酸耐久超百年。',
    descEn: 'Default gallery choice. 100% cotton, acid-free premium archival paper with luxurious texture.',
    dpi: 600,
    priceFactor: 1.5,
    tags: ['收藏级', '艺术微喷', '不褪色']
  },
  {
    id: 'canvas',
    name: '🎨 纳米超密防刮油画粗帆布',
    nameEn: 'HD Waterproof Nano Canvas 420g',
    desc: '高韧超重磅化纤棉麻混纺。经过三度哑光抗辐射色层涂布，高拉伸力、不碎边、防水，附着无颗粒。',
    descEn: 'Ultra-durable textured weave. Perfect for large-format frameless pop posters and heavy ink saturation.',
    dpi: 300,
    priceFactor: 1.2,
    tags: ['重磅', '高硬度', '防刮擦']
  },
  {
    id: 'pearly',
    name: '✨ 银钻水晶珠光艺术卡纸',
    nameEn: 'Crystal Pearlescent Art Stock 240g',
    desc: '自带梦幻轻金属微粒闪光，针对AI生成的赛博朋克霓虹灯、流体金属、极光泼墨提供流光溢彩的反射特写。',
    descEn: 'Subtle metallic glitter coating. Elevates futuristic neon designs and deep violet/cyan spectra.',
    dpi: 450,
    priceFactor: 1.1,
    tags: ['珠光', '赛博科技推荐', '高透度']
  },
  {
    id: 'washi',
    name: '🎐 日本越前手工精造纤维和纸',
    nameEn: 'Echizen Traditional Handmade Washi',
    desc: '手工桑树皮植物纤维，保留边缘自然流毛（毛边）。轻薄半透，吸水墨浸润饱满，富于传统东方写意质感。',
    descEn: 'Handcrafted mulberry fibers. Beautiful feathered deckled edges for organic Zen or retro collage look.',
    dpi: 300,
    priceFactor: 2.0,
    tags: ['手工特种', '半透明', '侘寂之美']
  }
];

const PRESETS_IMAGES = [
  {
    name: '赛博极速秩序警示装 (Alpha)',
    url: 'https://images.unsplash.com/photo-1579783900882-93b72906ac3b?q=80&w=800&auto=format&fit=crop',
    prompt: '赛博朋克极客未来主义警告标志，高饱和橙黄机械重击感警示贴纸，300 DPI'
  },
  {
    name: '复古露营图腾徽章 (Beta)',
    url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop',
    prompt: '山野探险露营聚酯拼色油墨质感，复古户外徽章，橙蓝冷暖套位精密彩印'
  },
  {
    name: '北欧日化花草茶瓶贴 (Gamma)',
    url: 'https://images.unsplash.com/photo-1502239608882-93b729c6af43?q=80&w=800&auto=format&fit=crop',
    prompt: '极简MUJI风格花茶密封瓶贴，多色植物系细线雕刻版画，极具留白呼吸感'
  },
  {
    name: '东方意境浮世飞鹿呈祥 (Zen)',
    url: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=800&auto=format&fit=crop',
    prompt: '传统日本越前传统手造和纸仙鹤飞掠金箔晚霞图景，侘寂东方细腻毛边浸润墨效'
  },
  {
    name: '包豪斯几何构造艺术 (Bauhaus)',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    prompt: '瑞士瑞士主义拼色硬朗海报，经典黑/红/金红相切不对称交错色网图案'
  },
  {
    name: '梦幻霓虹液态流体光谱 (Spectrum)',
    url: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop',
    prompt: '流光溢彩迷幻流体金属霓虹折射，银钻水晶艺术纸抗候深紫外吸光耀华'
  },
  {
    name: '复古海洋大王乌贼手绘 (Ocean)',
    url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop',
    prompt: '经典中世纪古董铜版海洋生物剖面科学插画，斑驳枯叶羊皮质感背景，140目微米套色'
  },
  {
    name: '极地冬日松林晨雾原生态 (Arctic)',
    url: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=800&auto=format&fit=crop',
    prompt: '北欧冷杉迷雾空气精筛净化介质彩印，微气孔防尘锦纶低压阻墨路'
  },
  {
    name: '印象主义莫奈睡莲秘境 (Lotus)',
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop',
    prompt: '收藏级重油画莫奈水彩睡莲高保真重现，哈内姆勒纯棉酸性纸微粗颗粒饱满吃色'
  }
];

const NTXYSY_MESH_PRESETS = [
  { id: '36T', count: 90, label: '36T / 90目', countEn: '36T (90 Mesh)', wireDefault: 90, thickDefault: 160, usage: '活性涂料重手感印染、发泡浆料、金粉粗套印 (Heavy textile paste & glitter ink)', category: '厚膜印刷网纱' },
  { id: '54T', count: 140, label: '54T / 140目', countEn: '54T (140 Mesh)', wireDefault: 64, thickDefault: 110, usage: '高端家纺及被套大色块活性印染、双面印 (Fine beddings & double-sided deep ink)', category: '大色块活性网' },
  { id: '77T', count: 200, label: '77T / 200目', countEn: '77T (200 Mesh)', wireDefault: 48, thickDefault: 83, usage: '细绒面料、超密防刮油画粗帆布精印 (Detailed fabrics & canvas prints)', category: '精密特种网纱' },
  { id: '120T', count: 300, label: '120T / 300目', countEn: '120T (300 Mesh)', wireDefault: 40, thickDefault: 65, usage: '高抗黄PMMA立牌、超薄耐磨机能警示标贴 (High-precision PC/PMMA decals)', category: '工业板印精网' },
  { id: '140T', count: 355, label: '140T / 355目', countEn: '140T (355 Mesh)', wireDefault: 34, thickDefault: 58, usage: '高白绝温陶瓷骨瓷杯弧面烤花、高亮印网 (Curves bone-china cup transfer decals)', category: '曲面烤花精网' },
  { id: '165T', count: 420, label: '165T / 420目', countEn: '165T (420 Mesh)', wireDefault: 31, thickDefault: 52, usage: '纳米级极细线条自粘胶、极限微标及点阵对色 (Micro lines & CMYK halftone dots)', category: '超限微孔网片' }
];

export function TwoDPrint() {
  const { language } = useLanguageStore();
  const addOrder = useCreatorStore((state) => state.addOrder);
  
  const [selectedSubstrate, setSelectedSubstrate] = useState<string>('hahnemuehle');
  const [selectedSize, setSelectedSize] = useState<string>('A3');
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<string>(PRESETS_IMAGES[0].url);
  const [customPrompt, setCustomPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [dpiMultiplier, setDpiMultiplier] = useState<2 | 4 | 8>(4);
  const [hasUpscaled, setHasUpscaled] = useState(false);
  const [upscaling, setUpscaling] = useState(false);

  // NTXYSY Mesh Simulator States
  const [selectedPresetId, setSelectedPresetId] = useState<string>('120T');
  const [sliderWireDiameter, setSliderWireDiameter] = useState<number>(40);
  const [sliderMeshThickness, setSliderMeshThickness] = useState<number>(65);
  const [fluidViscosity, setFluidViscosity] = useState<number>(50); // mPa·s (ink viscosity)
  const [simulationWeaveOverlay, setSimulationWeaveOverlay] = useState<boolean>(false);

  // File Specs
  const [fileResolution, setFileResolution] = useState({ w: 4096, h: 4096 });
  const [colorSpace, setColorSpace] = useState<'sRGB' | 'FOGRA39 CMYK'>('FOGRA39 CMYK');

  // Order state success
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [lastOrderNum, setLastOrderNum] = useState('');

  const currentPaper = PAPER_SUBSTRATES.find(p => p.id === selectedSubstrate) || PAPER_SUBSTRATES[0];

  const sizes = [
    { id: 'A4', label: 'A4 经典规格', dims: '210 x 297 mm', basePrice: 49 },
    { id: 'A3', label: 'A3 轻奢海报', dims: '297 x 420 mm', basePrice: 79 },
    { id: 'A2', label: 'A2 极致艺术幅', dims: '420 x 594 mm', basePrice: 149 },
    { id: '60x90', label: '超大微喷卷轴', dims: '600 x 900 mm', basePrice: 219 },
  ];

  const currentSizeObj = sizes.find(s => s.id === selectedSize) || sizes[0];
  const finalPrice = Math.round(currentSizeObj.basePrice * currentPaper.priceFactor);

  const handleSubstrateChange = (id: string) => {
    setSelectedSubstrate(id);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setTimeout(() => {
            setUploadedImage(reader.result as string);
            setFileResolution({
              w: Math.floor(Math.random() * 2000 + 2000),
              h: Math.floor(Math.random() * 2000 + 2000)
            });
            setColorSpace(Math.random() > 0.4 ? 'FOGRA39 CMYK' : 'sRGB');
            setIsUploading(false);
            setHasUpscaled(false);
          }, 1500);
        }
      };
      reader.readAsDataURL(e.dataTransfer.files[0]);
    }
  };

  const handleLocalFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setTimeout(() => {
            setUploadedImage(reader.result as string);
            setFileResolution({
              w: Math.floor(Math.random() * 2000 + 2000),
              h: Math.floor(Math.random() * 2000 + 2500)
            });
            setColorSpace('FOGRA39 CMYK');
            setIsUploading(false);
            setHasUpscaled(false);
          }, 1200);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleGenerateAI = () => {
    if (!customPrompt.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      // Pick a random gorgeous illustration or art image from unsplash
      const randomImages = [
        'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=1000&auto=format&fit=crop'
      ];
      const match = randomImages[Math.floor(Math.random() * randomImages.length)];
      setUploadedImage(match);
      setFileResolution({ w: 3072, h: 3072 });
      setColorSpace('FOGRA39 CMYK');
      setGenerating(false);
      setHasUpscaled(false);
    }, 2000);
  };

  const handleUpscale = () => {
    setUpscaling(true);
    setTimeout(() => {
      setFileResolution(prev => ({
        w: prev.w * dpiMultiplier,
        h: prev.h * dpiMultiplier
      }));
      setUpscaling(false);
      setHasUpscaled(true);
    }, 1800);
  };

  const handlePresetSelect = (presetUrl: string, presetPrompt: string) => {
    setUploadedImage(presetUrl);
    setFileResolution({ w: 4096, h: 4096 });
    setColorSpace('FOGRA39 CMYK');
    setHasUpscaled(false);
  };

  const handleSendToFatory = () => {
    const orderNum = `2D-POD${Math.floor(100000 + Math.random() * 900000)}`;
    addOrder({
      id: orderNum,
      productType: 'Sticker', // Treat 2D Print under stickers workflow/or fallback
      imageUrl: uploadedImage,
      customerName: '王舒雅',
      customerPhone: '186****7739',
      customerAddress: '北京市朝阳区高碑店艺术文化园区D座',
      color: currentPaper.name,
      size: `${currentSizeObj.label} (${currentSizeObj.dims}) @ ${hasUpscaled ? currentPaper.dpi * 2 : currentPaper.dpi}DPI`,
      status: 'planning',
      timestamp: new Date().toISOString()
    });
    setLastOrderNum(orderNum);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 5000);
  };

  return (
    <div id="print2d-cabin" className="max-w-7xl mx-auto px-6 pt-10 pb-24 w-full text-slate-800 font-sans">
      
      {/* Upper Success Alert */}
      {showSuccessToast && (
        <div className="mb-6 p-4 bg-green-500 text-white rounded-2xl flex items-center justify-between shadow-lg border border-green-600 animate-in slide-in-from-top-6 duration-300">
          <div className="flex items-center gap-2.5">
            <Check className="shrink-0 bg-white text-green-600 p-0.5 rounded-full" size={16} />
            <div className="text-xs">
              <span className="font-bold font-mono uppercase bg-green-700 px-1 py-0.5 rounded mr-1">SUCCESS //</span>
              已成功将高分辨率 2D 打印设计推送到智能 ERP 工业流水线！工单号：<strong className="font-mono">{lastOrderNum}</strong>。您可在“物化追踪器”或“ERP 看板”查看其即时油墨调和、激光裁切加工状态。
            </div>
          </div>
          <button onClick={() => setShowSuccessToast(false)} className="text-white hover:text-green-200 text-xs font-bold px-2">✕</button>
        </div>
      )}

      {/* Header Panel */}
      <div className="mb-12 text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-650 shadow-xs mb-1">
          <Printer size={30} className="animate-pulse" />
        </div>
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono text-indigo-600 font-bold tracking-widest uppercase block">// HIGH-RESOLUTION 2D INDUSTRIAL PRINT CABIN //</span>
          <h2 className="text-3xl md:text-4xl font-black uppercase text-slate-950 tracking-tight">2D 喷墨/热升华平面精印定制舱</h2>
          <p className="text-xs md:text-sm text-slate-500 font-mono max-w-3xl mx-auto">
            装载收藏级艺术微喷、超密防刮帆布原料，配合高色彩广域 CMYK 微离散咬色技术。免去传统中间商溢价，提供最高 600+ DPI 防褪色、不折色高定纸艺实物输出。
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Visual Mockup Proofing Area (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border-2 border-slate-300 bg-slate-900 rounded-3xl p-5 shadow-lg relative overflow-hidden text-white">
            <div className="absolute top-1.5 left-4 flex gap-1 z-10 font-mono text-[8px] text-slate-400">
              <span>[2D MOCKUP PROOFING STAGE]</span>
            </div>
            
            {/* Real crop-mark corner designs to resemble physical layout sheet */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-cyan-400"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-cyan-400"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-cyan-400"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-cyan-400"></div>

            {/* Simulated active bleed guides */}
            <div className="absolute inset-5 border border-dashed border-red-500/40 rounded pointer-events-none z-10 flex items-center justify-center">
              <span className="text-[8px] text-red-400 opacity-60 absolute top-0.5">// 2mm 生产出血线 (BLEED LINE) //</span>
            </div>

            {/* Displaying Image with realistic shadow/texture */}
            <div className="aspect-[3/4] relative bg-slate-950/80 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center border border-slate-800 my-4">
              {isUploading || generating ? (
                <div className="flex flex-col items-center gap-3">
                  <RefreshCw className="animate-spin text-cyan-400" size={32} />
                  <span className="text-xs font-mono text-cyan-300">
                    {isUploading ? '正在物理点阵解构中...' : 'AI 算法高保真精绘中...'}
                  </span>
                </div>
              ) : uploadedImage ? (
                <div className="w-full h-full relative group">
                  <img
                    src={uploadedImage}
                    alt="Mockup design state"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-all"
                  />

                  {/* Real-time Screen Mesh weave overlay simulator */}
                  {simulationWeaveOverlay && (
                    <div 
                      className="absolute inset-0 pointer-events-none opacity-45 select-none transition-opacity z-10"
                      style={{
                        backgroundImage: `
                          linear-gradient(to right, rgba(0,0,0,0.7) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(0,0,0,0.7) 1px, transparent 1px)
                        `,
                        backgroundSize: `${Math.max(2, 500 / (NTXYSY_MESH_PRESETS.find(p => p.id === selectedPresetId)?.count || 300) * 8)}px ${Math.max(2, 500 / (NTXYSY_MESH_PRESETS.find(p => p.id === selectedPresetId)?.count || 300) * 8)}px`,
                        mixBlendMode: 'multiply'
                      }}
                    />
                  )}
                  
                  {/* Subtle retro overlay for paper simulation textures */}
                  <div className="absolute inset-0 bg-white/[0.03] pointer-events-none mix-blend-overlay"></div>
                  
                  {/* Status Overlay */}
                  <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-slate-800 rounded-lg p-2.5 space-y-1 z-20 backdrop-blur-sm">
                    <span className="text-[8px] font-mono text-cyan-400 font-bold tracking-wider block uppercase">// 实度物理参数 (Live Specs)</span>
                    <div className="flex flex-col gap-0.5 text-[9px] font-mono text-slate-300">
                      <div className="flex justify-between gap-6"><span>输出材料:</span> <span className="text-emerald-400 font-bold">{currentPaper.nameEn}</span></div>
                      <div className="flex justify-between gap-6"><span>物理规格:</span> <span>{currentSizeObj.id} // {currentSizeObj.dims}</span></div>
                      <div className="flex justify-between gap-6"><span>当前分辨率:</span> <span>{fileResolution.w} × {fileResolution.h} Px</span></div>
                      <div className="flex justify-between gap-6"><span>打印解析度:</span> <span className="text-yellow-400 font-bold">{(hasUpscaled ? currentPaper.dpi * 2 : currentPaper.dpi)} DPI</span></div>
                      <div className="flex justify-between gap-6"><span>通道色彩极性:</span> <span>{colorSpace}</span></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-slate-400 gap-2 p-6 text-center">
                  <Image size={40} className="stroke-1 opacity-50" />
                  <span className="text-xs font-mono">请上载您的原稿或一键召唤 AI 设计</span>
                </div>
              )}
            </div>

            {/* Extra Info strip */}
            <div className="mt-2 pt-2 border-t border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5"><AlertCircle size={11} className="text-amber-500" /> FOGRA39 CMYK 双向对射打印矫正</span>
              <span className="font-bold text-slate-300">100% 满负荷自洽</span>
            </div>
          </div>

          {/* Quick presets load */}
          <div className="border border-slate-200 bg-white p-5 rounded-3xl space-y-3.5 shadow-3xs relative overflow-hidden group">
            {/* Ambient soft light effect behind */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none transition-all group-hover:scale-125"></div>
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <Sparkles className="text-indigo-600 animate-pulse" size={14} />
                <span className="text-[10px] font-mono text-slate-500 font-extrabold uppercase tracking-wider block">
                  // LOAD PRESTIGE TRIAL BLUEPRINTS (创意精选画廊 · 一键载入)
                </span>
              </div>
              <span className="text-[9px] font-mono text-indigo-500 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping"></span>
                左右滑动 ↔ {PRESETS_IMAGES.length} 款
              </span>
            </div>

            {/* Horizontal sliding container with custom scrollbar hidden or styled */}
            <div className="overflow-x-auto flex gap-4 pb-3 pt-1 scroll-smooth scrollbar-thin snap-x whitespace-nowrap scrollbar-thumb-slate-200 scrollbar-track-transparent">
              {PRESETS_IMAGES.map((preset, idx) => {
                const isSelected = uploadedImage === preset.url;
                return (
                  <button
                    key={idx}
                    onClick={() => handlePresetSelect(preset.url, preset.prompt)}
                    className={`inline-block snap-center shrink-0 w-36 border-2 rounded-2xl p-1.5 transition-all duration-300 cursor-pointer text-left focus:outline-none relative group/item hover:-translate-y-2 hover:shadow-xl ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-1 ring-indigo-500/30'
                        : 'border-slate-150 hover:border-indigo-400 hover:bg-slate-50/40 bg-white'
                    }`}
                  >
                    {/* Floating load badge on hover */}
                    <div className="absolute top-2.5 right-2.5 bg-slate-950/80 backdrop-blur-xs text-[8px] text-white font-mono px-2 py-0.5 rounded-md opacity-0 group-hover/item:opacity-100 transition-all transform translate-y-1 group-hover/item:translate-y-0 z-10 font-bold">
                      一键置入
                    </div>

                    <div className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-100 bg-slate-50 shrink-0 relative">
                      <img 
                        src={preset.url} 
                        alt={preset.name} 
                        referrerPolicy="no-referrer" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-80 group-hover/item:opacity-60 transition-opacity"></div>
                    </div>
                    
                    <div className="mt-2 space-y-0.5 px-0.5">
                      <span className="text-[10px] font-black text-slate-800 leading-tight block truncate w-full group-hover/item:text-indigo-650 transition-colors">
                        {preset.name}
                      </span>
                      <div className="flex items-center justify-between text-[8px] font-mono text-slate-400 mt-1">
                        <span>ULTRA DPI // 600</span>
                        {isSelected && <span className="text-emerald-500 font-bold flex items-center gap-0.5">● 已载入</span>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* Visual subtle hint for slide */}
            <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono pt-1">
              <span>💡 支持本域内拖拽、鼠标滚轮或触控左右滑动</span>
              <span className="text-right">单击选择后自动解析高分辨率套色参数</span>
            </div>
          </div>
        </div>

        {/* Right Column: Customization Controls & AI Upscale Box (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Upload & Prompt Hub */}
          <div className="border border-slate-200 bg-white rounded-3xl p-6 space-y-6 shadow-3xs">
            
            {/* Tab like header to define creation mode */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-black font-mono uppercase tracking-wider text-slate-900">// STEP 1: 原稿载入与 AI 图样生成 (Origin Load)</h3>
                <p className="text-xs text-slate-500">支持拖入本地150MB以内超大图纸，或直接输入词汇让 AI 智画大图</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Drag n Drop block */}
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all flex flex-col justify-center items-center relative min-h-[160px] cursor-pointer ${
                  dragActive ? 'border-indigo-500 bg-indigo-50/60' : 'border-slate-250 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <input
                  type="file"
                  id="local-file-ref"
                  onChange={handleLocalFileSelect}
                  accept="image/*"
                  className="hidden"
                />
                <label htmlFor="local-file-ref" className="cursor-pointer w-full flex flex-col items-center">
                  <Upload size={24} className="text-indigo-500 mb-2" />
                  <span className="text-xs font-bold text-slate-800 block">拖拽或点击本域装载本地原件</span>
                  <span className="text-[9px] text-slate-400 font-mono mt-1 block">支持 JPG, PNG, TIF, SVG 等 (DPI&gt;150)</span>
                </label>
              </div>

              {/* Prompt box block */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-white flex flex-col justify-between min-h-[160px]">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-purple-400 font-black uppercase tracking-wider block">// AI 喷墨图纸生成舱 (AI Plg)</span>
                  <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="输入中文或英文作画提示。例如：北欧复古花卉雕刻版画、抽象流体黄铜渐变..."
                    className="w-full bg-slate-900 border border-slate-800 focus:border-purple-500 focus:outline-none rounded-xl p-2.5 text-xs font-mono placeholder:text-slate-500 min-h-[70px] resize-none text-white leading-relaxed"
                  ></textarea>
                </div>
                
                <button
                  onClick={handleGenerateAI}
                  disabled={generating || !customPrompt.trim()}
                  className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-550 hover:to-indigo-550 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 rounded-xl text-xs font-black uppercase tracking-widest flex justify-center items-center gap-1.5 transition-all text-white cursor-pointer"
                >
                  <Sparkles size={11} className="text-purple-300" />
                  <span>{generating ? '大模型正在运算重构...' : '一键生成极精微喷原样'}</span>
                </button>
              </div>

            </div>

          </div>

          {/* Section 2: AI Density & Upscale Module */}
          <div className="border border-slate-200 bg-white rounded-3xl p-6 space-y-4 shadow-3xs">
            <div>
              <h3 className="text-sm font-black font-mono uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Layers className="text-indigo-600" size={16} />
                <span>// STEP 2: AI 超分辨率倍增定型级 (AI High-Density Upscale)</span>
              </h3>
              <p className="text-xs text-slate-500">将AI生成的轻量图像（如72 DPI）通过无损点阵极速差值，倍增至工业级高密度，消除印刷锯齿。</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-left">
                <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase">CHOOSE AI UPSCALING DENSITY (设置超分倍率)</span>
                <div className="flex gap-2">
                  {([2, 4, 8] as const).map(mult => (
                    <button
                      key={mult}
                      onClick={() => setDpiMultiplier(mult)}
                      className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                        dpiMultiplier === mult
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-white hover:bg-slate-100 text-slate-650 border border-slate-200'
                      }`}
                    >
                      {mult}x超分 ({mult === 2 ? '300 DPI' : mult === 4 ? '600 DPI' : '1200 DPI'})
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleUpscale}
                disabled={upscaling || hasUpscaled}
                className={`py-3 px-6 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer ${
                  hasUpscaled
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-250'
                    : 'bg-indigo-650 text-white hover:bg-indigo-700 shadow-md'
                }`}
              >
                {upscaling ? (
                  <>
                    <RefreshCw className="animate-spin text-white" size={12} />
                    <span>倍数卷积重采样中...</span>
                  </>
                ) : hasUpscaled ? (
                  <>
                    <Check size={12} />
                    <span>超分定型完毕 ({fileResolution.w} Px)</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={12} className="text-cyan-300 animate-pulse" />
                    <span>执行 AI 高精物理无损超分</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Section 3: Substrate Material & Dimensions Match */}
          <div className="border border-slate-200 bg-white rounded-3xl p-6 space-y-6 shadow-3xs">
            <div>
              <h3 className="text-sm font-black font-mono uppercase tracking-wider text-slate-900">// STEP 3: 印刷承载纸材与画幅大小选择 (Media Matches)</h3>
              <p className="text-xs text-slate-500">不同的特种纤维对油墨吞噬率与感光反差不同，AI会根据特定材质调整混色对射喷灌厚度</p>
            </div>

            {/* Substrates Selector Radio Cards */}
            <div className="space-y-2.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">精选承载基材 (Premium Materials Stock)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {PAPER_SUBSTRATES.map((paper) => {
                  const isSelected = selectedSubstrate === paper.id;
                  return (
                    <button
                      key={paper.id}
                      onClick={() => handleSubstrateChange(paper.id)}
                      className={`text-left p-4 rounded-2xl border-2 transition-all flex flex-col justify-between cursor-pointer focus:outline-none relative overflow-hidden ${
                        isSelected
                          ? 'bg-slate-950 border-slate-950 text-white shadow-md'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-850'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-1.5">
                          <span className="text-xs font-black block">{paper.name}</span>
                          <span className={`text-[8px] font-mono leading-none px-1 py-0.5 rounded uppercase ${
                            isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {paper.dpi}DPI
                          </span>
                        </div>
                        <p className={`text-[10px] leading-relaxed mb-3 ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                          {paper.desc}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {paper.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className={`text-[8px] px-1 py-0.2 rounded-xs font-bold ${
                              isSelected ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'bg-slate-100 text-slate-600 border border-slate-150'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sizes Select */}
            <div className="space-y-2.5 pt-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">生产裁切画面规格 (Plotting Dimensions)</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {sizes.map((sz) => {
                  const isSelected = selectedSize === sz.id;
                  return (
                    <button
                      key={sz.id}
                      onClick={() => setSelectedSize(sz.id)}
                      className={`p-3 rounded-2xl border-2 text-center flex flex-col justify-center items-center transition-all cursor-pointer focus:outline-none ${
                        isSelected
                          ? 'bg-white text-slate-900 border-slate-950 shadow-md ring-1 ring-slate-950'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-500'
                      }`}
                    >
                      <span className="text-xs font-black block">{sz.label}</span>
                      <span className="text-[9px] font-mono font-medium opacity-70 mt-1 block">{sz.dims}</span>
                      <span className={`text-[10px] font-mono font-bold mt-2 ${isSelected ? 'text-indigo-650' : 'text-slate-600'}`}>
                        ￥{Math.round(sz.basePrice * currentPaper.priceFactor)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Financial & Push to Factory Order */}
            <div className="pt-4 border-t border-slate-150 bg-slate-50/50 -mx-6 -mb-6 p-6 rounded-b-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1.5 self-start sm:self-center">
                <span className="text-[9px] font-mono text-slate-400 font-bold block uppercase">// FINANCIAL QUOTATION (含耗材物理工本)</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-mono font-black text-slate-950">￥{finalPrice}.00</span>
                  <span className="text-[9px] font-mono text-green-600 font-bold border border-green-250 bg-green-50 px-1 py-0.2 rounded uppercase">
                    含工业级超宽幅裁切质检服务
                  </span>
                </div>
              </div>

              <button
                onClick={handleSendToFatory}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-750 to-slate-950 text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-95 transition-opacity cursor-pointer shadow-md text-white"
              >
                <Printer size={14} className="text-cyan-400 animate-bounce" />
                <span>一键推向 2D 打印流水线</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* 💥 NEW ADDITION: NTXYSY Precision Screen & Filtration Mesh Simulator (ntxysy.com/Home/ProductList/3/0) */}
      <div id="ntxysy-simulation-cabin" className="mt-16 bg-slate-950 border-2 border-slate-800 rounded-3xl p-6 lg:p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Top Header Labels */}
        <div className="space-y-3 relative z-10 mb-8 border-b border-slate-800/80 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest block">
              // NTXYSY.COM PRECISION INDUSTRIAL WEAVING SYSTEM //
            </span>
            <span className="text-[9px] font-mono bg-indigo-950 border border-indigo-700/50 px-2 py-0.5 rounded text-indigo-300">
              南通鑫宇筛网三号生产线（ProductList/3/0）
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-2">
            <Activity className="text-cyan-400 animate-pulse" size={24} />
            南通鑫宇高张力微孔丝网模拟与工艺检视舱
          </h2>
          <p className="text-xs text-slate-400 font-mono leading-relaxed max-w-5xl">
            本舱专门重现并验证聚酯编织网与锦纶单丝筛网的物理透过率表现。丝印微网在承载 AI 天马行空的高色彩渐变与高密度噪点时，
            其目数（Mesh Count）、丝径（Wire Diameter）及开孔比例直接决断了网版耐张力磨损性与油墨无感附着度。
          </p>
        </div>

        {/* Interactive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-start">
          
          {/* Controls form: 4 columns */}
          <div className="lg:col-span-5 space-y-6 bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl">
            <span className="text-[10px] font-mono text-slate-400 font-extrabold uppercase tracking-widest block">
              🔧 网片编织与浆性设置 (Simulator Controls)
            </span>

            {/* Presets List selectors */}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono text-slate-350 uppercase">
                选择高品质网目预设规格 (Select Preset Class):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {NTXYSY_MESH_PRESETS.map((preset) => {
                  const isSelected = selectedPresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setSelectedPresetId(preset.id);
                        setSliderWireDiameter(preset.wireDefault);
                        setSliderMeshThickness(preset.thickDefault);
                      }}
                      className={`py-2 px-2 rounded-xl text-[10px] font-black border transition-all cursor-pointer text-center ${
                       isSelected
                         ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-md font-extrabold'
                         : 'bg-slate-950/80 hover:bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
              <span className="text-[9px] text-slate-500 font-mono leading-tight block pt-1 italic">
                ★ 典型适用：{NTXYSY_MESH_PRESETS.find(p => p.id === selectedPresetId)?.usage}
              </span>
            </div>

            <hr className="border-slate-800/60" />

            {/* Sliders Area */}
            <div className="space-y-4">
              {/* Slider 1: Wire Diameter */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-350">单丝经纬丝径 (Wire Diameter):</span>
                  <span className="text-cyan-400 font-bold">{sliderWireDiameter} μm</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={120}
                  step={1}
                  value={sliderWireDiameter}
                  onChange={(e) => setSliderWireDiameter(Number(e.target.value))}
                  className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[8px] text-slate-600 font-mono">
                  <span>15 μm (极柔细丝)</span>
                  <span>120 μm (重工骨干丝)</span>
                </div>
              </div>

              {/* Slider 2: Mesh Thickness */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-350">实测丝网厚度 (Mesh Thickness):</span>
                  <span className="text-cyan-400 font-bold">{sliderMeshThickness} μm</span>
                </div>
                <input
                  type="range"
                  min={25}
                  max={200}
                  step={1}
                  value={sliderMeshThickness}
                  onChange={(e) => setSliderMeshThickness(Number(e.target.value))}
                  className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[8px] text-slate-600 font-mono">
                  <span>25 μm</span>
                  <span>200 μm</span>
                </div>
              </div>

              {/* Slider 3: Ink Viscosity */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-350">调墨流变黏度 (Ink Viscosity):</span>
                  <span className="text-cyan-400 font-bold">{fluidViscosity} mPa·s</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={150}
                  step={5}
                  value={fluidViscosity}
                  onChange={(e) => setFluidViscosity(Number(e.target.value))}
                  className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[8px] text-slate-600 font-mono">
                  <span>10 (稀水活性墨)</span>
                  <span>150 (重固树脂UV)</span>
                </div>
              </div>
            </div>

            <hr className="border-slate-800/60" />

            {/* Filter Weave Toggle */}
            <div className="pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={simulationWeaveOverlay}
                  onChange={(e) => setSimulationWeaveOverlay(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-cyan-400 cursor-pointer focus:ring-0 focus:ring-offset-0"
                />
                <span className="text-xs font-mono text-slate-300 group-hover:text-white transition-colors">
                  在上方设计原样上叠加网眼线（对拉物理套位实时校验）
                </span>
              </label>
            </div>

          </div>

          {/* Visualization Dashboard: 8 columns */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Bento metrics cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Metric 1 */}
              <div className="bg-slate-900/45 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between h-28 relative overflow-hidden">
                <span className="text-[10px] font-mono text-slate-500 font-bold block uppercase">// MESH PORE WIDTH (微孔网眼通径)</span>
                <div className="my-1">
                  <span className="text-3xl font-mono font-black text-cyan-300">{Math.max(1.0, (25400 / (NTXYSY_MESH_PRESETS.find(p => p.id === selectedPresetId)?.count || 300)) - sliderWireDiameter).toFixed(1)}</span>
                  <span className="text-xs font-mono text-slate-400 ml-1">μm (微米)</span>
                </div>
                <p className="text-[9px] text-slate-500 font-mono leading-none">
                  计算公式：(25400 / 理论目数) - 编织丝径
                </p>
              </div>

              {/* Metric 2 */}
              <div className="bg-slate-900/45 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between h-28 relative overflow-hidden">
                <span className="text-[10px] font-mono text-slate-500 font-bold block uppercase">// HIGH-TENSION MESH OPEN RANGE (极张力开孔率)</span>
                <div className="my-1">
                  <span className="text-3xl font-mono font-black text-indigo-300">
                    {Math.min(85, Math.max(8, (((Math.max(1, (25400 / (NTXYSY_MESH_PRESETS.find(p => p.id === selectedPresetId)?.count || 300)) - sliderWireDiameter)) / (25400 / (NTXYSY_MESH_PRESETS.find(p => p.id === selectedPresetId)?.count || 300))) ** 2 * 100))).toFixed(1)}
                  </span>
                  <span className="text-xs font-mono text-slate-400 ml-1">% // Open Area</span>
                </div>
                {/* Horizontal progress representation */}
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-400 h-full rounded-full transition-all"
                    style={{ width: `${Math.min(85, Math.max(8, (((Math.max(1, (25400 / (NTXYSY_MESH_PRESETS.find(p => p.id === selectedPresetId)?.count || 300)) - sliderWireDiameter)) / (25400 / (NTXYSY_MESH_PRESETS.find(p => p.id === selectedPresetId)?.count || 300))) ** 2 * 100)))}%` }}
                  ></div>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="bg-slate-900/45 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between h-28 relative overflow-hidden">
                <span className="text-[10px] font-mono text-slate-500 font-bold block uppercase">// WET FILM INK THICKNESS (理论色彩湿膜厚度)</span>
                <div className="my-1">
                  <span className="text-3xl font-mono font-black text-emerald-300">
                    {(sliderMeshThickness * ((((Math.max(1, (25400 / (NTXYSY_MESH_PRESETS.find(p => p.id === selectedPresetId)?.count || 300)) - sliderWireDiameter)) / (25400 / (NTXYSY_MESH_PRESETS.find(p => p.id === selectedPresetId)?.count || 300))) ** 2 * 100) / 100)).toFixed(1)}
                  </span>
                  <span className="text-xs font-mono text-slate-400 ml-1">μm (极其无胶细腻手感)</span>
                </div>
                <p className="text-[9px] text-slate-500 font-mono leading-none">
                  G = 丝网厚度 × 极开孔率 %，越精密越微薄亲肤
                </p>
              </div>

              {/* Metric 4 */}
              <div className="bg-slate-900/45 border border-slate-850 p-4 rounded-2xl flex flex-col justify-between h-28 relative overflow-hidden">
                <span className="text-[10px] font-mono text-slate-500 font-bold block uppercase">// FLUID TRANSIT PERFORMANCE (调色浆体流透速率)</span>
                <div className="my-1">
                  <span className="text-3xl font-mono font-black text-amber-300">
                    {(((((Math.max(1, (25400 / (NTXYSY_MESH_PRESETS.find(p => p.id === selectedPresetId)?.count || 300)) - sliderWireDiameter)) / (25400 / (NTXYSY_MESH_PRESETS.find(p => p.id === selectedPresetId)?.count || 300))) ** 2 * 100) * 0.25) * (80 / fluidViscosity)).toFixed(2)}
                  </span>
                  <span className="text-xs font-mono text-slate-400 ml-1">mL/(s·㎡) (理论流体通量)</span>
                </div>
                <p className="text-[9px] text-slate-500 font-mono leading-none">
                  结合由于粘性液体切剪阻尼，调校漏印时塞网堵孔敏感度
                </p>
              </div>

            </div>

            {/* Real capabilities outputs declaration cards */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
              <span className="text-[10px] font-mono text-emerald-400 font-black tracking-wider block uppercase bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded-sm w-fit">
                🚀 南通鑫宇网业（Category 3 / 叁号生产线）真实物理能力产出
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-slate-300">
                <div className="space-y-1 bg-slate-950/60 p-3 rounded-xl border border-slate-900">
                  <h4 className="font-extrabold text-white flex items-center gap-1.5 leading-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    聚乙烯/锦纶防尘及过滤网眼精密产出
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                    鑫宇筛网三号生产线产出的轻质空气净化和空调低阻尼超微网目阻绝层，经密闭高强机械交叉拉力测试，可过滤 99.8% 粗毛屑烟雾，并提供超低流阻。
                  </p>
                </div>
                <div className="space-y-1 bg-slate-950/60 p-3 rounded-xl border border-slate-900">
                  <h4 className="font-extrabold text-white flex items-center gap-1.5 leading-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    多色深墨位活性色浆匀净透过性
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                    专为本厂「至臻家纺贡缎抱枕、全包被套」拼缝设计的超宽幅 120T 网纱，能够彻底消减双面彩印墨水反渗积水现象，保障毛细着色不僵化。
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
