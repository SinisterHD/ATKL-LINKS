(() => {
  'use strict';
  const config = window.ATKL_CONFIG || {links: [], featuredEvent: null};
  const list = document.getElementById('links-list');
  (config.links || []).forEach((item, index) => {
    if (!/^https:\/\//.test(item.href)) return;
    const card = document.createElement('a');
    card.className = 'link-card' + (item.primary ? ' primary' : '');
    card.href = item.href;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    const number = document.createElement('span');
    number.className = 'link-num';
    number.textContent = String(index + 1).padStart(2,'0');
    const copy = document.createElement('span');
    copy.className = 'link-copy';
    const title = document.createElement('strong');
    title.textContent = item.label;
    const sub = document.createElement('small');
    sub.textContent = item.sublabel;
    copy.append(title,sub);
    const arrow = document.createElement('span');
    arrow.className = 'link-arrow';
    arrow.textContent = '↗';
    arrow.setAttribute('aria-hidden','true');
    card.append(number,copy,arrow);
    list.append(card);
  });
  const event = config.featuredEvent;
  if (event && event.title && /^https:\/\//.test(event.href || '')) {
    const eventBox = document.getElementById('featured-event');
    eventBox.hidden = false;
    document.getElementById('events-default').hidden = true;
    const info = document.createElement('div');
    info.className = 'featured-info';
    const title = document.createElement('strong');
    title.textContent = event.title;
    const desc = document.createElement('small');
    desc.textContent = event.description || 'Información oficial';
    info.append(title, desc);
    const action = document.createElement('a');
    action.href = event.href; action.target = '_blank'; action.rel='noopener noreferrer';
    action.textContent = 'VER EVENTO Y ENTRADAS  ↗';
    eventBox.append(info,action);
  }
  document.getElementById('year').textContent = String(new Date().getFullYear());
  const shareBtn = document.getElementById('share-site');
  const toast = document.getElementById('toast');
  let toastTimer;
  const notify = (message) => {
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=>toast.classList.remove('visible'),2500);
  };
  shareBtn.addEventListener('click', async () => {
    if (location.protocol === 'file:') {
      notify('Publica la web antes de compartir su enlace.');
      return;
    }
    try {
      if (navigator.share) {
        await navigator.share({title:'ATKL Records',url:location.href});
      } else if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(location.href);
        notify('Enlace copiado al portapapeles.');
      } else {
        const tmp = document.createElement('textarea');
        tmp.value=location.href; tmp.style.position='fixed'; tmp.style.opacity='0';
        document.body.append(tmp); tmp.select();
        const copied = document.execCommand('copy');tmp.remove();
        notify(copied ? 'Enlace copiado.' : 'Copia la dirección desde el navegador.');
      }
    } catch(e) { if (e.name!=='AbortError') notify('No fue posible compartir.'); }
  });

  /* 3D de respaldo (sin librerías ni internet). El modelo WebGL reemplaza este
     efecto cuando Three.js está disponible. */
  const stage = document.getElementById('logo-stage');
  const fallback = document.getElementById('logo-css');
  let dragging = false, lastX=0, lastY=0, angleX=-7, angleY=8;
  const applyRotation = () => {
    fallback.style.animation = 'none';
    fallback.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
  };
  stage.addEventListener('pointerdown', (e) => {
    if(stage.classList.contains('three-ready')) return;
    dragging = true; lastX=e.clientX;lastY=e.clientY;
    try{stage.setPointerCapture(e.pointerId)}catch(_){ }
  });
  stage.addEventListener('pointermove', (e) => {
    if (!dragging || stage.classList.contains('three-ready')) return;
    angleY=Math.max(-48,Math.min(48,angleY+(e.clientX-lastX)*.28));
    angleX=Math.max(-27,Math.min(27,angleX-(e.clientY-lastY)*.22));
    lastX=e.clientX;lastY=e.clientY;applyRotation();
  });
  stage.addEventListener('pointerup', ()=>{dragging=false});
  stage.addEventListener('pointercancel', ()=>{dragging=false});
  document.getElementById('reset-view').addEventListener('click', () => {
    if (typeof window.resetATKL3D === 'function') window.resetATKL3D();
    angleX=-7;angleY=8;
    fallback.style.animation='';fallback.style.transform='';
  });
})();
