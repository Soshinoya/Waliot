// Header search
const headerSearch = document.querySelector('.header .search')
const headerSearchWrapper = headerSearch.closest('.header__btns')
const headerMenu = document.querySelector('.header .menu')

document.addEventListener('click', e => {
    const search = e.target.closest('.search')
    if (search?.closest('.header')) {
        if (!search.classList.contains('search--active')) {
            headerSearch.classList.add('search--active')
            headerSearchWrapper.classList.add('header__btns--search')
            headerMenu.classList.add('menu--hidden')
        }
    } else {
        headerSearch.classList.remove('search--active')
        headerSearchWrapper.classList.remove('header__btns--search')
        headerMenu.classList.remove('menu--hidden')
    }
})

// Header modals
const btns = document.querySelectorAll('.popup-link')
const modalOverlay = document.querySelector('.modal-overlay')
const modals = document.querySelectorAll('.modal')

document.addEventListener('click', e => {
    if (!e.target.closest('.modal')) {
        modalOverlay.classList.remove('modal-overlay--visible')
        modals.forEach(el => el.classList.remove('modal--visible'))
        btns.forEach(el => el.classList.remove('popup-link--active'))
    }
})

document.addEventListener('click', e => {
    const popupLink = e.target.closest('.popup-link')
    if (!popupLink) return
    popupLink.classList.add('popup-link--active')
    let path = popupLink.getAttribute('data-path')

    modals.forEach(el => el.classList.remove('modal--visible'))

    document.querySelector(`[data-target="${path}"]`)?.classList?.add('modal--visible')
    modalOverlay.classList.add('modal-overlay--visible')
})

// Header burger menu
const hamb = document.querySelector('.hamb')
const headerModal = document.querySelector('.header-modal')

hamb.addEventListener('click', () => {
    hamb.classList.toggle('hamb--active')
    headerModal.classList.toggle('header-modal--active')
    document.body.classList.toggle('no-scroll')
})

// Accordion nav links in burger menu
const headerModalNav = document.querySelector('.header-modal nav.menu')
const headerModalNavListItem = document.querySelectorAll('.header-modal .menu__list-item')

headerModalNav.addEventListener('click', e => {
    const listItem = e.target.closest('.menu__list-item')
    if (!listItem) return
    headerModalNavListItem.forEach(el => el == listItem ? 0 : el.classList.remove('menu__list-item--active'))
    listItem.classList.contains('menu__list-item--active') ? listItem.classList.remove('menu__list-item--active') : listItem.classList.add('menu__list-item--active')
})

// 'Monitoring' Slider
const monitoringSliderConfig = new Swiper('.monitoring__slider > .swiper', {
    spaceBetween: 16,
    slidesPerView: 'auto',
    navigation: {
        nextEl: '.monitoring__slider-button--next',
        prevEl: '.monitoring__slider-button--prev'
    },
    // breakpoints: {
    //     // when window width is >= 320px
    //     320: {
    //         slidesPerView: 'auto',
    //     },
    //     // when window width is >= 480px
    //     480: {
    //         slidesPerView: 2,
    //     },
    //     // when window width is >= 768px
    //     768: {
    //         slidesPerView: 'auto',
    //     }
    // }
})

// Выход слайдера 'Monitoring' за пределы контейнера
const monitoringContainer = document.querySelector('.monitoring > .container')
const monitoringSliderElem = document.querySelector('.monitoring__slider')

const setMonitoringSliderOffset = () => monitoringSliderElem.style.marginRight = `-${monitoringContainer.getBoundingClientRect().left + 76}px`

window.addEventListener('resize', setMonitoringSliderOffset)
setMonitoringSliderOffset()

// Calculator range slider
$('#calculator-config-cars-count').ionRangeSlider({
    min: 1,
    max: 100,
    // from: 10,
    onStart: function (data) {
        $('#calculator-config-cars-count-value').text(data.from)
    },
    onChange: function (data) {
        $('#calculator-config-cars-count-value').text(data.from)
    },
})

$('#calculator-config-kilometrage').ionRangeSlider({
    step: 100,
    min: 3000,
    max: 30000,
    // from: 3000,
    onStart: function (data) {
        $('#calculator-config-kilometrage-value').text(data.from)
    },
    onChange: function (data) {
        $('#calculator-config-kilometrage-value').text(data.from)
    },
})

$('#calculator-config-fuel-consumption').ionRangeSlider({
    min: 0,
    max: 90,
    // from: 47,
    onStart: function (data) {
        $('#calculator-config-fuel-consumption-value').text(data.from)
    },
    onChange: function (data) {
        $('#calculator-config-fuel-consumption-value').text(data.from)
    },
})

$('#calculator-config-fuel-price').ionRangeSlider({
    min: 0,
    max: 120,
    // from: 45,
    onStart: function (data) {
        $('#calculator-config-fuel-price-value').text(data.from)
    },
    onChange: function (data) {
        $('#calculator-config-fuel-price-value').text(data.from)
    },
})

// Calculator select
$('#calculator-config-select-vehicle-type').select2({
    templateSelection: data => $('<div class="calculator-config__field-select__label"><p class="calculator-config__field-select__text">' + data.text +'</p><div class="calculator-config__field-select__arrow"><svg><use xlink:href="./images/sprite.svg#angle"></use></svg></div></div>'),
    selectionCssClass: 'calculator-config__field-select__selection',
    dropdownCssClass: 'calculator-config__field-select__dropdown',
    minimumResultsForSearch: -1
})

$('#calculator-config-select-fuel-type').select2({
    templateSelection: data => $('<div class="calculator-config__field-select__label"><p class="calculator-config__field-select__text">' + data.text +'</p><div class="calculator-config__field-select__arrow"><svg><use xlink:href="./images/sprite.svg#angle"></use></svg></div></div>'),
    selectionCssClass: 'calculator-config__field-select__selection',
    dropdownCssClass: 'calculator-config__field-select__dropdown',
    minimumResultsForSearch: -1
})