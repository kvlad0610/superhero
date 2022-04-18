const {Superhero} = require('../../models')
const {joiSchemaSuperhero} = require('../../models/superhero')
const {BadRequest} = require('http-errors')

const add = async (req, res, next) => {
	try {
		const {error} = joiSchemaSuperhero.validate(req.body)
		if (error) {
			throw new BadRequest(error.message)
		}
		const newSuperhero = await Superhero.create({...req.body})
		res.status(201).json(newSuperhero)
	} catch (error) {
		if (error.message.includes('superhero validation')) {
			error.status = 400
		}
		next(error)
	}
}

module.exports = add
