(function(){
 'use strict';const S=window.SV;if(!S)return;
 const params=new URLSearchParams(location.search),keyword=document.querySelector('#search-keyword');
 keyword.value=params.get('q')||'';
 const title=document.querySelector('#search-results-title');title.textContent=keyword.value||'Kết quả tìm kiếm';
 const count=document.createElement('span');count.textContent=' (4 cuốn)';title.append(count);
 document.querySelector('#sr-keyword-form').addEventListener('submit',event=>{event.preventDefault();const next=new URLSearchParams(location.search);next.set('q',keyword.value.trim());next.delete('page');S.go('ketquatimkiem.html?'+next.toString());});
 document.querySelector('#sort').addEventListener('change',()=>S.toast('Đã chọn kiểu sắp xếp.'));
 document.querySelectorAll('[data-search-action]').forEach(button=>button.addEventListener('click',async()=>{
  if(button.dataset.searchAction==='cart')S.toast('Đã thêm sách vào giỏ hàng.');
  if(button.dataset.searchAction==='favorite')S.toast('Đã lưu sách vào danh sách yêu thích.');
  if(button.dataset.searchAction==='request'){const accepted=await S.dialog('Yêu cầu tìm sách',[{name:'book',label:'Tên sách hoặc thông tin cần tìm',type:'textarea'}],{},'Gửi yêu cầu');if(accepted)S.toast('Đã gửi yêu cầu tìm sách.');}
 }));
})();
