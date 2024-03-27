import { Router } from 'express'
import { sendRes } from '../util'

const router = Router()

router.get('/searchTip', async (req, res) => {
    const keyword = <string>req.query.keyword || ''
    const words = await getSearchTip(keyword)
    sendRes(res, true, '获取成功', words)
})

/** 获取搜索联想 */
const getSearchTip = async (keyword: string): Promise<string[]> => {
    const res = await fetch(`https://kuwo.cn/openapi/v1/www/search/searchKey?key=${encodeURIComponent(keyword)}`)
    const data = await res.json() as { data: string[] }
    const words = data.data.map(item => {
        return item.startsWith('RELWORD=') ? item.match(/RELWORD=(\S+)/)![1] : item
    })
    return words
}

export default router