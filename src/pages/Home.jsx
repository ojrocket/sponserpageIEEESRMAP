import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import ScrollExpansionHero from '../components/ScrollExpansionHero';
import './Home.css';

/* ── Sponsor showcase data ── */
const partnerLogos = [
  { name: 'TechFlow Corp', tier: 'Diamond' },
  { name: 'Global Dynamics', tier: 'Platinum' },
  { name: 'Nexus Energy', tier: 'Platinum' },
  { name: 'Quantum Computing', tier: 'Gold' },
  { name: 'Apex Robotics', tier: 'Gold' },
  { name: 'Vertex AI', tier: 'Gold' },
];

const stats = [
  { number: '460+', label: 'Sections Worldwide' },
  { number: '4M+', label: 'Global Members' },
  { number: '200+', label: 'Annual Conferences' },
  { number: '30+', label: 'Technical Societies' },
];

const tierColors = {
  Diamond: 'var(--color-cyan-accent)',
  Platinum: '#a78bfa',
  Gold: '#fbbf24',
};

/* ── Revealed content shown after video expands ── */
const HomeRevealedContent = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.home-sponsor-card',
        { opacity: 0, y: 60, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'back.out(1.4)',
          delay: 0.3,
        }
      );
      gsap.fromTo(
        '.home-stat-item',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.6 }
      );
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={gridRef} className="home-revealed">
      {/* Section heading */}
      <div className="home-section-header">
        <span className="home-section-badge">Our Partners</span>
        <h2 className="home-section-title">Backed by Industry Leaders</h2>
        <p className="home-section-subtitle">
          These forward-thinking organizations power our mission to advance
          technology for the benefit of humanity.
        </p>
      </div>

      {/* Sponsor cards grid */}
      <div className="home-sponsors-grid">
        {partnerLogos.map((partner, i) => (
          <div key={i} className="home-sponsor-card">
            <div className="home-sponsor-avatar">
              <span className="home-sponsor-initial">
                {partner.name.charAt(0)}
              </span>
            </div>
            <h3 className="home-sponsor-name">{partner.name}</h3>
            <span
              className="home-sponsor-tier"
              style={{ color: tierColors[partner.tier] }}
            >
              {partner.tier} Partner
            </span>
          </div>
        ))}
      </div>

      {/* Stats bar */}
      <div className="home-stats-bar">
        {stats.map((stat, i) => (
          <div key={i} className="home-stat-item">
            <span className="home-stat-number">{stat.number}</span>
            <span className="home-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="home-cta-section">
        <h3 className="home-cta-title">Ready to partner with IEEE?</h3>
        <p className="home-cta-desc">
          Join the organizations shaping the future of engineering and
          technology. Become a sponsor today.
        </p>
        <div className="home-cta-buttons">
          <a href="/sponsors" className="home-cta-primary">
            View All Sponsors
          </a>
          <a href="/membership" className="home-cta-outline">
            Become a Member
          </a>
        </div>
      </div>
    </div>
  );
};

/* ── Main Home Page ── */
const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ScrollExpansionHero
      mediaType="video"
      mediaSrc="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4"
      posterSrc="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920&auto=format&fit=crop"
      bgImageSrc="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop"
      title="Advancing Technology For Humanity"
      subtitle="IEEE — The world's largest technical professional organization"
      scrollToExpand="↓ Scroll to discover"
    >
      <HomeRevealedContent />
    </ScrollExpansionHero>
  );
};

export default Home;
