import * as dotenv from 'dotenv'
import Telegraf from 'telegraf'
import * as rateLimit from 'telegraf-ratelimit'
import { cat, mock, poll, shorten } from './lib/commands'

dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('mock', mock)
bot.command('poll', poll)
bot.command('cat', cat)
bot.command('shorten', shorten)

const limitConfig = {
    window: 60 * 60 * 1000,
    limit: 300,
    onLimitExceeded: (ctx, next) => ctx.reply('You\'re sending too many requests.')
}

bot.use(rateLimit(limitConfig))

bot.help(async ctx => {
    const commands = (await ctx.telegram.getMyCommands()).map(command => `/${command.command} - ${command.description}`)

    ctx.reply(commands.join('\n'))
})

bot.catch((err, ctx) => {
    console.log(err)
    ctx.reply(err.message)
})

bot.launch().then(() => {
    console.log('bot launched')
})
