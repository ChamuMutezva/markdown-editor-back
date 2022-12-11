const mongoose = require('mongoose')
const editor = require('../models/editorModel')

// get all markdown files
const getAllMarkdownFiles = async (req, res) => {
    const MarkdownFiles = await editor.find({})
    res.status(200).json(MarkdownFiles)
}

// get a single markdown file
const singleMarkdownFile = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'File id not found' })
    }

    const MarkdownFile = await editor.findById(id)

    if (!MarkdownFile) {
        return res.status(404).json({ error: "File not found" })
    }

    res.status(200).json(MarkdownFile)
}

// create a new markdown file
const createMarkdown = async (req, res) => {
    const { createdAt, name, content } = req.body
    try {
        const doc = await editor.create({ createdAt, name, content })
        res.status(200).json(doc)
    } catch (error) {
        res.status(400).json({ mssg: error.message })
    }
}

// delete a single markdown file
const deleteMarkdownFile = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'File id not found' })
    }

    const targetMarkdownFile = await editor.findByIdAndDelete({ _id: id })

    if (!targetMarkdownFile) {
        return res.status(404).json({ error: "File not found" })
    }

    res.status(200).json(targetMarkdownFile)
}

// update a file
const updateMarkdownFile = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'File id not found' })
    }

    const targetMarkdownFile = await editor.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!targetMarkdownFile) {
        return res.status(404).json({ error: "File not found" })
    }

    res.status(200).json(targetMarkdownFile)
}


module.exports = {
    createMarkdown,
    singleMarkdownFile,
    getAllMarkdownFiles,
    deleteMarkdownFile,
    updateMarkdownFile
}