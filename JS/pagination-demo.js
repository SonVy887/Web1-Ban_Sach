'use strict';
// Chuyển trang HTML mẫu bằng URL; không thay đổi dữ liệu danh sách.
(() => {
  const currentUrl = new URL(window.location.href);
  const current = Math.max(1, Number.parseInt(currentUrl.searchParams.get('page'), 10) || 1);

  function targetPage(value, page) {
    return value === 'prev' ? page - 1 : value === 'next' ? page + 1 : Number(value);
  }

  function pageUrl(target) {
    const url = new URL(currentUrl.href);
    url.searchParams.set('page', String(target));
    return url;
  }

  document.querySelectorAll('[data-demo-pagination]').forEach(group => {
    const max = Math.max(1, Number.parseInt(group.dataset.maxPage, 10) || 1);
    const page = Math.min(current, max);
    group.querySelectorAll('[data-demo-page]').forEach(control => {
      const value = control.dataset.demoPage;
      const target = targetPage(value, page);
      const disabled = target < 1 || target > max;
      const active = Number(value) === page;
      if (active) control.setAttribute('aria-current', 'page');
      else control.removeAttribute('aria-current');
      control.setAttribute('aria-disabled', String(disabled));
      if (control.tagName === 'BUTTON') control.disabled = disabled;
      else { control.removeAttribute('disabled'); control.tabIndex = disabled ? -1 : 0; }
      if (control.tagName === 'A') {
        control.href = pageUrl(Math.max(1, Math.min(max, target))).href;
      }
    });
  });
  // Capture prevents the old toast-only pagination handlers from running.
  document.addEventListener('click', event => {
    const control = event.target.closest('[data-demo-page]');
    if (!control) return;
    const group = control.closest('[data-demo-pagination]');
    if (!group) return;
    if (control.tagName === 'A' && (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (control.getAttribute('aria-disabled') === 'true') return;
    const max = Number.parseInt(group.dataset.maxPage, 10) || 1;
    const target = targetPage(control.dataset.demoPage, Math.min(current, max));
    if (!Number.isInteger(target) || target < 1 || target > max) return;
    window.location.assign(pageUrl(target).href);
  }, true);
})();
