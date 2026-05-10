import { useState, useEffect, FormEvent } from 'react';
import { 
  Settings, 
  X, 
  Save, 
  Lock, 
  User as UserIcon, 
  LogOut, 
  ChevronDown, 
  Plus, 
  Trash2,
  AlertCircle,
  Award,
  Briefcase,
  GraduationCap,
  Globe,
  Upload,
  Image as ImageIcon,
  FileText
} from 'lucide-react';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

interface AdminPanelProps {
  data: any;
  onDataUpdate: (newData: any) => void;
  isDark: boolean;
}

export default function AdminPanel({ data, onDataUpdate, isDark }: AdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [tempData, setTempData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize temp data when panel opens
  useEffect(() => {
    if (data && !tempData) {
      setTempData({
        ...data,
        socialLinks: data.socialLinks || [],
        skills: data.skills || [],
        experiences: data.experiences || [],
        education: data.education || []
      });
    }
  }, [data]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const configDoc = await getDoc(doc(db, 'settings', 'config'));
      if (configDoc.exists()) {
        const { adminUsername, adminPassword } = configDoc.data();
        if (loginForm.username === adminUsername && loginForm.password === adminPassword) {
          setIsLoggedIn(true);
        } else {
          setError('Username atau password salah.');
        }
      } else {
        // First time setup - create default credentials if doc missing
        if (loginForm.username === 'admin' && loginForm.password === '123456') {
          await setDoc(doc(db, 'settings', 'config'), {
            adminUsername: 'admin',
            adminPassword: '123456'
          });
          setIsLoggedIn(true);
        } else {
          setError('Admin credentials not initialized.');
        }
      }
    } catch (err) {
      setError('Error checking credentials.');
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await setDoc(doc(db, 'data', 'portfolio'), tempData);
      onDataUpdate(tempData);
      setIsSaving(false);
      alert('Data berhasil disimpan!');
    } catch (err) {
      alert('Gagal menyimpan data.');
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    const newUsername = (e.target as any).newUsername.value;
    const newPassword = (e.target as any).newPassword.value;
    if (newUsername && newPassword) {
      try {
        await updateDoc(doc(db, 'settings', 'config'), {
          adminUsername: newUsername,
          adminPassword: newPassword
        });
        alert('Credentials updated!');
      } catch (err) {
        alert('Update failed.');
      }
    }
  };

  if (!isOpen) {
    return (
      <div 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-0 left-0 right-0 h-4 cursor-pointer opacity-0 hover:opacity-20 bg-gold-500 z-[9999]"
        title="Admin Panel"
      />
    );
  }

  return (
    <div className={`fixed inset-0 z-[10000] flex items-end justify-center p-4 md:p-8 bg-neutral-950/40 backdrop-blur-sm`}>
      <div className={`w-full max-w-5xl h-[85vh] rounded-3xl border overflow-hidden flex flex-col shadow-2xl transition-all duration-300 ${isDark ? 'bg-neutral-950 border-neutral-800 text-neutral-200' : 'bg-white border-neutral-200 text-neutral-800'}`}>
        {/* Header */}
        <div className={`p-6 border-b flex justify-between items-center ${isDark ? 'border-neutral-800 bg-neutral-900/50' : 'border-neutral-100 bg-neutral-50/50'}`}>
          <div className="flex items-center gap-3">
            <Settings className="text-gold-500" />
            <h2 className="font-display font-bold text-xl">Admin Control Panel</h2>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-neutral-500/10 rounded-full">
            <X size={24} />
          </button>
        </div>

        {!isLoggedIn ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <form onSubmit={handleLogin} className={`w-full max-w-md p-8 rounded-2xl border shadow-xl ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-500/10 text-gold-500 mb-4">
                  <Lock size={32} />
                </div>
                <h3 className="text-2xl font-bold">Admin Login</h3>
                <p className="text-neutral-500 text-sm mt-1">Gunakan username: admin, pass: 123456</p>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-3 text-sm">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2 block">Username</label>
                  <input 
                    type="text"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                    className={`w-full p-4 rounded-xl border focus:outline-none focus:border-gold-500 ${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-neutral-200'}`}
                    placeholder="admin"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2 block">Password</label>
                  <input 
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    className={`w-full p-4 rounded-xl border focus:outline-none focus:border-gold-500 ${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-neutral-200'}`}
                    placeholder="••••••"
                  />
                </div>
                <button type="submit" className="w-full py-4 bg-gold-500 text-neutral-950 font-bold rounded-xl hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20">
                  Unlock Panel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar / Top Tabs on Mobile */}
            <div className={`w-full md:w-64 border-b md:border-b-0 md:border-r overflow-x-auto md:overflow-y-auto ${isDark ? 'border-neutral-800 bg-neutral-950' : 'border-neutral-100 bg-neutral-50'}`}>
              <div className="p-2 md:p-4 flex md:flex-col gap-1 md:space-y-2 whitespace-nowrap md:whitespace-normal">
                {[
                  { id: 'profile', label: 'Profil', icon: UserIcon },
                  { id: 'skills', label: 'Skills', icon: Award },
                  { id: 'experience', label: 'Loker', icon: Briefcase },
                  { id: 'education', label: 'Edu', icon: GraduationCap },
                  { id: 'settings', label: 'Akses', icon: Settings },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex-1 md:w-full flex items-center justify-center md:justify-start gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl transition-all text-[10px] sm:text-xs md:text-sm font-medium ${activeTab === item.id ? 'bg-gold-500 text-neutral-950 font-bold' : (isDark ? 'text-neutral-400 hover:bg-neutral-900' : 'text-neutral-600 hover:bg-white')}`}
                  >
                    <item.icon size={16} className="shrink-0" />
                    {item.label}
                  </button>
                ))}
                <button onClick={() => setIsLoggedIn(false)} className="md:hidden flex items-center gap-2 px-3 py-2 rounded-lg text-red-500 hover:bg-red-500/10 text-[10px] sm:text-xs font-medium">
                  <LogOut size={16} />
                </button>
              </div>
              <div className="hidden md:block mt-auto p-4 border-t border-neutral-800">
                <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 text-sm font-medium">
                  <LogOut size={18} /> Keluar
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
              {tempData && (
                <div className="max-w-3xl mx-auto">
                  {activeTab === 'profile' && (
                    <div className="space-y-6">
                      <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Informasi Profil</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <Field label="Nama Depan" value={tempData.name} onChange={(v) => setTempData({...tempData, name: v})} isDark={isDark} />
                        <Field label="Nama Belakang" value={tempData.lastName} onChange={(v) => setTempData({...tempData, lastName: v})} isDark={isDark} />
                      </div>
                      <Field label="Role / Jabatan" value={tempData.role} onChange={(v) => setTempData({...tempData, role: v})} isDark={isDark} />
                      <Field label="Deskripsi Profil" value={tempData.description} type="textarea" onChange={(v) => setTempData({...tempData, description: v})} isDark={isDark} />
                      
                      <h4 className="text-base md:text-lg font-bold mt-6 md:mt-8 mb-3 md:mb-4 text-gold-500">Foto & File</h4>
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 ml-1 block">Foto Profil (Drag & Drop untuk Unggah)</label>
                        <FileUpload 
                          isDark={isDark}
                          accept="image/*"
                          icon={<ImageIcon size={32} />}
                          value={tempData.profileImageUrl}
                          onUpload={(dataUrl: string) => setTempData({ ...tempData, profileImageUrl: dataUrl })}
                        />
                        <Field 
                          label="Atau Gunakan URL Foto" 
                          value={tempData.profileImageUrl.startsWith('data:') ? '[Base64 Image Uploaded]' : tempData.profileImageUrl} 
                          onChange={(v: string) => setTempData({...tempData, profileImageUrl: v})} 
                          isDark={isDark} 
                          compact 
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-4">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 ml-1 block">CV PDF (Drag & Drop untuk Unggah)</label>
                          <FileUpload 
                            isDark={isDark}
                            accept="application/pdf"
                            icon={<FileText size={32} />}
                            value={tempData.cvPdfPath}
                            onUpload={(dataUrl) => setTempData({ ...tempData, cvPdfPath: dataUrl })}
                          />
                          <Field 
                            label="Atau Gunakan Path/URL PDF" 
                            value={tempData.cvPdfPath.startsWith('data:') ? '[Base64 PDF Uploaded]' : tempData.cvPdfPath} 
                            onChange={(v: string) => setTempData({...tempData, cvPdfPath: v})} 
                            isDark={isDark} 
                            compact 
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 ml-1 block">CV JPG Image (Drag & Drop untuk Unggah)</label>
                          <FileUpload 
                            isDark={isDark}
                            accept="image/*"
                            icon={<ImageIcon size={32} />}
                            value={tempData.cvJpgPath}
                            onUpload={(dataUrl) => setTempData({ ...tempData, cvJpgPath: dataUrl })}
                          />
                          <Field 
                            label="Atau Gunakan Path/URL JPG" 
                            value={tempData.cvJpgPath.startsWith('data:') ? '[Base64 Image Uploaded]' : tempData.cvJpgPath} 
                            onChange={(v: string) => setTempData({...tempData, cvJpgPath: v})} 
                            isDark={isDark} 
                            compact 
                          />
                        </div>
                      </div>

                      <h4 className="text-base md:text-lg font-bold mt-6 md:mt-8 mb-3 md:mb-4 text-gold-500 uppercase tracking-widest">Kontak</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <Field label="WhatsApp (awali 62)" value={tempData.whatsappNumber} onChange={(v: string) => setTempData({...tempData, whatsappNumber: v})} isDark={isDark} />
                        <Field label="Email" value={tempData.email} onChange={(v: string) => setTempData({...tempData, email: v})} isDark={isDark} />
                      </div>
                      <Field label="Alamat" value={tempData.address} onChange={(v: string) => setTempData({...tempData, address: v})} isDark={isDark} />

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6 md:mt-8 mb-3 md:mb-4">
                        <h4 className="text-base md:text-lg font-bold text-gold-500 uppercase tracking-widest">Social Media Links</h4>
                        <button 
                          onClick={() => setTempData({...tempData, socialLinks: [...(tempData.socialLinks || []), { platform: 'New Platform', url: 'https://' }]})}
                          className="flex items-center gap-2 px-3 py-1.5 bg-gold-500/10 text-gold-500 text-[10px] font-bold rounded-lg border border-gold-500/20"
                        >
                          <Plus size={14} /> Tambah Link
                        </button>
                      </div>
                      <div className="space-y-4">
                        {(tempData.socialLinks || []).map((link: any, idx: number) => (
                          <div key={idx} className={`p-4 rounded-xl border flex flex-wrap md:flex-nowrap items-center gap-4 ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
                            <div className="flex items-center gap-3 flex-1 min-w-[150px]">
                              <Globe size={18} className="text-gold-500" />
                              <input 
                                className="flex-1 bg-transparent border-none focus:ring-0 font-bold text-sm" 
                                placeholder="Platform (e.g. Facebook)"
                                value={link.platform} 
                                onChange={(e) => {
                                  const newLinks = [...tempData.socialLinks];
                                  newLinks[idx].platform = e.target.value;
                                  setTempData({...tempData, socialLinks: newLinks});
                                }} 
                              />
                            </div>
                            <input 
                              className="flex-[2] bg-transparent border-none focus:ring-0 text-sm italic opacity-60" 
                              placeholder="URL Link"
                              value={link.url} 
                              onChange={(e) => {
                                const newLinks = [...tempData.socialLinks];
                                newLinks[idx].url = e.target.value;
                                setTempData({...tempData, socialLinks: newLinks});
                              }} 
                            />
                            <button onClick={() => {
                              const newLinks = [...tempData.socialLinks];
                              newLinks.splice(idx, 1);
                              setTempData({...tempData, socialLinks: newLinks});
                            }} className="text-red-500 hover:text-red-400 p-2 ml-auto">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'skills' && (
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <h3 className="text-xl md:text-2xl font-bold">Keahlian (Skills)</h3>
                        <button 
                          onClick={() => setTempData({...tempData, skills: [...tempData.skills, { name: 'New Skill', level: 80, icon: '🔥' }]})}
                          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gold-500 text-neutral-950 font-bold rounded-lg text-sm"
                        >
                          <Plus size={16} /> Tambah Skill
                        </button>
                      </div>
                      <div className="space-y-4">
                        {tempData.skills.map((skill: any, idx: number) => (
                          <div key={idx} className={`p-3 md:p-4 rounded-xl border flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-4 ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
                            <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                              <input 
                                className="w-10 text-center bg-transparent border-none focus:ring-0 text-lg hover:bg-gold-500/10 rounded transition-colors" 
                                value={skill.icon} 
                                title="Klik untuk ubah ikon manual"
                                onChange={(e) => {
                                  const newSkills = [...tempData.skills];
                                  newSkills[idx].icon = e.target.value;
                                  setTempData({...tempData, skills: newSkills});
                                }} 
                              />
                              <input 
                                className="flex-1 bg-transparent border-none focus:ring-0 font-bold text-sm" 
                                placeholder="Nama Skill (cth: Figma)"
                                value={skill.name} 
                                onChange={(e) => {
                                  const val = e.target.value;
                                  const newSkills = [...tempData.skills];
                                  newSkills[idx].name = val;
                                  
                                  // Auto-suggest icon based on keywords
                                  const suggested = getSuggestedIcon(val);
                                  if (suggested) {
                                    newSkills[idx].icon = suggested;
                                  }
                                  
                                  setTempData({...tempData, skills: newSkills});
                                }} 
                              />
                            </div>
                            <div className="flex items-center gap-2 w-full md:w-auto">
                              <input type="range" className="flex-1 md:w-24 accent-gold-500" min="0" max="100" value={skill.level} onChange={(e) => {
                                const newSkills = [...tempData.skills];
                                newSkills[idx].level = parseInt(e.target.value);
                                setTempData({...tempData, skills: newSkills});
                              }} />
                              <span className="w-8 text-[10px] font-bold text-gold-500 text-right">{skill.level}%</span>
                              <button onClick={() => {
                                const newSkills = [...tempData.skills];
                                newSkills.splice(idx, 1);
                                setTempData({...tempData, skills: newSkills});
                              }} className="text-red-500 hover:text-red-400 p-2 ml-auto">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'experience' && (
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <h3 className="text-xl md:text-2xl font-bold">Pengalaman Kerja</h3>
                        <button 
                          onClick={() => setTempData({...tempData, experiences: [{ year: '2024', company: 'New Company', role: 'Role Name', location: 'Location', desc: 'Description here', current: false }, ...tempData.experiences]})}
                          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gold-500 text-neutral-950 font-bold rounded-lg text-sm"
                        >
                          <Plus size={16} /> Tambah Pengalaman
                        </button>
                      </div>
                      <div className="space-y-6 md:space-y-8">
                        {tempData.experiences.map((exp: any, idx: number) => (
                          <div key={idx} className={`p-4 md:p-6 rounded-2xl border transition-all ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
                            <div className="flex justify-between items-center mb-4">
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                <span className="p-1 px-3 bg-gold-500 text-neutral-950 rounded-full text-[10px] font-bold uppercase">Entry #{tempData.experiences.length - idx}</span>
                                <label className="flex items-center gap-2 text-[10px] text-neutral-500 font-bold uppercase tracking-widest cursor-pointer">
                                  <input type="checkbox" className="accent-gold-500" checked={exp.current} onChange={(e) => {
                                    const newExp = [...tempData.experiences];
                                    newExp[idx].current = e.target.checked;
                                    setTempData({...tempData, experiences: newExp});
                                  }} /> Masih Aktif
                                </label>
                              </div>
                              <button onClick={() => {
                                const newExp = [...tempData.experiences];
                                newExp.splice(idx, 1);
                                setTempData({...tempData, experiences: newExp});
                              }} className="text-red-500 hover:text-red-400 p-2">
                                <Trash2 size={18} />
                              </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <Field label="Tahun" value={exp.year} onChange={(v: string) => {
                                const newExp = [...tempData.experiences];
                                newExp[idx].year = v;
                                setTempData({...tempData, experiences: newExp});
                              }} isDark={isDark} compact />
                              <Field label="Perusahaan" value={exp.company} onChange={(v: string) => {
                                const newExp = [...tempData.experiences];
                                newExp[idx].company = v;
                                setTempData({...tempData, experiences: newExp});
                              }} isDark={isDark} compact />
                              <Field label="Jabatan" value={exp.role} onChange={(v: string) => {
                                const newExp = [...tempData.experiences];
                                newExp[idx].role = v;
                                setTempData({...tempData, experiences: newExp});
                              }} isDark={isDark} compact />
                              <Field label="Lokasi" value={exp.location} onChange={(v: string) => {
                                const newExp = [...tempData.experiences];
                                newExp[idx].location = v;
                                setTempData({...tempData, experiences: newExp});
                              }} isDark={isDark} compact />
                            </div>
                            <Field label="Deskripsi" value={exp.desc} type="textarea" onChange={(v: string) => {
                              const newExp = [...tempData.experiences];
                              newExp[idx].desc = v;
                              setTempData({...tempData, experiences: newExp});
                            }} isDark={isDark} compact />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'education' && (
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <h3 className="text-xl md:text-2xl font-bold">Pendidikan</h3>
                        <button 
                          onClick={() => setTempData({...tempData, education: [{ year: '2024', school: 'School Name', major: 'Major', location: 'Location', highlight: false }, ...tempData.education]})}
                          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gold-500 text-neutral-950 font-bold rounded-lg text-sm"
                        >
                          <Plus size={16} /> Tambah Pendidikan
                        </button>
                      </div>
                      <div className="space-y-6">
                        {tempData.education.map((edu: any, idx: number) => (
                          <div key={idx} className={`p-4 md:p-6 rounded-2xl border transition-all ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'} ${edu.highlight ? 'ring-1 ring-gold-500/20' : ''}`}>
                            <div className="flex justify-between items-center mb-4">
                              <label className="flex items-center gap-2 text-[10px] text-neutral-500 font-bold uppercase tracking-widest cursor-pointer">
                                <input type="checkbox" className="accent-gold-500" checked={edu.highlight} onChange={(e) => {
                                  const newEdu = [...tempData.education];
                                  newEdu[idx].highlight = e.target.checked;
                                  setTempData({...tempData, education: newEdu});
                                }} /> Beri Highlight
                              </label>
                              <button onClick={() => {
                                const newEdu = [...tempData.education];
                                newEdu.splice(idx, 1);
                                setTempData({...tempData, education: newEdu});
                              }} className="text-red-500 hover:text-red-400 p-2">
                                <Trash2 size={18} />
                              </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Field label="Tahun" value={edu.year} onChange={(v: string) => {
                                const newEdu = [...tempData.education];
                                newEdu[idx].year = v;
                                setTempData({...tempData, education: newEdu});
                              }} isDark={isDark} compact />
                              <Field label="Institusi" value={edu.school} onChange={(v: string) => {
                                const newEdu = [...tempData.education];
                                newEdu[idx].school = v;
                                setTempData({...tempData, education: newEdu});
                              }} isDark={isDark} compact />
                              <Field label="Jurusan" value={edu.major} onChange={(v: string) => {
                                const newEdu = [...tempData.education];
                                newEdu[idx].major = v;
                                setTempData({...tempData, education: newEdu});
                              }} isDark={isDark} compact />
                              <Field label="Lokasi" value={edu.location} onChange={(v: string) => {
                                const newEdu = [...tempData.education];
                                newEdu[idx].location = v;
                                setTempData({...tempData, education: newEdu});
                              }} isDark={isDark} compact />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'settings' && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold mb-6">Pengaturan Akses Panel</h3>
                      <form onSubmit={handleChangePassword} className={`p-8 rounded-2xl border ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
                        <p className="text-sm text-neutral-500 mb-8">Ubah kredensial login admin untuk keamanan lebih lanjut.</p>
                        <div className="space-y-6">
                          <Field label="Username Baru" name="newUsername" defaultValue="admin" isDark={isDark} />
                          <Field label="Password Baru" name="newPassword" type="password" isDark={isDark} />
                          <button type="submit" className="w-full py-4 border-2 border-gold-500 text-gold-500 font-bold rounded-xl hover:bg-gold-500 hover:text-neutral-950 transition-all">
                            Perbaharui Kredensial
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        {isLoggedIn && (
          <div className={`p-6 border-t flex justify-end gap-4 ${isDark ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-100 bg-white'}`}>
            <button 
              disabled={isSaving}
              onClick={handleSave}
              className="flex items-center gap-3 px-8 py-4 bg-gold-500 text-neutral-950 font-bold rounded-xl hover:bg-gold-400 transition-all shadow-xl shadow-gold-500/20 disabled:opacity-50"
            >
              <Save size={20} />
              {isSaving ? 'Menyimpan...' : 'Simpan Semua Perubahan'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FileUpload({ isDark, accept, icon, onUpload, value, label }: any) {
  const [isDragging, setIsDragging] = useState(false);
  const inputId = `upload-${Math.random().toString(36).substr(2, 9)}`;

  const handleFile = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpload?.(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
      }}
      className={`relative border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all ${isDragging ? 'border-gold-500 bg-gold-500/5' : ''} ${isDark ? 'border-neutral-800 bg-neutral-900/50' : 'border-neutral-200 bg-neutral-50'}`}
    >
      {value ? (
        <div className="relative group">
          {accept.includes('image') && value.startsWith('data:image') ? (
            <img src={value} alt="Preview" className="w-16 h-16 rounded-lg object-cover border border-gold-500/50" />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-500">
              {icon}
            </div>
          )}
          <div className="absolute inset-0 bg-neutral-950/40 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none">
            <Upload size={16} className="text-white" />
          </div>
        </div>
      ) : (
        <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500">
          {icon}
        </div>
      )}
      <div className="text-center">
        <p className="text-xs font-bold">{label || 'Lepaskan file di sini'}</p>
      </div>
      <input 
        type="file" 
        id={inputId} 
        className="hidden" 
        accept={accept}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      <button 
        type="button"
        onClick={() => document.getElementById(inputId)?.click()}
        className="px-3 py-1.5 bg-neutral-800 text-white text-[10px] font-bold rounded-lg hover:bg-neutral-700 transition-colors"
      >
        Pilih File
      </button>
    </div>
  );
}

function Field({ label, value, defaultValue, type = 'text', onChange, isDark, compact = false, name }: any) {
  const inputClasses = `w-full ${compact ? 'p-3' : 'p-4'} rounded-xl border focus:outline-none focus:border-gold-500 transition-all ${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-neutral-200'}`;
  
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 ml-1 block">{label}</label>
      {type === 'textarea' ? (
        <textarea 
          value={value} 
          onChange={(e) => onChange?.(e.target.value)} 
          className={`${inputClasses} resize-none min-h-[100px]`}
        />
      ) : (
        <input 
          name={name}
          type={type} 
          value={value} 
          defaultValue={defaultValue}
          onChange={(e) => onChange?.(e.target.value)} 
          className={inputClasses} 
        />
      )}
    </div>
  );
}

const skillIconMap: { [key: string]: string } = {
  'social media': '📱',
  'instagram': '📸',
  'facebook': '👥',
  'tiktok': '🎵',
  'youtube': '🎥',
  'design': '🎨',
  'graphic': '🎨',
  'illustrator': '🖌️',
  'photoshop': '🖼️',
  'figma': '💠',
  'writing': '✍️',
  'copywriting': '📝',
  'content': '📄',
  'video': '🎬',
  'editing': '✂️',
  'marketing': '📈',
  'seo': '🔍',
  'ads': '💰',
  'code': '💻',
  'web': '🌐',
  'react': '⚛️',
  'javascript': '🟨',
  'python': '🐍',
  'ui': '📐',
  'ux': '🧠',
  'english': '🇬🇧',
  'translation': '🔤',
  'photography': '📷',
  'branding': '🏷️',
  'strategy': '🎯',
  'management': '💼',
  'communication': '🗣️',
};

function getSuggestedIcon(name: string): string | null {
  const lowerName = name.toLowerCase();
  for (const [key, icon] of Object.entries(skillIconMap)) {
    if (lowerName.includes(key)) return icon;
  }
  return null;
}
