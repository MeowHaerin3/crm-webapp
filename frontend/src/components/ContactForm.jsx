import React, { useState } from 'react';
import { MdPerson, MdEmail, MdPhone, MdBusiness, MdSave, MdAdd, MdClose, MdError } from 'react-icons/md';

const AddContactForm = ({ onSubmit, initialData = null, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    company: initialData?.company || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Name is required';
        } else if (value.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        } else {
          delete newErrors.name;
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!emailRegex.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
      case 'phone':
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
        if (!value.trim()) {
          newErrors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(value.replace(/\s/g, ''))) {
          newErrors.phone = 'Please enter a valid phone number';
        } else {
          delete newErrors.phone;
        }
        break;
      case 'company':
        if (!value.trim()) {
          newErrors.company = 'Company is required';
        } else {
          delete newErrors.company;
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  const handleSubmit = async () => {
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate all fields
    let isValid = true;
    Object.keys(formData).forEach(key => {
      if (!validateField(key, formData[key])) {
        isValid = false;
      }
    });

    if (!isValid) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      // Clear form if it's not in edit mode
      if (!initialData) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: ''
        });
        setTouched({});
        setErrors({});
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = Object.keys(errors).length === 0 && 
    Object.values(formData).every(value => value.trim());

  return (
    <div className="w-full max-w-lg mx-auto">
        
      {/* Form Fields */}
      <div className="space-y-6">
        {/* Name Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold flex items-center gap-2">
              <MdPerson className="text-lg text-primary" />
              Full Name
            </span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter full name"
              className={`input input-bordered w-full transition-all duration-200 ${
                errors.name && touched.name 
                  ? 'input-error focus:border-error' 
                  : 'focus:border-primary focus:ring-2 focus:ring-primary/20'
              }`}
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
            />
            {errors.name && touched.name && (
              <label className="label">
                <span className="label-text-alt text-error flex items-center gap-1">
                  <MdError className="text-sm" />
                  {errors.name}
                </span>
              </label>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold flex items-center gap-2">
              <MdEmail className="text-lg text-primary" />
              Email Address
            </span>
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter email address"
              className={`input input-bordered w-full transition-all duration-200 ${
                errors.email && touched.email 
                  ? 'input-error focus:border-error' 
                  : 'focus:border-primary focus:ring-2 focus:ring-primary/20'
              }`}
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
            />
            {errors.email && touched.email && (
              <label className="label">
                <span className="label-text-alt text-error flex items-center gap-1">
                  <MdError className="text-sm" />
                  {errors.email}
                </span>
              </label>
            )}
          </div>
        </div>

        {/* Phone Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold flex items-center gap-2">
              <MdPhone className="text-lg text-primary" />
              Phone Number
            </span>
          </label>
          <div className="relative">
            <input
              type="tel"
              placeholder="Enter phone number"
              className={`input input-bordered w-full transition-all duration-200 ${
                errors.phone && touched.phone 
                  ? 'input-error focus:border-error' 
                  : 'focus:border-primary focus:ring-2 focus:ring-primary/20'
              }`}
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
            />
            {errors.phone && touched.phone && (
              <label className="label">
                <span className="label-text-alt text-error flex items-center gap-1">
                  <MdError className="text-sm" />
                  {errors.phone}
                </span>
              </label>
            )}
          </div>
        </div>

        {/* Company Field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold flex items-center gap-2">
              <MdBusiness className="text-lg text-primary" />
              Company
            </span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter company name"
              className={`input input-bordered w-full transition-all duration-200 ${
                errors.company && touched.company 
                  ? 'input-error focus:border-error' 
                  : 'focus:border-primary focus:ring-2 focus:ring-primary/20'
              }`}
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              onBlur={() => handleBlur('company')}
            />
            {errors.company && touched.company && (
              <label className="label">
                <span className="label-text-alt text-error flex items-center gap-1">
                  <MdError className="text-sm" />
                  {errors.company}
                </span>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Form Progress Indicator */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-base-content/60 mb-2">
          <span>Form completion</span>
          <span>{Math.round((Object.values(formData).filter(v => v.trim()).length / 4) * 100)}%</span>
        </div>
        <progress 
          className="progress progress-primary w-full" 
          value={Object.values(formData).filter(v => v.trim()).length} 
          max="4"
        ></progress>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <button
          onClick={onCancel}
          className="btn btn-ghost flex-1 order-2 sm:order-1"
          disabled={isSubmitting}
        >
          <MdClose className="text-lg" />
          Cancel
        </button>
        
        <button
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
          className={`btn btn-primary flex-1 order-1 sm:order-2 ${
            isSubmitting ? 'loading' : ''
          }`}
        >
          {!isSubmitting && (
            initialData ? (
              <MdSave className="text-lg" />
            ) : (
              <MdAdd className="text-lg" />
            )
          )}
          {isSubmitting
            ? (initialData ? 'Updating...' : 'Adding...')
            : (initialData ? 'Update Contact' : 'Add Contact')
          }
        </button>
      </div>

      {/* Form Tips */}
      <div className="mt-6 p-4 bg-base-200/50 rounded-lg">
        <h4 className="font-semibold text-base-content mb-2">Tips:</h4>
        <ul className="text-sm text-base-content/70 space-y-1">
          <li>• Use a professional email address for business contacts</li>
          <li>• Include country code for international phone numbers</li>
          <li>• Company name helps organize your contacts better</li>
        </ul>
      </div>
    </div>
  );
};

export default AddContactForm;