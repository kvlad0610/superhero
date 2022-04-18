const {Superhero} = require('../../models')
const {NotFound} = require('http-errors')

const remove = async (req, res, next) => {
	try {
		const {superheroId} = req.params
		const superhero = await Superhero.findByIdAndDelete(superheroId)
		if (!superhero) {
			throw new NotFound('Superhero not found')
		}
		res.json({message: 'superhero delete'})
	} catch (error) {
		if (error.message.includes('Cast to ObjectId failed')) {
			error.status = 404
		}
		next(error)
	}
}

module.exports = remove
