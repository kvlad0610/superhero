const {Superhero} = require('../../models')
const {NotFound} = require('http-errors')

const update = async (req, res, next) => {
	try {
		const {superheroId} = req.params
		const superhero = await Superhero.findByIdAndUpdate(superheroId, req.body, {
			new: true,
		})
		if (!superhero) {
			throw new NotFound('Superhero not found')
		}
		res.json(superhero)
	} catch (error) {
		if (error.message.includes('Cast to ObjectId failed')) {
			error.status = 404
		}
		next(error)
	}
}

module.exports = update
