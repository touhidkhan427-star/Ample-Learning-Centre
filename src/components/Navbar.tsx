import { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, ChevronDown, User, Calculator, Sun, Moon, Sparkles, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { useTheme } from './ThemeProvider';
import { useAuth } from '../contexts/AuthContext';

const searchSuggestions = [
  { title: 'অষ্টম শ্রেণি - গণিত (Class 8 Math)', category: 'Course', link: '/courses/8-math' },
  { title: 'SSC 2027 - পদার্থবিজ্ঞান (Physics)', category: 'Course', link: '/courses/ssc-physics' },
  { title: 'English Grammar Combo', category: 'Combo', link: '/combo/english-grammar' },
  { title: 'Programming for Beginners', category: 'Course', link: '/courses/programming' },
  { title: 'Dr. Hasan Mahmud', category: 'Teacher', link: '/teachers/hasan-mahmud' },
  { title: 'উচ্চতর গণিত - নবম শ্রেণি (Higher Math)', category: 'Course', link: '/courses/9-higher-math' },
  { title: 'রসায়ন - SSC (Chemistry)', category: 'Course', link: '/courses/ssc-chemistry' },
];

const navLinks = [
  { name: 'হোম', href: '/' },
  { 
    name: 'ক্লাস ৬-১০', 
    href: '/courses',
    dropdown: [
      { name: 'ষষ্ঠ শ্রেণি', href: '/courses' },
      { name: 'সপ্তম শ্রেণি', href: '/courses' },
      { name: 'অষ্টম শ্রেণি', href: '/courses' },
      { name: 'নবম শ্রেণি', href: '/courses' },
      { name: 'SSC 2027', href: '/courses' },
    ]
  },
  { name: 'কম্বো', href: '/combo' },
  { name: 'আমার কোর্সসমূহ', href: '/my-courses' },
  { name: 'শিক্ষকবৃন্দ', href: '/teachers' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { user, userProfile, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-focus search input
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
        mobileSearchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCalculatorClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById('physics-calculator')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('physics-calculator')?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsProfileDropdownOpen(false);
    navigate('/');
  };

  const filteredSuggestions = searchSuggestions.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-1200 ease-[cubic-bezier(0.23,1,0.32,1)]',
        scrolled 
          ? 'bg-white/5 dark:bg-slate-950/30 dark:bg-gradient-to-b dark:from-slate-900/40 dark:to-slate-950/20 backdrop-blur-[100px] dark:backdrop-blur-[120px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] py-1.5 border-b border-white/10 dark:border-white/5' 
          : 'bg-[#F0F0F0]/95 dark:bg-slate-950/80 backdrop-blur-lg py-3'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo - Far Left */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="https://placehold.co/100x100/111827/FFC107?text=ALC" 
                alt="Ample Learning Centre Logo" 
                className="w-11 h-11 rounded-xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-sans transition-colors">
                Ample Learning Centre
              </span>
            </Link>
          </div>

          {/* Desktop Links - Centered */}
          <div className="hidden lg:flex flex-1 justify-center items-center">
            <div className={cn(
              "flex items-center px-2 py-1.5 rounded-full transition-all duration-1000 ease-out",
              scrolled 
                ? "bg-white/10 dark:bg-slate-800/40 backdrop-blur-2xl border border-white/20 dark:border-slate-700/50 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] dark:shadow-none" 
                : "bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border border-white/50 dark:border-slate-700/50"
            )}>
              {navLinks.map((link) => (
                <div 
                  key={link.name} 
                  className="relative"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-500 flex items-center gap-2",
                      "text-slate-800 dark:text-slate-200 hover:text-primary dark:hover:text-primary",
                      activeDropdown === link.name && "bg-white/90 dark:bg-slate-800 text-primary dark:text-primary shadow-xl scale-105"
                    )}
                  >
                    <span className="font-bengali">{link.name}</span>
                    {link.dropdown && (
                      <motion.div
                        animate={{ rotate: activeDropdown === link.name ? 180 : 0 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                      >
                        <ChevronDown size={14} />
                      </motion.div>
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {link.dropdown && activeDropdown === link.name && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={{
                          hidden: { opacity: 0, y: 30, scale: 0.85, filter: 'blur(15px)' },
                          visible: { 
                            opacity: 1, 
                            y: 0, 
                            scale: 1, 
                            filter: 'blur(0px)',
                            transition: {
                              duration: 0.6,
                              ease: [0.23, 1, 0.32, 1],
                              staggerChildren: 0.1,
                              delayChildren: 0.1
                            }
                          },
                          exit: { 
                            opacity: 0, 
                            y: 20, 
                            scale: 0.9, 
                            filter: 'blur(10px)',
                            transition: { duration: 0.4 }
                          }
                        }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-5 w-60 bg-white/60 dark:bg-slate-900/80 backdrop-blur-[40px] border border-white/40 dark:border-slate-700/50 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden p-4"
                      >
                        {link.dropdown.map((item) => (
                          <motion.div
                            key={item.name}
                            variants={{
                              hidden: { opacity: 0, y: 20, scale: 0.9 },
                              visible: { opacity: 1, y: 0, scale: 1 }
                            }}
                          >
                            <Link
                              to={item.href}
                              className="block px-6 py-4 text-sm text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary rounded-3xl transition-all duration-300 font-bengali group/item relative overflow-hidden"
                            >
                              <span className="relative z-10">{item.name}</span>
                              <motion.div 
                                className="absolute inset-0 bg-primary/5 dark:bg-primary/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
                                layoutId="hoverBg"
                              />
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Right Actions - Far Right */}
          <motion.div layout className="hidden md:flex items-center gap-3 lg:gap-5">
            <motion.button
              layout
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-3.5 rounded-full flex-shrink-0 transition-all duration-500 ease-out text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-primary hover:shadow-xl dark:hover:shadow-none"
              title="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
            </motion.button>
            <motion.button 
              layout
              onClick={handleCalculatorClick}
              className="p-3.5 rounded-full flex-shrink-0 transition-all duration-500 ease-out text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-primary hover:shadow-xl dark:hover:shadow-none"
              title="Physics Calculator"
            >
              <Calculator size={22} />
            </motion.button>
            <motion.div layout className="relative flex items-center" ref={searchContainerRef}>
              <motion.div
                layout
                initial={false}
                animate={{ 
                  width: isSearchOpen ? 320 : 48,
                  backgroundColor: isSearchOpen ? (theme === 'dark' ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 1)") : "rgba(255, 255, 255, 0)",
                  boxShadow: isSearchOpen ? "0 8px 30px rgba(0,0,0,0.12)" : "0 0px 0px rgba(0,0,0,0)",
                  borderColor: isSearchOpen ? (theme === 'dark' ? "rgba(51, 65, 85, 0.5)" : "rgba(226, 232, 240, 1)") : "rgba(226, 232, 240, 0)"
                }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                className={cn(
                  "flex items-center overflow-hidden rounded-full border dark:backdrop-blur-md",
                  !isSearchOpen && "hover:bg-white/60 dark:hover:bg-slate-800 hover:shadow-xl dark:hover:shadow-none cursor-pointer"
                )}
                onClick={() => !isSearchOpen && setIsSearchOpen(true)}
              >
                <motion.div 
                  layout
                  animate={{ 
                    scale: isSearchOpen ? 0.85 : (isSearchHovered ? 1.1 : 1),
                    color: isSearchOpen ? "#004AAD" : (isSearchHovered ? "#3b82f6" : (theme === 'dark' ? "#cbd5e1" : "#334155")),
                    rotate: isSearchOpen ? 90 : 0
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="p-3.5 rounded-full flex-shrink-0 flex items-center justify-center relative"
                  onMouseEnter={() => !isSearchOpen && setIsSearchHovered(true)}
                  onMouseLeave={() => setIsSearchHovered(false)}
                >
                  <Search size={22} />
                  <AnimatePresence>
                    {isSearchHovered && !isSearchOpen && (
                      <>
                        <motion.div
                          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5], x: -12, y: -12 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="absolute top-1 left-1 text-yellow-400"
                        >
                          <Sparkles size={10} />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], x: 12, y: -8 }}
                          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                          className="absolute top-1 right-1 text-blue-400"
                        >
                          <Sparkles size={8} />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5], x: -8, y: 12 }}
                          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                          className="absolute bottom-1 left-1 text-yellow-400"
                        >
                          <Sparkles size={12} />
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </motion.div>
                
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses, topics, teachers..."
                  className={cn(
                    "bg-transparent border-none outline-none text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 w-full h-full py-2 transition-all duration-500",
                    isSearchOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
                  )}
                />
                
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.button 
                      initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                      transition={{ duration: 0.3 }}
                      onClick={(e) => { e.stopPropagation(); setIsSearchOpen(false); setSearchQuery(''); }} 
                      className="p-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex-shrink-0 transition-colors"
                    >
                      <X size={18} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Desktop Search Dropdown */}
              <AnimatePresence>
                {isSearchOpen && searchQuery.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute top-full right-0 mt-4 w-[360px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-3xl border border-white/50 dark:border-slate-700/50 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden p-3"
                  >
                    {filteredSuggestions.length > 0 ? (
                      <div className="max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
                        {filteredSuggestions.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.23, 1, 0.32, 1] }}
                            onClick={() => { setIsSearchOpen(false); navigate(item.link); }}
                            className="px-5 py-3.5 hover:bg-primary/5 dark:hover:bg-primary/10 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col gap-1 group/searchitem"
                          >
                            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover/searchitem:text-primary dark:group-hover/searchitem:text-primary transition-colors">{item.title}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">{item.category}</span>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                        No results found for "<span className="font-bold text-slate-700 dark:text-slate-300">{searchQuery}</span>"
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {user ? (
              <div className="relative" ref={profileDropdownRef}>
                <motion.button 
                  layout
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-full font-bold transition-all duration-700 shadow-lg active:scale-95 flex-shrink-0 border border-slate-200 dark:border-slate-700",
                  scrolled 
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:shadow-primary/20 hover:-translate-y-1" 
                    : "bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-900 dark:text-white hover:shadow-primary/20 hover:-translate-y-1"
                )}>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User size={18} />
                  </div>
                  <span className="font-bengali text-sm hidden lg:block">
                    {userProfile?.firstName || 'প্রোফাইল'}
                  </span>
                  <ChevronDown size={16} className={cn("transition-transform duration-300", isProfileDropdownOpen && "rotate-180")} />
                </motion.button>

                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-3 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 mb-2">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {userProfile?.firstName} {userProfile?.lastName}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        to="/my-courses"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-primary transition-colors font-bengali"
                      >
                        <User size={16} />
                        আমার কোর্সসমূহ
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors font-bengali text-left"
                      >
                        <LogOut size={16} />
                        লগ-আউট
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button 
                layout
                onClick={() => navigate('/login')}
                className={cn(
                "flex items-center gap-2 px-8 py-3.5 rounded-full font-bold transition-all duration-700 shadow-2xl active:scale-95 flex-shrink-0",
                scrolled 
                  ? "bg-primary text-white hover:shadow-primary/50 hover:-translate-y-1" 
                  : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-primary dark:hover:bg-primary dark:hover:text-white hover:shadow-primary/50 hover:-translate-y-1"
              )}>
                <span className="font-bengali text-base">লগ-ইন</span>
              </motion.button>
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full text-slate-900 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={handleCalculatorClick}
              className="p-2 rounded-full text-slate-900 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Physics Calculator"
            >
              <Calculator size={20} />
            </button>
            <button onClick={() => setIsSearchOpen(true)} className="p-2 rounded-full text-slate-900 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Search size={20} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl transition-colors text-slate-900 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="lg:hidden absolute top-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl z-[60] flex flex-col shadow-2xl rounded-b-3xl overflow-hidden max-h-[85vh]"
          >
            <div className="flex items-center px-4 h-[88px] border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
              <Search size={22} className="text-slate-400 mr-3 flex-shrink-0" />
              <input
                ref={mobileSearchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, topics..."
                className="flex-1 bg-transparent border-none outline-none text-base text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 h-full"
              />
              <button 
                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} 
                className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors ml-2 flex-shrink-0"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Mobile Dropdown Results */}
            {searchQuery.length > 0 && (
              <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 dark:bg-slate-950/50">
                {filteredSuggestions.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {filteredSuggestions.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.23, 1, 0.32, 1] }}
                        onClick={() => { setIsSearchOpen(false); navigate(item.link); }}
                        className="px-5 py-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-1 active:scale-95 transition-transform"
                      >
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.title}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{item.category}</span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">
                    No results found for "<span className="font-bold text-slate-700 dark:text-slate-300">{searchQuery}</span>"
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 bg-slate-900/40 dark:bg-slate-900/60 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white dark:bg-slate-950 shadow-2xl z-50 overflow-y-auto border-l border-slate-100 dark:border-slate-800 flex flex-col"
            >
              <div className="p-4 flex justify-between items-center border-b border-slate-100 dark:border-slate-800">
                <span className="font-bold text-lg text-slate-900 dark:text-white">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-4 space-y-2 flex-1">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    {link.dropdown ? (
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                        className="w-full flex items-center justify-between px-4 py-4 text-lg font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-2xl transition-all font-bengali"
                      >
                        {link.name}
                        <ChevronDown size={20} className={cn("transition-transform duration-300", activeDropdown === link.name && "rotate-180")} />
                      </button>
                    ) : (
                      <Link
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className="w-full flex items-center px-4 py-4 text-lg font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-2xl transition-all font-bengali"
                      >
                        {link.name}
                      </Link>
                    )}
                    
                    <AnimatePresence>
                      {link.dropdown && activeDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 space-y-1 overflow-hidden"
                        >
                          <div className="border-l-2 border-slate-100 dark:border-slate-800 ml-4 py-2">
                            {link.dropdown.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.href}
                                  className="block px-6 py-3 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary font-bengali relative before:absolute before:left-[-2px] before:top-1/2 before:-translate-y-1/2 before:w-[2px] before:h-0 before:bg-primary hover:before:h-full before:transition-all"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {item.name}
                                </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t border-slate-100 dark:border-slate-800">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <User size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {userProfile?.firstName} {userProfile?.lastName}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/my-courses"
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-6 py-4 rounded-2xl font-bold font-bengali transition-colors"
                    >
                      <User size={18} />
                      আমার কোর্সসমূহ
                    </Link>
                    <button 
                      onClick={() => { setIsOpen(false); handleSignOut(); }}
                      className="w-full bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors font-bengali"
                    >
                      <LogOut size={18} />
                      লগ-আউট
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => { setIsOpen(false); navigate('/login'); }}
                    className="w-full bg-primary text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:-translate-y-1 transition-transform"
                  >
                    লগ-ইন
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
