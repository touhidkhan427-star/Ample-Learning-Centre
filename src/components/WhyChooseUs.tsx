import { motion } from 'motion/react';
import { ShieldCheck, Zap, Globe, HeartHandshake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import SpotlightCard from './SpotlightCard';

const features = [
  { id: 1, title: 'মানসম্মত কন্টেন্ট', desc: 'সেরা মেন্টরদের দ্বারা তৈরি প্রতিটি লেসন ভিডিও ও নোট।', icon: ShieldCheck, color: 'text-blue-500', gradient: 'from-blue-500 to-blue-400' },
  { id: 2, title: 'দ্রুত প্রস্তুতি', desc: 'অল্প সময়ে পূর্ণাঙ্গ প্রস্তুতির জন্য পরিকল্পিত কোর্স কারিকুলাম।', icon: Zap, color: 'text-amber-500', gradient: 'from-amber-500 to-amber-400' },
  { id: 3, title: 'যেকোনো জায়গা থেকে', desc: 'ইন্টারনেট থাকলে দেশের যেকোনো প্রান্ত থেকে শিখুন।', icon: Globe, color: 'text-emerald-500', gradient: 'from-emerald-500 to-emerald-400' },
  { id: 4, title: '২৪/৭ সাপোর্ট', desc: 'পড়াশোনায় যেকোনো সমস্যায় আমাদের সাপোর্ট টিম সবসময় পাশে আছে।', icon: HeartHandshake, color: 'text-pink-500', gradient: 'from-pink-500 to-pink-400' },
];

export default function WhyChooseUs() {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 font-bengali transition-colors">
            কেন আমাদের কোর্সে এনরোল করবেন?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-bengali transition-colors">
            আমরা শিক্ষার্থীদের জন্য এমন একটি পরিবেশ তৈরি করি যেখানে তারা আনন্দের সাথে শিখতে পারে।
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpotlightCard 
                className="p-8 rounded-[2rem] bg-[#FAFAFA] dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-md hover:shadow-2xl hover:scale-[1.02] hover:border-primary/30 dark:hover:border-primary/50 transition-all duration-500 group h-full relative cursor-pointer"
                onClick={() => navigate(`/features/${feature.id}`)}
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center mb-6 transition-all duration-500",
                  feature.color,
                  `group-hover:bg-gradient-to-br ${feature.gradient} group-hover:text-white group-hover:scale-110 group-hover:shadow-lg`
                )}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-bengali transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 font-bengali text-sm leading-relaxed transition-colors">
                  {feature.desc}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

