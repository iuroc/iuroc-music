import { NextFunction, Request, RequestHandler, Response } from 'express'
import { createHash } from 'crypto'

export const sendRes = <T = any>(
    res: Response,
    success: boolean = true,
    message: string = '操作成功',
    data: T | null = null,
) => {
    res.send({ success, message, data })
}

/**
 * 获取 `dfid`，该值有一年有效期
 * @throws `Error`
 */
export const getDfid = async () => {
    const query = {
        appid: '1014',
        platid: '4',
        clientver: '0',
        clienttime: Date.now().toString(),
        signature: '',
        mid: getMD5Hex(Date.now().toString()),
        userid: '0',
        uuid: getMD5Hex(Date.now().toString()),
    }
    query.signature = getMD5Hex(`1014${Object.values(query).sort().join('')}1014`)
    const res = await fetch('https://userservice.kugou.com/risk/v1/r_register_dev?' + new URLSearchParams(query).toString(), {
        method: 'post',
        body: btoa(`{"uuid":""}`)
    })
    const data = await res.json() as { data: { dfid: string } }
    const { data: { dfid } } = data
    if (!dfid) throw new Error('请求速度过快，获取 dfid 失败')
    return dfid
}

/** 获取 MD5 16 进制加密结果 */
export const getMD5Hex = (text: string) => {
    const hash = createHash('md5')
    hash.update(text)
    return hash.digest('hex')
}

/** 中间件，从 Cookie 中载入 `Dfid`，如果不存在则自动创建 `Dfid` 并设置 Cookie */
export const loadDfid: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        (req as any).dfid = req.cookies.dfid || await getDfid()
        res.cookie('dfid', (req as any).dfid, {
            maxAge: 365 * 24 * 60 * 60 * 1000
        })
        next()
    } catch (error) {
        if (error instanceof Error) sendRes(res, false, error.message)
    }
}