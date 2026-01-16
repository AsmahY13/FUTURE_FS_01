import React from 'react';
import { Send, Mail, AlertCircle} from 'lucide-react';
import { FormDataType } from '../../types';
import { validateForm } from '../../utils/validation';

interface ContactProps {
  formData: FormDataType;
  setFormData: (data: FormDataType) => void;
  formStatus: string;
  isSubmitting: boolean;
  handleSubmit: (formData: FormDataType) => Promise<void>;
  emailConfigStatus: 'checking' | 'configured' | 'not-configured';
}

const Contact: React.FC<ContactProps> = ({
  formData,
  setFormData,
  formStatus,
  isSubmitting,
  handleSubmit,
  emailConfigStatus
}) => {
  const [errors, setErrors] = React.useState<string[]>([]);

  const handleFormSubmit = async () => {
    // Validate form
    const validation = validateForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    // Clear previous errors
    setErrors([]);
    
    // Submit form
    await handleSubmit(formData);
  };

  const handleInputChange = (field: keyof FormDataType, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  return (
  <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative">
    <div className="max-w-3xl mx-auto relative z-10">
      <div className="flex items-center justify-center mb-8">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-600 dark:to-blue-500 mr-4" />
        <Send className="mr-3 text-blue-700 dark:text-blue-400" size={32} />
        <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-600 dark:to-blue-500 ml-4" />
      </div>
      
      <p className="text-center text-gray-800 dark:text-gray-300 mb-10 text-lg">
        Feel free to reach out by filling in the form below.
      </p>

      <div className="bg-white/80 dark:bg-slate-800/30 backdrop-blur-lg p-8 rounded-2xl border border-purple-200 dark:border-purple-500/20 transition-colors duration-300 shadow-lg">
        {/* Email Configuration Status */}
        {emailConfigStatus === 'not-configured' && (
          <div className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-500/20 border border-yellow-300 dark:border-yellow-500/50 rounded-lg flex items-start">
            <AlertCircle className="text-yellow-700 dark:text-yellow-400 mr-3 mt-0.5" size={20} />
            <div>
              <p className="text-yellow-800 dark:text-yellow-300 font-semibold">Email Notifications Disabled</p>
              <p className="text-yellow-700 dark:text-yellow-200 text-sm mt-1">
                Messages will be saved to Firebase but email notifications are not configured yet.
                You can still reach me directly at <span className="font-bold">asmahy13@gmail.com</span>
              </p>
            </div>
          </div>
        )}

        
        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-500/20 border border-red-300 dark:border-red-500/50 rounded-lg">
            <p className="text-red-800 dark:text-red-300 font-semibold mb-2">Please fix the following:</p>
            <ul className="list-disc list-inside space-y-1">
              {errors.map((error, index) => (
                <li key={index} className="text-red-700 dark:text-red-200 text-sm">{error}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="space-y-6">
          <div>
            <label className="block text-purple-800 dark:text-purple-300 mb-2 font-semibold flex items-center">
              <span>Your Name</span>
              <span className="text-red-600 ml-1">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-slate-900/50 border border-purple-300 dark:border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 transition-all duration-300"
              placeholder="John Doe"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-purple-800 dark:text-purple-300 mb-2 font-semibold flex items-center">
              <span>Email Address</span>
              <span className="text-red-600 ml-1">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-slate-900/50 border border-purple-300 dark:border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 transition-all duration-300"
              placeholder="john@example.com"
              disabled={isSubmitting}
            />
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
              Acceptable domains: Gmail, Outlook, Yahoo, iCloud, and professional/work emails
            </p>
          </div>
          
          <div>
            <label className="block text-purple-800 dark:text-purple-300 mb-2 font-semibold flex items-center">
              <span>Your Message</span>
              <span className="text-red-600 ml-1">*</span>
            </label>
            <textarea
              rows={6}
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-slate-900/50 border border-purple-300 dark:border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 transition-all resize-none duration-300"
              placeholder="Say hi or leave a message 🙂"
              disabled={isSubmitting}
            />
          </div>
          
          <button
            onClick={handleFormSubmit}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 font-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed duration-300"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Sending Message...
              </>
            ) : (
              <>
                <Send className="mr-2" size={18} />
                Send Message
              </>
            )}
          </button>
          
          {/* Status Messages */}
          {formStatus && (
            <div className={`text-center p-4 rounded-lg ${
              formStatus.includes('✨') || formStatus.includes('✅') 
                ? 'bg-green-100 dark:bg-green-500/20 border border-green-300 dark:border-green-500/50' 
                : formStatus.includes('❌') 
                ? 'bg-red-100 dark:bg-red-500/20 border border-red-300 dark:border-red-500/50' 
                : 'bg-yellow-100 dark:bg-yellow-500/20 border border-yellow-300 dark:border-yellow-500/50'
            }`}>
              <p className={`font-semibold flex items-center justify-center ${
                formStatus.includes('✨') || formStatus.includes('✅') 
                  ? 'text-green-800 dark:text-green-300' 
                  : formStatus.includes('❌') 
                  ? 'text-red-800 dark:text-red-300' 
                  : 'text-yellow-800 dark:text-yellow-300'
              }`}>
                {formStatus}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Alternative Contact Info */}
      <div className="mt-12 text-center">
        <p className="text-gray-800 dark:text-gray-300 mb-2">
          Prefer to email directly?
        </p>
        <a 
          href="mailto:asmahy13@gmail.com" 
          className="inline-flex items-center text-purple-700 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 text-lg font-semibold"
        >
          <Mail className="mr-2" size={20} />
          asmahy13@gmail.com
        </a>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
          I typically respond within 24 hours
        </p>
      </div>
    </div>
  </section>
);
};

export default Contact;