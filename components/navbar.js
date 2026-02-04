class CustomNavbar extends HTMLElement {
  constructor() {
    super();
    this.isMenuOpen = false;
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 100;
                    font-family: system-ui, -apple-system, sans-serif;
                }
                
                nav {
                    background: rgba(9, 9, 11, 0.8); /* zinc-950 com opacidade */
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-bottom: 1px solid rgba(39, 39, 42, 0.5); /* zinc-800 */
                    height: 5rem; /* h-20 */
                    display: flex;
                    align-items: center;
                    transition: all 0.3s ease;
                }

                .container {
                    max-width: 1152px; /* max-w-6xl */
                    margin: 0 auto;
                    width: 100%;
                    padding: 0 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                
                /* Logo Estilizada */
                .logo {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    text-decoration: none;
                    transition: transform 0.2s ease;
                }

                .logo:hover { transform: scale(1.02); }

                .logo-icon {
                    width: 2.5rem;
                    height: 2.5rem;
                    border-radius: 10px;
                    background: linear-gradient(135deg, #7c3aed, #2563eb);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: 1.1rem;
                    box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
                }

                .logo-text {
                    color: #f4f4f5; /* zinc-100 */
                    font-weight: 700;
                    font-size: 1.25rem;
                    letter-spacing: -0.025em;
                }

                /* Links Desktop */
                .desktop-menu {
                    display: none;
                    align-items: center;
                    gap: 2rem;
                }

                .nav-link {
                    color: #a1a1aa; /* zinc-400 */
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 0.9375rem;
                    transition: all 0.2s ease;
                    position: relative;
                    padding: 0.5rem 0;
                }

                .nav-link:hover { color: #f4f4f5; }

                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    width: 0;
                    height: 2px;
                    background: #a78bfa; /* violet-400 */
                    transition: all 0.3s ease;
                    transform: translateX(-50%);
                }

                .nav-link:hover::after { width: 100%; }

                /* Botão Contrate-me */
                .btn-cta {
                    background: #7c3aed;
                    color: white;
                    padding: 0.625rem 1.25rem;
                    border-radius: 10px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    font-size: 0.875rem;
                    border: 1px solid rgba(255,255,255,0.1);
                }

                .btn-cta:hover {
                    background: #6d28d9;
                    box-shadow: 0 0 20px rgba(124, 58, 237, 0.4);
                    transform: translateY(-1px);
                }

                /* Mobile Menu Toggle */
                .hamburger {
                    background: none;
                    border: none;
                    color: #a1a1aa;
                    cursor: pointer;
                    display: block;
                    padding: 0.5rem;
                }

                .hidden { display: none !important; }

                /* Menu Mobile (Dropdown) */
                .mobile-menu {
                    display: none;
                    position: absolute;
                    top: 5rem;
                    left: 0;
                    right: 0;
                    background: rgba(9, 9, 11, 0.98);
                    border-bottom: 1px solid #27272a;
                    padding: 1rem;
                    flex-direction: column;
                    gap: 0.5rem;
                    animation: slideDown 0.3s ease-out;
                }

                .mobile-menu.open { display: flex; }

                .mobile-link {
                    color: #f4f4f5;
                    text-decoration: none;
                    padding: 1rem;
                    border-radius: 8px;
                    font-weight: 500;
                    transition: background 0.2s;
                }

                .mobile-link:hover { background: #18181b; color: #a78bfa; }

                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (min-width: 768px) {
                    .desktop-menu { display: flex; }
                    .hamburger { display: none; }
                }
            </style>
            
            <nav>
                <div class="container">
                    <a href="#home" class="logo">
                        <div class="logo-icon">&lt;/&gt;</div>
                        <span class="logo-text">Back-End Developer</span>
                    </a>
                    
                    <div class="desktop-menu">
                        <a href="#home" class="nav-link">Home</a>
                        <a href="#about" class="nav-link">Sobre</a>
                        <a href="#projects" class="nav-link">Projetos</a>
                        <a href="#contact" class="nav-link">Contato</a>
                        <a href="#contact" class="btn-cta">Contrate-me</a>
                    </div>
                    
                    <button class="hamburger" aria-label="Abrir Menu">
                        <svg class="menu-icon" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                        <svg class="close-icon hidden" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>

                <div class="mobile-menu">
                    <a href="#home" class="mobile-link">Home</a>
                    <a href="#about" class="mobile-link">Sobre</a>
                    <a href="#projects" class="mobile-link">Projetos</a>
                    <a href="#contact" class="mobile-link">Contato</a>
                    <a href="#contact" class="btn-cta" style="text-align: center; margin-top: 10px;">Contrate-me</a>
                </div>
            </nav>
        `;
  }

  setupEventListeners() {
    const hamburger = this.shadowRoot.querySelector(".hamburger");
    const mobileMenu = this.shadowRoot.querySelector(".mobile-menu");
    const menuIcon = this.shadowRoot.querySelector(".menu-icon");
    const closeIcon = this.shadowRoot.querySelector(".close-icon");
    const mobileLinks = this.shadowRoot.querySelectorAll(".mobile-link");

    hamburger.addEventListener("click", () => {
      this.isMenuOpen = !this.isMenuOpen;
      mobileMenu.classList.toggle("open");
      menuIcon.classList.toggle("hidden");
      closeIcon.classList.toggle("hidden");
    });

    // Close menu when clicking links
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.isMenuOpen = false;
        mobileMenu.classList.remove("open");
        menuIcon.classList.remove("hidden");
        closeIcon.classList.add("hidden");
      });
    });
  }
}

customElements.define("custom-navbar", CustomNavbar);
