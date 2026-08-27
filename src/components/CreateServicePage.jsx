import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';

const initialPackageState = {
  title: '',
  description: '',
  deliveryDays: 1,
  revisions: '1',
  price: 50,
  features: ['']
};

const CreateServicePage = ({ worker, onSave, onBack }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Development',
    coverImage: '',
    description: '',
  });

  const [packages, setPackages] = useState({
    basic: { ...initialPackageState },
    standard: { ...initialPackageState, price: 100 },
    premium: { ...initialPackageState, price: 200 }
  });

  const [activeTab, setActiveTab] = useState('basic');

  const handlePackageChange = (tier, field, value) => {
    setPackages(prev => ({
      ...prev,
      [tier]: { ...prev[tier], [field]: value }
    }));
  };

  const handleFeatureChange = (tier, index, value) => {
    const newFeatures = [...packages[tier].features];
    newFeatures[index] = value;
    handlePackageChange(tier, 'features', newFeatures);
  };

  const addFeature = (tier) => {
    const newFeatures = [...packages[tier].features, ''];
    handlePackageChange(tier, 'features', newFeatures);
  };

  const removeFeature = (tier, index) => {
    const newFeatures = packages[tier].features.filter((_, i) => i !== index);
    handlePackageChange(tier, 'features', newFeatures);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clean empty features
    const cleanedPackages = { ...packages };
    Object.keys(cleanedPackages).forEach(tier => {
      cleanedPackages[tier].features = cleanedPackages[tier].features.filter(f => f.trim() !== '');
    });

    const newService = {
      ...formData,
      workerId: worker._id || worker.email || worker.name,
      workerName: worker.name,
      workerAvatar: worker.avatarBase64 || '',
      rating: 0,
      reviewsCount: 0,
      level: worker.title || 'New Seller',
      packages: cleanedPackages
    };

    onSave(newService);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium text-theme-primary bg-theme-card/70 hover:bg-theme-card border border-theme-border hover:border-theme-accent hover:text-theme-accent shadow-sm transition-all duration-200 cursor-pointer mb-2"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <form onSubmit={handleSubmit} className="bg-theme-card rounded-2xl shadow-sm border border-theme-border overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-theme-border bg-theme-bg/30">
          <h2 className="text-2xl font-bold text-theme-primary">Create a New Service (Gig)</h2>
          <p className="text-theme-primary/70 mt-1">Define your service offering and pricing tiers.</p>
        </div>

        <div className="p-6 sm:p-8 space-y-8">

          {/* General Info */}
          <section className="space-y-6">
            <h3 className="text-xl font-bold text-theme-primary border-b border-theme-border pb-2">1. Overview</h3>

            <div>
              <label className="block text-sm font-bold text-theme-primary mb-2">Gig Title</label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="I will do something I'm really good at"
                className="w-full bg-theme-bg/50 border border-theme-border rounded-xl px-4 py-3 focus:outline-none focus:border-theme-accent text-theme-primary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-theme-primary">
                  Category
                </label>
                <input
                  type="text"
                  list="category-options"
                  name="category"
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Type any category (e.g. Web Development, 2D Animation...)"
                  className="w-full px-4 py-2.5 rounded-xl border border-theme-border bg-theme-card text-theme-primary placeholder-theme-primary/40 focus:outline-none focus:ring-2 focus:ring-theme-accent"
                  required
                />
                <datalist id="category-options">
                  <option value="Web Development" />
                  <option value="UI/UX Design" />
                  <option value="Video Editing" />
                  <option value="2D Animation" />
                  <option value="AI Services & Prompts" />
                  <option value="Digital Marketing" />
                  <option value="Voice Over" />
                </datalist>
              </div>
              <div>
                <label className="block text-sm font-bold text-theme-primary mb-2">Cover Image URL</label>
                <input
                  required
                  type="url"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-theme-bg/50 border border-theme-border rounded-xl px-4 py-3 focus:outline-none focus:border-theme-accent text-theme-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-theme-primary mb-2">Description</label>
              <textarea
                required
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Briefly describe your service, what's included, and why clients should choose you."
                className="w-full bg-theme-bg/50 border border-theme-border rounded-xl px-4 py-3 focus:outline-none focus:border-theme-accent text-theme-primary"
              />
            </div>
          </section>

          {/* Pricing Tiers */}
          <section className="space-y-6 pt-4">
            <h3 className="text-xl font-bold text-theme-primary border-b border-theme-border pb-2">2. Scope & Pricing</h3>

            <div className="border border-theme-border rounded-xl overflow-hidden">
              <div className="flex bg-theme-bg/50 border-b border-theme-border">
                {['basic', 'standard', 'premium'].map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setActiveTab(tier)}
                    className={`flex-1 py-3 text-center font-bold text-sm uppercase tracking-wider transition-colors ${activeTab === tier
                        ? 'bg-theme-card text-theme-accent border-b-2 border-b-theme-accent'
                        : 'text-theme-primary/60 hover:text-theme-primary hover:bg-theme-bg'
                      }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>

              <div className="p-6 bg-theme-card space-y-6">
                <div>
                  <label className="block text-sm font-bold text-theme-primary mb-2">Package Name</label>
                  <input
                    required
                    type="text"
                    value={packages[activeTab].title}
                    onChange={(e) => handlePackageChange(activeTab, 'title', e.target.value)}
                    placeholder={`E.g. ${activeTab === 'basic' ? 'Starter' : activeTab === 'standard' ? 'Pro' : 'Elite'} Package`}
                    className="w-full bg-theme-bg/50 border border-theme-border rounded-xl px-4 py-2.5 focus:outline-none focus:border-theme-accent text-theme-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-theme-primary mb-2">Short Description</label>
                  <textarea
                    required
                    rows={2}
                    value={packages[activeTab].description}
                    onChange={(e) => handlePackageChange(activeTab, 'description', e.target.value)}
                    placeholder="Summarize what this package includes."
                    className="w-full bg-theme-bg/50 border border-theme-border rounded-xl px-4 py-2.5 focus:outline-none focus:border-theme-accent text-theme-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-theme-primary mb-2">Delivery Time (Days)</label>
                    <input
                      required
                      type="number"
                      min="1"
                      value={packages[activeTab].deliveryDays}
                      onChange={(e) => handlePackageChange(activeTab, 'deliveryDays', Number(e.target.value))}
                      className="w-full bg-theme-bg/50 border border-theme-border rounded-xl px-4 py-2.5 focus:outline-none focus:border-theme-accent text-theme-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-theme-primary mb-2">Revisions</label>
                    <input
                      required
                      type="text"
                      value={packages[activeTab].revisions}
                      onChange={(e) => handlePackageChange(activeTab, 'revisions', e.target.value)}
                      placeholder="e.g. 1, 3, or Unlimited"
                      className="w-full bg-theme-bg/50 border border-theme-border rounded-xl px-4 py-2.5 focus:outline-none focus:border-theme-accent text-theme-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-theme-primary mb-2">Price ($)</label>
                    <input
                      required
                      type="number"
                      min="5"
                      value={packages[activeTab].price}
                      onChange={(e) => handlePackageChange(activeTab, 'price', Number(e.target.value))}
                      className="w-full bg-theme-bg/50 border border-theme-border rounded-xl px-4 py-2.5 focus:outline-none focus:border-theme-accent text-theme-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-theme-primary mb-3">Included Features</label>
                  {packages[activeTab].features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(activeTab, idx, e.target.value)}
                        placeholder="e.g. Source Code Included"
                        className="flex-1 bg-theme-bg/50 border border-theme-border rounded-xl px-4 py-2 focus:outline-none focus:border-theme-accent text-theme-primary"
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(activeTab, idx)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addFeature(activeTab)}
                    className="flex items-center gap-1 text-sm font-bold text-theme-accent hover:text-[#e67363] transition-colors mt-2"
                  >
                    <Plus size={16} /> Add Feature
                  </button>
                </div>

              </div>
            </div>
          </section>

        </div>

        <div className="p-6 bg-theme-bg/30 border-t border-theme-border flex justify-end">
          <button
            type="submit"
            className="bg-theme-primary hover:opacity-90 text-white font-bold py-3 px-8 rounded-xl shadow-sm transition-all active:scale-95 flex items-center gap-2"
          >
            <Save size={18} /> Save Service & Publish
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreateServicePage;
