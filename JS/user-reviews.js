'use strict';
(() => {
 const S=window.SV;if(!S)return;const {$,$$}=S;
 const dialog=$('#sv-review-dialog'),form=$('#sv-review-form');if(!dialog||!form)return;
 form.noValidate=true;let trigger;
 $$('[data-review-order]').forEach(button=>button.addEventListener('click',()=>{
  trigger=button;form.reset();const select=$('#sv-review-product');select.replaceChildren();
  $$('img',button.closest('article')).forEach(image=>{const title=$('span',image.nextElementSibling);if(!title)return;const option=document.createElement('option');option.textContent=title.textContent.trim();select.append(option);});
  $('#sv-review-order-label').textContent='Đơn hàng '+button.dataset.reviewOrder;dialog.showModal();
 }));
 $$('.sv-review-close,.sv-review-cancel',dialog).forEach(button=>button.addEventListener('click',()=>{form.reset();dialog.close();}));
 form.addEventListener('submit',e=>{e.preventDefault();form.reset();dialog.close();S.toast('Gửi đánh giá thành công.');});
 dialog.addEventListener('close',()=>trigger?.focus());
})();
