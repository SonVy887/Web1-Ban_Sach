'use strict';
(() => {
 const S=window.SV;if(!S)return;const {$,$$,page}=S;
 if(page==='order-success'){
  $('#btn-print')?.addEventListener('click',()=>window.print());
  $('#btn-copy')?.addEventListener('click',()=>S.toast('Sao chép mã đơn thành công.'));
 }
 if(page!=='my-orders')return;
 const search=$('main input[type=search]');search?.closest('form')?.addEventListener('submit',e=>{e.preventDefault();S.reload();});
 $('main select')?.addEventListener('change',()=>S.reload());
 $$('nav[aria-label="Bộ lọc trạng thái đơn"] button').forEach(b=>b.addEventListener('click',()=>S.reload()));
 document.addEventListener('click',e=>{
  const b=e.target.closest('button,a');if(!b||b.matches('[data-review-order]'))return;const text=b.textContent.toLowerCase();
  if(b.matches('a[href*="my-orders.html?page"]')){e.preventDefault();S.reload();return;}
  if(!b.closest('article'))return;
  if(text.includes('mua lại')){e.preventDefault();S.go('giohang.html');}
  else if(text.includes('hủy đơn')){e.preventDefault();S.toast('Hủy đơn hàng thành công.');}
  else if(text.includes('theo dõi')){e.preventDefault();S.toast('Tra cứu vận đơn thành công.');}
 });
})();
