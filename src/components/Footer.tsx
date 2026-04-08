import { motion } from 'motion/react';
import { Facebook, Youtube, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 pt-20 pb-10 transition-colors">
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white tracking-tight font-bengali">
                Ample Learning
              </span>
              <span className="text-xs text-accent font-medium uppercase tracking-widest -mt-1">
                Centre
              </span>
            </div>
            <p className="text-sm text-slate-400 font-bengali leading-relaxed">
              আমরা বিশ্বাস করি মানসম্মত শিক্ষা সবার অধিকার। আধুনিক প্রযুক্তির মাধ্যমে আমরা শিক্ষার্থীদের কাছে পৌঁছে দিচ্ছি সেরা মেন্টরদের ক্লাস।
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-slate-800 dark:bg-slate-800/50 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 dark:bg-slate-800/50 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                <Youtube size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 dark:bg-slate-800/50 rounded-full flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 dark:bg-slate-800/50 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-8 font-bengali">যোগাযোগ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-primary dark:text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-sm">01728810605</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-primary dark:text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-sm">hello@amplelearning.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary dark:text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-sm font-bengali">Mirpur, Dhaka 1216, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-8 font-bengali">কোম্পানি</h4>
            <ul className="space-y-4 font-bengali text-sm">
              <li><Link to="/faq" className="hover:text-primary dark:hover:text-blue-400 transition-colors">সাধারণ জিজ্ঞাসিত প্রশ্ন</Link></li>
              <li><Link to="/about" className="hover:text-primary dark:hover:text-blue-400 transition-colors">আমাদের সম্পর্কে</Link></li>
              <li><Link to="/terms" className="hover:text-primary dark:hover:text-blue-400 transition-colors">টার্মস এবং শর্তাবলি</Link></li>
              <li><Link to="/privacy" className="hover:text-primary dark:hover:text-blue-400 transition-colors">প্রাইভেসি পলিসি</Link></li>
              <li><Link to="/refund" className="hover:text-primary dark:hover:text-blue-400 transition-colors">রিফান্ড পলিসি</Link></li>
            </ul>
          </div>

          {/* Trade License */}
          <div>
            <h4 className="text-lg font-bold text-white mb-8 font-bengali">আমাদের সাথে যুক্ত হোন</h4>
            <div className="bg-slate-800/50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50 dark:border-slate-800/50">
              <p className="text-xs text-slate-400 font-bengali mb-2 uppercase tracking-wider">ট্রেড লাইসেন্স</p>
              <p className="text-sm font-mono text-slate-200">TRAD/DNCC/025540/2023</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-800 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-500 font-bengali">
            Copyright © 2026 Ample Learning Centre. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <img src="https://picsum.photos/seed/payment/300/40" alt="Payment Methods" className="h-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" referrerPolicy="no-referrer" />
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
