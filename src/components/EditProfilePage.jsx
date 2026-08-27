import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Briefcase, FileText, Settings, XCircle } from 'lucide-react';

const EditProfilePage = ({ profileData, onSave, onBack }) => {
  const isClient = profileData?.role === 'client';

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    rate: '',
    bio: '',
    skills: [],
    location: '',
    industry: '',
    isAvailable: true
  });
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData.name || '',
        title: profileData.title || '',
        rate: profileData.rate || '',
        bio: profileData.bio || '',
        skills: profileData.skills || [],
        location: profileData.location || '',
        industry: profileData.industry || '',
        isAvailable: profileData.isAvailable ?? true
      });
    }
  }, [profileData]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { ...formData };
    onSave(updatedData);
    onBack();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Navigation */}
      <div className="flex items-center gap-4 mb-4">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium text-theme-primary bg-theme-card/70 hover:bg-theme-card border border-theme-border hover:border-theme-accent hover:text-theme-accent shadow-sm transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-theme-card p-8 sm:p-10 rounded-2xl shadow-sm border border-theme-border">
        <div className="border-b border-theme-border pb-6 mb-8">
          <h2 className="text-3xl font-extrabold text-theme-primary flex items-center gap-3">
            <User className="text-theme-accent" size={32} /> Edit Professional Profile
          </h2>
          <p className="text-theme-muted mt-2">Update your details to stand out and attract the best opportunities.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* Section: Personal Details */}
          <section>
            <h3 className="text-xl font-bold text-theme-primary mb-5 flex items-center gap-2">
              <Briefcase className="text-theme-accent" size={20} /> Personal Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-theme-primary mb-1.5">
                  {isClient ? 'Company / Full Name' : 'Full Name'}
                </label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3.5 bg-theme-bg/50 border border-theme-border rounded-xl focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/20 text-theme-primary transition-all"
                  required 
                />
              </div>
              
              {isClient ? (
                <div>
                  <label className="block text-sm font-semibold text-theme-primary mb-1.5">Industry / Category</label>
                  <input 
                    type="text" 
                    name="industry" 
                    value={formData.industry} 
                    onChange={handleChange} 
                    placeholder="e.g. Technology & Software"
                    className="w-full px-4 py-3.5 bg-theme-bg/50 border border-theme-border rounded-xl focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/20 text-theme-primary transition-all"
                    required 
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-theme-primary mb-1.5">Professional Title</label>
                  <input 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    placeholder="e.g. React Developer"
                    className="w-full px-4 py-3.5 bg-theme-bg/50 border border-theme-border rounded-xl focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/20 text-theme-primary transition-all"
                    required 
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-semibold text-theme-primary mb-1.5">Location</label>
                <input 
                  type="text" 
                  name="location" 
                  value={formData.location} 
                  onChange={handleChange} 
                  placeholder="e.g. Remote, Worldwide"
                  className="w-full px-4 py-3.5 bg-theme-bg/50 border border-theme-border rounded-xl focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/20 text-theme-primary transition-all"
                />
              </div>
              
              {!isClient && (
                <div>
                  <label className="block text-sm font-semibold text-theme-primary mb-1.5">Hourly Rate ($)</label>
                  <input 
                    type="number" 
                    name="rate" 
                    value={formData.rate} 
                    onChange={handleChange} 
                    placeholder="e.g. 50"
                    className="w-full px-4 py-3.5 bg-theme-bg/50 border border-theme-border rounded-xl focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/20 text-theme-primary transition-all"
                    required 
                  />
                </div>
              )}
            </div>
          </section>

          {/* Section: Bio / About */}
          <section>
            <h3 className="text-xl font-bold text-theme-primary mb-5 flex items-center gap-2">
              <FileText className="text-theme-accent" size={20} /> 
              {isClient ? 'Company Description' : 'About Me'}
            </h3>
            <textarea 
              name="bio" 
              value={formData.bio} 
              onChange={handleChange} 
              rows="5"
              placeholder={isClient ? "Tell freelancers about your company and goals..." : "Tell clients about your experience, approach, and what makes you unique..."}
              className="w-full px-4 py-3.5 bg-theme-bg/50 border border-theme-border rounded-xl focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/20 text-theme-primary transition-all resize-none custom-scrollbar"
              required 
            ></textarea>
          </section>

          {/* Section: Skills & Preferences */}
          {!isClient && (
            <section>
              <h3 className="text-xl font-bold text-theme-primary mb-5 flex items-center gap-2">
                <Settings className="text-theme-accent" size={20} /> Skills & Preferences
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-theme-primary mb-2">Skills (Add and press Enter)</label>
                  <div className="flex gap-2 mb-3">
                    <input 
                      type="text"
                      placeholder="e.g. React.js, UI/UX"
                      className="flex-1 p-3.5 bg-theme-bg/50 border border-theme-border rounded-xl focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/20 transition-all text-theme-primary placeholder-muted"
                      value={skillInput}
                      onChange={e => setSkillInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                    />
                    <button 
                      type="button" 
                      onClick={handleAddSkill}
                      className="bg-theme-bg border border-theme-border text-theme-primary font-semibold px-6 rounded-xl hover:bg-theme-accent/20 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, idx) => (
                      <span key={idx} className="bg-theme-accent/20 text-theme-primary font-semibold text-sm px-4 py-2 rounded-full border border-theme-accent flex items-center gap-2">
                        {skill}
                        <button type="button" onClick={() => handleRemoveSkill(skill)} className="text-theme-accent hover:text-red-500"><XCircle size={16}/></button>
                      </span>
                    ))}
                    {formData.skills.length === 0 && <span className="text-sm text-theme-muted italic">No skills added yet.</span>}
                  </div>
                </div>

                <div className="flex items-center justify-between bg-theme-bg/30 p-5 rounded-xl border border-theme-border">
                  <div>
                    <p className="font-bold text-theme-primary text-lg">Availability Status</p>
                    <p className="text-sm text-theme-muted mt-0.5">Let clients know if you are currently open to new jobs.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleChange} className="sr-only peer" />
                    <div className="w-14 h-7 bg-theme-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-theme-card after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              </div>
            </section>
          )}

          {/* Action Footer */}
          <div className="pt-8 border-t border-theme-border flex justify-end gap-4 sticky bottom-4 bg-theme-card z-10 py-4">
            <button 
              type="button" 
              onClick={onBack}
              className="px-8 py-3.5 bg-theme-card border border-theme-border text-theme-primary font-bold rounded-xl hover:bg-theme-bg transition-all active:scale-95"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-8 py-3.5 bg-theme-primary hover:opacity-90 text-white rounded-xl font-bold transition-all active:scale-95 shadow-sm"
            >
              Save Changes
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
