const express = require('express')
const router = express.Router()

const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
// const {log} = require('../../middlewares/logger.middleware')
const {getToys,getToyById,saveToy,removeToy} = require('./toy.controller')

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getToys)
router.get('/:id', getToyById)
router.post('/',requireAdmin, saveToy)
router.put('/:id?', saveToy)
router.delete('/:id', requireAdmin, removeToy)
module.exports = router
