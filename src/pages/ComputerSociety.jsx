import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ComputerSociety.css';

const ComputerSociety = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="cs-society-page dark-page page-transition">
      <div className="matrix-rain" aria-hidden="true">
        {['01001110','11010010','10011101','11001010','00101110'].map((code,i) => (
          <div key={i} className="matrix-col" style={{ left:`${[5,25,55,78,90][i]}%`, animationDuration:`${[8,10,11,13,10][i]}s`, animationDelay:`${[0,1,0.5,1.5,2.5][i]}s` }}>{code}</div>
        ))}
      </div>

      <nav className="navbar dark"><div className="container flex justify-between align-center">
        <Link to="/" className="nav-logo-dark"><span className="logo-icon-sm">IE</span>IEEE Platform</Link>
        <div className="nav-menu"><Link to="/" className="nav-item-dark">Home</Link><Link to="/societies/computer" className="nav-item-dark active">Societies</Link><Link to="/sponsors" className="nav-item-dark">Sponsors</Link><Link to="/membership" className="nav-item-dark">Membership</Link></div>
      </div></nav>

      <section className="cs-hero">
        <div className="container flex gap-8 align-center" style={{ flexWrap:'wrap' }}>
          <div className="ai-hero-content">
            <div className="cs-badge">💻 IEEE COMPUTER SOCIETY</div>
            <h1 style={{ color:'white' }}>Engineering the <span className="text-gradient-purple">Digital Future</span></h1>
            <p className="ai-subtitle">The world's leading community for computing professionals. From cloud architecture to cybersecurity.</p>
            <div className="flex gap-4" style={{ flexWrap:'wrap' }}>
              <Link to="/register" className="btn-purple-lg">Join Computer Society</Link>
              <a href="#domains" className="btn-ghost-dark">Explore Domains →</a>
            </div>
          </div>
          <div style={{ flex:1,display:'flex',justifyContent:'center',position:'relative',zIndex:1,minWidth:'300px' }}>
            <div className="terminal-card">
              <div className="terminal-header"><div className="tdot" style={{ background:'#FF5F57' }} /><div className="tdot" style={{ background:'#FEBC2E' }} /><div className="tdot" style={{ background:'#28C840' }} /><span className="terminal-title">ieee-cs@terminal</span></div>
              <div className="terminal-body">
                <div><span className="comment">// Welcome to IEEE CS</span></div>
                <div><span className="prompt">$</span> <span className="cmd">ieee-cs init --society</span></div>
                <div><span className="output">✓ Society initialized</span></div>
                <div><span className="prompt">$</span> <span className="cmd">ieee-cs members --count</span></div>
                <div><span className="output">✓ 85,000+ active members</span></div>
                <div><span className="prompt">$</span> <span className="cursor-blink" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="domains">
        <div className="container">
          <div className="text-center" style={{ marginBottom:'48px' }}><div className="section-badge-cs">Focus Areas</div><h2 className="section-title-light">Technical Domains</h2><p className="section-desc">Covering every aspect of modern computing.</p></div>
          <div className="grid-3">
            {[{i:'🔒',t:'Cybersecurity',d:'Threat detection, zero-trust architectures, cryptography.'},{i:'☁️',t:'Cloud & DevOps',d:'Cloud-native architectures, container orchestration, CI/CD.'},{i:'🏗️',t:'Software Engineering',d:'Design patterns, system architecture, testing frameworks.'},{i:'📊',t:'Data Engineering',d:'Big data processing, real-time analytics, data pipelines.'},{i:'🌐',t:'Distributed Systems',d:'Consensus algorithms, microservices, fault tolerance.'},{i:'📱',t:'Mobile & Web',d:'Cross-platform development, PWAs, WebAssembly.'}].map((c,idx) => (
              <div className="domain-card reveal" key={idx}><div className="domain-icon">{c.i}</div><h3>{c.t}</h3><p>{c.d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop:0 }}>
        <div className="container"><h2 className="section-title-light" style={{ textAlign:'center',marginBottom:'32px' }}>Technologies We Embrace</h2>
          <div className="tech-grid">
            {[['🐍','Python'],['🦀','Rust'],['☕','Java'],['🟨','JavaScript'],['💎','TypeScript'],['🐹','Go'],['🐳','Docker'],['☸️','K8s'],['🔷','React'],['🗄️','PostgreSQL']].map(([e,n],i) => (
              <div className="tech-item reveal" key={i}><div className="tech-emoji">{e}</div><div className="tech-name">{n}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop:0 }}><div className="container">
        <div className="cta-section-cs"><h2>Build the Future With Us</h2><p>Join the largest computing community. Access journals, conferences, and a global network.</p>
          <div className="flex gap-4 justify-center" style={{ flexWrap:'wrap' }}><Link to="/register" className="btn-purple-lg">Become a Member</Link><Link to="/sponsors" className="btn-ghost-dark">Explore Resources</Link></div>
        </div>
      </div></section>
      <footer className="dark-footer"><div className="container"><p>© 2026 IEEE Web Platform · Computer Society</p></div></footer>
    </div>
  );
};
export default ComputerSociety;
