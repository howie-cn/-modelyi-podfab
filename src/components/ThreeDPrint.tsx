import React, { useState } from 'react';
import { Box, Upload, Sparkles, Code2, Rotate3D, Layers, Flame, FileDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguageStore } from '../store/useLanguageStore';
import { getTranslation, type TranslationKey } from '../store/translations';

export function ThreeDPrint() {
  const { language } = useLanguageStore();
  const t = (key: TranslationKey) => getTranslation(language, key);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Translations specifically for this component (fallback to literal mapping)
  const tx = {
    title: language === 'ZH' ? '3D 结构打印及定型舱' : (language === 'EN' ? '3D Structure Print & Curing Cabin' : '3D プリント'),
    desc: language === 'ZH' ? '上传您的 .STL / .OBJ 模型，或使用自然语言由大模型实时生成物理拓扑。' : 'Upload .STL / .OBJ models or use natural language to generate physical topology.',
    uploadBox: language === 'ZH' ? '拖拽 3D 模型文件至此' : 'Drag & Drop 3D Model Here',
    uploadBtn: language === 'ZH' ? '选择本地文件' : 'Select Local File',
    aiGenTitle: language === 'ZH' ? '云端 AI 拓扑生成' : 'Cloud AI Topology Generation',
    aiGenDesc: language === 'ZH' ? '输入描述，智能生成 3D 结构文件' : 'Describe to generate 3D structure',
    aiGenBtn: language === 'ZH' ? '即速生成 3D 雏形' : 'Generate 3D Prototype',
    supportedFormats: language === 'ZH' ? '支持: STL, OBJ, GLTF / 限制: 单文件最大 50MB' : 'Supports: STL, OBJ, GLTF / Max 50MB',
    materialOps: language === 'ZH' ? '高分子材料清单' : 'Polymer Materials',
  };

  return (
    <div className="max-w-6xl mx-auto px-6 pt-10 pb-24 w-full text-slate-800 terminal-mode-text-green">
      
      {/* Header */}
      <div className="mb-10 text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-100 text-cyan-600 mb-2 border border-cyan-200">
          <Box size={32} />
        </div>
        <h2 className="text-3xl md:text-4xl font-black font-sans uppercase tracking-tight text-slate-900 border-b-2 border-transparent terminal-mode-border">{tx.title}</h2>
        <p className="text-sm font-mono text-slate-500 uppercase">{tx.desc}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Upload Column */}
        <div className="space-y-6">
          <h3 className="text-sm font-black uppercase font-mono flex items-center gap-2">
            <Upload size={16} className="text-blue-500" />
            01 // 物理模型装载 (Model Upload)
          </h3>
          
          <div 
            className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all ${
              dragActive ? 'border-cyan-400 bg-cyan-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => { e.preventDefault(); setDragActive(false); setIsUploading(true); setTimeout(() => setIsUploading(false), 2000); }}
          >
            <div className="relative w-20 h-20 mx-auto mb-6 bg-slate-200 rounded-full flex items-center justify-center">
              {isUploading ? (
                <Rotate3D size={32} className="text-blue-500 animate-spin" />
              ) : (
                <FileDown size={32} className="text-slate-400" />
              )}
            </div>
            <h4 className="text-sm font-bold text-slate-700 mb-2">{isUploading ? '解析点云数据中...' : tx.uploadBox}</h4>
            <p className="text-xs text-slate-400 font-mono mb-6">{tx.supportedFormats}</p>
            <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl shadow cursor-pointer hover:bg-cyan-600 transition-colors text-xs font-bold uppercase tracking-widest">
              {tx.uploadBtn}
            </button>
          </div>
        </div>

        {/* AI Gen Column */}
        <div className="space-y-6">
          <h3 className="text-sm font-black uppercase font-mono flex items-center gap-2">
            <Sparkles size={16} className="text-purple-500" />
            0N // 智能拓扑构建 (AI Topology)
          </h3>
          
          <div className="bg-slate-900 text-white p-8 rounded-3xl border-2 border-slate-800 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 blur-[80px] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-800 rounded-lg text-purple-400 border border-slate-700">
                  <Code2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{tx.aiGenTitle}</h4>
                  <p className="text-xs text-slate-400">{tx.aiGenDesc}</p>
                </div>
              </div>
              
              <textarea 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-sm font-mono placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 min-h-[120px] transition-all mb-4 text-white"
                placeholder="譬如: 一个赛博朋克风格的咖啡滤杯，含有外骨骼镂空结构..."
              ></textarea>
              
              <button className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-xs font-black uppercase tracking-widest flex justify-center items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                <Sparkles size={14} />
                {tx.aiGenBtn}
              </button>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-16 pt-12 border-t-2 border-slate-200">
        <h3 className="text-sm font-black uppercase font-mono flex items-center gap-2 mb-8">
          <Flame size={16} className="text-orange-500" />
          {tx.materialOps}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['SLA 高精树脂', 'SLM 钛合金', 'FDM 碳纤维', 'SLS 尼龙粉末'].map((mat, i) => (
            <div key={i} className="p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl flex flex-col gap-2 hover:border-cyan-400 transition-colors cursor-pointer">
              <Layers size={20} className="text-slate-400" />
              <span className="font-bold text-xs uppercase text-slate-800 terminal-mode-text-green">{mat}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
