import * as dotenv from 'dotenv'
import Telegraf from 'telegraf'
import { mock, poll } from './lib/commands'

dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN)


bot.command('mock', mock)

bot.command('poll', poll)

bot.catch((err, ctx) => {
    ctx.reply(err.message)
    console.log(err)
})

bot.launch().then(() => {
    console.log('bot launched')
})
