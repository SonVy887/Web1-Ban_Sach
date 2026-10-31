'use strict';
(() => {
 const S=window.SV;if(!S||S.page!=='giohang')return;const {$,$$}=S;
 document.addEventListener('click',async e=>{
  const b=e.target.closest('button');
  if(!b)return;
  if(b.closest('.item-quantity')){
   e.preventDefault();
   // Chỉ đổi số lượng đang chọn trên giao diện, không tính tiền hoặc ghi dữ liệu.
   const quantity=b.closest('.item-quantity').querySelector('strong');
   const step=b.getAttribute('aria-label')==='Tăng'?1:-1;
   quantity.textContent=String(Math.max(1,(Number(quantity.textContent)||1)+step));
  }
  else if(b.matches('.delete-item')||b.closest('.cart-actions')){e.preventDefault();S.toast('Xóa thành công.');}
  else if(b.closest('.item-actions')){e.preventDefault();S.toast('Lưu vào yêu thích thành công.');}
  else if(b.matches('.summary-label button')){e.preventDefault();const ok=await S.dialog('Nhập địa chỉ nhận hàng',[{name:'name',label:'Người nhận'},{name:'phone',label:'Số điện thoại'},{name:'address',label:'Địa chỉ',type:'textarea'}],{name:'Lại Sơn Vỹ',phone:'0912 345 678',address:'Tổ 34, phường Bình Lộc, thành phố Long Khánh, tỉnh Đồng Nai.'});if(ok)S.toast('Lưu địa chỉ thành công.');}
  else if(b.matches('.checkout-button')){e.preventDefault();const ok=await S.dialog('Đặt hàng thành công',[],{},'Xem trang thành công');if(ok)S.go('order-success.html');}
 });
 $$('.cart-item input[type=checkbox],.cart-table-head input[type=checkbox]').forEach(input=>input.addEventListener('click',e=>{e.preventDefault();S.toast('Chọn sản phẩm thành công.');}));
 const voucher=$('.voucher-box');voucher?.setAttribute('tabindex','0');async function apply(){if(await S.dialog('Nhập mã ưu đãi',[{name:'voucher',label:'Mã ưu đãi'}]))S.toast('Áp dụng mã ưu đãi thành công.');}voucher?.addEventListener('click',apply);voucher?.addEventListener('keydown',e=>{if(e.key==='Enter')apply();});
})();
