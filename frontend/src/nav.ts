import van from 'vanjs-core'
import { getRandItem } from '../../backend/src/util/public'
import { activeRoute, routeTo } from 'vanjs-router'

const { button, div, input } = van.tags

export const Header = () => {
    /** 随机热词推荐 */
    const randHotKey = van.state('')
    getHotKeys().then(hotKeys => {
        randHotKey.val = getRandItem(hotKeys)
        setInterval(async () => {
            let word: string
            while ((word = getRandItem(hotKeys)) == randHotKey.val) continue
            randHotKey.val = word
        }, 2000)
    })

    const NavItem = (target: string, text: string, active: string[] = []) => {
        if (active.length == 0) active = [target]
        return div({ class: 'nav-item' },
            div({
                class: () => `user-select-none nav-link ${active.includes(activeRoute.val.name) ? 'active' : ''}`,
                onclick: () => routeTo(target),
                role: 'button'
            }, text)
        )
    }

    return div({ class: 'navbar navbar-expand-md bg-primary-subtle border-bottom border-2 border-primary-subtle sticky-top' },
        div({ class: 'container' },
            div({ class: 'navbar-brand user-select-none', role: 'button', onclick: () => routeTo('home') }, '爱有音乐'),
            div({ class: 'collapse navbar-collapse' },
                div({ class: 'navbar-nav me-auto' },
                    NavItem('home', '推荐'),
                    NavItem('rank', '排行榜'),
                    NavItem('artist', '歌手'),
                    NavItem('playlist', '歌单'),
                    NavItem('mv', 'MV'),
                ),
                div({ class: 'd-flex' },
                    input({ class: 'form-control me-2', type: 'search', placeholder: randHotKey }),
                    button({ class: 'btn btn-primary text-nowrap' }, '搜索')
                )
            )
        )
    )
}

export const Footer = () => div({ class: 'fixed-bottom d-md-none' },
    div({ class: 'border-top', style: 'height: 50px' })
)

const getHotKeys = async (): Promise<string[]> => {
    const res = await fetch('/api/search/searchTip')
    return (await res.json()).data
}