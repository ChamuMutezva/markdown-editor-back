const express = require('express')

const router = express.Router()
const editor = require('../models/editorModel')
const {
    createMarkdown,
    getAllMarkdownFiles,
    singleMarkdownFile,
    deleteMarkdownFile,
    updateMarkdownFile
} = require('../controllers/editorController')


// GET all markdown files
router.get('/api/editor', getAllMarkdownFiles)

//GET single markdown file
router.get('/api/editor/:id', singleMarkdownFile)

//POST a new file
router.post('/api/editor', createMarkdown)

//DELETE A single markdown file
router.delete('/api/editor/:id', deleteMarkdownFile)

//UPDATE A maradown file
router.patch('/api/editor/:id', updateMarkdownFile)

module.exports = router