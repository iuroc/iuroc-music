import express from 'express'
import router from './router'
import { join } from 'path'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cookieParser(), router)
app.use(express.static(join(__dirname, '..', '..', 'frontend', 'dist')))

app.listen(8088, () => {
    console.log('http://127.0.0.1:8088')
})