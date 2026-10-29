import React, { useState } from 'react';
import { X, MessageCircle, Send, CheckCircle2, Crown } from 'lucide-react';

export default function EnquiryModal({ product, onClose }) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!product) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello The Royal Attire,\n\nI would like to enquire about the bespoke piece:\n*${product.title}*\n"${product.description}"\n\nMy Details:\nName: ${name || 'Interested Patron'}\nContact: ${contact || 'Via WhatsApp'}\nNotes: ${notes || 'None'}`
  );

  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-neutral-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div
        className="relative w-full max-w-2xl bg-[#fdf6e7] rounded-3xl border border-amber-900/20 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-amber-900/15 bg-amber-950/5">
          <div className="flex items-center gap-2 text-amber-950">
            <Crown className="w-5 h-5 text-amber-800" />
            <span className="font-serif text-lg font-bold">Bespoke Concierge Enquiry</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-neutral-900/10 hover:bg-neutral-900 hover:text-white text-neutral-800 flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Product Summary Row */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-amber-950/5 border border-amber-900/10">
            <img
              src={product.image}
              alt={product.title}
              className="w-20 h-20 rounded-xl object-cover shadow-sm"
            />
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-900">
                {product.category}
              </span>
              <h4 className="font-serif text-xl font-bold text-neutral-900">
                {product.title}
              </h4>
              <p className="text-xs text-neutral-800 line-clamp-2 mt-1">
                {product.description}
              </p>
            </div>
          </div>

          {isSubmitted ? (
            <div className="py-8 text-center flex flex-col items-center">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mb-4 animate-bounce" />
              <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-2">
                Thank You, Your Royal Enquiry Has Been Received
              </h3>
              <p className="text-sm text-neutral-800 max-w-md mb-6">
                Our bespoke concierge will reach out to you within 24 hours with fabric swatches, sizing guides, and tailoring schedules.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect Directly on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 px-4 rounded-xl bg-neutral-900 text-[#F3DFB2] font-semibold text-sm"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maharaja Vikramaditya / Ananya Sharma"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-amber-900/20 text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1.5">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-amber-900/20 text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-1.5">
                  Custom Requirements / Event Date
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about the occasion, preferred color palette, or bespoke sizing requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-amber-900/20 text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/50"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-950 text-[#F3DFB2] font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.98]"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>Send Concierge Request</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.98]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

