(function(){
 'use strict';
 const tabs=[...document.querySelectorAll('.section-tabs [role="tab"]')];
 if(!tabs.length)return;
 function selectTab(selected){tabs.forEach(tab=>{
  const active=tab===selected;tab.classList.toggle('active',active);
  tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;
  const panel=document.getElementById(tab.getAttribute('aria-controls'));if(panel)panel.hidden=!active;
 });}
 tabs.forEach((tab,index)=>{
  tab.addEventListener('click',event=>{event.preventDefault();event.stopImmediatePropagation();selectTab(tab);},true);
  tab.addEventListener('keydown',event=>{
   let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;else if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;
   event.preventDefault();selectTab(tabs[next]);tabs[next].focus();
  });
 });selectTab(tabs[0]);
})();
