require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const editorRoutes = require('./routes/editor');

const app = express()
app.use(cors())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('markdown-editor/dist'))
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'markdown-editor', 'dist', 'index.html'))
    })
}


// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/editor', editorRoutes);

const PORT = process.env.PORT || 4000

// connect to db
mongoose.connect(process.env.MONGO_URL).
    then(() => {
        // listen for request
        app.use(editorRoutes)
        console.log('connected to the database')
        app.listen(PORT)
        console.log(`listening on port ${process.env.PORT}!!`)
    }).
    catch((error) => {
        console.log(error)
    })

