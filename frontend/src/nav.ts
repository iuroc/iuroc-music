import van from 'vanjs-core'

const { button, div, input } = van.tags

export const Header = () => {
    /** 热词推荐 */
    const hotkey = van.state('')


    return div({ class: 'navbar navbar-expand-sm bg-primary-subtle' },
        div({ class: 'container-fluid' },
            div({ class: 'navbar-brand' }, '爱优音乐'),
            div({ class: 'collapse navbar-collapse' },
                div({ class: 'navbar-nav me-auto' },
                    div({ class: 'nav-item' }, div({ class: 'nav-link active' }, '推荐')),
                    div({ class: 'nav-item' }, div({ class: 'nav-link' }, '推荐')),
                    div({ class: 'nav-item' }, div({ class: 'nav-link' }, '推荐')),
                ),
                div({ class: 'd-flex' },
                    input({ class: 'form-control me-2', type: 'search', placeholder: '' }),
                    button({ class: 'btn btn-primary text-nowrap' }, '搜索')
                )
            )
        )
    )
}

export const Footer = () => div({ class: 'fixed-bottom d-sm-none' },
    div({ class: 'border-top', style: 'height: 50px' })
)

const getHotKeys = () => {
    
}