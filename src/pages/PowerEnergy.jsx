import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PowerEnergy.css';

const PowerEnergy = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }); }, { threshold:0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pe-page dark-page page-transition">
      <nav className="navbar dark"><div className="container flex justify-between align-center">
        <Link to="/" className="nav-logo-dark"><span className="logo-icon-sm">IE</span>IEEE Platform</Link>
        <div className="nav-menu"><Link to="/" className="nav-item-dark">Home</Link><Link to="/societies/power-energy" className="nav-item-dark active">Societies</Link><Link to="/sponsors" className="nav-item-dark">Sponsors</Link><Link to="/membership" className="nav-item-dark">Membership</Link></div>
      </div></nav>

      <section className="pe-hero"><div className="container flex gap-8 align-center" style={{ flexWrap:'wrap' }}>
        <div style={{ flex:1,minWidth:'300px',position:'relative',zIndex:1 }}>
          <div className="pe-badge">⚡ IEEE POWER & ENERGY SOCIETY</div>
          <h1 style={{ color:'white',fontSize:'clamp(2rem,5vw,3.2rem)',fontWeight:900,lineHeight:1.1,marginBottom:'20px',letterSpacing:'-0.03em' }}>Powering the World with <span className="text-gradient-amber">Sustainable Energy</span></h1>
          <p className="ai-subtitle">Advancing smart grids, renewable energy, and electric power systems. Leading the global transition to a sustainable energy future.</p>
          <div className="flex gap-4" style={{ flexWrap:'wrap' }}><Link to="/register" className="btn-amber-lg">Join PES</Link><a href="#research" className="btn-ghost-dark">Our Research →</a></div>
        </div>
        <div style={{ flex:0.6,display:'flex',justifyContent:'center',minWidth:'260px' }}>
          <div className="energy-orb"><div className="energy-ring r1"/><div className="energy-ring r2"/><div className="energy-ring r3"/><div className="energy-icon-main">⚡</div></div>
        </div>
      </div></section>

      <div className="container" style={{ marginBottom:'80px' }}>
        <div className="stats-bar stats-bar-amber reveal">
          {[{n:'38,500+',l:'Members Worldwide'},{n:'420',l:'Research Papers/Year'},{n:'12',l:'Working Groups'},{n:'65+',l:'Country Chapters'}].map((s,i) => (
            <div className="stat-cell" key={i}><div className="stat-num" style={{ color:'#F59E0B' }}>{s.n}</div><div className="stat-label">{s.l}</div></div>
          ))}
        </div>
      </div>

      <section className="section" id="research" style={{ paddingTop:0 }}><div className="container">
        <div className="text-center" style={{ marginBottom:'48px' }}><div className="section-badge-pe">Research Areas</div><h2 className="section-title-light">Core Focus Areas</h2></div>
        <div className="grid-3">
          {[{i:'🌞',t:'Solar & Wind Energy',d:'Photovoltaic optimization, wind turbine design, hybrid renewable systems.'},{i:'🔌',t:'Smart Grid Technology',d:'Advanced metering, demand response, grid automation.'},{i:'🔋',t:'Energy Storage',d:'Battery technology, hydrogen fuel cells, grid-scale storage.'},{i:'🏭',t:'Power Systems',d:'Generation, transmission, distribution, power electronics.'},{i:'🚗',t:'Electric Vehicles',d:'EV charging infrastructure, V2G technology, battery management.'},{i:'🌍',t:'Sustainability',d:'Carbon reduction strategies, energy efficiency standards.'}].map((c,idx) => (
            <div className="energy-card reveal" key={idx}><div className="energy-card-icon">{c.i}</div><h3>{c.t}</h3><p>{c.d}</p></div>
          ))}
        </div>
      </div></section>

      <section className="section" style={{ paddingTop:0 }}><div className="container">
        <div className="cta-section-pe"><h2>Power the Future</h2><p>Join engineers building the next-generation energy systems.</p>
          <div className="flex gap-4 justify-center" style={{ flexWrap:'wrap' }}><Link to="/register" className="btn-amber-lg">Become a Member</Link><Link to="/sponsors" className="btn-ghost-dark">Browse Research</Link></div>
        </div>
      </div></section>
      <footer className="dark-footer"><div className="container"><p>© 2026 IEEE Web Platform · Power & Energy Society</p></div></footer>
    </div>
  );
};
export default PowerEnergy;
