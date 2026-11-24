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
