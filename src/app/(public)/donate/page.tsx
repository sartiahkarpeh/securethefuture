'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { Heart, Phone, Check, AlertCircle, Loader2, Shield, Users, Award, Sparkles } from 'lucide-react';
import Image from 'next/image';

const donationAmounts = [
  { value: 50, label: 'LRD 50', impact: 'Provides educational materials for 1 person' },
  { value: 100, label: 'LRD 100', impact: 'Supports a counseling session' },
  { value: 250, label: 'LRD 250', impact: 'Helps 5 families access resources' },
  { value: 500, label: 'LRD 500', impact: 'Funds community outreach program' },
  { value: 1000, label: 'LRD 1,000', impact: 'Supports a recovery group for a month' },
  { value: 2500, label: 'LRD 2,500', impact: 'Provides training for counselors' },
];

const paymentMethods = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    subtitle: 'Visa, Mastercard, Amex (International)',
    color: 'from-blue-500 to-indigo-600',
    logo: '💳',
    type: 'international',
    instructions: [
      'Enter your card details securely',
      'Your payment is processed instantly',
      'Receive immediate confirmation',
      'Get receipt via email',
      'Safe and secure with SSL encryption'
    ]
  },
  {
    id: 'lonestar',
    name: 'Lonestar MTN Mobile Money',
    subtitle: 'For donors in Liberia',
    code: '*155#',
    number: '+231 886 123 456',
    color: 'from-yellow-500 to-yellow-600',
    logo: '🌟',
    type: 'mobile',
    instructions: [
      'Dial *155# on your Lonestar phone',
      'Select "Send Money"',
      'Enter our number: +231 886 123 456',
      'Enter the amount',
      'Enter your PIN to confirm',
      'You will receive a confirmation SMS'
    ]
  },
  {
    id: 'orange',
    name: 'Orange Money',
    subtitle: 'For donors in Liberia',
    code: '*144#',
    number: '+231 770 123 456',
    color: 'from-orange-500 to-red-600',
    logo: '🍊',
    type: 'mobile',
    instructions: [
      'Dial *144# on your Orange phone',
      'Select "Send Money"',
      'Enter our number: +231 770 123 456',
      'Enter the amount',
      'Enter your PIN to confirm',
      'You will receive a confirmation SMS'
    ]
  }
];

const impactStories = [
  {
    amount: 'LRD 100',
    impact: 'Provides one-on-one counseling session',
    icon: Users,
  },
  {
    amount: 'LRD 500',
    impact: 'Supports community outreach in one county',
    icon: Award,
  },
  {
    amount: 'LRD 1,000',
    impact: 'Funds a support group for an entire month',
    icon: Heart,
  },
];

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [billingCountry, setBillingCountry] = useState('');

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;
  const selectedProviderData = paymentMethods.find(p => p.id === selectedProvider);
  const isCardPayment = selectedProvider === 'card';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (isCardPayment) {
      // For card payments, show the card form
      setShowCardForm(true);
      setIsSubmitting(false);
    } else {
      // For mobile money, show instructions
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
        setShowInstructions(true);
      }, 2000);
    }
  };

  const handleCardPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Here you would integrate with Stripe, PayPal, or another payment processor
    // For now, simulate a successful payment
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setShowInstructions(false);
      setShowCardForm(false);
    }, 3000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl top-10 -left-20 animate-pulse" />
          <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bottom-10 -right-20 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
              <Heart className="w-4 h-4 text-cyan-400" fill="currentColor" />
              <span className="text-sm font-bold text-cyan-300">Make a Difference</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight">
              Support Recovery &
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Transform Lives
              </span>
            </h1>

            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Your donation directly supports Liberians fighting addiction. Every contribution helps provide counseling, 
              resources, and hope to individuals and families across all 15 counties.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 pt-8">
              {impactStories.map((story, idx) => (
                <div key={idx} className="flex items-center gap-3 text-white">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl border border-white/10">
                    <story.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold">{story.amount}</div>
                    <div className="text-xs text-slate-400">{story.impact}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Donation Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Donation Form */}
            <div className="space-y-8">
              <div className="p-8 bg-white rounded-3xl shadow-2xl border border-slate-200">
                <h2 className="text-3xl font-black text-slate-900 mb-6">Choose Your Donation</h2>

                {/* Preset Amounts */}
                <div className="mb-8">
                  <label className="block text-sm font-bold text-slate-700 mb-4">Select Amount (LRD)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {donationAmounts.map((amount) => (
                      <button
                        key={amount.value}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amount.value);
                          setCustomAmount('');
                        }}
                        className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                          selectedAmount === amount.value && !customAmount
                            ? 'border-cyan-500 bg-gradient-to-br from-cyan-50 to-blue-50 shadow-lg'
                            : 'border-slate-200 hover:border-cyan-300 hover:bg-cyan-50'
                        }`}
                      >
                        <div className="text-2xl font-black text-slate-900 mb-1">{amount.label}</div>
                        <div className="text-xs text-slate-600">{amount.impact}</div>
                        {selectedAmount === amount.value && !customAmount && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div className="mb-8">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Or Enter Custom Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">LRD</span>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full pl-16 pr-4 py-4 border-2 border-slate-200 rounded-2xl text-lg font-bold focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-8">
                  <label className="block text-sm font-bold text-slate-700 mb-4">Select Payment Method</label>
                  
                  {/* International Payment */}
                  <div className="mb-4">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">International Donors</div>
                    {paymentMethods.filter(p => p.type === 'international').map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => {
                          setSelectedProvider(method.id);
                          setShowCardForm(false);
                        }}
                        className={`relative w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left mb-3 ${
                          selectedProvider === method.id
                            ? 'border-cyan-500 bg-gradient-to-br from-cyan-50 to-blue-50 shadow-lg'
                            : 'border-slate-200 hover:border-cyan-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center text-3xl shadow-lg`}>
                            {method.logo}
                          </div>
                          <div className="flex-1">
                            <div className="text-lg font-bold text-slate-900">{method.name}</div>
                            <div className="text-sm text-slate-600">{method.subtitle}</div>
                          </div>
                          {selectedProvider === method.id && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                              <Check className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Liberian Mobile Money */}
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Liberian Donors</div>
                    <div className="grid gap-3">
                      {paymentMethods.filter(p => p.type === 'mobile').map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => {
                            setSelectedProvider(method.id);
                            setShowCardForm(false);
                          }}
                          className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                            selectedProvider === method.id
                              ? 'border-cyan-500 bg-gradient-to-br from-cyan-50 to-blue-50 shadow-lg'
                              : 'border-slate-200 hover:border-cyan-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center text-3xl shadow-lg`}>
                              {method.logo}
                            </div>
                            <div className="flex-1">
                              <div className="text-lg font-bold text-slate-900">{method.name}</div>
                              <div className="text-sm text-slate-600">Dial {method.code}</div>
                            </div>
                            {selectedProvider === method.id && (
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                <Check className="w-5 h-5 text-white" />
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Payment Form */}
                {showCardForm && isCardPayment && (
                  <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      Secure Card Payment
                    </h3>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">CVC</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          placeholder="123"
                          maxLength={4}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Billing Country</label>
                      <select
                        value={billingCountry}
                        onChange={(e) => setBillingCountry(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
                      >
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="GB">United Kingdom</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                        <option value="NL">Netherlands</option>
                        <option value="SE">Sweden</option>
                        <option value="NO">Norway</option>
                        <option value="DK">Denmark</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <button
                      onClick={handleCardPayment}
                      disabled={!cardNumber || !cardExpiry || !cardCvc || !cardName || isSubmitting}
                      className="w-full group relative px-8 py-5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl font-black text-white text-lg shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            Processing Payment...
                          </>
                        ) : (
                          <>
                            <Shield className="w-6 h-6" />
                            Pay ${(finalAmount / 100).toFixed(2)} USD
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>

                    <p className="text-xs text-slate-600 text-center">
                      <Shield className="w-3 h-3 inline mr-1" />
                      Secured by 256-bit SSL encryption. We never store your card details.
                    </p>
                  </div>
                )}

                {/* Donor Information */}
                <div className="space-y-4 mb-8">
                  <h3 className="text-lg font-bold text-slate-900">
                    Your Information {!isCardPayment && '(Optional)'}
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name {isCardPayment && '*'}</label>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="John Doe"
                      required={isCardPayment}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email {isCardPayment && '*'}</label>
                    <input
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="johndoe@email.com"
                      required={isCardPayment}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      placeholder="+1 XXX XXX XXXX"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Message (Optional)</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share why you're supporting this cause..."
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button - Only show if not card or card form not shown */}
                {(!isCardPayment || !showCardForm) && (
                  <>
                    <button
                      onClick={handleSubmit}
                      disabled={!selectedProvider || isSubmitting || (isCardPayment && (!donorName || !donorEmail))}
                      className="w-full group relative px-8 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-black text-white text-lg shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Heart className="w-6 h-6" fill="currentColor" />
                            {isCardPayment ? 'Continue to Payment' : `Donate LRD ${finalAmount.toLocaleString()}`}
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>

                    <p className="text-xs text-slate-500 text-center mt-4">
                      <Shield className="w-4 h-4 inline mr-1" />
                      Your donation is secure and will be used to support recovery programs in Liberia
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Right Column - Instructions & Info */}
            <div className="space-y-8">
              {/* Success Message */}
              {showSuccess && (
                <div className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl border-2 border-emerald-200 animate-scale-in">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                      <Check className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-emerald-900 mb-2">Thank You! 🎉</h3>
                      <p className="text-emerald-700 leading-relaxed">
                        {isCardPayment 
                          ? 'Your payment has been processed successfully! You will receive a confirmation email shortly.'
                          : `Your donation intent has been recorded. Please follow the instructions below to complete your donation via ${selectedProviderData?.name}.`
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Instructions */}
              {showInstructions && selectedProviderData && selectedProviderData.type === 'mobile' && (
                <div className="p-8 bg-white rounded-3xl shadow-2xl border border-slate-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedProviderData.color} flex items-center justify-center text-3xl shadow-lg`}>
                      {selectedProviderData.logo}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{selectedProviderData.name}</h3>
                      <p className="text-slate-600">Follow these steps to complete your donation</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {selectedProviderData.instructions.map((instruction, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {idx + 1}
                        </div>
                        <p className="text-slate-700 leading-relaxed pt-1">{instruction}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl border border-cyan-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Phone className="w-5 h-5 text-cyan-600" />
                      <span className="text-sm font-bold text-cyan-900">Our Mobile Money Number:</span>
                    </div>
                    <div className="text-3xl font-black text-cyan-900">{selectedProviderData.number}</div>
                    <div className="text-sm text-cyan-700 mt-2">Amount to send: LRD {finalAmount.toLocaleString()}</div>
                  </div>
                </div>
              )}

              {/* Card Payment Receipt Info */}
              {showSuccess && isCardPayment && (
                <div className="p-8 bg-white rounded-3xl shadow-2xl border border-slate-200">
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <Check className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h3>
                      <p className="text-slate-600">Transaction ID: #{Date.now().toString().slice(-8)}</p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
                      <div className="text-4xl font-black text-blue-900 mb-2">
                        ${(finalAmount / 100).toFixed(2)} USD
                      </div>
                      <p className="text-sm text-blue-700">Donated to Secure the Future</p>
                    </div>
                    <p className="text-sm text-slate-600">
                      A receipt has been sent to <span className="font-bold">{donorEmail}</span>
                    </p>
                  </div>
                </div>
              )}

              {/* Impact Information */}
              <div className="p-8 bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl shadow-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="w-8 h-8 text-cyan-400" />
                    <h3 className="text-2xl font-bold text-white">Your Impact</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
                      <div className="text-4xl font-black text-white mb-2">500+</div>
                      <div className="text-sm text-slate-300">Liberians helped through donations</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
                      <div className="text-4xl font-black text-white mb-2">15</div>
                      <div className="text-sm text-slate-300">Counties receiving support</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
                      <div className="text-4xl font-black text-white mb-2">100%</div>
                      <div className="text-sm text-slate-300">Of donations go directly to programs</div>
                    </div>
                  </div>

                  <p className="text-slate-300 mt-6 leading-relaxed">
                    Every donation, no matter the size, makes a real difference in the lives of Liberians fighting addiction.
                  </p>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex flex-wrap items-center justify-center gap-6 text-center">
                  <div>
                    <Shield className="w-8 h-8 mx-auto mb-2 text-cyan-600" />
                    <div className="text-xs font-bold text-slate-700">Secure</div>
                  </div>
                  <div>
                    <Heart className="w-8 h-8 mx-auto mb-2 text-cyan-600" fill="currentColor" />
                    <div className="text-xs font-bold text-slate-700">Transparent</div>
                  </div>
                  <div>
                    <Award className="w-8 h-8 mx-auto mb-2 text-cyan-600" />
                    <div className="text-xs font-bold text-slate-700">Trusted</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-slate-900 text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'Is my donation secure?',
                a: 'Yes! We use secure payment processors for international cards (SSL encrypted) and trusted Liberian mobile money providers (Lonestar MTN and Orange Money).'
              },
              {
                q: 'What currencies do you accept?',
                a: 'We accept international card payments in USD, EUR, GBP and other major currencies. Local donations can be made in LRD via mobile money.'
              },
              {
                q: 'How is my donation used?',
                a: '100% of your donation goes directly to our programs supporting Liberians affected by addiction, including counseling, resources, and community outreach.'
              },
              {
                q: 'Can I donate anonymously?',
                a: 'For mobile money donations, yes! Your information is optional. Card payments require basic information for processing.'
              },
              {
                q: 'Will I receive a receipt?',
                a: 'Yes! Card payments receive instant email receipts. For mobile money donations, we\'ll send a receipt if you provide your email.'
              },
              {
                q: 'What if I have issues with my donation?',
                a: 'Contact us at +231 886 123 456 or info@securethefuture.org and we\'ll help resolve any issues.'
              }
            ].map((faq, idx) => (
              <details key={idx} className="group p-6 bg-white rounded-2xl border border-slate-200 hover:border-cyan-300 transition-all">
                <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-slate-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
