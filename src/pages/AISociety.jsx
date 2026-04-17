import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './AISociety.css';

const AISociety = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="ai-society-page dark-page page-transition">
      {/* Neural Network Background */}
      <div className="neural-canvas" aria-hidden="true">
        {[12,28,15,35,8,50,70,65].map((top, i) => (
          <div key={i} className="neural-node" style={{ top: `${top}%`, left: `${[8,22,45,65,82,90,15,75][i]}%`, animationDelay: `${i * 0.3}s` }} />
        ))}
        <div className="neural-line" style={{ top:'20%',left:'10%',width:'200px',transform:'rotate(25deg)' }} />
        <div className="neural-line" style={{ top:'60%',left:'60%',width:'160px',transform:'rotate(35deg)',animationDelay:'2s' }} />
      </div>

      {/* Dark Navbar */}
      <nav className="navbar dark">
        <div className="container flex justify-between align-center">
          <Link to="/" className="nav-logo-dark"><span className="logo-icon-sm">IE</span>IEEE Platform</Link>
          <div className="nav-menu">
            <Link to="/" className="nav-item-dark">Home</Link>
            <Link to="/societies/ai" className="nav-item-dark active">Societies</Link>
            <Link to="/sponsors" className="nav-item-dark">Sponsors</Link>
            <Link to="/membership" className="nav-item-dark">Membership</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="ai-hero">
        <div className="container flex gap-8 align-center" style={{ flexWrap:'wrap' }}>
          <div className="ai-hero-content">
            <div className="ai-badge"><div className="pulse-dot" />IEEE ARTIFICIAL INTELLIGENCE SOCIETY</div>
            <h1>Advancing the Frontiers of <span className="text-gradient">Machine Intelligence</span></h1>
            <p className="ai-subtitle">Pioneering research in deep learning, NLP, computer vision, and autonomous systems. Join 12,000+ researchers shaping the future of AI.</p>
            <div className="flex gap-4" style={{ flexWrap:'wrap' }}>
              <Link to="/register" className="btn-accent-lg">Join the Society</Link>
              <a href="#research" className="btn-ghost-dark">Explore Research →</a>
            </div>
          </div>
          <div className="ai-hero-visual">
            <div className="brain-orb">
              <div className="brain-orb-ring r1" />
              <div className="brain-orb-ring r2" />
              <div className="brain-icon">🧠</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="container" style={{ marginBottom:'80px' }}>
        <div className="stats-bar reveal">
          {[{n:'12,400+',l:'Active Members'},{n:'340',l:'Published Papers'},{n:'28',l:'Active Projects'},{n:'15',l:'Global Chapters'}].map((s,i) => (
            <div className="stat-cell" key={i}><div className="stat-num">{s.n}</div><div className="stat-label">{s.l}</div></div>
          ))}
        </div>
      </div>

      {/* Research Areas */}
      <section className="section" id="research" style={{ paddingTop:0 }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom:'48px' }}>
            <div className="section-badge-ai">Research Areas</div>
            <h2 className="section-title-light">Core Research Domains</h2>
            <p className="section-desc">Our society focuses on the most impactful areas of artificial intelligence.</p>
          </div>
          <div className="grid-3">
            {[
              { icon:'🔬', title:'Deep Learning & Neural Networks', desc:'Advancing transformers, diffusion models, and graph neural networks.', tags:['Transformers','CNNs','GANs'] },
              { icon:'💬', title:'Natural Language Processing', desc:'Building systems that understand and generate human language at scale.', tags:['LLMs','Sentiment','Translation'] },
              { icon:'👁️', title:'Computer Vision', desc:'Enabling machines to interpret visual data for detection and navigation.', tags:['Detection','3D Vision','NeRF'] },
              { icon:'🤖', title:'Reinforcement Learning', desc:'Training agents through interaction, powering robotics and game AI.', tags:['Multi-Agent','Policy','Reward'] },
              { icon:'⚖️', title:'AI Ethics & Fairness', desc:'Ensuring AI systems are transparent, unbiased, and human-aligned.', tags:['Bias','Explainability','Safety'] },
              { icon:'🧬', title:'AI for Science', desc:'Applying ML to drug discovery, protein folding, and climate modeling.', tags:['BioAI','Climate','Materials'] },
            ].map((card, i) => (
              <div className="research-card reveal" key={i} style={{ animationDelay:`${i*80}ms` }}>
                <div className="research-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <div className="research-tags">{card.tags.map((t,j) => <span key={j} className="research-tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events & Publications */}
      <section className="section" style={{ paddingTop:0 }}>
        <div className="container flex gap-8" style={{ flexWrap:'wrap' }}>
          <div style={{ flex:'1.2', minWidth:'300px' }}>
            <div className="section-badge-ai">Events</div>
            <h2 className="section-title-light">Upcoming Events</h2>
            <div className="timeline">
              {[
                { date:'May 15–17, 2026', title:'International Conference on Deep Learning', desc:'Keynotes, paper presentations, and poster sessions.' },
                { date:'June 8, 2026', title:'Workshop: LLMs in Production', desc:'Hands-on workshop on deploying LLMs at scale.' },
                { date:'July 22, 2026', title:'AI Ethics Symposium', desc:'Panel discussions on responsible AI development.' },
              ].map((ev,i) => (
                <div className="timeline-item reveal" key={i}>
                  <div className="timeline-date">{ev.date}</div>
                  <h4>{ev.title}</h4>
                  <p>{ev.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex:'0.8', minWidth:'280px' }}>
            <div className="publications-card">
              <h3>📰 Latest Publications</h3>
              {[
                { title:'Scaling Laws for Multi-Modal Foundation Models', cite:'Chen et al. — IEEE Trans. on AI, 2026' },
                { title:'Efficient Attention Mechanisms for Edge Deployment', cite:'Park & Williams — ICML 2026' },
                { title:'Causal Reasoning in Large Language Models', cite:'Rodriguez et al. — NeurIPS 2026' },
                { title:'Federated Learning with Differential Privacy', cite:'Kumar & Singh — IEEE S&P 2026' },
              ].map((pub,i) => (
                <div className="pub-item" key={i}>
                  <div className="pub-title">{pub.title}</div>
                  <div className="pub-cite">{pub.cite}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop:0 }}>
        <div className="container">
          <div className="cta-section-ai">
            <h2>Ready to Shape the Future of AI?</h2>
            <p>Join thousands of researchers pushing the boundaries of artificial intelligence.</p>
            <div className="flex gap-4 justify-center" style={{ flexWrap:'wrap' }}>
              <Link to="/register" className="btn-accent-lg">Become a Member</Link>
              <Link to="/sponsors" className="btn-ghost-dark">Browse Papers</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="dark-footer"><div className="container"><p>© 2026 IEEE Web Platform · AI & Machine Learning Society</p></div></footer>
    </div>
  );
};

export default AISociety;
