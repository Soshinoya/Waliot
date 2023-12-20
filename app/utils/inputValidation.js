const inputValidation = inputEl => {
    const trimmedValue = inputEl?.value?.trim()

    if (!trimmedValue) return false

    const reg = new RegExp('@')

    switch (inputEl?.name) {
        case 'name':
            return trimmedValue.length <= 30 && !(!isNaN(parseFloat(trimmedValue)) && isFinite(trimmedValue))
        case 'tel':
            return trimmedValue.startsWith('+7') &&
                trimmedValue.split('').map(item => !!(+item) ? item : item === '0' ? item : NaN).filter(item => !Number.isNaN(item)).length === 11
        case 'email':
            return trimmedValue.length <= 30 && !!reg.test(trimmedValue)
        default:
            return true
    }
} 