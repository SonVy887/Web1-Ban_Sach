'use strict';
// Chuyển trang HTML mẫu bằng URL; không thay đổi dữ liệu danh sách.
(() => {
  const currentUrl = new URL(window.location.href);
  const current = Math.max(1, Number.parseInt(currentUrl.searchParams.get('page'), 10) || 1);
  document.querySelectorAll('[data-demo-pagination]').forEach(group => {
    const max = Math.max(1, Number.parseInt(group.dataset.maxPage, 10) || 1);
    const page = Math.min(current, max);
    group.querySelectorAll('[data-demo-page]').forEach(control => {
      const value = control.dataset.demoPage;
      const target = value === 'prev' ? page - 1 : value === 'next' ? page + 1 : Number(value);
      const disabled = target < 1 || target > max;
      const active = Number(value) === page;
      if (active) control.setAttribute('aria-current', 'page');
      else control.removeAttribute('aria-current');
      control.setAttribute('aria-disabled', String(disabled));
      if (control.tagName === 'BUTTON') control.disabled = disabled;
      else { control.removeAttribute('disabled'); control.tabIndex = disabled ? -1 : 0; }
      if (control.tagName === 'A') {
        const url = new URL(currentUrl.href);
        url.searchParams.set('page', String(Math.max(1, Math.min(max, target))));
        url.hash = '';
        control.href = url.href;
      }
    });
  });
  // Capture prevents the old toast-only pagination handlers from running.
  document.addEventListener('click', event => {
    const control = event.target.closest('[data-demo-page]');
    if (!control) return;
    const group = control.closest('[data-demo-pagination]');
    if (!group) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (control.getAttribute('aria-disabled') === 'true') return;
    const max = Number.parseInt(group.dataset.maxPage, 10) || 1;
    const page = Math.min(current, max);
    const value = control.dataset.demoPage;
    const target = value === 'prev' ? page - 1 : value === 'next' ? page + 1 : Number(value);
    if (!Number.isInteger(target) || target < 1 || target > max) return;
    const url = new URL(window.location.href);
    url.searchParams.set('page', String(target));
    url.hash = '';
    window.location.assign(url.href);
  }, true);
})();
