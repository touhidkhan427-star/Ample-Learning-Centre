import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const loginSchema = z.object({
  email: z.string().email({ message: 'সঠিক ইমেইল দিন' }),
  password: z.string().min(6, { message: 'পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে' }),
});

const signupSchema = z.object({
  firstName: z.string().min(2, { message: 'নামের প্রথম অংশ দিন' }),
  lastName: z.string().min(2, { message: 'নামের শেষ অংশ দিন' }),
  email: z.string().email({ message: 'সঠিক ইমেইল দিন' }),
  phone: z.string().min(11, { message: 'সঠিক ফোন নম্বর দিন' }),
  password: z.string().min(6, { message: 'পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে' }),
  confirmPassword: z.string(),
  gender: z.string().min(1, { message: 'লিঙ্গ নির্বাচন করুন' }),
  currentClass: z.string().min(1, { message: 'শ্রেণি নির্বাচন করুন' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "পাসওয়ার্ড মিলছে না",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshProfile } = useAuth();

  const from = location.state?.from?.pathname || '/my-courses';

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      await refreshProfile();
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error(err);
      setError('ইমেইল বা পাসওয়ার্ড ভুল হয়েছে।');
    } finally {
      setIsLoading(false);
    }
  };

  const onSignupSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        currentClass: data.currentClass,
        enrolledCourses: [],
        createdAt: new Date().toISOString(),
      });

      await refreshProfile();
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('এই ইমেইলটি ইতিমধ্যে ব্যবহৃত হচ্ছে।');
      } else {
        setError('অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-grow flex items-center justify-center pt-28 pb-12 px-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 transition-colors">
          
          {/* Toggle */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-8">
            <button
              onClick={() => { setIsLogin(true); setError(null); }}
              className={cn(
                "flex-1 py-2.5 text-sm font-bold rounded-lg transition-all font-bengali",
                isLogin ? "bg-white dark:bg-slate-700 text-primary dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              )}
            >
              লগ-ইন
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(null); }}
              className={cn(
                "flex-1 py-2.5 text-sm font-bold rounded-lg transition-all font-bengali",
                !isLogin ? "bg-white dark:bg-slate-700 text-primary dark:text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              )}
            >
              রেজিস্ট্রেশন
            </button>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center font-bengali transition-colors">
            {isLogin ? 'অ্যাকাউন্টে প্রবেশ করুন' : 'নতুন অ্যাকাউন্ট তৈরি করুন'}
          </h2>

          {error && (
            <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm font-bengali text-center">
              {error}
            </div>
          )}

          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form 
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                onSubmit={loginForm.handleSubmit(onLoginSubmit)} 
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 font-bengali">ইমেইল</label>
                  <input 
                    {...loginForm.register('email')}
                    type="email" 
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors" 
                    placeholder="আপনার ইমেইল দিন" 
                  />
                  {loginForm.formState.errors.email && <p className="text-red-500 text-xs mt-1 font-bengali">{loginForm.formState.errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 font-bengali">পাসওয়ার্ড</label>
                  <input 
                    {...loginForm.register('password')}
                    type="password" 
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors" 
                    placeholder="পাসওয়ার্ড দিন" 
                  />
                  {loginForm.formState.errors.password && <p className="text-red-500 text-xs mt-1 font-bengali">{loginForm.formState.errors.password.message}</p>}
                </div>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors font-bengali flex items-center justify-center gap-2 disabled:opacity-70 mt-6"
                >
                  {isLoading && <Loader2 size={18} className="animate-spin" />}
                  লগ-ইন করুন
                </button>
              </motion.form>
            ) : (
              <motion.form 
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                onSubmit={signupForm.handleSubmit(onSignupSubmit)} 
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 font-bengali">নামের প্রথম অংশ</label>
                    <input 
                      {...signupForm.register('firstName')}
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors" 
                    />
                    {signupForm.formState.errors.firstName && <p className="text-red-500 text-xs mt-1 font-bengali">{signupForm.formState.errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 font-bengali">নামের শেষ অংশ</label>
                    <input 
                      {...signupForm.register('lastName')}
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors" 
                    />
                    {signupForm.formState.errors.lastName && <p className="text-red-500 text-xs mt-1 font-bengali">{signupForm.formState.errors.lastName.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 font-bengali">ইমেইল</label>
                  <input 
                    {...signupForm.register('email')}
                    type="email" 
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors" 
                  />
                  {signupForm.formState.errors.email && <p className="text-red-500 text-xs mt-1 font-bengali">{signupForm.formState.errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 font-bengali">ফোন নম্বর</label>
                  <input 
                    {...signupForm.register('phone')}
                    type="tel" 
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors" 
                  />
                  {signupForm.formState.errors.phone && <p className="text-red-500 text-xs mt-1 font-bengali">{signupForm.formState.errors.phone.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 font-bengali">লিঙ্গ</label>
                    <select 
                      {...signupForm.register('gender')}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors font-bengali"
                    >
                      <option value="">নির্বাচন করুন</option>
                      <option value="male">পুরুষ</option>
                      <option value="female">নারী</option>
                      <option value="other">অন্যান্য</option>
                    </select>
                    {signupForm.formState.errors.gender && <p className="text-red-500 text-xs mt-1 font-bengali">{signupForm.formState.errors.gender.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 font-bengali">বর্তমান শ্রেণি</label>
                    <select 
                      {...signupForm.register('currentClass')}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors font-bengali"
                    >
                      <option value="">নির্বাচন করুন</option>
                      <option value="class-6">ষষ্ঠ শ্রেণি</option>
                      <option value="class-7">সপ্তম শ্রেণি</option>
                      <option value="class-8">অষ্টম শ্রেণি</option>
                      <option value="class-9">নবম শ্রেণি</option>
                      <option value="class-10">দশম শ্রেণি</option>
                      <option value="ssc">SSC পরীক্ষার্থী</option>
                    </select>
                    {signupForm.formState.errors.currentClass && <p className="text-red-500 text-xs mt-1 font-bengali">{signupForm.formState.errors.currentClass.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 font-bengali">পাসওয়ার্ড</label>
                  <input 
                    {...signupForm.register('password')}
                    type="password" 
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors" 
                  />
                  {signupForm.formState.errors.password && <p className="text-red-500 text-xs mt-1 font-bengali">{signupForm.formState.errors.password.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 font-bengali">পাসওয়ার্ড নিশ্চিত করুন</label>
                  <input 
                    {...signupForm.register('confirmPassword')}
                    type="password" 
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors" 
                  />
                  {signupForm.formState.errors.confirmPassword && <p className="text-red-500 text-xs mt-1 font-bengali">{signupForm.formState.errors.confirmPassword.message}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors font-bengali flex items-center justify-center gap-2 disabled:opacity-70 mt-6"
                >
                  {isLoading && <Loader2 size={18} className="animate-spin" />}
                  অ্যাকাউন্ট তৈরি করুন
                </button>
              </motion.form>
            )}
          </AnimatePresence>

        </div>
      </main>
      <Footer />
    </div>
  );
}
