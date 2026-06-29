/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Mail, Phone, MapPin, Send, Database, ClipboardCheck, Terminal, Trash2, Heart, Linkedin } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data';
import { ContactMessage } from '../types';

interface ContactHubProps {
  isDark: boolean;
}

export default function ContactHub({ isDark }: ContactHubProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [savedMessages, setSavedMessages] = useState<ContactMessage[]>([]);

  // Load existing messages on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('tamoharini_portfolio_notes');
      if (stored) {
        setSavedMessages(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Local storage read failure", e);
    }
  }, []);

  const saveMessageToLocal = (newMessage: ContactMessage) => {
    try {
      const updated = [newMessage, ...savedMessages];
      localStorage.setItem('tamoharini_portfolio_notes', JSON.stringify(updated));
      setSavedMessages(updated);
    } catch (e) {
      console.error("Local storage save failure", e);
    }
  };

  const deleteMessage = (id: string) => {
    try {
      const updated = savedMessages.filter(m => m.id !== id);
      localStorage.setItem('tamoharini_portfolio_notes', JSON.stringify(updated));
      setSavedMessages(updated);
    } catch (e) {
      console.error("Local storage delete failure", e);
    }
  };

  const clearAllMessages = () => {
    try {
      localStorage.removeItem('tamoharini_portfolio_notes');
      setSavedMessages([]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSending(true);

    // Simulate direct network transmission latency
    setTimeout(() => {
      const newMsg: ContactMessage = {
        id: 'msg_' + Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString(),
        senderName: name,
        senderEmail: email,
        phone: phone || 'N/A',
        message: message
      };

      saveMessageToLocal(newMsg);
      setIsSending(false);
      setSentSuccess(true);

      // Reset fields
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');

      // Fade alert after 4 seconds
      setTimeout(() => setSentSuccess(false), 4400);
    }, 1200);
  };

  // Compile JSON Schema mockup for real-time visualization
  const simulatedJson = JSON.stringify({
    header: {
      method: "POST",
      endpoint: "/api/v1/recruiter/contact",
      host: "tamoharini.dev"
    },
    payload: {
      client_name: name || null,
      client_email: email || null,
      client_phone: phone || null,
      body_length: message.length,
      body: message || null
    },
    agent: "Web Browser Agent (" + (typeof navigator !== 'undefined' ? navigator.appName : 'React SPA') + ")"
  }, null, 2);

  return (
    <section
      id="contact"
      className={`py-20 ${
        isDark ? 'bg-zinc-900 text-zinc-100' : 'bg-white text-zinc-850'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Let's Start a Conversation
          </h2>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
          <p className={`mt-4 text-sm sm:text-base ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
            Have an open software role or project inquiry? Submit a message below or connect directly through standard channels.
          </p>
        </div>

        {/* Direct Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Email Card */}
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className={`group p-5 rounded-2xl border transition-all duration-300 flex items-center space-x-4 outline-none ${
              isDark 
                ? 'bg-zinc-850 hover:bg-zinc-800 border-zinc-800 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5' 
                : 'bg-zinc-50 hover:bg-white border-zinc-200 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5'
            }`}
          >
            <div className={`p-3 rounded-xl transition-colors ${
              isDark ? 'bg-zinc-900 group-hover:bg-emerald-500/10 text-emerald-405' : 'bg-white group-hover:bg-emerald-500/10 text-emerald-600 border border-zinc-150 group-hover:border-transparent'
            }`}>
              <Mail className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="flex-1 min-w-0">
              <span className={`text-[10px] font-bold uppercase tracking-wider font-mono ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Email Me</span>
              <p className={`text-xs sm:text-sm font-semibold truncate transition-colors ${
                isDark ? 'text-zinc-200 group-hover:text-emerald-400' : 'text-zinc-800 group-hover:text-emerald-600'
              }`}>
                {PERSONAL_INFO.email}
              </p>
            </div>
          </a>

          {/* LinkedIn Card */}
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`group p-5 rounded-2xl border transition-all duration-300 flex items-center space-x-4 outline-none ${
              isDark 
                ? 'bg-zinc-855 hover:bg-zinc-800 border-zinc-800 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5' 
                : 'bg-zinc-50 hover:bg-white border-zinc-200 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5'
            }`}
          >
            <div className={`p-3 rounded-xl transition-colors ${
              isDark ? 'bg-zinc-900 group-hover:bg-emerald-500/10 text-emerald-405' : 'bg-white group-hover:bg-emerald-500/10 text-emerald-600 border border-zinc-150 group-hover:border-transparent'
            }`}>
              <Linkedin className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="flex-1 min-w-0">
              <span className={`text-[10px] font-bold uppercase tracking-wider font-mono ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>LinkedIn Profile</span>
              <p className={`text-xs sm:text-sm font-semibold truncate transition-colors ${
                isDark ? 'text-zinc-200 group-hover:text-emerald-400' : 'text-zinc-800 group-hover:text-emerald-600'
              }`}>
                linkedin.com/in/tamoharini
              </p>
            </div>
          </a>

          {/* Phone Card */}
          <a
            href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
            className={`group p-5 rounded-2xl border transition-all duration-300 flex items-center space-x-4 outline-none ${
              isDark 
                ? 'bg-zinc-850 hover:bg-zinc-800 border-zinc-800 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5' 
                : 'bg-zinc-50 hover:bg-white border-zinc-200 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5'
            }`}
          >
            <div className={`p-3 rounded-xl transition-colors ${
              isDark ? 'bg-zinc-900 group-hover:bg-emerald-500/10 text-emerald-405' : 'bg-white group-hover:bg-emerald-500/10 text-emerald-600 border border-zinc-150 group-hover:border-transparent'
            }`}>
              <Phone className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="flex-1 min-w-0">
              <span className={`text-[10px] font-bold uppercase tracking-wider font-mono ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Call / WhatsApp</span>
              <p className={`text-xs sm:text-sm font-semibold truncate transition-colors ${
                isDark ? 'text-zinc-200 group-hover:text-emerald-400' : 'text-zinc-800 group-hover:text-emerald-600'
              }`}>
                {PERSONAL_INFO.phone}
              </p>
            </div>
          </a>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Form and Quick details (7 Columns) */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            <div className={`p-6 rounded-2xl border flex-1 ${
              isDark ? 'bg-zinc-850 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
            }`}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold font-mono uppercase tracking-wider mb-1.5 text-zinc-400">
                      Your Name *
                    </label>
                    <input
                      required
                      type="text"
                      id="contact-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className={`w-full text-xs p-3 rounded-xl border focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all ${
                        isDark 
                          ? 'bg-zinc-900 border-zinc-750 text-white placeholder-zinc-600' 
                          : 'bg-white border-zinc-205 text-zinc-850 placeholder-zinc-400'
                      }`}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold font-mono uppercase tracking-wider mb-1.5 text-zinc-400">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      id="contact-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className={`w-full text-xs p-3 rounded-xl border focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all ${
                        isDark 
                          ? 'bg-zinc-900 border-zinc-750 text-white placeholder-zinc-600' 
                          : 'bg-white border-zinc-205 text-zinc-850 placeholder-zinc-400'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-bold font-mono uppercase tracking-wider mb-1.5 text-zinc-400">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 93455 97211"
                    className={`w-full text-xs p-3 rounded-xl border focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all ${
                      isDark 
                        ? 'bg-zinc-900 border-zinc-750 text-white placeholder-zinc-600' 
                        : 'bg-white border-zinc-205 text-zinc-850 placeholder-zinc-400'
                    }`}
                  />
                </div>

                <div>
                  <label htmlFor="contact-msg" className="block text-xs font-bold font-mono uppercase tracking-wider mb-1.5 text-zinc-400">
                    Message Body *
                  </label>
                  <textarea
                    required
                    id="contact-msg"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your project, internship, or full-stack opportunity..."
                    className={`w-full text-xs p-3 rounded-xl border focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all ${
                      isDark 
                        ? 'bg-zinc-900 border-zinc-750 text-white placeholder-zinc-600' 
                        : 'bg-white border-zinc-205 text-zinc-850 placeholder-zinc-400'
                    }`}
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] text-zinc-400 font-mono">* Indicates required field validation</span>
                  <button
                    required
                    id="contact-submit-btn"
                    disabled={isSending || !name || !email || !message}
                    type="submit"
                    className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-bold text-xs uppercase cursor-pointer tracking-wider shadow-md transition-all ${
                      isSending || !name || !email || !message
                        ? 'bg-zinc-300 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed scale-100 shadow-none'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white active:scale-98 shadow-emerald-500/10'
                    }`}
                  >
                    {isSending ? (
                      <>
                        <Terminal className="w-4 h-4 animate-spin block text-white" />
                        <span>POST Request Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-white" />
                        <span>Submit POST Query</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Message Success Alerts */}
              {sentSuccess && (
                <motion.div
                  id="contact-success-banner"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-3.5 rounded-xl border text-xs font-mono flex items-center space-x-2.5 ${
                    isDark ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-green-500/5 border-green-500/10 text-green-700'
                  }`}
                >
                  <ClipboardCheck className="w-4 h-4 flex-shrink-0 text-green-500" />
                  <span>
                    <strong>SUCCESS:</strong> HTTP Status 201 Created. Note appended safely in Local Database inbox. Look to the right! &rarr;
                  </span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Developer Real-Time payload console (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* JSON Schema display */}
            <div className={`p-6 rounded-2xl border ${
              isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200 shadow-xs'
            }`}>
              <div className="flex items-center justify-between mb-3 border-b border-zinc-200 dark:border-zinc-805 pb-2">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4.5 h-4.5 text-emerald-500" />
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-400">
                    Live Payload Schema Builder
                  </span>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded font-bold">200.ok</span>
              </div>

              <pre className={`p-3.5 rounded-xl border overflow-x-auto text-[10px] font-mono block h-[200px] leading-relaxed select-text ${
                isDark ? 'bg-zinc-900 border-zinc-850 text-emerald-400' : 'bg-white border-zinc-200 text-emerald-600'
              }`}>
                {simulatedJson}
              </pre>
            </div>

            {/* Recruiter Local Storage Notes / Inbox Monitor */}
            <div className={`p-6 rounded-2xl border flex-1 ${
              isDark ? 'bg-zinc-850 border-zinc-800' : 'bg-slate-50 border-zinc-150'
            }`}>
              <div className="flex items-center justify-between mb-4 border-b pb-2 sm:pb-3 border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center space-x-2">
                  <Database className="w-4.5 h-4.5 text-emerald-500" />
                  <h4 className="text-xs uppercase font-mono tracking-tight font-bold">
                    Local Message Logs Monitor
                  </h4>
                </div>
                {savedMessages.length > 0 && (
                  <button
                    id="contact-clear-db-btn"
                    onClick={clearAllMessages}
                    className="flex items-center space-x-1 p-1 px-2 border rounded border-red-500/20 text-red-500 text-[9px] hover:bg-red-500/10 font-bold transition-all"
                    title="Clear test records from Local Storage"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Purge Logs</span>
                  </button>
                )}
              </div>

              {savedMessages.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl my-2 text-xs text-zinc-500">
                  <p>Database table is empty. Type a test message and send to see local synchronization in real-time!</p>
                </div>
              ) : (
                <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
                  {savedMessages.map((msg) => (
                    <div
                      key={msg.id}
                      id={`local-msg-log-${msg.id}`}
                      className={`p-3 rounded-xl border relative shadow-2xs group ${
                        isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-150'
                      }`}
                    >
                      <button
                        id={`delete-local-msg-${msg.id}`}
                        onClick={() => deleteMessage(msg.id)}
                        className="absolute top-2.5 right-2 text-zinc-400 hover:text-red-500 transition-colors opacity-100 sm:opacity-0 group-hover:opacity-100 p-1"
                        aria-label="Remove note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold font-mono tracking-tight text-emerald-500">{msg.senderName}</span>
                        <span className="text-[9px] text-zinc-500 font-mono tracking-tighter mr-6">{msg.timestamp}</span>
                      </div>
                      
                      <div className="text-[10px] text-zinc-400 mb-1 font-mono">
                        <span>Email: {msg.senderEmail}</span> &bull; <span>Phone: {msg.phone}</span>
                      </div>

                      <p className={`text-[11px] leading-relaxed break-words font-sans line-clamp-2 ${
                        isDark ? 'text-zinc-300' : 'text-zinc-650'
                      }`}>
                        "{msg.message}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Humorous and proud Mechatronics style footer */}
        <div className="mt-16 text-center border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500">
          <div className="flex items-center justify-center space-x-1">
            <span>Built with devotion by</span>
            <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500 animate-pulse inline" />
            <span className="font-semibold text-zinc-700 dark:text-zinc-450">{PERSONAL_INFO.name}</span>
          </div>
          <span className="font-mono mt-2 sm:mt-0 text-[11px] uppercase tracking-wide">
            &bull; Tiruppur,Tamilnadu,India &bull; BE Mechatronics (KPRIET)
          </span>
        </div>

      </div>
    </section>
  );
}
