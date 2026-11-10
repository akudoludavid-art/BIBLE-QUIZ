
(function(){const N={ot:"Old Testament",nt:"New Testament",mixed:"Mixed Bible",hard:"Hard Mode"},L=document.getElementById("startLabel");
document.querySelectorAll(".mode[data-mode]").forEach(b=>b.addEventListener("click",()=>{L.textContent="Start "+N[b.dataset.mode]+(b.dataset.mode==="hard"||b.dataset.mode==="mixed"?" Quiz":" Quiz");}));
document.addEventListener("keydown",e=>{if(e.metaKey||e.ctrlKey||e.altKey||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;
const v=["quiz","scriptureQuiz","memo"].map(id=>document.getElementById(id)).find(s=>!s.classList.contains("hidden"));if(!v)return;
if(e.key==="Enter"){const n=v.querySelector("#nextBtn:not(.hidden),#snext:not(.hidden)");if(n){e.preventDefault();n.click();}return;}
const i="1234abcd".indexOf(e.key.toLowerCase());if(i<0)return;const o=v.querySelectorAll(".answer:not(:disabled)"),all=v.querySelectorAll(".answer"),k=i%4;
if(o.length&&all[k]&&!all[k].disabled)all[k].click();});})();
