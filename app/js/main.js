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
        document.body.style.overflow = 'auto'
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

    document.body.style.overflow = 'hidden'
})

// Header burger menu
const hamb = document.querySelector('.hamb')
const headerModal = document.querySelector('.header-modal')

hamb.addEventListener('click', () => {
    hamb.classList.toggle('hamb--active')
    headerModal.classList.toggle('header-modal--active')
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