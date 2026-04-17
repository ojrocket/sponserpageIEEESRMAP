import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const Membership = () => {
  const containerRef = useRef();
  const preloaderRef = useRef();
  const preloaderTextRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // PRELOADER SEQUENCE (Utopia Tokyo Style)
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

      // STAGGERED PAGE REVEAL
      tl.fromTo('.badge-elem', 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)' },
        "-=0.5"
      )
      .fromTo('.hero-text', 
        { opacity: 0, x: -30, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
        { opacity: 1, x: 0, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 1.2, stagger: 0.15, ease: 'power4.out' },
        "-=0.8"
      )
      .fromTo('.tier-card',
        { opacity: 0, y: 100, rotationX: -15, scale: 0.95 },
        { opacity: 1, y: 0, rotationX: 0, scale: 1, duration: 1.2, stagger: 0.15, ease: 'back.out(1.2)', transformPerspective: 1000 },
        "-=0.9"
      )
      // 3D Glass Object reveal
      .fromTo('.pseudo-3d-orb-primary',
        { opacity: 0, scale: 0, rotation: -90 },
        { opacity: 1, scale: 1, rotation: 0, duration: 2.5, ease: 'elastic.out(1, 0.5)' },
        "-=2"
      )
      .fromTo('.pseudo-3d-orb-secondary',
        { opacity: 0, scale: 0, x: 50 },
        { opacity: 0.7, scale: 1, x: 0, duration: 2, ease: 'power3.out' },
        "-=1.5"
      );

      // Ambient 3D float animation using purely GPU accelerated transforms
      gsap.to('.pseudo-3d-orb-primary', {
        y: -50,
        rotation: -25,
        duration: 6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
      
      gsap.to('.pseudo-3d-orb-secondary', {
        y: 40,
        x: -20,
        rotation: 45,
        duration: 5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="page-transition" style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      
      {/* Utopia Style Preloader */}
      <div 
        ref={preloaderRef}
        style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
          backgroundColor: 'var(--color-brand-blue)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        <span ref={preloaderTextRef} style={{ color: '#fff', fontSize: '2rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '4px', opacity: 0 }}>
          Global Network
        </span>
      </div>

      <header className="section hero" style={{ paddingBottom: '60px', position: 'relative', background: 'transparent' }}>
        
        {/* CSS-Only Pseudo 3D Glass Orbs (Hatom.com style) */}
        <div 
          className="pseudo-3d-orb-primary"
          style={{
            position: 'absolute', top: '10%', right: '10%', width: '400px', height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.95), rgba(0, 194, 255, 0.4) 30%, rgba(10, 102, 204, 0.9) 80%)',
            boxShadow: 'inset -30px -30px 60px rgba(10,31,68,0.7), inset 30px 30px 60px rgba(255,255,255,0.9), 0 40px 80px rgba(0,194,255,0.3)',
            backdropFilter: 'blur(12px)', zIndex: -1, pointerEvents: 'none', willChange: 'transform' 
          }} 
        />
        <div 
          className="pseudo-3d-orb-secondary"
          style={{
            position: 'absolute', top: '40%', right: '35%', width: '150px', height: '150px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(10, 31, 68, 0.4) 50%, rgba(0, 194, 255, 0.8) 90%)',
            boxShadow: 'inset -15px -15px 30px rgba(10,102,194),0.7), inset 15px 15px 30px rgba(255,255,255,0.8), 0 20px 40px rgba(10,31,68,0.2)',
            backdropFilter: 'blur(8px)', zIndex: -2, pointerEvents: 'none', willChange: 'transform' 
          }} 
        />

        <div className="container flex align-center gap-8">
          <div className="hero-content" style={{ zIndex: 10 }}>
            <div className="mock-badge badge-elem" style={{ marginBottom: '24px', padding: '6px 16px', background: 'var(--color-deep-navy)' }}>Global Access</div>
            <h1 className="mock-title hero-text" style={{ fontSize: '4rem', lineHeight: '1.1', letterSpacing: '-1px' }}>Unlock Exclusive <br/>IEEE Benefits</h1>
            <p className="mock-subtitle hero-text" style={{ marginTop: '24px', fontSize: '1.25rem', lineHeight: '1.7', maxWidth: '500px' }}>Join the world's largest technical professional organization for the advancement of technology. Connect with experts locally and globally.</p>
            <div className="flex gap-4 hero-text" style={{ marginTop: '40px' }}>
              <button className="mock-btn" style={{ padding: '0 40px', fontSize: '1.1rem', height: '56px' }}>Join IEEE Today</button>
              <button className="mock-btn-secondary" style={{ padding: '0 40px', fontSize: '1.1rem', height: '56px' }}>Renew Membership</button>
            </div>
          </div>
        </div>
      </header>

      <section className="section" style={{ paddingTop: '20px' }}>
        <div className="container">
          <h2 className="mock-title text-center hero-text" style={{ marginBottom: '64px', textAlign: 'center', fontSize: '2.5rem' }}>Membership Tiers</h2>
          <div className="grid-3" style={{ perspective: '2000px' }}>
            
            <div 
              className="card tier-card interactive-card flex flex-col align-center text-center"
              style={{ transition: 'all 0.4s ease', transformStyle: 'preserve-3d' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-15px) rotateX(5deg)'; e.currentTarget.style.boxShadow = '0 30px 60px rgba(10,31,68,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) rotateX(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(10,31,68,0.05)'; }}
            >
              <div className="mock-badge" style={{ marginBottom: '24px', padding: '6px 16px' }}>Basic</div>
              <h3 className="mock-title" style={{ fontSize: '2.2rem', marginBottom: '32px' }}>Student</h3>
              <p className="mock-text med" style={{ width: '100%', marginBottom: '16px' }}>Access to global network</p>
              <p className="mock-text med" style={{ width: '100%', marginBottom: '16px' }}>Digital subscription to IEEE Spectrum</p>
              <div style={{ flex: 1 }}></div>
              <button style={{ marginTop: '40px', height: '48px', pointerEvents: 'none' }} className="mock-btn-secondary full-width">Sign Up</button>
            </div>
            
            <div 
              className="card tier-card interactive-card flex flex-col align-center text-center" 
              style={{ border: '2px solid var(--color-cyan-accent)', background: 'var(--color-deep-navy)', color: '#fff', transition: 'all 0.4s ease', transformStyle: 'preserve-3d' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-20px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 40px 80px rgba(0,194,255,0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(10,31,68,0.1)'; }}
            >
              <div className="mock-badge" style={{ marginBottom: '24px', padding: '6px 16px', background: 'var(--color-cyan-accent)', color: '#fff' }}>Most Popular</div>
              <h3 className="mock-title" style={{ fontSize: '2.2rem', marginBottom: '32px', color: '#fff' }}>Professional</h3>
              <p className="mock-text med" style={{ width: '100%', marginBottom: '16px', color: '#CBD5E0' }}>All Student benefits</p>
              <p className="mock-text med" style={{ width: '100%', marginBottom: '16px', color: '#CBD5E0' }}>Access to IEEE Xplore library</p>
              <p className="mock-text med" style={{ width: '100%', marginBottom: '16px', color: '#CBD5E0' }}>Discounts on conferences</p>
              <div style={{ flex: 1 }}></div>
              <button style={{ marginTop: '40px', height: '48px', background: 'var(--color-cyan-accent)', pointerEvents: 'none' }} className="mock-btn full-width">Join as Professional</button>
            </div>
            
            <div 
              className="card tier-card interactive-card flex flex-col align-center text-center"
              style={{ transition: 'all 0.4s ease', transformStyle: 'preserve-3d' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-15px) rotateX(-5deg)'; e.currentTarget.style.boxShadow = '0 30px 60px rgba(10,31,68,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) rotateX(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(10,31,68,0.05)'; }}
            >
              <div className="mock-badge" style={{ marginBottom: '24px', padding: '6px 16px', background: 'var(--color-brand-blue)' }}>Premium</div>
              <h3 className="mock-title" style={{ fontSize: '2.2rem', marginBottom: '32px' }}>Senior</h3>
              <p className="mock-text med" style={{ width: '100%', marginBottom: '16px' }}>Advanced networking</p>
              <p className="mock-text med" style={{ width: '100%', marginBottom: '16px' }}>Leadership opportunities</p>
              <div style={{ flex: 1 }}></div>
              <button style={{ marginTop: '40px', height: '48px', pointerEvents: 'none' }} className="mock-btn-secondary full-width">Apply Now</button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Membership;
