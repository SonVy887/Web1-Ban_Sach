'use strict';

(() => {
  let toastTimer;
  let notification;

  function toast(message) {
    if (!notification) {
      notification = document.createElement('div');
      notification.className = 'demo-toast';
      notification.setAttribute('role', 'status');
      document.body.append(notification);
    }
    clearTimeout(toastTimer);
    notification.hidden = false;
    notification.textContent = message;
    toastTimer = setTimeout(() => { notification.hidden = true; }, 4200);
  }

  function moneyDigits(value) {
    return String(value).replace(/\D/g, '').replace(/^0+(?=\d)/, '');
  }

  function formatMoney(value) {
    return moneyDigits(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function moneyInput(input) {
    input.type = 'text';
    input.inputMode = 'numeric';
    input.value = formatMoney(input.value);
    input.addEventListener('input', () => {
      input.value = moneyDigits(input.value);
    });
    input.addEventListener('blur', () => {
      input.value = formatMoney(input.value);
    });
  }

  document.querySelectorAll('[data-money-input]').forEach(moneyInput);
  window.DemoUI = Object.freeze({toast, moneyDigits, formatMoney, moneyInput});
})();
