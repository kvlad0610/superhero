const path = require('path')
const fs = require('fs/promises')
const {NotFound} = require('http-errors')

const {Superhero} = require('../../models')
const {jimp} = require('../../helpers')

const imagesDir = path.join(__dirname, '../../', 'public', 'images')

const updateImage = async (req, res, next) => {
	try {
		const {superheroId} = req.params
		const {path: tempUpload} = req.file
		await jimp(tempUpload)
		const newFileName = `${superheroId}.png`
		const fileUpload = path.join(imagesDir, newFileName)
		await fs.rename(tempUpload, fileUpload)
		const image = path.join('images', newFileName)
		const newImageSuperhero = await Superhero.findByIdAndUpdate(superheroId, {
			images: image,
		})
		if (!newImageSuperhero) {
			throw new NotFound()
		}
		res.json({image})
	} catch (error) {
		if (error.message.includes('Cast to ObjectId failed for value')) {
			error.status = 404
		}
		next(error)
	}
}

module.exports = updateImage
