import express from 'express'
import router from './router'

const app = express()

app.use(router)

app.listen(8088, () => {
    console.log('http://127.0.0.1:8088')
})