// ===== Global Keyboard Shortcut Manager =====

const shortcuts = new Map();
let enabled = true;

export function registerShortcut(key, handler, description = '') {
    shortcuts.set(key.toLowerCase(), { handler, description });
}

export function unregisterShortcut(key) {
    shortcuts.delete(key.toLowerCase());
}

export function clearShortcuts() {
    shortcuts.clear();
}

export function enableShortcuts() {
    enabled = true;
}

export function disableShortcuts() {
    enabled = false;
}

function buildKey(e) {
    const parts = [];
    if (e.ctrlKey || e.metaKey) parts.push('ctrl');
    if (e.altKey) parts.push('alt');
    if (e.shiftKey) parts.push('shift');

    let key = e.key;
    if (key === ' ') key = 'space';
    if (key.length === 1) key = key.toLowerCase();

    parts.push(key);
    return parts.join('+');
}

function handleKeydown(e) {
    if (!enabled) return;

    const key = buildKey(e);
    const shortcut = shortcuts.get(key);

    if (shortcut) {
        e.preventDefault();
        e.stopPropagation();
        shortcut.handler(e);
        return;
    }

    // Handle function keys without modifiers
    if (['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12'].includes(e.key.toLowerCase())) {
        const fkey = e.key.toLowerCase();
        const fShortcut = shortcuts.get(fkey);
        if (fShortcut) {
            e.preventDefault();
            e.stopPropagation();
            fShortcut.handler(e);
        }
    }
}

// Initialize
document.addEventListener('keydown', handleKeydown);

// Also handle Escape for modal closing
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('modal-overlay');
        if (modal && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
            document.getElementById('modal-content').innerHTML = '';
            e.preventDefault();
            e.stopPropagation();
        }
    }
});
