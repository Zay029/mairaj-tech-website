const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuButton.addEventListener('click', () => {
  const opened = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(opened));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));
document.querySelector('.theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('light');
  document.querySelector('.theme-toggle').textContent = document.body.classList.contains('light') ? '☾' : '☼';
});
document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { event.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
  });
});

// Load transition: never block visitors indefinitely if an asset fails.
(function () {
 const loader=document.getElementById('preloader');
 if(!loader)return;
 const started=performance.now();
 const finish=()=>setTimeout(()=>{loader.classList.add('is-done');setTimeout(()=>loader.remove(),900)},Math.max(0,2300-(performance.now()-started)));
 if(document.readyState==='complete')finish();else window.addEventListener('load',finish,{once:true});
 setTimeout(()=>{if(loader.isConnected){loader.classList.add('is-done');setTimeout(()=>loader.remove(),900)}},6000);
})();
// Real home navigation, even when the user is already on the page.
document.querySelectorAll('a[href="index.html#top"]').forEach(a=>a.addEventListener('click',e=>{
 if(location.pathname.endsWith('/')||location.pathname.endsWith('/index.html')||location.protocol==='file:'){
  e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});
  document.querySelector('.main-nav')?.classList.remove('open');
  document.querySelector('.menu-toggle')?.setAttribute('aria-expanded','false');
 }
}));
// Apply official social profile URLs from social-links.js when supplied.
const profiles=window.MAIRAJ_SOCIAL_LINKS||{};
document.querySelectorAll('[data-social]').forEach(link=>{
 const url=profiles[link.dataset.social];
 if(url && /^https:\/\//.test(url)){link.href=url;link.target='_blank';link.rel='noopener noreferrer';}
 else{link.classList.add('unconfigured');link.title='Official profile link has not been added yet';}
});
