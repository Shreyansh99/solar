import React, { useState, useEffect, useRef } from 'react';
import { X, TriangleAlert } from 'lucide-react';

// Define global interface for Meta Pixel
declare global {
  interface Window {
    fbq: any;
  }
}

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

export const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onClose, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    termsAccepted: true
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus management and scroll locking
  useEffect(() => {
    if (!isOpen) return;

    // Save current active element to restore later
    const previousActiveElement = document.activeElement as HTMLElement;

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Robust Focus Trap
      if (e.key === 'Tab' && modalRef.current) {
        // Select all potentially focusable elements
        const selector = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
        const nodeList = modalRef.current.querySelectorAll<HTMLElement>(selector);
        
        // Filter out elements that are not visible (offsetParent is null for hidden elements)
        const focusableElements = (Array.from(nodeList) as HTMLElement[]).filter(el => el.offsetParent !== null);
        
        if (focusableElements.length === 0) {
            e.preventDefault();
            return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement as HTMLElement;

        if (e.shiftKey) {
          // Shift + Tab: moving backwards
          if (activeElement === firstElement || !modalRef.current.contains(activeElement)) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab: moving forwards
          if (activeElement === lastElement || !modalRef.current.contains(activeElement)) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Initial focus handling
    const timer = setTimeout(() => {
      if (modalRef.current) {
        // UX Preference: Focus the first input field if available
        const firstInput = modalRef.current.querySelector('input:not([type="hidden"]):not([disabled])') as HTMLElement;
        if (firstInput && firstInput.offsetParent !== null) {
          firstInput.focus();
        } else {
          // Fallback: Focus the first focusable element (e.g., Close button)
          const firstFocusable = modalRef.current.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') as HTMLElement;
          if (firstFocusable && firstFocusable.offsetParent !== null) {
            firstFocusable.focus();
          } else {
            // Last resort: Focus the modal container itself
            modalRef.current.focus();
          }
        }
      }
    }, 50);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
      // Restore focus to element that triggered modal
      if (previousActiveElement && previousActiveElement.focus) {
          previousActiveElement.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10;
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    let newValue: string | boolean = type === 'checkbox' ? checked : value;

    if (name === 'phone') {
        newValue = formatPhoneNumber(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (min 10 digits)';
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
      
      // Track events for Meta Pixel
      if (typeof window !== 'undefined' && window.fbq) {
        // Standard Lead Event
        window.fbq('track', 'Lead');
        
        // Custom FormSubmit Event with user details
        window.fbq('trackCustom', 'FormSubmit', {
          fullName: formData.fullName,
          email: formData.email
        });
      }

      onSubmitSuccess();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F0F0F]/80 backdrop-blur-md p-4 animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-[480px] bg-white rounded-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 font-sans ring-1 ring-white/10 outline-none"
        tabIndex={-1}
      >
        
        {/* Clean Header */}
        <div className="w-full py-4 px-6 flex items-center justify-between border-b border-neutral-100 bg-white">
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-[#FF4F3B] animate-pulse" aria-hidden="true"></div>
               <span className="text-neutral-900 font-bold text-xs uppercase tracking-widest">Application Step 1 of 2</span>
             </div>
             
             <button 
                onClick={onClose}
                className="text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF4F3B]/20 rounded-sm"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 id="modal-title" className="text-3xl font-bold text-neutral-900 mb-2 tracking-tight">
              Check Eligibility
            </h2>
            <p id="modal-description" className="text-neutral-500 font-medium text-sm">
              See if your home qualifies for the Zero-Down Program.
            </p>
          </div>
          
          <div className="flex items-start gap-3 mb-8 bg-orange-50/50 p-4 rounded-sm border-l-2 border-[#FF4F3B]" role="note">
            <TriangleAlert className="w-5 h-5 text-[#FF4F3B] shrink-0" aria-hidden="true" />
            <p className="text-neutral-700 font-medium text-xs leading-relaxed">
               <span className="font-bold text-[#FF4F3B]">LIMITED SPOTS:</span> We are currently only accepting 4 new partners for this month due to high demand.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div className="space-y-1.5">
              <label htmlFor="fullName" className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Full Name</label>
              <input 
                id="fullName"
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Ex. John Doe"
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                className={`w-full p-4 border rounded-sm bg-neutral-50 text-neutral-900 placeholder-neutral-400 font-medium text-sm focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                  errors.fullName 
                    ? 'border-red-500 focus:ring-red-500/20' 
                    : 'border-neutral-200 focus:border-[#FF4F3B] focus:ring-[#FF4F3B]/10 hover:border-neutral-300'
                }`}
              />
              {errors.fullName && (
                <p id="fullName-error" className="text-red-600 text-[10px] font-bold uppercase tracking-wide ml-1 mt-1" role="alert">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Email Address</label>
              <input 
                id="email"
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ex. john@company.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full p-4 border rounded-sm bg-neutral-50 text-neutral-900 placeholder-neutral-400 font-medium text-sm focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                  errors.email 
                    ? 'border-red-500 focus:ring-red-500/20' 
                    : 'border-neutral-200 focus:border-[#FF4F3B] focus:ring-[#FF4F3B]/10 hover:border-neutral-300'
                }`}
              />
              {errors.email && (
                <p id="email-error" className="text-red-600 text-[10px] font-bold uppercase tracking-wide ml-1 mt-1" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="phone" className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Phone Number</label>
              <input 
                id="phone"
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ex. (555) 123-4567"
                maxLength={14}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={`w-full p-4 border rounded-sm bg-neutral-50 text-neutral-900 placeholder-neutral-400 font-medium text-sm focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                  errors.phone 
                    ? 'border-red-500 focus:ring-red-500/20' 
                    : 'border-neutral-200 focus:border-[#FF4F3B] focus:ring-[#FF4F3B]/10 hover:border-neutral-300'
                }`}
              />
              {errors.phone && (
                <p id="phone-error" className="text-red-600 text-[10px] font-bold uppercase tracking-wide ml-1 mt-1" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                className="w-full bg-[#FF4F3B] hover:bg-[#eb422f] text-white font-black text-sm py-4 px-6 rounded-sm shadow-xl shadow-orange-500/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all uppercase tracking-[0.15em] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF4F3B]"
              >
                Submit Application
              </button>
            </div>
            
            <div className="flex flex-col gap-1 mt-4 px-1">
              <div className="flex items-start gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300 group">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    aria-invalid={!!errors.termsAccepted}
                    aria-describedby={errors.termsAccepted ? "terms-error" : undefined}
                    className={`peer h-4 w-4 cursor-pointer appearance-none rounded-sm border border-neutral-300 transition-all checked:border-[#FF4F3B] checked:bg-[#FF4F3B] hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#FF4F3B]/50 ${
                       errors.termsAccepted ? 'border-red-500' : ''
                    }`}
                  />
                   <svg
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100"
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                
                <label htmlFor="terms" className={`text-[11px] leading-relaxed cursor-pointer select-none font-medium ${
                  errors.termsAccepted ? 'text-red-600' : 'text-neutral-500'
                }`}>
                  I agree to the Terms of Service. By providing my phone number, I verify that it is my mobile number and consent to receive calls/texts for business purposes.
                </label>
              </div>
              {errors.termsAccepted && (
                <p id="terms-error" className="text-red-600 text-[10px] font-bold uppercase tracking-wide ml-8 mt-1" role="alert">
                  {errors.termsAccepted}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};