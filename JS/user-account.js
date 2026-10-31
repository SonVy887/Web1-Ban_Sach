'use strict';
(() => {
 const S=window.SV;if(!S||S.page!=='account')return;const {$,$$}=S;
 const profile=$('#profileForm'),password=$('#passwordForm');
 [profile,password].filter(Boolean).forEach(form=>{form.noValidate=true;form.addEventListener('submit',e=>{e.preventDefault();form.reset();S.toast('Cập nhật thành công.');});});
 const addressFields=[{name:'name',label:'Họ và tên'},{name:'phone',label:'Số điện thoại'},{name:'address',label:'Địa chỉ',type:'textarea'}];
 document.addEventListener('click',async e=>{
  const b=e.target.closest('button');if(!b)return;const text=b.textContent.replace(/\s+/g,' ').trim().toLowerCase();
  if(b.title==='Đổi ảnh đại diện'){e.preventDefault();if(await S.dialog('Đổi ảnh đại diện',[{name:'image',label:'Chọn ảnh',type:'file'}]))S.toast('Cập nhật ảnh đại diện thành công.');}
  else if(b.closest('#profileForm')){e.preventDefault();if(text.includes('lưu')){profile.reset();S.toast('Lưu thông tin thành công.');}else if(text.includes('hủy'))profile.reset();else S.toast('Cập nhật thể loại thành công.');}
  else if(b.closest('#passwordForm')){e.preventDefault();const field=$('input',b.parentElement);if(field){field.type=field.type==='password'?'text':'password';}else{password.reset();S.toast('Đổi mật khẩu thành công.');}}
  else if(b.closest('#addressesTab')){e.preventDefault();if(b.title==='Xóa')S.toast('Xóa địa chỉ thành công.');else if(text.includes('mặc định'))S.toast('Đặt địa chỉ mặc định thành công.');else if(text.includes('lưu')){const editor=b.closest('.member-address-editor');if(editor){$$('input',editor).forEach(input=>input.value=input.defaultValue);const area=$('textarea',editor);if(area)area.value=area.defaultValue;}S.toast('Lưu địa chỉ thành công.');}else{if(await S.dialog(text.includes('thêm')?'Thêm địa chỉ':'Sửa địa chỉ',addressFields,{name:'Lại Sơn Vỹ',phone:'0912 345 678',address:'Tổ 34, phường Bình Lộc, thành phố Long Khánh, tỉnh Đồng Nai.'}))S.toast('Lưu địa chỉ thành công.');}}
  else if(text.includes('theo dõi'))S.go('my-orders.html');
  else if(text.includes('voucher')||text.includes('đổi quà'))S.toast('Nhận ưu đãi thành công.');
  else if(text.includes('tư vấn')){if(await S.dialog('Tư vấn sách',[{name:'message',label:'Nội dung',type:'textarea'}]))S.toast('Gửi lời nhắn thành công.');}
 });
})();
