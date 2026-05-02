'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaTimes, FaPaperPlane, FaRobot } from 'react-icons/fa';

/* ─────────────────────────────────────────────
   KNOWLEDGE BASE — all business facts live here
───────────────────────────────────────────── */
const KB = {
  phone: '+44 7951 542411',
  location: 'Barking and Dagenham, London, UK',
  hours: 'Monday–Friday: 7:00am – 7:00pm\nSaturday: 8:00am – 5:00pm\nSunday: Closed',
  services: ['General Construction', 'Plumbing', 'Painting & Decorating', 'Electrical'],
  name: 'Patrick Nickolas',
};

type Role = 'bot' | 'user';
interface Message { id: number; role: Role; text: string; }

/* ─────────────────────────────────────────────
   INTENT MATCHING ENGINE
───────────────────────────────────────────── */
function getReply(input: string): string {
  const q = input.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|howdy|yo|sup|good\s*(morning|afternoon|evening))/.test(q))
    return `👋 Hey there! I'm the Patrick Nickolas virtual assistant. I can help you with:\n• Services we offer\n• Pricing & quotes\n• Our location\n• Working hours\n• How to get in touch\n\nWhat would you like to know?`;

  // Phone / Contact
  if (/phone|call|number|contact|reach|ring|speak/.test(q))
    return `📞 You can reach us directly at **${KB.phone}**.\n\nWe're available:\n${KB.hours}\n\nOr fill in the quote form on this page and we'll call you back within 24 hours!`;

  // Location / Area
  if (/location|address|where|area|london|barking|dagenham|come to|travel/.test(q))
    return `📍 We're based in **${KB.location}** and proudly serve the surrounding areas across East London.\n\nNot sure if we cover your area? Give us a call at ${KB.phone} and we'll let you know!`;

  // Hours / Availability
  if (/hour|open|time|available|weekend|saturday|sunday|when/.test(q))
    return `🕐 Our working hours are:\n\n${KB.hours}\n\nFor urgent enquiries outside these hours, leave us a message and we'll get back to you first thing!`;

  // Services — general
  if (/what.*do|service|offer|work|provide|speciali/.test(q))
    return `🔧 We offer a wide range of home and construction services:\n\n• **General Construction** – extensions, renovations, structural work\n• **Plumbing** – installs, repairs, emergencies\n• **Painting & Decorating** – interior & exterior finishes\n• **Electrical** – rewiring, installs, fault finding\n\nWould you like details on any specific service?`;

  // Construction
  if (/construct|build|extension|renovation|structur|brickwork|plaster/.test(q))
    return `🏗️ Our **General Construction** service covers:\n\n• Home extensions & conversions\n• Full renovations & refurbishments\n• Structural repairs & brickwork\n• Plastering & dry lining\n• Groundwork & foundations\n\nCall **${KB.phone}** for a free, no-obligation quote!`;

  // Plumbing
  if (/plumb|pipe|leak|boiler|bathroom|toilet|tap|drain|water/.test(q))
    return `🚿 Our **Plumbing** service includes:\n\n• Leak detection & repair\n• Bathroom & kitchen installs\n• Boiler servicing\n• Blocked drains & emergencies\n• Full pipe replacement\n\nCall us on **${KB.phone}** — we respond fast!`;

  // Painting
  if (/paint|decor|wall|colour|color|finish|gloss|emulsion|interior|exterior/.test(q))
    return `🎨 Our **Painting & Decorating** service includes:\n\n• Interior & exterior painting\n• Feature walls & specialist finishes\n• Wallpapering\n• Commercial & residential projects\n\nWe use premium materials for a flawless, long-lasting result. Get a quote at **${KB.phone}**!`;

  // Electrical
  if (/electric|wire|rewire|socket|fuse|light|power|circuit|alarm/.test(q))
    return `⚡ Our **Electrical** service covers:\n\n• Full rewires & consumer unit upgrades\n• Socket & lighting installs\n• Fault finding & emergency repairs\n• EV charger installs\n• Fire alarm & security systems\n\nAll work is certified & compliant. Call **${KB.phone}** to book an assessment.`;

  // Pricing / Cost / Quote
  if (/price|cost|quote|estimate|cheap|expensive|afford|rate|fee|charge/.test(q))
    return `💰 Every project is unique, so we provide **free, no-obligation quotes** tailored to your specific needs.\n\nTo get started:\n1. Fill in the **quote form** on this page, or\n2. Call us directly on **${KB.phone}**\n\nWe'll get back to you within 24 hours — usually much sooner!`;

  // Response time
  if (/how (long|quick|fast|soon)|response|wait|reply|turnaround/.test(q))
    return `⏱️ We aim to respond to all enquiries **within 24 hours** — usually much sooner!\n\nFor urgent jobs, call us directly: **${KB.phone}**`;

  // Emergency
  if (/urgent|emergency|asap|immediate|today|now|broken|burst|flood/.test(q))
    return `🚨 For **urgent or emergency** situations, please call us straight away:\n\n📞 **${KB.phone}**\n\nDon't wait — we'll do our best to get someone out to you as quickly as possible!`;

  // Experience / Trust
  if (/experience|trust|reliable|professional|qualif|certif|insur|accredit|years/.test(q))
    return `🏆 Patrick Nickolas is a **trusted, professional** team with years of hands-on experience across all our services.\n\n✅ Fully insured\n✅ Certified & qualified tradespeople\n✅ 5-star local reputation\n✅ Transparent pricing — no hidden fees\n\nWe take pride in every job, big or small.`;

  // Reviews / Testimonials
  if (/review|testimon|feedback|rating|happy|satisfied|customer/.test(q))
    return `⭐ Our customers love us! Here's what they say:\n\n*"Exceptional work — on time, on budget, and a spotless finish."*\n*"Highly recommend Patrick's team. Very professional and friendly."*\n\nCheck out the Testimonials section of our site for more. We'd love to add you to our list of happy clients!`;

  // Free quote
  if (/free|obligation|no.*charge/.test(q))
    return `✅ Yes! All quotes are completely **free and no-obligation**.\n\nJust fill in the form above or call **${KB.phone}** and we'll come assess the job and give you a transparent, detailed quote.`;

  // Thank you
  if (/thank|thanks|cheers|great|perfect|awesome|brilliant/.test(q))
    return `😊 You're welcome! If you have any other questions, I'm right here. Don't forget — you can also reach us at **${KB.phone}** or use the quote form above. Have a great day! 🙌`;

  // Bye / Exit
  if (/bye|goodbye|see you|later|take care/.test(q))
    return `👋 Goodbye! Feel free to come back anytime. You can also reach us at **${KB.phone}**. Have a wonderful day!`;

  // Fallback
  return `🤔 Great question! I'm not quite sure about that one.\n\nFor the most accurate answer, please:\n• 📞 Call us on **${KB.phone}**\n• 📝 Fill in the quote form on this page\n\nWe're happy to help with anything!`;
}

/* ─────────────────────────────────────────────
   SUGGESTED QUICK REPLIES
───────────────────────────────────────────── */
const QUICK = [
  'What services do you offer?',
  'How do I get a quote?',
  'What are your working hours?',
  'Where are you located?',
  'Do you do emergency work?',
];

/* ─────────────────────────────────────────────
   RENDER MARKDOWN-STYLE bold text (**text**)
───────────────────────────────────────────── */
function RichText({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <span style={{ whiteSpace: 'pre-wrap', lineHeight: 1.65 }}>
      {lines.map((line, li) => (
        <span key={li}>
          {line.split(/(\*\*[^*]+\*\*)/).map((part, pi) =>
            part.startsWith('**') && part.endsWith('**')
              ? <strong key={pi}>{part.slice(2, -2)}</strong>
              : part
          )}
          {li < lines.length - 1 && '\n'}
        </span>
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'bot',
      text: `👋 Hi! I'm the **Patrick Nickolas** virtual assistant.\n\nI can answer questions about our services, pricing, hours, location, and more.\n\nHow can I help you today?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    if (open) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = { id: nextId.current++, role: 'user', text: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    // Simulate AI thinking delay (650–1200ms for realism)
    const delay = 650 + Math.random() * 550;
    setTimeout(() => {
      const botText = getReply(trimmed);
      setMessages(prev => [...prev, { id: nextId.current++, role: 'bot', text: botText }]);
      setTyping(false);
    }, delay);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* ── FLOATING TRIGGER BUTTON ── */}
      <motion.button
        id="chatbot-trigger"
        onClick={() => setOpen(v => !v)}
        aria-label="Open chat assistant"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        style={{
          position: 'fixed',
          bottom: 88,
          right: 28,
          width: 58,
          height: 58,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ff7a2e, var(--orange-dk))',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.35rem',
          zIndex: 1000,
          boxShadow: '0 8px 32px rgba(249,104,22,.45), 0 2px 8px rgba(0,0,0,.15)',
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <FaTimes />
            </motion.span>
          ) : (
            <motion.span key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <FaRobot />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        <AnimatePresence>
          {hasUnread && !open && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              style={{
                position: 'absolute',
                top: 2, right: 2,
                width: 14, height: 14,
                borderRadius: '50%',
                background: '#10b981',
                border: '2px solid #fff',
              }}
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── CHAT WINDOW ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="chatbot-window"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              bottom: 160,
              right: 28,
              width: 'min(400px, calc(100vw - 32px))',
              height: 560,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 20,
              overflow: 'hidden',
              zIndex: 1000,
              background: '#fff',
              boxShadow: '0 24px 80px rgba(4,13,26,.22), 0 4px 16px rgba(4,13,26,.1)',
              border: '1px solid var(--border)',
            }}
          >
            {/* ── HEADER ── */}
            <div style={{
              background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)',
              padding: '18px 20px 16px',
              flexShrink: 0,
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Decorative glow */}
              <div style={{
                position: 'absolute', top: -30, right: -30,
                width: 120, height: 120, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(249,104,22,.3) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ff7a2e, var(--orange-dk))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem', color: '#fff', flexShrink: 0,
                  boxShadow: '0 4px 16px rgba(249,104,22,.5)',
                }}>
                  <FaRobot />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '.98rem', color: '#fff', letterSpacing: '-.02em' }}>
                    Patrick Nickolas AI
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 6px rgba(16,185,129,.7)' }} />
                    <span style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.65)', fontWeight: 500 }}>Online · Replies instantly</span>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(255,255,255,.6)', fontSize: '1rem', cursor: 'pointer', padding: 4, lineHeight: 1 }}
                >
                  <FaTimes />
                </button>
              </div>

              {/* Quick info strip */}
              <div style={{ display: 'flex', gap: 14, marginTop: 14, position: 'relative' }}>
                {[
                  { icon: <FaPhoneAlt />, text: KB.phone },
                  { icon: <FaMapMarkerAlt />, text: 'Barking, London' },
                  { icon: <FaClock />, text: 'Mon–Sat' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '.68rem', color: 'rgba(255,255,255,.55)', fontWeight: 500 }}>
                    <span style={{ color: 'var(--orange)', fontSize: '.65rem' }}>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            {/* ── MESSAGE LIST ── */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px 16px 8px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              background: 'var(--off-white)',
            }}>
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    alignItems: 'flex-end',
                    gap: 8,
                  }}
                >
                  {msg.role === 'bot' && (
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                      background: 'linear-gradient(135deg, #ff7a2e, var(--orange-dk))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '.65rem', color: '#fff',
                    }}>
                      <FaRobot />
                    </div>
                  )}
                  <div style={{
                    maxWidth: '80%',
                    padding: '11px 14px',
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: msg.role === 'user'
                      ? 'linear-gradient(135deg, #ff7a2e, var(--orange-dk))'
                      : '#fff',
                    color: msg.role === 'user' ? '#fff' : 'var(--text)',
                    fontSize: '.88rem',
                    boxShadow: msg.role === 'user'
                      ? '0 4px 16px rgba(249,104,22,.3)'
                      : '0 2px 8px rgba(4,13,26,.07)',
                    border: msg.role === 'bot' ? '1px solid var(--border)' : 'none',
                  }}>
                    <RichText text={msg.text} />
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                      background: 'linear-gradient(135deg, #ff7a2e, var(--orange-dk))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '.65rem', color: '#fff',
                    }}>
                      <FaRobot />
                    </div>
                    <div style={{
                      padding: '12px 16px',
                      background: '#fff',
                      borderRadius: '16px 16px 16px 4px',
                      border: '1px solid var(--border)',
                      boxShadow: '0 2px 8px rgba(4,13,26,.07)',
                      display: 'flex', gap: 5, alignItems: 'center',
                    }}>
                      {[0, 1, 2].map(i => (
                        <motion.span
                          key={i}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                          style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--orange)', display: 'block' }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={endRef} />
            </div>

            {/* ── QUICK REPLIES ── */}
            {messages.length <= 2 && !typing && (
              <div style={{
                padding: '8px 12px 4px',
                display: 'flex', flexWrap: 'wrap', gap: 6,
                background: 'var(--off-white)',
                borderTop: '1px solid var(--border)',
              }}>
                {QUICK.map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    style={{
                      fontSize: '.72rem', fontFamily: 'var(--font-body)',
                      fontWeight: 600, padding: '5px 11px',
                      border: '1.5px solid var(--orange)',
                      borderRadius: 50, background: 'rgba(249,104,22,.06)',
                      color: 'var(--orange)', cursor: 'pointer',
                      transition: 'background .2s, color .2s',
                    }}
                    onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = 'var(--orange)'; (e.target as HTMLButtonElement).style.color = '#fff'; }}
                    onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = 'rgba(249,104,22,.06)'; (e.target as HTMLButtonElement).style.color = 'var(--orange)'; }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* ── INPUT ── */}
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex', gap: 8, padding: '12px 12px 14px',
                background: '#fff',
                borderTop: '1px solid var(--border)',
                flexShrink: 0,
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask me anything…"
                style={{
                  flex: 1, padding: '10px 14px',
                  border: '2px solid var(--border)',
                  borderRadius: 50,
                  fontSize: '.88rem',
                  outline: 'none',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text)',
                  background: 'var(--off-white)',
                  transition: 'border-color .2s, box-shadow .2s',
                }}
                onFocus={e => { e.target.style.borderColor = 'var(--orange)'; e.target.style.boxShadow = '0 0 0 3px rgba(249,104,22,.12)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.93 }}
                disabled={!input.trim() || typing}
                style={{
                  width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                  background: input.trim() && !typing
                    ? 'linear-gradient(135deg, #ff7a2e, var(--orange-dk))'
                    : 'var(--border)',
                  border: 'none', cursor: input.trim() && !typing ? 'pointer' : 'default',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '.9rem',
                  transition: 'background .25s',
                  boxShadow: input.trim() && !typing ? '0 4px 14px rgba(249,104,22,.35)' : 'none',
                }}
              >
                <FaPaperPlane style={{ transform: 'translateX(1px)' }} />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
