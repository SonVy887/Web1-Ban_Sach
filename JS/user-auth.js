'use strict';
(() => {
 const S=window.SV;if(!S)return;const {$,$$}=S;
 const params=new URLSearchParams(location.search);
 const returnToCart=params.get('next')==='cart';
 if(params.has('registered')) S.toast('Đăng ký thành công (mô phỏng).');
 if(returnToCart&&(S.page==='login'||S.page==='register')){
  $$('a[href="register.html"], a[href="login.html"]').forEach(link=>{
   link.setAttribute('href',link.getAttribute('href')+'?next=cart');
  });
  const intro=$('.login-intro');
  if(intro)intro.textContent='Đăng nhập để mở giỏ hàng và tiếp tục đặt hàng.';
 }
 const login=$('#login-form');
 if(login){
  login.noValidate=true;
  login.addEventListener('submit',event=>{
   event.preventDefault();
   S.go(returnToCart?'giohang.html':'account.html',true);
  });
 }
 const toggle=$('#toggle-password'),password=$('#login-password');toggle?.addEventListener('click',()=>{password.type=password.type==='password'?'text':'password';toggle.textContent=password.type==='password'?'Hiện':'Ẩn';toggle.setAttribute('aria-pressed',String(password.type==='text'));});
 $$('[data-toggle]').forEach(b=>b.addEventListener('click',()=>{const input=document.getElementById(b.dataset.toggle);input.type=input.type==='password'?'text':'password';b.textContent=input.type==='password'?'Hiện':'Ẩn';}));
 const register=$('#registerForm');
 if(register){
  register.noValidate=true;
  register.addEventListener('submit',event=>{
   event.preventDefault();
   register.reset();
   S.go(returnToCart?'login.html?registered=1&next=cart':'login.html?registered=1');
  });
 }
})();
