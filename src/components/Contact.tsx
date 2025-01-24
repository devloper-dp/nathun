import { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, Calendar, User, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  preferredTime: string;
  projectType: string;
}

interface FormErrors {
  [key: string]: string;
}

interface FormStatus {
  type: 'success' | 'error' | null;
  message: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  preferredTime: '',
  projectType: ''
};

const projectTypes = [
  'Residential Solar',
  'Commercial Solar',
  'Industrial Solar',
  'Solar Water Heater',
  'Solar Maintenance',
  'Other'
];

const preferredTimes = [
  'Morning (9 AM - 12 PM)',
  'Afternoon (12 PM - 3 PM)',
  'Evening (3 PM - 6 PM)'
];

const contactDetails = {
  phoneNumbers: ['+91 7566777699', '+91 8962359234'],
  email: 'solar@nathuncorp.com',
  website: 'www.nathunenergies.com',
  address: 'Shop No. 3 - Azad Nagar Barkheda, Pathani Bhopal (M.P.)'
};

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSc_tJiyUrYFuiPQmYuEFupfCIa0bvXz_G6elndr-C0kp2sCPQ/formResponse';
const FORM_FIELD_IDS = {
  name: 'entry.457822261',
  email: 'entry.2031038981',
  phone: 'entry.745507949',
  message: 'entry.1153847906',
  subject: 'entry.126430445',
  preferredTime: 'entry.1850778776',
  projectType: 'entry.747778502'
};

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    if (!validateForm()) {
      setStatus({
        type: 'error',
        message: 'Please fix the errors in the form'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const googleFormData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        googleFormData.append(FORM_FIELD_IDS[key as keyof typeof FORM_FIELD_IDS], value);
      });

      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: googleFormData
      });

      setStatus({
        type: 'success',
        message: 'Thank you for your message. We will get back to you soon!'
      });
      setFormData(initialFormData);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-yellow-500 font-semibold tracking-wider uppercase">Get In Touch</span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Contact Us Today
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to start your solar journey? We're here to help!
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className={`pl-10 w-full rounded-lg border ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      } shadow-sm focus:border-yellow-500 focus:ring-yellow-500`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`pl-10 w-full rounded-lg border ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        } shadow-sm focus:border-yellow-500 focus:ring-yellow-500`}
                        placeholder="john@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`pl-10 w-full rounded-lg border ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        } shadow-sm focus:border-yellow-500 focus:ring-yellow-500`}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  >
                    <option value="">Select Project Type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Contact Time
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-lg border border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                    >
                      <option value="">Select Preferred Time</option>
                      {preferredTimes.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="Brief subject of your inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message *
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className={`pl-10 w-full rounded-lg border ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      } shadow-sm focus:border-yellow-500 focus:ring-yellow-500`}
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {status.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-4 rounded-lg flex items-center ${
                      status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                    }`}
                  >
                    {status.type === 'success' ? (
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                    ) : (
                      <AlertCircle className="h-5 w-5 mr-2" />
                    )}
                    {status.message}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 
                  text-white py-3 px-6 rounded-lg font-semibold space-x-2 hover:shadow-lg 
                  transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start space-x-4"
                  whileHover={{ x: 5 }}
                >
                  <MapPin className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-600">{contactDetails.address}</span>
                </motion.div>
                
                {contactDetails.phoneNumbers.map((phone, index) => (
                  <motion.a
                    key={index}
                    href={`tel:${phone}`}
                    className="flex items-center space-x-4 text-gray-600 hover:text-yellow-500 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <Phone className="h-6 w-6 text-yellow-500" />
                    <span>{phone}</span>
                  </motion.a>
                ))}
                
                <motion.a
                  href={`mailto:${contactDetails.email}`}
                  className="flex items-center space-x-4 text-gray-600 hover:text-yellow-500 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <Mail className="h-6 w-6 text-yellow-500" />
                  <span>{contactDetails.email}</span>
                </motion.a>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Business Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-4">Quick Response Promise</h3>
              <p>
                We aim to respond to all inquiries within 24 hours. For immediate assistance,
                please call our support line.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}