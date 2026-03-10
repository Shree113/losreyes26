import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import logoImg from '../assets/title.png';

const Navbar = ({ activeSection, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section) => {
    onNavigate(section);
    setMenuOpen(false);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${menuOpen ? styles.menuOpen : ''}`}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <img src={logoImg} alt="LOS REYES" className={styles.logoImage} />
        </div>
        <div className={styles.logoTextWrapper}>
          <span className={styles.logoText}>LOS REYES</span>
          <span className={styles.logoYear}>'26</span>
        </div>
      </div>

      <button 
        className={styles.mobileMenuBtn} 
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        <div className={styles.hamburger}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ''}`}>
        {['home', 'events', 'footer'].map((item) => (
          <li key={item}>
            <button
              className={`${styles.navLink} ${activeSection === item ? styles.active : ''}`}
              onClick={() => handleNavClick(item)}
            >
              <span className={styles.navLinkText}>{item.toUpperCase()}</span>
              <span className={styles.navUnderline}></span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
