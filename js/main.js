/**
 * Script Interaktif Seminar PPG Prajabatan 2026
 * Mahasiswa: Dhani Rizki (NIM: 2531049) - Universitas Pendidikan Indonesia
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initActiveNav();
  initSemester1();
  initSemester2();
  initModal();
});

/* ==========================================================================
   THEME TOGGLE (DARK MODE / LIGHT MODE)
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('ppg_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');

  setTheme(initialTheme);

  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      localStorage.setItem('ppg_theme', newTheme);
    });
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.innerHTML = theme === 'dark' 
      ? '<i class="fa-solid fa-sun" title="Beralih ke Mode Terang"></i>' 
      : '<i class="fa-solid fa-moon" title="Beralih ke Mode Gelap"></i>';
    btn.setAttribute('aria-label', theme === 'dark' ? 'Aktifkan Mode Terang' : 'Aktifkan Mode Gelap');
  });
}

/* ==========================================================================
   MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
    const isOpen = drawer.classList.contains('open');
    toggleBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!drawer.contains(e.target) && !toggleBtn.contains(e.target) && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
  });
}

/* ==========================================================================
   ACTIVE NAVIGATION HIGHLIGHT
   ========================================================================== */
function initActiveNav() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   RENDER SEMESTER 1 COURSES
   ========================================================================== */
function initSemester1() {
  const container = document.getElementById('sem1-container');
  if (!container || typeof PPG_DATA === 'undefined') return;

  renderCourses(container, PPG_DATA.semester1);

  // Tab Filtering
  const filterBtns = document.querySelectorAll('#sem1-filters .filter-tab-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-filter');
      
      const cards = container.querySelectorAll('.course-card');
      cards.forEach(card => {
        if (targetId === 'all' || card.getAttribute('data-id') === targetId) {
          card.style.display = 'block';
          card.classList.remove('animate-fade');
          void card.offsetWidth;
          card.classList.add('animate-fade');
        } else {
          card.style.display = 'none';
        }
      });

      // Smooth scroll to top of course list if scrolled further down
      const filterWrapper = btn.closest('.filter-tabs-wrapper');
      if (filterWrapper) {
        const rect = filterWrapper.getBoundingClientRect();
        if (rect.top <= 75 || window.pageYOffset > filterWrapper.offsetTop) {
          window.scrollTo({
            top: filterWrapper.offsetTop - 75,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/* ==========================================================================
   RENDER SEMESTER 2 COURSES
   ========================================================================== */
function initSemester2() {
  const container = document.getElementById('sem2-container');
  if (!container || typeof PPG_DATA === 'undefined') return;

  renderCourses(container, PPG_DATA.semester2);

  // Tab Filtering
  const filterBtns = document.querySelectorAll('#sem2-filters .filter-tab-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-filter');
      
      const cards = container.querySelectorAll('.course-card');
      cards.forEach(card => {
        if (targetId === 'all' || card.getAttribute('data-id') === targetId) {
          card.style.display = 'block';
          card.classList.remove('animate-fade');
          void card.offsetWidth;
          card.classList.add('animate-fade');
        } else {
          card.style.display = 'none';
        }
      });

      // Smooth scroll to top of course list if scrolled further down
      const filterWrapper = btn.closest('.filter-tabs-wrapper');
      if (filterWrapper) {
        const rect = filterWrapper.getBoundingClientRect();
        if (rect.top <= 75 || window.pageYOffset > filterWrapper.offsetTop) {
          window.scrollTo({
            top: filterWrapper.offsetTop - 75,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/* Helper to render list of course cards */
function renderCourses(container, courses) {
  container.innerHTML = '';
  courses.forEach(course => {
    const tagsHtml = course.artefak_tags.map(t => `<span class="artefak-tag"><i class="fa-solid fa-tag"></i> ${t}</span>`).join('');
    
    const cardEl = document.createElement('article');
    cardEl.className = 'course-card';
    cardEl.setAttribute('data-id', course.id);
    cardEl.id = `course-${course.id}`;
    
    cardEl.innerHTML = `
      <header class="course-card-header">
        <div class="course-header-left">
          <span class="course-code-badge">${course.code}</span>
          <h2 class="course-title"><i class="fa-solid ${course.icon}"></i>${course.title}</h2>
        </div>
      </header>
      
      <div class="reflection-section">
        <h3 class="subsection-heading">
          <i class="fa-solid fa-compass"></i>
          1. Refleksi Pengalaman Belajar (Model 4C)
        </h3>
        
        <div class="grid-4c">
          <!-- Connection -->
          <div class="box-4c connection">
            <div class="box-4c-header">
              <span class="box-4c-title"><i class="fa-solid fa-link"></i> Connection (Keterkaitan)</span>
              <span class="badge badge-4c-tag">Konteks Calon Guru</span>
            </div>
            <p class="box-4c-content">${course.connection}</p>
          </div>
          
          <!-- Challenge -->
          <div class="box-4c challenge">
            <div class="box-4c-header">
              <span class="box-4c-title"><i class="fa-solid fa-bolt"></i> Challenge (Tantangan)</span>
              <span class="badge badge-4c-tag">Pergeseran Paradigma</span>
            </div>
            <p class="box-4c-content">${course.challenge}</p>
          </div>
          
          <!-- Concept -->
          <div class="box-4c concept">
            <div class="box-4c-header">
              <span class="box-4c-title"><i class="fa-solid fa-lightbulb"></i> Concept (Konsep Inti)</span>
              <span class="badge badge-4c-tag">Teori & Pedagogi</span>
            </div>
            <p class="box-4c-content">${course.concept}</p>
          </div>
          
          <!-- Change -->
          <div class="box-4c change">
            <div class="box-4c-header">
              <span class="box-4c-title"><i class="fa-solid fa-arrows-rotate"></i> Change (Perubahan Sikap & Aksi)</span>
              <span class="badge badge-4c-tag">Praktik Nyata</span>
            </div>
            <p class="box-4c-content">${course.change}</p>
          </div>
        </div>
        
        <h3 class="subsection-heading">
          <i class="fa-solid fa-folder-open"></i>
          2. Analisis Artefak Pembelajaran
        </h3>
        
        <div class="artefak-container">
          <div class="artefak-header-row">
            <div>
              <span class="badge badge-gold"><i class="fa-solid fa-file-shield"></i> Dokumen Bukti Artefak Pembelajaran</span>
            </div>
            <button class="btn btn-secondary btn-detail-artefak" style="font-size: 0.85rem; padding: 0.45rem 0.9rem;" 
                    data-course-id="${course.id}">
              <i class="fa-solid fa-magnifying-glass-plus"></i> Lihat Pratinjau Lengkap Artefak
            </button>
          </div>
          
          <div class="artefak-grid">
            <div class="artefak-item">
              <div class="artefak-item-label"><i class="fa-regular fa-file-lines"></i> a. Bukti Artefak yang Dipilih:</div>
              <p class="artefak-item-text">${course.artefak_bukti}</p>
              
              <div class="artefak-doc-action">
                <a href="${course.pdf_url || '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-lihat-dokumen">
                  <i class="fa-solid fa-file-pdf"></i> Lihat Dokumen
                </a>
              </div>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <div class="artefak-item">
                <div class="artefak-item-label"><i class="fa-regular fa-circle-question"></i> b. Alasan Pemilihan Artefak:</div>
                <p class="artefak-item-text">${course.artefak_alasan}</p>
              </div>
              
              <div class="artefak-item">
                <div class="artefak-item-label"><i class="fa-solid fa-check-double"></i> c. Bagian yang Mendukung Refleksi:</div>
                <p class="artefak-item-text">${course.artefak_dukungan}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    container.appendChild(cardEl);
  });
}

/* ==========================================================================
   MODAL DIALOG (DETAIL ARTEFAK)
   ========================================================================== */
function initModal() {
  const modal = document.getElementById('artefak-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close-btn');
  const modalTitle = modal.querySelector('#modal-artefak-title');
  const modalBody = modal.querySelector('#modal-artefak-body');

  function openModal(course) {
    if (!course) return;
    modalTitle.innerHTML = `<span class="badge badge-maroon" style="font-size: 0.75rem; margin-right: 0.5rem;">${course.code}</span> ${course.title}`;
    
    const tags = course.artefak_tags.map(t => `<span class="artefak-tag"><i class="fa-solid fa-check"></i> ${t}</span>`).join('');
    
    modalBody.innerHTML = `
      <div class="card" style="padding: 1.25rem; background: var(--color-bg); margin-bottom: 0.5rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
          <div class="card-icon-header" style="margin-bottom: 0; width: 42px; height: 42px; font-size: 1.2rem;">
            <i class="fa-solid fa-file-pdf"></i>
          </div>
          <div>
            <h4 style="margin: 0; font-size: 1.05rem;">Dokumen & Analisis Portofolio Artefak</h4>
            <span style="font-size: 0.8rem; color: var(--color-text-muted);">Mata Kuliah: ${course.title}</span>
          </div>
        </div>
        <div style="margin-top: 0.75rem;">
          <a href="${course.pdf_url || '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-lihat-dokumen" style="margin-top: 0;">
            <i class="fa-solid fa-file-pdf"></i> Buka / Unduh Dokumen PDF
          </a>
        </div>
      </div>

      <div>
        <h4 style="font-size: 0.95rem; color: var(--color-primary); margin-bottom: 0.4rem;">
          <i class="fa-regular fa-file-lines"></i> 1. Bukti Artefak Pembelajaran
        </h4>
        <div class="card-body" style="background: var(--color-surface); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--color-card-border);">
          ${course.artefak_bukti}
        </div>
      </div>

      <div>
        <h4 style="font-size: 0.95rem; color: var(--color-primary); margin-bottom: 0.4rem;">
          <i class="fa-regular fa-circle-question"></i> 2. Alasan Mengapa Artefak Ini Dipilih
        </h4>
        <div class="card-body" style="background: var(--color-surface); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--color-card-border);">
          ${course.artefak_alasan}
        </div>
      </div>

      <div>
        <h4 style="font-size: 0.95rem; color: var(--color-primary); margin-bottom: 0.4rem;">
          <i class="fa-solid fa-check-double"></i> 3. Bagian Artefak yang Mendukung Hasil Refleksi
        </h4>
        <div class="card-body" style="background: var(--color-surface); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--color-card-border);">
          ${course.artefak_dukungan}
        </div>
      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Delegate button clicks for dynamically rendered course cards
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-detail-artefak');
    if (!btn) return;
    const courseId = btn.getAttribute('data-course-id');
    const allCourses = [...(PPG_DATA.semester1 || []), ...(PPG_DATA.semester2 || [])];
    const foundCourse = allCourses.find(c => c.id === courseId);
    if (foundCourse) {
      openModal(foundCourse);
    }
  });
}
