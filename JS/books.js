'use strict';
window.addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;if(button.id==='btn-open-add'||button.matches('.btn-edit')){event.preventDefault();event.stopImmediatePropagation();location.assign('book-editor.html?mode='+(button.id==='btn-open-add'?'add':'edit'));}},true);

document.addEventListener('DOMContentLoaded',()=>{window.AdminUI?.mount({createTitle:'Thêm sách mới',summary:'Thông tin sách và các ấn bản.',fields:[{label:'Tên sách',type:'text'},{label:'Tác giả',type:'text'},{label:'Danh mục',options:['Văn học & Tiểu thuyết','Kinh doanh - Khởi nghiệp','Phát triển bản thân','Thiếu nhi & Tranh truyện']},{label:'Nhà xuất bản',type:'text'}]});});
