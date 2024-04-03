import { Route } from 'vanjs-router'
import van from 'vanjs-core'
import APlayer from 'APlayer'

const { button, div } = van.tags

const playerElement = div()
const audio = [
    {
        artist: '鞠婧祎',
        cover: 'http://imge.kugou.com/stdmusic/20220729/20220729111306223126.jpg',
        name: '恋爱告急',
        url: 'https://webfs.hw.kugou.com/202403300156/79de5b76a8fb65dc9990a5c206cb2bd7/v2/381d6087668139847d0c656f872de0bb/part/0/960121/G335/M05/08/29/clip_L5UEAGTNVf6ABpKYAD3O0EXktGM495.mp3',
        lrc: `[id:$00000000]\r\n[ar:鞠婧祎]\r\n[ti:恋爱告急]\r\n[by:]\r\n[hash:381d6087668139847d0c656f872de0bb]\r\n[al:]\r\n[sign:]\r\n[qq:]\r\n[total:253000]\r\n[offset:0]\r\n[00:00.05]鞠婧祎 - 恋爱告急\r\n[00:00.31]作词：符酷\r\n[00:00.49]作曲：胡臻\r\n[00:00.61]编曲：胡臻\r\n[00:00.79]录音：诸振豪\r\n[00:00.97]和声：滕少\r\n[00:01.27]制作人：滕少\r\n[00:15.43]忽然之间的换季\r\n[00:17.31]还没准备好心意\r\n[00:19.13]一个人拖行李无奈没关系\r\n[00:22.77]暴风雨已经免疫\r\n[00:24.66]恋爱是逆反心理\r\n[00:26.47]编造人生谎言也难躲避\r\n[00:29.71]风吹走一半盛夏\r\n[00:33.59]剩下的风令人惊讶\r\n[00:37.11]淋漓尽致的冷漠\r\n[00:40.38]脸红后也倾盆而下\r\n[00:44.56]想一瞬间惯性表演\r\n[00:46.22]面无表情生人勿近\r\n[00:48.23]教科书式的尴尬搭讪却有共鸣\r\n[00:51.87]不知不觉谈天说地\r\n[00:53.57]并肩走两圈八百米\r\n[00:55.57]夕阳落叶汽笛声通知恋爱告急\r\n[00:59.62]满格讯号 容量不够思考\r\n[01:03.23]天真无邪 难道一眼到老\r\n[01:06.92]撤回祈祷 心愿请勿预告\r\n[01:10.62]黑屏来电 转身不敢逃跑\r\n[01:14.60]Wu 无数虚实场景\r\n[01:18.27]Wu 呜咽却难掩的笑意\r\n[01:22.02]Wu 物理公式的G 就是你\r\n[01:36.71]拙劣得不像告白\r\n[01:38.53]画上爱心的球拍\r\n[01:40.36]心动情况紧急但却不说明白\r\n[01:44.17]各自担心着失态\r\n[01:45.92]会做饭不会恋爱\r\n[01:47.74]说不出等夏天一起看海\r\n[01:50.99]素白色的季节里\r\n[01:54.71]第六页能找回盛夏\r\n[01:58.50]指缝中青涩萌芽\r\n[02:01.63]下决心一起走路回家\r\n[02:05.89]想一瞬间惯性表演\r\n[02:07.47]面无表情生人勿近\r\n[02:09.44]教科书式的尴尬搭讪却有共鸣\r\n[02:13.08]不知不觉谈天说地\r\n[02:14.78]并肩走两圈八百米\r\n[02:16.90]夕阳落叶汽笛声通知恋爱告急\r\n[02:20.85]满格讯号 容量不够思考\r\n[02:24.43]天真无邪 难道一眼到老\r\n[02:28.13]撤回祈祷 心愿请勿预告\r\n[02:31.84]黑屏来电 转身不敢逃跑\r\n[02:35.77]Wu 无数虚实场景\r\n[02:39.53]Wu 呜咽却难掩的笑意\r\n[02:43.16]Wu 物理公式的G 就是你\r\n[03:19.99]满格讯号 依靠足够牢靠\r\n[03:23.51]天真有邪 贪图一眼到老\r\n[03:27.27]神的祈祷 恋爱紧急预告\r\n[03:30.98]请听到我 回头跟你说好\r\n[03:34.99]Wu 呼喊出我心意\r\n[03:38.63]Wu who I am交付于你\r\n[03:42.28]Wu 忽然间全世界 只有你\r\n`
    },
    {
        artist: '梦里依稀',
        cover: '',
        name: '穿越之弃子横行 0001 重生',
        url: 'https://webfs.hw.kugou.com/202403300156/79de5b76a8fb65dc9990a5c206cb2bd7/v2/381d6087668139847d0c656f872de0bb/part/0/960121/G335/M05/08/29/clip_L5UEAGTNVf6ABpKYAD3O0EXktGM495.mp3',
        lrc: ``
    },
    {
        artist: '悦华风尚、国宝有声、帝繁音',
        cover: '',
        name: '第1集_兵王回归',
        url: 'https://webfs.hw.kugou.com/202403300307/98ccaabbac95b48cdd5efd402deb3c38/v2/8e4bf83c73a8271648713595dde218df/G327/M06/8C/63/J5UEAGTUUS2ALD-NAHx_5w-8KOU861.mp3',
        lrc: ''
    }
]
export const player = new APlayer({
    container: playerElement,
    audio,
    lrcType: 1
})

player.on('error', (event) => {
    // player.skipForward()
    // player.skipBack()
    player.notice('此歌曲仅支持试听片段', 2000, 0.8)
})

player.on('listswitch', async (event: any) => {
    const index = event.index
    const list = [...player.list.audios]
    const item = player.list.audios[index]
    if (item.lrc) return
    const res = await fetch('/api/audio/info?id=5e32jyab&isBook=true')
    const data = await res.json()
    item.lrc = data.data.lyrics
    item.cover = data.data.img
    player.list.clear()
    player.list.add(list)
    player.list.switch(index)
    player.play()
})

export default () => {

    return Route({ name: 'home', class: 'container py-4' },
        GoodPlaylist(),
        playerElement
    )
}

const GoodPlaylist = () => {

    return div({ class: 'hstack' },
        div({ class: 'fs-4 me-3' }, '推荐歌单'),
        div({ class: 'nav nav-tabs me-auto user-select-none' },
            div({ class: 'nav-link active' }, '翻唱'),
            div({ class: 'nav-link' }, '伤感'),
            div({ class: 'nav-link' }, '欧美'),
            div({ class: 'nav-link' }, '网络'),
        ),
        button({ class: 'btn btn-light border' }, '查看更多')
    )
}