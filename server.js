require('dotenv').config() 
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const editorRoutes = require('./routes/editor')

const app = express()
app.use(cors())

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

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
        console.log(`listening on port ${process.env.PORT}!!`)
    }).
    catch((error) => {
        console.log(error)
    })

