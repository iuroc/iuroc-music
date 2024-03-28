import { Router } from 'express'
import { getKuwoCookie, makeSecret, sendRes } from '../util'

const router = Router()

router.get('/tags', async (req, res) => {
    sendRes(res, true, '获取成功', await getTags())
})

const getTags = async () => {
    const { key, value } = await getKuwoCookie()
    const res = await fetch('https://kuwo.cn/api/www/playlist/getTagList', {
        headers: {
            'Secret': makeSecret(key, value),
            'Cookie': `${key}=${value}`
        }
    })
    const { data } = await res.json()
    return data
}

export default router