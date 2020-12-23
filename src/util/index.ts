export const getContent = (text: string): string => text.substr(text.indexOf(' ') + 1).trim()

export const getValidUrl = (url: string): string => {
    if (url.indexOf('http://') === -1 && url.indexOf('https://') === -1)
        return `http://${url}`
    return url
}