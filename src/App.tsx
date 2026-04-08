/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Dashboard from './pages/Dashboard';
import PlaceholderPage from './pages/PlaceholderPage';
import FloatingActions from './components/FloatingActions';
import FAQ from './pages/FAQ';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Refund from './pages/Refund';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ample-learning-theme">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/combo" element={<PlaceholderPage title="কম্বো কোর্স" />} />
            <Route path="/my-courses" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/teachers" element={<PlaceholderPage title="শিক্ষকবৃন্দ" />} />
            <Route path="/categories/:id" element={<PlaceholderPage title="ক্যাটাগরি বিস্তারিত" />} />
            <Route path="/features/:id" element={<PlaceholderPage title="ফিচার বিস্তারিত" />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="/contact" element={<PlaceholderPage title="যোগাযোগ" />} />
          </Routes>
          <FloatingActions />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}



