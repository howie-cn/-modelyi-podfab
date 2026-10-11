import React, { useState, useEffect } from 'react';
import { Home as HomeIcon, Wand2, Layers, Cpu, Compass, CheckCircle2, Package, Sparkles, Globe, ChevronDown, Terminal, Box, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Home } from './components/Home';
import { Workspace } from './components/Workspace';
import { PrestigeMaterials } from './components/PrestigeMaterials';
import { OrderTracker } from './components/OrderTracker';
import { ThreeDPrint } from './components/ThreeDPrint';
import { TwoDPrint } from './components/TwoDPrint';
import { Dashboard } from './components/Dashboard';
import { useLanguageStore } from './store/useLanguageStore';
import { getTranslation, type TranslationKey } from './store/translations';
import { useThemeStore } from './store/useThemeStore';
import { useCreatorStore } from './store/useCreatorStore';
import { Printer } from 'lucide-react';

type NavigationTab = 'home' | 'studio' | 'print2d' | 'print3d' | 'craft' | 'tracker' | 'dashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const { language, setLanguage } = useLanguageStore();
  const { isTerminalMode, toggleTerminalMode } = useThemeStore();
  const fetchOrders = useCreatorStore((state) => state.fetchOrders);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const t = (key: TranslationKey) => getTranslation(language, key);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languagesList = [
    { code: 'ZH' as const, label: '简体中文', native: '中' },
    { code: 'EN' as const, label: 'English', native: 'EN' },
    { code: 'JA' as const, label: '日本語', native: '日' },
    { code: 'KO' as const, label: '한국어', native: '한' },
  ];

  const navItems = [
    { id: 'home' as const, label: t('nav_home'), icon: HomeIcon, desc: 'BRAND INTRO' },
    { id: 'studio' as const, label: t('nav_studio'), icon: Wand2, desc: 'AI CO-DESIGN' },
    { id: 'print2d' as const, label: t('nav_2dprint') || (language === 'ZH' ? '2D 平面打印' : '2D PRINT'), icon: Printer, desc: '2D PLOT' },
    { id: 'print3d' as const, label: t('nav_3dprint') || '3D PRINT', icon: Box, desc: '3D RP' },
    { id: 'craft' as const, label: t('nav_craft'), icon: Layers, desc: 'MATERIALS' },
    { id: 'tracker' as const, label: t('nav_tracker'), icon: Cpu, desc: 'LIVELINK ERP' },
    { id: 'dashboard' as const, label: t('nav_dashboard') || 'ERP 看板', icon: BarChart2, desc: 'DB MONITOR' },
  ];

  return (
    <motion.div 
      initial={false}
      animate={isTerminalMode ? "terminal" : "normal"}
      variants={{
        normal: { opacity: 1, filter: "blur(0px) contrast(1)" },
        terminal: { 
          opacity: [0, 1], 
          filter: ["blur(10px) contrast(2)", "blur(0px) contrast(1)"],
        }
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      id="website-root" 
      className={`min-h-screen flex flex-col relative pb-16 md:pb-0 ${
        isTerminalMode 
          ? 'terminal-mode' 
          : 'bg-slate-50 text-slate-900 font-sans antialiased y2k-grid'
      }`}
    >
      
      {/* Global Elegant Y2K Millennium Header Menu */}
      <header className={`h-16 sticky top-0 z-50 flex items-center justify-between px-6 shadow-md select-none ${
        isTerminalMode
          ? 'bg-black border-b-2 border-green-500'
          : 'bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 border-b-2 border-slate-300'
      }`}>
        <div className="flex items-center gap-7">
          {/* Brand Logo Group */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative flex items-center">
              <div className="px-3.5 py-1.5 bg-slate-950 text-white rounded-xl border-2 border-cyan-400 font-mono font-black tracking-tighter text-sm flex items-center gap-1 shadow-[0_0_15px_rgba(0,229,255,0.25)] group-hover:scale-102 transition-all">
                <span className="text-white">POD</span>
                <span className="text-[#00e5ff] drop-shadow-[0_0_5px_rgba(0,229,255,0.8)] px-0.5">FAB</span>
                <span className="text-[8px] bg-[#00e5ff] text-slate-950 font-black px-1 rounded-sm uppercase tracking-tight scale-90 ml-1">SYS</span>
              </div>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-mono text-[9px] text-blue-600 font-bold uppercase tracking-widest leading-none">// CO-DESIGN STUDIO</span>
              <span className="text-[8px] text-slate-500 font-mono font-semibold uppercase tracking-wider mt-1">PHYSICAL INTEGRATION CELL</span>
            </div>
          </div>
 
          {/* Desktop Nav Actions */}
          <nav className="hidden md:flex items-center gap-2 h-full">
            {navItems.map((item) => {
              const isSelected = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`h-10 px-4 rounded-xl flex items-center gap-2 text-xs font-black transition-all relative cursor-pointer uppercase tracking-tight ${
                    isSelected 
                      ? 'bg-slate-950 text-white border border-slate-900 shadow-md' 
                      : 'text-slate-500 hover:text-slate-950 hover:bg-slate-200/60 border border-transparent'
                  }`}
                >
                  <Icon size={13} className={isSelected ? 'text-[#00e5ff]' : 'text-slate-400'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
 
        {/* Right side live stats */}
        <div className="flex items-center gap-3">
          
          {/* Terminal Mode Toggle */}
          <button
            onClick={toggleTerminalMode}
            className={`px-2 md:px-3 py-1.5 md:py-2 border-2 rounded-xl transition-all flex items-center justify-center cursor-pointer shadow-xs ${
              isTerminalMode 
                ? 'bg-black text-green-500 border-green-500 hover:bg-green-500 hover:text-black' 
                : 'bg-slate-50 text-slate-700 hover:text-slate-900 border-slate-300 hover:border-slate-400 hover:bg-slate-100'
            }`}
            title="Toggle Terminal Mode"
          >
            <Terminal size={14} className={isTerminalMode ? 'text-current' : 'text-slate-600'} />
          </button>

          {/* Redesigned Premium Language Selector Dropdown */}
          <div className="relative inline-block text-left select-none">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="px-3 py-1.5 md:py-2 bg-slate-50 hover:bg-slate-100 border-2 border-slate-300 hover:border-slate-400 rounded-xl transition-all flex items-center gap-1.5 md:gap-2 cursor-pointer text-xs font-extrabold text-slate-705 shadow-xs"
            >
              <Globe size={13} className="text-blue-500" />
              <span className="uppercase tracking-tight text-[11px]">
                {languagesList.find((l) => l.code === language)?.label || 'Language'}
              </span>
              <ChevronDown 
                size={12} 
                className={`text-slate-400 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} 
              />
            </button>
 
            {isLangOpen && (
              <>
                {/* Click outside overlay to close the menu instantly */}
                <div 
                  className="fixed inset-0 z-40 bg-transparent" 
                  onClick={() => setIsLangOpen(false)} 
                />
                
                {/* Dropdown Menu Container */}
                <div className="absolute right-0 mt-1.5 w-40 bg-slate-950 border-2 border-slate-800 rounded-2xl shadow-xl z-50 py-1.5 overflow-hidden animate-in fade-in duration-100">
                  {languagesList.map((lang) => {
                    const isSelected = language === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-xs font-black transition-all flex items-center justify-between cursor-pointer ${
                          isSelected 
                            ? 'bg-blue-600 text-white' 
                            : 'text-slate-400 hover:text-[#00e5ff] hover:bg-slate-900'
                        }`}
                      >
                        <span>{lang.label}</span>
                        <span className={`text-[9px] uppercase font-bold ${isSelected ? 'text-white' : 'text-slate-500'}`}>
                          {lang.native}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
 
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3.5 py-1.5 rounded-full text-[10px] font-mono text-[#00e5ff] font-bold select-none shadow-inner">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
            <span>{t('factory_online')}</span>
          </div>
          
          {activeTab !== 'studio' && (
            <button
              onClick={() => setActiveTab('studio')}
              className="px-4 py-1.5 md:py-2 bg-slate-950 text-white hover:text-[#00e5ff] border border-slate-800 transition-all text-xs font-black uppercase tracking-widest rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles size={12} className="animate-spin text-[#00e5ff]" style={{ animationDuration: '6s' }} />
              <span>{t('enter_studio')}</span>
            </button>
          )}
        </div>
      </header>

      {/* Primary Routing view loader */}
      <main className="flex-1 w-full">
        {activeTab === 'home' && (
          <Home 
            onStartCreation={() => setActiveTab('studio')}
            onViewMaterials={() => setActiveTab('craft')}
            onTrackOrders={() => setActiveTab('tracker')}
            onNavigate={setActiveTab}
          />
        )}
        {activeTab === 'studio' && <Workspace />}
        {activeTab === 'print2d' && <TwoDPrint />}
        {activeTab === 'print3d' && <ThreeDPrint />}
        {activeTab === 'craft' && <PrestigeMaterials />}
        {activeTab === 'tracker' && <OrderTracker />}
        {activeTab === 'dashboard' && <Dashboard />}
      </main>

      {/* Global Branding Corporate Y2K Footer */}
      {activeTab !== 'studio' && (
        <footer className="bg-gradient-to-b from-slate-100 to-slate-200 border-t-2 border-slate-300 py-16 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="px-3.5 py-1.5 bg-slate-950 text-white rounded-xl border-2 border-cyan-400 font-mono font-black tracking-tighter text-xs flex items-center gap-1 shadow-[0_0_15px_rgba(0,229,255,0.25)]">
                  <span className="text-white">POD</span>
                  <span className="text-[#00e5ff] drop-shadow-[0_0_5px_rgba(0,229,255,0.8)] px-0.5">FAB</span>
                  <span className="text-[8px] bg-[#00e5ff] text-slate-950 font-black px-1 rounded-sm uppercase tracking-tight scale-90 ml-1">SYS</span>
                </div>
                <span className="font-mono font-black text-xs text-slate-950 uppercase tracking-tight mt-0.5">CO-DESIGN NET</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm uppercase font-mono">
                {t('footer_desc')}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-3 font-mono">// {t('material_curator')}</h4>
              <ul className="space-y-2 text-xs font-mono uppercase">
                <li><button onClick={() => { setActiveTab('studio'); }} className="text-slate-500 hover:text-blue-600 text-left">{t('Bedding')}</button></li>
                <li><button onClick={() => { setActiveTab('studio'); }} className="text-slate-500 hover:text-blue-600 text-left">{t('Pillow')}</button></li>
                <li><button onClick={() => { setActiveTab('studio'); }} className="text-slate-500 hover:text-blue-600 text-left">{t('Mug')}</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-3 font-mono">// {t('guarantees')}</h4>
              <ul className="space-y-2 text-xs text-slate-500 font-mono uppercase">
                <li>{t('guarantee_1')}</li>
                <li>{t('guarantee_2')}</li>
                <li>{t('guarantee_3')}</li>
                <li>{t('guarantee_4')}</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-3 font-mono">// {t('ws_workshop')}</h4>
              <div className="space-y-2.5 bg-slate-950 p-4 rounded-xl border border-slate-800 text-emerald-400 font-mono text-[11px] shadow-inner">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">SYS_ERP :</span>
                  <span className="font-bold">ONLINE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">HEAT_CTRL :</span>
                  <span className="font-bold">{t('status_sec')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">WORKNODE :</span>
                  <span className="text-[#00e5ff] font-bold">SMART_LOT_4.5</span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto border-t border-slate-300 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono gap-4 uppercase">
            <div>{t('copyright')}</div>
            <div className="flex items-center gap-4">
              <span className="hover:text-black cursor-pointer">{t('terms')}</span>
              <span>·</span>
              <span className="hover:text-black cursor-pointer">{t('privacy')}</span>
              <span>·</span>
              <span className="hover:text-black cursor-pointer">{t('shipping_agreement')}</span>
            </div>
          </div>
        </footer>
      )}

      {/* Y2K Dark Cyber Bottom Navigation Bar */}
      <nav id="mobile-bottom-nav" className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-950/95 backdrop-blur-lg border-t-2 border-slate-800 z-50 flex items-center justify-around px-2 shadow-xl">
        {navItems.map((item) => {
          const isSelected = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center gap-1.5 flex-1 h-full py-1 transition-all cursor-pointer ${
                isSelected 
                  ? 'text-[#00e5ff] font-black scale-102 drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]' 
                  : 'text-slate-500 hover:text-white'
              }`}
            >
              <Icon size={16} className={isSelected ? 'text-[#00e5ff]' : 'text-slate-500'} />
              <span className="text-[9px] tracking-widest leading-none truncate font-bold uppercase">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>


    </motion.div>
  );
}
