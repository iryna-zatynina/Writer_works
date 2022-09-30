"use strict"
// Burger menu

const iconBurger = document.querySelector(".burger-icon");
const headerBlock = document.querySelector(".header__block");
const iconClose = document.querySelector(".close-icon");
if (iconBurger) {
    iconBurger.addEventListener("click", (e) => {
        headerBlock.classList.add("burger-active")
    })
}
if (iconClose) {
    iconClose.addEventListener("click", (e) => {
        headerBlock.classList.remove("burger-active")
    })
    const menuLinks = document.querySelectorAll('.menu-link');
    console.log(menuLinks);
    if (menuLinks.length > 0) {
        menuLinks.forEach(menuLink => {
            menuLink.addEventListener("click", () => {
                if (headerBlock.classList.contains("burger-active")) {
                    headerBlock.classList.remove("burger-active");
                }
            })
        })
    }
}






// Popup

const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body");


let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
        const popupLink = popupLinks[i];
        console.log(popupLink);
        popupLink.addEventListener("click", (e) => {
            const curentPopup = document.getElementById("popup");
            popupOpen(curentPopup);
            
            e.preventDefault();
        });
    }
}
const popupCloseIcon = document.querySelectorAll(".close-popup");
const forms = document.querySelectorAll("form");

if (forms.length > 0) {
    for (let i = 0; i < forms.length; i++) {
        const form = forms[i];
        const waitBtn = form.querySelector(".wait-btn");
        
        waitBtn.addEventListener("click", (e) => {
            
            const validated = validation(form);
            if (validated) {
                formSend(form);
                clearInputs(form);
                if (waitBtn.classList.contains("form-wait-btn")) {
                    popupClose(waitBtn.closest(".popup"));
                    clearInputs(form);
                }
            } 
            e.preventDefault();
        });
        document.addEventListener("click", (e) => {
            if (e.target !== waitBtn) {
                clearInputs(form);
            }
        })
    }
}
if (popupCloseIcon.length > 0) {
    for (let i = 0; i < popupCloseIcon.length; i++) {
        const element = popupCloseIcon[i];
        if (!element.classList.contains("form-wait-btn")) {
            element.addEventListener("click", (e) => {
                popupClose(element.closest(".popup"));
                e.preventDefault();
            })
        };
    }
}


function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
    
        const popupActive = document.querySelector(".popup.open");
        if (popupActive) {
            popupClose(popupActive, false);
        } else  {
            bodyLock();
        }
        curentPopup.classList.add('open');

        curentPopup.addEventListener("click", (e) => {
            if (!e.target.closest('.popup__body_content'))  {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}


function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wraper').offsetWidth + 'px';
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(() => {
        unlock = true;
    }, timeout);
}
function bodyUnLock() {
    setTimeout(() => {
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(() => {
        unlock = true;
    }, timeout);
}
document.addEventListener('keydown', (e) => {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive)
    }
})

// Validation

function validation(form) {
    const inputName = form.querySelector(".input-name")
    const nameError = form.querySelector(".name-error")
    const inputTel = form.querySelector(".input-tel")
    const telError = form.querySelector(".tel-error")
    let isValid = true;
    if (inputName.value.length < 3) {
        nameError.innerHTML = "Слишком короткое имя";
        isValid = false;
    } 
    let countryCode = inputTel.value.slice(0, 4);
    if (countryCode !== "+380") {
        telError.innerHTML = "Начни с +380";
        isValid = false;
    } 

    inputName.oninput = () => {
    nameError.innerHTML = "";
    }
    inputTel.oninput = () => {
    telError.innerHTML = "";
    } 
    return isValid;
}
function clearInputs(form) {
    const inputs = form.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        input.value = '';
    }
    const errors = form.querySelectorAll('.error');
    for (let i = 0; i < errors.length; i++) {
        let error = errors[i];
        error.innerHTML = '';
    }
}

// fetch 

let formSend = async function(form) {
    body.classList.add('sending');
    const inputName = form.querySelector(".input-name")
    const inputTel = form.querySelector(".input-tel")
    const inputDetail = form.querySelector(".input-details")
    let response;
    if (inputDetail) {
        response = fetch("https://mails-nasadyk.herokuapp.com/mails/send", {
            method: "POST",
            body: JSON.stringify({
                name: inputName.value,
                tel: inputTel.value,
                email: 'arinaroman348@gmail.com',
                detail: inputDetail.value,
                
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
            }
        });
    } else {
        response = fetch("https://mails-nasadyk.herokuapp.com/mails/send", {
            method: "POST",
            body: JSON.stringify({
                name: inputName.value,
                tel: inputTel.value,
                email: 'arinaroman348@gmail.com',
                
                
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
            }
        });
    }
    let result = await response;
    if (result.ok) {
        body.classList.remove('sending');
        let popup2 = document.querySelector('.popup_2');
        popup2.classList.add('open');
        console.log("yes");
    } else {
        body.classList.remove('sending');
        let popup3 = document.querySelector('.popup_3');
        popup3.classList.add('open');
        console.log("no");
    }
    clearInputs(form);
}

