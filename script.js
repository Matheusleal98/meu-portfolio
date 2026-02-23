// CONFIGURAÇÕES DE TEMA (DARK/LIGHT)
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

// Verifica preferência anterior ou do sistema
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
    updateThemeUI(true);
} else {
    html.classList.remove('dark');
    updateThemeUI(false);
}

function updateThemeUI(isDark) {
    themeIcon.setAttribute('data-feather', isDark ? 'sun' : 'moon');
    if (window.feather) feather.replace();
}

themeToggle.addEventListener('click', () => {
    const isDark = html.classList.toggle('dark');
    localStorage.theme = isDark ? 'dark' : 'light';
    updateThemeUI(isDark);
});

function copyEmail() {
    const email = "matheussleal98@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        const icon = document.getElementById('copy-icon');
        icon.setAttribute('data-feather', 'check');
        feather.replace(); // Atualiza o ícone para o check
        
        setTimeout(() => {
            icon.setAttribute('data-feather', 'copy');
            feather.replace(); // Volta para o ícone de cópia
        }, 2000);
    });
}

// NAVBAR SCROLL EFFECT
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 20) {
        nav.classList.add('bg-white/80', 'dark:bg-slate-950/80', 'shadow-lg', 'border-slate-200', 'dark:border-slate-800');
        nav.classList.remove('py-4');
        nav.classList.add('py-2');
    } else {
        nav.classList.remove('bg-white/80', 'dark:bg-slate-950/80', 'shadow-lg', 'border-slate-200', 'dark:border-slate-800', 'py-2');
        nav.classList.add('py-4');
    }
});

// GITHUB REPOS LOADER
async function loadGithubProjects() {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;

    try {
        const response = await fetch('https://api.github.com/users/Matheusleal98/repos?sort=updated&per_page=6');
        const repos = await response.json();
        
        grid.innerHTML = ""; // Limpa o loader

        repos.forEach(repo => {
            const card = document.createElement("div");
            card.className = "p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-500 transition-all duration-300 group shadow-sm hover:shadow-xl flex flex-col justify-between";
            
            card.innerHTML = `
                <div>
                    <div class="flex justify-between items-start mb-6">
                        <div class="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg">
                            <i data-feather="folder" class="text-indigo-600 dark:text-indigo-400 w-6 h-6"></i>
                        </div>
                        <a href="${repo.html_url}" target="_blank" class="text-slate-400 hover:text-indigo-600 transition-colors">
                            <i data-feather="github" class="w-5 h-5"></i>
                        </a>
                    </div>
                    <h4 class="text-xl font-bold text-slate-900 dark:text-white mb-3">${repo.name}</h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400 mb-6 line-clamp-2">
                        ${repo.description || "Projeto de engenharia focado em escalabilidade e performance."}
                    </p>
                </div>
                <div class="flex items-center gap-4">
                    <span class="text-[10px] font-bold font-mono px-2 py-1 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 rounded uppercase">
                        ${repo.language || 'Software'}
                    </span>
                    <span class="text-[10px] text-slate-400 flex items-center gap-1">
                        <i data-feather="star" class="w-3 h-3"></i> ${repo.stargazers_count}
                    </span>
                </div>
            `;
            grid.appendChild(card);
        });
        feather.replace();
    } catch (error) {
        console.error("Erro ao carregar GitHub:", error);
        grid.innerHTML = "<p class='text-slate-500'>Falha ao carregar repositórios.</p>";
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadGithubProjects();
    feather.replace();
});