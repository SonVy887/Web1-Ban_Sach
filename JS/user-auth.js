'use strict';
(() => {
 const S=window.SV;if(!S)return;const {$,$$}=S;
 const login=$('#login-form');if(login){login.noValidate=true;login.addEventListener('submit',e=>{e.preventDefault();S.go('account.html',true);});}
 const toggle=$('#toggle-password'),password=$('#login-password');toggle?.addEventListener('click',()=>{password.type=password.type==='password'?'text':'password';toggle.textContent=password.type==='password'?'Hiện':'Ẩn';toggle.setAttribute('aria-pressed',String(password.type==='text'));});
 $$('[data-toggle]').forEach(b=>b.addEventListener('click',()=>{const input=document.getElementById(b.dataset.toggle);input.type=input.type==='password'?'text':'password';b.textContent=input.type==='password'?'Hiện':'Ẩn';}));
 const register=$('#registerForm');if(register){register.noValidate=true;register.addEventListener('submit',async e=>{e.preventDefault();const ok=await S.dialog('Đăng ký thành công',[],{},'Đến trang đăng nhập');register.reset();if(ok)S.go('login.html');});}
})();
