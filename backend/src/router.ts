import { Router } from 'express'
import search from './route/search'
import audio from './route/audio'
import artist from './route/artist'
import album from './route/album'
import playlist from './route/playlist'
import rank from './route/rank'
import { join } from 'path'

const router = Router()

router.use('/api/search', search)
router.use('/api/audio', audio)
router.use('/api/artist', artist)
router.use('/api/album', album)
router.use('/api/playlist', playlist)
router.use('/api/rank', rank)

export default router