import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [timer, setTimer] = useState(30 * 60);

  // Auth guard
  useEffect(() => {
    const token = sessionStorage.getItem('ieee_auth_token');
    const userData = sessionStorage.getItem('ieee_user');
    if (!token || !userData) { navigate('/login'); return; }
    try { setUser(JSON.parse(userData)); } catch { navigate('/login'); }
    if (window.top !== window.self) window.top.location = window.self.location;
  }, [navigate]);

  // Session timeout
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(t => { if (t <= 1) { sessionStorage.clear(); navigate('/login'); return 0; } return t - 1; });
    }, 1000);
    const reset = () => setTimer(30 * 60);
    ['click','keydown','mousemove'].forEach(e => document.addEventListener(e, reset, {passive:true}));
    return () => { clearInterval(interval); ['click','keydown','mousemove'].forEach(e => document.removeEventListener(e, reset)); };
  }, [navigate]);

  if (!user) return null;
  const name = user.firstName || user.email?.split('@')[0] || 'User';
  const h = new Date().getHours();
  const greeting = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  const mins = Math.floor(timer/60).toString().padStart(2,'0');
  const secs = (timer%60).toString().padStart(2,'0');

  return (
    <div className="dash-page page-transition">
      <aside className="dash-sidebar">
        <div className="dash-logo"><div className="logo-icon-sm">IE</div><span>IEEE</span></div>
        <div className="nav-sec"><div className="nav-sec-title">Main</div>
          <Link to="/dashboard" className="dash-nav active"><span className="ni">📊</span>Dashboard</Link>
          <a href="#" className="dash-nav"><span className="ni">📰</span>My Feed</a>
          <a href="#" className="dash-nav"><span className="ni">📚</span>Resources<span className="nav-badge-red">3</span></a>
        </div>
        <div className="nav-sec"><div className="nav-sec-title">Societies</div>
          <Link to="/societies/ai" className="dash-nav"><span className="ni">🧠</span>AI & ML</Link>
          <Link to="/societies/computer" className="dash-nav"><span className="ni">💻</span>Computer</Link>
          <Link to="/societies/power-energy" className="dash-nav"><span className="ni">⚡</span>Power & Energy</Link>
          <Link to="/societies/robotics" className="dash-nav"><span className="ni">🤖</span>Robotics</Link>
        </div>
        <div className="nav-sec"><div className="nav-sec-title">Account</div>
          <a href="#" className="dash-nav"><span className="ni">⚙️</span>Settings</a>
          <a href="#" className="dash-nav"><span className="ni">🔐</span>Security</a>
        </div>
        <div className="sidebar-foot">
          <div className="user-card-sm"><div className="user-av">{name.substring(0,2).toUpperCase()}</div><div><div className="un">{name}</div><div className="ur">IEEE Member</div></div></div>
        </div>
      </aside>

      <main className="dash-main">
        <div className="dash-header">
          <div><h1 className="dash-title">{greeting}, {name}</h1><p className="dash-sub">Here's what's happening with your IEEE membership.</p></div>
          <div className="flex gap-3 align-center">
            <div className="session-badge-green"><div className="pulse-green" />Secure Session</div>
            <span className="timer-text" style={{ color: timer < 300 ? '#EF4444' : '#10B981' }}>{mins}:{secs}</span>
            <button className="btn-logout" onClick={() => { sessionStorage.clear(); navigate('/login'); }}>🚪 Logout</button>
          </div>
        </div>

        <div className="session-bar-info">🔒 Session active · Encrypted with TLS 1.3 · Last login: <strong>{new Date(user.loginTime || user.registered || Date.now()).toLocaleString()}</strong></div>

        <div className="stat-cards-grid">
          {[{icon:'📄',val:'24',label:'Papers Accessed',change:'↑ 12% this month',color:'#00C2FF'},{icon:'🏛️',val:'3',label:'Active Societies',change:'↑ 1 new this quarter',color:'#0A66C2'},{icon:'🎓',val:'7',label:'Certifications',change:'↑ 2 completed',color:'#10B981'},{icon:'🌐',val:'156',label:'Network Connections',change:'↑ 8 this week',color:'#8B5CF6'}].map((s,i) => (
            <div className="dash-stat" key={i}><div className="stat-top-bar" style={{ background:`linear-gradient(90deg,${s.color},transparent)` }} /><div className="stat-icon-lg">{s.icon}</div><div className="stat-val">{s.val}</div><div className="stat-lbl">{s.label}</div><div className="stat-chg">{s.change}</div></div>
          ))}
        </div>

        <div className="content-grid-2">
          <div className="dash-panel">
            <div className="panel-head"><h3>Recent Activity</h3><a href="#">View All</a></div>
            {[{dot:'#00C2FF',text:'Accessed "Scaling Laws for Multi-Modal Models"',time:'2 hours ago'},{dot:'#10B981',text:'Completed "Intro to Quantum Computing" cert',time:'Yesterday'},{dot:'#0A66C2',text:'Joined IEEE Computer Society',time:'3 days ago'},{dot:'#8B5CF6',text:'Registered for Deep Learning Conference',time:'1 week ago'},{dot:'#F59E0B',text:'Membership renewal reminder sent',time:'2 weeks ago'}].map((a,i) => (
              <div className="activity-row" key={i}><div className="act-dot" style={{ background:a.dot }} /><div><div className="act-text">{a.text}</div><div className="act-time">{a.time}</div></div></div>
            ))}
          </div>
          <div className="flex-col gap-4" style={{ display:'flex',flexDirection:'column',gap:'24px' }}>
            <div className="dash-panel"><div className="panel-head"><h3>My Societies</h3></div>
              {[{to:'/societies/ai',icon:'🧠',bg:'rgba(0,194,255,0.1)',name:'AI & Machine Learning',role:'Active Member'},{to:'/societies/computer',icon:'💻',bg:'rgba(99,102,241,0.1)',name:'Computer Society',role:'Active Member'},{to:'/societies/robotics',icon:'🤖',bg:'rgba(239,68,68,0.1)',name:'Robotics & Automation',role:'Active Member'}].map((s,i) => (
                <Link to={s.to} className="society-row" key={i}><div className="soc-icon" style={{ background:s.bg }}>{s.icon}</div><div><div className="soc-name">{s.name}</div><div className="soc-role">{s.role}</div></div></Link>
              ))}
            </div>
            <div className="dash-panel"><div className="panel-head"><h3>Security Status</h3></div>
              {[{icon:'🔐',label:'Two-Factor Auth',desc:'Enabled via authenticator',badge:'Active',bc:'success'},{icon:'🔑',label:'Password Strength',desc:'Last changed 14 days ago',badge:'Strong',bc:'success'},{icon:'📱',label:'Active Sessions',desc:'1 device connected',badge:'1 Device',bc:'info'}].map((s,i) => (
                <div className="sec-row" key={i}><div className="sec-left"><span>{s.icon}</span><div><div className="sec-label">{s.label}</div><div className="sec-desc">{s.desc}</div></div></div><span className={`badge-${s.bc}`}>{s.badge}</span></div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
