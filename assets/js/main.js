/* Profitic static site: shared behavior for every page.
   Page-specific widgets live in a <script> block at the end of that page. */
(function () {
  // ---------------------------------------------------------------- Header navigation
  // One navigation for mobile and desktop. "Platform" uses a native <details> disclosure.
  var navWrap = document.querySelector('.nav-wrap');
  if (navWrap) {
    var navToggle = navWrap.querySelector('.nav-toggle');
    var platform = navWrap.querySelector('.platform-nav');
    var platformToggle = platform && platform.querySelector('summary');
    var compactNav = window.matchMedia('(max-width:760px)');
    var setMobileMenu = function (open) {
      navWrap.toggleAttribute('data-menu-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      if (!open && platform) platform.open = false;
    };
    navToggle.addEventListener('click', function () { setMobileMenu(!navWrap.hasAttribute('data-menu-open')); });
    document.addEventListener('click', function (e) {
      if (!navWrap.contains(e.target) || navWrap.querySelector('nav').contains(e.target.closest('a'))) setMobileMenu(false);
      else if (platform && !platform.contains(e.target)) platform.open = false;
    });
    navWrap.addEventListener('focusout', function (e) {
      if (!navWrap.contains(e.relatedTarget)) setMobileMenu(false);
      else if (platform && !platform.contains(e.relatedTarget)) platform.open = false;
    });
    navWrap.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (platform && platform.open) { platform.open = false; platformToggle.focus(); }
      else if (navWrap.hasAttribute('data-menu-open')) { setMobileMenu(false); navToggle.focus(); }
    });
    if (compactNav.addEventListener) compactNav.addEventListener('change', function () { setMobileMenu(false); });

    // Desktop: "Platform" opens on hover (click and keyboard still work).
    if (platform) {
      var canHover = window.matchMedia('(hover:hover) and (pointer:fine)');
      var hoverTimer, hoverOpened = false;
      var useHover = function () { return canHover.matches && !compactNav.matches; };
      platform.addEventListener('mouseenter', function () {
        if (!useHover()) return;
        clearTimeout(hoverTimer);
        if (!platform.open) { platform.open = true; hoverOpened = true; }
      });
      platform.addEventListener('mouseleave', function () {
        if (!useHover()) return;
        hoverTimer = setTimeout(function () { platform.open = false; hoverOpened = false; }, 150);
      });
      platformToggle.addEventListener('click', function (e) {
        // A click on a menu the pointer just opened keeps it open instead of closing it.
        if (useHover() && hoverOpened) { e.preventDefault(); hoverOpened = false; }
      });
    }
  }

  // ---------------------------------------------------------------- Video popup
  // <a href="youtube url" data-video-modal="YOUTUBE_ID"> opens the video in a dialog (falls back to the link).
  var vmLinks = document.querySelectorAll('[data-video-modal]');
  if (vmLinks.length && typeof HTMLDialogElement === 'function') {
    var dlg = document.createElement('dialog');
    dlg.className = 'video-modal';
    dlg.setAttribute('aria-label', 'Video');
    dlg.innerHTML = '<button class="video-modal-close" type="button" aria-label="Close video">&times;</button><div class="video-modal-frame"></div>';
    document.body.appendChild(dlg);
    var frame = dlg.querySelector('.video-modal-frame');
    dlg.addEventListener('close', function () { frame.innerHTML = ''; });
    dlg.querySelector('.video-modal-close').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    vmLinks.forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        frame.innerHTML = '';
        frame.appendChild(youtubeFrame(a.getAttribute('data-video-modal'), a.textContent.trim()));
        dlg.showModal();
      });
    });
  }

  // ---------------------------------------------------------------- Inline video: a.video[data-youtube] loads on click
  document.querySelectorAll('a.video[data-youtube]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      el.replaceWith(youtubeFrame(el.getAttribute('data-youtube'), el.getAttribute('aria-label') || 'Video', 'video-frame'));
    });
  });

  function youtubeFrame(id, title, cls) {
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
    f.title = title || 'Video';
    f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    f.allowFullscreen = true;
    f.referrerPolicy = 'strict-origin-when-cross-origin';
    if (cls) { f.className = cls; f.style.cssText = 'display:block;width:100%;aspect-ratio:16/9;border:0;border-radius:14px'; }
    return f;
  }

  // ---------------------------------------------------------------- Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
