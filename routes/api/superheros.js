const express = require('express')

const {
	getAll,
	getById,
	add,
	remove,
	update,
	updateImage,
} = require('../../controllers/superhero')
const {upload} = require('../../middleware')

const router = express.Router()

router.get('/', getAll)

router.get('/:superheroId', getById)

router.post('/', add)

router.delete('/:superheroId', remove)

router.put('/:superheroId', update)

router.patch('/:superheroId/image', upload.single('image'), updateImage)

module.exports = router
