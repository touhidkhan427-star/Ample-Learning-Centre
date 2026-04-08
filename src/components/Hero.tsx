import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SpotlightCard from './SpotlightCard';
import { cn } from '@/src/lib/utils';
import { useState, useEffect } from 'react';

const banners = [
  {
    id: 1,
    title: "ব্যাচ অদম্য",
    subjects: "PHYSICS, CHEMISTRY, MATH, H.MATH, BIOLOGY",
    price: "৪,০০০",
    bgColor: "bg-[#4a0404]",
    badge: "SSC 27",
    accent: "text-secondary",
    borderColor: "border-red-500"
  },
  {
    id: 2,
    title: "ব্যাচ প্রত্যয়",
    subjects: "ENGLISH, BENGALI, ICT, RELIGION",
    price: "৩,৫০০",
    bgColor: "bg-[#042a4a]",
    badge: "HSC 26",
    accent: "text-blue-400",
    borderColor: "border-blue-500"
  },
  {
    id: 3,
    title: "ব্যাচ সংকল্প",
    subjects: "GENERAL MATH, SCIENCE, BGS",
    price: "২,৫০০",
    bgColor: "bg-[#044a2a]",
    badge: "CLASS 10",
    accent: "text-emerald-400",
    borderColor: "border-emerald-500"
  }
];

const HeroParticles = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2, // 2px to 6px
      x: Math.random() * 100, // 0% to 100%
      y: Math.random() * 100, // 0% to 100%
      duration: Math.random() * 20 + 15, // 15s to 35s
      delay: Math.random() * 10, // 0s to 10s
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-secondary/40 dark:bg-secondary/30 blur-[1px]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            boxShadow: `0 0 ${p.size * 2}px rgba(255, 193, 7, 0.5)`
          }}
          animate={{
            y: [0, -40, 0, 40, 0],
            x: [0, 30, 0, -30, 0],
            opacity: [0, 0.8, 0.2, 0.8, 0],
            scale: [1, 1.5, 0.8, 1.5, 1]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const getPosition = (index: number) => {
    const diff = (index - currentIndex + banners.length) % banners.length;
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === banners.length - 1) return 'left';
    return 'hidden';
  };

  return (
    <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
      {/* Noise Texture Overlay */}
      <div className="noise-overlay" />
      
      {/* Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-accent/5 dark:bg-accent/10 rounded-full blur-3xl" />
      
      {/* Animated Particles */}
      <HeroParticles />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-400 text-sm font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary dark:bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary dark:bg-blue-400"></span>
              </span>
              অফার চলছে ২০২৬
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.2] mb-6 font-bengali transition-colors">
              আপনার উজ্জ্বল ভবিষ্যতের জন্য <br />
              <span className="text-primary dark:text-blue-400">সেরা লার্নিং প্ল্যাটফর্ম</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-lg font-bengali leading-relaxed transition-colors">
              ক্লাস ৬ থেকে এসএসসি পর্যন্ত সকল বিষয়ের পূর্ণাঙ্গ প্রস্তুতি নিন আমাদের দক্ষ মেন্টরদের সাথে। আধুনিক পদ্ধতিতে শিখুন এবং নিজেকে এগিয়ে রাখুন।
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigate('/courses')}
                className="bg-gradient-navy hover:bg-gradient-navy-hover text-white px-8 py-4 rounded-2xl font-bengali font-bold flex items-center gap-2 hover:shadow-2xl hover:shadow-blue-900/30 hover:-translate-y-1 transition-all active:scale-95 group"
              >
                ভর্তি হোন এখনই
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => navigate('/courses')}
                className="bg-gradient-navy hover:bg-gradient-navy-hover text-white px-8 py-4 rounded-2xl font-bengali font-bold flex items-center gap-2 hover:shadow-2xl hover:shadow-blue-900/30 hover:-translate-y-1 transition-all active:scale-95 group"
              >
                <PlayCircle size={20} className="text-white/80" />
                ফ্রি ক্লাস দেখুন
              </button>
            </div>
          </motion.div>

          <div className="relative h-[400px] md:h-[500px] flex items-center justify-center perspective-1000">
            {banners.map((banner, index) => {
              const pos = getPosition(index);
              return (
                <motion.div
                  key={banner.id}
                  initial={false}
                  animate={{
                    x: pos === 'center' ? 0 : pos === 'left' ? '-45%' : pos === 'right' ? '45%' : 0,
                    scale: pos === 'center' ? 1 : 0.85,
                    zIndex: pos === 'center' ? 30 : 20,
                    opacity: pos === 'center' ? 1 : pos === 'hidden' ? 0 : 0.6,
                    rotateY: pos === 'left' ? 15 : pos === 'right' ? -15 : 0,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier for smooth motion
                  }}
                  className={cn(
                    "absolute w-full max-w-[500px] aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-slate-900 dark:border-slate-800 flex flex-col items-center pt-8 md:pt-12",
                    banner.bgColor
                  )}
                >
                  {/* Noise Texture */}
                  <div className="noise-overlay opacity-20" />
                  
                  {/* Content Overlay */}
                  <div className="relative z-10 flex flex-col items-center text-center px-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={cn(
                        "text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full border border-dashed shadow-lg backdrop-blur-sm",
                        banner.borderColor,
                        "bg-white/10"
                      )}>
                        {banner.badge}
                      </div>
                      <div className="text-white font-bengali font-bold text-xl md:text-3xl drop-shadow-lg">
                        {banner.title}
                      </div>
                    </div>
                    
                    <h2 className={cn(
                      "font-bold text-[8px] md:text-[10px] lg:text-xs tracking-[0.2em] mb-4 uppercase drop-shadow-sm",
                      banner.accent
                    )}>
                      {banner.subjects}
                    </h2>
                    
                    <div className="text-white font-bengali text-base md:text-lg flex items-center gap-3">
                      সারাবছর মাত্র 
                      <span className={cn(
                        "font-bold text-2xl md:text-5xl inline-flex items-center relative px-2",
                        banner.accent
                      )}>
                        <span className="relative z-10">{banner.price}</span>
                        <div className={cn("absolute inset-0 -m-1 border-2 rounded-full rotate-[-3deg] opacity-40", banner.borderColor)} />
                        <span className="text-sm md:text-base ml-1 relative z-10">টাকা</span>
                      </span>
                    </div>
                  </div>

                  {/* Instructors Group Image */}
                  <div className="mt-auto w-full relative h-[55%] flex items-end justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1523240715630-9918c13d19cc?q=80&w=800&auto=format&fit=crop"
                      alt="Instructors Group"
                      className="w-[95%] h-full object-contain object-bottom filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                      referrerPolicy="no-referrer"
                    />
                    <div className={cn("absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-80", banner.bgColor)} />
                  </div>
                </motion.div>
              );
            })}

            {/* Navigation Buttons */}
            <button 
              onClick={() => setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)}
              className="absolute left-0 z-40 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all -translate-x-1/2"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => setCurrentIndex((prev) => (prev + 1) % banners.length)}
              className="absolute right-0 z-40 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all translate-x-1/2"
            >
              <ChevronRight size={24} />
            </button>

            {/* Carousel Dots */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-40">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === currentIndex ? "w-8 bg-primary dark:bg-blue-400" : "w-2 bg-slate-300 dark:bg-slate-600"
                  )}
                />
              ))}
            </div>

            {/* Floating Stats Card */}
            <SpotlightCard className="absolute -bottom-12 -left-12 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 hidden xl:block z-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/20 dark:bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">১০ লাখ+</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 font-bengali">সক্রিয় শিক্ষার্থী</div>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}


