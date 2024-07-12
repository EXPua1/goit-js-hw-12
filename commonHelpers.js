import{a as w,S as C,i as p}from"./assets/vendor-b11e2a50.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const q="44853221-20be0a035158c611166c29677",S="https://pixabay.com/api/";async function y(e,s=1,r=15){const n=encodeURIComponent(e),t=`${S}?key=${q}&q=${n}&image_type=photo&orientation=horizontal&safesearch=true&page=${s}&per_page=${r}`;return w.get(t)}let $=new C(".gallery a",{captionsData:"alt",captionDelay:250,close:!0,nav:!0});function v(e){const s=document.querySelector(".gallery");e.forEach(r=>{const n=document.createElement("div");n.classList.add("card");const t=document.createElement("a");t.href=r.largeImageURL,t.title=r.tags;const o=document.createElement("img");o.src=r.webformatURL,o.alt=r.tags,t.appendChild(o);const c=document.createElement("div");c.classList.add("card-info"),c.innerHTML=`
      <p>Likes ${r.likes}</p>
      <p>Views ${r.views}</p>
      <p>Comments ${r.comments}</p>
      <p>Downloads ${r.downloads}</p>
    `,n.appendChild(t),n.appendChild(c),s.appendChild(n)}),$.refresh()}const L=document.querySelector(".gallery");function A(){p.info({title:"Внимание",message:"Введите текст для поиска изображений",position:"topRight"})}function E(){L.insertAdjacentHTML("afterbegin",'<div class="loader">Loading...</div>')}function I(){const e=L.querySelector(".loader");e&&e.parentNode.removeChild(e)}function b(){p.info({title:"Attention",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}function T(){const e=document.querySelectorAll(".gallery .card");if(e.length>0){const r=e[e.length-1].getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}}function u(e="An unexpected error occurred."){p.error({title:"Error",message:e,position:"topRight"})}const M=document.getElementById("searchForm"),f=document.querySelector(".search input"),N=document.querySelector(".gallery"),R=document.getElementById("button-container");let g="",a=!1,i=1;const l=15;let h=0,d=!0;M.addEventListener("submit",e=>{if(e.preventDefault(),!a){if(f.value.trim()===""){A();return}a=!0,i=1,g=f.value.trim(),N.innerHTML="",d=!0,x()}});async function x(){try{E();const e=await y(g,i,l);if(h=e.data.totalHits,e.data.hits.length===0){m(),u("No images found."),f.value="";return}else v(e.data.hits),B(e.data.hits.length),h<=i*l&&(m(),setTimeout(()=>{b()},500))}catch(e){console.error("Error during the search request:",e),u("An error occurred during the search.")}finally{I(),a=!1}}function B(e){e<l&&(d=!1),d&&F()}function F(){if(!document.getElementById("fetchButton")){const e=document.createElement("button");e.id="fetchButton",e.textContent="Load More Images",e.addEventListener("click",H),R.appendChild(e)}}function m(){const e=document.getElementById("fetchButton");e&&e.remove()}async function H(){if(!a){a=!0,i+=1;try{E();const e=await y(g,i,l);e.data.hits.length===0?(u("No more images found."),d=!1):(v(e.data.hits),B(e.data.hits.length),h<=i*l&&(m(),setTimeout(()=>{b()},500)),T())}catch(e){console.error("Error during the search request:",e),u("An error occurred during the search.")}finally{I(),a=!1}}}document.addEventListener("touchstart",function(){},{passive:!0});document.addEventListener("touchmove",function(){},{passive:!0});
//# sourceMappingURL=commonHelpers.js.map