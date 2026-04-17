import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { AnimatedHero } from '../components/AnimatedHero';
import BorderGlowCard from '../components/BorderGlowCard';

const majorSponsors = [
  { name: "TechFlow Corp", role: "Diamond Partner", desc: "Leading the industry in enterprise scale solutions, cloud native architecture, and global data pipelines." },
  { name: "Global Dynamics", role: "Platinum Partner", desc: "Pioneers in automation, robotics, and robust supply chain analytics shaping the physical internet." },
  { name: "Nexus Energy", role: "Platinum Partner", desc: "Sustainable grid technologies powering the cities of tomorrow through renewable innovations." },
  { name: "Quantum Computing", role: "Gold Partner", desc: "Pushing the boundaries of computational physics and algorithmic encryption speeds." },
  { name: "Apex Robotics", role: "Gold Partner", desc: "Precision hardware and AI integration for advanced manufacturing and biotech." },
  { name: "Vertex AI", role: "Gold Partner", desc: "Creating autonomous multi-agent systems to solve complex strategic forecasting." }
];

const minorSponsors = [
  "Cyber Core Network", "BioTech Gen", "DataStream Inc", "Astro Labs", 
  "Eco Dynamics", "FinTech Solutions", "Health Sync", "Green Energy Partners",
  "Blue Ocean Cloud", "Stellar Engineering", "Neural Networks Co", "Future Web"
];

const MajorCard = ({ sponsor }) => {
  return (
    <BorderGlowCard>
      <div className="glow-card-avatar">
        <span className="glow-card-initial">{sponsor.name.charAt(0)}</span>
      </div>
      <h3 className="glow-card-name">{sponsor.name}</h3>
      <span className="glow-card-role">{sponsor.role}</span>
      <p className="glow-card-desc">{sponsor.desc}</p>
      <button className="glow-card-btn">Explore Case Study</button>
    </BorderGlowCard>
  );
};

const Sponsors = () => {
  const containerRef = useRef();
  const marqueeRef = useRef();
  const marqueeAnim = useRef();
  const preloaderRef = useRef();
  const preloaderTextRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.to(preloaderTextRef.current, { opacity: 1, letterSpacing: '8px', duration: 1, ease: 'power2.out' })
        .to(preloaderTextRef.current, { opacity: 0, duration: 0.4, delay: 0.3 })
        .to(preloaderRef.current, { 
          height: 0, 
          duration: 1.2, 
          ease: 'expo.inOut',
          onComplete: () => {
            if(preloaderRef.current) preloaderRef.current.style.display = 'none';
          }
        }, "-=0.2")

      tl.fromTo('.major-sponsor',
        { opacity: 0, y: 100, rotationX: -25, scale: 0.9 },
        { opacity: 1, y: 0, rotationX: 0, scale: 1, duration: 1.2, stagger: 0.1, ease: 'back.out(1.2)', transformPerspective: 1000 },
        "-=0.5"
      )
      .fromTo('.marquee-section',
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' },
        "-=1.2"
      );

      const marqueeWidth = marqueeRef.current.offsetWidth;
      marqueeAnim.current = gsap.to(marqueeRef.current, {
        x: -marqueeWidth / 2, 
        ease: 'none',
        duration: 30,
        repeat: -1,
        modifiers: { x: gsap.utils.unitize(x => parseFloat(x)) }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMarqueeEnter = () => marqueeAnim.current.timeScale(0.2); 
  const handleMarqueeLeave = () => marqueeAnim.current.timeScale(1);

  return (
    <div ref={containerRef} className="page-transition" style={{ minHeight: '100vh', position: 'relative' }}>
      
      <div 
        ref={preloaderRef}
        style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
          backgroundColor: 'var(--color-deep-navy)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        <span ref={preloaderTextRef} style={{ color: '#fff', fontSize: '2rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '4px', opacity: 0 }}>
          Ecosystem
        </span>
      </div>

      <AnimatedHero />

      <section className="section" style={{ paddingTop: '80px', paddingBottom: '120px', background: 'linear-gradient(180deg, var(--color-deep-navy) 0%, #081630 100%)', marginTop: '-2px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-1px', margin: '0 0 16px' }}>Our Valued Partners</h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto', lineHeight: '1.7' }}>
              World-class organizations driving innovation alongside IEEE.
            </p>
          </div>
          <div className="grid-3" style={{ perspective: '2000px' }}>
            {majorSponsors.map((sponsor, index) => (
              <div key={index} className="major-sponsor">
                <MajorCard sponsor={sponsor} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section 
        className="marquee-section"
        style={{ background: 'var(--color-deep-navy)', padding: '80px 0', overflow: 'hidden', position: 'relative', transform: 'rotate(-2deg) scale(1.05)', marginTop: '40px' }}
      >
        <div style={{ position: 'absolute', left: 0, top: 0, width: '20%', height: '100%', background: 'linear-gradient(90deg, var(--color-deep-navy) 0%, transparent 100%)', zIndex: 10, pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', right: 0, top: 0, width: '20%', height: '100%', background: 'linear-gradient(-90deg, var(--color-deep-navy) 0%, transparent 100%)', zIndex: 10, pointerEvents: 'none' }}></div>
        
        <div className="container flex justify-center text-elem" style={{ marginBottom: '40px', transform: 'rotate(2deg)' }}>
          <h4 style={{ color: 'var(--color-cyan-accent)', fontSize: '1rem', letterSpacing: '8px', textTransform: 'uppercase', opacity: 0.8, fontWeight: 700 }}>Alliance Network</h4>
        </div>

        <div 
          style={{ display: 'flex', width: 'max-content', cursor: 'none' }} 
          className="marquee-content"
          ref={marqueeRef}
          onMouseEnter={handleMarqueeEnter}
          onMouseLeave={handleMarqueeLeave}
        >
          {[...minorSponsors, ...minorSponsors].map((sponsor, index) => (
            <div key={index} className="flex align-center" style={{ 
                padding: '0 50px', flexShrink: 0, opacity: 0.4, transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'scale(1.1) skewX(-10deg)';
                e.currentTarget.style.color = 'var(--color-cyan-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.4';
                e.currentTarget.style.transform = 'scale(1) skewX(0deg)';
                e.currentTarget.style.color = 'var(--color-white)';
              }}
            >
              <div style={{ width: '40px', height: '40px', background: 'var(--color-brand-blue)', opacity: 0.4, borderRadius: '4px', marginRight: '20px', transform: 'rotate(45deg)' }}></div>
              <span style={{ color: 'var(--color-white)', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px' }}>{sponsor}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Sponsors;
