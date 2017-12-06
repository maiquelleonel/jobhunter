import express  from 'express'
import list     from './../../services/jobs/list'
import show     from './../../services/jobs/show'
import loggedin from './../../services/users/loggedin'

const router = express.Router()

router.get('/'   , list)
router.get('/:id', loggedin, show)

module.exports = router
