import { TelegrafContext } from 'telegraf/typings/context'

export default interface MyContext extends TelegrafContext {
    session: any
}
