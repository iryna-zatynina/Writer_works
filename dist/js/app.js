// Burger menu
var iconBurger = document.querySelector('.burger-icon');
var headerBlock = document.querySelector('.header__block');
var iconClose = document.querySelector('.close-icon');

if (iconBurger) {
  iconBurger.addEventListener('click', function (e) {
    headerBlock.classList.add('burger-active');
  });
}

if (iconClose) {
  iconClose.addEventListener('click', function (e) {
    headerBlock.classList.remove('burger-active');
  });
} // Popup


var popupLinks = document.querySelectorAll('.popup-link');
var body = document.querySelector('body');
var lockPadding = document.querySelectorAll('.lock-padding');
var unlock = true;
var timeout = 800;

if (popupLinks.length > 0) {
  var _loop = function _loop(i) {
    var popupLink = popupLinks[i];
    popupLink.addEventListener('click', function (e) {
      var popupName = popupLink.getAttribute('href').replace('#', '');
      var curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);

      if (curentPopup.classList.contains('popup-form')) {
        clearInputs();
      }

      e.preventDefault();
    });
  };

  for (var i = 0; i < popupLinks.length; i++) {
    _loop(i);
  }
}

var popupCloseIcon = document.querySelectorAll('.close-popup');
var waitBtn = document.querySelector('.wait-btn');

if (popupCloseIcon.length > 0) {
  var _loop2 = function _loop2(_i) {
    var element = popupCloseIcon[_i];
    element.addEventListener('click', function (e) {
      isRequestBtn(element, waitBtn);
      e.preventDefault();
    });
  };

  for (var _i = 0; _i < popupCloseIcon.length; _i++) {
    _loop2(_i);
  }
}

function isRequestBtn(element, button) {
  if (element != button) {
    popupClose(element.closest('.popup'));
  } else {
    var validated = validation();

    if (validated) {
      popupClose(element.closest('.popup'));
    }
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    var popupActive = document.querySelector('.popup.open');

    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }

    curentPopup.classList.add('open');
    curentPopup.addEventListener('click', function (e) {
      console.log(curentPopup);

      if (!e.target.closest('.popup__body_content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

function popupClose(popupActive) {
  var doUnlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (unlock) {
    popupActive.classList.remove('open');

    if (doUnlock) {
      bodyUnLock();
    }
  }
}

function bodyLock() {
  var lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';

  if (lockPadding.length > 0) {
    for (var _i2 = 0; _i2 < lockPadding.length; _i2++) {
      var element = lockPadding[_i2];
      element.style.paddingRight = lockPaddingValue;
    }
  }

  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (var _i3 = 0; _i3 < lockPadding.length; _i3++) {
        var element = lockPadding[_i3];
        element.style.paddingRight = '0px';
      }
    }

    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    var popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
}); // Validation

var inputName = document.querySelector('.input-name');
var nameError = document.querySelector('.name-error');
var inputTel = document.querySelector('.input-tel');
var telError = document.querySelector('.tel-error');

function validation() {
  var isValid = true;

  if (inputName.value.length < 3) {
    nameError.innerHTML = 'Слишком короткое имя';
    isValid = false;
  }

  var countryCode = inputTel.value.slice(0, 4);

  if (countryCode !== '+380') {
    telError.innerHTML = 'Начни с +380';
    isValid = false;
  }

  inputName.oninput = function () {
    nameError.innerHTML = '';
  };

  inputTel.oninput = function () {
    telError.innerHTML = '';
  };

  return isValid;
}

function clearInputs() {
  var inputs = document.querySelectorAll('input');

  for (var _i4 = 0; _i4 < inputs.length; _i4++) {
    var input = inputs[_i4];
    input.value = '';
  }

  var errors = document.querySelectorAll('.error');

  for (var _i5 = 0; _i5 < errors.length; _i5++) {
    var error = errors[_i5];
    error.innerHTML = '';
  }
}