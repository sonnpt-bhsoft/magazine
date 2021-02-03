import express from 'express'
import dotenv from 'dotenv'
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import route from './routes/index.js'
import path from 'path'
import morgan from 'morgan'

const app = express()

// env config
dotenv.config()
app.use(morgan('dev'))
// Express config
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

app.use('/public', express.static(path.resolve(path.join('src', 'uploads'))))

// Policy config
app.use(cors())

// Routes
route(app);

// MongoDB config
mongoose
  .connect(process.env.CONNECTION_URL_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Mongoose connected'))
  .then(() => app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`)))
  .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)