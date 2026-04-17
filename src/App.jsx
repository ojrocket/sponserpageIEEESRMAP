import React, { useLayoutEffect, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';

// Pages
import Home from './pages/Home';
import Sponsors from './pages/Sponsors';
import Membership from './pages/Membership';

// Society Pages
import AISociety from './pages/AISociety';
import ComputerSociety from './pages/ComputerSociety';
import PowerEnergy from './pages/PowerEnergy';
import RoboticsSociety from './pages/RoboticsSociety';

// Admin and Auth pages removed per user request

// Global Custom Cursor
const CustomCursor = ({ cursorRef, cursorTextRef }) => (
  <div
    ref={cursorRef}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '16px',
      height: '16px',
      backgroundColor: 'var(--color-brand-blue)',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: 99999, // Extremely high z-index to stay above everything
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'width 0.2s, height 0.2s, background-color 0.2s',
      color: '#fff',
      fontSize: '10px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      opacity: 0,
      willChange: 'transform'
    }}
  >
    <span ref={cursorTextRef} style={{ opacity: 0, transition: 'opacity 0.2s' }}></span>
  </div>
);

// Navbar Component
const Navbar = () => {
  return (
    <nav className="navbar" style={{ position: 'sticky', zIndex: 1000 }}>
      <div className="container flex justify-between align-center">
        <Link to="/" className="nav-logo" style={{ textDecoration: 'none' }}>IEEE Web Platform</Link>
        <div className="nav-menu">
          <Link to="/" className="nav-item">Home</Link>
          <div className="nav-dropdown">
            <span className="nav-item" style={{display:'flex', alignItems:'center', gap:'4px'}}>Societies ▾</span>
            <div className="nav-dropdown-menu">
              <Link to="/societies/ai" className="nav-dropdown-item">AI & Machine Learning</Link>
              <Link to="/societies/computer" className="nav-dropdown-item">Computer Society</Link>
              <Link to="/societies/power-energy" className="nav-dropdown-item">Power & Energy</Link>
              <Link to="/societies/robotics" className="nav-dropdown-item">Robotics & Automation</Link>
            </div>
          </div>
          <Link to="/sponsors" className="nav-item">Sponsors</Link>
          <Link to="/membership" className="nav-item">Membership</Link>
        </div>
      </div>
    </nav>
  );
};

function App() {
  const location = useLocation();
  const cursorRef = useRef();
  const cursorTextRef = useRef();

  // GLOBAL CURSOR ENGINE
  useEffect(() => {
    // We intentionally removed the matchMedia touch-check here because 
    // modern Windows touchscreen laptops trigger it incorrectly!
    document.body.style.cursor = 'none';

    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3.out" });

    gsap.to(cursorRef.current, { opacity: 1, duration: 0.5 });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleGlobalHoverIn = (e) => {
      // If hovering over a card
      if (e.target.closest('.interactive-card')) {
        gsap.to(cursorRef.current, { width: '80px', height: '80px', backgroundColor: 'var(--color-deep-navy)', duration: 0.2 });
        if (cursorTextRef.current) {
          cursorTextRef.current.innerText = 'View';
          gsap.to(cursorTextRef.current, { opacity: 1, duration: 0.15 });
        }
      }
      // If hovering over a marquee
      else if (e.target.closest('.marquee-content')) {
        gsap.to(cursorRef.current, { width: '100px', height: '100px', backgroundColor: 'var(--color-cyan-accent)', duration: 0.2 });
        if (cursorTextRef.current) {
          cursorTextRef.current.innerText = 'Drag';
          gsap.to(cursorTextRef.current, { opacity: 1, duration: 0.15 });
        }
      }
    };

    const handleGlobalHoverOut = (e) => {
      if (e.target.closest('.interactive-card') || e.target.closest('.marquee-content')) {
        gsap.to(cursorRef.current, { width: '16px', height: '16px', backgroundColor: 'var(--color-brand-blue)', duration: 0.2 });
        if (cursorTextRef.current) {
          gsap.to(cursorTextRef.current, { opacity: 0, duration: 0.15 });
        }
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleGlobalHoverIn);
    document.addEventListener('mouseout', handleGlobalHoverOut);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleGlobalHoverIn);
      document.removeEventListener('mouseout', handleGlobalHoverOut);
    };
  }, []);

  // Global Page Load transitions
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".page-transition",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", clearProps: "all" } // Ensure clean zIndex afterward
      );
    });
    return () => ctx.revert();
  }, [location.pathname]);

  // Determine if default (light) navbar should show
  // Pages with their own dark navbar don't need the default one
  const darkPages = ['/', '/societies', '/dashboard'];
  const showDefaultNav = !darkPages.some(p => p === '/' ? location.pathname === '/' : location.pathname.startsWith(p));

  return (
    <div className="app">
      <CustomCursor cursorRef={cursorRef} cursorTextRef={cursorTextRef} />
      {showDefaultNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/sponsors" element={<Sponsors />} />

        {/* Society Pages */}
        <Route path="/societies/ai" element={<AISociety />} />
        <Route path="/societies/computer" element={<ComputerSociety />} />
        <Route path="/societies/power-energy" element={<PowerEnergy />} />
        <Route path="/societies/robotics" element={<RoboticsSociety />} />

        {/* Dashboard Placeholder */}
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="*" element={<div className="container page-transition" style={{ paddingTop: '80px' }}><h2>Page Under Construction</h2></div>} />
      </Routes>
    </div>
  )
}

export default App;
