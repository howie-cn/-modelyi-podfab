import React, { useState, useRef } from 'react';
import { Send, Image as ImageIcon, Package, CheckCircle2, ChevronRight, Loader2, Sparkles, Sliders, ShoppingBag, Eye, Upload, Wand2, ArrowRight, Compass, Fingerprint, RefreshCw, Share2 } from 'lucide-react';
import { useCreatorStore, type ProductType } from '../store/useCreatorStore';
import { DesignQualityEvaluator } from './DesignQualityEvaluator';

const SAMPLE_SHORTCUTS = [
  '日系黑白极简柴犬线稿',
  '包豪斯几何美学抽象构成',
  '赛博朋克深海宇航服水豚',
];

const STRATEGIC_FORMULAS = [
  {
    name: '⚙️ 赛博机能装备贴',
    carrier: 'Sticker' as const,
    prompt: '赛博朋克机甲硬壳装备警告贴，重工业极简警告，带有防静电及核能荧光微调警示文字，黄色与炭黑双色高细节对比排版',
  },
  {
    name: '🏔️ 户外耐候车贴板贴',
    carrier: 'Sticker' as const,
    prompt: '极限越野户外车标徽章，松林日落剪影复古登山探险队精细不退色图腾，高级耐候矢量圆贴设计',
  },
  {
    name: '🌿 北欧生活美学收纳标',
    carrier: 'Sticker' as const,
    prompt: '北欧极简高定咖啡密封玻璃罐统一收纳分装标签，清新草本植物与咖啡果实精细绘线配小资高雅文字排版，MUJI风格',
  },
  {
    name: '🍷 派对伴手礼高定瓶贴',
    carrier: 'Sticker' as const,
    prompt: '高端满月或新婚聚会伴手礼酒标纸，经典维多利亚复古藤蔓黄金边框配微醺咖啡馆插画，法式写意高细节版式',
  },
  {
    name: '🎨 丝网波普艺术立牌摆件',
    carrier: 'Acrylic' as const,
    prompt: '波普艺术大色块丝印质感桌面摆件，复古潮流高对比艺术拼贴，重度厚压巧克力亚克力立体，Andy Warhol 风格',
  }
];


const PRESET_BLUEPRINTS = [
  {
    name: '摩登极光泼墨纹理',
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop',
    desc: '极光渐变艺术，适合杯具与高端画幅'
  },
  {
    name: '浮世绘巨浪古典再造',
    url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1005&auto=format&fit=crop',
    desc: '重构经典日式美学，线条力量感强烈'
  },
  {
    name: '现代极简包豪斯色块',
    url: 'https://images.unsplash.com/photo-1502239608882-93b729c6af43?q=80&w=1000&auto=format&fit=crop',
    desc: '低饱和温和几何，彰显品味'
  }
];

const COMMUNITY_GALLERY = [
  {
    author: '@Alex_Cyber',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    name: '霓虹冷核猫咪',
    tag: '赛博朋克',
    url: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop',
    prompt: '赛博朋克深海宇航服水豚，带有霓虹灯般的发光边缘，冷色调高对比，8k分辨率。',
    carrier: 'Acrylic' as const,
    likes: 1205
  },
  {
    author: '@Zen_Master',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zen',
    name: '山海云梦·白泽',
    tag: '国潮浮雕',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    prompt: '融合写意东方线条与现代工笔画法，瑞兽白泽线稿，金色与墨黑色水墨晕染，极具张力，气度典雅尊贵，壁画风格。',
    carrier: 'Tapestry' as const,
    likes: 892
  },
  {
    author: '@Bauhaus_Fan',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bauhaus',
    name: '极简几何韵律',
    tag: '包豪斯',
    url: 'https://images.unsplash.com/photo-1502239608882-93b729c6af43?q=80&w=800&auto=format&fit=crop',
    prompt: '温和大地暖色调几何色块，包豪斯极简主义构图，圆角与锐角形状有节奏地交错，现代复古混搭。',
    carrier: 'Bedding' as const,
    likes: 341
  },
  {
    author: '@Tokyo_Drift',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tokyo',
    name: '夜之城街景贴',
    tag: '机能风',
    url: 'https://images.unsplash.com/photo-1608155686393-8fdd966d784d?q=80&w=1000&auto=format&fit=crop',
    prompt: '高反差黑黄配色，机能风防伪标签贴纸排版，包含条形码、警示标识符、日文片假名，粗糙工业做旧质感。',
    carrier: 'Sticker' as const,
    likes: 2167
  },
  {
    author: '@Monet_Vibe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Monet',
    name: '极光莫奈流沙',
    tag: '抽象意识流',
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop',
    prompt: '极光色彩在夜空中像流沙一样交叠，莫奈印象派笔触，油画质感，梦幻深空与柔和星光的结合，富有浪漫和诗意。',
    carrier: 'Pillow' as const,
    likes: 673
  },
  {
    author: '@Gold_Rush',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gold',
    name: '鎏金岁华',
    tag: '黄金镶嵌',
    url: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=800&auto=format&fit=crop',
    prompt: '繁复的金箔镶嵌插画，散发细腻温热的高定艺术感，Art Deco 风格，几何植物纹样交织，克林姆特风格强烈的视觉冲击。',
    carrier: 'Mug' as const,
    likes: 1045
  }
];

const PHYSICAL_PRODUCT_EXAMPLES = [
  {
    name: '【高白骨瓷】AI 繁复纹理微晶烤花马克杯',
    carrier: 'Mug' as const,
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    specs: ['1200℃二次釉中彩煅烧', '三维曲面自动像素抗拉伸', '防极冷热抗爆内胚'],
    desc: '【AI创意与智造配平】面对AI在圆柱杯身生成的全包裹繁复肌理，系统通过3D投影失真补偿算法，在印制前自动平铺拉伸，完美解决杯口缩口形变。釉中彩工艺让细腻颗粒随晶体融为一体，永不掉漆。'
  },
  {
    name: '【水晶亚克力】AI 复杂异形边缘双层立牌',
    carrier: 'Acrylic' as const,
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
    specs: ['自动闭合路径微平滑削角', '双层夹合耐候不分层', '钻石五轴高透抛光'],
    desc: '【AI创意与智造配平】AI生成的人物或场景通常带有无数悬空、尖锐边角，直接打磨极易断裂刮手。我们运用智能矢量平滑算法，对小于1.5mm的尖刺自动进行R角倒圆复原，确保水晶质感坚固如新、绝不划手。'
  },
  {
    name: '【高奢贡缎】AI 宽幅全幅彩墨六十支四件套',
    carrier: 'Bedding' as const,
    url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format&fit=crop',
    specs: ['60S长绒棉高光泽贡缎', '大宽幅无接缝拼接算法', '环保活性染料肌理渗透'],
    desc: '【AI创意与智造配平】对于AI生成的巨幅超现实梦境画布，采用活性无感直喷技术，墨水直达纤维内部。在保留面料极高丝滑触感的同时，智能校准拼缝分切线，使整被拼缝错位小于1mm，完美保证画面连贯。'
  },
  {
    name: '【柔麂温暖】AI 情绪安抚法兰绒羊羔绒温暖毛毯',
    carrier: 'Blanket' as const,
    url: 'https://images.unsplash.com/photo-1543294001-f7cbfe92237e?q=80&w=1000&auto=format&fit=crop',
    specs: ['双层加厚320g柔法兰绒', '高温无感双面热升华', '防静电亲肤毛羽处理'],
    desc: '【AI创意与智造配平】采用高温渗墨热升华工艺，在柔软的绒毛层纤维根部进行微米级着色。让魔法阵、睡眠符盘、家宠卡通化形象，完美保留原本丰满柔软、丝滑亲肤的温暖治愈陪伴触感。'
  },
  {
    name: '【空间改造】AI 艺术视觉无损精细挂毯',
    carrier: 'Tapestry' as const,
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop',
    specs: ['高宽幅超轻质顺垂涤纶', '激光热切裁剪防散边纹', '宿舍/墙面极致氛围利器'],
    desc: '【AI创意与智造配平】针对巨幅（1.5m x 2.0m）高饱和度赛博朋克深空或迷幻漩涡设计，引入双向张力抗形变控制。二钉上墙极速改换房间视觉重力，画幅边缘毫无散边毛刺。'
  },
  {
    name: '【柔滑抱枕】AI 极简咖啡杯艺高弹舒脊靠枕坐垫',
    carrier: 'Pillow' as const,
    url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop',
    specs: ['磨毛桃皮绒极速快消靠垫', '三维全高释压PP高弹芯', '体积微小极速快发不带芯'],
    desc: '【AI创意与智造配平】客厅装饰中的潮流玩物。支持一键只发“高清晰磨毛靠边枕套”（降低包邮重量），热升华饱和度惊艳纯正。'
  },
  {
    name: '【耐候车贴】AI 赛博机能防水警告标贴',
    carrier: 'Sticker' as const,
    url: 'https://images.unsplash.com/photo-1608155686393-8fdd966d784d?q=80&w=1000&auto=format&fit=crop',
    specs: ['纳米级PVC高张力自粘胶', 'UV树脂高抗UV高保色', '全自动智能多维排刀裁剪'],
    desc: '【AI创意与智造配平】AI生成的复杂矢量字符或贴标由智能切刀精准寻轨轮廓，自动滤除过窄撕裂位。高张力PVC能紧贴异形车身，暴晒洗车历久如新。'
  },
  {
    name: '【光控潮玩】AI 蒸汽朋克高精细3D打印手办',
    carrier: 'Toy' as const,
    url: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?q=80&w=1000&auto=format&fit=crop',
    specs: ['工业级0.02mm光固化成型', '多轴联动气动悬浮无痕支撑', '耐黄变高刚度环保树脂'],
    desc: '【AI创意与智造配平】用户生成的重工业机械义肢或繁杂哥特裙摆等3D网格，一键通过骨架动力学检测，自动识别重力倾覆及细小连桥干涉，生成超细悬浮微支撑，打印完成手工极速剥落不留疤。'
  },
  {
    name: '【阻尼盲盒】AI 探秘大样精切减震黑卡盲盒',
    carrier: 'BlindBox' as const,
    url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop',
    specs: ['耐折裂高弹水性防爆墨', '多刀一体免覆膜轧线预撕口', '特种高克重阻阻尼重磅纸板'],
    desc: '【AI创意与智造配平】满版深色AI原稿在厚纸板直角折死时极易崩墨露白。采用独创的水乳防开裂微孔油墨，配合高精度纸版轧线，让您无论拉扯何种夸张视觉，撕口解开过程都爽滑而高级不变形。'
  }
];

export function Workspace() {
  const {
    imageUrl,
    selectedProduct,
    setSelectedProduct,
    isGenerating,
    handleGenerate,
    handleUploadBlueprint,
    handleModifyBlueprint,
    submitOrderToERP,
    orderStep,
    setOrderStep,
    chatHistory
  } = useCreatorStore();

  const [promptInput, setPromptInput] = useState('');
  const [creationMode, setCreationMode] = useState<'prompt' | 'blueprint'>('prompt');
  const [activeGalleryTab, setActiveGalleryTab] = useState<'designs' | 'physicals'>('designs');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Standard White');

  React.useEffect(() => {
    if (selectedProduct === 'Bedding') {
      setSelectedSize('1.8m Bed');
      setSelectedColor('100S Egyptian Cotton Sateen');
    } else if (selectedProduct === 'Pillow') {
      setSelectedSize('45x45cm-Full');
      setSelectedColor('Peach Skin Velvet');
    } else if (selectedProduct === 'Blanket') {
      setSelectedSize('M Blanket');
      setSelectedColor('Fleece Flannel');
    } else if (selectedProduct === 'Tapestry') {
      setSelectedSize('1.5x2.0m');
      setSelectedColor('Lightweight Polyester');
    } else {
      setSelectedSize('M');
      setSelectedColor('Standard White');
    }
  }, [selectedProduct]);

  const getProductColors = () => {
    if (selectedProduct === 'Bedding') {
      return [
        { name: '100S Egyptian Cotton Sateen', label: '👑 100% 纯棉重磅数码直喷 (走高端极奢)' },
        { name: '60S Double Mercerized Silk Cotton', label: '✨ 60支双丝光纯棉高精直喷' },
        { name: 'Premium Sublimated Poly-cotton', label: '💡 优质涤棉双面热升华工艺 (性价比推荐)' }
      ];
    }
    if (selectedProduct === 'Pillow') {
      return [
        { name: 'Peach Skin Velvet', label: '🍑 桃皮绒亲肤手感 + 热升华工艺 (客厅美学经典)' },
        { name: 'Artistic Linen Blend', label: '🌱 有机低碳亲肤亚麻 + 环保数码直喷' },
        { name: 'Constant Cooling Cloud Silk', label: '❄️ 双面恒温凉感云丝高回弹面料' }
      ];
    }
    if (selectedProduct === 'Blanket') {
      return [
        { name: 'Fleece Flannel', label: '🧸 320g 抗静电饱暖柔法兰绒毯 (热升华绝对统治区)' },
        { name: 'Sherpa Cotton Blanket', label: '🐑 豪华保暖双层厚羊羔绒毛毯 (极具温暖陪伴感)' }
      ];
    }
    if (selectedProduct === 'Tapestry') {
      return [
        { name: 'Lightweight Polyester', label: '🎐 抗皱垂顺轻薄涤纶面料 + 数字温感热升华 (巨画推荐)' },
        { name: 'Heavy Canvas Weave', label: '🕸️ 近摄无断续粗纤重磅织造面料' }
      ];
    }
    return [
      { name: 'Standard White', label: '极简哑光白' },
      { name: 'Obsidian Black', label: '曜石深邃黑' },
      { name: 'Titanium Grey', label: '极客工业钛金灰' }
    ];
  };

  const getProductSizes = () => {
    if (selectedProduct === 'Bedding') {
      return [
        { sz: '1.5m Bed', label: '1.5m床三件套', desc: '1.5米床款/夏凉被一套 (299元 - 迎新性价比)' },
        { sz: '1.8m Bed', label: '1.8m床四件套', desc: '1.8米床款四件套 (399元 - 爆款主推)' },
        { sz: '2.0m Bed', label: '2.0m豪华四件套', desc: '2.0米大尺寸套件 (599元 - 纯棉高端奢华)' }
      ];
    }
    if (selectedProduct === 'Pillow') {
      return [
        { sz: '50x50cm-Slip', label: '抱枕套 [无芯]', desc: '50x50cm 不含枕芯 / 履约成本低包邮快 (49元 - 完美的引流款)' },
        { sz: '45x45cm-Full', label: '靠背包 [含高弹芯]', desc: '45x45cm 精致款 / 带高回弹中空PP棉芯 (89元)' },
        { sz: '50x50cm-Full', label: '经典抱枕 [含高弹芯]', desc: '50x50cm 经典款 / 暖冬蓬松记忆棉芯 (119元)' }
      ];
    }
    if (selectedProduct === 'Blanket') {
      return [
        { sz: 'S Blanket', label: '100x140cm 随身毯', desc: '迷你空调毯/盖脚毯 (129元 - 伴手好礼)' },
        { sz: 'M Blanket', label: '150x200cm 单人毯', desc: '单人舒压休息盖毯/法兰绒 (199元 - 热卖首推)' },
        { sz: 'L Blanket', label: '200x230cm 豪华整铺', desc: '双人加厚法兰绒毯 (249元 - 尊享重磅)' }
      ];
    }
    if (selectedProduct === 'Tapestry') {
      return [
        { sz: '1.0x1.5m', label: '1.0m x 1.5m 精巧版', desc: '精致微幅 / 附送2个无痕挂钉 (69元 - 大学生热卖)' },
        { sz: '1.5x2.0m', label: '1.5m x 2.0m 巨幕床面版', desc: '巨幅改装 / 宿舍及墙面空间极速氛围改造 (99元 - 极力主推)' },
        { sz: '2.0x3.0m', label: '2.0m x 3.0m 赛博全视画幅', desc: '无尽延展 / 极致沉浸式大视界改装款 (149元)' }
      ];
    }
    return [
      { sz: 'S', label: 'S级精致', desc: '精致小巧' },
      { sz: 'M', label: 'M级推荐', desc: '标准推荐' },
      { sz: 'L', label: 'L级奢享', desc: '居家大气' }
    ];
  };

  const getProductPrice = () => {
    if (selectedProduct === 'Bedding') {
      if (selectedSize.includes('1.5m')) return 299;
      if (selectedSize.includes('1.8m')) return 399;
      if (selectedSize.includes('2.0m')) return 599;
      return 399;
    }
    if (selectedProduct === 'Pillow') {
      if (selectedSize.includes('Slip')) return 49;
      if (selectedSize.includes('45x45')) return 89;
      if (selectedSize.includes('50x50')) return 119;
      return 89;
    }
    if (selectedProduct === 'Blanket') {
      if (selectedSize.includes('S Blanket')) return 129;
      if (selectedSize.includes('M Blanket')) return 199;
      if (selectedSize.includes('L Blanket')) return 249;
      return 199;
    }
    if (selectedProduct === 'Tapestry') {
      if (selectedSize.includes('1.0x1.5')) return 69;
      if (selectedSize.includes('1.5x2.0')) return 99;
      if (selectedSize.includes('2.0x3.0')) return 149;
      return 99;
    }
    if (selectedProduct === 'Mug') return 89;
    if (selectedProduct === 'Acrylic') return 129;
    if (selectedProduct === 'Sticker') return 29;
    if (selectedProduct === 'Toy') return 299;
    if (selectedProduct === 'BlindBox') return 59;
    return 89;
  };

  // Checkout Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  // Blueprint local states
  const [selectedBlueprint, setSelectedBlueprint] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSend = () => {
    if (!promptInput.trim()) return;
    if (creationMode === 'blueprint' && selectedBlueprint) {
      // Modify custom design with AI
      handleModifyBlueprint(promptInput);
    } else {
      // Pure creative text generate
      handleGenerate(promptInput);
    }
    setPromptInput('');
  };

  const handleShortcutClick = (text: string) => {
    setPromptInput(text);
  };

  const handleLocalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Generate object URL for mock client previews
      const objectUrl = URL.createObjectURL(file);
      setSelectedBlueprint(objectUrl);
    }
  };

  const selectPresetBlueprint = (url: string) => {
    setSelectedBlueprint(url);
  };

  const processBlueprint = (actionType: 'direct' | 'ai-modify') => {
    if (!selectedBlueprint) return;
    handleUploadBlueprint(selectedBlueprint, actionType);
  };

  const onCheckoutSubmit = () => {
    submitOrderToERP({
      name: customerName,
      phone: customerPhone,
      address: customerAddress,
      color: selectedColor,
      size: selectedSize
    });
  };

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-64px)] w-full bg-slate-50 text-slate-900 font-sans lg:overflow-hidden antialiased y2k-grid">
      {/* 左侧：高清预览台与灵感展示集 (65%) */}
      <div className="w-full lg:w-[65%] h-auto lg:h-full bg-slate-100/70 flex flex-col border-b lg:border-b-0 lg:border-r-2 border-slate-300 lg:overflow-y-auto">
        <header className="sticky top-0 bg-slate-200/90 backdrop-blur-md border-b-2 border-slate-300 p-4 sm:p-6 flex justify-between items-center z-20 shadow-xs">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping" />
            <div className="font-extrabold text-xs sm:text-sm tracking-tight text-slate-950 font-mono uppercase">AI DESIGN BAY <span className="text-blue-600 font-mono text-[10px] sm:text-xs ml-1.5">// Co-Design Studio v1.9</span></div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-[10px] sm:text-xs font-mono text-slate-500 bg-slate-300 px-2 py-0.5 rounded border border-slate-400">STATUS: ACTIVE_LINK_READY</span>
            <div className="text-[10px] sm:text-xs font-bold text-slate-700 bg-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-slate-300 shadow-sm flex items-center gap-1.5 y2k-glow-cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              智能工坊 MILLENNIUM
            </div>
          </div>
        </header>

        <div className="flex-1 p-8 md:p-12 space-y-16 flex flex-col items-center">
          {/* 高清预览台 */}
          <div className="w-full flex flex-col items-center">
            {imageUrl ? (
              <div className="relative w-full max-w-xl aspect-square flex items-center justify-center bg-white shadow-lg border-2 border-slate-300 rounded-3xl overflow-hidden transition-all duration-700 ease-out animate-in fade-in zoom-in-95 duration-500 metallic-bevel">
                <img 
                  src={imageUrl} 
                  alt="Product Mockup Preview" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none"
                />
                <div className="absolute top-4 left-4 bg-slate-950/95 px-3 py-1 rounded-md text-[10px] font-mono font-bold text-[#00e5ff] tracking-widest flex items-center gap-1.5 shadow-md border border-slate-750">
                  <Eye size={12} className="text-cyan-400 animate-pulse" />
                  PREVIEW_SIGNAL_OK // {selectedProduct.toUpperCase()}
                </div>
              </div>
            ) : (
              <div className="w-full max-w-xl aspect-square flex flex-col items-center justify-center border-4 border-double border-slate-300 rounded-3xl bg-white shadow-inner p-8 text-center relative overflow-hidden metallic-bevel">
                {/* Vintage grid overlay in background */}
                <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-5 border-2 border-slate-200 shadow-inner">
                  <ImageIcon className="w-7 h-7 text-slate-400" />
                </div>
                <p className="text-slate-900 font-black text-md uppercase font-mono tracking-tight">
                  {creationMode === 'prompt' ? '在右侧输入您的设计灵感' : '请在右侧选择或上传您的设计图纸'}
                </p>
                <p className="text-slate-400 text-xs mt-2 max-w-sm font-mono leading-relaxed uppercase">
                  我们的人工智能设计师会精确捕捉图案需求，并直接投影至目标高端日常载体。
                </p>
              </div>
            )}

            {/* 载体切换 Tab */}
            <div className="mt-12 flex flex-col items-center gap-4 w-full max-w-3xl">
              <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest text-center">// SELECT TARGET HARDWARE CARRIER GROUP //</span>
              
              <div className="w-full space-y-4">
                {/* Group 1: Home Textiles */}
                <div className="bg-white/80 p-3 rounded-2xl border border-indigo-100 shadow-3xs">
                  <div className="flex items-center gap-1.5 px-2 mb-2">
                    <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-200/50 px-1.5 py-0.5 rounded uppercase">
                      家纺智造 (Home Textiles)
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(['Bedding', 'Pillow'] as ProductType[]).map((type) => {
                      const shortLabels = {
                        'Bedding': '🛏️ 贡缎长绒棉四件套',
                        'Pillow': '🧸 超柔高弹性抱枕'
                      } as any;
                      const isSelected = selectedProduct === type;
                      return (
                        <button
                          key={type}
                          onClick={() => setSelectedProduct(type)}
                          className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-indigo-650 text-white shadow-md font-bold ring-2 ring-indigo-400' 
                              : 'text-slate-600 hover:text-indigo-650 hover:bg-slate-50 border border-slate-150 bg-white'
                          }`}
                        >
                          {shortLabels[type]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Group 2: Apparel & Life */}
                <div className="bg-white/80 p-3 rounded-2xl border border-slate-200 shadow-3xs">
                  <div className="flex items-center gap-1.5 px-2 mb-2">
                    <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded uppercase font-semibold">
                      日常生活物件 (Living & Utility)
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(['Mug', 'Sticker'] as ProductType[]).map((type) => {
                      const shortLabels = {
                        'Mug': '🥛 高白骨瓷杯',
                        'Sticker': '🏷️ 防水不干胶贴'
                      } as any;
                      const isSelected = selectedProduct === type;
                      return (
                        <button
                          key={type}
                          onClick={() => setSelectedProduct(type)}
                          className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-black text-white shadow-md font-bold' 
                              : 'text-slate-600 hover:text-black hover:bg-gray-50 border border-slate-150 bg-white'
                          }`}
                        >
                          {shortLabels[type]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Group 3: Geek Culture */}
                <div className="bg-white/80 p-3 rounded-2xl border border-slate-200 shadow-3xs">
                  <div className="flex items-center gap-1.5 px-2 mb-2">
                    <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded uppercase font-semibold">
                      智玩文创 (Geek & Art Showcase)
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(['Acrylic', 'Toy', 'BlindBox'] as ProductType[]).map((type) => {
                      const shortLabels = {
                        'Acrylic': '💎 高端立牌摆件',
                        'Toy': '🤖 极客限定潮玩',
                        'BlindBox': '🎁 奇遇新潮流盲盒'
                      } as any;
                      const isSelected = selectedProduct === type;
                      return (
                        <button
                          key={type}
                          onClick={() => setSelectedProduct(type)}
                          className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-black text-white shadow-md font-bold' 
                              : 'text-slate-600 hover:text-black hover:bg-gray-50 border border-slate-150 bg-white'
                          }`}
                        >
                          {shortLabels[type]}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* 灵感设计与实物展陈 */}
          <div className="w-full max-w-4xl border-t border-gray-200/60 pt-12 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-md font-bold text-gray-900 flex items-center gap-2">
                  <Compass size={18} className="text-black" />
                  灵感设计实例 & 卓越物化示例
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  选择您心仪的艺术设计模板，或直接品鉴实物样品的生产细节水准。
                </p>
              </div>
              
              {/* 二级切换 tab */}
              <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200/50 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveGalleryTab('designs')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    activeGalleryTab === 'designs'
                      ? 'bg-white text-black shadow-xs'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  玩家社区画廊
                </button>
                <button
                  type="button"
                  onClick={() => setActiveGalleryTab('physicals')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    activeGalleryTab === 'physicals'
                      ? 'bg-white text-black shadow-xs'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  成品实物示例
                </button>
              </div>
            </div>

            {activeGalleryTab === 'designs' ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-350">
                {COMMUNITY_GALLERY.map((item, idx) => (
                  <div
                    key={idx}
                    className="group flex flex-col justify-between"
                  >
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 mb-3 group-hover:shadow-lg transition-all border border-gray-200/60">
                      <img
                        src={item.url}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[10px] font-sans font-semibold text-gray-900 px-2.5 py-1 rounded-full shadow-sm">
                        {item.tag}
                      </div>

                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur text-[10px] font-sans font-semibold text-white px-2.5 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        {item.likes}
                      </div>

                      {/* Action Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button
                          onClick={() => {
                            setCreationMode('prompt');
                            setPromptInput(item.prompt);
                            setSelectedProduct(item.carrier);
                            // Scroll up maybe?
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="flex-1 bg-white/95 hover:bg-white text-black text-[11px] font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                        >
                          <Wand2 size={12} />
                          Remix衍生
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProduct(item.carrier);
                            useCreatorStore.setState({ imageUrl: item.url });
                            setOrderStep('configure');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="flex-1 bg-black/95 hover:bg-black text-white text-[11px] font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                        >
                          <ShoppingBag size={12} />
                          买同款
                        </button>
                      </div>
                    </div>
                    
                    <div className="px-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="text-sm font-bold text-gray-900 truncate">{item.name}</h4>
                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">{item.carrier}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <img src={item.avatar} alt={item.author} className="w-4 h-4 rounded-full bg-gray-100" />
                          <span className="text-xs text-gray-500 font-medium">{item.author}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-350">
                {PHYSICAL_PRODUCT_EXAMPLES.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedProduct(item.carrier);
                      // load sample output preview
                      useCreatorStore.setState({ imageUrl: item.url });
                    }}
                    className="group border border-gray-200/65 rounded-xl bg-white p-4 shadow-xs hover:border-black/60 hover:shadow-md transition-all cursor-pointer flex gap-4"
                  >
                    <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-50">
                      <img
                        src={item.url}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute bottom-1.5 left-1.5 bg-black/75 backdrop-blur-sm text-[8px] font-bold text-white px-1.5 py-0.5 rounded tracking-wide uppercase">
                        {item.carrier}
                      </span>
                    </div>
                    <div className="flex flex-col justify-between py-0.5 min-w-0 flex-1">
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 group-hover:text-black transition-colors truncate">{item.name}</h4>
                        <p className="text-[10px] text-gray-400 mt-1 leading-relaxed line-clamp-2">{item.desc}</p>
                      </div>
                      
                      {/* Specs tags */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.specs.slice(0, 2).map((s, si) => (
                          <span key={si} className="bg-gray-50 border border-gray-150 font-medium text-[9px] text-gray-500 px-1.5 py-0.5 rounded-md font-sans truncate">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <footer className="p-6 border-t border-gray-200/60 bg-white/40 flex justify-between items-center text-xs text-gray-400 font-mono">
          <div>DELIVERY METHOD: SF-EXPRESS SPECIAL LINE</div>
          <div>你的想象，变为实物</div>
        </footer>
      </div>

      {/* 右侧：AI Copilot 侧边栏与收银台 (35%) */}
      <div className="w-full lg:w-[35%] h-auto lg:h-full bg-white flex flex-col lg:border-l border-gray-100 pb-16 lg:pb-0">
        <header className="border-b border-gray-100 p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            <span className="font-semibold text-sm text-gray-900 tracking-tight">AI Co-designer Copilot</span>
          </div>
          <span className="text-xs font-mono bg-gray-50 text-gray-400 border border-gray-200/50 px-2.5 py-1 rounded">
            DURABLE ENGINE
          </span>
        </header>

        {/* 动态区域 */}
        <div className="flex-1 overflow-y-auto font-sans">
          {orderStep === 'design' && (
            <div className="p-6 flex flex-col gap-6">
              
              {/* 共创模式切换 */}
              <div className="grid grid-cols-2 p-1 bg-gray-100/80 rounded-lg border border-gray-200/40">
                <button
                  onClick={() => {
                    setCreationMode('prompt');
                  }}
                  className={`py-2 px-3 rounded-md text-xs font-semibold tracking-tight transition-all flex items-center justify-center gap-1.5 ${
                    creationMode === 'prompt'
                      ? 'bg-white text-black shadow-xs'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  <Sparkles size={13} />
                  创意AI全新生成
                </button>
                <button
                  onClick={() => {
                    setCreationMode('blueprint');
                  }}
                  className={`py-2 px-3 rounded-md text-xs font-semibold tracking-tight transition-all flex items-center justify-center gap-1.5 ${
                    creationMode === 'blueprint'
                      ? 'bg-white text-black shadow-xs'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  <Upload size={13} />
                  提供现有设计图
                </button>
              </div>

              {creationMode === 'blueprint' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border border-dashed border-gray-300 rounded-xl p-5 bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer text-center relative"
                    onClick={() => fileInputRef.current?.click()}>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleLocalFileUpload} 
                      accept="image/*" 
                      className="hidden" 
                    />
                    <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                    <span className="text-xs font-semibold text-gray-800 block">点击或拖拽上传设计图大样</span>
                    <span className="text-[10px] text-gray-400 block mt-1">支持 PNG, JPG, WEBP 等格式</span>
                  </div>

                  {/* 推荐底本 */}
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-2.5">
                      或者直接选用臻选高精度大样
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {PRESET_BLUEPRINTS.map((bp, i) => {
                        const isSelected = selectedBlueprint === bp.url;
                        return (
                          <button
                            key={i}
                            onClick={() => selectPresetBlueprint(bp.url)}
                            className={`border rounded-lg p-1.5 text-left transition-all ${
                              isSelected 
                                ? 'border-black bg-gray-50 ring-1 ring-black' 
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <img src={bp.url} className="w-full aspect-square object-cover rounded-md mb-1.5" />
                            <span className="text-[10px] font-bold block truncate text-gray-900">{bp.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 处理动作按钮 */}
                  {selectedBlueprint && (
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3 animate-in slide-in-from-bottom-2 duration-200">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded border border-gray-200 overflow-hidden bg-white">
                          <img src={selectedBlueprint} className="w-full h-full object-cover animate-in fade-in duration-300" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-850">已选定设计图纸</div>
                          <div className="text-[10px] text-gray-400 font-mono uppercase">Reference Source Ready</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => processBlueprint('direct')}
                          className="bg-black hover:bg-gray-800 text-white rounded-lg py-2.5 px-3 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                        >
                          直接下单提交
                          <ArrowRight size={12} />
                        </button>
                        <button
                          onClick={() => processBlueprint('ai-modify')}
                          className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg py-2.5 px-3 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                        >
                          <Wand2 size={12} className="text-purple-500" />
                          AI 修改后再提交
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {creationMode === 'prompt' && (
                <div className="space-y-4">
                  {chatHistory.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`px-4 py-3.5 rounded-xl max-w-[90%] text-sm leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-black text-white rounded-br-none' 
                          : 'bg-gray-50 text-gray-800 border border-gray-100 rounded-bl-none'
                      }`}>
                        {msg.content}
                      </div>
                      <span className="text-[10px] font-mono text-gray-400 mt-1.5 px-1 uppercase tracking-wider">
                        {msg.role === 'user' ? 'CLIENT // REQUEST' : 'ASSISTANT // AGENT'}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {isGenerating && (
                <div className="flex justify-center p-6 bg-slate-50 border border-slate-100 rounded-xl items-center gap-3 animate-pulse relative overflow-hidden">
                  <div className="absolute inset-x-0 w-full h-[1px] bg-gradient-to-r from-transparent via-black to-transparent top-0 opacity-20" />
                  <Loader2 size={16} className="animate-spin text-black shrink-0" />
                  <span className="text-xs font-mono font-bold tracking-tight text-slate-800 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500">
                    🔥 跨次元通讯中...AI正在为你注入赛博灵魂
                  </span>
                  <div className="absolute inset-x-0 w-full h-[1px] bg-gradient-to-r from-transparent via-black to-transparent bottom-0 opacity-20" />
                </div>
              )}
            </div>
          )}

          {orderStep === 'configure' && (
            <div className="p-8 space-y-8 animate-in slide-in-from-right-2 duration-200 font-sans">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">
                <Sliders size={14} />
                01 / Spec Configurations
              </div>
              
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-gray-900">产品规格与参数</h3>
                <p className="text-xs text-gray-400 mt-1">请选择生产物料的基础设置项目</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2.5">设计产品底材色 (Material Tone)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {getProductColors().map(col => (
                      <button 
                        key={col.name}
                        onClick={() => setSelectedColor(col.name)}
                        className={`border rounded-lg py-3 px-4 text-xs font-medium transition-all text-left flex flex-col justify-between ${
                          selectedColor === col.name 
                            ? 'border-black bg-white ring-1 ring-black shadow-xs' 
                            : 'border-gray-200 hover:border-gray-300 bg-gray-50/50 text-gray-600'
                        }`}
                      >
                        <span className="font-semibold block truncate max-w-full">{col.label}</span>
                        <span className="text-[10px] opacity-60 font-mono mt-1 pr-1 truncate max-w-full">{col.name.toUpperCase()}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2.5">对应生产尺寸 (Base Dimension)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {getProductSizes().map(szItem => {
                      return (
                        <button 
                          key={szItem.sz} 
                          onClick={() => setSelectedSize(szItem.sz)}
                          className={`border rounded-lg py-2.5 px-3 transition-all flex flex-col items-center justify-center text-center ${
                            selectedSize === szItem.sz 
                              ? 'border-black bg-white ring-1 ring-black shadow-xs text-slate-900' 
                              : 'border-gray-200 hover:border-gray-300 bg-white text-gray-550'
                          }`}
                        >
                          <span className="font-extrabold text-[11px] whitespace-nowrap">{szItem.label}</span>
                          <span className="text-[8px] opacity-70 mt-1 scale-95 leading-tight">{szItem.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2.5">物料与财务凭证 (Financial Audit)</label>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex justify-between text-xs mb-2.5">
                      <span className="text-gray-500">
                        {selectedProduct === 'Bedding' 
                          ? '60S/100S 奢华贡缎床品定制费' 
                          : selectedProduct === 'Pillow' 
                            ? '双面贡缎羽丝抱枕高定工本费' 
                            : '高保真物化基底耗材工本费'}
                      </span>
                      <span className="font-mono font-semibold text-gray-900">￥{getProductPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">五温固化防褪色涂层服务费</span>
                      <span className="font-mono font-semibold text-green-600">FREE / 免费</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200/60 flex justify-between items-center">
                      <span className="font-medium text-xs text-gray-900">订单总合计</span>
                      <span className="text-lg font-mono font-bold text-gray-900">￥{getProductPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button 
                    onClick={() => setOrderStep('checkout')}
                    className="w-full bg-black text-white rounded-lg py-3.5 font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
                  >
                    确认上述规格并结算
                    <ChevronRight size={16} />
                  </button>
                  <button 
                    onClick={() => {
                      setOrderStep('design');
                      setSelectedBlueprint(null);
                    }}
                    className="w-full text-center text-gray-500 text-xs py-2 hover:text-black transition-colors"
                  >
                    ← 返回面板重新修改设计
                  </button>
                </div>
              </div>
            </div>
          )}

          {orderStep === 'checkout' && (
            <div className="p-8 space-y-8 animate-in slide-in-from-right-2 duration-200">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">
                <ShoppingBag size={14} />
                02 / Shipping Address
              </div>
              
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-gray-900">物理显化节点授权</h3>
                <p className="text-xs text-gray-400 mt-1">请登记坐标以建立数字连接，调度无人车与骨干网络</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">造物主代号 (Creator ID)</label>
                  <input 
                    type="text" 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all bg-gray-50/50 text-sm"
                    placeholder="请输入代号"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">生产联络专线 (Phone Number)</label>
                  <input 
                    type="tel" 
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all bg-gray-50/50 text-sm"
                    placeholder="请输入十一号信道联络码"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">物理降落坐标 (Real-world Coordinates)</label>
                  <textarea 
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 h-24 resize-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all bg-gray-50/50 text-sm leading-relaxed"
                    placeholder="锚点精确到：星区-城市-街道-楼宇"
                  />
                </div>

                <div className="pt-4 space-y-3">
                  <button 
                    onClick={onCheckoutSubmit}
                    disabled={!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()}
                    className="group w-full bg-black text-white hover:bg-gray-900 rounded-xl py-4 font-bold transition-all disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-sm shadow-md overflow-hidden relative flex items-center justify-center gap-2"
                  >
                    <div className="absolute inset-0 bg-white/10 w-0 group-hover:w-full transition-all duration-300 ease-out z-0" />
                    <span className="relative z-10 flex items-center gap-2">⚡ 消耗 Token 启动物理锻造 // 造物能量: {getProductPrice().toFixed(2)}</span>
                  </button>
                  <button 
                    onClick={() => setOrderStep('configure')}
                    className="w-full text-center text-gray-400 text-xs py-2 hover:text-black transition-colors"
                  >
                    ← 返回上一步修改参数
                  </button>
                </div>
              </div>
            </div>
          )}

          {orderStep === 'success' && (
            <div className="p-8 h-full flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-300 relative">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-500 border border-green-100 shadow-sm relative overflow-hidden group">
                <CheckCircle2 size={36} className="relative z-10 transition-transform group-hover:scale-110 duration-500" />
                <div className="absolute inset-0 bg-green-400 opacity-20 blur-xl rounded-full mix-blend-screen mix-blend-multiply group-hover:opacity-50 transition-opacity"></div>
              </div>
              <h3 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 font-sans mb-2">部署成功 · 智造就绪</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-[280px] leading-relaxed mx-auto">
                赛博图纸（<span className="font-bold text-gray-800">{selectedProduct}</span>）已通过端到端加密流推送至超级工坊。流水线预热完成。准备好开箱炫耀了吗？
              </p>
              
              <div className="bg-gray-50 w-full p-4 rounded-xl border border-gray-200/60 text-left my-8 space-y-2.5 relative overflow-hidden backdrop-blur-sm shadow-inner group">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none group-hover:-translate-y-2 group-hover:opacity-[0.05] transition-all duration-700">
                  <Fingerprint size={80} />
                </div>
                <div className="text-xs flex justify-between font-mono items-center">
                  <span className="text-gray-400">UUID.HASH_KEY:</span>
                  <span className="font-semibold text-gray-800 bg-white px-2 py-0.5 rounded shadow-sm border border-gray-100">CRAFT_{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="text-xs flex justify-between font-mono items-center">
                  <span className="text-gray-400">FABRICATION:</span>
                  <span className="text-green-600 font-bold tracking-widest flex items-center gap-1.5"><Sparkles size={11} className="animate-pulse" />QUEUEING_//_排程中</span>
                </div>
                <div className="text-xs flex justify-between font-mono items-center">
                  <span className="text-gray-400">SPEED_PROTOCOL:</span>
                  <span className="font-semibold text-gray-700">48h_闪电空投</span>
                </div>
              </div>
              
              <div className="flex w-full gap-3 mt-auto">
                <button 
                  onClick={() => {
                    setSelectedBlueprint(null);
                    window.location.reload();
                  }}
                  className="w-1/3 px-3 py-3.5 bg-white text-gray-700 border border-gray-200 hover:border-black hover:text-black font-bold rounded-xl text-xs transition-all shadow-sm flex flex-col items-center justify-center gap-1.5"
                >
                  <RefreshCw size={14} className="opacity-70" /> 
                  <span className="scale-90">再搞一件</span>
                </button>
                <button 
                  onClick={() => alert('已将装配炫耀卡保存至相册，快发到小红书装杯吧！')}
                  className="w-2/3 px-4 py-3.5 bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl text-sm transition-all shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] flex items-center justify-center gap-2 hover:-translate-y-0.5 overflow-hidden relative group"
                >
                  <div className="absolute inset-0 bg-white/20 w-0 group-hover:w-full transition-all duration-300 ease-in-out" />
                  <Share2 size={16} className="relative z-10" /> 
                  <span className="relative z-10">生成社交炫耀卡</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 底部输入框 (仅在设计阶段可见) */}
        {orderStep === 'design' && (
          <div className="p-5 border-t border-gray-100 bg-white space-y-4 font-sans">
            
            {/* 灵感快捷推荐 (Inspirations list tags) */}
            {creationMode === 'prompt' && (
              <div className="space-y-3 animate-in fade-in duration-150">
                <div className="flex justify-between items-end mb-2.5">
                  <span className="text-[10px] font-mono text-gray-450 uppercase font-black tracking-wider flex items-center gap-1 text-slate-500">
                    <Sparkles size={11} className="text-indigo-500 animate-pulse" />
                    🔥 AI 极高定脑洞提案池
                  </span>
                  <button
                    onClick={() => {
                      const r = STRATEGIC_FORMULAS[Math.floor(Math.random() * STRATEGIC_FORMULAS.length)];
                      setPromptInput(r.prompt);
                      setSelectedProduct(r.carrier);
                    }}
                    className="text-[10px] font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md transition-colors flex items-center gap-1 -mb-1 shadow-sm"
                  >
                    🎲 一手盲盒
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 cursor-crosshair">
                  {STRATEGIC_FORMULAS.map((formula, fit) => (
                    <button
                      key={fit}
                      onClick={() => {
                        setPromptInput(formula.prompt);
                        setSelectedProduct(formula.carrier);
                      }}
                      className="text-xs bg-gradient-to-r from-slate-900 to-indigo-950 hover:from-black hover:to-indigo-900 transition-all text-white py-1.5 px-2.5 rounded-xl border border-slate-800 font-medium cursor-pointer shadow-2xs hover:scale-[1.02] active:scale-95 flex items-center gap-1.5 text-left"
                    >
                      <span className="drop-shadow-md">{formula.name}</span>
                      <span className="text-[8px] bg-cyan-400 text-slate-950 px-1 font-mono font-black scale-90 leading-normal rounded-sm">AUTO:{formula.carrier.toUpperCase()}</span>
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-1.5 pt-1">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <span>🌟</span>
                    常规模版快速输入
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {SAMPLE_SHORTCUTS.map((shortcut, index) => (
                      <button
                        key={index}
                        onClick={() => handleShortcutClick(shortcut)}
                        className="text-xs bg-gray-50 hover:bg-gray-100 hover:text-black border border-gray-200/60 transition-all text-gray-600 py-1 px-2.5 rounded-lg text-left cursor-pointer"
                      >
                        {shortcut}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {creationMode === 'blueprint' && selectedBlueprint && (
              <div className="text-xs text-gray-500 font-medium px-1 flex items-center gap-1 bg-purple-50/50 py-1.5 rounded-lg border border-purple-100/30 text-[11px] animate-in fade-in duration-350">
                <Wand2 size={12} className="text-purple-500" />
                <span>在下方输入“AI微调指令”（例如：添加艺术星宿边框、调整为金色浮雕效果）</span>
              </div>
            )}

            {/* Real-time Material Compatibility Design Quality Evaluator */}
            <DesignQualityEvaluator 
              prompt={promptInput}
              productType={selectedProduct}
              onApplyImprovement={(improvedText) => setPromptInput(improvedText)}
            />

            <div className="relative group">
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSend()}
                placeholder={
                  creationMode === 'blueprint' 
                    ? "输入二创 Remix 指令 (例如：增加酸性视觉滤镜，切换赛博配色)..." 
                    : "许愿池... 极简线稿猫咪？包豪斯抽象艺术？输入你的脑洞..."
                }
                disabled={isGenerating}
                className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-2xl pl-5 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all disabled:opacity-50 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] group-hover:shadow-[0_4px_14px_-3px_rgba(6,81,237,0.15)]"
              />
              <button 
                onClick={onSend}
                disabled={isGenerating || !promptInput.trim() || (creationMode === 'blueprint' && !selectedBlueprint)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2.5 bg-black text-white rounded-xl hover:bg-indigo-600 hover:scale-105 active:scale-95 disabled:bg-gray-100 disabled:text-gray-300 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
              >
                {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className="rotate-45 -translate-y-[1px] translate-x-[1px]" />}
              </button>
            </div>
            <div className="text-center text-[10px] text-gray-400 tracking-wider font-sans mt-3">
              ✨ MAKE IT REAL · 端到端无损智造引擎 ✨
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
