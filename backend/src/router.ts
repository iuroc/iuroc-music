import { Router } from 'express'
import search from './route/search'
import music from './route/music'
import artist from './route/artist'
import album from './route/album'
import playlist from './route/playlist'
import rank from './route/rank'
import { join } from 'path'

const router = Router()

router.get('/', (_, res) => {
    res.sendFile(join(__dirname, '..', '..', 'frontend', 'dist', 'index.html'))
})
router.use('/api/search', search)
router.use('/api/music', music)
router.use('/api/artist', artist)
router.use('/api/album', album)
router.use('/api/playlist', playlist)
router.use('/api/rank', rank)

export default router