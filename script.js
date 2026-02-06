// GitHub Projects Loader
const DEFAULT_USERNAME = "Matheusleal98"; // Configurado para o seu GitHub

async function loadGithubProjects() {
    const projectsGrid = document.getElementById("projects-grid");
    if (!projectsGrid) return;

    // Estado de carregamento (Loading)
    projectsGrid.innerHTML = `
        <div class="col-span-full flex justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
    `;

    try {
        const response = await fetch(
            `https://api.github.com/users/${DEFAULT_USERNAME}/repos?sort=updated&per_page=6`,
        );

        if (!response.ok) throw new Error("Erro na API do GitHub");

        const repos = await response.json();

        if (repos.length === 0) {
            projectsGrid.innerHTML = `<p class="col-span-full text-center text-slate-400">Nenhum repositório encontrado.</p>`;
            return;
        }

        projectsGrid.innerHTML = "";

        repos.forEach((repo) => {
            // Criação do Card Manual para ser compatível com o CSS do site
            const card = document.createElement("div");
            card.className = "p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-indigo-500/50 transition-all flex flex-col justify-between group";
            
            card.innerHTML = `
                <div>
                    <div class="flex justify-between items-start mb-4">
                        <i data-feather="folder" class="text-indigo-400 w-6 h-6"></i>
                        <div class="flex gap-3 text-slate-500">
                            <span class="flex items-center gap-1 text-[10px]"><i data-feather="star" class="w-3 h-3"></i> ${repo.stargazers_count}</span>
                            <a href="${repo.html_url}" target="_blank" class="hover:text-white transition-colors"><i data-feather="github" class="w-5 h-5"></i></a>
                        </div>
                    </div>
                    <h4 class="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">${repo.name}</h4>
                    <p class="text-sm text-slate-400 mb-6 line-clamp-2">${repo.description || "Projeto focado em engenharia de software e backend robusto."}</p>
                </div>
                <div class="flex flex-wrap gap-2">
                    <span class="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-1 rounded-md font-mono">${repo.language || 'Tech'}</span>
                </div>
            `;
            projectsGrid.appendChild(card);
        });

        feather.replace();
    } catch (error) {
        console.error("Erro:", error);
        resetToDefaultProjects(); // Se falhar a API, mostra os projetos fixos
    }
}

function resetToDefaultProjects() {
    const projectsGrid = document.getElementById("projects-grid");
    if (!projectsGrid) return;

    // Seus projetos principais fixos (Caso a API falhe ou queira destacar)
    const defaults = [
        { title: "Desafio VM", desc: "Sistema de gerenciamento de vendas e produtos com Spring Boot.", lang: "Java" },
        { title: "Angular Migration", desc: "Projeto focado na modernização de interfaces para Angular 17.", lang: "Angular" },
        { title: "K8s Deploy", desc: "Scripts e configurações para orquestração de containers.", lang: "DevOps" }
    ];

    projectsGrid.innerHTML = defaults.map(p => `
        <div class="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-emerald-500/50 transition-all">
            <i data-feather="box" class="text-emerald-400 w-6 h-6 mb-4"></i>
            <h4 class="text-xl font-bold text-white mb-2">${p.title}</h4>
            <p class="text-sm text-slate-400 mb-4">${p.desc}</p>
            <span class="text-[10px] bg-slate-800 px-2 py-1 rounded font-mono">${p.lang}</span>
        </div>
    `).join('');
    feather.replace();
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    loadGithubProjects();

    // Efeito de Revelação (Scroll Reveal)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-8');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-8');
        observer.observe(section);
    });
});