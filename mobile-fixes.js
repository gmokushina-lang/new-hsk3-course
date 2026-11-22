(()=>{
 const button=document.createElement('button');button.id='mobileBack';button.textContent='‹';button.setAttribute('aria-label','Назад');button.title='Назад';document.querySelector('#stage>header').prepend(button);
 button.onclick=()=>{
  const modal=document.querySelector('.shade.open');if(modal){closeModal();return}
  const notes=document.querySelector('#studioNotes.open');if(notes){notes.classList.remove('open');return}
  const kind=screen.dataset.kind;
  if(kind==='workbook'){if(wbState.lessons[wbLesson]?.finished){openWorkbookHome();return}if(document.querySelector('.wb-start')){openWorkbookHome();return}if(wbPage>0){wbPrev();return}wbOpen(wbLesson);return}
  if(kind==='workbook-home'){home();return}
  if(kind==='trainer'){if(trainerState&&document.querySelector('.trainer-bottom')){if(trainerState.index>0)trainerPrev();else openTrainer()}else home();return}
  if(group){if(index>0)step(-1);else lessonHome(Number(group.slice(1,3)));return}
  home();
 };
 const attempts=new WeakMap();
 document.addEventListener('error',e=>{const img=e.target;if(!(img instanceof HTMLImageElement)||!img.getAttribute('src')||!img.src.startsWith(location.origin+'/'))return;const n=attempts.get(img)||0;if(n<2){attempts.set(img,n+1);setTimeout(()=>{if(!img.isConnected)return;const url=new URL(img.src);url.searchParams.set('reload',String(n+1));img.src=url.href},700*(n+1))}else if(!img.nextElementSibling?.classList.contains('image-retry')){const retry=document.createElement('button');retry.className='image-retry';retry.textContent='↻ Загрузить картинку';retry.onclick=()=>{attempts.set(img,0);const u=new URL(img.src);u.searchParams.set('reload',String(Date.now()));img.src=u.href};img.after(retry)}},true);
 document.addEventListener('load',e=>{if(e.target instanceof HTMLImageElement&&e.target.nextElementSibling?.classList.contains('image-retry'))e.target.nextElementSibling.remove()},true);
 if(location.protocol==='https:'&&'serviceWorker'in navigator){navigator.serviceWorker.addEventListener('controllerchange',()=>navigator.serviceWorker.ready.then(reg=>reg.active?.postMessage({type:'CACHE_IMAGES'})));navigator.serviceWorker.ready.then(reg=>{reg.active?.postMessage({type:'CACHE_IMAGES'});reg.update().catch(()=>{})}).catch(()=>{})}
})();
