/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { 
  Download, 
  Mail, 
  MapPin, 
  Phone, 
  ExternalLink, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Heart, 
  ChevronRight,
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  Send,
  User,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CV_IMAGE_PATH = '/cv_saya.jpg';
const PROFILE_IMAGE_PATH = '/foto_saya.jpg'; // Using same for now, but user can replace

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('https://formspree.io/f/xpwqrqzd', { // Placeholder, user should replace with their ID
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setFormStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
    
    setTimeout(() => setFormStatus('idle'), 5000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = [
    { name: 'Adobe Photoshop', level: 85, icon: '🎨' },
    { name: 'Graphic Design', level: 88, icon: '✏️' },
    { name: 'Microsoft Word', level: 90, icon: '📝' },
    { name: 'Microsoft Excel', level: 80, icon: '📊' },
    { name: 'Networking', level: 75, icon: '🌐' },
    { name: 'MS PowerPoint', level: 82, icon: '📋' },
  ];

  const experiences = [
    {
      year: '2024 – Present',
      company: 'Florie X Pinnata Store',
      role: 'Admin Back Office',
      location: 'Bayalangu',
      desc: 'Inventory & Stock Management, Expiration Date Monitoring, Sales & Purchasing Administration, Product Data Management, Operational Coordination, Reporting, Logistics & Stock Coordination.',
      current: true
    },
    {
      year: '2023 – 2024',
      company: 'Depo Jago',
      role: 'Staff General Affair',
      location: 'Arjawinangun',
      desc: 'Bertanggung jawab mengelola seluruh operasional fasilitas kantor dan pengadaan aset perusahaan. Efisiensi anggaran operasional, mengelola hubungan vendor eksternal, dan memastikan aspek legal serta keselamatan terpenuhi.'
    },
    {
      year: '2020 – 2023',
      company: 'J&T Express CP',
      role: 'Leader / Shift Lead Collection Point',
      location: 'Tegalgubug',
      desc: 'Mengawasi dan memonitor alur kerja tim sesuai SOP, memonitor proses scan barang masuk/keluar, mencatat pengiriman dan keuangan harian/mingguan/bulanan.'
    },
    {
      year: '2019 – 2020',
      company: 'Pos Express Indonesia',
      role: 'Sales Counter Officer',
      location: 'Tegalgubug',
      desc: 'Menginput alamat pengiriman barang/surat, mencatat keuangan harian, mingguan, dan bulanan menggunakan sistem agen dan Microsoft Excel.'
    },
    {
      year: '2018 – 2019',
      company: 'JNE Express',
      role: 'Sales Counter Officer',
      location: 'Tegalgubug',
      desc: 'Menginput alamat pengiriman barang/surat, mencatat keuangan harian, mingguan, dan bulanan menggunakan sistem agen dan Microsoft Excel.'
    }
  ];

  const education = [
    {
      year: '2015 – 2018',
      school: 'SMK Plus Al-Hilal',
      major: 'Teknik Komputer dan Jaringan',
      location: 'Tegalgubug, Kab. Cirebon',
      highlight: true
    },
    {
      year: '2012 – 2015',
      school: 'MTS Al-Hilal',
      major: 'General Education',
      location: 'Tegalgubug, Kec. Arjawinangun'
    },
    {
      year: '2006 – 2012',
      school: 'MI Nahdlatut Taibin',
      major: 'General Education',
      location: 'Desa Majasri, Kec. Susukan'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 selection:bg-gold-500 selection:text-neutral-950">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-neutral-950/80 backdrop-blur-md py-4 border-b border-neutral-800' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-display font-bold text-gold-500"
          >
            UF
          </motion.div>
          <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest">
            {['Skills', 'Experience', 'Education', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="hover:text-gold-500 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <motion.a 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            href={CV_IMAGE_PATH}
            download="CV_Umar_Fakhrudin.jpg"
            className="bg-gold-500 text-neutral-950 px-5 py-2 rounded-full text-sm font-bold hover:bg-gold-400 transition-all flex items-center gap-2"
          >
            <Download size={16} />
            CV
          </motion.a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            {/* Profile Photo */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-gold-500/30 p-2 bg-neutral-900 shadow-2xl shadow-gold-500/10">
                <div className="w-full h-full rounded-xl overflow-hidden relative group">
                  <img 
                    src={PROFILE_IMAGE_PATH} 
                    alt="Umar Fakhrudin" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/umar/800/800';
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              {/* Decorative Rings */}
              <div className="absolute -inset-4 border border-gold-500/10 rounded-3xl -z-10 animate-[spin_20s_linear_infinite]" />
              <div className="absolute -inset-8 border border-gold-500/5 rounded-3xl -z-10 animate-[spin_30s_linear_infinite_reverse]" />
            </motion.div>

            <div className="flex-1 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="inline-block px-4 py-1 rounded-full bg-gold-500/10 text-gold-500 text-xs font-bold uppercase tracking-widest mb-6 border border-gold-500/20">
                  ● Available for Work
                </span>
                <h1 className="font-display text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight">
                  Umar <span className="text-gold-500">Fakhrudin</span>
                </h1>
                <p className="text-xl md:text-2xl text-neutral-400 font-medium mb-8">
                  Copywriter & Graphic Designer
                </p>
                <p className="text-neutral-400 max-w-xl mb-10 leading-relaxed text-lg">
                  Lulusan SMK jurusan Teknik Komputer dan Jaringan. Mahir Photoshop, Microsoft Office, dan desain grafis. 
                  Disiplin, adaptif, dan mampu berkomunikasi dengan baik.
                </p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <a 
                    href={CV_IMAGE_PATH}
                    download="CV_Umar_Fakhrudin.jpg"
                    className="bg-gold-500 text-neutral-950 px-8 py-4 rounded-xl font-bold hover:bg-gold-400 transition-all flex items-center gap-3 shadow-lg shadow-gold-500/20"
                  >
                    <Download size={20} />
                    Download CV
                  </a>
                  <a 
                    href="https://wa.me/6289676668137" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-neutral-800 text-white px-8 py-4 rounded-xl font-bold hover:bg-neutral-700 transition-all flex items-center gap-3 border border-neutral-700"
                  >
                    <MessageCircle size={20} className="text-green-500" />
                    WhatsApp
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-500"
        >
          <div className="w-6 h-10 border-2 border-neutral-700 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-gold-500 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-neutral-900/50">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            <h2>My <span>Skills</span></h2>
            <div className="title-line" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 hover:border-gold-500/30 transition-all group"
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{skill.icon}</span>
                    <h3 className="font-display font-bold text-lg">{skill.name}</h3>
                  </div>
                  <span className="text-gold-500 font-bold">{skill.level}%</span>
                </div>
                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            <h2>Job <span>Experience</span></h2>
            <div className="title-line" />
          </motion.div>

          <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-800 before:to-transparent">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                {/* Dot */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-neutral-950 absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10 transition-colors duration-300 ${exp.current ? 'bg-gold-500' : 'bg-neutral-800 group-hover:bg-gold-500/50'}`} />
                
                {/* Content */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-neutral-900 p-8 rounded-2xl border border-neutral-800 hover:border-gold-500/30 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${exp.current ? 'bg-gold-500 text-neutral-950' : 'bg-neutral-800 text-neutral-400'}`}>
                      {exp.year}
                    </span>
                    <span className="text-neutral-500 text-xs flex items-center gap-1">
                      <MapPin size={12} /> {exp.location}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-1">{exp.company}</h3>
                  <p className="text-gold-500 font-medium mb-4">{exp.role}</p>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {exp.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 bg-neutral-900/50">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            <h2>Edu<span>cation</span></h2>
            <div className="title-line" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className={`p-8 rounded-2xl border transition-all ${edu.highlight ? 'bg-gold-500/5 border-gold-500/30' : 'bg-neutral-900 border-neutral-800'}`}
              >
                <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center text-gold-500 mb-6">
                  {index === 0 ? <GraduationCap size={24} /> : index === 1 ? <Award size={24} /> : <Heart size={24} />}
                </div>
                <span className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-2 block">{edu.year}</span>
                <h3 className="text-xl font-display font-bold text-white mb-2">{edu.school}</h3>
                <p className="text-neutral-400 font-medium mb-4">{edu.major}</p>
                <p className="text-neutral-500 text-sm flex items-center gap-2">
                  <MapPin size={14} /> {edu.location}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-neutral-900 rounded-3xl border border-neutral-800 p-12 md:p-20 relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="section-title items-center">
                <h2>Let's <span>Connect</span></h2>
                <div className="title-line mx-auto" />
                <p className="text-neutral-400 mt-6 max-w-2xl text-lg">
                  Siap berkolaborasi untuk menciptakan karya yang luar biasa? Hubungi saya sekarang!
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl">
                {/* Contact Info Chips */}
                <div className="flex flex-col gap-6">
                  <div className="text-left mb-8">
                    <h3 className="text-2xl font-display font-bold text-white mb-4">Contact Details</h3>
                    <p className="text-neutral-400">Feel free to reach out through any of these channels.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { icon: Phone, text: '0896-7666-8137', label: 'Phone' },
                      { icon: Mail, text: 'umar.fakhrudin17@gmail.com', label: 'Email' },
                      { icon: MapPin, text: 'Kab. Cirebon, Indonesia', label: 'Location' }
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 flex items-center gap-6 group hover:border-gold-500/30 transition-all"
                      >
                        <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-neutral-950 transition-all">
                          <item.icon size={24} />
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-1">{item.label}</p>
                          <span className="text-lg font-medium text-white">{item.text}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <a 
                      href="https://wa.me/6289676668137" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600/10 text-green-500 px-6 py-3 rounded-xl font-bold hover:bg-green-600 hover:text-white transition-all flex items-center gap-3 border border-green-600/20"
                    >
                      <MessageCircle size={20} />
                      WhatsApp Me
                    </a>
                  </div>
                </div>

                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-neutral-950 p-8 md:p-10 rounded-3xl border border-neutral-800 text-left"
                >
                  <h3 className="text-2xl font-display font-bold text-white mb-8 flex items-center gap-3">
                    <Send className="text-gold-500" size={24} />
                    Send a Message
                  </h3>
                  
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-neutral-400 uppercase tracking-widest ml-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
                        <input 
                          type="text" 
                          name="name"
                          required
                          placeholder="Your Name"
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gold-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-neutral-400 uppercase tracking-widest ml-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
                        <input 
                          type="email" 
                          name="email"
                          required
                          placeholder="your@email.com"
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gold-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-neutral-400 uppercase tracking-widest ml-1">Message</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 text-neutral-600" size={18} />
                        <textarea 
                          name="message"
                          required
                          rows={4}
                          placeholder="How can I help you?"
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gold-500 transition-all resize-none"
                        ></textarea>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg ${
                        formStatus === 'loading' ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' :
                        formStatus === 'success' ? 'bg-green-600 text-white' :
                        formStatus === 'error' ? 'bg-red-600 text-white' :
                        'bg-gold-500 text-neutral-950 hover:bg-gold-400 shadow-gold-500/20'
                      }`}
                    >
                      {formStatus === 'loading' ? 'Sending...' : 
                       formStatus === 'success' ? 'Message Sent!' :
                       formStatus === 'error' ? 'Failed to Send' :
                       <>
                         <Send size={20} />
                         Send Message
                       </>
                      }
                    </button>
                    
                    <AnimatePresence>
                      {formStatus === 'success' && (
                        <motion.p 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-green-500 text-sm font-medium text-center mt-4"
                        >
                          Thank you! I'll get back to you as soon as possible.
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </form>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-900">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gold-500 font-display font-bold text-xl">UF</div>
          <p className="text-neutral-500 text-sm">
            © 2026 Umar Fakhrudin — All Rights Reserved
          </p>
          <div className="flex gap-4">
            {[
              { Icon: Instagram, url: 'https://instagram.com/placeholder' },
              { Icon: Linkedin, url: 'https://linkedin.com/in/placeholder' },
              { Icon: Github, url: 'https://github.com/placeholder' }
            ].map(({ Icon, url }, i) => (
              <a 
                key={i} 
                href={url} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-500 hover:text-gold-500 hover:bg-neutral-800 transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
