import Contribution from '../models/contribution.js'
import User from '../models/user.js'
import nodemailer from 'nodemailer'
import AdmZip from 'adm-zip'


export const uploadFile = async (req, res) => {
    try {
        console.log(req.file)
        const newContribution = new Contribution({
            fileName: req.file.filename,
            filePath: req.file.path,
            facultyId: req.body.facultyId
        })
        const contribution = await newContribution.save()
        const receiver = await User.findOne({ facultyId: req.body.facultyId, role: 'coordinator' })
        const sender = await User.findOne({ _id: req.user._id })
        const { fullName } = sender
        // send email notify coordinator when contribution is submitted in their faculty
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            service: "Gmail",
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });

        await transporter.sendMail({
            from: '"Magazine System" <jokerboy1412@gmail.com>', // sender address
            to: receiver.email, // list of receivers
            subject: "Notification ✔", // Subject line 
            text: "Hello world?", // plain text body
            html: `<b>Your Faculty has the contribution is submitted by ${fullName}</b>` // html body
        });
        res.status(200).json({ contribution })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const downloadFile = async (req, res) => {
    try {
        const { id } = req.params
        const file = await Contribution.findOne({ _id: id })
        console.log(file.fileName)
        if (file) {
            const zip = new AdmZip();
            zip.addLocalFile(file.filePath);
            // Define zip file name
            const downloadName = `${file.fileName}.zip`;
            const data = zip.toBuffer();
            // code to download zip file
            res.set('Content-Type', 'application/octet-stream');
            res.set('Content-Disposition', `attachment; filename=${downloadName}`);
            res.set('Content-Length', data.length);
            res.send(data);
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}