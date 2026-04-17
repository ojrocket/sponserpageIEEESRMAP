import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RoboticsSociety.css';

const RoboticsSociety = () => {
  useEffect(() => {
    const obs = new IntersectionObserver(e => { e.forEach(x => { if(x.isIntersecting) x.target.classList.add('visible'); }); }, { threshold:0.1 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="rb-page dark-page page-transition">
      <nav className="navbar dark"><div className="container flex justify-between align-center">
        <Link to="/" className="nav-logo-dark"><span className="logo-icon-sm">IE</span>IEEE Platform</Link>
        <div className="nav-menu"><Link to="/" className="nav-item-dark">Home</Link><Link to="/societies/robotics" className="nav-item-dark active">Societies</Link><Link to="/sponsors" className="nav-item-dark">Sponsors</Link><Link to="/membership" className="nav-item-dark">Membership</Link></div>
      </div></nav>

      <section className="rb-hero"><div className="container flex gap-8 align-center" style={{ flexWrap:'wrap' }}>
        <div style={{ flex:1,minWidth:'300px',position:'relative',zIndex:1 }}>
          <div className="rb-badge">🤖 IEEE ROBOTICS & AUTOMATION SOCIETY</div>
          <h1 style={{ color:'white',fontSize:'clamp(2rem,5vw,3.2rem)',fontWeight:900,lineHeight:1.1,marginBottom:'20px',letterSpacing:'-0.03em' }}>Building Autonomous <span className="text-gradient-red">Intelligent Machines</span></h1>
          <p className="ai-subtitle">Driving innovation in robotics, automation, and mechatronics. From surgical robots to Mars rovers.</p>
          <div className="flex gap-4" style={{ flexWrap:'wrap' }}><Link to="/register" className="btn-red-lg">Join RAS</Link><a href="#areas" className="btn-ghost-dark">Research Areas →</a></div>
        </div>
        <div style={{ flex:0.6,display:'flex',justifyContent:'center',minWidth:'260px' }}>
          <div className="robot-container"><div className="robot-scan" /><div className="robot-core">🤖</div></div>
        </div>
      </div></section>

      <div className="container" style={{ marginBottom:'80px' }}>
        <div className="stats-bar reveal">
          {[{n:'22,000+',l:'Members'},{n:'180',l:'Research Labs'},{n:'45',l:'Competitions/Year'},{n:'32',l:'Country Chapters'}].map((s,i)=>(
            <div className="stat-cell" key={i}><div className="stat-num" style={{ color:'#EF4444' }}>{s.n}</div><div className="stat-label">{s.l}</div></div>
          ))}
        </div>
      </div>

      <section className="section" id="areas" style={{ paddingTop:0 }}><div className="container">
        <div className="text-center" style={{ marginBottom:'48px' }}><div className="section-badge-rb">Research Focus</div><h2 className="section-title-light">Core Research Areas</h2></div>
        <div className="grid-3">
          {[{i:'🦾',t:'Industrial Automation',d:'Smart manufacturing, robotic assembly, quality inspection.'},{i:'🚁',t:'Aerial Robotics',d:'Autonomous drones, multi-rotor coordination, aerial mapping.'},{i:'🏥',t:'Medical Robotics',d:'Surgical assistance, rehabilitation, prosthetics.'},{i:'👥',t:'Human-Robot Interaction',d:'Collaborative robotics, gesture recognition, safety.'},{i:'🐜',t:'Swarm Robotics',d:'Multi-agent coordination, emergent behavior, task allocation.'},{i:'🌊',t:'Underwater Robotics',d:'AUVs, ocean mapping, deep-sea exploration.'}].map((c,idx)=>(
            <div className="rb-card reveal" key={idx}><div className="rb-card-icon">{c.i}</div><h3>{c.t}</h3><p>{c.d}</p></div>
          ))}
        </div>
      </div></section>

      <section className="section" style={{ paddingTop:0 }}><div className="container">
        <div className="text-center" style={{ marginBottom:'48px' }}><div className="section-badge-rb">Labs</div><h2 className="section-title-light">Featured Research Labs</h2></div>
        <div className="grid-3">
          {[{e:'🔬',n:'MIT CSAIL Robotics',d:'Soft robotics, manipulation, adaptive control.',tags:['Soft Robotics','Control']},{e:'🏭',n:'ETH Zurich ASL',d:'Autonomous systems, legged locomotion, aerial robotics.',tags:['Legged','Autonomous']},{e:'🤖',n:'Stanford SAIL',d:'AI-driven manipulation, sim-to-real transfer.',tags:['AI+Robotics','Sim2Real']}].map((lab,i)=>(
            <div className="lab-card reveal" key={i}>
              <div className="lab-banner">{lab.e}</div>
              <div className="lab-body"><h3>{lab.n}</h3><p>{lab.d}</p><div className="lab-tags">{lab.tags.map((t,j)=><span key={j} className="lab-tag">{t}</span>)}</div></div>
            </div>
          ))}
        </div>
      </div></section>

      <section className="section" style={{ paddingTop:0 }}><div className="container">
        <div className="cta-section-rb"><h2>Build the Machines of Tomorrow</h2><p>Join roboticists pushing the boundaries of autonomous systems.</p>
          <div className="flex gap-4 justify-center" style={{ flexWrap:'wrap' }}><Link to="/register" className="btn-red-lg">Become a Member</Link><Link to="/sponsors" className="btn-ghost-dark">Browse Research</Link></div>
        </div>
      </div></section>
      <footer className="dark-footer"><div className="container"><p>© 2026 IEEE Web Platform · Robotics & Automation Society</p></div></footer>
    </div>
  );
};
export default RoboticsSociety;
