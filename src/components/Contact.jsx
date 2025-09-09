import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import '../styles/Contact.css';
import { FaEnvelope, FaInstagram, FaLinkedin, FaDiscord } from 'react-icons/fa6';

const ContactCard = ({ href, title, subtitle, Icon }) => {
  return (
    <a className="contact-card" href={href} target="_blank" rel="noreferrer noopener">
      <div className="contact-card-inner">
        <div className="contact-card-icon">
          <Icon />
        </div>
        <div className="contact-card-content">
          <div className="contact-card-title">{title}</div>
          <div className="contact-card-subtitle">{subtitle}</div>
        </div>
      </div>
      <div className="card-glow" aria-hidden="true" />
    </a>
  );
};

const Contact = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`contact-container ${isDarkMode ? 'dark' : ''}`}>
      <div className="contact-content">
        <header className="contact-header">
          <h1 className="contact-title animate-fade-in-up delay-1" style={{ paddingTop: '90px' }}>Contact</h1>
          <p className="contact-subtitle animate-fade-in-up delay-2">Let's connect.</p>
          <p className="contact-helper animate-fade-in-up delay-3">Connect with me through any of these platforms.</p>
        </header>

        <div className="contact-grid animate-fade-in-up delay-4">
          <ContactCard
            href="mailto:marcoisme0701@gmail.com"
            title="Email"
            subtitle="marcoisme0701@gmail.com"
            Icon={FaEnvelope}
          />
          <ContactCard
            href="https://www.instagram.com/n.mingg_/"
            title="Instagram"
            subtitle="@n.mingg_"
            Icon={FaInstagram}
          />
          <ContactCard
            href="https://www.linkedin.com/in/minh-ho%C3%A0ng-297579383/"
            title="LinkedIn"
            subtitle="in/minhnguyen"
            Icon={FaLinkedin}
          />
          <ContactCard
            href="https://discord.gg/"
            title="Discord"
            subtitle="Join Server"
            Icon={FaDiscord}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;


