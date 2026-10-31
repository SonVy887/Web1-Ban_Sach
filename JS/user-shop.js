'use strict';
(() => {
 const S=window.SV;if(!S)return;const {$,$$,page}=S;
 document.addEventListener('click',async e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.matches('.catalog-cart,.book-btn,.btn-add,.btn-arrival,.recommendation-grid button,.wishlist-card .add-cart,.product-info .add-cart,#add-all')){e.preventDefault();S.toast('Thêm vào giỏ hàng thành công.');}
  else if(b.matches('.catalog-buy,.buy-now')){e.preventDefault();S.go('giohang.html');}
  else if(b.matches('.catalog-heart,.book-wishlist,.favorite')){e.preventDefault();S.toast('Thêm vào yêu thích thành công.');}
  else if(b.matches('.remove-item')){e.preventDefault();S.toast('Xóa khỏi yêu thích thành công.');}
  else if(b.matches('.read-mark')){e.preventDefault();S.toast('Đánh dấu đã đọc thành công.');}
  else if(b.matches('#share-wishlist')){e.preventDefault();S.toast('Chia sẻ danh sách thành công.');}
  else if(b.matches('.quantity button')){
   e.preventDefault();
   // Số lượng tạm trước khi xác nhận, không lưu và không cập nhật giá mẫu.
   const control=b.closest('.quantity'),quantity=$('span',control);
   const step=b===control.querySelector('button')?-1:1;
   quantity.textContent=String(Math.max(1,(Number(quantity.textContent)||1)+step));
  }
  else if(b.matches('.btn-explore'))S.go('danhmucsanpham.html');
  else if(b.matches('.btn-detail'))S.go('chitietsanpham.html');
  else if(b.matches('.btn-outline'))await S.dialog('Đọc thử sách',[{name:'excerpt',label:'Trích đoạn mẫu',type:'textarea'}],{excerpt:'“Cái chết không phải là sự đối lập với sự sống, mà là một phần tự nhiên và vĩnh hằng của sự sống.” — Rừng Na Uy'},'Đóng');
  else if(page!=='danhmucsanpham'&&b.matches('.filter-chip,.view-toggle,.pagination button,.btn-lists button,.filter-reset,.active-filters button')){e.preventDefault();S.reload();}
 });

 function setupCatalog(){
  const form=$('#catalog-filter-form');if(!form)return;
  const applied=new URLSearchParams(location.search);
  const pageNumber=Math.min(12,Math.max(1,Number.parseInt(applied.get('page'),10)||1));
  const pageSize=['12','24','48'].includes(applied.get('per-page'))?applied.get('per-page'):'12';
  const categories=applied.getAll('category').filter(x=>x!=='all');
  const query=applied.get('q')||'';
  form.elements.q.value=query;
  const headerSearch=$('.header .search-input');if(headerSearch)headerSearch.value=query;
  const normalize=text=>text.toLocaleLowerCase('vi').replace(/\s+/g,' ').trim();
  const categoryInputs=$$('input[name="category"]',form);
  categoryInputs.forEach(input=>{input.checked=input.value==='all'?categories.length===0:categories.some(c=>normalize(c)===normalize(input.value));});
  $$('input[name="format"]',form).forEach(input=>input.checked=applied.getAll('format').includes(input.value));
  const price=$$('input[name="price"]',form).find(input=>input.value===(applied.get('price')||'all'));
  if(price)price.checked=true;
  const sort=$('#sort');if(sort&&applied.has('sort'))sort.value=applied.get('sort');
  // Changing controls only prepares conditions. Navigation starts on submit.
  categoryInputs.forEach(input=>input.addEventListener('change',()=>{
   if(input.value==='all'&&input.checked)categoryInputs.forEach(other=>{if(other!==input)other.checked=false;});
   else if(input.value!=='all'&&input.checked)categoryInputs.find(other=>other.value==='all').checked=false;
   if(!categoryInputs.some(other=>other.checked))categoryInputs.find(other=>other.value==='all').checked=true;
  }));
  function navigate(params){S.go((location.pathname.split('/').pop()||'danhmucsanpham.html')+'?'+params.toString());}
  form.addEventListener('submit',event=>{
   event.preventDefault();const params=new URLSearchParams(applied);
   ['q','category','format','price','min-price','max-price','page','sort'].forEach(key=>params.delete(key));
   const term=form.elements.q.value.trim();if(term)params.set('q',term);
   $$('input[name="category"]:checked',form).filter(input=>input.value!=='all').forEach(input=>params.append('category',input.value));
   $$('input[name="format"]:checked',form).forEach(input=>params.append('format',input.value));
   const selected=$('input[name="price"]:checked',form)?.value||'all';
   if(selected!=='all')params.set('price',selected);
   const ranges={under100:['','100000'],range100300:['100000','300000'],over300:['300000','']};
   if(ranges[selected]){if(ranges[selected][0])params.set('min-price',ranges[selected][0]);if(ranges[selected][1])params.set('max-price',ranges[selected][1]);}
   if(sort)params.set('sort',sort.value);params.set('page','1');navigate(params);
  });
  function reset(){const params=new URLSearchParams();if(S.logged)params.set('demo-login','1');params.set('page','1');navigate(params);}
  $('.filter-reset',form)?.addEventListener('click',reset);
  const active=$('#catalog-active-filters');
  if(active){
   const chips=[];
   if(query)chips.push(['Tên sách: '+query,['q']]);
   if(categories.length)chips.push(['Danh mục: '+categories.join(', '),['category']]);
   if(applied.getAll('format').length)chips.push(['Hình thức: '+applied.getAll('format').join(', '),['format']]);
   const priceLabels={under100:'Dưới 100.000đ',range100300:'100.000đ - 300.000đ',over300:'Trên 300.000đ'};
   if(priceLabels[applied.get('price')])chips.push(['Giá: '+priceLabels[applied.get('price')],['price','min-price','max-price']]);
   active.hidden=chips.length===0;
   const label=document.createElement('span');label.textContent='ĐANG LỌC:';active.append(label);
   chips.forEach(([text,keys])=>{const button=document.createElement('button');button.type='button';button.textContent=text+' ×';button.setAttribute('aria-label','Bỏ '+text);button.addEventListener('click',()=>{const params=new URLSearchParams(applied);keys.forEach(key=>params.delete(key));params.set('page','1');navigate(params);});active.append(button);});
   const clear=document.createElement('button');clear.type='button';clear.textContent='Xóa tất cả bộ lọc';clear.addEventListener('click',reset);active.append(clear);
  }
  const pagination=$('.pagination');if(pagination){
   $$('.page-numbers button',pagination).forEach(button=>{
    const text=button.textContent.trim();const number=/^\d+$/.test(text)?Number(text):null;
    button.type='button';button.classList.toggle('current',number===pageNumber);
    if(number===pageNumber)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');
    if(text.includes('trước'))button.disabled=pageNumber===1;
    if(text.includes('sau'))button.disabled=pageNumber===12;
    button.addEventListener('click',()=>{const params=new URLSearchParams(applied);params.set('page',String(number||(text.includes('trước')?pageNumber-1:pageNumber+1)));navigate(params);});
   });
   $$('.pagination > button').forEach(button=>{button.type='button';button.classList.toggle('selected',button.textContent.trim()===pageSize);button.addEventListener('click',()=>{const params=new URLSearchParams(applied);params.set('per-page',button.textContent.trim());params.set('page','1');navigate(params);});});
   const jump=$('label input',pagination);if(jump){jump.value=String(pageNumber);const go=()=>{if(!jump.reportValidity())return;const params=new URLSearchParams(applied);params.set('page',jump.value);navigate(params);};$('label button',pagination)?.addEventListener('click',go);jump.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();go();}});}
  }
  $$('.view-toggle').forEach(button=>button.addEventListener('click',()=>S.toast('Chọn kiểu hiển thị thành công.')));
  // The book cards remain the same static sample for every query and page.
 }

 if(page==='danhmucsanpham')setupCatalog();
 if(page==='wishlist')$('#sort-select')?.addEventListener('change',()=>S.reload());
 $$('.format-option').forEach(el=>{el.tabIndex=0;el.addEventListener('click',()=>S.toast('Chọn định dạng thành công.'));});
 $$('.thumb').forEach(b=>b.addEventListener('click',()=>S.toast('Xem ảnh thành công.')));
 $$('.section-tabs button').forEach(b=>b.addEventListener('click',()=>S.toast('Chuyển mục thành công.')));
})();
