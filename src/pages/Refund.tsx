import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Refund() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-primary dark:text-blue-400 font-bengali font-medium hover:underline mb-8">
            <ChevronLeft size={20} className="mr-1" /> হোমে ফিরে যান
          </Link>
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 dark:border-slate-800">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-bengali mb-8">রিফান্ড পলিসি</h1>
            <div className="prose prose-slate dark:prose-invert max-w-none font-bengali space-y-6 text-slate-600 dark:text-slate-300">
              <p>
                Ample Learning Centre-এ আমরা সবসময় শিক্ষার্থীদের সর্বোচ্চ মানের সেবা নিশ্চিত করার চেষ্টা করি। তবে কোনো কারণে যদি আপনি আমাদের কোর্স নিয়ে সন্তুষ্ট না হন, তবে নিচের শর্তাবলি অনুযায়ী আপনি রিফান্ডের জন্য আবেদন করতে পারবেন।
              </p>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">১. রিফান্ডের যোগ্যতা</h3>
              <p>
                আপনি রিফান্ড পাবেন যদি নিচের শর্তগুলো পূরণ করেন:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>কোর্স কেনার <strong>৩ দিনের (৭২ ঘণ্টা)</strong> মধ্যে রিফান্ডের জন্য আবেদন করতে হবে।</li>
                <li>কোর্সের <strong>১০%-এর বেশি</strong> ভিডিও দেখা বা ম্যাটেরিয়াল ডাউনলোড করা যাবে না।</li>
                <li>লাইভ ক্লাসের ক্ষেত্রে, ২টির বেশি লাইভ ক্লাসে অংশগ্রহণ করলে রিফান্ড প্রযোজ্য হবে না।</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">২. যেসব ক্ষেত্রে রিফান্ড প্রযোজ্য নয়</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>৩ দিন (৭২ ঘণ্টা) পার হয়ে যাওয়ার পর কোনো রিফান্ড রিকোয়েস্ট গ্রহণ করা হবে না।</li>
                <li>অ্যাকাউন্ট শেয়ারিং বা কোনো বেআইনি কার্যকলাপের কারণে অ্যাকাউন্ট সাসপেন্ড হলে।</li>
                <li>অফলাইন কোর্স বা স্পেশাল ডিসকাউন্টে কেনা কোর্সের ক্ষেত্রে (যদি না অফারে ভিন্ন কিছু উল্লেখ থাকে)।</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">৩. রিফান্ড প্রক্রিয়া</h3>
              <p>
                রিফান্ডের জন্য আবেদন করতে নিচের ধাপগুলো অনুসরণ করুন:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>আমাদের সাপোর্ট ইমেইল <strong>hello@amplelearning.com</strong>-এ মেইল করুন অথবা হটলাইনে কল করুন।</li>
                <li>মেইলে আপনার নাম, রেজিস্টার্ড ইমেইল/ফোন নম্বর এবং কোর্স কেনার ট্রানজেকশন আইডি উল্লেখ করুন।</li>
                <li>রিফান্ড চাওয়ার একটি সংক্ষিপ্ত কারণ উল্লেখ করুন (এটি আমাদের সেবার মান উন্নত করতে সাহায্য করবে)।</li>
              </ol>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">৪. রিফান্ড পাওয়ার সময়সীমা</h3>
              <p>
                আপনার রিফান্ড রিকোয়েস্ট অ্যাপ্রুভ হওয়ার পর, যে মাধ্যমে আপনি পেমেন্ট করেছিলেন (বিকাশ, নগদ, বা কার্ড), সেই মাধ্যমেই টাকা ফেরত পাঠানো হবে। এই প্রক্রিয়ায় সাধারণত <strong>৭ থেকে ১০ কার্যদিবস</strong> সময় লাগতে পারে।
              </p>

              <p className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                যেকোনো প্রয়োজনে আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করতে দ্বিধা করবেন না।
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
