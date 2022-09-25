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
}




// Popup

const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
        const popupLink = popupLinks[i];
        popupLink.addEventListener("click", (e) => {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            if (curentPopup.classList.contains('popup-form')) {
                clearInputs();
            }
            e.preventDefault();
        });
    }
}
const popupCloseIcon = document.querySelectorAll(".close-popup");
const waitBtn = document.querySelector(".wait-btn");

if (popupCloseIcon.length > 0) {
    for (let i = 0; i < popupCloseIcon.length; i++) {
        const element = popupCloseIcon[i];
        element.addEventListener("click", (e) => {
            
            isRequestBtn(element, waitBtn);
            e.preventDefault();
        });
    }
}
function isRequestBtn(element, button) {
    if (element != button) {
        popupClose(element.closest(".popup"));
    } else {
        const validated = validation();
        if (validated) {
            formSend();
            popupClose(element.closest(".popup"));
        } 
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
    const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
    if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
            const element = lockPadding[i];
            element.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(() => {
        unlock = true;
    }, timeout);
}
function bodyUnLock() {
    setTimeout(() => {
        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const element = lockPadding[i];
                element.style.paddingRight = '0px';
            }
        }
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
const inputName = document.querySelector(".input-name")
const nameError = document.querySelector(".name-error")
const inputTel = document.querySelector(".input-tel")
const telError = document.querySelector(".tel-error")
function validation() {
    let isValid = true;
    if (inputName.value.length < 3) {
        nameError.innerHTML = "Слишком короткое имя";
        isValid = false;
        console.log("name");
    } 
    let countryCode = inputTel.value.slice(0, 4);
    if (countryCode !== "+380") {
        telError.innerHTML = "Начни с +380";
        isValid = false;
        console.log("tel");
    } 

    inputName.oninput = () => {
    nameError.innerHTML = "";
    }
    inputTel.oninput = () => {
    telError.innerHTML = "";
    } 
    return isValid;
}
function clearInputs() {
    const inputs = document.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        input.value = '';
    }
    const errors = document.querySelectorAll('.error');
    for (let i = 0; i < errors.length; i++) {
        let error = errors[i];
        error.innerHTML = '';
    }
}

// fetch 
// const fetchRequest = async () => {
//     const request = fetch("https://mails-nasadyk.herokuapp.com/mails/send", {
//         method: "POST",
//         body: JSON.stringify({
//             name: inputName.value,
// 		    tel: inputTel.value,
// 		    email: 'ira.zat1997@gmail.com',
//         }),
//         headers: {
//             "Content-type": "application/json; charset=UTF-8",
//             "Access-Control-Allow-Origin": "*",
//         }
//     });
    // const response = await request.json();
    // console.log(response);
// }
// fetchRequest();



    const form = document.getElementById('form');
    
    // form.addEventListener('submit', formSend);
    
    let formSend = async function() {
        document.querySelector('.popup__body_content').classList.add('sending');
        const response = fetch("https://mails-nasadyk.herokuapp.com/mails/send", {
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
        let result = await response;
        if (result.ok) {
            document.querySelector('.popup__body_content').classList.remove('sending');
            let popup2 = document.querySelector('.popup_2');
            popup2.classList.add('open');
        } else {
            document.querySelector('.popup__body_content').classList.remove('sending');
            let popup3 = document.querySelector('.popup_3');
            popup3.classList.add('open');
        }
    }

