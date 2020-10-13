import express from 'express'

import { getRepository } from "typeorm"
import orphanages from './models/Orphanage'

const app = express()
app.use(express.json())
const port = 1212

import './database/connection';
import Orphanage from './models/Orphanage'

app.post('/orphanages', async (req, res)=>{
    const {
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends
    } = req.body;
    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = orphanagesRepository.create({
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends
    });
    
    await orphanagesRepository.save(orphanage)

    return res.json({message : 'hello world'})
});

app.listen(port) //localhost:{port}
