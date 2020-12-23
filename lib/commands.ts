import { Context } from 'telegraf'
import { getContent } from './utils'

export const mock = (ctx: Context) => {
    let res = ''
    let isUpper = false

    for (const c of getContent(ctx.message.text)) {
        res += isUpper ? c.toUpperCase() : c.toLowerCase()
        if (c != ' ' && c != '\n')
            isUpper = !isUpper
    }
    console.log(`res: ${res}`)
    ctx.reply(res)
}

export const poll = async (ctx: Context): Promise<void> => {
    const msg = getContent(ctx.message.text)
    const [question, ...options] = msg.split('\n')
    try {
        await ctx.replyWithPoll(question, options, { is_anonymous: false })
    } catch (err) {
        throw new Error('Poll must have at least 2 options')
    }
    ctx.deleteMessage()
}
