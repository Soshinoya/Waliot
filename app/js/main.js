window.onload = () => {
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

    // 'Client' Slider
    const clientSliderConfig = new Swiper('.client__slider > .swiper', {
        spaceBetween: 16,
        slidesPerView: 'auto',
        navigation: {
            nextEl: '.client__slider-button--next',
            prevEl: '.client__slider-button--prev'
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

    // Выход слайдера 'Client' за пределы контейнера
    const clientContainer = document.querySelector('.client > .container')
    const clientSliderElem = document.querySelector('.client__slider')

    const setClientSliderOffset = () => clientSliderElem.style.marginRight = `-${clientContainer.getBoundingClientRect().left + 76}px`

    window.addEventListener('resize', setClientSliderOffset)
    setClientSliderOffset()

    // Calculator
    const resultPriceEl = document.querySelector('.calculator-output__title')
    const paybackEl = document.querySelector('.calculator-output__payback b')

    let resultPrice = 242850;

    let vehicleType = 'cargo';
    let fuelType = 'diesel';

    let carsCount = 10;
    let kilometrageAverage;
    let fuelConsumptionAverage;
    let fuelPrice;

    let carsCountSlider;
    let kilometrageAverageSlider;
    let fuelConsumptionAverageSlider;
    let fuelPriceSlider;

    const economy = 0.17
    const motorHours = 120 * 4

    const calculatorResultPriceFormatter = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0
    })

    const calculatorDaysFormatter = days => {
        const pluralRules = new Intl.PluralRules('ru', { type: 'ordinal' })
        const pluralForm = pluralRules.select(days)
        switch (pluralForm) {
            case 'one':
                return `${days} день`
            case 'few':
            case 'many':
                return `${days} дней`
            default:
                return `${days} дней`
        }
    }

    const calculate = () => {
        let mileageSavingsPerMonth;
        let litresSavingsPerMonth;
        let payback;

        // Экономия за год
        mileageSavingsPerMonth = (kilometrageAverage * economy * carsCount).toFixed(0)
        litresSavingsPerMonth = (fuelConsumptionAverage * mileageSavingsPerMonth / 100 + (vehicleType === 'special-equipment' ? motorHours : 0)).toFixed(0)
        resultPrice = (fuelPrice * litresSavingsPerMonth * 12).toFixed(0)

        // Окупаемость
        if (vehicleType === 'passenger') {
            payback = (12500 * carsCount / resultPrice * 30).toFixed(0)
        } else if (vehicleType === 'cargo' || vehicleType === 'special-equipment') {
            payback = (24500 * carsCount / resultPrice * 30).toFixed(0)
        }

        $(resultPriceEl).text(`${calculatorResultPriceFormatter.format(resultPrice)}`)
        $(paybackEl).text(`${calculatorDaysFormatter(payback)}`)
    }

    // Функция, устанавливающая значение для переменных в зависимости от vehicleType и fuelType
    const setValueToVariables = () => {
        switch (vehicleType) {
            case 'cargo':
                fuelConsumptionAverage = 34
                break;
            case 'passenger':
                fuelConsumptionAverage = 11
                break;
            case 'special-equipment':
                fuelConsumptionAverage = 46
                break;
            default:
                break;
        }

        switch (fuelType) {
            case 'diesel':
                fuelPrice = 61
                break;
            case 'gasoline':
                fuelPrice = 52
                break;
            default:
                break;
        }

        switch (vehicleType) {
            case 'cargo':
                kilometrageAverage = 3000
                break;
            case 'passenger':
                kilometrageAverage = 1500
                break;
            case 'special-equipment':
                kilometrageAverage = 500
                break;
            default:
                break;
        }
    }

    setValueToVariables()
    calculate()

    // Функция, устанавливающая значения по умолчанию для range sliders
    const setDefaultValueToRangeSliders = () => {
        if (carsCountSlider && kilometrageAverageSlider && fuelConsumptionAverageSlider && fuelPriceSlider) {
            carsCountSlider.update({
                from: carsCount
            })
            $('#calculator-config-cars-count-value').text(carsCount)

            kilometrageAverageSlider.update({
                from: kilometrageAverage
            })
            $('#calculator-config-kilometrage-value').text(kilometrageAverage)

            fuelConsumptionAverageSlider.update({
                from: fuelConsumptionAverage
            })
            $('#calculator-config-fuel-consumption-value').text(fuelConsumptionAverage)

            fuelPriceSlider.update({
                from: fuelPrice
            })
            $('#calculator-config-fuel-price-value').text(fuelPrice)
        } else {
            $('#calculator-config-cars-count').ionRangeSlider({
                min: 1,
                max: 100,
                from: carsCount,
                onStart: data => $('#calculator-config-cars-count-value').text(data.from),
                onChange(data) {
                    $('#calculator-config-cars-count-value').text(data.from)
                    carsCount = data.from
                    calculate()
                }
            })

            $('#calculator-config-kilometrage').ionRangeSlider({
                step: 100,
                min: 1000,
                max: 30000,
                from: kilometrageAverage,
                onStart: data => $('#calculator-config-kilometrage-value').text(data.from),
                onChange(data) {
                    $('#calculator-config-kilometrage-value').text(data.from)
                    kilometrageAverage = data.from
                    calculate()
                }
            })

            $('#calculator-config-fuel-consumption').ionRangeSlider({
                min: 1,
                max: 90,
                from: fuelConsumptionAverage,
                onStart: data => $('#calculator-config-fuel-consumption-value').text(data.from),
                onChange(data) {
                    $('#calculator-config-fuel-consumption-value').text(data.from)
                    fuelConsumptionAverage = data.from
                    calculate()
                }
            })

            $('#calculator-config-fuel-price').ionRangeSlider({
                min: 1,
                max: 120,
                from: fuelPrice,
                onStart: data => $('#calculator-config-fuel-price-value').text(data.from),
                onChange(data) {
                    $('#calculator-config-fuel-price-value').text(data.from)
                    fuelPrice = data.from
                    calculate()
                }
            })

            carsCountSlider = $('#calculator-config-cars-count').data('ionRangeSlider')
            kilometrageAverageSlider = $('#calculator-config-kilometrage').data('ionRangeSlider')
            fuelConsumptionAverageSlider = $('#calculator-config-fuel-consumption').data('ionRangeSlider')
            fuelPriceSlider = $('#calculator-config-fuel-price').data('ionRangeSlider')
        }
    }

    setDefaultValueToRangeSliders()

    // Calculator select
    $('#calculator-config-select-vehicle-type').select2({
        templateSelection: data => $('<div class="calculator-config__field-select__label"><p class="calculator-config__field-select__text">' + data.text + '</p><div class="calculator-config__field-select__arrow"><svg><use xlink:href="./images/sprite.svg#angle"></use></svg></div></div>'),
        selectionCssClass: 'calculator-config__field-select__selection',
        dropdownCssClass: 'calculator-config__field-select__dropdown',
        minimumResultsForSearch: -1
    })
    $('#calculator-config-select-fuel-type').select2({
        templateSelection: data => $('<div class="calculator-config__field-select__label"><p class="calculator-config__field-select__text">' + data.text + '</p><div class="calculator-config__field-select__arrow"><svg><use xlink:href="./images/sprite.svg#angle"></use></svg></div></div>'),
        selectionCssClass: 'calculator-config__field-select__selection',
        dropdownCssClass: 'calculator-config__field-select__dropdown',
        minimumResultsForSearch: -1
    })

    // Устанавливаем значения по умолчанию для селектов
    $('#calculator-config-select-vehicle-type').val(vehicleType)
    $('#calculator-config-select-fuel-type').val(fuelType)

    // При изменении селекта, меняем значение переменной, устанавливаем значения по умолчанию и вычисляем стоимость
    $('#calculator-config-select-vehicle-type').on('change', e => {
        vehicleType = e.target.value
        setValueToVariables()
        setDefaultValueToRangeSliders()
        calculate()
    })
    $('#calculator-config-select-fuel-type').on('change', e => {
        fuelType = e.target.value
        setValueToVariables()
        setDefaultValueToRangeSliders()
        calculate()
    })

    // Quiz, price

    const quizContainer = document.querySelector('.quiz__holder .row')

    const firstQuizTemplateNode = document.getElementById('quiz-first')
    const secondQuizTemplateNode = document.getElementById('quiz-second')
    const thirdQuizTemplateNode = document.getElementById('quiz-third')
    const fourthQuizTemplateNode = document.getElementById('quiz-fourth')
    const quizFormTemplateNode = document.getElementById('quiz-form')

    const answers = {}

    let currentQuestion = 1

    const importNextQuiz = () => {
        let template;

        switch (currentQuestion) {
            case 1:
                template = document.importNode(firstQuizTemplateNode.content, true)
                break;
            case 2:
                template = document.importNode(secondQuizTemplateNode.content, true)
                break;
            case 3:
                template = document.importNode(thirdQuizTemplateNode.content, true)
                break;
            case 4:
                template = document.importNode(fourthQuizTemplateNode.content, true)
                break;
            case 5:
                template = document.importNode(quizFormTemplateNode.content, true)
                break;
            default:
                template = document.importNode(firstQuizTemplateNode.content, true)
                break;
        }

        quizContainer.prepend(template.querySelector('.quiz__inner'))
    }

    importNextQuiz()

    const quizClickHandler = e => {
        if (currentQuestion < 5) {
            const answer = e.target.closest('.quiz__inner').querySelector('.line-button--active')?.getAttribute('data-option')
            if (!answer) return

            answers[currentQuestion] = answer
            quizContainer.querySelector('.quiz__inner').remove()
            ++currentQuestion
            importNextQuiz()
            return
        }

        const formData = new FormData(quizContainer.querySelector('form'))
        console.log('Имя:', formData.get('quiz-form-name'))
        console.log('Телефон:', formData.get('quiz-form-tel'))
        console.log('E-mail:', formData.get('quiz-form-email'))
        console.log(answers)
    }

    quizContainer.addEventListener('click', e => {
        e.preventDefault()
        const mainButton = e.target.closest('.main-button')
        const lineButton = e.target.closest('.line-button')
        if (mainButton) {
            quizClickHandler(e)
        } else if (lineButton) {
            quizContainer.querySelectorAll('.line-button').forEach(btn => btn.classList.remove('line-button--active'))
            lineButton.classList.add('line-button--active')
        }
    })

    // Offer form
    const offerForm = document.querySelector('.offer-form')

    offerForm.addEventListener('submit', e => {
        e.preventDefault()
        const formData = new FormData(offerForm)
        console.log('Имя:', formData.get('offer-form-name'))
        console.log('Телефон:', formData.get('offer-form-tel'))
        console.log('E-mail:', formData.get('offer-form-email'))
    })

    // Scroll to top
    const scrollToTopBtn = document.querySelector('.footer-top__up')
    scrollToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: "smooth", }))

    // Adaptive
    const checkDocumentWidth = () => {
        if (window.matchMedia('(max-width: 1200px)').matches) {
            // Feature slider
            const featureSliderContainer = document.querySelector('.feature__slider .swiper-wrapper')
            const featureSliderSlides = document.querySelectorAll('.feature__slider .col-lg-3')
            const featureTemplate = document.getElementById('feature-slider-slide-template')

            featureSliderSlides.forEach(slide => {
                const cloneSlides = []
                slide.querySelectorAll('.feature-item').forEach(el => cloneSlides.push(el.cloneNode(true)))
                slide.remove()

                const slides = []

                cloneSlides.forEach(cloneSlide => {
                    const swiperSlide = document.importNode(featureTemplate.content, true).querySelector('.swiper-slide')
                    swiperSlide.insertAdjacentHTML('afterBegin', cloneSlide.outerHTML)
                    slides.push(swiperSlide)
                })

                slides.forEach(el => featureSliderContainer.append(el))
            })

            new Swiper('.feature__slider > .swiper', {
                spaceBetween: 16,
                // slidesPerView: 1,
                // slidesPerGroup: 1,
                autoplay: { delay: 3000 },
                navigation: {
                    nextEl: '.feature__slider-button--next',
                    prevEl: '.feature__slider-button--prev'
                },
                breakpoints: {
                    // when window width is >= 480px
                    480: {
                        slidesPerView: 'auto',
                    },
                    // when window width is >= 768px
                    768: {
                        slidesPerView: 2,
                        slidesPerGroup: 2
                    }
                }
            })

        }
        
        if (window.matchMedia('(max-width: 991px)').matches) {
            $('.promotion__content-info').after($('.promotion__img'))
        }
        
        if (window.matchMedia('(max-width: 768px)').matches && window.matchMedia('(min-width: 480px)').matches) {
            // Выход слайдера 'Feature' за пределы контейнера
            const featureContainer = document.querySelector('.feature > .container')
            const featureSliderElem = document.querySelector('.feature__slider')
    
            const setFeatureSliderOffset = () => featureSliderElem.style.marginRight = `-${featureContainer.getBoundingClientRect().left + 20}px`

            setFeatureSliderOffset()
        }
    }
    checkDocumentWidth()
    window.onresize = checkDocumentWidth
}