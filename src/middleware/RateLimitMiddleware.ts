import { TFIMiddleware } from 'ts-telegraf-decorators/build/types/src/TFIMiddleware'
import * as rateLimit from 'telegraf-ratelimit'
import limitConfig from '../config/LimitConfig'
import MyContext from '../config/MyContext'

export default class RateLimit implements TFIMiddleware {
    async use(ctx: MyContext, next: (...args: any[]) => Promise<any>) {
        await next()
        // return rateLimit(limitConfig)
    }
}