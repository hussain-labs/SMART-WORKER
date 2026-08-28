import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Link as LinkIcon, Code, Image as ImageIcon, ArrowLeft } from 'lucide-react';

const ManagePortfolioPage = ({ user, onSave, onBack }) => {
  const [projects, setProjects] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    coverImage: '',
    liveUrl: '',
    githubUrl: '',
    tags: ''
  });

  useEffect(() => {
    if (user) {
      setProjects(user?.portfolio || []);
      resetForm();
    }
  }, [user]);

  const resetForm = () => {
    setFormData({
      title: '', category: '', description: '', coverImage: '', liveUrl: '', githubUrl: '', tags: ''
    });
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    const proj = projects[index];
    setFormData({
      title: proj.title || '',
      category: proj.category || '',
      description: proj.description || '',
      coverImage: proj.coverImage || '',
      liveUrl: proj.liveUrl || '',
      githubUrl: proj.githubUrl || '',
      tags: (proj.tags || []).join(', ')
    });
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
    onSave({ ...user, portfolio: updated }); // Auto-save on delete
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    let updated;
    if (editingIndex !== null) {
      updated = [...projects];
      updated[editingIndex] = newProject;
    } else {
      updated = [...projects, newProject];
    }
    setProjects(updated);
    onSave({ ...user, portfolio: updated }); // Auto-save on form submit
    resetForm();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium text-theme-primary bg-theme-card/70 hover:bg-theme-card border border-theme-border hover:border-theme-accent hover:text-theme-accent shadow-sm transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <h2 className="text-2xl font-bold text-theme-primary">Manage Portfolio Projects</h2>
        </div>
      </div>

      {/* Main 2-Column Container */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Project Showcase & List) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-theme-primary text-xl">Your Projects ({projects.length})</h3>
          </div>
          
          {projects.length === 0 ? (
            <div className="bg-theme-bg/50 border border-dashed border-theme-border rounded-2xl p-10 text-center flex flex-col items-center">
              <ImageIcon size={48} className="text-theme-muted/50 mb-4" />
              <p className="text-theme-primary font-semibold text-lg">No projects added yet.</p>
              <p className="text-sm text-theme-muted mt-1">Use the form on the right to showcase your work.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((proj, idx) => (
                <div key={idx} className="bg-theme-card border border-theme-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
                  <div className="h-40 overflow-hidden bg-theme-bg border-b border-theme-border relative">
                    {proj.coverImage ? (
                      <img src={proj.coverImage} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><ImageIcon className="text-theme-muted/50" size={32} /></div>
                    )}
                    <span className="absolute top-2 right-2 bg-theme-card/95 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-theme-primary uppercase tracking-wider shadow-sm">{proj.category}</span>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h4 className="font-bold text-theme-primary mb-1 line-clamp-1">{proj.title}</h4>
                    <p className="text-sm text-theme-muted line-clamp-2 mb-3 flex-1">{proj.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-theme-border mt-auto">
                      <div className="flex gap-3">
                        <button onClick={() => handleEdit(idx)} className="text-sm font-semibold text-theme-accent hover:underline">Edit</button>
                        <button onClick={() => handleDelete(idx)} className="text-sm font-semibold text-red-500 hover:underline">Delete</button>
                      </div>
                      {proj.liveUrl && (
                         <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-theme-primary hover:opacity-70 text-xs font-bold flex items-center gap-1 transition-colors">
                           <LinkIcon size={14} /> Live
                         </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column (Add / Edit Project Form Card) */}
        <div className="lg:col-span-5 lg:sticky lg:top-6">
          <div className="bg-theme-card p-6 sm:p-8 rounded-2xl border border-theme-border shadow-sm">
            <h3 className="font-bold text-theme-primary text-xl mb-6 flex items-center gap-2">
              {editingIndex !== null ? 'Edit Project Details' : 'Add New Project'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-theme-primary mb-1.5">Project Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 bg-theme-bg/50 border border-theme-border rounded-xl focus:ring-2 focus:ring-theme-accent/20 focus:border-theme-accent focus:outline-none transition-all text-theme-primary" placeholder="e.g. E-Commerce Platform" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-theme-primary mb-1.5">Category / Role</label>
                <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 bg-theme-bg/50 border border-theme-border rounded-xl focus:ring-2 focus:ring-theme-accent/20 focus:border-theme-accent focus:outline-none transition-all text-theme-primary" placeholder="e.g. Web Development" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-theme-primary mb-1.5">Description</label>
                <textarea required rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 bg-theme-bg/50 border border-theme-border rounded-xl focus:ring-2 focus:ring-theme-accent/20 focus:border-theme-accent focus:outline-none transition-all text-theme-primary resize-none custom-scrollbar" placeholder="Brief summary of the project..."></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-theme-primary mb-1.5">Cover Image URL</label>
                <div className="relative">
                  <ImageIcon size={18} className="absolute left-3.5 top-3.5 text-theme-muted" />
                  <input type="url" value={formData.coverImage} onChange={e => setFormData({...formData, coverImage: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-theme-bg/50 border border-theme-border rounded-xl focus:ring-2 focus:ring-theme-accent/20 focus:border-theme-accent focus:outline-none transition-all text-theme-primary" placeholder="https://..." />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-theme-primary mb-1.5"><LinkIcon size={14} className="inline mr-1"/> Live Demo URL</label>
                  <input type="url" value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} className="w-full px-4 py-3 bg-theme-bg/50 border border-theme-border rounded-xl focus:ring-2 focus:ring-theme-accent/20 focus:border-theme-accent focus:outline-none transition-all text-theme-primary" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-theme-primary mb-1.5"><Code size={14} className="inline mr-1"/> Repo / Source</label>
                  <input type="url" value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="w-full px-4 py-3 bg-theme-bg/50 border border-theme-border rounded-xl focus:ring-2 focus:ring-theme-accent/20 focus:border-theme-accent focus:outline-none transition-all text-theme-primary" placeholder="https://github.com/..." />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-theme-primary mb-1.5">Tech Stack (comma separated)</label>
                <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full px-4 py-3 bg-theme-bg/50 border border-theme-border rounded-xl focus:ring-2 focus:ring-theme-accent/20 focus:border-theme-accent focus:outline-none transition-all text-theme-primary" placeholder="React, Tailwind, Node.js" />
              </div>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button type="submit" className="flex-1 bg-theme-primary hover:opacity-90 text-white font-bold py-3.5 rounded-xl transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2">
                  {editingIndex !== null ? 'Save Changes' : <><Plus size={20} /> Add Project</>}
                </button>
                {editingIndex !== null && (
                  <button type="button" onClick={resetForm} className="px-6 py-3.5 bg-theme-card border border-theme-border text-theme-primary font-bold rounded-xl hover:bg-theme-bg transition-all active:scale-95">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePortfolioPage;
