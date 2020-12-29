export const getContent = (text: string): string => {
    if (text.indexOf(' ') == -1) // empty message, only command
        return ''
    return text.substr(text.indexOf(' ') + 1).trim()
}

export const getValidUrl = (url: string): string => {
    if (url.indexOf('http://') === -1 && url.indexOf('https://') === -1)
        return `http://${url}`
    return url
}