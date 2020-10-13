import express from 'express'
import './database/connection';
const port = 1212

import routes from './routes'

import Orphanage from './models/Orphanage'

const app = express()

app.use(express.json())
app.use(routes)

app.listen(port) //localhost:{port}
