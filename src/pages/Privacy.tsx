import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-primary dark:text-blue-400 font-bengali font-medium hover:underline mb-8">
            <ChevronLeft size={20} className="mr-1" /> হোমে ফিরে যান
          </Link>
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 dark:border-slate-800">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-bengali mb-8">প্রাইভেসি পলিসি</h1>
            <div className="prose prose-slate dark:prose-invert max-w-none font-bengali space-y-6 text-slate-600 dark:text-slate-300">
              <p>
                Ample Learning Centre-এ স্বাগতম। আপনার ব্যক্তিগত তথ্যের গোপনীয়তা রক্ষা করা আমাদের অন্যতম প্রধান দায়িত্ব। এই প্রাইভেসি পলিসি পেজে আমরা ব্যাখ্যা করেছি কীভাবে আমরা আপনার তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষিত রাখি।
              </p>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">১. আমরা কী ধরনের তথ্য সংগ্রহ করি?</h3>
              <p>
                আমাদের ওয়েবসাইট ব্যবহার করার সময় আমরা কিছু সাধারণ তথ্য সংগ্রহ করতে পারি, যেমন:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>ব্যক্তিগত তথ্য:</strong> আপনার নাম, ইমেইল অ্যাড্রেস, ফোন নম্বর ইত্যাদি (অ্যাকাউন্ট তৈরি বা কোর্স কেনার সময়)।</li>
                <li><strong>ব্যবহারকারীর তথ্য:</strong> আপনি কীভাবে আমাদের ওয়েবসাইট ব্যবহার করছেন, কোন কোর্সগুলো দেখছেন ইত্যাদি।</li>
                <li><strong>ডিভাইস তথ্য:</strong> আপনার আইপি অ্যাড্রেস, ব্রাউজারের ধরন এবং অপারেটিং সিস্টেম।</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">২. আমরা কীভাবে আপনার তথ্য ব্যবহার করি?</h3>
              <p>
                সংগৃহীত তথ্যগুলো আমরা নিচের উদ্দেশ্যগুলোতে ব্যবহার করে থাকি:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>আপনাকে নিরবচ্ছিন্ন সেবা প্রদান করতে।</li>
                <li>আপনার পেমেন্ট এবং ট্রানজেকশন প্রসেস করতে।</li>
                <li>নতুন কোর্স, অফার বা আপডেট সম্পর্কে আপনাকে জানাতে।</li>
                <li>আমাদের ওয়েবসাইটের মান এবং ইউজার এক্সপেরিয়েন্স উন্নত করতে।</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">৩. তথ্য শেয়ারিং এবং নিরাপত্তা</h3>
              <p>
                আমরা আপনার ব্যক্তিগত তথ্য কোনো তৃতীয় পক্ষের কাছে বিক্রি বা শেয়ার করি না। তবে আইনি প্রয়োজনে বা পেমেন্ট গেটওয়ের মতো বিশ্বস্ত থার্ড-পার্টি সার্ভিসের সাথে শুধুমাত্র প্রয়োজনীয় তথ্য শেয়ার করা হতে পারে। আপনার তথ্য সুরক্ষিত রাখতে আমরা উন্নত এনক্রিপশন এবং সিকিউরিটি প্রোটোকল ব্যবহার করি।
              </p>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">৪. কুকিজ (Cookies)</h3>
              <p>
                আপনার ব্রাউজিং অভিজ্ঞতা উন্নত করতে আমরা কুকিজ ব্যবহার করি। আপনি চাইলে আপনার ব্রাউজার সেটিংস থেকে কুকিজ বন্ধ করে রাখতে পারেন, তবে এতে ওয়েবসাইটের কিছু ফিচার কাজ না-ও করতে পারে।
              </p>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">৫. পলিসি পরিবর্তন</h3>
              <p>
                Ample Learning Centre যেকোনো সময় এই প্রাইভেসি পলিসি আপডেট বা পরিবর্তন করার অধিকার রাখে। কোনো বড় পরিবর্তন হলে আমরা ওয়েবসাইটের মাধ্যমে বা ইমেইলে আপনাকে জানিয়ে দেব।
              </p>

              <p className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                আপনার যদি আমাদের প্রাইভেসি পলিসি নিয়ে কোনো প্রশ্ন থাকে, তবে অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন: <strong>hello@amplelearning.com</strong>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
