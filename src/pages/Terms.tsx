import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-primary dark:text-blue-400 font-bengali font-medium hover:underline mb-8">
            <ChevronLeft size={20} className="mr-1" /> হোমে ফিরে যান
          </Link>
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 dark:border-slate-800">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-bengali mb-8">টার্মস এবং শর্তাবলি</h1>
            <div className="prose prose-slate dark:prose-invert max-w-none font-bengali space-y-6 text-slate-600 dark:text-slate-300">
              <p>
                Ample Learning Centre-এর ওয়েবসাইট এবং সেবাসমূহ ব্যবহার করার আগে অনুগ্রহ করে নিচের শর্তাবলি (Terms and Conditions) মনোযোগ সহকারে পড়ুন। আমাদের ওয়েবসাইট ব্যবহার করার অর্থ হলো আপনি এই শর্তাবলির সাথে একমত।
              </p>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">১. সাধারণ শর্তাবলি</h3>
              <p>
                এই ওয়েবসাইটের সকল কন্টেন্ট, কোর্স ম্যাটেরিয়াল এবং ভিডিও Ample Learning Centre-এর নিজস্ব সম্পত্তি। এগুলো কোনোভাবেই কপি, ডিস্ট্রিবিউট বা কমার্শিয়াল উদ্দেশ্যে ব্যবহার করা সম্পূর্ণ বেআইনি।
              </p>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">২. ইউজার অ্যাকাউন্ট</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>কোর্স কেনার জন্য আপনাকে একটি অ্যাকাউন্ট তৈরি করতে হবে।</li>
                <li>আপনার অ্যাকাউন্টের পাসওয়ার্ড এবং অন্যান্য তথ্যের গোপনীয়তা রক্ষার দায়িত্ব সম্পূর্ণ আপনার।</li>
                <li>একাধিক ব্যক্তির সাথে একটি অ্যাকাউন্ট শেয়ার করা আমাদের নিয়মের পরিপন্থী এবং এর প্রমাণ পাওয়া গেলে অ্যাকাউন্টটি বাতিল করা হতে পারে।</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">৩. কোর্স এনরোলমেন্ট এবং পেমেন্ট</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>কোর্সের মূল্য ওয়েবসাইটে স্পষ্টভাবে উল্লেখ করা আছে। পেমেন্ট সম্পন্ন হওয়ার পরেই আপনি কোর্সের অ্যাক্সেস পাবেন।</li>
                <li>আমরা বিভিন্ন পেমেন্ট গেটওয়ে (যেমন: বিকাশ, নগদ, কার্ড) সাপোর্ট করি। পেমেন্ট সংক্রান্ত কোনো সমস্যা হলে আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করতে হবে।</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">৪. রিফান্ড পলিসি</h3>
              <p>
                কোর্স কেনার পর রিফান্ড সংক্রান্ত বিস্তারিত তথ্যের জন্য আমাদের <Link to="/refund" className="text-primary dark:text-blue-400 hover:underline">রিফান্ড পলিসি</Link> পেজটি ভিজিট করুন।
              </p>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">৫. ওয়েবসাইটের ব্যবহার</h3>
              <p>
                আমাদের প্ল্যাটফর্মে কোনো ধরনের অশালীন মন্তব্য, স্প্যামিং বা অন্য শিক্ষার্থীদের বিরক্ত করা থেকে বিরত থাকতে হবে। এ ধরনের কার্যকলাপে জড়িত থাকলে বিনা নোটিশে অ্যাকাউন্ট সাসপেন্ড করা হতে পারে।
              </p>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">৬. শর্তাবলি পরিবর্তন</h3>
              <p>
                Ample Learning Centre যেকোনো সময় এই শর্তাবলি পরিবর্তন, পরিমার্জন বা বাতিল করার অধিকার সংরক্ষণ করে। পরিবর্তিত শর্তাবলি ওয়েবসাইটে পাবলিশ হওয়ার সাথে সাথেই কার্যকর হবে।
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
