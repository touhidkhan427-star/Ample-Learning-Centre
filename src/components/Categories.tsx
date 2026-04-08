import { motion } from 'motion/react';
import { BookOpen, GraduationCap, School, Users, Library, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import SpotlightCard from './SpotlightCard';

const categories = [
  { id: 1, name: 'ষষ্ঠ শ্রেণি', icon: BookOpen, color: 'bg-blue-500', gradient: 'from-blue-500 to-blue-400', count: 'লেসন ভিডিও, লাইভ ক্লাস, এসাইনমেন্ট' },
  { id: 2, name: 'সপ্তম শ্রেণি', icon: Library, color: 'bg-emerald-500', gradient: 'from-emerald-500 to-emerald-400', count: 'লেসন ভিডিও, লাইভ ক্লাস, এসাইনমেন্ট' },
  { id: 3, name: 'অষ্টম শ্রেণি', icon: School, color: 'bg-purple-500', gradient: 'from-purple-500 to-purple-400', count: 'লেসন ভিডিও, লাইভ ক্লাস, এসাইনমেন্ট' },
  { id: 4, name: 'নবম শ্রেণি', icon: GraduationCap, color: 'bg-orange-500', gradient: 'from-orange-500 to-orange-400', count: 'লেসন ভিডিও, লাইভ ক্লাস, এসাইনমেন্ট' },
  { id: 5, name: 'দশম শ্রেণি', icon: Users, color: 'bg-pink-500', gradient: 'from-pink-500 to-pink-400', count: 'লেসন ভিডিও, লাইভ ক্লাস, এসাইনমেন্ট' },
  { id: 6, name: 'এসএসসি', icon: Award, color: 'bg-indigo-500', gradient: 'from-indigo-500 to-indigo-400', count: 'লেসন ভিডিও, লাইভ ক্লাস, এসাইনমেন্ট' },
];

export default function Categories() {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 font-bengali transition-colors">
            আমাদের ক্যাটাগরিসমূহ
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-bengali transition-colors">
            আপনার প্রয়োজনীয় ক্লাসটি বেছে নিন এবং আজই আপনার পড়াশোনা শুরু করুন।
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpotlightCard 
                className="group bg-[#FAFAFA] dark:bg-slate-800 p-6 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-500 border border-slate-200/80 dark:border-slate-700 hover:border-primary/30 dark:hover:border-primary/50 flex items-center gap-6 cursor-pointer h-full relative"
                onClick={() => navigate(`/courses`)}
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-500",
                  category.color,
                  `group-hover:bg-gradient-to-br ${category.gradient} group-hover:scale-110 group-hover:shadow-primary/20`
                )}>
                  <category.icon size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 font-bengali transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-bengali leading-snug transition-colors">
                    {category.count}
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

