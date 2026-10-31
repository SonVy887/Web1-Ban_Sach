'use strict';
// Mô phỏng giao diện: không đọc hoặc ghi dữ liệu trình duyệt.
const SV_ACCOUNT_MENU="<details class=\"member-account-menu\"><summary><span class=\"member-avatar\">SV</span><span class=\"member-account-name\">Lại Sơn Vỹ</span><span class=\"material-symbols-outlined\" aria-hidden=\"true\">expand_more</span></summary><nav aria-label=\"Menu tài khoản\"><a href=\"account.html\">Tài khoản của tôi</a><a href=\"my-orders.html\">Đơn hàng của tôi</a><a href=\"trangchu.html\">Đăng xuất</a></nav></details>";
(() => {
 const $=(selector,root=document)=>root.querySelector(selector);
 const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];
 const page=document.body.dataset.userPage;
 // Cờ trên URL chỉ điều khiển header, không lưu tài khoản hay thông tin đã nhập.
 const logged=new URLSearchParams(location.search).get('demo-login')==='1';
 function url(path,login=logged){const target=new URL(path,location.href);if(login)target.searchParams.set('demo-login','1');else target.searchParams.delete('demo-login');return target.pathname.split('/').pop()+target.search+target.hash;}
 function go(path,login=logged){location.assign(url(path,login));}
 function reload(){go(location.pathname.split('/').pop()||'trangchu.html');}
 let timer;
 function toast(message){let box=$('#user-toast');if(!box){box=document.createElement('div');box.id='user-toast';box.role='status';box.setAttribute('aria-live','polite');document.body.append(box);}box.textContent=message;box.hidden=false;clearTimeout(timer);timer=setTimeout(()=>box.hidden=true,3000);}
 const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function dialog(title,fields=[],initial={},label='Xác nhận'){
  return new Promise(resolve=>{
   const el=document.createElement('dialog');el.id='user-dialog';el.setAttribute('aria-labelledby','user-dialog-title');
   el.innerHTML='<h2 id="user-dialog-title">'+escape(title)+'</h2><form novalidate>'+fields.map(f=>'<label>'+escape(f.label)+(f.type==='textarea'?'<textarea name="'+f.name+'" rows="3">'+escape(initial[f.name]||'')+'</textarea>':'<input name="'+f.name+'" type="'+(f.type||'text')+'"'+(f.type==='file'?' accept="image/*"':' value="'+escape(initial[f.name]||'')+'"')+'>')+'</label>').join('')+'<div class="user-dialog-actions"><button type="button" data-cancel>Hủy</button><button type="submit">'+escape(label)+'</button></div></form>';
   let accepted=false;const focus=document.activeElement;
   $('form',el).addEventListener('submit',e=>{e.preventDefault();accepted=true;el.close();});$('[data-cancel]',el).addEventListener('click',()=>el.close());
   el.addEventListener('close',()=>{el.remove();focus?.focus();resolve(accepted);},{once:true});document.body.append(el);el.showModal();
  });
 }
 async function success(message='Thao tác thành công.'){toast(message);}
 const actions=$('.header .action-buttons');if(actions){actions.innerHTML=logged?SV_ACCOUNT_MENU:'<a href="login.html" class="btn-primary">Đăng nhập</a><a href="register.html" class="btn-secondary">Đăng ký</a>';if(logged)$$('a',actions).filter(a=>a.textContent.toLowerCase().includes('đăng xuất')).forEach(a=>a.dataset.userAction='logout');}
 // Các link vẫn mở trang HTML mẫu. Không truyền dữ liệu sách, giỏ hay đơn hàng.
 document.addEventListener('click',e=>{
  const logout=e.target.closest('[data-user-action="logout"]');if(logout){e.preventDefault();go('trangchu.html',false);return;}
  const wish=e.target.closest('[data-user-action="wishlist"]');if(wish){e.preventDefault();go('wishlist.html');return;}
  const product=e.target.closest('[data-product-link]');if(product&&!e.target.closest('button')){e.preventDefault();go('chitietsanpham.html');return;}
  const info=e.target.closest('[data-user-info]');if(info){e.preventDefault();toast('Thao tác thành công.');return;}
  const link=e.target.closest('a[href]');if(link){const href=link.getAttribute('href');if(!href||href.startsWith('#'))return;const target=new URL(href,location.href);if(target.origin===location.origin&&target.pathname.endsWith('.html')){e.preventDefault();go(target.pathname.split('/').pop()+target.search+target.hash);return;}}
  if(e.target.closest('.btn-voucher')){e.preventDefault();toast('Đăng ký nhận voucher thành công.');}
 });
 document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('[data-product-link]'))e.target.click();});
 const search=$('.header .search-input');
 function submitBasicSearch(){
  const params=new URLSearchParams();const query=search?.value.trim();
  if(query)params.set('q',query);
  const category=$('.header .search-select');
  if(category&&category.selectedIndex>0)params.append('category',category.value);
  params.set('page','1');go('danhmucsanpham.html?'+params.toString());
 }
 $('.header .search-button')?.addEventListener('click',e=>{e.preventDefault();submitBasicSearch();});
 search?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();submitBasicSearch();}});
 document.addEventListener('click',e=>{$$('.member-account-menu[open]').forEach(menu=>{if(!menu.contains(e.target))menu.open=false;});});
 window.SV={$, $$,page,logged,go,reload,toast,dialog,success};
})();
