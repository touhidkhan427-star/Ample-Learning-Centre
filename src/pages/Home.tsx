import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import CourseSection from '../components/CourseSection';
import Stats from '../components/Stats';
import WhyChooseUs from '../components/WhyChooseUs';
import PhysicsCalculator from '../components/PhysicsCalculator';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { class8Courses, sscCourses } from '../data';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Categories />
        <CourseSection 
          title="অষ্টম শ্রেণির কোর্সসমূহ" 
          courses={class8Courses} 
        />
        <WhyChooseUs />
        <Stats />
        <CourseSection 
          title="এসএসসি (SSC) কোর্সসমূহ" 
          courses={sscCourses} 
        />
        <PhysicsCalculator />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}
