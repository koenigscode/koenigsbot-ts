import { Context } from 'telegraf'

export default {
    window: 60 * 60 * 1000,
    limit: 300,
    onLimitExceeded: (ctx: Context): void => { ctx.reply('You\'re sending too many requests.') }
}
