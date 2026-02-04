// GitHub Projects Loader
const DEFAULT_USERNAME = ""; // Deixe vazio ou coloque seu usuário padrão

async function loadGithubProjects() {
  const usernameInput = document.getElementById("github-username");
  const username = usernameInput.value.trim() || DEFAULT_USERNAME;
  const projectsGrid = document.getElementById("projects-grid");

  if (!username) {
    showNotification("Por favor, insira um usuário do GitHub", "error");
    usernameInput.focus();
    return;
  }

  // Show loading state
  projectsGrid.innerHTML = `
        <div class="col-span-full flex justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
    `;

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
    );

    if (!response.ok) {
      throw new Error("Usuário não encontrado ou limite de API excedido");
    }

    const repos = await response.json();

    if (repos.length === 0) {
      projectsGrid.innerHTML = `
                <div class="col-span-full text-center py-12 text-slate-400">
                    <i data-feather="inbox" class="w-12 h-12 mx-auto mb-4 opacity-50"></i>
                    <p>Nenhum repositório público encontrado</p>
                </div>
            `;
      feather.replace();
      return;
    }

    // Clear and populate
    projectsGrid.innerHTML = "";

    repos.forEach((repo) => {
      // Determine tags based on language or topics
      const tags = repo.language ? [repo.language] : ["Open Source"];
      if (repo.topics && repo.topics.length > 0) {
        tags.push(...repo.topics.slice(0, 3));
      }

      const card = document.createElement("project-card");
      card.setAttribute("title", repo.name);
      card.setAttribute(
        "description",
        repo.description || "Sem descrição disponível",
      );
      card.setAttribute(
        "image",
        `https://static.photos/technology/640x360/${repo.id % 1000}`,
      );
      card.setAttribute("tags", JSON.stringify(tags.slice(0, 4)));
      card.setAttribute("github", repo.html_url);
      card.setAttribute("stars", repo.stargazers_count);
      card.setAttribute("forks", repo.forks_count);

      projectsGrid.appendChild(card);
    });

    showNotification("Projetos carregados com sucesso!", "success");
    feather.replace();
  } catch (error) {
    console.error("Error loading GitHub projects:", error);
    projectsGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md mx-auto">
                    <i data-feather="alert-circle" class="w-12 h-12 text-red-500 mx-auto mb-4"></i>
                    <h3 class="text-white font-semibold mb-2">Erro ao carregar projetos</h3>
                    <p class="text-slate-400 text-sm">${error.message}</p>
                    <button onclick="resetToDefaultProjects()" class="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm transition-colors">
                        Voltar para projetos padrão
                    </button>
                </div>
            </div>
        `;
    feather.replace();
  }
}

function resetToDefaultProjects() {
  const projectsGrid = document.getElementById("projects-grid");
  projectsGrid.innerHTML = `
        <project-card 
            title="E-Commerce Platform"
            description="Plataforma completa de e-commerce com painel administrativo, pagamentos integrados e sistema de estoque em tempo real."
            image="https://static.photos/technology/640x360/123"
            tags='["React", "Node.js", "MongoDB", "Stripe"]'
            github="https://github.com"
        </project-card>

        <project-card 
            title="Task Management App"
            description="Aplicativo de gestão de tarefas colaborativo com drag-and-drop, notificações em tempo real e integração com calendários."
            image="https://static.photos/minimal/640x360/456"
            tags='["TypeScript", "Next.js", "Prisma", "Socket.io"]'
            github="https://github.com"
        </project-card>

        <project-card 
            title="AI Dashboard"
            description="Dashboard analítico com visualização de dados e integração de modelos de machine learning para predições de negócio."
            image="https://static.photos/abstract/640x360/789"
            tags='["Python", "TensorFlow", "FastAPI", "React"]'
            github="https://github.com"
        </project-card>
    `;
  feather.replace();
}

// Notification System
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existing = document.querySelector(".notification-toast");
  if (existing) existing.remove();

  const notification = document.createElement("div");
  const colors = {
    success: "bg-emerald-500",
    error: "bg-red-500",
    info: "bg-indigo-500",
  };

  notification.className = `notification-toast fixed top-24 right-6 ${colors[type]} text-white px-6 py-4 rounded-lg shadow-2xl z-50 transform translate-x-full transition-transform duration-300 flex items-center gap-3`;
  notification.innerHTML = `
        <i data-feather="${type === "success" ? "check-circle" : type === "error" ? "x-circle" : "info"}" class="w-5 h-5"></i>
        <span class="font-medium">${message}</span>
    `;

  document.body.appendChild(notification);
  feather.replace();

  // Animate in
  setTimeout(() => {
    notification.classList.remove("translate-x-full");
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.add("translate-x-full");
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Intersection Observer for Animations
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Observe elements for animation
  document.querySelectorAll("section > div").forEach((el) => {
    el.classList.add(
      "opacity-0",
      "translate-y-8",
      "transition-all",
      "duration-700",
    );
    el.classList.add("animate-target");
    observer.observe(el);
  });

  // Add animation class styles dynamically
  const style = document.createElement("style");
  style.textContent = `
        .animate-target.animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
  document.head.appendChild(style);

  // Form submission handler
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    showNotification("Mensagem enviada com sucesso! (Demo)", "success");
    e.target.reset();
  });

  // Navbar scroll effect
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector("custom-navbar");
    if (!navbar) return;

    const currentScroll = window.pageYOffset;
    const shadow = currentScroll > 50 ? "shadow-lg shadow-black/20" : "";

    if (currentScroll > lastScroll && currentScroll > 100) {
      // Scrolling down
      navbar.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      navbar.style.transform = "translateY(0)";
    }

    lastScroll = currentScroll;
  });

  // Try to load default projects if username is set
  if (DEFAULT_USERNAME) {
    loadGithubProjects();
  }
});

// Typewriter effect for hero (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Export functions for global access
window.loadGithubProjects = loadGithubProjects;
window.resetToDefaultProjects = resetToDefaultProjects;
