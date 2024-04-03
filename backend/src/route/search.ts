import { Router } from 'express'
import { getMD5Hex, loadDfid, sendRes } from '../util'

const router = Router()

router.get('/hotWords', async (req, res) => {
    const words = await getHotWords()
    sendRes(res, true, '获取成功', words)
})

router.get('/song', loadDfid, async (req, res) => {
    try {
        const keyword = req.query.keyword as string
        if (!keyword) throw new Error('请输入搜索关键词 [keyword]')
        const page = parseInt(req.query.page as string || '1')
        const pageSize = parseInt(req.query.pageSize as string || '36')
        if (isNaN(page) || isNaN(pageSize)) throw new Error('[page] 和 [pageSize] 必须是整数')
        if (page <= 0 || pageSize <= 0) throw new Error('[page] 和 [pageSize] 必须大于 0')
        const result = await searchSong((req as any).dfid, keyword, page, pageSize)
        sendRes(res, true, '获取成功', result)
    } catch (error) {
        if (error instanceof Error) sendRes(res, false, error.message)
    }
})

/** 获取热门歌曲名称 */
const getHotWords = async (): Promise<string[]> => {
    const res = await fetch('https://www.kugou.com/yy/html/rank.html')
    const html = await res.text()
    const regex = /class="pc_temp_songname".*?>\s*(.*?)\s*(<|\()/sg
    const result = []
    while (true) {
        const match = regex.exec(html)
        if (match) result.push(match[1])
        else break
    }
    return result
}

/**
 * 搜索歌曲
 * @param dfid 通过 `loadDfid` 中间件获取
 * @param keyword 搜索关键词
 * @param page 页码，初始值为 1
 * @param pagesize 每页数据条数
 */
const searchSong = async (dfid: string, keyword: string, page: number, pagesize: number): Promise<SongInfoListItem[]> => {
    const part = 'NVPh5oo715z5DIWAeQlhMDsWXXQV4hwt'
    const query = {
        srcappid: '2919',
        clientver: '1000',
        dfid,
        keyword,
        mid: getMD5Hex(Date.now().toString()),
        page: page.toString(),
        pagesize: pagesize.toString(),
        userid: '0',
        signature: '',
        /** 这个参数如果缺失，将不返回 VIP 歌曲 */
        platform: 'WebFilter',
        /** 这个参数如果确实，将不返回编码后的歌曲 ID */
        appid: '1014',
    }
    query.signature = getMD5Hex(part + Object.keys(query).filter(i => i != 'signature').sort().map(i => `${i}=${query[i as keyof typeof query]}`).join('') + part)
    const res = await fetch('https://complexsearch.kugou.com/v2/search/song?' + new URLSearchParams(query).toString())
    const data = await res.json()
    const list = data.data.lists as any[]
    return list.map(item => {
        return {
            albumId: item.EAlbumID,
            albumName: item.AlbumName,
            artistName: item.SingerName,
            songId: item.EMixSongID,
            songName: item.SongName
        }
    })
}

export type SongInfoListItem = {
    /** 专辑名称 */
    albumName: string
    /** 编码后的专辑 ID */
    albumId: string
    /** 歌曲名称 */
    songName: string
    /** 编码后的歌曲 ID */
    songId: string
    /** 歌手名称，如需要歌手编码后 ID，需要先请求某首歌的信息，然后获得 */
    artistName: string
}

export default router