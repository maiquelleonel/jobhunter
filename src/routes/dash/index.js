import express from 'express'
import index   from './../../services/dash/index'
import by15days from './../../services/dash/by15days'
import byDays from './../../services/dash/bydays'

const router = express.Router()

router.get('/', index)
router.get('/by-15-days', by15days)
router.get('/by-days', byDays)

module.exports = router
