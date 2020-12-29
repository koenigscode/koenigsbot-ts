import axios from 'axios'
import { Context } from 'telegraf'
import { Command, TFController, TFContext, UseMiddleware } from 'ts-telegraf-decorators'
import MyContext from '../config/MyContext'
import Help from '../decorators/Help'
import { getContent, getValidUrl } from '../util'
import * as fs from 'fs'
import RateLimitMiddleware from '../middleware/RateLimitMiddleware'

@TFController()
@UseMiddleware(RateLimitMiddleware)
// @UseMiddleware(WaitMenuMiddleware)
export default class {

    @Command('mock')
    @Help('mock', 'tRaNsFoRm ThE tExT tO mOcKiNg CaPiTaLs')
    mock(@TFContext() ctx: Context): void {
        let res = ''
        let isUpper = false

        const content = getContent(ctx.message.text)

        if (content === '') {
            ctx.reply('No text to mock provided')
            return
        }

        for (const c of content) {
            res += isUpper ? c.toUpperCase() : c.toLowerCase()
            if (c != ' ' && c != '\n') isUpper = !isUpper
        }
        console.log(`res: ${res}`)
        ctx.reply(res)
    }

    @Command('poll')
    @Help('poll', 'Create a quick poll by seperating question and answers by a new line')
    async poll(@TFContext() ctx: Context): Promise<void> {
        const msg = getContent(ctx.message.text)
        try {
            const [question, ...options] = msg.split('\n')
            await ctx.replyWithPoll(question, options, { is_anonymous: false })
        } catch (err) {
            ctx.reply('Poll must have at least 2 options')
        }
        ctx.deleteMessage().catch(() => { console.log('couldn\'t delete message') })
    }

    @Command('shorten')
    @Help('shorten', 'Shorten the given url')
    async shorten(@TFContext() ctx: Context): Promise<void> {
        const destination = getValidUrl(getContent(ctx.message.text))

        const res = await axios.post(
            'https://api.rebrandly.com/v1/links',
            {
                destination,
                domain: { fullName: 'rebrand.ly' },
            },
            { headers: { apikey: process.env.REBRANDLY_TOKEN } }
        )
        ctx.reply(res.data.shortUrl)
    }

    @Command('cat')
    @Help('cat', 'Send a random cat pic from random.cat')
    cat(@TFContext() ctx: Context): void {
        ctx.replyWithPhoto(`http://random.cat/view/${Date.now() % 1000}`)
    }

    // @Command('wait')
    // @Help('wait', 'Creates a poll, asking who is waiting')
    // wait(@TFContext() ctx: MyContext): void {
    //     waitMenu.replyToContext(ctx)
    // }

    @Command('semmi')
    @Help('semmi', 'Sends a gif of semmi')
    semmi(@TFContext() ctx: Context): void {
        ctx.telegram.sendAnimation(ctx.chat.id, { source: fs.createReadStream('media/semmi.gif') })
    }

}