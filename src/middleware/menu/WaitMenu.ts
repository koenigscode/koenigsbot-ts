import { MenuMiddleware, MenuTemplate } from 'telegraf-inline-menu'
import MyContext from '../../config/MyContext'

export const waitMenu = new MenuTemplate<MyContext>(ctx => {
    let res = 'Wer wartet am Bahnhof?'
    if (ctx.session.waiting && ctx.session.waiting.size > 0)
        res += `\nWartet: ${Array.from(ctx.session.waiting).join(', ')}`
    if (ctx.session.waiting && ctx.session.notWaiting.size > 0)
        res += `\nWartet nicht: ${Array.from(ctx.session.notWaiting).join(', ')}`
    return res
})

waitMenu.select('unique', ['Warte', 'Warte nicht'], {
    isSet: (ctx, key) => ctx.session.choice === key,
    set: (ctx, key) => {
        ctx.session.choice = key
        if (!ctx.session.waiting) {
            ctx.session.waiting = new Set()
        }

        if (!ctx.session.notWaiting)
            ctx.session.notWaiting = new Set()

        if (key === 'Warte') {
            ctx.session.waiting.add(ctx.from.first_name)
            ctx.session.notWaiting.delete(ctx.from.first_name)
        }
        if (key === 'Warte nicht') {
            ctx.session.notWaiting.add(ctx.from.first_name)
            ctx.session.waiting.delete(ctx.from.first_name)
        }

        return true
    }
})

export const waitMenuMiddleware = new MenuMiddleware('/', waitMenu)
