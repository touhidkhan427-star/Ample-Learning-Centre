import { motion } from 'motion/react';
import { Youtube, Video, Users, GraduationCap, CheckCircle2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const stats = [
  { id: 1, label: 'সাবস্ক্রাইবার', value: '১০ লাখ+', icon: Youtube, color: 'text-red-500', gradient: 'from-red-500 to-red-400' },
  { id: 2, label: 'ভিডিও লেকচার', value: '২৪০০+', icon: Video, color: 'text-blue-500', gradient: 'from-blue-500 to-blue-400' },
  { id: 3, label: 'ইউটিউব ভিউ', value: '৯০ মিলিয়ন+', icon: Youtube, color: 'text-red-600', gradient: 'from-red-600 to-red-500' },
  { id: 4, label: 'শিক্ষক', value: '৩০+', icon: GraduationCap, color: 'text-emerald-500', gradient: 'from-emerald-500 to-emerald-400' },
  { id: 5, label: 'বোর্ড প্রশ্ন ও সমাধান', value: 'প্রশ্ন সমাধান', icon: CheckCircle2, color: 'text-indigo-500', gradient: 'from-indigo-500 to-indigo-400' },
];

export default function Stats() {
  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 to-white dark:from-primary/10 dark:to-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center group"
            >
              <div className={cn(
                "inline-flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-sm mb-4 transition-all duration-500",
                stat.color,
                `group-hover:bg-gradient-to-br ${stat.gradient} group-hover:text-white group-hover:scale-110 group-hover:shadow-md`
              )}>
                <stat.icon size={24} />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1 transition-colors">
                {stat.value}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-bengali transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
