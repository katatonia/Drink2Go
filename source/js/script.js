/* Menu */

const mobileMenu = () => {
  let navMain = document.querySelector('.main-nav');
  let navToggle = document.querySelector('.main-nav__toggle');

  navMain.classList.remove('main-nav--nojs');

  navToggle.addEventListener('click', function() {
    if (navMain.classList.contains('main-nav--closed')) {
      navMain.classList.remove('main-nav--closed');
      navMain.classList.add('main-nav--opened');
    } else {
      navMain.classList.add('main-nav--closed');
      navMain.classList.remove('main-nav--opened');
    }
  });
};

mobileMenu();

/* Slider */

const swiper = new Swiper('.swiper', {
  loop: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});

/* Map */

const position = [59.968266, 30.3174089];
const map = L.map('map').setView(position, 17);
L.tileLayer('https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=HMfyPUotkQhoWYIXN1mz',{
  crossOrigin: true
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/svg/map-pin.svg',
  iconSize: [39, 50],
  iconAnchor: [18, 50],
});

const mainPin = L.marker(
  {
    lat: position[0],
    lng: position[1],
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPin.addTo(map);

/* Filter */

// Reset filter
const minInput = document.querySelector('.filter__price-controls-input--min');
const maxInput = document.querySelector('.filter__price-controls-input--max');
const minToggle = document.querySelector('.filter__range-toggle-min');
const maxToggle = document.querySelector('.filter__range-toggle-max');
const rangeBar = document.querySelector('.filter__range-bar');
const resetBtn = document.querySelector('.filter__btn--reset');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const radioBtns = document.querySelectorAll('input[type="radio"]');
const rangeToggle = document.querySelectorAll('.filter__range-toggles input');
const priceInput = document.querySelectorAll('.filter__price-controls input');
let priceGap = 50;

const resetFilters = () => {
  resetBtn.addEventListener('click', () => {
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkbox.checked = false;
      }
    })

    radioBtns.forEach((radioBtn) => {
      if (radioBtn.checked) {
        radioBtn.checked = false;
      }
    })

    minInput.value = '0';
    maxInput.value = '900';
    minToggle.value = '0';
    maxToggle.value = '900';
    rangeBar.style.left = '0';
    rangeBar.style.right = '0';
  });
}

// Price range
  rangeToggle.forEach(input => {
    input.addEventListener('input', e => {
      let minValue = parseInt(rangeToggle[0].value);
      let maxValue = parseInt(rangeToggle[1].value);

      if (maxValue - minValue < priceGap) {
        if (e.target.className === 'filter__range-toggle-min') {
          rangeToggle[0].value = maxValue - priceGap;
        } else {
          rangeToggle[1].value = minValue + priceGap;
        }
      } else {
        priceInput[0].value = minValue;
        priceInput[1].value = maxValue;
        rangeBar.style.left = (minValue / rangeToggle[0].max) * 100 + '%';
        rangeBar.style.right = 100 - (maxValue / rangeToggle[1].max) * 100 + '%';
      }
    })
  });

const changePriceInput = () => {
  if (maxToggle.value - minToggle.value < priceGap) {
    if (e.target.className === 'filter__range-toggle-min') {
      minToggle.value = maxToggle.value - priceGap;
    } else {
      maxToggle.value = minToggle.value + priceGap;
    }
  } else {
    minInput.value = minToggle.value;
    maxInput.value = maxToggle.value;
    rangeBar.style.left = (minToggle.value / minToggle.max) * 100 + '%';
    rangeBar.style.right = 100 - (maxToggle / maxToggle.max) * 100 + '%';
  }
}

const onInputValueChange = () => {
  function movePriceRange() {
    if (minInput.value < maxInput.value) {
      minToggle.value = minInput.value;
      maxToggle.value = maxInput.value;
      rangeBar.style.left = (minToggle.value / minToggle.max) * 100 + '%';
      rangeBar.style.right = 100 - (maxToggle.value / maxToggle.max) * 100 + '%';
    }
  }

  function checkEmptyInput() {
    if (minInput.value.length === 0) {
      minToggle.value = 0;
      rangeBar.style.left = 0;
    }

    if (maxInput.value.length === 0 || maxInput.value.length < 3) {
      maxToggle.value = 900;
      rangeBar.style.right = 0;
    }
  }

  minInput.addEventListener('input', movePriceRange);
  maxInput.addEventListener('input', movePriceRange);
  minInput.addEventListener('input', checkEmptyInput);
  maxInput.addEventListener('input', checkEmptyInput);
}

changePriceInput();
resetFilters();
onInputValueChange();

/* Local Storage */

const form = document.querySelector('form');
const checkboxArrow = form.querySelectorAll('input[type="checkbox"]');
const radioArrow = form.querySelectorAll('input[type="radio"]');

const createArrowFromNodeList = (arr) => {
  const elementsArr = [];

  arr.forEach((node) => {
    elementsArr.push(node);
  });

  return elementsArr;
};

const checkedItems = (arr) => {
  let checkedArr = [];

  arr.forEach((e) => {
    if (e.checked) {
      checkedArr.push(e.value);
    }
  });

  console.log(checkedArr)
  return checkedArr;
};

form.addEventListener('submit', () => {
  localStorage.setItem('Минимальная цена', minInput.value);
  localStorage.setItem('Максимальная цена', maxInput.value);
  localStorage.setItem('Наличие молока', checkedItems(createArrowFromNodeList(radioArrow)));
  localStorage.setItem('Страна произростания', checkedItems(createArrowFromNodeList(checkboxArrow)));
});
