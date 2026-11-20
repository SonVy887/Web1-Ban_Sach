'use strict';

document.querySelectorAll('[data-admin-demo-filter]').forEach(form => {
  const moneyFields = [...form.querySelectorAll('[data-book-money]')];
  moneyFields.forEach(DemoUI.moneyInput);
  form.addEventListener('change', event => event.stopPropagation());
  form.addEventListener('submit', event => {
    event.preventDefault();
    event.stopPropagation();

    const [min, max] = moneyFields.map(field => DemoUI.moneyDigits(field.value));
    if (min && max && Number(min) > Number(max)) {
      DemoUI.toast('Mức tối thiểu phải nhỏ hơn hoặc bằng mức tối đa.');
      return;
    }
    DemoUI.toast('Áp dụng bộ lọc thành công (mô phỏng).');
  });
  form.addEventListener('reset', () => DemoUI.toast('Đã đặt lại bộ lọc.'));
});
