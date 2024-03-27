import { Router } from 'express'
import { makeSecret } from '../util'

const router = Router()

router.get('/', (req, res) => {
    res.send('Hello World')
})

/** 获取榜单分类菜单 */
export const getRankMenu = async (key: string, value: string) => {
    const res = await fetch('https://kuwo.cn/api/www/bang/bang/bangMenu', {
        headers: {
            'Cookie': `${key}=${value}`,
            'Secret': makeSecret(key, value)
        },
    })
    return (await res.json()).data as {
        /** 榜单大类名称，例如“全球”、“场景”、“官方” */
        name: string,
        /** 榜单小类列表 */
        list: {
            /** 榜单 ID */
            sourceid: string
            /** 榜单介绍 */
            intro: string
            /** 榜单名称 */
            name: string
            /** 榜单封面 */
            pic: string
            /** 更新时间 */
            pub: string
        }[]
    }[]
}

export default router