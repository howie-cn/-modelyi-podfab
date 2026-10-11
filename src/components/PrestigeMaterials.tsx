import React from 'react';
import { Layers, ShieldCheck, Cpu, Flame, Info, ChevronRight, Sparkles, Printer } from 'lucide-react';

export function PrestigeMaterials() {
  const SPECIFICATIONS = [
    {
      title: '高密奢柔双面贡缎羽丝抱枕/靠枕',
      category: '面料工艺',
      materials: '60S 双面高密贡缎 100% 桑蚕丝滑度级长绒棉 (配合高分子活性渗透印染 & 防变形立体中空羽丝绒)',
      features: [
        'AI曲面应力预收缩算法：针对抱枕充棉后球面高角度形变，设计阶段自动反向收缩预补偿，避免AI绚丽图案局部过度拉伸泛白、走样。',
        '高附着无感色度直喷：采用天然纤维固色因子，墨水长效分子级粘合浸染，不仅花纹鲜艳柔润，更有如婴儿肌肤般丝滑手感，无胶层突兀感。',
        '3D防陷高回弹性充棉：填充环保超弹九孔中空羽丝绒，经重力抗疲劳检测，即便经满幅油墨烤印仍保持绝佳蓬松，五年防塌陷变形。'
      ],
      genericComparison: '普通抱枕使用轻薄化纤涤纶，印制重色块易发硬结块、极易起球褪色，且填充黑心棉或低回弹性PP棉，使用几个月即严重塌陷。',
      imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: '极透水晶级双层 PMMA 亚克力立牌',
      category: '有机水晶制品',
      materials: '98% 超光感PMMA (智能倒圆削边 + 五轴红外微米精抛加工)',
      features: [
        'AI悬空小角度抗爆断圆滑：自动过滤合并小于1.5mm的尖刺与无意义悬空细纹（通过算法平滑为稳固倒角），防止热切割时应力变形爆片。',
        '钻石级红外五轴切抛：利用五轴激光头高频微进给热修边，不产生残余机械应力，彻底消灭激光急剧局部受热导致的物理裂纹。',
        '气阀无尘双层热熔封装：双面高饱和画卷全无缝热熔夹层，完美密封保护AI繁复渐变阶调，防日晒黄化与褪色。'
      ],
      genericComparison: '常规使用回收亚克力，透光率仅80%，有塑料杂质。对于AI生成的奇形怪状锐角不具备倒圆算法，切割极易崩碎，且边缘刮手。',
      imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: '至纯高白绝温骨瓷杯 MUG',
      category: '精细陶瓷器皿',
      materials: '高纯瓷土 + 40% 天津特级天然骨炭粉 (自动像素投影去失真转贴技术)',
      features: [
        'AI曲率解失真图像映射：AI自动贴图经常造成缩口杯身拉伸畸变。平台自研3D解耦映射，打印前自动进行非线性形变反补偿。',
        '釉中二次烤花抗开裂：1200℃窑温还原二次煅烧，将高饱和AI图样融入釉中，陶瓷与彩釉热膨胀系数精准同步，避免重色块大面积开裂剥除。',
        '无死角极耐冷热温差：热震稳定性优异，可经受220℃急速温度跳跃，解决印制重色彩纹饰后陶瓷局部容易热应力脆弱破裂问题。'
      ],
      genericComparison: '普通重质炻瓷受热极易爆裂，大面满底彩色烤花容易出现起颗粒气孔、黑斑与釉裂，难以应对AI大色彩满全画幅烧制。',
      imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: '全幅贡缎 60支长绒棉高定四件套床品',
      category: '床上寝房系列',
      materials: '100% 甄选长绒棉 (拼缝全画幅错位智能对整 + 六十支高密贡缎)',
      features: [
        '巨幕级无色断拼缝对整：对AI巨幅全包构图进行模块分切排布，智能抓底锁边确保缝线处图案偏差小于1mm，完美重现宽荧幕神性画布。',
        '双股丝光耐洗防糙：超精细两重丝光固色工艺，即便面临深彩AI大墨位喷印仍提供亲肤透爽，阻断重金属及游离醛等有害残留。',
        '无感活性渗透彩印：环保微粒直渗原棉分子，摆脱胶感和发硬硬梗块，即便经久受日晒及机洗，画卷细腻层次仍历久弥新。'
      ],
      genericComparison: '普通大花套件常出现拼缝图案割裂或严重错缝。涤化纤或涤棉混纺，遇汗结块，大片高密深色印染部分粗糙发硬甚至散发刺鼻气味。',
      imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: '双面超柔短密针刺绒舒适靠边抱枕',
      category: '美学软奢家居',
      materials: '高回弹A级三维中空PP棉 + 双面像素直喷超舒短松绒 (球面预压张力收缩算法)',
      features: [
        '三维球面拉伸智能预压缩：自动预估膨胀体积并对AI制图实施反畸变逆演算，充棉后图案比例完美对应，不扁平不怪异拉伸。',
        '锁绒细密高色饱和：长纤维极密咬合，确保每一寸复杂的AI晕染底噪、微小发光纹理颗粒完美还原，经久不脱、抗压防陷塌。',
        '全隐蔽隐藏窄拉封口：一缝走底侧隐拉闭合，抗高弹性冲击撕扯检验，经双层针脚锁边，绝不留蹦齿蹦边破缝隐患。'
      ],
      genericComparison: '低克重涤沦面料在填充PP棉后纤维缝隙拉大，使得图案表面出现丝白裂纹、拉扯变形，封口一拉即挣开开裂。',
      imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: '纳米高耐候强自粘户外抗爆不干胶纸',
      category: '自由潮玩拉标',
      materials: '高韧耐撕 PVC 树脂 + 智能微细路径断线清除件配 (微雕模切工艺)',
      features: [
        'AI杂乱矢量碎线自动合并：AI生成的极繁线描、零散飞屑像素通过路径简化处理器，微去噪倒圆角（R角在0.5mm以上），杜绝日晒风阻吹拂导致死角翘边剥落。',
        '哑光抗眩纳米固化防护：表面敷设高拉阻抗眩哑面保护膜，不仅防光阻氧化，更能紧扣极细微文字线条、防止磨损脱离。',
        '底附无残留高粘胶：选用无温差变化的进口背贴，紧密贴实车漆、电脑等表面而不损伤基材，撕离免除大块胶土残渍。'
      ],
      genericComparison: '廉价纸质贴因细碎翘角在两周内极易卷翘、脱色开裂崩溃，雨淋即漏残胶斑驳一片极难清理、对应用底物造成污损。',
      imageUrl: 'https://images.unsplash.com/photo-1608155686393-8fdd966d784d?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: '奢华极客限定 3D 高精打印手作潮玩雕像',
      category: '数字物化艺术品',
      materials: '超高精数字光敏树脂 + 物理平衡自动演算分件系统 (重力重算拼装结构)',
      features: [
        '物理悬空质心受力智能重算：AI浮空夸张人物姿态通过物理引擎重新计算中空度，自动重铸底座纯金属加重，彻底消灭倾倒与弯腰形变。',
        '高精榫卯无痕完美拆件：全智能微级拼缝，将AI天马行空的有机孔洞与极难打印的悬伸物拆解为相互支撑模块，消除打印坍塌。',
        '九道手工精研颗粒多级退火：消除大彩大墨3D层纹杂质，光洁度达到精密机加微米级，让AI结构在实物上呈现高雅象牙温润。'
      ],
      genericComparison: '常规整模吸塑，对非标准浮空AI结构不调整重力比例直接歪倒断折。合模模缝严重坍缩错位极明显，细部由于打印悬空垮漏一团。',
      imageUrl: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: '高拉阻泥压齿单线潮流单入易撕封盲盒',
      category: '潮流概念封箱',
      materials: '智能防开裂油墨配比 + 柔性UV保护折压面 (复合重阻特厚瓦楞板)',
      features: [
        '柔韧防爆底墨精心配：特选抗疲劳水性聚氨酯乳液和防开裂UV油墨，在急拐弯直折死九十度角时毫无表层撕白绽裂。',
        '精密压线防翘撕平滑口：德国大牌刀具对多层复合牛卡进行精算冲切，纸屑零残留，既保障快递多叠耐压，又能顺畅一撕切透到底。',
        '内芯多舱格挡完全抗擦：极具防静电无划痕泡罩包裹，在颠簸物流振荡中无掉色无面部互刮摩擦，彻底捍卫非标准AI潮玩完好。'
      ],
      genericComparison: '廉价劣质白板纸遇重颜色在大折角压痕处严重撕裂漏白、起壳掉渣、毫无拆箱快感且盒身严重变形散包。',
      imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: '南通鑫宇高张力微孔丝印网版介质 (NTXYSY Fine Mesh Systems)',
      category: '高张力丝印介质',
      materials: '特选聚酯(PET)/尼龙单丝高目数超限编织 (12T-165T 优等涤纶单丝多级经纬对射编织网砂)',
      features: [
        '高强度低延展性经纬对齐：极高经纬对齐密度。网版在使用刮墨刀（Squeegee）承受极度物理磨损与压迫力时，张力偏移控制在 0.3N/cm 以内，保障多色大图全包拼缝或对插高精度套色误差小到微米级。',
        '超高开口率高透过墨腔：单丝表面实施超顺滑纳米涂布工序，开孔率均整、不堵眼，支持包含活性冷染、耐候UV重墨等多组墨系的高速、饱满透过，解决传统大色彩重色块过渡带粗糙与锯齿。',
        '多级微米感光胶极高咬合度：高亲脂感光粉表面固着涂布。在极繁复杂AI图（如2D画廊海报、赛博渐变字、细微浮点、1%网点）显影阶段，感光剂极高贴咬不发生任何死角剥落或飞屑，重现极限虚实呼吸调阶。'
      ],
      genericComparison: '普通劣质丝网多用低韧复丝，一经泵拉张力即刻松弛坍缩、变形失真。印制高保真深色AI彩图时开孔严重不均、经常大面积堵孔胡底，导致复杂噪点插画出现剥白与崩线爆点。',
      imageUrl: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=800&auto=format&fit=crop'
    }
  ];

  const STRATEGIC_INITIATIVES = [
    {
      title: '硬核机能风/赛博朋克“装备贴”',
      englishTitle: 'Tech & Gear Decals',
      capacity: '化工标签、工业警示标签 (Chemical & Hazard Overlays)',
      concept: '将传统的“防静电”、“危险电压”、“磁场辐射”等工业硬格调警示标语，结合 AI 生成的科技几何线条、赛博朋克机甲插画，打造出极具极客秩序的单品装饰包。',
      scenarios: [
        '贴在高端 MacBook、掌机、客制化电脑主机箱外部',
        'Rimowa 铝合金行李箱及碳纤维旅行挂包点缀',
        '极客玩家无人机、遥控车等外壳及电源模块上贴合'
      ],
      marketing: '“绝非普通纸贴，而是真正防刮、耐磨、耐弱酸碱腐蚀的工业重型防护级铠甲。”',
      icon: Cpu,
      imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop',
      badge: '首创爆款'
    },
    {
      title: '户外高端高溢价“车贴/板贴”',
      englishTitle: 'Outdoor & Auto Decals',
      capacity: '极限耐候抗 UV / 防辐射商标印制 (Weatherproof Sun-block Logos)',
      concept: 'AI 自动为露营同好、越野俱乐部生成专属的“公路探险徽标”、“山海图腾标签”或“滑板滑雪流线涂鸦”，针对户外极端高温低寒智能微调固色剂。',
      scenarios: [
        '越野汽车后尾门、车窗及油箱盖美化',
        '专业滑板反面、双板滑雪板高磨损区域包覆',
        '户外露营 YETI 冰箱、岩谷卡式炉外壳等极寒极热极端工况点缀'
      ],
      marketing: '“户外暴晒防水 5 年不褪色、全面重归防紫外线损伤暴晒抗变形极限性能，为高光泽保驾护航。”',
      icon: Flame,
      imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop',
      badge: '硬核耐候'
    },
    {
      title: 'Y世代高定家居“断舍离”收纳标',
      englishTitle: 'Aesthetic Home Labels',
      capacity: '日化极强防油温水阻不干胶生产 (Home Care Grease-proof Labels)',
      concept: '迎合极简/北欧/日式生活美学，用户仅需在对话框输入物品名称、原产地参数，AI 即可一键排版带有细描线稿、小资字体的食品日用高雅统一标签。',
      scenarios: [
        '厨房玻璃油盐罐、全密封散茶五谷收纳瓶的一致性换装',
        '卫浴香薰分装樽（洗发水/沐浴露/高档护肤液）的北欧风瓶标',
        '极低胶痕不干胶制，方便用户日后随意无损换标、不留发黑底渍'
      ],
      marketing: '“一秒统一您的生活美学、防油防水、日常摩擦不留灰，完美构建MUJI极致空间视觉。”',
      icon: Layers,
      imageUrl: 'https://images.unsplash.com/photo-1502239608882-93b729c6af43?q=80&w=800&auto=format&fit=crop',
      badge: '极简美学'
    },
    {
      title: '专属派对/伴手礼“高定瓶贴”',
      englishTitle: 'Event & Gift Custom Wraps',
      capacity: '特种质感宣纸、金银哑膜及特种丝印不干胶 (Premium Textured Foil Overlays)',
      concept: '精准锁合婚礼纪、宝宝满月或高定寿礼，AI 自动绘制故事性浪漫插画或隽永文字。用户买来大众红酒、啤酒包装纸，一贴换新，秒变全球限量伴手礼。',
      scenarios: [
        '定制婚礼新婚纪念法国红酒封标',
        '兄弟同盟、户外营地精酿啤酒瓶纸统一换标',
        '复古咖啡密封袋包装锁口贴、生日聚享无火香薰杯标签'
      ],
      marketing: '“普通快消名酒的一贴换骨之作，赋予每一件大众产品纯正的、无可复制的数字专属灵魂。”',
      icon: Sparkles,
      imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop',
      badge: '礼赠首选'
    },
    {
      title: '艺术降维“丝印版画与潮玩立牌”',
      englishTitle: 'Silk-Screen Pop Arts',
      capacity: '重工艺大型商业广告网印丝印 (High-solid Screen Print Relie}',
      concept: '将工业上自带强烈“纯手工、重色层、天然微肌理感”的丝网工艺导入极其厚重的水晶级亚克力底板或高品高密卡纸上，创造极具复古波普收藏气质的模型。',
      scenarios: [
        '艺术家居、复古电竞房装饰桌面厚亚克力无框立体摆件',
        '限量版画纸本精印，带有独立收藏编号的高饱和视觉海报',
        '艺术高奢品牌概念展示标牌加工'
      ],
      marketing: '“消弭像素网点的无机冷漠，以丰沛的油墨微浮雕颗粒质感，打造百元级画廊藏品。”',
      icon: ShieldCheck,
      imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=800&auto=format&fit=crop',
      badge: '艺术臻藏'
    },
    {
      title: '高目数“高张力印花网砂与过滤网片”',
      englishTitle: 'NTXYSY Fine Screen & Mesh',
      capacity: '高性能涤纶(Polyester)丝印网砂 & 聚乙烯防尘滤网 (12T-165T Monofilament Precision Weaves)',
      concept: '将原本服务于大型PCB、光伏以及工业触控屏高精印刷的超细旦单丝高涨力经纬编织网纱技术，解耦重组到民用级新风滤清、活性色浆双面家纺床品直喷，以及小规模轻工业服装印花中，呈现分子级孔径分布优势。',
      scenarios: [
        '创意个性化大厂空调节能精滤：高阶低风阻抑菌单丝高强度尼龙筛网定制，阻隔细小毛絮及PM10微尘',
        '小家纺双色双面高保真网印：为至臻贡缎系列订制超高开口率 350目 涤纶网版网纱，实现满油重彩极速顺透度',
        '饮用水/热酿高纯无阻级微滤：符合食品接触级高透锦纶超微过滤层，抗溶剂、不易磨发散且清洗即亮如新'
      ],
      marketing: '“依托鑫宇级 120T 阶高均孔隙分布，杜绝印染漏丝糊版。耐磨损寿命提至 4-5 倍，真正兼取工业韧性与居家精细。”',
      icon: Printer,
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
      badge: '重网精织'
    }
  ];

  const [activeStrategy, setActiveStrategy] = React.useState(0);

  return (
    <div id="materials-view" className="w-full bg-[#fcfcfc] text-gray-900 font-sans min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header Title section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-xs font-semibold text-gray-700 shadow-xs border border-gray-150">
            <Layers size={12} className="text-black" />
            <span>MATERIAL ARCHITECTURE</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-950 tracking-tight leading-tight">
            至臻，始于物性
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed md:text-base">
            我们深知，好的设计不应只停留在显示屏中。高精物化工坊拒绝粗劣，
            在工艺母版之选上偏执严苛，方将每一款思想投影定型，历经岁月依然弥显贵重。
          </p>
        </div>

        {/* Dynamic Detail Cards */}
        <div className="space-y-12">
          {SPECIFICATIONS.map((spec, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200/60 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col lg:flex-row gap-8 p-6 lg:p-8"
            >
              {/* Product preview graphic left/right alternated */}
              <div className={`w-full lg:w-2/5 aspect-4/3 lg:aspect-square rounded-2xl overflow-hidden bg-gray-50 object-cover ${index % 2 === 1 ? 'lg:order-last' : ''}`}>
                <img
                  src={spec.imageUrl}
                  alt={spec.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none"
                />
              </div>

              {/* Text specifications */}
              <div className="flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold bg-black text-white px-2 py-0.5 rounded tracking-wider uppercase">
                      {spec.category}
                    </span>
                    <span className="text-xs font-semibold text-gray-400">至臻母级料件</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-gray-900 mt-2 tracking-tight">{spec.title}</h3>
                  <p className="text-xs font-mono font-bold text-indigo-600 mt-1.5 flex items-center gap-1">
                    <Sparkles size={11} /> 
                    基质成分 // {spec.materials}
                  </p>

                  {/* Highlights Bullet list */}
                  <div className="mt-6 space-y-3.5">
                    {spec.features.map((feat, fi) => {
                      const [title, desc] = feat.split('：');
                      return (
                        <div key={fi} className="flex gap-2.5 items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-black/80 mt-1.5 shrink-0" />
                          <div className="text-xs leading-relaxed text-gray-600">
                            <span className="font-extrabold text-gray-950">{title}</span>
                            <span>：{desc}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Comparative details */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-150 text-left">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                    <Info size={11} className="text-gray-400" />
                    <span>对比普通消费工业品</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-normal">
                    {spec.genericComparison}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 💥 NEW ADDITION: Brand-New Five High-Value 2C Creative Strategic Initiatives Section */}
        <div className="border-2 border-slate-300 rounded-3xl p-6 lg:p-10 bg-slate-950 text-white space-y-8 shadow-xl relative overflow-hidden">
          {/* Subtle decoration vector */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="space-y-2 relative z-10 z-[2]">
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest block">// INDUSTRIAL CAPACITY & CONSUMER CREATIVITY UPGRADE //</span>
            <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-2">
              <Sparkles className="text-cyan-400 animate-pulse" size={24} />
              重工余量产能：五大 C端高溢价智造转化企划
            </h2>
            <p className="text-xs text-slate-400 font-mono leading-relaxed max-w-4xl">
              结合自研AI高保真图形学引擎与多轴、高附着力、特种防爆印刷工艺，将传统“面向大型工程采购”的工业化冗余产能，以柔性1件起订矩阵解耦重组，完美映射于极客、户外、家居硬派生活场景中。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
            {/* Left selector rails (5 columns) */}
            <div className="lg:col-span-4 flex flex-col gap-2.5">
              {STRATEGIC_INITIATIVES.map((item, idx) => {
                const IconComp = item.icon;
                const isSelected = activeStrategy === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStrategy(idx)}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex items-center gap-3.5 group relative overflow-hidden ${
                      isSelected 
                        ? 'bg-slate-900 border-cyan-400 text-white shadow-lg' 
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/90'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400"></div>
                    )}
                    <div className={`p-2 rounded-xl transition-colors shrink-0 ${isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-500 group-hover:text-slate-350'}`}>
                      <IconComp size={18} />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black tracking-tight">{item.title}</span>
                        <span className="text-[9px] bg-red-500/20 text-red-300 font-semibold px-1 rounded-xs uppercase tracking-tighter shrink-0">{item.badge}</span>
                      </div>
                      <div className="text-[9px] font-mono text-slate-500 font-semibold tracking-wider uppercase leading-none">{item.englishTitle}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right details visualization (8 columns) */}
            <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row gap-6 animate-in fade-in duration-300">
              {/* Product sample mockup */}
              <div className="w-full md:w-2/5 aspect-video md:aspect-square rounded-xl overflow-hidden shrink-0 border border-slate-800 object-cover">
                <img
                  src={STRATEGIC_INITIATIVES[activeStrategy].imageUrl}
                  alt={STRATEGIC_INITIATIVES[activeStrategy].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-750"
                />
              </div>

              {/* Specifications block */}
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div>
                    <span className="text-[9px] font-mono text-emerald-400 font-black uppercase tracking-wider block bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded-sm w-fit mb-1">// 承接本厂工业产能</span>
                    <span className="text-xs font-bold text-slate-200">{STRATEGIC_INITIATIVES[activeStrategy].capacity}</span>
                  </div>

                  <hr className="border-slate-800" />

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold block uppercase tracking-wider">💡 AI 智造创意演绎 (Creative Translation) :</span>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">{STRATEGIC_INITIATIVES[activeStrategy].concept}</p>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-amber-400 font-bold block uppercase tracking-wider">🎯 2C 零售落地场景 (Retail Scenarios) :</span>
                    <ul className="space-y-1">
                      {STRATEGIC_INITIATIVES[activeStrategy].scenarios.map((sc, sidx) => (
                        <li key={sidx} className="text-xs text-slate-400 flex items-start gap-1.5">
                          <span className="text-[8px] mt-1.5 text-slate-600">◼</span>
                          <span>{sc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-3.5 bg-cyan-950/30 border border-cyan-800/40 rounded-xl">
                  <span className="text-[9px] font-mono text-cyan-400 font-extrabold uppercase tracking-wider block mb-0.5">💎 核心溢价防御承诺 (Margin & Value Promise) :</span>
                  <p className="text-xs italic text-slate-200 font-medium">{STRATEGIC_INITIATIVES[activeStrategy].marketing}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Static specifications matrix table */}
        <div className="border border-gray-200/60 bg-white rounded-3xl p-6 lg:p-10 space-y-6 shadow-xs">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-gray-900">核心高定物性指标矩阵</h3>
            <p className="text-xs text-gray-400">我们将全自研智能制造工厂的主要技术指标公开，确保透明的消费级重工品质表现。</p>
          </div>

          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-left border-collapse text-xs min-w-[650px]">
              <thead>
                <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase tracking-wider">
                  <th className="py-4 px-3 font-mono">指标分类 / Metric</th>
                  <th className="py-4 px-3">本厂「想象物化」高定标准</th>
                  <th className="py-4 px-3">传统普通生产商</th>
                  <th className="py-4 px-3 text-right">技术背书 / Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                <tr>
                  <td className="py-4 px-3 font-bold text-gray-950 font-sans">洗涤日晒固色率</td>
                  <td className="py-4 px-3 text-green-600 font-semibold">4.5级以上 (耐磨洗不褪色)</td>
                  <td className="py-4 px-3 text-gray-400">2-3级 (数次下水后明显泛白)</td>
                  <td className="py-4 px-3 text-right text-gray-400 font-mono">德国高粘固相活性印染</td>
                </tr>
                <tr>
                  <td className="py-4 px-3 font-bold text-gray-950 font-sans">陶瓷无铅释出率</td>
                  <td className="py-4 px-3 text-green-600 font-semibold">100% 绝对无检出 (婴儿级)</td>
                  <td className="py-4 px-3 text-gray-400">超标含有微量铅镉</td>
                  <td className="py-4 px-3 text-right text-gray-400 font-mono">1200℃窑温还原二次煅烧</td>
                </tr>
                <tr>
                  <td className="py-4 px-3 font-bold text-gray-950 font-sans">亚克力透光抗UV</td>
                  <td className="py-4 px-3 text-green-600 font-semibold">98.2% 透光 + A++级抗黄变</td>
                  <td className="py-4 px-3 text-gray-400">81.5% 发灰且在1月内泛黄</td>
                  <td className="py-4 px-3 text-right text-gray-400 font-mono">PMMA 进口多层防紫阻绝叠合</td>
                </tr>
                <tr>
                  <td className="py-4 px-3 font-bold text-gray-950 font-sans">物流防撞阻抗力</td>
                  <td className="py-4 px-3 text-green-600 font-semibold">全气动防爆高阻尼缓冲包装</td>
                  <td className="py-4 px-3 text-gray-400">常规泡沫薄塑料包裹</td>
                  <td className="py-4 px-3 text-right text-gray-400 font-mono">定制安全缓冲包装方案</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
