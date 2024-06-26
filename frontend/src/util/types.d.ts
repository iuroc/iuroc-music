declare type PlayInfo = {
    name: string
    artist: string
    url: string
    cover: string
    /** 切换到此音频时的主题色，比上面的 theme 优先级高 */
    theme: string
    lrc: string
    type: 'auto' | 'hls' | 'normal'
} | Record<string, any>

declare module 'APlayer' {
    class APlayer {
        constructor(init: {
            container: HTMLElement
            audio: PlayInfo[]
            theme: string
            /** 互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器 */
            mutex: boolean
            /** 歌词类型，1：JS 字符串方式，2：HTML 方式，3：LRC 文件方式 */
            lrcType: number
            /** 列表默认折叠，默认 `false` */
            listFolded: boolean
            /** 列表最大高度 */
            listMaxHeight: string
        } | Record<string, any>)
        list: {
            clear(): void
            add(infos: PlayInfo[]): void
            remove(index: number): void
            switch(index: number): void
            show(): void
            hide(): void
            toggle(): void
            audios: PlayInfo[]
            index: number
        }
        play(): void
        pause(): void
        on(type: 'abort' | 'canplay' | 'canplaythrough' | 'durationchange' | 'emptied' | 'ended' |
            'error' | 'loadeddata' | 'loadedmetadata' | 'loadstart' | 'mozaudioavailable' | 'pause' |
            'play' | 'playing' | 'progress' | 'ratechange' | 'seeked' | 'seeking' | 'stalled' |
            'suspend' | 'timeupdate' | 'volumechange' | 'waiting' | 'listshow' | 'listhide' |
            'listadd' | 'listremove' | 'listswitch' | 'listclear' | 'noticeshow' | 'noticehide' |
            'destroy' | 'lrcshow' | 'lrchide', handle: (event: Event) => void): void
        seek(time: number): void
        skipForward(): void
        skipBack(): void
        notice(message: string, time: number, opacity: number): void
    }
    export default APlayer
}