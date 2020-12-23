import * as dotenv from 'dotenv'
import Telegraf from 'telegraf'
import { TelegrafContext } from 'telegraf/typings/context'
import * as rateLimit from 'telegraf-ratelimit'
import { buildBot } from 'ts-telegraf-decorators'
import limitConfig from './config/LimitConfig'
import { commands } from './decorators/Help'

dotenv.config()

const bot: Telegraf<TelegrafContext> = buildBot({
    token: process.env.BOT_TOKEN,
    controllers: [__dirname + '/controller/**.ts'],
})

bot.use(rateLimit(limitConfig))

bot.catch((err, ctx) => {
    console.log(err)
    ctx.reply(err.message)
})

bot.launch().then(() => {
    console.table(commands)
    bot.telegram.setMyCommands(commands)
})
