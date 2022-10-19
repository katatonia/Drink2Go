// Menu
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

// Slider
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

// Карта

const position = [59.968266, 30.3174089];
const map = L.map('map').setView(position, 17);
L.tileLayer('https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=HMfyPUotkQhoWYIXN1mz',{
  crossOrigin: true
}).addTo(map);

const marker = L.marker(position, 1).addTo(map);
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
