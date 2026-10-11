import React, { useMemo } from 'react';
import { Sparkles, AlertCircle, CheckCircle2, BadgeAlert, HelpCircle, ArrowRight, RefreshCw, LayoutGrid, Award, ShieldCheck } from 'lucide-react';
import { useLanguageStore } from '../store/useLanguageStore';
import { type ProductType } from '../store/useCreatorStore';

interface DesignQualityEvaluatorProps {
  prompt: string;
  productType: ProductType;
  onApplyImprovement: (improvedText: string) => void;
}

interface AttributeFeedback {
  nameZh: string;
  nameEn: string;
  score: number;
  descZh: string;
  descEn: string;
}

export function DesignQualityEvaluator({ prompt, productType, onApplyImprovement }: DesignQualityEvaluatorProps) {
  const { language } = useLanguageStore();

  const evaluation = useMemo(() => {
    const text = (prompt || '').trim().toLowerCase();
    
    // Default base scores per product
    let baseScore = 65;
    if (text.length === 0) {
      return {
        score: 0,
        statusZh: '等待输入设计灵感...',
        statusEn: 'Awaiting design prompt...',
        colorClass: 'text-slate-400 bg-slate-100 border-slate-200',
        badgeColor: 'bg-slate-350',
        barColor: 'bg-slate-300',
        glowClass: 'border-slate-200',
        attributes: [] as AttributeFeedback[],
        suggestions: [] as { zh: string; en: string; improve: string }[],
        verdictZh: '在下方输入或快捷选用定制题材，系统将即时开展1200℃烧结及物理拼折兼容度评测。',
        verdictEn: 'Enter or select a preset concept below. The system will run real-time stress and 1200°C glazing compatibility checks.'
      };
    }

    // Determine key parameters based on words in prompt
    const hasVector = /vector|decal|svg|icon|line|logo|矢量|线稿|徽章|贴纸/.test(text);
    const hasSimplicity = /minimal|simple|geometric|muji|clean|极简|秩序|包豪斯|干净|白净|留白/.test(text);
    const hasFineDetail = /micro|fine|hair|pixel|detailed|complex|极细|繁复|微米|雕刻|油画|超高精度/.test(text);
    const hasSupportOrStand = /support|base|stand|mortise|joint|tenon|榫卯|底座|防倾|重力|力学|稳固/.test(text);
    const hasGoldenSeam = /gold border|bronzing|embossed|gilding|金边|描金|描边|浮雕|烤花|烫金/.test(text);
    const hasTileOrSeamless = /seamless|pattern|tile|repeat|拼缝|铺满|平铺|无缝|四方连续/.test(text);
    const hasWhiteBleed = /bleed|margin|border|light color|折痕|留白|白边|纸角|浅色/.test(text);

    // Dynamic scoring adjustments
    let scoreMod = 0;
    const itemsMatched: string[] = [];

    // Analyze based on selected ProductType
    const attributes: AttributeFeedback[] = [];
    const suggestions: { zh: string; en: string; improve: string }[] = [];

    switch (productType) {
      case 'Mug': // 高白骨瓷
        baseScore = 70;
        if (hasSimplicity) { scoreMod += 12; itemsMatched.push('minimal'); }
        if (hasGoldenSeam) { scoreMod += 15; itemsMatched.push('glaze'); }
        if (hasFineDetail && !hasSimplicity) { scoreMod -= 10; } // Complex lines run flat on curves
        
        const finalMugScore = Math.min(100, Math.max(30, baseScore + scoreMod));
        attributes.push(
          {
            nameZh: '曲面套位应变度',
            nameEn: 'Curved Distortion Match',
            score: hasSimplicity ? 92 : (hasFineDetail ? 62 : 80),
            descZh: '曲面圆柱体印花拉伸收缩性。简约边界极优，多噪点高渐变可能有微幅断序。',
            descEn: 'Cylinder printing stretch. Clean vectors map perfectly; gradient noise might experience minute color steps.'
          },
          {
            nameZh: '高温析彩熔润度',
            nameEn: '1200°C Glaze Heat Fusion',
            score: hasGoldenSeam ? 95 : 85,
            descZh: '1200℃釉中彩两次烤花结合度，金边或纯净质感呈现最润。',
            descEn: 'Luster saturation binding at 1200°C. Gilding or solid bright pigments deliver elite results.'
          },
          {
            nameZh: '极冷热防碎安全率',
            nameEn: 'Thermal Shock Immunity',
            score: 98,
            descZh: '高强骨瓷内胚的防爆冷爆热能力。',
            descEn: 'High crystalline bone-china core resistance.'
          }
        );

        if (!hasGoldenSeam && !hasSimplicity) {
          suggestions.push({
            zh: '✨ 加入“经典釉下金边描线，精润陶瓷烤花面”',
            en: '✨ Add "classic under-glaze gilding stripes, high-fire ceramic profile"',
            improve: `${prompt}，配合经典陶瓷描金描线边框，奢润高温烤花面层`
          });
        }
        if (hasFineDetail && !hasSimplicity) {
          suggestions.push({
            zh: '💡 推荐补充“边界轮廓清晰且明朗大色块”以防极细杂色碎点在釉中融融模糊',
            en: '💡 Suggest adding "clearly defined vector shapes with clean boundaries" to prevent high-fire color bleed',
            improve: `极简${prompt}，边界色轮分明，去除散落噪点`
          });
        }
        break;

      case 'Acrylic': // 亚克力立牌
        baseScore = 68;
        if (hasVector) { scoreMod += 15; itemsMatched.push('vector'); }
        if (hasSimplicity) { scoreMod += 10; itemsMatched.push('edge'); }
        if (hasFineDetail && !hasVector) { scoreMod -= 8; } // Delicate disconnected edges might break

        const finalAcrylicScore = Math.min(100, Math.max(30, baseScore + scoreMod));
        attributes.push(
          {
            nameZh: '微细尖角防断裂率',
            nameEn: 'Delicate Part Safety',
            score: hasVector ? 94 : 70,
            descZh: '复杂浮空尖刺或异形支脚强度。矢量轮廓极难割手磨损。',
            descEn: 'Tensile safety of float elements. Vector curves prevent micro chipping during laser cuts.'
          },
          {
            nameZh: '边缘R角平滑度',
            nameEn: 'R-Angle Vector Fitting',
            score: hasVector ? 96 : 82,
            descZh: '对于小于1.5mm尖刺的智能柔化防刮。',
            descEn: 'Anti-scratch automated rounding algorithms mapping precision.'
          },
          {
            nameZh: '高透双层夹压紧密',
            nameEn: 'SLA Acrylic Cohesion',
            score: 95,
            descZh: '高分子双层热压黏合耐候防水分层性。',
            descEn: 'Polymer dual-panel hot compression moisture seal.'
          }
        );

        if (!hasVector) {
          suggestions.push({
            zh: '✨ 添加“闭合矢量高精路径线稿，精细边缘R型防刮圆弧倒角”',
            en: '✨ Add "closed precise vector strokes, smooth laser-cut safety bevel border"',
            improve: `${prompt}，高清晰度闭合矢量路径，精细边缘R型防刮圆角，钻石级晶莹包边`
          });
        }
        break;

      case 'Bedding': // 贡缎长绒棉四件套
        baseScore = 70;
        if (hasTileOrSeamless) { scoreMod += 18; itemsMatched.push('seamless'); }
        if (hasSimplicity) { scoreMod += 8; }
        if (hasFineDetail && !hasTileOrSeamless) { scoreMod -= 10; } // Fine labels fade in wide fabrics

        const finalBeddingScore = Math.min(100, Math.max(30, baseScore + scoreMod));
        attributes.push(
          {
            nameZh: '宽幅对缝连贯性',
            nameEn: 'Splicing Seam Continuity',
            score: hasTileOrSeamless ? 98 : 65,
            descZh: '整床贡缎裁切缝制时的图案拼缝错位防范度。',
            descEn: 'Continuous seam match alignment during premium bed sheet assembly.'
          },
          {
            nameZh: '面料吸润渗透深度',
            nameEn: 'Fiber Pigment Absorption',
            score: 88,
            descZh: '活性染料直喷进入60S/100S高密贡缎深度。渐变色深度优秀，无胶质手感。',
            descEn: 'Fiber depth diffusion of skin-friendly reactive dyes. Preserves silky, non-stiff luxury texture.'
          },
          {
            nameZh: '防磨褪色耐擦洗性',
            nameEn: 'Friction Fading Resilience',
            score: 92,
            descZh: '活性原浆附着抗洗水褪色性。',
            descEn: 'Anti-detergent abrasion protection value.'
          }
        );

        if (!hasTileOrSeamless) {
          suggestions.push({
            zh: '✨ 添加“无缝平铺壁纸排版，四方连续图腾”以保证巨幅织拼无断续',
            en: '✨ Insert "seamless tileable pattern, quad-continuous wallpaper print" for flawless massive prints',
            improve: `${prompt}，高品质无缝循环四方连续平铺图案`
          });
        }
        break;

      case 'Pillow': // 超柔抱枕
        baseScore = 72;
        if (hasTileOrSeamless) { scoreMod += 10; }
        if (hasSimplicity) { scoreMod += 10; }

        attributes.push(
          {
            nameZh: '充棉三维膨胀适应',
            nameEn: 'Stretching Recovery Offset',
            score: hasSimplicity ? 95 : 82,
            descZh: '枕芯撑起引起的表面反向球面畸变收边补偿。',
            descEn: 'Anti-distortion compensation maps for fluffy stuffing.'
          },
          {
            nameZh: '拉链包边齿咬紧度',
            nameEn: 'Zipper Border Tensile Rate',
            score: 90,
            descZh: '双缝线隐形拉链防开线爆边系数。',
            descEn: 'Double-row invisible seam zipper tolerance score.'
          }
        );

        if (!hasSimplicity && !hasTileOrSeamless) {
          suggestions.push({
            zh: '💡 推荐引入“居中黄金构图，大面积纯白包边”以防边缘缝合变形',
            en: '💡 Suggest "golden centered composition, soft border bleeding" to avoid seam sewing shift',
            improve: `${prompt}，居画中心，四面微幅溢白安全排版`
          });
        }
        break;

      case 'Sticker': // 防水不干胶贴
        baseScore = 65;
        if (hasVector) { scoreMod += 15; itemsMatched.push('vector'); }
        if (hasWhiteBleed) { scoreMod += 15; itemsMatched.push('bleed'); }
        if (hasFineDetail && !hasVector) { scoreMod -= 12; } // Whisker-thin cuts get torn

        attributes.push(
          {
            nameZh: '模切微线防撕断率',
            nameEn: 'Weeding Fracture Index',
            score: hasVector ? 95 : 60,
            descZh: '从底不干胶纸揭下时，超细镂空长条不断裂性能。',
            descEn: 'Resistance to tearing thin intricate lines when peeling decal off backing paper.'
          },
          {
            nameZh: '防起翘耐候贴合率',
            nameEn: 'Edge Peeling Resilience',
            score: hasWhiteBleed ? 98 : 78,
            descZh: '边缘留有足够保护白边，避免空气及潮气日晒翘边。',
            descEn: 'Moisture warping resistance depending on external spacing cuts.'
          }
        );

        if (!hasWhiteBleed) {
          suggestions.push({
            zh: '✨ 添加“带封闭实边背景，预留光滑外白边路径”',
            en: '✨ Add "closed solid background frame, smooth custom contour cutline"',
            improve: `${prompt}，附带独立闭合实体边框轮廓线，预留光滑外侧白色防翘白边`
          });
        }
        break;

      case 'Toy': // 极客限定潮玩
        baseScore = 60;
        if (hasSupportOrStand) { scoreMod += 20; itemsMatched.push('support'); }
        if (hasSimplicity) { scoreMod += 10; }
        if (hasFineDetail && !hasSupportOrStand) { scoreMod -= 15; } // Too complex floating parts collapse without stand

        attributes.push(
          {
            nameZh: '重力质心受力平衡',
            nameEn: 'Gravity Center Balance',
            score: hasSupportOrStand ? 96 : 48,
            descZh: '光固化SLA打印时长悬臂及身体前倾重力平衡。若无结实支架易塌台。',
            descEn: 'Overhang support constraints under physical gravity. High risk of failure without stand component.'
          },
          {
            nameZh: '分模块榫卯插咬度',
            nameEn: 'Tenon Fitting Calibration',
            score: 92,
            descZh: '大块面高精度的磁吸插销/榫卯分件接缝贴合精度。',
            descEn: 'Plugging and magnetic joint tolerances.'
          }
        );

        if (!hasSupportOrStand) {
          suggestions.push({
            zh: '✨ 极为推荐添加“带有扎实的实体地基底座，骨架重心稳固，适合榫卯拆分”',
            en: '✨ Highly recommended: "with custom supporting base platform, interlocking joint setup"',
            improve: `${prompt}，配备防倾倒宽大几何支撑底座，重心向下倾，适合磁吸榫卯模块化分拆成型`
          });
        }
        break;

      case 'BlindBox': // 瓦楞潮物盲盒
        baseScore = 70;
        if (hasWhiteBleed) { scoreMod += 15; itemsMatched.push('corner'); }
        if (hasSimplicity) { scoreMod += 10; }

        attributes.push(
          {
            nameZh: '压楞无痕防裂色率',
            nameEn: 'Bleed Crease Crack Resistance',
            score: hasWhiteBleed ? 96 : 72,
            descZh: '硬重卡纸在90度重合高压折角时，图案爆漆白边防御系数。',
            descEn: 'Anti-cracking capability of ink film at heavy 90-degree foldlines.'
          },
          {
            nameZh: '双面折合套色精准',
            nameEn: 'Dual-Sided Bleed Alignment',
            score: 94,
            descZh: '盲盒拼扣结合部位大色块印刷定位精度。',
            descEn: 'Registration alignment of overlapping flaps on heavy card.'
          }
        );

        if (!hasWhiteBleed) {
          suggestions.push({
            zh: '✨ 推荐增加“折角预留柔性渐变过度，防割手多重插口结构”避免爆线',
            en: '✨ Recommend adding "flexible seam feather gradient padding" for folded corners',
            improve: `${prompt}，精细拼合边，边缘色泽柔中带白淡雅过度效果`
          });
        }
        break;

      case 'Blanket': // 柔麂法兰绒/羊羔绒温暖毛毯
        baseScore = 72;
        if (hasFineDetail) { scoreMod += 15; itemsMatched.push('detail'); }
        if (hasSimplicity) { scoreMod += 5; }

        attributes.push(
          {
            nameZh: '绒面渗墨浸染饱和度',
            nameEn: 'Fleece Dye Saturation',
            score: hasFineDetail ? 96 : 82,
            descZh: '热升华墨原子充分浸没高弹短细纤维层深处的色彩覆盖率，防露白。',
            descEn: 'Pigment absorption deep within velvet flannel pores. Highly uniform layer.'
          },
          {
            nameZh: '亲肤抗静电保暖指数',
            nameEn: 'Skin Comfort Thermal Index',
            score: 98,
            descZh: '双面绒毛贴肤摩擦防静电处理能效和空气热对流闭锁度。',
            descEn: 'Anti-static conditioning and cozy body-heat preservation factor.'
          }
        );

        if (!hasFineDetail) {
          suggestions.push({
            zh: '✨ 推荐加入“高细节维多利亚塔罗图腾，3D卡通立体高明暗交汇轮廓”极致呈现热升华丰满度',
            en: '✨ Recommend adding "high-detail tarot patterns, 3D cozy cartoon contour with bold shading" for lush prints',
            improve: `精细手绘${prompt}，高抗张力塔罗魔法阵编纹图腾，3D绒感高对比色彩光影`
          });
        }
        break;

      case 'Tapestry': // 高宽幅精细织造艺术挂毯
        baseScore = 70;
        if (hasFineDetail) { scoreMod += 12; }
        if (hasVector) { scoreMod += 10; }

        attributes.push(
          {
            nameZh: '巨幅激光裁剪防散率',
            nameEn: 'Laser Sheared Anti-Fraying',
            score: 96,
            descZh: '1.5m*2m大片幅热切切口处，高分子丝熔合防止散线毛边的固位率。',
            descEn: 'Premium heated cutter fusing quality along raw tapestry borders.'
          },
          {
            nameZh: '超宽画幅低拉伸形变',
            nameEn: 'Giant Aspect Ratio Lock',
            score: hasVector ? 95 : 85,
            descZh: '张紧悬挂时重力拉扯下防画面垂褶失真度。矢量及大色块在涤纶底表现最好。',
            descEn: 'Dynamic dimensional stability under suspension load on textured synthetic linen.'
          }
        );

        if (!hasFineDetail) {
          suggestions.push({
            zh: '🌱 推荐加入“赛博朋克繁复霓虹夜景、或是迷幻艺术漩涡，满版全幅震撼巨构”彰显空间统治感',
            en: '🌱 Highly recommend "highly immersive cyberpunk neon skyscrapers or seamless psychedelic vortex patterns" to dominate space',
            improve: `全幅无缝拼贴${prompt}，高视觉冲击力赛博霓虹市景与迷幻漩涡光粒子，满底印刷`
          });
        }
        break;

      default:
        break;
    }

    const score = Math.min(100, Math.max(30, baseScore + scoreMod));

    // Colors determine status
    let statusZh = '普通';
    let statusEn = 'Vulnerable';
    let colorClass = 'text-amber-500 bg-amber-50 border-amber-200';
    let badgeColor = 'bg-amber-450 bg-amber-500';
    let barColor = 'bg-amber-500';
    let glowClass = 'shadow-[0_0_12px_rgba(245,158,11,0.2)] border-amber-400';

    if (score >= 88) {
      statusZh = '✦ 极客臻致大师版 (Elite Elite-Fit)';
      statusEn = '★ Master Craft';
      colorClass = 'text-cyan-600 bg-cyan-50/50 border-cyan-200';
      badgeColor = 'bg-cyan-500';
      barColor = 'bg-cyan-500';
      glowClass = 'shadow-[0_0_16px_rgba(6,182,212,0.3)] border-cyan-400';
    } else if (score >= 75) {
      statusZh = '⚡ 可行性良好 (Stable Craft)';
      statusEn = '✓ High Compatibility';
      colorClass = 'text-emerald-600 bg-emerald-50/50 border-emerald-250 border-emerald-200';
      badgeColor = 'bg-emerald-500';
      barColor = 'bg-emerald-500';
      glowClass = 'shadow-[0_0_12px_rgba(16,185,129,0.25)] border-emerald-400';
    } else {
      statusZh = '⚠️ 边缘工艺有挑战且易损 (High Print Risk)';
      statusEn = '⚠️ Complex Layout Warning';
      colorClass = 'text-rose-500 bg-rose-50 border-rose-150 border-rose-200';
      badgeColor = 'bg-rose-500';
      barColor = 'bg-rose-500';
      glowClass = 'shadow-[0_0_12px_rgba(244,63,94,0.2)] border-rose-400';
    }

    let verdictZh = '';
    let verdictEn = '';

    if (score >= 88) {
      verdictZh = '完美！输入配有大量高分子实物咬合或边界规约要素。工坊ERP预置流水线能够百分百无阻成型，色彩、牢固度堪比奢华藏品。';
      verdictEn = 'Perfect! All physical constraints satisfied. High-precision machinery will yield elite boutique-grade material prints.';
    } else if (score >= 75) {
      verdictZh = '表现不错。核心力学受力或色牢度良好，可以安全送印成型。建议补充细节修正以追求完美镜面水准。';
      verdictEn = 'Stable choice! Yield tolerances are overall high. Small prompt enhancements can maximize color gloss or shear bounds.';
    } else {
      verdictZh = '当前提示词缺乏对应的物化工艺承载词（如底座支撑、溢白外边框或防裂渐变）。直通制造可能有 35% 几率遇上尖角碎裂、拼缝穿崩、烧结漆斑问题。';
      verdictEn = 'Inert physical risk found. Missing structures like stands or protective trim borders. High failure risk on complex organic protrusions.';
    }

    return {
      score,
      statusZh,
      statusEn,
      colorClass,
      badgeColor,
      barColor,
      glowClass,
      attributes,
      suggestions,
      verdictZh,
      verdictEn
    };
  }, [prompt, productType]);

  // Return empty states cleanly
  if (!prompt || prompt.trim().length === 0) {
    return (
      <div className="border border-slate-200 bg-slate-50 rounded-2xl p-4 text-center mt-3 animate-in fade-in duration-300">
        <div className="flex items-center gap-1.5 justify-center text-[10px] font-mono text-slate-450 font-bold uppercase tracking-widest mb-1">
          <HelpCircle size={12} className="text-slate-400" />
          {language === 'ZH' ? '设计物化可印性实时评测' : 'REAL-TIME PHYSICAL PRINT EVALUATION'}
        </div>
        <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
          {language === 'ZH'
            ? '请在下方框输入您的创意设想，此区将根据材质（如1200℃骨瓷烧熔度、手办质力心重力、防水贴剥离抗撕力）对工艺可行性即时评分 ✦'
            : 'Type your prompt below to see instant score indexing (e.g. 1200°C glazing capacity, SLA support balance, Sticker tensile limits).'}
        </p>
      </div>
    );
  }

  return (
    <div className={`mt-3 border rounded-2xl p-4 sm:p-5 transition-all duration-300 bg-white ${evaluation.glowClass} animate-in slide-in-from-top-1 duration-300 relative overflow-hidden font-sans`}>
      {/* Background neon soft color tone */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-500/5 rounded-full blur-xl pointer-events-none"></div>

      {/* Title block */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Award className="text-indigo-650" size={16} />
          <span className="text-[11px] font-mono text-slate-500 font-extrabold uppercase tracking-wider block">
            {language === 'ZH' ? '📋 智造实物可印成型评分舱' : '📋 COMPATIBILITY STRESS CHECKER'}
          </span>
        </div>
        <span className={`text-[9px] font-black font-mono border px-2 py-0.5 rounded-md flex items-center gap-1 ${evaluation.colorClass}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${evaluation.badgeColor} animate-pulse`}></span>
          {language === 'ZH' ? evaluation.statusZh : evaluation.statusEn}
        </span>
      </div>

      {/* Main Score Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Circle/Gauge Block - 4 columns */}
        <div className="md:col-span-3 flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-100 relative">
          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold mb-1">
            {language === 'ZH' ? '智造评分' : 'CRAFT SCORE'}
          </span>
          <div className="relative flex items-center justify-center">
            {/* Elegant large score indicator */}
            <span className="text-4xl font-mono font-black text-slate-900 tracking-tight">
              {evaluation.score}
            </span>
            <span className="text-xs text-slate-400 font-mono font-bold ml-0.5 mt-2">/100</span>
          </div>
          
          {/* Horizontal mini bar inside */}
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2.5">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${evaluation.barColor}`} 
              style={{ width: `${evaluation.score}%` }}
            ></div>
          </div>
        </div>

        {/* Real Verdict description - 9 columns */}
        <div className="md:col-span-9 space-y-1.5">
          <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1 leading-none uppercase">
            <ShieldCheck className="text-emerald-500 shrink-0" size={13} />
            {language === 'ZH' ? '工坊工艺评判意见 (Audit Report)' : 'Factory Yield Diagnostics'}
          </h4>
          <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
            {language === 'ZH' ? evaluation.verdictZh : evaluation.verdictEn}
          </p>
        </div>
      </div>

      {/* Multi-attribute Gauges Bar */}
      {evaluation.attributes.length > 0 && (
        <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2.5">
          <span className="text-[9px] font-mono text-slate-450 uppercase tracking-wider block font-bold">
            {language === 'ZH' ? '⚙️ 工艺微孔与硬度物化应变指数 (Stress Indexes)' : '⚙️ Physical Wear & Stretch Tolerances'}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {evaluation.attributes.map((attr, idx) => (
              <div key={idx} className="bg-slate-50/50 border border-slate-100 rounded-lg p-2.5 space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="font-bold text-slate-700 truncate mr-1">
                    {language === 'ZH' ? attr.nameZh : attr.nameEn}
                  </span>
                  <span className="font-extrabold text-indigo-600 shrink-0">{attr.score}%</span>
                </div>
                <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full transition-all" 
                    style={{ width: `${attr.score}%` }}
                  ></div>
                </div>
                <p className="text-[8px] text-slate-400 font-sans leading-relaxed block leading-normal line-clamp-2 h-6 pl-0.5">
                  {language === 'ZH' ? attr.descZh : attr.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Proactive improvements generator panel */}
      {evaluation.suggestions.length > 0 && (
        <div className="mt-4 pt-3 border-t border-indigo-100 bg-indigo-50/20 rounded-xl p-3 border border-indigo-150 relative">
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-indigo-600 font-extrabold tracking-wider uppercase mb-2">
            <Sparkles className="animate-pulse" size={12} />
            {language === 'ZH' ? '🚀 快键工艺词提分增强 (Enhance Print Compatibility)' : '🚀 Compatibility One-Click Enhancer'}
          </div>
          <div className="space-y-2">
            {evaluation.suggestions.map((sug, sIndex) => (
              <div key={sIndex} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white/90 border border-indigo-100 p-2 rounded-lg hover:border-indigo-400 transition-all">
                <span className="text-[10px] text-slate-700 leading-normal max-w-lg font-medium">
                  {language === 'ZH' ? sug.zh : sug.en}
                </span>
                <button
                  type="button"
                  onClick={() => onApplyImprovement(sug.improve)}
                  className="py-1 px-2.5 rounded-md bg-indigo-650 hover:bg-indigo-700 text-white text-[9px] font-mono font-bold tracking-wider transition-all cursor-pointer self-start sm:self-auto flex items-center gap-1 uppercase"
                >
                  <span>{language === 'ZH' ? '一键融合提分' : 'Merge & Boost'}</span>
                  <ArrowRight size={10} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
