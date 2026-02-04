class ProjectCard extends HTMLElement {
  static get observedAttributes() {
    // Adicionamos 'demo' de volta aqui para o componente "escutar" esse atributo
    return ["title", "description", "image", "tags", "github", "demo", "stars", "forks"];
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot) {
      this.render();
    }
  }

  render() {
    const title = this.getAttribute("title") || "Project Title";
    const description = this.getAttribute("description") || "No description available";
    const image = this.getAttribute("image") || "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000&auto=format&fit=crop";
    const tags = JSON.parse(this.getAttribute("tags") || "[]");
    const github = this.getAttribute("github") || "https://github.com/ABXAtrix";
    const demo = this.getAttribute("demo"); // Pegamos o link da demo

    this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; }
                .card {
                    background: rgba(15, 23, 42, 0.6);
                    border: 1px solid rgba(51, 65, 85, 0.5);
                    border-radius: 1.25rem;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    backdrop-filter: blur(10px);
                }
                .card:hover {
                    transform: translateY(-8px);
                    border-color: rgba(99, 102, 241, 0.5);
                    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6);
                    background: rgba(30, 41, 59, 0.7);
                }
                .image-container { position: relative; height: 180px; overflow: hidden; }
                .image-container img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(20%) brightness(80%); transition: transform 0.6s ease; }
                .card:hover .image-container img { transform: scale(1.1); filter: grayscale(0%) brightness(100%); }
                .overlay {
                    position: absolute; inset: 0; background: rgba(15, 23, 42, 0.85);
                    opacity: 0; transition: opacity 0.3s ease;
                    display: flex; align-items: center; justify-content: center; gap: 1rem;
                }
                .card:hover .overlay { opacity: 1; }
                .btn {
                    padding: 0.6rem 1.2rem; border-radius: 0.5rem; font-weight: 600;
                    font-size: 0.8rem; text-decoration: none; display: flex;
                    align-items: center; gap: 0.5rem; transition: all 0.3s ease;
                }
                .btn-primary { background: #6366f1; color: white; }
                .btn-secondary { background: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(255, 255, 255, 0.2); }
                .btn:hover { transform: scale(1.05); }
                .content { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }
                .title { color: #f8fafc; font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; }
                .description { color: #94a3b8; font-size: 0.875rem; line-height: 1.6; margin-bottom: 1.25rem; flex: 1; }
                .tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
                .tag {
                    padding: 0.2rem 0.6rem; background: rgba(99, 102, 241, 0.1);
                    color: #a5b4fc; border: 1px solid rgba(99, 102, 241, 0.2);
                    border-radius: 6px; font-size: 0.7rem; font-weight: 600;
                }
            </style>
            
            <article class="card">
                <div class="image-container">
                    <img src="${image}" alt="${title}" loading="lazy">
                    <div class="overlay">
                        ${demo ? `<a href="${demo}" target="_blank" class="btn btn-primary">Ver Front-End</a>` : ''}
                        
                        <a href="${github}" target="_blank" class="btn btn-secondary">GitHub</a>
                    </div>
                </div>
                
                <div class="content">
                    <h3 class="title">${title}</h3>
                    <p class="description">${description}</p>
                    <div class="tags">
                        ${tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
                    </div>
                </div>
            </article>
        `;
  }
}

customElements.define("project-card", ProjectCard);