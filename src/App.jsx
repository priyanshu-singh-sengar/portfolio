  import { useState, useEffect } from 'react'
import { 
  FaGithub, FaLinkedin, FaEnvelope, FaChevronDown, FaCode, 
  FaHandsHelping, FaServer, FaCommentDots, FaTasks, 
  FaGraduationCap, FaCertificate, FaCheckCircle, FaPhone, FaBars, FaTimes, FaHeart,
  FaJs, FaNodeJs, FaNetworkWired, FaHtml5, FaCss3, FaDatabase, FaKey, FaPlug, 
  FaGitAlt, FaPaperPlane, FaProjectDiagram, FaLayerGroup
} from 'react-icons/fa'

// TypingEffect component
const TypingEffect = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  
  const phrases = [
    "MERN Stack Developer",
    "Backend Engineer",
    "Full-Stack Developer",
    "Open Source Contributor"
  ];

  useEffect(() => {
    let timer;
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setText(prev => prev.substring(0, prev.length - 1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setText(currentPhrase.substring(0, text.length + 1));
      }, 100);
    }

    if (!isDeleting && text === currentPhrase) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex]);

  return (
    <>
      {text}
      <span className="typing-cursor"></span>
    </>
  );
};

// Reveal on scroll hook
const useReveal = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useReveal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['about', 'projects', 'skills', 'education', 'resume', 'contact'];
      let current = '';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= (el.offsetTop - 200)) {
          current = section;
        }
      }
      
      // If at the bottom of the page, set active section to the last one (contact)
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        current = 'contact';
      }
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="dark-theme">
      {/* Navigation */}
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-content">
          <div className="logo">Priyanshu Singh<span className="accent">.</span></div>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#about" onClick={closeMenu} className={activeSection === 'about' ? 'active' : ''}>About</a></li>
            <li><a href="#projects" onClick={closeMenu} className={activeSection === 'projects' ? 'active' : ''}>Projects</a></li>
            <li><a href="#skills" onClick={closeMenu} className={activeSection === 'skills' ? 'active' : ''}>Skills</a></li>
            <li><a href="#education" onClick={closeMenu} className={activeSection === 'education' ? 'active' : ''}>Education</a></li>
            <li><a href="#resume" onClick={closeMenu} className={activeSection === 'resume' ? 'active' : ''}>Resume</a></li>
            <li><a href="#contact" onClick={closeMenu} className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
          </ul>
          <button className="hamburger" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero">
        <div className="hero-container">
          <div className="hero-graphics">
            <div className="glow-orb orb-1"></div>
            <div className="glow-orb orb-2"></div>
            <img src="/profile.jpg" alt="Priyanshu Singh" className="profile-image animate-fade-up" style={{animationDelay: '0.2s'}} />
          </div>
          <div className="hero-text">
            <p className="greeting animate-fade-up" style={{animationDelay: '0.4s'}}>Hi, I'm</p>
            <h1 className="name animate-fade-up" style={{animationDelay: '0.6s'}}>Priyanshu Singh</h1>
            <h2 className="title animate-fade-up" style={{animationDelay: '0.8s'}}>
              <TypingEffect />
            </h2>
            <p className="headline animate-fade-up" style={{animationDelay: '1s'}}>
              Final-Year CS Student | Backend & Full-Stack | Building Developer Tools & Social-Impact Platforms
            </p>
            <div className="cta-buttons animate-fade-up" style={{animationDelay: '1.2s'}}>
              <a href="#projects" className="btn btn-primary">View My Work</a>
              <a href="#resume" className="btn btn-outline">View Resume</a>
            </div>
            <div className="social-links animate-fade-up" style={{animationDelay: '1.4s'}}>
              <a href="https://github.com/priyanshu-singh-sengar" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="mailto:zxenusanger@gmail.com" aria-label="Email"><FaEnvelope /></a>
            </div>
          </div>
        </div>
        <a href="#about" className="scroll-down">
          <FaChevronDown size={32} />
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <h2 className="section-title reveal">About Me</h2>
          <div className="about-content">
            <div className="about-text glass-panel reveal">
              <p>I'm a final-year Computer Science student at <strong>Chandigarh University</strong> with a genuine passion for backend development and full-stack engineering. My work sits at the intersection of practical software and real-world impact — from developer productivity tools to platforms that help people give back.</p>
              <p>On the technical side, I'm comfortable across the full stack: REST API design, JWT authentication, MongoDB and MySQL, WebSockets, Redis caching, and MVC architecture. I've solved <strong>100+ DSA problems</strong> across LeetCode and GeeksforGeeks and hold certifications in SQL and databases from IBM and Meta.</p>
              <p>I'm actively looking for <strong>backend or full-stack internship/entry-level roles</strong> where I can contribute to real products, keep learning fast, and work with engineers who care about good architecture.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="container">
          <h2 className="section-title reveal">Featured Projects</h2>
          <div className="projects-grid">
            
            {/* Project 1 */}
            <div className="project-card glass-panel reveal">
              <div className="project-content">
                <div className="project-header">
                  <FaCode className="project-icon" size={40} />
                  <div className="project-links">
                    <a href="https://github.com/priyanshu-singh-sengar" target="_blank" rel="noreferrer" title="GitHub Repo"><FaGithub size={20} /></a>
                  </div>
                </div>
                <h3 className="project-title">GitLens Explorer</h3>
                <p className="project-description">A MERN stack developer tool that makes any public GitHub repository instantly understandable. Fetches directory trees, generates AI-powered summaries, and surfaces important files to reduce onboarding time.</p>
                <ul className="tech-tags">
                  <li>MongoDB</li>
                  <li>Express.js</li>
                  <li>React.js</li>
                  <li>Node.js</li>
                  <li>GitHub API</li>
                  <li>AI APIs</li>
                </ul>
              </div>
            </div>

            {/* Project 2 */}
            <div className="project-card glass-panel reveal">
              <div className="project-content">
                <div className="project-header">
                  <FaHandsHelping className="project-icon" size={40} />
                  <div className="project-links">
                    <a href="https://github.com/priyanshu-singh-sengar" target="_blank" rel="noreferrer" title="GitHub Repo"><FaGithub size={20} /></a>
                  </div>
                </div>
                <h3 className="project-title">BlessingBridge</h3>
                <p className="project-description">A GoFundMe-style crowdfunding platform built to support mentally disabled and elderly residents of ashramas. Discover beneficiaries by birthday and set recurring giving habits.</p>
                <ul className="tech-tags">
                  <li>MongoDB</li>
                  <li>Express.js</li>
                  <li>React.js</li>
                  <li>Node.js</li>
                </ul>
              </div>
            </div>

            {/* Project 3 */}
            <div className="project-card glass-panel reveal">
              <div className="project-content">
                <div className="project-header">
                  <FaServer className="project-icon" size={40} />
                  <div className="project-links">
                    <a href="https://github.com/priyanshu-singh-sengar" target="_blank" rel="noreferrer" title="GitHub Repo"><FaGithub size={20} /></a>
                  </div>
                </div>
                <h3 className="project-title">Scalable REST API Backend</h3>
                <p className="project-description">Production-style backend service built to demonstrate real-world architecture decisions with JWT-based authentication, Redis caching layer, and structured error handling.</p>
                <ul className="tech-tags">
                  <li>Node.js</li>
                  <li>Express.js</li>
                  <li>MongoDB</li>
                  <li>JWT</li>
                  <li>Redis</li>
                </ul>
              </div>
            </div>
            
            {/* Project 4 */}
            <div className="project-card glass-panel reveal">
              <div className="project-content">
                <div className="project-header">
                  <FaCommentDots className="project-icon" size={40} />
                  <div className="project-links">
                    <a href="https://github.com/priyanshu-singh-sengar" target="_blank" rel="noreferrer" title="GitHub Repo"><FaGithub size={20} /></a>
                  </div>
                </div>
                <h3 className="project-title">Real-Time Chat Application</h3>
                <p className="project-description">A multi-user real-time messaging system using native WebSocket protocol with Node.js supporting multiple concurrent users with instant message broadcasting.</p>
                <ul className="tech-tags">
                  <li>Node.js</li>
                  <li>WebSocket</li>
                  <li>HTML/CSS</li>
                  <li>JavaScript</li>
                </ul>
              </div>
            </div>

            {/* Project 5 */}
            <div className="project-card glass-panel reveal">
              <div className="project-content">
                <div className="project-header">
                  <FaTasks className="project-icon" size={40} />
                  <div className="project-links">
                    <a href="https://github.com/priyanshu-singh-sengar" target="_blank" rel="noreferrer" title="GitHub Repo"><FaGithub size={20} /></a>
                  </div>
                </div>
                <h3 className="project-title">Full-Stack Todo & Voting Apps</h3>
                <p className="project-description">CRUD task manager and multi-user polling system built with MVC architecture and server-side rendering, demonstrating comfort with both NoSQL and relational databases.</p>
                <ul className="tech-tags">
                  <li>Node.js</li>
                  <li>Express.js</li>
                  <li>MongoDB/MySQL</li>
                  <li>EJS</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section">
        <div className="container">
          <h2 className="section-title reveal">Technical Skills</h2>
          <div className="skills-container">
            <div className="top-skills reveal">
              <div className="skill-badge node">
                <svg viewBox="0 0 128 128" width="48" height="48">
                   <path fill="#68a063" d="M109.9 83V44.9c0-2-1-3.9-2.8-4.9l-40.4-23.4c-1.7-1-3.8-1-5.5 0L20.8 40c-1.7-1-2.8 2.9-2.8 4.9v38.1c0 2 1 3.9 2.8 4.9l40.4 23.4c1.7 1 3.8 1 5.5 0l40.4-23.4c1.8-1 2.8-2.9 2.8-4.9z"></path>
                </svg>
                <span>Node.js</span>
              </div>
              <div className="skill-badge react">
                <svg viewBox="-11.5 -10.23174 23 20.46348" width="48" height="48">
                   <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
                   <g stroke="#61dafb" strokeWidth="1" fill="none">
                     <ellipse rx="11" ry="4.2"/>
                     <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                     <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                   </g>
                </svg>
                <span>React.js</span>
              </div>
              <div className="skill-badge mongo">
                <svg viewBox="0 0 128 128" width="48" height="48">
                    <path fill="#47a248" d="M57.6 123.6c-1-1.3-3.2-5.4-3.5-5.9-4.8-11.2-8.3-25.2-9.7-41.2-.6-7-.8-13.8-.4-20 0-1.8.1-3.6.3-5.2C46.8 31 52.8 17.5 61.8 4c1-1.4 1.7-2.3 2.1-2.9 0-.1 0-.1.1-.1.4-.4 1.2-1 2.2-1h.1c.1 0 .2.1.4.1.4.2 1.3 1 1.7 1.4v.1c.5.5 1.1 1.4 2.1 2.8 9 13.5 15 27 17.5 47.3.2 1.6.3 3.4.3 5.2.4 6.2.2 13-.4 20-1.4 16-4.9 30-9.7 41.2-.3.5-2.5 4.6-3.5 5.9-1.3 1.7-2.2 2.7-2.6 3.3l-.2.4h-.1c-.1 0-.2.1-.4.1-.3.1-1.2.2-2.1.2s-1.8-.1-2.1-.2c-.2 0-.3-.1-.4-.1h-.1l-.2-.4c-.4-.6-1.3-1.6-2.6-3.3z"></path>
                </svg>
                <span>MongoDB</span>
              </div>
            </div>
            <div className="other-skills reveal">
              {[
                { name: "JavaScript", icon: <FaJs size={18} /> },
                { name: "Express.js", icon: <FaNodeJs size={18} /> },
                { name: "REST API", icon: <FaNetworkWired size={18} /> },
                { name: "HTML/CSS", icon: <FaHtml5 size={18} /> },
                { name: "EJS", icon: <FaCode size={18} /> },
                { name: "MySQL", icon: <FaDatabase size={18} /> },
                { name: "Redis", icon: <FaDatabase size={18} /> },
                { name: "JWT", icon: <FaKey size={18} /> },
                { name: "WebSocket", icon: <FaPlug size={18} /> },
                { name: "Git", icon: <FaGitAlt size={18} /> },
                { name: "GitHub", icon: <FaGithub size={18} /> },
                { name: "Postman", icon: <FaPaperPlane size={18} /> },
                { name: "C++", icon: <FaCode size={18} /> },
                { name: "Data Structures", icon: <FaProjectDiagram size={18} /> },
                { name: "MVC", icon: <FaLayerGroup size={18} /> },
                { name: "Backend Dev", icon: <FaServer size={18} /> }
              ].map(skill => (
                <span key={skill.name} className="skill-tag">
                  {skill.icon} <span style={{marginLeft: '8px'}}>{skill.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section id="education" className="section">
        <div className="container">
          <h2 className="section-title reveal">Education & Certifications</h2>
          <div className="edu-cert-grid">
            <div className="education glass-panel reveal">
              <h3><FaGraduationCap /> Education</h3>
              <div className="timeline">
                <div className="timeline-item">
                  <h4>B.E. in Computer Science & Engineering</h4>
                  <h5>Chandigarh University</h5>
                  <span className="date">Jul 2022 – Jul 2026</span>
                  <p>CGPA: 7.81</p>
                </div>
                <div className="timeline-item">
                  <h4>Class XII (CBSE)</h4>
                  <h5>Army Public School, Lucknow</h5>
                  <span className="date">Apr 2021</span>
                  <p>90.8%</p>
                </div>
              </div>
            </div>
            <div className="certifications glass-panel reveal">
              <h3><FaCertificate /> Certifications</h3>
              <ul className="cert-list">
                <li>
                  <FaCheckCircle className="check-icon" size={20} />
                  <div>
                    <h4>Databases and SQL for Data Science</h4>
                    <span>IBM, Mar 2024</span>
                  </div>
                </li>
                <li>
                  <FaCheckCircle className="check-icon" size={20} />
                  <div>
                    <h4>Introduction to Databases</h4>
                    <span>Meta, Mar 2024</span>
                  </div>
                </li>
                <li>
                  <FaCheckCircle className="check-icon" size={20} />
                  <div>
                    <h4>SQL: A Practical Introduction</h4>
                    <span>IBM, Mar 2024</span>
                  </div>
                </li>
                <li>
                  <FaCheckCircle className="check-icon" size={20} />
                  <div>
                    <h4>Cloud Computing</h4>
                    <span>NPTEL (Score: 82/100)</span>
                  </div>
                </li>
                <li>
                  <FaCheckCircle className="check-icon" size={20} />
                  <div>
                    <h4>Internet of Things</h4>
                    <span>NPTEL (Score: 90/100)</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="section">
        <div className="container">
          <h2 className="section-title reveal">Resume</h2>
          <div className="glass-panel reveal" style={{ padding: '1rem', height: '600px' }}>
            <iframe 
              src="/resume.pdf" 
              width="100%" 
              height="100%" 
              style={{ border: 'none', borderRadius: '8px', backgroundColor: 'white' }}
              title="Resume"
            >
              <p>Your browser does not support PDFs. <a href="/resume.pdf">Download the PDF</a>.</p>
            </iframe>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <h2 className="section-title reveal">Get In Touch</h2>
          <div className="contact-card glass-panel reveal">
            <p>I'm actively looking for <strong>backend or full-stack internship/entry-level roles</strong>. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
            <div className="contact-info">
              <a href="mailto:zxenusanger@gmail.com" className="contact-item">
                <FaEnvelope size={20} /> zxenusanger@gmail.com
              </a>
              <a href="tel:+919555895510" className="contact-item">
                <FaPhone size={20} /> +91 9555895510
              </a>
            </div>
            <div className="social-links-large">
              <a href="https://github.com/priyanshu-singh-sengar" target="_blank" rel="noreferrer" className="btn btn-outline"><FaGithub size={20} /> GitHub</a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="btn btn-outline"><FaLinkedin size={20} /> LinkedIn</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'}}>
          <p>&copy; 2026 Priyanshu Singh. Built with </p> <FaHeart size={16} className="accent" />
        </div>
      </footer>
    </div>
  )
}

export default App
