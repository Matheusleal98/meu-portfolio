class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    background: #09090b; /* zinc-950 do dashboard */
                    border-top: 1px solid #18181b; /* zinc-800 */
                }
                
                footer {
                    padding: 4rem 1.5rem 2rem 1.5rem;
                    max-width: 1152px; /* max-w-6xl */
                    margin: 0 auto;
                    color: #a1a1aa; /* zinc-400 */
                    font-family: system-ui, -apple-system, sans-serif;
                }

                .grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2rem;
                    margin-bottom: 3rem;
                }

                @media (min-width: 768px) {
                    .grid { grid-template-columns: 2fr 1fr 1fr; }
                }

                .brand-logo {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                }

                .logo-box {
                    width: 2rem;
                    height: 2rem;
                    border-radius: 8px;
                    background: linear-gradient(135deg, #10b981, #3b82f6); /* Esmeralda para combinar com o botão de currículo */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: 0.8rem;
                }

                .brand-name {
                    color: #f4f4f5; /* zinc-100 */
                    font-weight: 700;
                    font-size: 1.125rem;
                }

                h4 {
                    color: #f4f4f5;
                    font-weight: 600;
                    margin-bottom: 1.25rem;
                }

                ul { list-style: none; padding: 0; margin: 0; }
                li { margin-bottom: 0.75rem; font-size: 0.875rem; }

                .footer-link {
                    color: #a1a1aa;
                    text-decoration: none;
                    transition: all 0.2s;
                }

                .footer-link:hover { color: #10b981; } /* emerald-500 */

                .social-flex { display: flex; gap: 0.75rem; }

                .social-icon {
                    width: 2.5rem;
                    height: 2.5rem;
                    border-radius: 12px;
                    background: #18181b;
                    border: 1px solid #27272a;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #a1a1aa;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .social-icon:hover {
                    background: #27272a;
                    color: #10b981;
                    transform: translateY(-3px);
                    border-color: #059669;
                }

                .bottom-bar {
                    padding-top: 2rem;
                    border-top: 1px solid #18181b;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1rem;
                    font-size: 0.875rem;
                    color: #71717a; /* zinc-500 */
                }

                @media (min-width: 768px) {
                    .bottom-bar { flex-direction: row; }
                }

                .heart { color: #ef4444; margin: 0 4px; }
            </style>
            
            <footer>
                <div class="grid">
                    <div>
                        <div class="brand-logo">
                            <div class="logo-box">&lt;/&gt;</div>
                            <span class="brand-name">Guilherme Macêdo</span>
                        </div>
                        <p style="max-width: 320px; line-height: 1.6; font-size: 0.875rem;">
                            Desenvolvedor Back-end em Java, Spring Boot e AWS.
                        </p>
                    </div>
                    
                    <div>
                        <h4>Links</h4>
                        <ul>
                            <li><a href="#home" class="footer-link">Home</a></li>
                            <li><a href="#projects" class="footer-link">Projetos</a></li>
                            <li><a href="#contact" class="footer-link">Contato</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4>Social</h4>
                        <div class="social-flex">
                            <a href="https://github.com/ABXAtrix" target="_blank" class="social-icon" aria-label="GitHub">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            </a>
                            <a href="https://www.linkedin.com/in/guilherme-mac%C3%AAdo-278b4a267/" target="_blank" class="social-icon" aria-label="LinkedIn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="bottom-bar">
                </div>
            </footer>
        `;
  }
}

customElements.define("custom-footer", CustomFooter);
