import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall, Sparkles, Zap, Globe, Award } from "lucide-react";
import "./AnimatedHero.css";

function AnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Innovation", "Excellence", "Discovery", "Impact", "Progress"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="animated-hero">
      {/* Animated background elements */}
      <div className="hero-bg-effects">
        <div className="hero-gradient-orb hero-orb-1" />
        <div className="hero-gradient-orb hero-orb-2" />
        <div className="hero-gradient-orb hero-orb-3" />
        <div className="hero-grid-pattern" />
      </div>

      {/* Floating badge icons */}
      <motion.div
        className="hero-floating-icon hero-float-1"
        animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles size={24} />
      </motion.div>
      <motion.div
        className="hero-floating-icon hero-float-2"
        animate={{ y: [10, -10, 10], rotate: [0, -5, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Zap size={20} />
      </motion.div>
      <motion.div
        className="hero-floating-icon hero-float-3"
        animate={{ y: [-8, 12, -8], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Globe size={22} />
      </motion.div>
      <motion.div
        className="hero-floating-icon hero-float-4"
        animate={{ y: [6, -14, 6], rotate: [0, -8, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Award size={18} />
      </motion.div>

      <div className="container hero-inner">
        <div className="hero-content-stack">
          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button className="hero-badge">
              <span className="hero-badge-dot" />
              IEEE Sponsored Event
              <MoveRight size={14} />
            </button>
          </motion.div>

          {/* Main heading with animated word */}
          <motion.div
            className="hero-heading-wrap"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <h1 className="hero-main-title">
              <span className="hero-title-line">Powering the Future of</span>
              <span className="hero-animated-word-container">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="hero-animated-word"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Join leading organizations shaping the next wave of technological
            breakthroughs. Our sponsors drive research, education, and
            innovation across the globe — and your brand belongs here.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="hero-cta-row"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            <button className="hero-btn-outline">
              <PhoneCall size={16} />
              Contact Our Team
            </button>
            <button className="hero-btn-primary">
              Become a Sponsor
              <MoveRight size={16} />
            </button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="hero-trust-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <div className="hero-trust-item">
              <span className="hero-trust-number">50+</span>
              <span className="hero-trust-label">Global Partners</span>
            </div>
            <div className="hero-trust-divider" />
            <div className="hero-trust-item">
              <span className="hero-trust-number">120K+</span>
              <span className="hero-trust-label">Event Attendees</span>
            </div>
            <div className="hero-trust-divider" />
            <div className="hero-trust-item">
              <span className="hero-trust-number">30+</span>
              <span className="hero-trust-label">Countries</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export { AnimatedHero };
