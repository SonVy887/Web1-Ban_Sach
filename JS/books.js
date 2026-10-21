// Giao diện quản lý sách: thông báo tương tác, không cập nhật dữ liệu trên bảng.
const $ = id => document.getElementById(id);
function showToast(message, type='info') {
  const wrap=$('toast-wrap');
  const el=document.createElement('div');
  const icon=type==='error'?'error':type==='success'?'check_circle':'info';
  el.className='toast-anim pointer-events-auto p-3.5 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold text-white bg-primary-container';
  const symbol=document.createElement('span'); symbol.className='material-symbols-outlined text-[18px]'; symbol.textContent=icon;
  const msg=document.createElement('span');msg.textContent=message;
  el.append(symbol,msg);wrap.append(el);
  setTimeout(()=>{el.style.opacity='0';el.style.transition='opacity .25s';setTimeout(()=>el.remove(),260)},3200);
}
function openModal(id){$(id)?.classList.add('active')}
function closeModal(id){$(id)?.classList.remove('active')}
function notify(message){showToast(message,'success')}
document.querySelectorAll('.modal-close').forEach(b=>b.addEventListener('click',()=>closeModal(b.dataset.target)));
document.querySelectorAll('.modal-backdrop').forEach(el=>el.addEventListener('click',e=>{if(e.target===el)el.classList.remove('active')}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.modal-backdrop.active').forEach(m=>m.classList.remove('active'))});
const rows=[...document.querySelectorAll('.book-row')];
let selected=rows[0];
let currentQuickStatus=selected?.dataset.status || "Đang mở bán";
function selectRow(row){
  selected=row;
  $('quick-badge').textContent='#'+row.dataset.code;
  $('quick-title').textContent=row.dataset.title;
  $('quick-price').value=row.dataset.price;
  $('quick-stock').value=row.dataset.stock;
  currentQuickStatus=row.dataset.status;
  document.querySelectorAll('.quick-status-btn').forEach(b=>b.classList.toggle('demo-selected-tab',b.dataset.status===currentQuickStatus));
}
rows.forEach(row=>{
  row.addEventListener('click',e=>{if(e.target.closest('button,input'))return;selectRow(row)});
  row.querySelector('.btn-edit')?.addEventListener('click',()=>{
    ['code','title','author','price','stock','status'].forEach(k=>{const el=$('edit-'+k);if(el)el.value=row.dataset[k]||''});
    openModal('modal-edit');
  });
  row.querySelector('.btn-stock')?.addEventListener('click',()=>{
    $('stock-target-code').textContent=row.dataset.code;
    $('stock-target-title').textContent=row.dataset.title;
    $('stock-target-val').textContent=row.dataset.stock+' cuốn';
    $('stock-target-input').value=row.dataset.stock;
    openModal('modal-stock');
  });
  row.querySelector('.btn-del')?.addEventListener('click',()=>{
    $('del-title-label').textContent='Bạn có chắc muốn xóa ấn phẩm "'+row.dataset.title+'" khỏi hệ thống lưu hành?';
    openModal('modal-del');
  });
});
$('btn-open-add').addEventListener('click',()=>openModal('modal-add'));
$('form-add').addEventListener('submit',e=>{e.preventDefault();if(!e.target.reportValidity())return;closeModal('modal-add');notify('Thêm sách thành công!')});
$('form-edit').addEventListener('submit',e=>{e.preventDefault();if(!e.target.reportValidity())return;closeModal('modal-edit');notify('Lưu thay đổi thành công!')});
$('btn-stock-plus').addEventListener('click',()=>{$('stock-target-input').value=Number($('stock-target-input').value||0)+1});
$('btn-stock-minus').addEventListener('click',()=>{$('stock-target-input').value=Math.max(0,Number($('stock-target-input').value||0)-1)});
$('btn-save-stock').addEventListener('click',()=>{closeModal('modal-stock');notify('Cập nhật tồn kho thành công!')});
$('btn-confirm-del').addEventListener('click',()=>{closeModal('modal-del');notify('Xóa sách thành công!')});
$('btn-export-csv').addEventListener('click',()=>notify('Xuất danh sách thành công!'));
$('btn-bulk-open').addEventListener('click',()=>notify('Đã chọn tác vụ hàng loạt'));
$('btn-quick-save').addEventListener('click',()=>notify('Lưu thay đổi thành công!'));
$('btn-quick-reset').addEventListener('click',()=>{selectRow(selected);showToast('Đã khôi phục giá trị ban đầu trên biểu mẫu','info')});
document.querySelectorAll('.quick-status-btn').forEach(b=>b.addEventListener('click',()=>{
  currentQuickStatus=b.dataset.status;
  document.querySelectorAll('.quick-status-btn').forEach(x=>x.classList.toggle('demo-selected-tab',x===b));showToast('Đã chọn trạng thái: '+b.textContent.trim()+'','info');
}));
document.querySelectorAll('.btn-approve').forEach(b=>b.addEventListener('click',()=>notify('Đơn hàng đã được duyệt!')));
document.querySelectorAll('.btn-view-order').forEach(b=>b.addEventListener('click',()=>{
  const d=b.dataset;
  $('order-detail-id').textContent='Chi Tiết Đơn Hàng '+(d.id||'');
  ['name','phone','addr','items','total'].forEach(k=>{const el=$('order-detail-'+k);if(el)el.textContent=d[k==='addr'?'address':k]||'—'});
  openModal('modal-order');
}));
$('btn-order-modal-approve').addEventListener('click',()=>{closeModal('modal-order');notify('Đơn hàng đã được xác nhận!')});
$('btn-view-schedule').addEventListener('click',()=>openModal('modal-sched'));
document.querySelectorAll('.order-tab').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.order-tab').forEach(x=>x.classList.remove('demo-selected-tab'));
  b.classList.add('demo-selected-tab');notify('Đã chọn nhóm đơn hàng: '+b.textContent.trim());
}));
function searchBooks(){
  const q=$('search-input').value.trim();
  if(!q){showToast('Vui lòng nhập tên sách, tác giả hoặc ISBN để tìm kiếm','info');return;}
  notify('Đã tìm kiếm: '+q);
}
$('btn-search').addEventListener('click',searchBooks);
$('search-input').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();searchBooks()}});
$('genre-filter').addEventListener('change',e=>notify('Đã chọn bộ lọc '+e.target.options[e.target.selectedIndex].text));
$('check-all').addEventListener('change',e=>document.querySelectorAll('.row-check').forEach(c=>c.checked=e.target.checked));
document.querySelectorAll('.row-check').forEach(c=>c.addEventListener('change',()=>showToast('Đã chọn '+document.querySelectorAll('.row-check:checked').length+' sách để thao tác','info')));
// Nút phân trang và nút in chỉ thông báo, không thay đổi bảng.
document.querySelectorAll('button').forEach(b=>{
  if(['1','2','3'].includes(b.textContent.trim()) && b.closest('.justify-between')) b.addEventListener('click',()=>notify('Đã chọn trang '+b.textContent.trim()));
  if(b.textContent.includes('In Hóa Đơn')) b.addEventListener('click',()=>notify('Đã nhấn in hóa đơn'));
});
// Chuẩn hóa thông báo trên nút chuông (giữ nội dung có sẵn).
// Phản hồi cho các nút phụ chưa thuộc một chức năng riêng.
const handledSelectors = [
 '.modal-close','.btn-edit','.btn-stock','.btn-del','.btn-approve','.btn-view-order',
 '.quick-status-btn','.order-tab','.row-check',
 '#btn-open-add','#btn-export-csv','#btn-bulk-open','#btn-view-schedule',
 '#btn-quick-save','#btn-quick-reset','#btn-stock-plus','#btn-stock-minus',
 '#btn-save-stock','#btn-confirm-del','#btn-order-modal-approve'
].join(',');
document.querySelectorAll('button').forEach(b=>{
 if(b.matches(handledSelectors) || b.closest('form#form-add,form#form-edit'))return;
 if(['1','2','3'].includes(b.textContent.trim()))return;
 b.addEventListener('click',()=>notify('Đã nhấn '+(b.title||b.textContent.trim()||'nút thao tác')));
});

// Đặt trạng thái chọn ban đầu cho hai nhóm tab.
if(selected) selectRow(selected);
const defaultOrderTab=document.querySelector('.order-tab[data-filter="all"]');
if(defaultOrderTab)defaultOrderTab.classList.add('demo-selected-tab');
