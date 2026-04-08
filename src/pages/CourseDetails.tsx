import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { Star, Clock, Users, PlayCircle, FileText, CheckCircle2, Award, ChevronRight, MessageSquare, ShieldCheck, Video, X, Loader2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SpotlightCard from '../components/SpotlightCard';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../lib/firebase';

// Mock data for the course details
const courseData = {
  id: 'ssc-2027',
  title: "এসএসসি ২০২৭ - পূর্ণাঙ্গ প্রস্তুতি (বিজ্ঞান)",
  badge: "SSC 2027",
  description: "বিজ্ঞান বিভাগের সকল বিষয়ের এ টু জেড প্রস্তুতি। ফিজিক্স, কেমিস্ট্রি, বায়োলজি এবং হায়ার ম্যাথের বেসিক থেকে এডভান্সড লেভেলের ক্লাস। দেশের সেরা মেন্টরদের সাথে নিজের প্রস্তুতিকে নিয়ে যাও অনন্য উচ্চতায়।",
  price: "৪,৫০০",
  originalPrice: "৬,০০০",
  rating: 4.8,
  reviewsCount: 1250,
  students: "৫,০০০+",
  duration: "৬ মাস",
  image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=1200&auto=format&fit=crop",
  features: [
    "১২০+ লাইভ ক্লাস",
    "প্রতিটি ক্লাসের রেকর্ডিং",
    "অধ্যায়ভিত্তিক লেকচার শিট",
    "সাপ্তাহিক মডেল টেস্ট",
    "২৪/৭ ডাউট সলভিং সাপোর্ট",
    "বোর্ড প্রশ্নের সমাধান"
  ],
  instructor: {
    name: "ড. হাসান মাহমুদ",
    role: "সিনিয়র ফিজিক্স মেন্টর",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200&auto=format&fit=crop",
    bio: "ঢাকা বিশ্ববিদ্যালয় থেকে পদার্থবিজ্ঞানে স্নাতক ও স্নাতকোত্তর। ১০ বছরের বেশি সময় ধরে শিক্ষার্থীদের পড়াচ্ছেন এবং হাজারো শিক্ষার্থীর সাফল্যের কারিগর। তার পড়ানোর স্টাইল অত্যন্ত সাবলীল এবং শিক্ষার্থীবান্ধব।"
  },
  curriculum: [
    { title: "অধ্যায় ১: ভৌত রাশি ও পরিমাপ", lessons: 4, duration: "২ ঘন্টা" },
    { title: "অধ্যায় ২: গতি", lessons: 6, duration: "৩.৫ ঘন্টা" },
    { title: "অধ্যায় ৩: বল", lessons: 5, duration: "৩ ঘন্টা" },
    { title: "অধ্যায় ৪: কাজ, ক্ষমতা ও শক্তি", lessons: 7, duration: "৪ ঘন্টা" },
    { title: "অধ্যায় ৫: পদার্থের অবস্থা ও চাপ", lessons: 5, duration: "৩ ঘন্টা" },
  ],
  studentReviews: [
    { id: 1, name: "রাফসান আহমেদ", rating: 5, date: "১২ মার্চ, ২০২৬", comment: "হাসান স্যারের ক্লাসগুলো অসাধারণ। ফিজিক্সের কঠিন টপিকগুলো খুব সহজেই বুঝতে পেরেছি। লাইভ ক্লাসে প্রশ্ন করার সুযোগ থাকায় ডাউট ক্লিয়ার করা সহজ হয়।" },
    { id: 2, name: "সাদিয়া ইসলাম", rating: 5, date: "০৫ মার্চ, ২০২৬", comment: "কোর্সের ম্যাটেরিয়াল এবং লাইভ ক্লাসগুলো অনেক গোছানো। আমার প্রস্তুতি অনেক ভালো হচ্ছে। বিশেষ করে লেকচার শিটগুলো রিভিশনের জন্য দারুণ।" },
    { id: 3, name: "তানভীর রহমান", rating: 4, date: "২৮ ফেব্রুয়ারি, ২০২৬", comment: "সব মিলিয়ে দারুণ কোর্স। তবে আরও কিছু প্র্যাকটিস প্রবলেম দিলে ভালো হতো। মেন্টরদের সাপোর্ট সত্যিই প্রশংসনীয়।" },
  ],
  relatedCourses: [
    { id: 'math-9', title: 'নবম শ্রেণি - সাধারণ গণিত', image: 'https://images.unsplash.com/photo-1632516643720-e7f0d7e6a604?q=80&w=400&auto=format&fit=crop', price: '২,০০০', rating: 4.7, students: '৩,২০০+', duration: '৪ মাস' },
    { id: 'chemistry-ssc', title: 'এসএসসি - রসায়ন', image: 'https://images.unsplash.com/photo-1603126857599-f6e15782fa83?q=80&w=400&auto=format&fit=crop', price: '২,৫০০', rating: 4.9, students: '৪,১০০+', duration: '৩ মাস' },
    { id: 'biology-ssc', title: 'এসএসসি - জীববিজ্ঞান', image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=400&auto=format&fit=crop', price: '২,৫০০', rating: 4.8, students: '৩,৮০০+', duration: '৩ মাস' },
  ]
};

const tabs = [
  { id: 'overview', label: 'ওভারভিউ' },
  { id: 'curriculum', label: 'কারিকুলাম' },
  { id: 'instructor', label: 'ইন্সট্রাক্টর' },
  { id: 'reviews', label: 'রিভিউ' },
];

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const { user, userProfile, refreshProfile } = useAuth();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleEnrollClick = () => {
    if (!user) {
      navigate('/login', { state: { from: location } });
    } else {
      setIsEnrollDialogOpen(true);
    }
  };

  const confirmEnrollment = async () => {
    if (!user) return;
    setIsEnrolling(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        enrolledCourses: arrayUnion(courseData.id)
      });
      await refreshProfile();
      setIsEnrollDialogOpen(false);
      navigate('/my-courses');
    } catch (error) {
      console.error("Error enrolling in course:", error);
      alert("এনরোল করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors bg-slate-50 dark:bg-slate-950">
      <Navbar />
      
      {/* Define SVG Gradients for Icons (Reused from CourseSection) */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="grad-star" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <linearGradient id="grad-users" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          <linearGradient id="grad-clock" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
      </svg>

      <main className="flex-grow pt-24 pb-20">
        {/* Hero Section */}
        <div className="bg-slate-900 dark:bg-slate-900 text-white py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550592704-6c76defa9985?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/40"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-blue-300 text-sm font-semibold mb-6 border border-primary/30">
                  {courseData.badge}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-6 font-bengali leading-tight">
                  {courseData.title}
                </h1>
                <p className="text-slate-300 text-lg mb-8 font-bengali leading-relaxed max-w-xl">
                  {courseData.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-6 text-sm font-bengali text-slate-300">
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill={i < Math.floor(courseData.rating) ? "currentColor" : "none"} className={i >= Math.floor(courseData.rating) ? "text-slate-600" : ""} />
                      ))}
                    </div>
                    <span className="font-bold text-white">{courseData.rating}</span>
                    <span>({courseData.reviewsCount} রিভিউ)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-blue-400" />
                    <span>{courseData.students} শিক্ষার্থী</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-emerald-400" />
                    <span>{courseData.duration}</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative lg:ml-auto w-full max-w-md"
              >
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 relative group cursor-pointer">
                  <img src={courseData.image} alt={courseData.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <PlayCircle size={32} className="ml-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="flex overflow-x-auto hide-scrollbar border-b border-slate-200 dark:border-slate-800 mb-8 sticky top-[72px] bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md z-30 pt-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "px-6 py-4 text-base font-bold font-bengali whitespace-nowrap transition-colors relative",
                      activeTab === tab.id 
                        ? "text-primary dark:text-blue-400" 
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                    )}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div 
                        layoutId="activeTab" 
                        className="absolute bottom-0 left-0 right-0 h-1 bg-primary dark:bg-blue-400 rounded-t-full"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 font-bengali">কোর্সটি সম্পর্কে</h3>
                        <p className="text-slate-600 dark:text-slate-300 font-bengali leading-relaxed text-lg">
                          {courseData.description}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-bengali">এই কোর্সে যা যা থাকছে</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {courseData.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="mt-1 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                                <CheckCircle2 size={14} />
                              </div>
                              <span className="text-slate-700 dark:text-slate-300 font-bengali">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'curriculum' && (
                    <motion.div
                      key="curriculum"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-bengali">কোর্স কারিকুলাম</h3>
                      {courseData.curriculum.map((module, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-primary/30 dark:hover:border-primary/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-blue-400 font-bold">
                                {idx + 1}
                              </div>
                              <h4 className="font-bold text-slate-900 dark:text-white font-bengali text-lg">{module.title}</h4>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 font-bengali hidden sm:flex">
                              <span className="flex items-center gap-1"><FileText size={16} /> {module.lessons} লেসন</span>
                              <span className="flex items-center gap-1"><Clock size={16} /> {module.duration}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'instructor' && (
                    <motion.div
                      key="instructor"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-bengali">আপনার ইন্সট্রাক্টর</h3>
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col sm:flex-row gap-8 items-center sm:items-start">
                        <img src={courseData.instructor.image} alt={courseData.instructor.name} className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white dark:border-slate-800" referrerPolicy="no-referrer" />
                        <div className="text-center sm:text-left">
                          <h4 className="text-2xl font-bold text-slate-900 dark:text-white font-bengali mb-1">{courseData.instructor.name}</h4>
                          <p className="text-primary dark:text-blue-400 font-bengali font-medium mb-4">{courseData.instructor.role}</p>
                          <p className="text-slate-600 dark:text-slate-300 font-bengali leading-relaxed">
                            {courseData.instructor.bio}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'reviews' && (
                    <motion.div
                      key="reviews"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-bengali">শিক্ষার্থীদের মতামত</h3>
                        <div className="flex items-center gap-2">
                          <Star size={24} className="text-amber-400" fill="currentColor" />
                          <span className="text-2xl font-bold text-slate-900 dark:text-white">{courseData.rating}</span>
                        </div>
                      </div>
                      
                      <div className="grid gap-6">
                        {courseData.studentReviews.map((review) => (
                          <div key={review.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-lg">
                                  {review.name.charAt(0)}
                                </div>
                                <div>
                                  <h5 className="font-bold text-slate-900 dark:text-white font-bengali">{review.name}</h5>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bengali">{review.date}</p>
                                </div>
                              </div>
                              <div className="flex text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-slate-300 dark:text-slate-700" : ""} />
                                ))}
                              </div>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 font-bengali">
                              "{review.comment}"
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Sidebar / Pricing Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <SpotlightCard className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-200/80 dark:border-slate-800 p-8">
                  <div className="text-center mb-6">
                    <div className="text-slate-500 dark:text-slate-400 line-through text-lg font-bengali mb-1">৳ {courseData.originalPrice}</div>
                    <div className="text-4xl font-bold text-slate-900 dark:text-white font-bengali flex items-center justify-center gap-2">
                      ৳ {courseData.price}
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleEnrollClick}
                    className="w-full bg-gradient-navy hover:bg-gradient-navy-hover text-white py-4 rounded-2xl font-bengali font-bold text-lg mb-6 hover:shadow-xl hover:shadow-blue-900/30 hover:-translate-y-1 transition-all active:scale-95"
                  >
                    এনরোল করুন
                  </button>
                  
                  <div className="space-y-4 text-sm font-bengali text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-3">
                      <Video size={18} className="text-primary dark:text-blue-400" />
                      <span>১২০+ লাইভ ক্লাস</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-primary dark:text-blue-400" />
                      <span>অধ্যায়ভিত্তিক লেকচার শিট</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award size={18} className="text-primary dark:text-blue-400" />
                      <span>কোর্স শেষে সার্টিফিকেট</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={18} className="text-primary dark:text-blue-400" />
                      <span>লাইফটাইম এক্সেস</span>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            </div>
          </div>
        </div>

        {/* Related Courses Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-slate-800 mt-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 font-bengali">
            সম্পর্কিত কোর্সসমূহ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courseData.relatedCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <SpotlightCard className="course-card group bg-[#FAFAFA] dark:bg-slate-800 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-500 border border-slate-200/80 dark:border-slate-700 hover:border-primary/30 dark:hover:border-primary/50 flex flex-col h-full relative cursor-pointer" onClick={() => navigate(`/courses/${course.id}`)}>
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary dark:text-blue-400 shadow-sm">
                      {course.price}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-100/80 dark:group-hover:bg-amber-500/20 transition-all duration-500">
                        <Star size={16} className="group-hover:[stroke:url(#grad-star)] group-hover:[fill:url(#grad-star)] transition-all duration-500" fill="currentColor" />
                      </div>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300 transition-colors">{course.rating}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 font-bengali leading-snug group-hover:text-primary dark:group-hover:text-blue-400 transition-colors duration-300">
                      {course.title}
                    </h3>
                    
                    <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between text-slate-500 dark:text-slate-400 text-sm transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 transition-all duration-500">
                          <Users size={16} className="group-hover:[stroke:url(#grad-users)] transition-all duration-500" />
                        </div>
                        <span className="group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{course.students}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 transition-all duration-500">
                          <Clock size={16} className="group-hover:[stroke:url(#grad-clock)] transition-all duration-500" />
                        </div>
                        <span className="group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{course.duration}</span>
                      </div>
                    </div>
                    
                    <button className="mt-6 w-full bg-gradient-navy hover:bg-gradient-navy-hover text-white py-3 rounded-xl font-bengali font-bold hover:shadow-lg hover:shadow-blue-900/30 hover:-translate-y-0.5 transition-all duration-300 shadow-md">
                      বিস্তারিত দেখুন
                    </button>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />

      {/* Enrollment Confirmation Dialog */}
      <AnimatePresence>
        {isEnrollDialogOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
              onClick={() => setIsEnrollDialogOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl z-50 overflow-hidden border border-slate-200 dark:border-slate-800"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-bengali">
                    নিশ্চিত করুন
                  </h3>
                  <button
                    onClick={() => setIsEnrollDialogOpen(false)}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="mb-6">
                  <p className="text-slate-600 dark:text-slate-300 font-bengali mb-4">
                    আপনি কি <strong>{courseData.title}</strong> কোর্সটিতে এনরোল করতে চান?
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between text-sm font-bengali mb-2">
                      <span className="text-slate-500 dark:text-slate-400">কোর্স ফি:</span>
                      <span className="text-slate-900 dark:text-white font-bold">৳ {courseData.price}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bengali">
                      <span className="text-slate-500 dark:text-slate-400">সর্বমোট:</span>
                      <span className="text-primary font-bold">৳ {courseData.price}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsEnrollDialogOpen(false)}
                    className="flex-1 py-3 rounded-xl font-bengali font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    বাতিল
                  </button>
                  <button
                    onClick={confirmEnrollment}
                    disabled={isEnrolling}
                    className="flex-1 py-3 rounded-xl font-bengali font-bold text-white bg-gradient-navy hover:bg-gradient-navy-hover transition-colors shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isEnrolling && <Loader2 size={18} className="animate-spin" />}
                    নিশ্চিত করুন
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
