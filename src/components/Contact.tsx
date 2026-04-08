import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Contact() {
  return (
    <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 font-bengali transition-colors">
              যেকোনো প্রয়োজনে কল করুন
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-10 font-bengali text-lg leading-relaxed transition-colors">
              কোর্স, ক্লাস, পড়াশোনা, প্রোমো কোড অথবা যেকোনো বিষয়ে জানতে হলে এখনই কল করো। আমাদের সাপোর্ট টিম সবসময় তোমাদের পাশে আছে।
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className={cn(
                  "w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-primary dark:text-blue-400 transition-all duration-500",
                  "group-hover:bg-gradient-premium group-hover:text-slate-900 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20"
                )}>
                  <Phone size={28} />
                </div>
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 font-bengali mb-1 transition-colors">ফোন</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">01728810605</div>
                  <div className="text-xs text-slate-400 dark:text-slate-500 font-bengali mt-1 transition-colors">(সকাল ১০ টা থেকে রাত ১০টা)</div>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className={cn(
                  "w-14 h-14 bg-accent/10 dark:bg-accent/20 rounded-2xl flex items-center justify-center text-accent dark:text-emerald-400 transition-all duration-500",
                  "group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-emerald-400 group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent/20"
                )}>
                  <Mail size={28} />
                </div>
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 font-bengali mb-1 transition-colors">ইমেইল</div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white transition-colors">hello@amplelearning.com</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-slate-50 dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-colors"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 font-bengali transition-colors">
              আপনার মতামত শেয়ার করুন
            </h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 font-bengali transition-colors">নাম</label>
                <input
                  type="text"
                  className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/40 focus:border-primary dark:focus:border-primary transition-all outline-none"
                  placeholder="আপনার নাম লিখুন"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 font-bengali transition-colors">ফোন</label>
                <input
                  type="tel"
                  className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/40 focus:border-primary dark:focus:border-primary transition-all outline-none"
                  placeholder="আপনার ফোন নম্বর লিখুন"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 font-bengali transition-colors">আপনার মতামত</label>
                <textarea
                  rows={4}
                  className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/40 focus:border-primary dark:focus:border-primary transition-all outline-none resize-none"
                  placeholder="আপনার মতামত এখানে লিখুন..."
                ></textarea>
              </div>
              <button className="w-full bg-gradient-navy hover:bg-gradient-navy-hover text-white py-4 rounded-2xl font-bengali font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-blue-900/30 hover:-translate-y-0.5 transition-all active:scale-95">
                <Send size={20} />
                পাঠান
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
