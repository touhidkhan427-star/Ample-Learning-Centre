import { Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AnnouncementBar() {
  return (
    <div className="bg-primary text-white py-2 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center text-xs font-bengali">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>01728810605</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>hello@amplelearning.com</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/faq" className="hover:text-secondary transition-colors">সচরাচর জিজ্ঞাসিত প্রশ্ন</Link>
            <Link to="/contact" className="hover:text-secondary transition-colors">সাপোর্ট</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
