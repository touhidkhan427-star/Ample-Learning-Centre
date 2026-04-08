import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-primary dark:text-blue-400 font-bengali font-medium hover:underline mb-8">
            <ChevronLeft size={20} className="mr-1" /> হোমে ফিরে যান
          </Link>
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 dark:border-slate-800">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-bengali mb-8">আমাদের সম্পর্কে</h1>
            <div className="prose prose-slate dark:prose-invert max-w-none font-bengali space-y-6 text-slate-600 dark:text-slate-300">
              <p className="text-lg leading-relaxed">
                <strong>Ample Learning Centre</strong>-এ আপনাকে স্বাগতম! আমরা বিশ্বাস করি মানসম্মত শিক্ষা সবার অধিকার। আধুনিক প্রযুক্তির মাধ্যমে দেশের যেকোনো প্রান্তের শিক্ষার্থীদের কাছে সেরা মেন্টরদের ক্লাস পৌঁছে দেওয়াই আমাদের মূল লক্ষ্য।
              </p>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">আমাদের মিশন</h3>
              <p>
                আমাদের মিশন হলো গতানুগতিক শিক্ষার বাইরে গিয়ে শিক্ষার্থীদের জন্য একটি ইন্টারঅ্যাকটিভ এবং আনন্দদায়ক লার্নিং প্ল্যাটফর্ম তৈরি করা। আমরা চাই প্রতিটি শিক্ষার্থী যেন তার মেধা ও সৃজনশীলতার সর্বোচ্চ বিকাশ ঘটাতে পারে।
              </p>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">আমাদের ভিশন</h3>
              <p>
                বাংলাদেশের শিক্ষা ব্যবস্থায় একটি ইতিবাচক পরিবর্তন আনা এবং ডিজিটাল এডুকেশনের মাধ্যমে বৈষম্য দূর করে সবার জন্য সমান সুযোগ নিশ্চিত করা।
              </p>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">কেন Ample Learning Centre বেছে নেবেন?</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>অভিজ্ঞ মেন্টর:</strong> আমাদের প্রতিটি কোর্সের ক্লাস নেন দেশের সেরা এবং অভিজ্ঞ শিক্ষকরা।</li>
                <li><strong>আধুনিক কারিকুলাম:</strong> বর্তমান সময়ের চাহিদার কথা মাথায় রেখে আমাদের কোর্সগুলো ডিজাইন করা হয়েছে।</li>
                <li><strong>লাইভ এবং রেকর্ডেড ক্লাস:</strong> লাইভ ক্লাসের পাশাপাশি প্রতিটি ক্লাসের রেকর্ডিং দেওয়া হয়, যাতে শিক্ষার্থীরা যেকোনো সময় রিভিশন দিতে পারে।</li>
                <li><strong>২৪/৭ সাপোর্ট:</strong> শিক্ষার্থীদের যেকোনো সমস্যা সমাধানে আমাদের ডেডিকেটেড সাপোর্ট টিম সবসময় প্রস্তুত।</li>
                <li><strong>সাশ্রয়ী মূল্য:</strong> আমরা চেষ্টা করি সবচেয়ে কম খরচে সেরা মানের শিক্ষা নিশ্চিত করতে।</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">আমাদের সাথে যুক্ত হোন</h3>
              <p>
                আপনার উজ্জ্বল ভবিষ্যতের পথে Ample Learning Centre হতে পারে আপনার সবচেয়ে বিশ্বস্ত সঙ্গী। আজই আমাদের প্ল্যাটফর্মে যুক্ত হোন এবং আপনার শেখার যাত্রাকে আরও সহজ ও আনন্দদায়ক করুন।
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
