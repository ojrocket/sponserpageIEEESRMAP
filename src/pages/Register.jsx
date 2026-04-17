import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', password:'', confirm:'' });
  const [showPwd, setShowPwd] = useState(false);
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const formTs = useRef(Date.now());
  const csrf = useRef(crypto.getRandomValues(new Uint8Array(32)).reduce((s,b) => s+b.toString(16).padStart(2,'0'), ''));

  const set = (k) => (e) => setForm(f => ({...f, [k]: k==='firstName'||k==='lastName' ? e.target.value.replace(/[^A-Za-z\s\-']/g,'') : e.target.value }));
  const sanitize = (s) => { const d=document.createElement('div'); d.textContent=s; return d.innerHTML; };
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const checks = { length:form.password.length>=12, upper:/[A-Z]/.test(form.password), number:/[0-9]/.test(form.password), special:/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(form.password) };
  const score = Object.values(checks).filter(Boolean).length;
  const pwdMatch = form.confirm === form.password && form.confirm.length > 0;
  const canSubmit = form.firstName && form.lastName && validEmail && score===4 && pwdMatch && terms && !loading;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    if (Date.now() - formTs.current < 3000) return;
    setLoading(true);
    setTimeout(() => {
      const user = { email:sanitize(form.email.trim()), firstName:sanitize(form.firstName.trim()), lastName:sanitize(form.lastName.trim()), role:'member', registered:new Date().toISOString() };
      sessionStorage.setItem('ieee_auth_token', csrf.current);
      sessionStorage.setItem('ieee_user', JSON.stringify(user));
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="auth-page page-transition">
      <div className="auth-branding">
        <div className="auth-orb orb1" /><div className="auth-orb orb2" /><div className="auth-grid-overlay" />
        <div className="branding-content">
          <h1>Join the IEEE Community</h1>
          <p>Create your account and unlock access to world-class research, professional tools, and a global network.</p>
          <div className="benefit-list">
            <div className="benefit-item"><div className="benefit-icon">📚</div><div className="benefit-text"><strong>IEEE Xplore Access</strong> — Browse millions of research papers.</div></div>
            <div className="benefit-item"><div className="benefit-icon">🌐</div><div className="benefit-text"><strong>Global Network</strong> — Connect with 400,000+ professionals.</div></div>
            <div className="benefit-item"><div className="benefit-icon">🎓</div><div className="benefit-text"><strong>Professional Development</strong> — Certifications and courses.</div></div>
            <div className="benefit-item"><div className="benefit-icon">🔐</div><div className="benefit-text"><strong>Enterprise Security</strong> — Data encrypted at every layer.</div></div>
          </div>
        </div>
      </div>

      <div className="auth-form-panel" style={{ flex:1.1 }}>
        <div className="auth-card" style={{ maxWidth:'480px' }}>
          <div className="auth-header">
            <div className="auth-logo"><div className="logo-icon-sm">IE</div><span>IEEE</span></div>
            <h2>Create your account</h2>
            <p>Fill in your details to get started</p>
          </div>

          <div className="progress-steps">
            <div className="step active"><div className="step-dot">1</div><div className="step-label">Details</div></div>
            <div className="step"><div className="step-dot">2</div><div className="step-label">Security</div></div>
            <div className="step"><div className="step-dot">3</div><div className="step-label">Verify</div></div>
          </div>

          <div className="security-notice"><span>🔒</span><p>Your information is encrypted with AES-256. We never share your data.</p></div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="flex gap-4">
              <div className="form-group" style={{ flex:1 }}><label className="form-label">First Name</label><input className="form-input" style={{ paddingLeft:'16px' }} placeholder="John" value={form.firstName} onChange={set('firstName')} maxLength={50} /></div>
              <div className="form-group" style={{ flex:1 }}><label className="form-label">Last Name</label><input className="form-input" style={{ paddingLeft:'16px' }} placeholder="Doe" value={form.lastName} onChange={set('lastName')} maxLength={50} /></div>
            </div>

            <div className="form-group"><label className="form-label">Email Address</label>
              <div className="input-icon-wrap"><span className="input-icon-left">📧</span><input type="email" className="form-input" placeholder="john@university.edu" value={form.email} onChange={set('email')} maxLength={254} /></div>
              {form.email && !validEmail && <div className="form-error">Please enter a valid email</div>}
            </div>

            <div className="form-group"><label className="form-label">Password</label>
              <div className="input-icon-wrap"><span className="input-icon-left">🔑</span><input type={showPwd?'text':'password'} className="form-input" placeholder="Create a strong password" value={form.password} onChange={set('password')} maxLength={128} /><button type="button" className="input-action-btn" onClick={() => setShowPwd(!showPwd)}>{showPwd?'🙈':'👁️'}</button></div>
              <div className="pwd-strength">{[0,1,2,3].map(i => <div key={i} className={`pwd-bar ${i<score ? (score<=1?'weak':score<=2?'warning':'active') : ''}`} />)}</div>
              <div className="pwd-reqs">
                {[['length','At least 12 characters'],['upper','One uppercase letter'],['number','One number'],['special','One special character']].map(([k,label]) => (
                  <div key={k} className={`pwd-req ${checks[k]?'met':''}`}><span className="check-circle">✓</span>{label}</div>
                ))}
              </div>
            </div>

            <div className="form-group"><label className="form-label">Confirm Password</label>
              <div className="input-icon-wrap"><span className="input-icon-left">🔐</span><input type="password" className="form-input" placeholder="Re-enter your password" value={form.confirm} onChange={set('confirm')} /></div>
              {form.confirm && !pwdMatch && <div className="form-error">Passwords do not match</div>}
            </div>

            <div className="terms-check">
              <input type="checkbox" checked={terms} onChange={e => setTerms(e.target.checked)} />
              <label>I agree to the <a href="#">Terms of Service</a>, <a href="#">Privacy Policy</a>, and <a href="#">Cookie Policy</a>.</label>
            </div>

            <button type="submit" className="btn-submit" disabled={!canSubmit}>{loading ? '⏳ Creating account...' : 'Create Account'}</button>
          </form>

          <div className="auth-divider"><span>or sign up with</span></div>
          <div className="flex gap-3"><button className="social-btn" style={{ flex:1 }}>🔷 Microsoft</button><button className="social-btn" style={{ flex:1 }}>🟢 Google</button></div>
          <div className="auth-footer">Already have an account? <Link to="/login">Sign In</Link></div>
        </div>
      </div>
    </div>
  );
};
export default Register;
