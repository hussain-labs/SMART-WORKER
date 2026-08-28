import React, { useState } from 'react';
import { Briefcase, PlusCircle, XCircle, ArrowLeft } from 'lucide-react';

const PostJobPage = ({ onBack, client, onPostJob }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Development',
    description: '',
    budgetType: 'Fixed Price',
    budget: '',
    duration: '1-2 weeks',
    skills: []
  });
  const [skillInput, setSkillInput] = useState('');

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
    onPostJob({
      ...formData,
      clientId: client._id || client.email || client.name,
      clientName: client.name,
      clientIndustry: client.industry || 'Unknown Industry'
    });
    alert('Job posted successfully! 🎉');
    onBack();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium text-theme-primary bg-theme-card/70 hover:bg-theme-card border border-theme-border hover:border-theme-accent hover:text-theme-accent shadow-sm transition-all duration-200 cursor-pointer mb-2"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      {/* Main Container */}
      <div className="max-w-3xl mx-auto bg-theme-card p-8 rounded-2xl shadow-sm border border-theme-border">
        <div className="border-b border-theme-border pb-6 mb-6">
          <h2 className="text-3xl font-extrabold text-theme-primary flex items-center gap-3">
            <Briefcase className="text-theme-accent" size={32} /> Post a New Job
          </h2>
          <p className="text-theme-muted mt-2">Fill out the details below to find the perfect talent for your project.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-theme-primary mb-1">Job Title</label>
              <input 
                required
                type="text"
                placeholder="e.g. Full-Stack MERN Developer for E-Commerce App"
                className="w-full p-3.5 bg-theme-bg/30 border border-theme-border rounded-xl focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/20 transition-all text-theme-primary placeholder-muted"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-theme-primary mb-1">Category</label>
                <select 
                  className="w-full p-3.5 bg-theme-bg/30 border border-theme-border rounded-xl focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/20 transition-all text-theme-primary"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option>Web Development</option>
                  <option>UI/UX Design</option>
                  <option>Video Editing</option>
                  <option>AI / Prompts</option>
                  <option>Marketing</option>
                  <option>Mobile Apps</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-theme-primary mb-1">Project Duration</label>
                <select 
                  className="w-full p-3.5 bg-theme-bg/30 border border-theme-border rounded-xl focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/20 transition-all text-theme-primary"
                  value={formData.duration}
                  onChange={e => setFormData({...formData, duration: e.target.value})}
                >
                  <option>Less than 1 week</option>
                  <option>1-2 weeks</option>
                  <option>1-3 months</option>
                  <option>3-6 months</option>
                  <option>More than 6 months</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-theme-primary mb-1">Detailed Description / Scope</label>
              <textarea 
                required
                rows={5}
                placeholder="Describe your project, deliverables, and any specific requirements..."
                className="w-full p-3.5 bg-theme-bg/30 border border-theme-border rounded-xl focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/20 transition-all text-theme-primary placeholder-muted resize-none custom-scrollbar"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold text-theme-primary mb-1">Required Skills</label>
              <div className="flex gap-2 mb-3">
                <input 
                  type="text"
                  placeholder="e.g. React.js, Tailwind"
                  className="flex-1 p-3.5 bg-theme-bg/30 border border-theme-border rounded-xl focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/20 transition-all text-theme-primary placeholder-muted"
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
                  <span key={idx} className="bg-theme-accent/20 text-theme-primary font-semibold text-sm px-3 py-1.5 rounded-full border border-theme-accent flex items-center gap-1.5">
                    {skill}
                    <button type="button" onClick={() => handleRemoveSkill(skill)} className="text-theme-accent hover:text-red-500"><XCircle size={14}/></button>
                  </span>
                ))}
                {formData.skills.length === 0 && <span className="text-sm text-theme-muted italic">No skills added yet.</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div>
                <label className="block text-sm font-semibold text-theme-primary mb-1">Budget Type</label>
                <div className="flex bg-theme-bg p-1.5 rounded-xl border border-theme-border">
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, budgetType: 'Fixed Price'})}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-colors ${formData.budgetType === 'Fixed Price' ? 'bg-theme-card shadow-sm text-theme-primary' : 'text-theme-muted hover:text-theme-primary'}`}
                  >
                    Fixed Price
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, budgetType: 'Hourly Rate'})}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-colors ${formData.budgetType === 'Hourly Rate' ? 'bg-theme-card shadow-sm text-theme-primary' : 'text-theme-muted hover:text-theme-primary'}`}
                  >
                    Hourly Rate
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-theme-primary mb-1">{formData.budgetType === 'Fixed Price' ? 'Estimated Budget ($)' : 'Hourly Rate ($/hr)'}</label>
                <input 
                  required
                  type="number"
                  min="5"
                  placeholder={formData.budgetType === 'Fixed Price' ? 'e.g. 500' : 'e.g. 25'}
                  className="w-full p-3.5 bg-theme-bg/30 border border-theme-border rounded-xl focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/20 transition-all text-theme-primary placeholder-muted"
                  value={formData.budget}
                  onChange={e => setFormData({...formData, budget: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-theme-border flex justify-end gap-4 sticky bottom-4 bg-theme-card z-10 py-4">
            <button 
              type="button" 
              onClick={onBack} 
              className="px-8 py-3 bg-theme-card border border-theme-border text-theme-primary font-bold rounded-xl hover:bg-theme-bg transition-colors active:scale-95"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-8 py-3 bg-theme-primary text-white font-bold rounded-xl hover:opacity-90 shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <PlusCircle size={20} /> Publish Job Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJobPage;
