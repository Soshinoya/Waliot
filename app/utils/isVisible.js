const isVisible = (elements) => {
    let maxVisibleElement = null
    let maxIntersectionRatio = 0

    elements.forEach((element) => {
        const boundingBox = element.getBoundingClientRect()
        const intersectionRatio = getIntersectionRatio(boundingBox)

        if (intersectionRatio > maxIntersectionRatio) {
            maxIntersectionRatio = intersectionRatio
            maxVisibleElement = element
        }
    })

    return maxVisibleElement
}

const getIntersectionRatio = (boundingBox) => {
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth

    const verticalVisible = Math.min(boundingBox.bottom, windowHeight) - Math.max(boundingBox.top, 0)
    const horizontalVisible = Math.min(boundingBox.right, windowWidth) - Math.max(boundingBox.left, 0)

    if (verticalVisible <= 0 || horizontalVisible <= 0) {
        return 0
    }

    const visibleArea = verticalVisible * horizontalVisible
    const totalArea = boundingBox.width * boundingBox.height

    return visibleArea / totalArea
}