const {Superhero} = require('../../models')

const getAll = async (req, res, next) => {
	try {
		const superheros = await Superhero.find()
		res.json(superheros)
	} catch (error) {
		next(error)
	}
}

module.exports = getAll
