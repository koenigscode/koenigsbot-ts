import { Context } from 'telegraf'
import { Start, TFController, TFContext, Help } from 'ts-telegraf-decorators'

@TFController()
export default class {

    @Start()
    start(@TFContext() ctx: Context): void {
        this.help(ctx)
    }

    @Help()
    async help(@TFContext() ctx: Context): Promise<void> {
        const commands = (await ctx.telegram.getMyCommands()).map(command => `/${command.command} - ${command.description}`)
        ctx.reply(commands.join('\n'))
    }

}