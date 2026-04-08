import { motion } from 'motion/react';
import { Star, Clock, Users, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import SpotlightCard from './SpotlightCard';

interface Course {
  id: number;
  title: string;
  image: string;
  price: string;
  rating: number;
  students: string;
  duration: string;
}

interface CourseSectionProps {
  title: string;
  courses: Course[];
}

export default function CourseSection({ title, courses }: CourseSectionProps) {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 font-bengali transition-colors">
              {title}
            </h2>
            <div className="h-1.5 w-24 bg-primary rounded-full" />
          </div>
          <Link to="/courses" className="text-primary dark:text-blue-400 font-bengali font-bold flex items-center gap-1 hover:gap-2 transition-all">
            সবগুলো দেখুন <ChevronRight size={20} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpotlightCard className="course-card group bg-[#FAFAFA] dark:bg-slate-800 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-500 border border-slate-200/80 dark:border-slate-700 hover:border-primary/30 dark:hover:border-primary/50 flex flex-col h-full relative cursor-pointer" onClick={() => navigate(`/courses/${course.id}`)}>
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
                  
                  <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between text-slate-500 dark:text-slate-400 text-sm transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 transition-all duration-500">
                        <Users size={16} className="group-hover:[stroke:url(#grad-users)] transition-all duration-500" />
                      </div>
                      <span className="group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{course.students}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 transition-all duration-500">
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
        </div>
      </div>
    </section>
  );
}

