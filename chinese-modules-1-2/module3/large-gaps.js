const largeGapRender=render;render=function(){largeGapRender();if(card()?.kind==='gaps'){const rows=card().displayRows||[];screen.querySelectorAll('.questioncard').forEach((el,i)=>{const n=(rows[i]?.[0]||'').replace(/[□，。！？、,.!?\s]/g,'').length;el.style.setProperty('--gap-sentence-size',(n<=10?56:n<=15?48:n<=22?42:36)+'px')})}};
if(group&&card()?.kind==='gaps')render();
