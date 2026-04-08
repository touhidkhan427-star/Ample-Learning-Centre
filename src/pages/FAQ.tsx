import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

const faqs = [
  {
    question: "আমি কীভাবে একটি কোর্সে ভর্তি হবো?",
    answer: "কোর্সে ভর্তি হওয়া খুবই সহজ। প্রথমে আপনার পছন্দের কোর্সটি নির্বাচন করুন, এরপর 'ভর্তি হোন' বাটনে ক্লিক করুন। আপনার অ্যাকাউন্ট না থাকলে একটি অ্যাকাউন্ট তৈরি করুন এবং পেমেন্ট সম্পন্ন করলেই আপনি কোর্সের অ্যাক্সেস পেয়ে যাবেন।"
  },
  {
    question: "কী কী মাধ্যমে পেমেন্ট করা যাবে?",
    answer: "আমরা বিকাশ, নগদ, রকেট সহ সকল জনপ্রিয় মোবাইল ব্যাংকিং এবং ভিসা/মাস্টারকার্ড সাপোর্ট করি।"
  },
  {
    question: "কোর্সগুলো কি মোবাইল থেকে দেখা যাবে?",
    answer: "হ্যাঁ, আমাদের ওয়েবসাইটটি সম্পূর্ণ মোবাইল-ফ্রেন্ডলি। আপনি যেকোনো স্মার্টফোন, ট্যাবলেট বা কম্পিউটার থেকে অনায়াসে ক্লাস করতে পারবেন।"
  },
  {
    question: "লাইভ ক্লাস মিস করলে কী হবে?",
    answer: "কোনো চিন্তার কারণ নেই! প্রতিটি লাইভ ক্লাসের রেকর্ডিং ক্লাস শেষ হওয়ার কিছুক্ষণের মধ্যেই আপনার ড্যাশবোর্ডে যুক্ত হয়ে যাবে। আপনি আপনার সুবিধামতো সময়ে তা দেখে নিতে পারবেন।"
  },
  {
    question: "কোর্স চলাকালীন কোনো সমস্যা হলে কার সাথে যোগাযোগ করবো?",
    answer: "যেকোনো সমস্যার জন্য আপনি আমাদের সাপোর্ট হটলাইনে (01728810605) কল করতে পারেন অথবা hello@amplelearning.com-এ ইমেইল করতে পারেন। আমাদের সাপোর্ট টিম আপনাকে সাহায্য করতে সবসময় প্রস্তুত।"
  },
  {
    question: "কোর্স কেনার পর কি রিফান্ড পাওয়া সম্ভব?",
    answer: "হ্যাঁ, শর্তসাপেক্ষে রিফান্ড পাওয়া সম্ভব। বিস্তারিত জানতে আমাদের 'রিফান্ড পলিসি' পেজটি ভিজিট করুন।"
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-primary dark:text-blue-400 font-bengali font-medium hover:underline mb-8">
            <ChevronLeft size={20} className="mr-1" /> হোমে ফিরে যান
          </Link>
          
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-bengali mb-4">সাধারণ জিজ্ঞাসিত প্রশ্ন</h1>
            <p className="text-slate-600 dark:text-slate-400 font-bengali">
              আপনাদের মনে থাকা সাধারণ কিছু প্রশ্নের উত্তর এখানে দেওয়া হলো
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-bold text-slate-900 dark:text-white font-bengali pr-8">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    size={20} 
                    className={cn(
                      "text-slate-400 transition-transform duration-300 flex-shrink-0",
                      openIndex === index ? "rotate-180 text-primary dark:text-blue-400" : ""
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-slate-600 dark:text-slate-300 font-bengali leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-primary/5 dark:bg-primary/10 rounded-3xl p-8 text-center border border-primary/10 dark:border-primary/20">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-bengali mb-2">আপনার প্রশ্নের উত্তর পাননি?</h3>
            <p className="text-slate-600 dark:text-slate-400 font-bengali mb-6">আমাদের সাপোর্ট টিমের সাথে সরাসরি কথা বলুন</p>
            <Link to="/contact" className="inline-flex items-center justify-center bg-primary text-white px-8 py-3 rounded-xl font-bold font-bengali hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              যোগাযোগ করুন
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
