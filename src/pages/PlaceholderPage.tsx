import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors">
      <Navbar />
      <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-4 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 font-bengali transition-colors">{title}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-bengali transition-colors">এই পেজটির কাজ চলছে। খুব শীঘ্রই আপডেট করা হবে।</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
