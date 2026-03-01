// ===== Theme Manager =====

const THEME_KEY = 'kot-theme';
const THEMES = {
    dark: 'Dark',
    light: 'Light',
    ocean: 'Ocean',
    forest: 'Forest',
    crimson: 'Crimson',
    amber: 'Amber',
};

function getStoredTheme() {
    return localStorage.getItem(THEME_KEY) || 'dark';
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }

    // Update label
    const label = document.getElementById('current-theme-label');
    if (label) label.textContent = THEMES[theme] || 'Dark';

    // Update active state in dropdown
    document.querySelectorAll('.theme-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.theme === theme);
    });

    localStorage.setItem(THEME_KEY, theme);
}

export function initThemeSystem() {
    // Apply saved theme immediately
    const savedTheme = getStoredTheme();
    applyTheme(savedTheme);

    // Theme picker button toggle
    const btn = document.getElementById('theme-picker-btn');
    const dropdown = document.getElementById('theme-picker-dropdown');

    if (btn && dropdown) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('open');
        });

        // Close dropdown on outside click
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && e.target !== btn) {
                dropdown.classList.remove('open');
            }
        });

        // Theme option clicks
        dropdown.querySelectorAll('.theme-option').forEach(opt => {
            opt.addEventListener('click', () => {
                const theme = opt.dataset.theme;
                applyTheme(theme);
                dropdown.classList.remove('open');
            });
        });
    }
}
