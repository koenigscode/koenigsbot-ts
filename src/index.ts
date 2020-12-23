import * as dotenv from 'dotenv'
import Telegraf from 'telegraf'
import { MenuTemplate, MenuMiddleware } from 'telegraf-inline-menu'

import * as rateLimit from 'telegraf-ratelimit'
import { buildBot } from 'ts-telegraf-decorators'
import limitConfig from './config/LimitConfig'
import { commands } from './decorators/Help'
import MyContext from './config/MyContext'
import { waitMenuMiddleware } from './middleware/menu/WaitMenu'

dotenv.config()

const bot: Telegraf<MyContext> = buildBot({
    token: process.env.BOT_TOKEN,
    controllers: [__dirname + '/controller/**.ts'],
})

bot.use(rateLimit(limitConfig))

bot.catch((err, ctx) => {
    console.log(err)
    ctx.reply(err.message)
})

bot.use(waitMenuMiddleware)

bot.launch().then(() => {
    console.table(commands)
    bot.telegram.setMyCommands(commands)
})
