// Kiran Teja - Portfolio JS logic (Premium Gold Theme Edition)

document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC CANVAS BACKGROUND (Golden Grid Connection & Cursor Interaction)
  initCanvas();

  // 2. TERMINAL SIMULATOR
  initTerminal();

  // 3. LIVE METRICS SHUFFLE
  initMetrics();

  // 4. SKILLS SECTION TAB CONTROL
  initSkillsTabs();

  // 5. SCROLL TRIGGER REVEAL ANIMATIONS
  initScrollReveal();

  // 6. CONTACT FORM HANDLING WITH SQL SIMULATION
  initContactForm();

  // 7. IN-PORTFOLIO RESUME MODAL & DOWNLOAD CONTROLS
  initResumeModal();

  // 8. NAVIGATION ACTIVE HIGHLIGHT & SCROLLSPY
  initNavHighlight();

  // 9. RESUME MODAL VELAS-INTRO KINETIC SIMULATION
  initResumeCanvas();

  // 10. MOBILE NAVIGATION DRAWER
  initMobileNav();

  // 11. HEADER BG SCROLL TOGGLE
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
});

/* ==========================================================================
   1. Canvas Connection Background (Golden Theme + Mouse Connection)
   ========================================================================== */
function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  let particles = [];
  const particleCount = Math.min(75, Math.floor((width * height) / 20000));
  
  // Mouse coordinates tracking
  let mouse = { x: null, y: null, radius: 160 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Resize Handler
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.baseRadius = Math.random() * 2 + 1;
      this.radius = this.baseRadius;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Wall bouncing
      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // Mouse interactive animation (Nodes float towards mouse if close)
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          // Attract lightly
          this.x += dx * 0.01;
          this.y += dy * 0.01;
          this.radius = this.baseRadius * 1.5;
        } else {
          this.radius = this.baseRadius;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(249, 115, 22, 0.55)';
      ctx.shadowBlur = this.radius > 2 ? 8 : 0;
      ctx.shadowColor = 'rgba(249, 115, 22, 0.6)';
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }
  }

  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw grid connection lines
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Draw connections if close enough (representing RAC or replication links)
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(212, 175, 55, ${0.14 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Connect particles to mouse
      if (mouse.x !== null && mouse.y !== null) {
        let dx = particles[i].x - mouse.x;
        let dy = particles[i].y - mouse.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(249, 115, 22, ${0.16 * (1 - dist / mouse.radius)})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   2. Terminal Simulator
   ========================================================================== */
function initTerminal() {
  const body = document.getElementById('terminal-body');
  const input = document.getElementById('terminal-input');
  const cursor = document.getElementById('terminal-cursor');
  const inputWrapper = document.querySelector('.terminal-input-wrapper');
  
  if (!body || !input || !cursor) return;

  // Custom commands database
  const commands = {
    help: `
Available commands:
  <span class="cmd-cmd">help</span>         : Show this commands list
  <span class="cmd-cmd">resume</span>       : View &amp; download official resume (DOCX/PDF)
  <span class="cmd-cmd">rfq</span>          : Inspect AGIC RFQ Portal v2.0 specs
  <span class="cmd-cmd">edtracker</span>    : Inspect Amaravati Land CRM specs
  <span class="cmd-cmd">docs</span>         : List 15 authored official technical manuals
  <span class="cmd-cmd">architecture</span> : View enterprise multi-tier topology
  <span class="cmd-cmd">projects</span>     : Display highlight project details
  <span class="cmd-cmd">skills</span>       : Show technical stack &amp; competencies
  <span class="cmd-cmd">experience</span>   : Show career history &amp; roles
  <span class="cmd-cmd">sysinfo</span>      : Read live virtual DB system metrics
  <span class="cmd-cmd">contact</span>      : Print contact options
  <span class="cmd-cmd">clear</span>        : Reset the terminal screen
`,
    resume: () => {
      if (window.openResumeModal) {
        setTimeout(() => window.openResumeModal(), 300);
      }
      return `
<span class="cmd-header">[ KOTAGIRI KIRAN TEJA — RESUME DOSSIER ]</span>
• Status           : <span class="cmd-success">Interactive Resume Viewer Launched</span>
• Direct Downloads :
  - Word (.docx)   : <a href="Kotagiri_Kiran_Teja_Resume.docx" download="Kotagiri_Kiran_Teja_Resume.docx" style="color:var(--primary); font-weight:bold;">Kotagiri_Kiran_Teja_Resume.docx</a>
  - Adobe (.pdf)   : <a href="Kotagiri_Kiran_Teja_Resume.pdf" download="Kotagiri_Kiran_Teja_Resume.pdf" style="color:var(--secondary); font-weight:bold;">Kotagiri_Kiran_Teja_Resume.pdf</a>
• Action           : Opening in-portfolio modal preview now...
`;
    },
    rfq: `
<span class="cmd-header">[ AGIC RFQ E-PROCUREMENT PORTAL v2.0 ]</span>
• Organization   : Amaravati Growth and Infrastructure Corporation Limited (AGIC)
• Role           : Full-Stack Architect & Database Designer (Built From Scratch)
• Architecture   : FastAPI REST Engine + React 19 SPA + PostgreSQL 16
• Key Features   :
  - 100% dynamic market pricing (eliminates pre-fixed CE rates) & total EMD elimination
  - Strict Chief Engineer multi-officer isolation & private quotation evaluation centers
  - 6-step vendor bidding wizard (supports L&T, Tata Advanced Materials, Navayuga, MEIL)
  - Dynamic on-the-fly streaming ZIP packaging engine (io.BytesIO)
  - Non-SoR committee minutes & governance tracking
• Documentation  : Complete 8-Volume Official Technical & Disaster Recovery Manual Suite
• Production IP  : http://210.212.206.36:5173/ | LAN: 172.16.2.155
`,
    edtracker: `
<span class="cmd-header">[ AMARAVATI LAND CRM & EXECUTIVE DASHBOARD (ED-TRACKER) ]</span>
• Organization   : APCRDA / AGIC (Government of Andhra Pradesh)
• Role           : Lead Architect & Full-Stack Developer (Built From Scratch)
• Architecture   : FastAPI + PostgreSQL 18 (psycopg 3) + React 19 + Chart.js
• Key Features   :
  - 70-column relational schema (crm.crm) tracking 117+ prime land parcels & milestones
  - Automated 69-column Excel master template generator & batch validation engine
  - Granular JWT RBAC (require_read_permission, require_write_permission)
  - Interactive Chart.js KPI graph builder & PPT milestone stage filtering
  - Complete immutable security mutation audit logs (crm.audit_logs)
• Documentation  : Complete 7-Volume Official Technical & User Manual Suite
`,
    docs: `
<span class="cmd-header">[ AUTHOR OF 15 OFFICIAL TECHNICAL DOCUMENTATION VOLUMES ]</span>
<span class="hl">AGIC RFQ Portal Suite (8 Volumes):</span>
  Vol 01: System Architecture, Database Design & REST API Specifications
  Vol 02: User Manual & Operational Workflows (CE & Bidder Guides)
  Vol 03: Codebase Directory & File Locations Reference
  Vol 04: Production Deployment & Infrastructure Administration Guide
  Vol 05: Complete REST API Reference & Integration Guide
  Vol 06: Committee Minutes & Non-SoR Governance Workflows
  Vol 07: Brand Identity, Visual Design System & Color Tokens
  Vol 08: Master File Inventory, Source Map & LAN Disaster Recovery
<span class="hl">Amaravati Land CRM / ED-Tracker Suite (7 Volumes):</span>
  Vol 01: Operations & Executive User Manual
  Vol 02: Technical Stack & Microservice Architecture
  Vol 03: REST API Documentation & Endpoint Source Map
  Vol 04: Component Directory & Application Paths
  Vol 05: Database Schema Dictionary & Credentials Directory
  Vol 06: Deployment, Nginx Reverse Proxy & NSSM Services
  Vol 07: System Implementation Changelog & Master Troubleshooting Guide
`,
    architecture: `
<span class="cmd-header">[ ENTERPRISE MULTI-TIER SYSTEM ARCHITECTURE ]</span>
[Client Tier]     React 19 SPA (Vite / Tailwind CSS / Lucide Icons)
       │          Dual Portals: Officer Review Center & Vendor Bidding Wizard
       ▼ (HTTPS / REST API / JWT Bearer)
[Gateway / Proxy] Nginx Reverse Proxy (Port 80/443 -> 8000, 50MB Uploads)
       ▼
[Application]     FastAPI REST Microservice (Python 3.14 / Uvicorn ASGI)
                  ├── JWT Token Authentication & Granular RBAC
                  ├── Dynamic Excel 69-Col Batch Validation Engine
                  └── On-the-fly In-Memory ZIP Streaming Engine (io.BytesIO)
       ▼ (Connection Pooling / SQLAlchemy / psycopg 3)
[Database Tier]   PostgreSQL 16/18 Enterprise Engine
                  ├── RFQ_DB: rfq_tenders, rfq_jobs, applications, annexures
                  └── crm: 70-column master parcel schema, audit_logs
`,
    skills: `
<span class="cmd-header">[ KTEJA TECHNICAL ECOSYSTEM ]</span>
• Full-Stack Architecture : PostgreSQL 16/18, FastAPI (Python 3.14), React 19, JWT RBAC
• SQL Server DBA (4+ Yrs) : AlwaysOn AG, High Availability, DMVs, Query Tuning, T-SQL
• Oracle EBS & Database   : EBS 12.2 Cloning/Patching, OEM 13.5, RMAN Point-in-Time Recovery
• Data Engines & Analytics: Two-Way Excel Parsers, Power BI (DAX), SSIS ETL, Chart.js
• Automation & DevOps     : PowerShell, Linux Bash, Docker, Nginx, Windows NSSM
• Technical Authoring     : 15 Official Engineering Documentation Volumes (Architecture, APIs, DR)
`,
    experience: `
<span class="cmd-header">[ PROFESSIONAL WORK HISTORY ]</span>
1. Lead DBA & Platform Architect | Entro Labs / APCRDA & AGIC (2025 - Present)
   - Architected & built AGIC RFQ Portal v2.0 & Amaravati Land CRM from scratch.
   - Designed PostgreSQL 16/18 relational schemas, FastAPI REST APIs, and React 19 UIs.
   - Maintained 99.99% uptime on SQL Server AlwaysOn and automated DR verification.
   - Authored 15 official technical and operational documentation manuals.
2. Oracle Apps DBA & BI Developer | Techbulls Software Services (2022 - 2025)
   - Oracle EBS 12.2 cloning, patching, OEM 13.5 monitoring, and RMAN recovery.
   - Built executive Power BI dashboards with DAX modeling and SSIS ETL pipelines.
`,
    projects: `
<span class="cmd-header">[ HIGHLIGHT PROJECT REPOSITORY ]</span>
• <span class="cmd-success">AGIC RFQ Portal v2.0</span>: Complete state e-procurement platform (FastAPI, React 19, PostgreSQL 16, Streaming ZIP, 8-vol docs).
• <span class="cmd-success">Amaravati Land CRM</span>: Executive land parcel & capital tracker (PostgreSQL 18, 70-col schema, Excel engine, 7-vol docs).
• <span class="cmd-success">AP Nirman</span>: Govt infrastructure materials procurement with Oracle 11g, PL/SQL, and CFMS API.
• <span class="cmd-success">BLIL Financial Analytics</span>: High-volume Power BI tabular models & nocturnal SSIS ETL pipelines.
• <span class="cmd-success">HA & DR Automation Suite</span>: Proactive SQL AlwaysOn & Oracle RMAN monitoring via PowerShell & Bash.
Type '<span class="cmd-cmd">rfq</span>' or '<span class="cmd-cmd">edtracker</span>' for deep system specifics!
`,
    contact: `
<span class="cmd-header">[ CONTACT DIRECTORY ]</span>
• Email    : <a href="mailto:kotagirikiranteja@gmail.com" style="color:var(--primary);">kotagirikiranteja@gmail.com</a>
• Phone    : +91 7337229232
• LinkedIn : <a href="https://linkedin.com/in/kiran-teja-26ba3b258" target="_blank" style="color:var(--primary);">linkedin.com/in/kiran-teja-26ba3b258</a>
• Location : Bapatla District, Andhra Pradesh, India
`,
    sysinfo: () => {
      const load = Math.floor(Math.random() * 15) + 5;
      const tps = Math.floor(Math.random() * 500) + 1850;
      return `
<span class="cmd-header">[ PRODUCTION PLATFORM & DATABASE METRICS ]</span>
• Active Clusters      : PostgreSQL 18 (Cluster UP) | SQL AlwaysOn Prim (UP) | Oracle RAC Node 1/2
• Flagship Deployments : AGIC RFQ Portal (Active) | Amaravati Land CRM (Active)
• System Load          : ${load}% CPU utilization
• Active Connections   : ${Math.floor(Math.random() * 60) + 160} processes
• Current Uptime       : 248 days, 16 hours, 28 mins
• Transaction Speed    : ${tps} Commits/sec
• Status               : <span class="cmd-success">HEALTHY / 99.99% ENTERPRISE SLA MAINTAINED</span>
`;
    }
  };

  // Cursor follow logic
  function updateCursor() {
    const textLength = input.value.length;
    const charWidth = 7.8; 
    cursor.style.left = `${textLength * charWidth}px`;
  }

  input.addEventListener('input', updateCursor);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const query = input.value.trim().toLowerCase();
      
      // Echo the command typed
      const echoLine = document.createElement('div');
      echoLine.className = 'terminal-line';
      echoLine.innerHTML = `<span class="terminal-prompt">KTejaDB&gt;</span> <span class="cmd-cmd">${query}</span>`;
      body.insertBefore(echoLine, inputWrapper.parentNode);

      if (query !== '') {
        const responseLine = document.createElement('div');
        responseLine.className = 'terminal-line';

        if (commands[query]) {
          if (typeof commands[query] === 'function') {
            responseLine.innerHTML = commands[query]();
          } else {
            responseLine.innerHTML = commands[query];
          }
        } else if (query === 'clear') {
          const lines = body.querySelectorAll('.terminal-line');
          lines.forEach(l => l.remove());
        } else {
          responseLine.innerHTML = `<span class="cmd-error">Command not found: '${query}'. Type 'help' for available queries.</span>`;
        }

        if (query !== 'clear') {
          body.insertBefore(responseLine, inputWrapper.parentNode);
        }
      }

      // Reset and scroll
      input.value = '';
      updateCursor();
      body.scrollTop = body.scrollHeight;
    }
  });

  const widget = document.querySelector('.terminal-widget');
  if (widget) {
    widget.addEventListener('click', () => {
      input.focus();
    });
  }
}

/* ==========================================================================
   3. Live DBA Metrics Updates
   ========================================================================== */
function initMetrics() {
  const activeConn = document.getElementById('metric-connections');
  const querySpeed = document.getElementById('metric-speed');
  const bufferHit = document.getElementById('metric-buffer');

  if (!activeConn || !querySpeed || !bufferHit) return;

  // Simulate server activity updates every 3.5s
  setInterval(() => {
    // Dynamic connection flux
    const deltaConn = Math.floor(Math.random() * 11) - 5;
    let currConn = parseInt(activeConn.innerText);
    currConn = Math.max(100, Math.min(250, currConn + deltaConn));
    activeConn.innerText = currConn;

    // Dynamic execution duration
    const speed = (0.01 + Math.random() * 0.04).toFixed(3);
    querySpeed.innerText = speed;

    // Buffer Cache Hit ratio (should stay near 99.x% representing DBA optimization)
    const ratio = (99.88 + Math.random() * 0.09).toFixed(2);
    bufferHit.innerText = ratio;

    // Randomize mini graph heights
    const cards = document.querySelectorAll('.metric-card.active');
    cards.forEach(card => {
      const bars = card.querySelectorAll('.metric-bar');
      bars.forEach(bar => {
        const height = Math.floor(Math.random() * 85) + 15;
        bar.style.height = `${height}%`;
      });
    });

  }, 3500);
}

/* ==========================================================================
   4. Skills Section Tab Control
   ========================================================================== */
function initSkillsTabs() {
  const buttons = document.querySelectorAll('.skill-cat-btn');
  const displays = document.querySelectorAll('.skills-list');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      // Update active button state
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show selected list & trigger widths animation
      displays.forEach(disp => {
        if (disp.getAttribute('id') === `skills-${category}`) {
          disp.classList.add('active');
          const bars = disp.querySelectorAll('.skill-bar');
          bars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
          });
        } else {
          disp.classList.remove('active');
          const bars = disp.querySelectorAll('.skill-bar');
          bars.forEach(bar => {
            bar.style.width = '0%';
          });
        }
      });
    });
  });

  const activeBtn = document.querySelector('.skill-cat-btn.active');
  if (activeBtn) activeBtn.click();
}

/* ==========================================================================
   5. Scroll Trigger Reveal Animations
   ========================================================================== */
let statsAnimated = false;

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        if (!statsAnimated && (entry.target.id === 'about' || entry.target.classList.contains('about') || entry.target.querySelector('.about-grid'))) {
          statsAnimated = true;
          animateStats();
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  reveals.forEach(el => revealObserver.observe(el));

  // Fallback: Trigger stats counter on initial load if already scrolled or within 1s
  setTimeout(() => {
    if (!statsAnimated) {
      const aboutSec = document.getElementById('about');
      if (aboutSec) {
        const rect = aboutSec.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          statsAnimated = true;
          animateStats();
        }
      }
    }
  }, 1000);
}

function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-num-value');
  
  statNumbers.forEach(numEl => {
    const targetStr = numEl.getAttribute('data-target');
    const target = parseFloat(targetStr);
    const isFloat = numEl.getAttribute('data-float') === 'true';
    const decimals = isFloat ? (targetStr.split('.')[1] || '').length : 0;
    let current = 0;
    const duration = 1600; // ms
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      if (isFloat) {
        numEl.innerText = current.toFixed(decimals);
      } else {
        numEl.innerText = Math.floor(current);
      }
    }, stepTime);
  });
}

/* ==========================================================================
   6. Contact Form & SQL Simulation Output
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const message = document.getElementById('messageInput').value.trim();

    if (!name || !email || !message) {
      feedback.className = 'form-feedback error';
      feedback.innerText = 'Error: Complete all database fields (Name, Email, Message) before COMMIT.';
      return;
    }

    // Dynamic Mock SQL Response text with golden highlights
    feedback.className = 'form-feedback success';
    feedback.innerHTML = `
<span style="color:var(--text-gold-muted);">-- Query compiled and executed successfully:</span>
<span style="color:var(--primary);">INSERT INTO</span> contact_messages (sender_name, email_address, message_body, submitted_at)
<span style="color:var(--primary);">VALUES</span> ('${name.replace(/'/g, "''")}', '${email.replace(/'/g, "''")}', '${message.replace(/'/g, "''").substring(0, 45)}...', NOW());

<span style="color:var(--secondary);">COMMIT;</span>
<span style="color:var(--primary); font-weight:bold; text-shadow:0 0 6px var(--primary-glow);">Query OK, 1 row affected (0.02 sec) [COMMITTED]</span>
<span style="color:var(--text-main);">Thank you for reaching out! Your message has been safely committed to the database. I will get back to you shortly.</span>
    `;

    // Clear fields
    form.reset();
  });
}

/* ==========================================================================
   7. In-Portfolio Interactive Resume Modal
   ========================================================================== */
function initResumeModal() {
  const modal = document.getElementById('resumeModal');
  const openHeroBtn = document.getElementById('openResumeHeroBtn');
  const navBtn = document.getElementById('navResumeBtn');
  const closeBtn = document.getElementById('closeResumeModalBtn');

  if (!modal) return;

  window.openResumeModal = () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (window.startResumeCanvas) {
      window.startResumeCanvas();
    }
  };

  window.closeResumeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (window.stopResumeCanvas) {
      window.stopResumeCanvas();
    }
  };

  if (openHeroBtn) openHeroBtn.addEventListener('click', window.openResumeModal);
  if (navBtn) navBtn.addEventListener('click', window.openResumeModal);
  if (closeBtn) closeBtn.addEventListener('click', window.closeResumeModal);

  document.querySelectorAll('[data-open="resume"], a[href="#resumeModal"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      window.openResumeModal();
    });
  });

  // Close when clicking backdrop outside of modal card
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      window.closeResumeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      window.closeResumeModal();
    }
  });
}

/* ==========================================================================
   8. Navigation Active State & Smooth Scrollspy
   ========================================================================== */
function initNavHighlight() {
  const navLinks = document.querySelectorAll('header nav ul li a[href^="#"]');
  const header = document.querySelector('header');
  const logo = document.querySelector('header .logo');

  // Smooth scroll to top on logo click
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navLinks.forEach(l => l.classList.remove('active'));
      const aboutLink = document.querySelector('header nav ul li a[href="#about"]');
      if (aboutLink) aboutLink.classList.add('active');
    });
  }

  // 1. Click Handler: smooth scroll with offset and immediate highlight
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').substring(1);
      const targetSec = document.getElementById(targetId);

      if (targetSec) {
        e.preventDefault();

        // Update active class immediately
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Close mobile nav if open
        const navUl = document.querySelector('header nav ul');
        const toggleBtn = document.querySelector('.mobile-nav-toggle');
        if (navUl && navUl.classList.contains('open')) {
          navUl.classList.remove('open');
          if (toggleBtn) {
            const icon = toggleBtn.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
          }
        }

        // Calculate offset with fixed header
        const headerHeight = header ? header.offsetHeight : 80;
        const targetTop = targetSec.getBoundingClientRect().top + window.pageYOffset - headerHeight + 5;

        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // 2. Scrollspy: Highlight nav link based on scroll position
  const sectionIds = ['about', 'skills', 'experience', 'projects', 'contact'];
  let isScrolling = false;

  function updateScrollSpy() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const headerHeight = header ? header.offsetHeight : 80;
    const viewThreshold = scrollY + headerHeight + 140;

    // Bottom of document -> Contact is active
    if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 80) {
      navLinks.forEach(l => l.classList.remove('active'));
      const contactLink = document.querySelector('header nav ul li a[href="#contact"]');
      if (contactLink) contactLink.classList.add('active');
      return;
    }

    let currentSectionId = null;
    // Iterate sections from bottom to top
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const id = sectionIds[i];
      const sec = document.getElementById(id);
      if (sec) {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (viewThreshold >= top && viewThreshold < top + height) {
          currentSectionId = id;
          break;
        }
      }
    }

    // Default to 'about' if near top of the page
    if (!currentSectionId && scrollY < 400) {
      currentSectionId = 'about';
    }

    if (currentSectionId) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        updateScrollSpy();
        isScrolling = false;
      });
      isScrolling = true;
    }
  }, { passive: true });

  // Initial update
  updateScrollSpy();
}

/* ==========================================================================
   9. Mobile Navigation Drawer Toggle
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navUl = document.querySelector('header nav ul');
  if (!toggleBtn || !navUl) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navUl.classList.toggle('open');
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      if (navUl.classList.contains('open')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    }
  });

  // Close when clicking outside header
  document.addEventListener('click', (e) => {
    if (navUl.classList.contains('open') && !navUl.contains(e.target) && !toggleBtn.contains(e.target)) {
      navUl.classList.remove('open');
      const icon = toggleBtn.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
    }
  });
}

/* ==========================================================================
   10. Velas-Intro Inspired Kinetic Simulation Canvas (Obsidian & Gold Theme)
   ========================================================================== */
let resumeCanvasAnimId = null;

function initResumeCanvas() {
  const canvas = document.getElementById('resume-canvas');
  const container = document.querySelector('.resume-modal-container');
  if (!canvas || !container) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;

  function resize() {
    if (!container) return;
    const rect = container.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    if (width === 0 || height === 0) return;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  // Interactive mouse tracking relative to modal container
  let mouse = { x: -9999, y: -9999, active: false };
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });
  container.addEventListener('mouseleave', () => {
    mouse.active = false;
    mouse.x = -9999;
    mouse.y = -9999;
  });

  // Kinetic Particle Stream Class
  class VelasParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = initial ? Math.random() * (width || 900) : (Math.random() < 0.4 ? -10 : Math.random() * (width || 900));
      this.y = initial ? Math.random() * (height || 700) : Math.random() * (height || 700);
      this.baseSpeed = Math.random() * 1.5 + 0.8;
      this.speed = this.baseSpeed;
      this.radius = Math.random() * 2.2 + 0.8;
      this.baseRadius = this.radius;
      this.alpha = Math.random() * 0.55 + 0.25;
      this.pulseSpeed = Math.random() * 0.03 + 0.01;
      this.pulsePhase = Math.random() * Math.PI * 2;

      // Color distribution: 55% Gold, 35% Electric Orange, 10% Pale Amber
      const roll = Math.random();
      if (roll < 0.55) {
        this.color = '255, 215, 0';   // Gold
      } else if (roll < 0.90) {
        this.color = '249, 115, 22';  // Electric Orange
      } else {
        this.color = '254, 240, 138'; // Pale Gold Light
      }
    }

    update(time) {
      this.pulsePhase += this.pulseSpeed;
      const currentAlpha = this.alpha * (0.6 + 0.4 * Math.sin(this.pulsePhase));

      // Organic Velas harmonic vector flow field
      const angle = (Math.sin(this.x * 0.0035 + time * 0.7) * Math.cos(this.y * 0.003 + time * 0.5) * 1.8) +
                    (Math.sin((this.x + this.y) * 0.002 + time * 0.4) * 0.8) + 0.2;

      let vx = Math.cos(angle) * this.speed;
      let vy = Math.sin(angle) * this.speed * 0.75 + 0.35; // gentle downward/rightward drift

      // Mouse interactive deflection / vortex
      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 140;
        if (dist < maxDist && dist > 1) {
          const force = (1 - dist / maxDist) * 3.6;
          vx += (dx / dist) * force;
          vy += (dy / dist) * force;
          this.radius = this.baseRadius * 1.5;
        } else {
          this.radius = this.baseRadius;
        }
      }

      this.x += vx;
      this.y += vy;

      // Wrap around bounds
      if (this.x < -30) this.x = width + 20;
      if (this.x > width + 30) this.x = -20;
      if (this.y < -30) this.y = height + 20;
      if (this.y > height + 30) this.y = -20;

      return currentAlpha;
    }

    draw(ctx, currentAlpha) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${currentAlpha})`;
      if (this.radius > 2.0) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${this.color}, 0.85)`;
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Initialize Particles (115 particles for rich fluid motion)
  const particleCount = 115;
  const particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new VelasParticle());
  }

  // Velas Harmonic Wave Ribbon parameters
  const ribbons = [
    {
      yRatio: 0.26,
      amplitude: 58,
      frequency: 0.0035,
      speed: 0.65,
      phase: 0,
      color1: 'rgba(255, 215, 0, 0.22)',
      color2: 'rgba(249, 115, 22, 0.02)',
      lineWidth: 2,
      lineColor: 'rgba(255, 215, 0, 0.65)',
      glow: 14
    },
    {
      yRatio: 0.50,
      amplitude: 75,
      frequency: 0.0028,
      speed: 0.5,
      phase: 1.8,
      color1: 'rgba(249, 115, 22, 0.24)',
      color2: 'rgba(180, 83, 9, 0.02)',
      lineWidth: 2.4,
      lineColor: 'rgba(249, 115, 22, 0.75)',
      glow: 16
    },
    {
      yRatio: 0.74,
      amplitude: 62,
      frequency: 0.0032,
      speed: 0.58,
      phase: 3.4,
      color1: 'rgba(255, 215, 0, 0.18)',
      color2: 'rgba(249, 115, 22, 0.02)',
      lineWidth: 1.8,
      lineColor: 'rgba(254, 240, 138, 0.55)',
      glow: 12
    }
  ];

  let startTime = null;

  function render(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = (timestamp - startTime) * 0.001; // seconds

    ctx.clearRect(0, 0, width, height);

    // 1. Subtle deep gradient background (Obsidian / Dark Amber Vignette)
    const bgGrad = ctx.createRadialGradient(width * 0.45, height * 0.4, 60, width * 0.5, height * 0.5, Math.max(width, height) * 0.85);
    bgGrad.addColorStop(0, 'rgba(32, 20, 13, 0.65)');
    bgGrad.addColorStop(0.55, 'rgba(14, 10, 8, 0.88)');
    bgGrad.addColorStop(1, 'rgba(6, 5, 5, 0.98)');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Render Velas Kinetic Undulating Wave Ribbons
    ribbons.forEach((ribbon) => {
      const baseY = height * ribbon.yRatio;

      ctx.beginPath();
      ctx.moveTo(0, baseY);

      const step = 8;
      for (let x = 0; x <= width + step; x += step) {
        // Multi-frequency harmonic superposition for organic fluid motion
        const wave1 = Math.sin(x * ribbon.frequency + elapsed * ribbon.speed + ribbon.phase) * ribbon.amplitude;
        const wave2 = Math.cos(x * ribbon.frequency * 1.6 - elapsed * ribbon.speed * 0.7) * (ribbon.amplitude * 0.45);
        const wave3 = Math.sin(x * ribbon.frequency * 0.5 + elapsed * 0.3) * (ribbon.amplitude * 0.3);

        let y = baseY + wave1 + wave2 + wave3;

        // Mouse hover elevation
        if (mouse.active) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            y += Math.sin((1 - dist / 180) * Math.PI) * -28;
          }
        }

        ctx.lineTo(x, y);
      }

      // Complete ribbon fill down towards bottom
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      const ribbonGrad = ctx.createLinearGradient(0, baseY - ribbon.amplitude, 0, baseY + ribbon.amplitude * 2.2);
      ribbonGrad.addColorStop(0, ribbon.color1);
      ribbonGrad.addColorStop(1, ribbon.color2);
      ctx.fillStyle = ribbonGrad;
      ctx.fill();

      // Stroke glowing crest spine line
      ctx.beginPath();
      ctx.moveTo(0, baseY);
      for (let x = 0; x <= width + step; x += step) {
        const wave1 = Math.sin(x * ribbon.frequency + elapsed * ribbon.speed + ribbon.phase) * ribbon.amplitude;
        const wave2 = Math.cos(x * ribbon.frequency * 1.6 - elapsed * ribbon.speed * 0.7) * (ribbon.amplitude * 0.45);
        const wave3 = Math.sin(x * ribbon.frequency * 0.5 + elapsed * 0.3) * (ribbon.amplitude * 0.3);
        let y = baseY + wave1 + wave2 + wave3;
        if (mouse.active) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            y += Math.sin((1 - dist / 180) * Math.PI) * -28;
          }
        }
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = ribbon.lineColor;
      ctx.lineWidth = ribbon.lineWidth;
      ctx.shadowBlur = ribbon.glow;
      ctx.shadowColor = ribbon.lineColor;
      ctx.stroke();
      ctx.shadowBlur = 0;
    });

    // 3. Render Particles & Kinetic Filaments
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const alpha = p.update(elapsed);
      p.draw(ctx, alpha);

      // Connect proximate particles with subtle gold filaments (Constellation effect)
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 55) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(255, 215, 0, ${0.18 * (1 - dist / 55)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    // Continue loop if modal is active
    const modal = document.getElementById('resumeModal');
    if (modal && modal.classList.contains('active')) {
      resumeCanvasAnimId = requestAnimationFrame(render);
    }
  }

  // Lifecycle control methods exposed to window
  window.startResumeCanvas = () => {
    resize();
    if (resumeCanvasAnimId) {
      cancelAnimationFrame(resumeCanvasAnimId);
      resumeCanvasAnimId = null;
    }
    startTime = null;
    resumeCanvasAnimId = requestAnimationFrame(render);
  };

  window.stopResumeCanvas = () => {
    if (resumeCanvasAnimId) {
      cancelAnimationFrame(resumeCanvasAnimId);
      resumeCanvasAnimId = null;
    }
  };

  window.addEventListener('resize', () => {
    const modal = document.getElementById('resumeModal');
    if (modal && modal.classList.contains('active')) {
      resize();
    }
  });
}

