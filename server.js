require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const editorRoutes = require('./routes/editor')
const logger = require('./utils/logger')
const path = require('path')
const methodOverride = require('method-override')

const app = express()
app.use(cors())

// middleware
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// app.use(express.static('markdown-editor/dist'))

// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.json({ limit: '50mb'}))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

app.use(methodOverride('_do'))
//app.get('*', (req, res) => {
// eslint-disable-next-line no-undef
// res.sendFile(path.resolve(__dirname, 'markdown-editor', 'dist', 'index.html'))
//})

// routes
app.use('/api/editor', editorRoutes)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 4000

// connect to db
// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGO_URL).
  then(() => {
    // listen for request
    app.use(editorRoutes)
    console.log('connected to the database')
    app.listen(PORT)
    // eslint-disable-next-line no-undef
    logger.info(`listening on port ${process.env.PORT}!!`)
  }).
  catch((error) => {
    logger.error(error)
    //console.log(error)
  })



