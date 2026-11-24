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

// Visual effects: reveal on scroll and animated sign. Skipped when the visitor prefers reduced motion.
(function(){
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce||!('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('fx');
  var sel='main section .wrap > h2, main section .wrap > .sub, main .prose > *, .loc, .cat, .gallery figure, .storefront, .facts, .map, .reviews, .faq details, .cols > div';
  var els=[].slice.call(document.querySelectorAll(sel));
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{rootMargin:'0px 0px -8% 0px',threshold:0.08});
  els.forEach(function(el){
    var sib=el.parentNode?[].indexOf.call(el.parentNode.children,el):0;
    el.style.transitionDelay=Math.min(sib%6,5)*70+'ms';
    el.classList.add('reveal'); io.observe(el);
  });
})();
