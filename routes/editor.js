const express = require('express')

const router = express.Router()
// const editor = require('../models/editorModel')
const {
  createMarkdown,
  getAllMarkdownFiles,
  singleMarkdownFile,
  deleteMarkdownFile,
  updateMarkdownFile
} = require('../controllers/editorController')


// GET all markdown files
router.get('/', getAllMarkdownFiles)

//GET single markdown file
router.get('/:id', singleMarkdownFile)

//POST a new file
router.post('/', createMarkdown)

//DELETE A single markdown file
router.delete('/:id', deleteMarkdownFile)

//UPDATE A maradown file
// router.patch('/api/editor/:id', updateMarkdownFile)
router.patch('/:id', updateMarkdownFile)

module.exports = router