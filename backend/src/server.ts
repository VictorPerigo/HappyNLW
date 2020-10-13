import express from 'express'
import './database/connection';
import path from 'path'
const port = 1212

import routes from './routes'

import Orphanage from './models/Orphanage'

const app = express()

app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.listen(port) //localhost:{port}
