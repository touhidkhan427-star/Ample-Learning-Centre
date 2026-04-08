import { motion } from 'motion/react';
import { BookOpen, Clock, PlayCircle, Award, CheckCircle2, Calendar, ChevronRight, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SpotlightCard from '../components/SpotlightCard';
import { useAuth } from '../contexts/AuthContext';

// Mock database of all courses to match with user's enrolled IDs
const allCoursesDb = {
  'ssc-2027': {
    id: 'ssc-2027',
    title: "এসএসসি ২০২৭ - পূর্ণাঙ্গ প্রস্তুতি (বিজ্ঞান)",
    progress: 0,
    totalLessons: 120,
    completedLessons: 0,
    nextClass: 'আগামীকাল, সন্ধ্যা ৭:০০ টা',
    image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=1200&auto=format&fit=crop",
  },
  'math-9': {
    id: 'math-9',
    title: 'নবম শ্রেণি - সাধারণ গণিত',
    progress: 45,
    totalLessons: 40,
    completedLessons: 18,
    nextClass: 'আজ, সন্ধ্যা ৬:০০ টা',
    image: 'https://images.unsplash.com/photo-1632516643720-e7f0d7e6a604?q=80&w=400&auto=format&fit=crop',
  },
  'physics-10': {
    id: 'physics-10',
    title: 'দশম শ্রেণি - পদার্থবিজ্ঞান',
    progress: 80,
    totalLessons: 35,
    completedLessons: 28,
    nextClass: 'আগামীকাল, বিকেল ৫:০০ টা',
    image: 'https://images.unsplash.com/photo-1603126857599-f6e15782fa83?q=80&w=400&auto=format&fit=crop',
  }
};

const upcomingClasses = [
  {
    id: 1,
    course: 'নবম শ্রেণি - সাধারণ গণিত',
    topic: 'অধ্যায় ৩: বীজগাণিতিক রাশি',
    time: 'আজ, সন্ধ্যা ৬:০০ টা',
    instructor: 'রাকিব হাসান',
  },
  {
    id: 2,
    course: 'দশম শ্রেণি - পদার্থবিজ্ঞান',
    topic: 'অধ্যায় ৪: কাজ, ক্ষমতা ও শক্তি',
    time: 'আগামীকাল, বিকেল ৫:০০ টা',
    instructor: 'সাদিয়া ইসলাম',
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { userProfile } = useAuth();

  // Get the user's enrolled courses from the mock DB based on their profile data
  const enrolledCourses = userProfile?.enrolledCourses
    ?.map(id => allCoursesDb[id as keyof typeof allCoursesDb])
    .filter(Boolean) || [];

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors bg-slate-50 dark:bg-slate-950">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Dashboard Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2 font-bengali">
              আমার ড্যাশবোর্ড
            </h1>
            <p className="text-slate-600 dark:text-slate-400 font-bengali">
              স্বাগতম {userProfile?.firstName}! আপনার শেখার অগ্রগতি এবং আসন্ন ক্লাসগুলো দেখে নিন।
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <SpotlightCard className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500">
                <BookOpen size={28} />
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-bengali mb-1">এনরোলকৃত কোর্স</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-bengali">{enrolledCourses.length}টি</h3>
              </div>
            </SpotlightCard>
            
            <SpotlightCard className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <CheckCircle2 size={28} />
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-bengali mb-1">সম্পন্ন ক্লাস</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-bengali">
                  {enrolledCourses.reduce((acc, course) => acc + course.completedLessons, 0)}টি
                </h3>
              </div>
            </SpotlightCard>
            
            <SpotlightCard className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Award size={28} />
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-bengali mb-1">অর্জিত সার্টিফিকেট</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-bengali">০টি</h3>
              </div>
            </SpotlightCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Enrolled Courses */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-bengali flex items-center gap-2">
                  <PlayCircle className="text-primary" />
                  আমার কোর্সসমূহ
                </h2>
                <button 
                  onClick={() => navigate('/courses')}
                  className="text-primary dark:text-blue-400 font-bold font-bengali text-sm hover:underline"
                >
                  আরও কোর্স দেখুন
                </button>
              </div>
              
              <div className="space-y-6">
                {enrolledCourses.length === 0 ? (
                  <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen size={32} className="text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-bengali mb-2">কোনো কোর্সে এনরোল করা নেই</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-bengali mb-6">আমাদের কোর্সগুলো ঘুরে দেখুন এবং আপনার পছন্দের কোর্সে এনরোল করুন।</p>
                    <button 
                      onClick={() => navigate('/courses')}
                      className="bg-primary text-white px-6 py-3 rounded-xl font-bold font-bengali hover:bg-primary/90 transition-colors"
                    >
                      কোর্স খুঁজুন
                    </button>
                  </div>
                ) : (
                  enrolledCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                    <SpotlightCard className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col sm:flex-row">
                      <div className="sm:w-1/3 relative h-48 sm:h-auto">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="p-6 sm:w-2/3 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-bengali">
                          {course.title}
                        </h3>
                        
                        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 font-bengali mb-4">
                          <span className="flex items-center gap-1">
                            <BookOpen size={16} className="text-primary" />
                            {course.completedLessons}/{course.totalLessons} লেসন
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={16} className="text-primary" />
                            পরবর্তী ক্লাস: {course.nextClass}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm font-bengali mb-1">
                            <span className="text-slate-600 dark:text-slate-400">অগ্রগতি</span>
                            <span className="font-bold text-primary">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5">
                            <div 
                              className="bg-primary h-2.5 rounded-full transition-all duration-1000" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <button 
                          onClick={() => navigate(`/courses/${course.id}`)}
                          className="mt-auto w-full sm:w-auto px-6 py-2.5 bg-gradient-navy hover:bg-gradient-navy-hover text-white rounded-xl font-bengali font-bold transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:shadow-blue-900/20"
                        >
                          ক্লাস শুরু করুন
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                )))}
              </div>
            </div>

            {/* Upcoming Classes Sidebar */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-bengali flex items-center gap-2">
                <Calendar className="text-primary" />
                আসন্ন ক্লাস
              </h2>
              
              <SpotlightCard className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                <div className="space-y-6">
                  {upcomingClasses.map((cls, index) => (
                    <motion.div 
                      key={cls.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-700 pb-6 last:pb-0 last:border-transparent"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-slate-900"></div>
                      
                      <div className="text-sm font-bold text-primary mb-1 font-bengali">{cls.time}</div>
                      <h4 className="font-bold text-slate-900 dark:text-white font-bengali mb-1">{cls.topic}</h4>
                      <div className="text-sm text-slate-500 dark:text-slate-400 font-bengali mb-2">{cls.course}</div>
                      
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 font-bengali">
                        <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                          <Users size={12} />
                        </div>
                        {cls.instructor}
                      </div>

                      <button className="mt-4 w-full py-2 bg-gradient-navy hover:bg-gradient-navy-hover rounded-lg text-sm font-bengali font-bold text-white transition-colors shadow-sm hover:shadow-md hover:shadow-blue-900/20">
                        জয়েন করুন
                      </button>
                    </motion.div>
                  ))}
                </div>
              </SpotlightCard>
            </div>

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
