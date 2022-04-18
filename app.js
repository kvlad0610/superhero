const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
require('dotenv').config()

const swaggerDocument = require('./swagger.json')
const superherosRouter = require('./routes/api/superheros')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/api/superheros', superherosRouter)

app.use((req, res) => {
	res.status(404).json({message: 'Not found'})
})

app.use((err, req, res, next) => {
	const {status = 500, message = 'Server error'} = err
	res.status(status).json({message})
})

module.exports = app
