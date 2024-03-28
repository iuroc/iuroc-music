import { Router } from 'express'
import { getMD5Hex, loadDfid, sendRes } from '../util'

const router = Router()

router.get('/info', loadDfid, async (req, res) => {
    try {
        const id = req.query.id as string | undefined
        const idBook = req.query.isBook == 'true'
        if (!id) throw new Error('请输入编码后的音频 ID [id]')
        const { dfid } = req as any as { dfid: string }
        const musidInfo = await getAudioInfo(id, dfid, idBook)
        sendRes(res, true, '获取成功', musidInfo)
    } catch (error: any) {
        sendRes(res, false, error.message)
    }
})

/**
 * 获取音频信息
 * @param id 音频 ID
 * @param dfid 使用 `loadDfid` 中间件后，可从 Cookie 中获得
 * @param isBook 是否是听书音频
 * @returns 音频信息
 */
const getAudioInfo = async (id: string, dfid: string, isBook: boolean): Promise<AudioInfo> => {
    const str = 'NVPh5oo715z5DIWAeQlhMDsWXXQV4hwt'
    const query = {
        from: isBook ? '111' : '',
        appid: '1014',
        platid: '4',
        token: '',
        userid: '0',
        srcappid: '2919',
        clientver: '20000',
        clienttime: Date.now().toString(),
        dfid,
        encode_album_audio_id: id,
        mid: getMD5Hex(Date.now().toString()),
        uuid: getMD5Hex(Date.now().toString()),
        signature: ''
    }
    query.signature = getMD5Hex(str + Object.keys(query).filter(i => i != 'signature').sort().map(key => `${key}=${query[key as keyof typeof query]}`).join('') + str)
    const res = await fetch('https://wwwapi.kugou.com/play/songinfo?' + new URLSearchParams(query).toString())
    const data = await res.json()
    if (data.status == 0) throw new Error('获取音频信息失败，请检查参数是否错误')
    const {
        album_name,
        album_id,
        encode_album_id,
        img,
        author_name,
        author_id,
        song_name,
        play_url,
        audio_id,
        encode_album_audio_id
    } = data.data

    return {
        album_name,
        album_id,
        encode_album_id,
        img,
        author_name,
        author_id,
        song_name,
        play_url,
        audio_id,
        encode_album_audio_id
    }
}

/** 音频信息 */
type AudioInfo = {
    /** 专辑名称 */
    album_name: string
    /** 专辑 ID */
    album_id: string
    /** 编码后的专辑 ID */
    encode_album_id: string
    /** 专辑封面 URL */
    img: string
    /** 作者名称 */
    author_name: string
    /** 作者 ID */
    author_id: string
    /** 音频名称 */
    song_name: string
    /** 播放地址 */
    play_url: string
    /** 音频 ID */
    audio_id: string
    /** 编码后的音频 ID */
    encode_album_audio_id: string
}

export default router