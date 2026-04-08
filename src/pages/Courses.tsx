import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, GraduationCap, School, Users, Library, Award, ChevronRight, Star, Clock, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SpotlightCard from '../components/SpotlightCard';

const classLevels = [
  { id: 'all', name: 'সকল ক্লাস' },
  { id: 'class-6', name: 'ষষ্ঠ শ্রেণি' },
  { id: 'class-7', name: 'সপ্তম শ্রেণি' },
  { id: 'class-8', name: 'অষ্টম শ্রেণি' },
  { id: 'class-9', name: 'নবম শ্রেণি' },
  { id: 'class-10', name: 'দশম শ্রেণি' },
  { id: 'ssc', name: 'এসএসসি' },
];

const allCourses = [
  { id: 'math-6', title: 'ষষ্ঠ শ্রেণি - সাধারণ গণিত', classLevel: 'class-6', image: 'https://images.unsplash.com/photo-1632516643720-e7f0d7e6a604?q=80&w=400&auto=format&fit=crop', price: '১,৫০০', rating: 4.5, students: '১,২০০+', duration: '৩ মাস' },
  { id: 'science-7', title: 'সপ্তম শ্রেণি - বিজ্ঞান', classLevel: 'class-7', image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=400&auto=format&fit=crop', price: '১,৮০০', rating: 4.6, students: '১,৫০০+', duration: '৩ মাস' },
  { id: 'english-8', title: 'অষ্টম শ্রেণি - ইংরেজি', classLevel: 'class-8', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=400&auto=format&fit=crop', price: '২,০০০', rating: 4.7, students: '২,১০০+', duration: '৪ মাস' },
  { id: 'math-9', title: 'নবম শ্রেণি - সাধারণ গণিত', classLevel: 'class-9', image: 'https://images.unsplash.com/photo-1632516643720-e7f0d7e6a604?q=80&w=400&auto=format&fit=crop', price: '২,০০০', rating: 4.7, students: '৩,২০০+', duration: '৪ মাস' },
  { id: 'physics-10', title: 'দশম শ্রেণি - পদার্থবিজ্ঞান', classLevel: 'class-10', image: 'https://images.unsplash.com/photo-1603126857599-f6e15782fa83?q=80&w=400&auto=format&fit=crop', price: '২,৫০০', rating: 4.8, students: '৩,৫০০+', duration: '৪ মাস' },
  { id: 'chemistry-ssc', title: 'এসএসসি - রসায়ন', classLevel: 'ssc', image: 'https://images.unsplash.com/photo-1603126857599-f6e15782fa83?q=80&w=400&auto=format&fit=crop', price: '২,৫০০', rating: 4.9, students: '৪,১০০+', duration: '৩ মাস' },
  { id: 'biology-ssc', title: 'এসএসসি - জীববিজ্ঞান', classLevel: 'ssc', image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=400&auto=format&fit=crop', price: '২,৫০০', rating: 4.8, students: '৩,৮০০+', duration: '৩ মাস' },
  { id: 'ssc-2027', title: 'এসএসসি ২০২৭ - পূর্ণাঙ্গ প্রস্তুতি', classLevel: 'ssc', image: 'https://images.unsplash.com/photo-1550592704-6c76defa9985?q=80&w=400&auto=format&fit=crop', price: '৪,৫০০', rating: 4.9, students: '৫,০০০+', duration: '৬ মাস' },
];

export default function Courses() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('all');

  const filteredCourses = selectedClass === 'all' 
    ? allCourses 
    : allCourses.filter(course => course.classLevel === selectedClass);

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors bg-slate-50 dark:bg-slate-950">
      <Navbar />
      
      {/* Define SVG Gradients for Icons */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="grad-star" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <linearGradient id="grad-users" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          <linearGradient id="grad-clock" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
      </svg>

      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 font-bengali transition-colors">
              আমাদের কোর্সসমূহ
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-bengali transition-colors">
              আপনার প্রয়োজনীয় ক্লাসটি বেছে নিন এবং আজই আপনার পড়াশোনা শুরু করুন। দেশের সেরা শিক্ষকদের গাইডলাইনে নিজেকে প্রস্তুত করুন।
            </p>
          </motion.div>

          {/* Filter Section */}
          <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-bengali font-bold">
              <Filter size={20} className="text-primary" />
              <span>ফিল্টার করুন:</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              {classLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedClass(level.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-bengali font-medium transition-all duration-300",
                    selectedClass === level.id
                      ? "bg-gradient-navy text-white shadow-md shadow-blue-900/20"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  )}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <SpotlightCard 
                    className="course-card group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-500 border border-slate-200/80 dark:border-slate-800 hover:border-primary/30 dark:hover:border-primary/50 flex flex-col h-full relative cursor-pointer" 
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary dark:text-blue-400 shadow-sm">
                        {course.price}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-100/80 dark:group-hover:bg-amber-500/20 transition-all duration-500">
                          <Star size={16} className="group-hover:[stroke:url(#grad-star)] group-hover:[fill:url(#grad-star)] transition-all duration-500" fill="currentColor" />
                        </div>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300 transition-colors">{course.rating}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 font-bengali leading-snug group-hover:text-primary dark:group-hover:text-blue-400 transition-colors duration-300">
                        {course.title}
                      </h3>
                      
                      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-slate-500 dark:text-slate-400 text-sm transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 transition-all duration-500">
                            <Users size={16} className="group-hover:[stroke:url(#grad-users)] transition-all duration-500" />
                          </div>
                          <span className="group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{course.students}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 transition-all duration-500">
                            <Clock size={16} className="group-hover:[stroke:url(#grad-clock)] transition-all duration-500" />
                          </div>
                          <span className="group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{course.duration}</span>
                        </div>
                      </div>
                      
                      <button className="mt-6 w-full bg-gradient-navy hover:bg-gradient-navy-hover text-white py-3 rounded-xl font-bengali font-bold hover:shadow-lg hover:shadow-blue-900/30 hover:-translate-y-0.5 transition-all duration-300 shadow-md">
                        বিস্তারিত দেখুন
                      </button>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredCourses.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500 dark:text-slate-400 font-bengali text-lg">এই ক্লাসের জন্য কোনো কোর্স পাওয়া যায়নি।</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
