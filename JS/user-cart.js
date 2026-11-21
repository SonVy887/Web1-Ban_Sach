'use strict';
(() => {
 const S=window.SV;if(!S||!['giohang','order-success'].includes(S.page))return;const {$,$$}=S;
 const voucherFormat = /^[A-Z0-9_-]{1,32}$/;
 const appliedLabel = $('[data-applied-voucher]');
 if (S.page === 'order-success') {
  const code = new URLSearchParams(location.search).get('voucher') || '';
  if (appliedLabel && voucherFormat.test(code)) appliedLabel.textContent = code;
  return;
 }

 const voucherForm = $('.voucher-box');
 const voucherInput = $('#cart-voucher-code');
 let appliedVoucher = appliedLabel.textContent.trim();
 voucherInput.addEventListener('input', () => voucherInput.setCustomValidity(''));
 voucherForm.addEventListener('submit', event => {
  event.preventDefault();
  const code = voucherInput.value.trim().toUpperCase();
  if (!voucherFormat.test(code)) {
   voucherInput.setCustomValidity('Nhập mã ưu đãi gồm chữ, số, dấu gạch ngang hoặc gạch dưới.');
   voucherInput.reportValidity();
   return;
  }
  appliedVoucher = code;
  voucherInput.value = code;
  appliedLabel.textContent = code;
  S.toast('Đã áp dụng mã ' + code + ' (mô phỏng).');
 });
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
  else if(b.matches('.delete-item, .cart-actions button')){
   e.preventDefault();
   const all=Boolean(b.closest('.cart-actions'));
   const message=all?'Cậu muốn xóa tất cả sách trong giỏ?':'Cậu muốn xóa sách này khỏi giỏ hàng?';
   if(await S.confirm('Xác nhận xóa sách',message,all?'Xóa tất cả':'Xóa sách'))S.toast('Xóa thành công.');
  }
  else if(b.closest('.item-actions')){e.preventDefault();S.toast('Lưu vào yêu thích thành công.');}
  else if(b.matches('.summary-label button')){e.preventDefault();const ok=await S.dialog('Nhập địa chỉ nhận hàng',[{name:'name',label:'Người nhận'},{name:'phone',label:'Số điện thoại'},{name:'address',label:'Địa chỉ',type:'textarea'}],{name:'Lại Sơn Vỹ',phone:'0912 345 678',address:'Tổ 34, phường Bình Lộc, thành phố Long Khánh, tỉnh Đồng Nai.'});if(ok)S.toast('Lưu địa chỉ thành công.');}
  else if(b.matches('.checkout-button')){
   e.preventDefault();
   const query = new URLSearchParams({placed: '1', voucher: appliedVoucher});
   S.go('order-success.html?' + query);
  }
 });
 $$('.cart-item input[type=checkbox],.cart-table-head input[type=checkbox]').forEach(input=>input.addEventListener('click',e=>{e.preventDefault();S.toast('Chọn sản phẩm thành công.');}));
})();
