// Age gate (18+, Alberta). Remembered per browser; page content stays in the HTML for search engines.
(function(){
  var gate=document.getElementById('gate'); if(!gate) return;
  var ok=false;
  try{ ok=localStorage.getItem('nb_age_ok')==='1'; }catch(e){}
  if(!ok){ gate.hidden=false; document.getElementById('gate-yes').focus(); }
  document.getElementById('gate-yes').addEventListener('click',function(){
    try{ localStorage.setItem('nb_age_ok','1'); }catch(e){}
    gate.hidden=true;
  });
  document.getElementById('gate-no').addEventListener('click',function(){
    document.getElementById('gate-msg').hidden=false;
  });
})();

// Visual effects: reveal on scroll, animated sign, cursor ring. Skipped when the visitor prefers reduced motion.
(function(){
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce||!('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('fx');
  var sel='main section .wrap > h2, main section .wrap > .sub, main .prose > *, .loc, .gallery figure, .storefront, .facts, .map, .reviews, .faq details, .cols > div';
  var els=[].slice.call(document.querySelectorAll(sel));
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{rootMargin:'0px 0px -8% 0px',threshold:0.08});
  els.forEach(function(el){
    var sib=el.parentNode?[].indexOf.call(el.parentNode.children,el):0;
    el.style.transitionDelay=Math.min(sib%6,5)*70+'ms';
    el.classList.add('reveal'); io.observe(el);
  });
  // Cursor ring: desktop mouse only
  if(!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  var c=document.createElement('div'); c.className='nb-cursor'; c.setAttribute('aria-hidden','true'); document.body.appendChild(c);
  var x=0,y=0,cx=0,cy=0,raf=null;
  function loop(){ cx+=(x-cx)*0.22; cy+=(y-cy)*0.22; c.style.transform='translate('+cx+'px,'+cy+'px)'; raf=(Math.abs(x-cx)+Math.abs(y-cy)>0.3)?requestAnimationFrame(loop):null; }
  document.addEventListener('mousemove',function(e){ x=e.clientX; y=e.clientY; c.classList.add('on'); if(!raf) raf=requestAnimationFrame(loop);
    c.classList.toggle('big',!!(e.target.closest&&e.target.closest('a,button,summary,.loc,.gallery figure'))); },{passive:true});
  document.addEventListener('mouseleave',function(){ c.classList.remove('on'); });
  document.addEventListener('mousedown',function(){ c.classList.add('down'); });
  document.addEventListener('mouseup',function(){ c.classList.remove('down'); });
})();
