import Contribution from '../models/contribution.js'

export const uploadFile = async (req, res) => {
    try {
        console.log(req.file)
        const newContribution = new Contribution({
            fileName: req.file.filename,
            filePath: req.file.path
        })
        const contribution = await newContribution.save()
        res.status(200).json({ contribution })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const downloadFile = async (req, res) => {
    try {
        const { id } = req.params
        const file = await Contribution.findOne({ _id: id })
        if (file) {
            const { fileName, filePath } = file
            res.download(filePath, fileName)
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}