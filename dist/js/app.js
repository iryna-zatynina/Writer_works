"use strict";const iconBurger=document.querySelector(".burger-icon"),headerBlock=document.querySelector(".header__block"),iconClose=document.querySelector(".close-icon");if(iconBurger&&iconBurger.addEventListener("click",()=>{headerBlock.classList.add("burger-active"),bodyLock()}),iconClose){iconClose.addEventListener("click",()=>{headerBlock.classList.remove("burger-active"),bodyUnLock()});const e=document.querySelectorAll(".menu-link");e.length>0&&e.forEach(e=>{e.addEventListener("click",()=>{headerBlock.classList.contains("burger-active")&&(headerBlock.classList.remove("burger-active"),bodyUnLock())})})}const popupLinks=document.querySelectorAll(".popup-link"),body=document.querySelector("body");let unlock=!0;const timeout=400;if(popupLinks.length>0)for(let e=0;e<popupLinks.length;e++){popupLinks[e].addEventListener("click",e=>{popupOpen(document.getElementById("popup")),e.preventDefault()})}const popupCloseIcon=document.querySelectorAll(".close-popup"),forms=document.querySelectorAll("form");if(forms.length>0)for(let e=0;e<forms.length;e++){const o=forms[e],t=o.querySelector(".wait-btn");t.addEventListener("click",e=>{validation(o)&&(formSend(o),clearInputs(o),t.classList.contains("form-wait-btn")&&(popupClose(t.closest(".popup")),clearInputs(o))),e.preventDefault()}),document.addEventListener("click",e=>{e.target.closest("form")||clearInputs(o)})}if(popupCloseIcon.length>0)for(let e=0;e<popupCloseIcon.length;e++){const o=popupCloseIcon[e];o.classList.contains("form-wait-btn")||o.addEventListener("click",e=>{popupClose(o.closest(".popup")),e.preventDefault()})}function popupOpen(e){if(e&&unlock){const o=document.querySelector(".popup.open");o?popupClose(o,!1):bodyLock(),e.classList.add("open"),e.addEventListener("click",e=>{e.target.closest(".popup__body_content")||popupClose(e.target.closest(".popup"))})}}function popupClose(e,o=!0){unlock&&(e.classList.remove("open"),o&&bodyUnLock())}function bodyLock(){const e=window.innerWidth-document.querySelector(".wraper").offsetWidth+"px";body.style.paddingRight=e,body.classList.add("lock"),unlock=!1,setTimeout(()=>{unlock=!0},400)}function bodyUnLock(){setTimeout(()=>{body.style.paddingRight="0px",body.classList.remove("lock")},400),unlock=!1,setTimeout(()=>{unlock=!0},400)}function validation(e){const o=e.querySelector(".input-name"),t=e.querySelector(".name-error"),n=e.querySelector(".input-tel"),l=e.querySelector(".tel-error");let c,r=!0,s=n.value.slice(0,4);if(n.value.includes("+")){let e=n.value.split("");console.log(e);for(let o=1;o<e.length;o++){r="+"!==e[o]}r&&(c=n.value.replace("+",""))}return 0==n.value.length?(l.innerHTML="\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430",r=!1):("+380"!==s||n.value.length<13||n.value.length>13||isNaN(c))&&(l.innerHTML="\u041d\u0435 \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0439 \u043d\u043e\u043c\u0435\u0440 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430",r=!1),o.value.length<3&&(t.innerHTML="\u0421\u043b\u0438\u0448\u043a\u043e\u043c \u043a\u043e\u0440\u043e\u0442\u043a\u043e\u0435 \u0438\u043c\u044f",r=!1),o.oninput=()=>{t.innerHTML=""},n.oninput=()=>{l.innerHTML=""},r}function clearInputs(e){const o=e.querySelectorAll("input");for(let e=0;e<o.length;e++){o[e].value=""}const t=e.querySelectorAll(".error");for(let e=0;e<t.length;e++){t[e].innerHTML=""}}document.addEventListener("keydown",e=>{if(27===e.which){popupClose(document.querySelector(".popup.open"))}});let formSend=async function(e){body.classList.add("sending");const o=e.querySelector(".input-name"),t=e.querySelector(".input-tel"),n=e.querySelector(".input-details");let l;if(l=n?fetch("https://mails-nasadyk.herokuapp.com/mails/send",{"method":"POST","body":JSON.stringify({"name":o.value,"tel":t.value,"email":"arinaroman348@gmail.com","detail":n.value}),"headers":{"Content-type":"application/json; charset=UTF-8","Access-Control-Allow-Origin":"*"}}):fetch("https://mails-nasadyk.herokuapp.com/mails/send",{"method":"POST","body":JSON.stringify({"name":o.value,"tel":t.value,"email":"arinaroman348@gmail.com"}),"headers":{"Content-type":"application/json; charset=UTF-8","Access-Control-Allow-Origin":"*"}}),(await l).ok){body.classList.remove("sending"),document.querySelector(".popup_2").classList.add("open")}else{body.classList.remove("sending"),document.querySelector(".popup_3").classList.add("open")}clearInputs(e)};