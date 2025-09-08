import "../styles/Footer.css";
import { Fade } from "react-awesome-reveal";
import { FaGithub, FaDiscord, FaYoutube, FaLinkedin, FaInstagram, FaSpotify, FaEnvelope } from "react-icons/fa6";

const Footer = () => {
  return (
    <Fade>
      <footer id="footer">
        <div className="social-icons">
          <a href="https://github.com/NguyenMinh4869" target="_blank" rel="noreferrer noopener" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://discord.gg/cM9HxXknFy" target="_blank" rel="noreferrer noopener" aria-label="Discord">
            <FaDiscord />
          </a>
          <a href="https://youtube.com/" target="_blank" rel="noreferrer noopener" aria-label="YouTube">
            <FaYoutube />
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com/n.mingg_/" target="_blank" rel="noreferrer noopener" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://open.spotify.com/user/314qfjenhgye4rfbwzjb56qr4dnu?si=a51c35acba6f494f" target="_blank" rel="noreferrer noopener" aria-label="Spotify">
            <FaSpotify />
          </a>
          <a href="mailto:marcoisme0701@gmail.com" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>
        <p>© {new Date().getFullYear()} Minh Nguyen. All rights reserved.</p>
      </footer>
    </Fade>
  );
};

export default Footer;