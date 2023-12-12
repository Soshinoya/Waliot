let visibleSection = null

const paletteColorsBrandQ = gsap.utils.selector('#palette')
const paletteColorsCatQ = gsap.utils.selector('#palette-cat')
const paletteColorsDogQ = gsap.utils.selector('#palette-dog')

const getPaletteColorsFromToConfig = id => {
    switch (id) {
        case '#palette':
            return {
                target: paletteColorsBrandQ('.palette__colors-item'), to: {
                    x: 0,
                    stagger: 0.1,
                    duration: .5
                }
            }
        case '#palette-cat':
            return {
                target: paletteColorsCatQ('.palette__colors-item'), to: {
                    x: 0,
                    stagger: 0.1,
                    duration: .5
                }
            }
        case '#palette-dog':
            return {
                target: paletteColorsDogQ('.palette__colors-item'), to: {
                    x: 0,
                    stagger: 0.1,
                    duration: .5
                }
            }

        default:
            break;
    }
}

const autoScroll = (event, sections) => {
    // const scrollToNextSection = () => {
    //     const currentSection = document.querySelector('.palette__current-section')

    //     if (!currentSection) {
    //         gsap.to(window, {
    //             scrollTo: '#palette'
    //         })
    //         visibleSection.classList.add('palette__current-section')
    //         return
    //     }

    //     const nextElem = currentSection.nextElementSibling

    //     if (nextElem) {
    //         gsap.to(window, {
    //             scrollTo: 1340 + 660 + $(nextElem).offset().top,
    //         })
    //         currentSection.classList.remove('palette__current-section')
    //         nextElem.classList.add('palette__current-section')
    //     }
    // }

    // const scrollToPrevSection = () => {
    //     const currentSection = document.querySelector('.palette__current-section')

    //     const prevElem = currentSection?.previousElementSibling

    //     if (prevElem) {
    //         gsap.to(window, {
    //             scrollTo: $(prevElem).offset().top + -1340 + -660,
    //         })
    //         prevElem.id === 'palette' ? prevElem.classList.remove('palette__current-section') : prevElem.classList.add('palette__current-section')
    //         currentSection.classList.remove('palette__current-section')
    //     }
    // }

    visibleSection = isVisible(sections)

    const delta = Math.sign(event.deltaY)

    const paletteOffsetTop = Math.floor($('.palette__holder').offset().top)
    const paletteCatOffsetTop = Math.floor(paletteOffsetTop + 1340 + 660)
    const paletteDogOffsetTop = Math.floor(paletteOffsetTop + 660 + 2680 + 660)

    if (visibleSection) {
        if (delta > 0) {
            if (window.scrollY < paletteOffsetTop - 100) {
                // event.preventDefault()
                gsap.to(window, {
                    scrollTo: '#palette'
                })
                const { target, to } = getPaletteColorsFromToConfig('#palette')
                gsap.to(target, to)
            } else if (window.scrollY >= paletteOffsetTop && window.scrollY < paletteCatOffsetTop - 100) {
                // event.preventDefault()
                gsap.to(window, {
                    scrollTo: paletteCatOffsetTop
                })
                const { target, to } = getPaletteColorsFromToConfig('#palette-cat')
                gsap.to(target, to)
            } else if (window.scrollY >= paletteCatOffsetTop && window.scrollY < paletteDogOffsetTop - 100) {
                // event.preventDefault()
                gsap.to(window, {
                    scrollTo: paletteDogOffsetTop
                })
                const { target, to } = getPaletteColorsFromToConfig('#palette-dog')
                gsap.to(target, to)
            }
        } else if (delta < 0) {
            if (window.scrollY > paletteDogOffsetTop) {
                // event.preventDefault()
                gsap.to(window, {
                    scrollTo: Math.floor($('#palette-dog').offset().top)
                })
                const { target, to } = getPaletteColorsFromToConfig('#palette-dog')
                gsap.to(target, to)
            } else if (window.scrollY > paletteCatOffsetTop && window.scrollY <= paletteDogOffsetTop) {
                // event.preventDefault()
                gsap.to(window, {
                    scrollTo: paletteCatOffsetTop
                })
                const { target, to } = getPaletteColorsFromToConfig('#palette-cat')
                gsap.to(target, to)
                gsap.to(paletteColorsDogQ('.palette__colors-item'), { x: '100vw', duration: 1 })
            } else if (window.scrollY > paletteOffsetTop + 150) {
                // event.preventDefault()
                gsap.to(window, {
                    scrollTo: paletteOffsetTop
                })
                gsap.to(paletteColorsCatQ('.palette__colors-item'), { x: '100vw', duration: 1 })
                const { target, to } = getPaletteColorsFromToConfig('#palette')
                gsap.to(target, to)
            } else if (window.scrollY < (paletteOffsetTop - window.innerHeight / 2)) {
                gsap.to(paletteColorsBrandQ('.palette__colors-item'), { x: '100vw', duration: 1 })
            }
        }
    }
}