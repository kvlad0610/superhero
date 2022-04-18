const {Schema, model} = require('mongoose')
const Joi = require('joi')

const superheroSchema = Schema(
	{
		nickname: {
			type: String,
			minlength: 2,
			required: [true, 'Nickname is required'],
		},
		real_name: {
			type: String,
			minlength: 2,
			required: [true, 'Real_name is required'],
		},
		origin_description: {
			type: String,
			minlength: 20,
			required: [true, 'Origin_description is required'],
		},
		superpowers: {
			type: String,
			minlength: 20,
			required: [true, 'Superpowers is required'],
		},
		catch_phrase: {
			type: String,
			minlength: 20,
			required: [true, 'Catch_phrase is required'],
		},
		images: {
			type: String,
			default: '',
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
)

const Superhero = model('superhero', superheroSchema)

const joiSchemaSuperhero = Joi.object({
	nickname: Joi.string().min(2).required(),
	real_name: Joi.string().min(2).required(),
	origin_description: Joi.string().min(20).required(),
	superpowers: Joi.string().min(20).required(),
	catch_phrase: Joi.string().min(20).required(),
	images: Joi.string(),
})

module.exports = {
	Superhero,
	joiSchemaSuperhero,
}
