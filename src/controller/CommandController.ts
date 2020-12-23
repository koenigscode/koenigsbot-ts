import axios from 'axios'
import { Context } from 'telegraf'
import { Command, TFController, TFContext } from 'ts-telegraf-decorators'
import MyContext from '../config/MyContext'
import Help from '../decorators/Help'
import { waitMenu, waitMenuMiddleware } from '../middleware/menu/WaitMenu'
import { getContent, getValidUrl } from '../util'

@TFController()
export default class {

    @Command('mock')
    @Help('mock', 'tRaNsFoRm ThE tExT tO mOcKiNg CaPiTaLs')
    mock(@TFContext() ctx: Context): void {
        let res = ''
        let isUpper = false

        for (const c of getContent(ctx.message.text)) {
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
        const [question, ...options] = msg.split('\n')
        try {
            await ctx.replyWithPoll(question, options, { is_anonymous: false })
        } catch (err) {
            throw new Error('Poll must have at least 2 options')
        }
        ctx.deleteMessage()
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

    @Command('wait')
    @Help('wait', 'Creates a poll, asking who is waiting')
    wait(@TFContext() ctx: MyContext): void {
        waitMenuMiddleware.replyToContext(ctx)
    }

}