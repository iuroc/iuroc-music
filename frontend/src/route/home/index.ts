import { Route } from 'vanjs-router'
import van from 'vanjs-core'

const { button, div } = van.tags

export default () => {

    return Route({ name: 'home', class: 'container py-4' },
        GoodPlaylist()
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