import React, { useState } from 'react';
import { Alert } from '@/components/ui/alert';

const LetterForm = ({ onLetterGenerated }) => {
  const [formData, setFormData] = useState({
    yourName: '',
    address: '',
    city: '',
    county: '',
    postcode: '',
    email: '',
    phone: '',
    recipientName: '',
    recipientAddress: '',
    recipientEmail: '',
    recipientCc: '',
    protocols: [],
    protocolsDetails: '',
    claimType: [],
    factualBackground: '',
    legalBreaches: '',
    lossesSuffered: '',
    remediesSought: '',
    responseDeadline: '',
    adr: '',
    enclosures: '',
    consent: false
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const protocolOptions = [
    { id: 1, name: 'Pre-Action Protocol for the Conduct of All Civil Litigation' },
    { id: 2, name: 'Pre-Action Protocol: Personal Injury' },
    { id: 3, name: 'Pre-Action Protocol: Professional Negligence' },
    { id: 4, name: 'Pre-Action Protocol: Construction and Engineering Disputes' },
    { id: 5, name: 'Pre-Action Protocol: Housing Disrepair' },
    { id: 6, name: 'Pre-Action Protocol: Debt Claims' },
    { id: 7, name: 'Pre-Action Protocol: Defamation' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.yourName) newErrors.yourName = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/generate-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      onLetterGenerated(data.data.letter);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Letter Before Action Generator</h2>

      {/* Personal Details Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              name="yourName"
              value={formData.yourName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-legal-blue focus:ring-legal-blue"
              required
            />
            {errors.yourName && (
              <Alert variant="destructive">{errors.yourName}</Alert>
            )}
          </div>
          {/* Add other form fields here */}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-legal-blue text-white py-2 px-4 rounded-md hover:bg-opacity-90 disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Letter'}
      </button>
    </form>
  );
};

export default LetterForm;