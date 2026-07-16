(() => {
  const sourceScript = document.currentScript;
  const accent = sourceScript?.dataset.accent || '#c9ff46';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const threshold = 92;
  let startX = 0;
  let startY = 0;
  let pull = 0;
  let tracking = false;
  let refreshing = false;

  const island = document.createElement('div');
  island.className = 'oyw-refresh-island';
  island.style.setProperty('--refresh-accent', accent);
  island.style.setProperty('--pull', '0px');
  island.style.setProperty('--refresh-progress', '0');
  island.style.setProperty('--source-scale', '1');
  island.style.setProperty('--drop-scale', '.42');
  island.style.setProperty('--ring-opacity', '0');
  island.style.setProperty('--ring-offset', '1');
  island.innerHTML = `
    <svg class="oyw-refresh-art" viewBox="0 0 180 176" aria-hidden="true">
      <defs>
        <filter id="oyw-refresh-goo" x="-40%" y="-30%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -12" result="goo" />
        </filter>
      </defs>
      <g class="oyw-refresh-goo" filter="url(#oyw-refresh-goo)">
        <rect class="oyw-refresh-source" x="30" y="0" width="120" height="38" rx="19" />
        <circle class="oyw-refresh-drop" cx="90" cy="24" r="8" />
      </g>
      <circle class="oyw-refresh-track" cx="90" cy="24" r="10" pathLength="1" />
      <circle class="oyw-refresh-ring" cx="90" cy="24" r="10" pathLength="1" />
    </svg>
    <button class="oyw-refresh-trigger" type="button" aria-label="Refresh this page">
      <span class="oyw-refresh-icon" aria-hidden="true">↻</span>
      <span class="oyw-refresh-label">Refresh</span>
    </button>
    <span class="oyw-refresh-status" role="status" aria-live="polite"></span>
  `;

  const style = document.createElement('style');
  style.textContent = `
    html { overscroll-behavior-y: contain; }
    .oyw-refresh-island {
      --pull: 0px;
      --refresh-progress: 0;
      position: fixed;
      z-index: 1000;
      top: -18px;
      left: 50%;
      width: 180px;
      height: 176px;
      color: #fff;
      pointer-events: none;
      translate: -50% 0;
      will-change: transform;
    }
    .oyw-refresh-art { position: absolute; inset: 0; overflow: visible; pointer-events: none; }
    .oyw-refresh-goo { fill: #111; }
    .oyw-refresh-source {
      transform-box: fill-box;
      transform-origin: center top;
      scale: 1 var(--source-scale);
    }
    .oyw-refresh-drop,
    .oyw-refresh-track,
    .oyw-refresh-ring {
      transform-box: fill-box;
      transform-origin: center;
      translate: 0 var(--pull);
    }
    .oyw-refresh-drop { scale: var(--drop-scale); }
    .oyw-refresh-track,
    .oyw-refresh-ring {
      fill: none;
      stroke-width: 2.4;
      opacity: var(--ring-opacity);
    }
    .oyw-refresh-track { stroke: rgba(255,255,255,.28); }
    .oyw-refresh-ring {
      stroke: var(--refresh-accent);
      stroke-linecap: round;
      stroke-dasharray: 1;
      stroke-dashoffset: var(--ring-offset);
      rotate: -90deg;
    }
    .oyw-refresh-trigger {
      position: absolute;
      top: 1px;
      left: 30px;
      display: flex;
      width: 120px;
      height: 44px;
      align-items: center;
      justify-content: center;
      gap: 7px;
      padding: 16px 12px 0;
      border: 0;
      border-radius: 0 0 19px 19px;
      color: #fff;
      background: transparent;
      font: 800 10px/1 Inter, ui-sans-serif, system-ui, sans-serif;
      letter-spacing: .08em;
      text-transform: uppercase;
      cursor: pointer;
      pointer-events: auto;
      transition: translate 180ms cubic-bezier(.2,0,0,1), color 150ms ease;
    }
    .oyw-refresh-trigger:hover,
    .oyw-refresh-trigger:focus-visible { translate: 0 9px; color: var(--refresh-accent); outline: none; }
    .oyw-refresh-trigger:focus-visible { box-shadow: 0 0 0 3px color-mix(in srgb, var(--refresh-accent), transparent 45%); }
    .oyw-refresh-trigger:active { scale: .96; }
    .oyw-refresh-icon { font-size: 15px; line-height: 1; }
    .oyw-refresh-label { max-width: 0; overflow: hidden; opacity: 0; transition: max-width 180ms cubic-bezier(.2,0,0,1), opacity 130ms ease; }
    .oyw-refresh-trigger:hover .oyw-refresh-label,
    .oyw-refresh-trigger:focus-visible .oyw-refresh-label { max-width: 58px; opacity: 1; }
    .oyw-refresh-status { position: absolute; top: 132px; left: 50%; width: 190px; translate: -50% 0; color: #111; font: 800 10px/1.2 Inter, ui-sans-serif, system-ui, sans-serif; letter-spacing: .08em; text-align: center; text-transform: uppercase; opacity: 0; transition: opacity 150ms ease, translate 180ms cubic-bezier(.2,0,0,1); }
    .oyw-refresh-island.is-pulling .oyw-refresh-status,
    .oyw-refresh-island.is-refreshing .oyw-refresh-status { opacity: 1; translate: -50% 8px; }
    .oyw-refresh-island.is-refreshing .oyw-refresh-ring { animation: oyw-refresh-spin 700ms linear infinite; stroke-dashoffset: .22; opacity: 1; }
    .oyw-refresh-island.is-refreshing .oyw-refresh-source { scale: 1 1; }
    .oyw-refresh-island.is-resetting .oyw-refresh-drop,
    .oyw-refresh-island.is-resetting .oyw-refresh-track,
    .oyw-refresh-island.is-resetting .oyw-refresh-ring { transition: translate 240ms cubic-bezier(.2,0,0,1), scale 240ms cubic-bezier(.2,0,0,1), opacity 180ms ease; }
    .oyw-refresh-island.is-resetting .oyw-refresh-source { transition: scale 240ms cubic-bezier(.2,0,0,1); }
    @keyframes oyw-refresh-spin { to { rotate: 270deg; } }
    @media (max-width: 700px) {
      .oyw-refresh-trigger { color: var(--refresh-accent); }
      .oyw-refresh-label { display: none; }
    }
    @media (prefers-reduced-motion: reduce) {
      .oyw-refresh-island { display: none; }
    }
  `;

  document.head.append(style);
  document.body.append(island);

  const button = island.querySelector('.oyw-refresh-trigger');
  const status = island.querySelector('.oyw-refresh-status');

  const setPull = (distance) => {
    pull = Math.max(0, Math.min(distance, 126));
    const progress = Math.min(pull / threshold, 1);
    island.style.setProperty('--pull', `${pull}px`);
    island.style.setProperty('--refresh-progress', String(progress));
    island.style.setProperty('--source-scale', String(1 + progress * .26));
    island.style.setProperty('--drop-scale', String(.42 + progress * .88));
    island.style.setProperty('--ring-opacity', String(Math.max(0, Math.min((progress - .28) * 2, 1))));
    island.style.setProperty('--ring-offset', String(1 - progress));
    island.classList.toggle('is-pulling', pull > 3);
    status.textContent = progress >= 1 ? 'Release to refresh' : 'Pull to refresh';
  };

  const resetPull = () => {
    island.classList.add('is-resetting');
    setPull(0);
    window.setTimeout(() => island.classList.remove('is-resetting'), 280);
  };

  const refresh = () => {
    if (refreshing) return;
    refreshing = true;
    island.classList.remove('is-pulling');
    island.classList.add('is-refreshing');
    island.style.setProperty('--pull', '82px');
    island.style.setProperty('--refresh-progress', '1');
    island.style.setProperty('--source-scale', '1');
    island.style.setProperty('--drop-scale', '1.3');
    island.style.setProperty('--ring-opacity', '1');
    island.style.setProperty('--ring-offset', '.22');
    status.textContent = 'Refreshing';
    window.setTimeout(() => window.location.reload(), reducedMotion.matches ? 0 : 720);
  };

  button.addEventListener('click', refresh);

  document.addEventListener('touchstart', (event) => {
    if (refreshing || reducedMotion.matches || window.scrollY > 0 || event.touches.length !== 1) return;
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    tracking = true;
  }, { passive: true });

  document.addEventListener('touchmove', (event) => {
    if (!tracking || event.touches.length !== 1) return;
    const deltaX = event.touches[0].clientX - startX;
    const deltaY = event.touches[0].clientY - startY;
    if (deltaY <= 0 || Math.abs(deltaX) > deltaY) { tracking = false; resetPull(); return; }
    event.preventDefault();
    const resistance = pull >= threshold ? .28 : .52;
    setPull(deltaY * resistance);
  }, { passive: false });

  const finishPull = () => {
    if (!tracking) return;
    tracking = false;
    if (pull >= threshold) refresh(); else resetPull();
  };

  document.addEventListener('touchend', finishPull, { passive: true });
  document.addEventListener('touchcancel', finishPull, { passive: true });
})();
