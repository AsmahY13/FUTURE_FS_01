import React, { useState, useEffect } from 'react';
import { Database } from 'lucide-react';
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";

// Import components
import Background from './components/layout/Background';
import Navigation from './components/layout/Navigation';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';

// Import types
import { ProjectType, FormDataType, MousePositionType } from './types';
import { validateForm } from './utils/validation';
import { ThemeProvider } from './context/ThemeContext'; // ADD THIS IMPORT

// Email notification function using EmailJS
const sendEmailNotification = async (formData: FormDataType): Promise<boolean> => {
  try {
    // Dynamically import emailjs to reduce initial bundle size
    const emailjs = await import('@emailjs/browser');
    
    // Template parameters - these match the variables in your EmailJS template
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      timestamp: new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      }),
    };
    
    // Check if environment variables are set
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const userId = process.env.REACT_APP_EMAILJS_USER_ID;
    
    if (!serviceId || !templateId || !userId) {
      console.error('❌ EmailJS environment variables are missing!');
      console.log('Please set these in your .env.local file:');
      console.log('REACT_APP_EMAILJS_SERVICE_ID');
      console.log('REACT_APP_EMAILJS_TEMPLATE_ID');
      console.log('REACT_APP_EMAILJS_USER_ID');
      return false;
    }
    
    // Send email using EmailJS
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      userId
    );
    
    console.log('✅ Email sent successfully:', response);
    return true;
    
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    
    // Log detailed error information
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return false;
  }
};

function Portfolio() { // Changed from export default function Portfolio()
  // State declarations
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState<FormDataType>({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePosition, setMousePosition] = useState<MousePositionType>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState<{ [key: number]: boolean }>({});
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [emailConfigStatus, setEmailConfigStatus] = useState<'checking' | 'configured' | 'not-configured'>('checking');

  // Check email configuration on component mount
  useEffect(() => {
    const checkEmailConfig = () => {
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
      const userId = process.env.REACT_APP_EMAILJS_USER_ID;
      
      if (serviceId && templateId && userId) {
        setEmailConfigStatus('configured');
      } else {
        setEmailConfigStatus('not-configured');
      }
    };
    
    checkEmailConfig();
  }, []);

  // Load projects and handle scroll
  useEffect(() => {
    loadProjectsFromDatabase();
    
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);

      const cards = document.querySelectorAll('.animate-on-scroll');
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setIsVisible(prev => ({ ...prev, [index]: true }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Database function to load projects
  const loadProjectsFromDatabase = async () => {
    setIsLoading(true);
    try {
      console.log("Loading projects from Firebase...");
      const projectsRef = collection(db, "projects");
      const snapshot = await getDocs(projectsRef);
      
      const loadedProjects = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : new Date().toISOString()
        };
      }) as ProjectType[];
      
      console.log("Projects loaded:", loadedProjects.length);
      setProjects(loadedProjects);
    } catch (error) {
      console.error("Error loading projects from Firebase:", error);
      
      // Fallback projects
      const defaultProjects: ProjectType[] = [
        {
          id: '1',
          title: 'My Portfolio Website',
          description: 'A responsive personal portfolio built with React, Tailwind CSS, and Firebase for hosting and contact form functionality.',
          tech: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase'],
          github: '#',
          live: '#',
          gradient: 'from-purple-500 to-pink-500',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Task Management App',
          description: 'Real-time task management system with drag-and-drop functionality and team collaboration features.',
          tech: ['React', 'Firebase', 'Tailwind CSS'],
          github: '#',
          live: '#',
          gradient: 'from-blue-500 to-cyan-500',
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Weather Dashboard',
          description: 'Interactive weather application with location-based forecasts and historical data visualization.',
          tech: ['JavaScript', 'API Integration', 'Chart.js'],
          github: '#',
          live: '#',
          gradient: 'from-orange-500 to-yellow-500',
          createdAt: new Date().toISOString()
        }
      ];
      setProjects(defaultProjects);
    } finally {
      setIsLoading(false);
    }
  };

  // Save message to Firebase
  const saveMessageToDatabase = async (messageData: { name: string; email: string; message: string }) => {
    try {
      console.log("Saving message to Firebase...", messageData);
      
      const messagesRef = collection(db, "messages");
      const docRef = await addDoc(messagesRef, {
        ...messageData,
        timestamp: Timestamp.now(),
        status: 'unread',
        read: false,
        ip_address: 'N/A', // In production, you might want to capture this via a backend function
        user_agent: navigator.userAgent
      });
      
      console.log("✅ Message saved to Firebase with ID:", docRef.id);
      
      // Update local state
      const newMessage = {
        id: docRef.id,
        ...messageData,
        timestamp: new Date().toISOString(),
        status: 'unread'
      };
      setMessages(prev => [...prev, newMessage]);
      
      return docRef;
    } catch (error) {
      console.error("❌ Error saving message to Firebase:", error);
      throw error;
    }
  };

  // Scroll to section helper
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (formData: FormDataType) => {
    setIsSubmitting(true);
    setFormStatus('');
    
    try {
      // Validate the form
      const validation = validateForm(formData);
      if (!validation.isValid) {
        setFormStatus(`❌ ${validation.errors[0]}`);
        setIsSubmitting(false);
        return;
      }

      // 1. Save to Firebase Database
      await saveMessageToDatabase({
        name: formData.name,
        email: formData.email,
        message: formData.message
      });
      
      // 2. Send email notification to asmahy13@gmail.com
      let emailSent = false;
      
      if (emailConfigStatus === 'configured') {
        console.log('📧 Attempting to send email notification...');
        emailSent = await sendEmailNotification(formData);
      } else {
        console.warn('⚠️ EmailJS not configured, skipping email notification');
      }
      
      // 3. Set appropriate success message
      if (emailSent) {
        setFormStatus('✨ Message sent successfully! Thank you for reaching out.');
      } else if (emailConfigStatus === 'configured') {
        setFormStatus('✅ Message saved! (Email notification failed, but I\'ll check the database)');
      } else {
        setFormStatus('✅ Message saved to database! Email notifications will be configured soon.');
      }
      
      // 4. Clear the form
      setFormData({ name: '', email: '', message: '' });
      
      // 5. Auto-clear success message after 10 seconds
      setTimeout(() => setFormStatus(''), 10000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('❌ Sorry, something went wrong. Please email me directly at asmahy13@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Database Status Indicator */}
      <div className="fixed bottom-4 right-4 z-50 bg-slate-800/90 dark:bg-white/90 backdrop-blur-lg border border-green-500/30 dark:border-green-500/50 rounded-lg px-4 py-2 flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-xs text-green-400 dark:text-green-600 flex items-center">
          <Database size={14} className="mr-1" />
          Firebase Connected
        </span>
      </div>

      {/* Email Config Status Indicator */}
      {emailConfigStatus === 'not-configured' && (
        <div className="fixed bottom-20 right-4 z-50 bg-yellow-500/90 dark:bg-yellow-400/90 backdrop-blur-lg border border-yellow-700 dark:border-yellow-600 rounded-lg px-4 py-2 max-w-xs">
          <span className="text-xs text-yellow-100 dark:text-yellow-900">
            ⚠️ EmailJS not configured. Messages will save but no email will be sent.
          </span>
        </div>
      )}

      <Background mousePosition={mousePosition} />
      
      <Navigation 
        isMenuOpen={isMenuOpen}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        setIsMenuOpen={setIsMenuOpen}
      />
      
      <Hero scrollToSection={scrollToSection} />
      <About />
      <Projects 
        projects={projects} 
        isLoading={isLoading} 
        isVisible={isVisible} 
      />
      <Contact 
        formData={formData}
        setFormData={setFormData}
        formStatus={formStatus}
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
        emailConfigStatus={emailConfigStatus}
      />
      
      <Footer />
    </div>
  );
}

// Wrap the Portfolio component with ThemeProvider
function App() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  );
}

export default App;