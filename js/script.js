const toastEl = document.getElementById('toast');
let toastTimer;

function toast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2400);
}

// Mobile Sidebar Drawer Logic
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const menuToggle = document.getElementById('menuToggle');
const closeSidebarBtn = document.getElementById('closeSidebar');

function openSidebar() {
  if (!sidebar || !sidebarOverlay) return;
  sidebar.classList.add('open');
  sidebarOverlay.classList.add('open');
  sidebarOverlay.setAttribute('aria-hidden', 'false');
  if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
}

function closeSidebar() {
  if (!sidebar || !sidebarOverlay) return;
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('open');
  sidebarOverlay.setAttribute('aria-hidden', 'true');
  if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
}

if (menuToggle) menuToggle.addEventListener('click', openSidebar);
if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

// Navigation links: Show toast, highlight active item, then redirect
document.querySelectorAll('[data-nav]').forEach(item => {
  item.addEventListener('click', e => {
    closeSidebar();
    if (item.dataset.nav === 'Settings') return; // Settings opens modal

    const href = item.getAttribute('href');
    document.querySelectorAll('[data-nav]').forEach(b => b.classList.remove('active'));
    item.classList.add('active');

    const msg =
      item.dataset.nav === 'Dashboard'
        ? 'You are on your dashboard'
        : `${item.dataset.nav} section selected`;

    if (href && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      toast(msg);
      setTimeout(() => {
        window.location.href = href;
      }, 650);
    } else {
      toast(msg);
    }
  });
});

// Course cards: Show "Opening <Course>…" toast, then redirect
document.querySelectorAll('.course').forEach(c => {
  c.addEventListener('click', e => {
    const href = c.getAttribute('href');
    toast(`Opening ${c.dataset.title}…`);

    if (href && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      setTimeout(() => {
        window.location.href = href;
      }, 650);
    }
  });
});

// Search toggle & Course filtering
const searchToggle = document.getElementById('searchToggle');
const searchBox = document.getElementById('searchBox');
const searchInput = document.getElementById('searchInput');

if (searchToggle && searchBox && searchInput) {
  searchToggle.addEventListener('click', () => {
    searchBox.classList.toggle('open');
    if (searchBox.classList.contains('open')) {
      searchInput.focus();
    }
  });

  function filterCourses() {
    const q = searchInput.value.toLowerCase();
    const level = document.getElementById('levelFilter').value;
    const language = document.getElementById('languageFilter').value;
    const type = document.getElementById('typeFilter').value;
    const time = document.getElementById('timeFilter').value;

    const cards = [...document.querySelectorAll('.course')];

    cards.sort((a, b) =>
      time === 'old'
        ? +a.dataset.time - +b.dataset.time
        : time === 'recent'
        ? +b.dataset.time - +a.dataset.time
        : 0
    );

    cards.forEach(c => {
      const show =
        c.dataset.title.toLowerCase().includes(q) &&
        (level === 'all' || c.dataset.level === level) &&
        (language === 'all' || c.dataset.language === language) &&
        (type === 'all' || c.dataset.type === type);
      c.style.display = show ? '' : 'none';
    });

    document.getElementById('courses').append(...cards);
  }

  document.querySelectorAll('.filters select').forEach(s => {
    s.addEventListener('change', filterCourses);
  });
  searchInput.addEventListener('input', filterCourses);
}

// Notifications
const notifyBtn = document.getElementById('notify');
if (notifyBtn) {
  notifyBtn.addEventListener('click', () => {
    toast('You’re all caught up — no new notifications.');
  });
}

// Online Users Toggle
let shownAll = false;
const seeAllBtn = document.getElementById('seeAll');
if (seeAllBtn) {
  seeAllBtn.addEventListener('click', () => {
    shownAll = !shownAll;
    toast(shownAll ? 'Showing all online users' : 'Showing recent online users');
    seeAllBtn.textContent = shownAll ? 'Show less' : 'See all';
  });
}

// Calendar Logic
const daysContainer = document.getElementById('days');
if (daysContainer) {
  let current = new Date(2025, 11, 1);
  let selected = '2025-12-14';

  function renderCalendar() {
    const y = current.getFullYear();
    const m = current.getMonth();

    document.getElementById('monthLabel').textContent = current.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });

    daysContainer.innerHTML = '';

    const offset = (new Date(y, m, 1).getDay() + 6) % 7;
    const number = new Date(y, m + 1, 0).getDate();
    const prevDays = new Date(y, m, 0).getDate();

    for (let i = 0; i < offset; i++) {
      const b = document.createElement('button');
      b.className = 'day muted';
      b.textContent = prevDays - offset + i + 1;
      b.disabled = true;
      daysContainer.append(b);
    }

    for (let d = 1; d <= number; d++) {
      const b = document.createElement('button');
      b.className = 'day';
      b.textContent = d;

      const key = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      if (key === selected) b.classList.add('selected');
      if (y === 2025 && m === 11 && d === 11) b.classList.add('range-start');
      if (y === 2025 && m === 11 && d === 14) b.classList.add('range-end');
      if (y === 2025 && m === 11 && d > 11 && d < 14) b.classList.add('range');

      b.addEventListener('click', () => {
        selected = key;
        renderCalendar();
        const formattedDate = new Date(y, m, d).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
        toast(`Selected ${formattedDate}`);
      });

      daysContainer.append(b);
    }

    const total = offset + number;
    for (let d = 1; d <= 42 - total; d++) {
      const b = document.createElement('button');
      b.className = 'day muted';
      b.textContent = d;
      b.disabled = true;
      daysContainer.append(b);
    }
  }

  document.getElementById('prevMonth').addEventListener('click', () => {
    current.setMonth(current.getMonth() - 1);
    renderCalendar();
  });

  document.getElementById('nextMonth').addEventListener('click', () => {
    current.setMonth(current.getMonth() + 1);
    renderCalendar();
  });

  renderCalendar();
}

// Settings Panel & Theme Preferences
const settingsOverlay = document.getElementById('settingsOverlay');
const closeSettingsButton = document.getElementById('closeSettings');
const themeButtons = [...document.querySelectorAll('[data-theme-choice]')];
const logoutBtn = document.getElementById('logoutBtn');

function applyTheme(theme, announce = false) {
  const validThemes = ['default', 'dark', 'day'];
  const selectedTheme = validThemes.includes(theme) ? theme : 'default';

  document.documentElement.dataset.theme = selectedTheme;

  themeButtons.forEach(button => {
    const active = button.dataset.themeChoice === selectedTheme;
    button.classList.toggle('chosen', active);
    button.setAttribute('aria-pressed', String(active));
  });

  try {
    localStorage.setItem('classroom-theme', selectedTheme);
  } catch (_) {}

  if (announce) {
    const label =
      selectedTheme === 'default' ? 'Default' : selectedTheme === 'dark' ? 'Dark' : 'Day';
    toast(`${label} theme applied`);
  }
}

function openSettings() {
  closeSidebar();
  if (!settingsOverlay) return;
  settingsOverlay.classList.add('open');
  settingsOverlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('settings-open');
  if (closeSettingsButton) closeSettingsButton.focus();
}

function closeSettings() {
  if (!settingsOverlay) return;
  settingsOverlay.classList.remove('open');
  settingsOverlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('settings-open');
  const settingsNav = document.querySelector('[data-nav="Settings"]');
  if (settingsNav) settingsNav.focus();
}

document.querySelectorAll('[data-nav="Settings"]').forEach(button => {
  button.addEventListener('click', openSettings);
});

if (closeSettingsButton) closeSettingsButton.addEventListener('click', closeSettings);

if (settingsOverlay) {
  settingsOverlay.addEventListener('click', event => {
    if (event.target === settingsOverlay) closeSettings();
  });
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (settingsOverlay && settingsOverlay.classList.contains('open')) closeSettings();
    if (sidebar && sidebar.classList.contains('open')) closeSidebar();
  }
});

themeButtons.forEach(button => {
  button.addEventListener('click', () => applyTheme(button.dataset.themeChoice, true));
});

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    toast('Demo only — you have not actually been logged out.');
  });
}

let savedTheme = 'default';
try {
  savedTheme = localStorage.getItem('classroom-theme') || 'default';
} catch (_) {}
applyTheme(savedTheme);