export type AjaxRes<T = any> = {
    success: boolean
    message: string
    data: T
}