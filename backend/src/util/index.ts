import { Response } from 'express'

export const sendRes = <T = any>(
    res: Response,
    success: boolean = true,
    message: string = '操作成功',
    data?: T,
) => {
    res.send({ success, message, data })
}

export const getKuwoCookie = async () => {
    const res = await fetch('https://kuwo.cn/favicon.ico')
    const kvStr = res.headers.get('Set-Cookie')
    if (!kvStr) throw new Error('在响应头中没有找到 Set-Cookie')
    const matchResult = kvStr.match(/([^;=]{20,})=([^;=]*)/)
    if (!matchResult) throw new Error('没有找到符合要求的 Cookie')
    const [_, key, value] = matchResult
    return { key, value }
}

export const makeSecret = (key: string, value: string) => {
    if (!key) throw new Error('Secret 加密失败')
    let str = ''
    for (let i = 0; i < key.length; i++)
        str += key.charCodeAt(i).toString()
    const num1 = Math.floor(str.length / 5)
    const num2 = parseInt(
        str.charAt(num1) +
        str.charAt(2 * num1) +
        str.charAt(3 * num1) +
        str.charAt(4 * num1) +
        str.charAt(5 * num1)
    )
    const num3 = Math.ceil(key.length / 2)
    const num4 = Math.pow(2, 31) - 1
    if (num2 < 2) throw new Error('Secret 加密失败')
    let num5 = Math.round(1e9 * Math.random()) % 1e8
    str += num5

    while (str.length > 10) {
        const num7 = parseInt(str.substring(0, 10))
        const num8 = parseInt(str.substring(10))
        str = (num7 + num8).toString()
    }
    str = ((num2 * parseInt(str) + num3) % num4).toString()

    let str3 = ''
    let str4 = ''

    for (let i = 0; i < value.length; i++) {
        str3 = (value.charCodeAt(i) ^ Math.floor(parseInt(str) / num4 * 255)).toString()
        const num6 = parseInt(str3)
        const str5 = num6.toString(16)
        str4 += num6 < 16 ? '0' + str5 : str5
        str = ((num2 * parseInt(str) + num3) % num4).toString()
    }
    let str2 = num5.toString(16)
    while (str2.length < 8) str2 = '0' + str2
    return str4 += str2
}

/** 获取数组随机一项 */
export const getRandItem = (array: any[]) => array[Math.floor(Math.random() * array.length)]