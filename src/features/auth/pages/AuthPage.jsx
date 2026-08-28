import React, { useState, useContext } from 'react';
import { Briefcase, ArrowLeft, Mail, Lock, User, Target, Loader2 } from 'lucide-react';
import { AuthContext } from '../../../context/AuthContext';
import loginImage from '../../../assets/login_image.png';

const AuthPage = ({ onSuccess, onBack, initialRole = 'client' }) => {
  const { login, register } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    roleOption: initialRole // 'client' or 'worker'
  });

  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        if (!formData.email || !formData.password) {
          setError('Please enter email and password.');
          setIsLoading(false);
          return;
        }
        await login(formData.email, formData.password);
        onSuccess();
      } else {
        if (!formData.name || !formData.email || !formData.password) {
          setError('Please fill all required fields.');
          setIsLoading(false);
          return;
        }
        await register(formData.name, formData.email, formData.password, formData.roleOption);
        onSuccess();
      }
    } catch (err) {
      if (err.code === 'ERR_NETWORK' || err.message === 'Network Error' || err.code === 'ECONNREFUSED') {
        setError('Cannot connect to server. Please ensure the backend is running on port 5000.');
      } else {
        setError(err.response?.data?.message || err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black p-0 lg:p-6">
      <div className="w-full min-h-screen lg:min-h-0 lg:h-[800px] lg:max-w-6xl bg-theme-bg grid grid-cols-1 lg:grid-cols-2 lg:rounded-2xl overflow-hidden shadow-2xl relative">

        {/* Left Panel: Branding & Visuals */}
        <div className="hidden lg:flex relative overflow-hidden items-center justify-center">
          {/* Transparent Image filling the container */}
          <img 
            src={loginImage} 
            alt="Professionals Collage" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        </div>

        {/* Right Panel: Form Area */}
        <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-24 bg-card relative shadow-2xl z-10">

          {/* Back Button */}
          <button
            onClick={onBack}
            className="absolute top-8 left-8 flex items-center gap-2 text-theme-muted hover:text-coral transition-colors font-medium"
          >
            <ArrowLeft size={20} /> Back to Home
          </button>

          <div className="max-w-md w-full mx-auto space-y-8 mt-12">

            {/* Header */}
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-bold text-espresso mb-2">
                {isLogin ? 'Sign in to your account' : 'Create an account'}
              </h2>
              <p className="text-theme-muted text-sm sm:text-base">
                {isLogin ? 'Enter your credentials to access your dashboard.' : 'Join the platform and start connecting.'}
              </p>
            </div>

            {error && <div className="p-4 bg-coral/10 border border-coral/30 text-coral rounded-xl text-sm font-medium">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-5">

              {!isLogin && (

                  <div>
                    <label className="block text-sm font-medium text-espresso mb-1">
                      {formData.roleOption === 'client' ? 'Full Name / Company' : 'Full Name'}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-theme-muted" size={18} />
                      <input type="text" name="name" onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-theme-bg border border-theme-border rounded-xl focus:outline-none focus:border-peach focus:ring-2 focus:ring-peach/30 text-espresso transition-all" placeholder="John Doe" required />
                    </div>
                  </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-espresso mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-theme-muted" size={18} />
                  <input type="email" name="email" onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-theme-bg border border-theme-border rounded-xl focus:outline-none focus:border-peach focus:ring-2 focus:ring-peach/30 text-espresso transition-all" placeholder="you@example.com" required />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-espresso">Password</label>
                  {isLogin && <a href="#" className="text-sm font-semibold text-coral hover:underline">Forgot Password?</a>}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-theme-muted" size={18} />
                  <input type="password" name="password" onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-theme-bg border border-theme-border rounded-xl focus:outline-none focus:border-peach focus:ring-2 focus:ring-peach/30 text-espresso transition-all" placeholder="••••••••" required />
                </div>
              </div>

              <button disabled={isLoading} type="submit" className="w-full flex justify-center items-center gap-2 bg-coral hover:opacity-90 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-coral/30 disabled:opacity-70 disabled:cursor-not-allowed">
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : null}
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-theme-border"></div>
              <span className="flex-shrink-0 mx-4 text-theme-muted text-sm font-medium">Or continue with</span>
              <div className="flex-grow border-t border-theme-border"></div>
            </div>

            {/* Social/Guest Logins */}
            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="flex justify-center items-center gap-2 py-3 px-4 border border-theme-border rounded-xl text-espresso font-semibold hover:bg-theme-bg transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>
              <button
                type="button"
                onClick={() => alert('Guest login is disabled. Please create an account.')}
                className="flex justify-center items-center gap-2 py-3 px-4 border border-theme-border rounded-xl text-espresso font-semibold hover:bg-theme-bg transition-colors"
              >
                Guest
              </button>
            </div>

            {/* Toggle Login/Register */}
            <p className="text-center text-sm text-theme-muted mt-8">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                className="text-coral font-bold hover:underline outline-none transition-colors"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
