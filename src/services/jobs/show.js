import request from 'request-promise'
import cheerio from 'cheerio'
import Job from './../../models/job'
import _ from 'lodash'
import Promises from 'bluebird'
import moment from 'moment'

export default async (req, res) => {
    let job = await Job.findById(req.params.id)

    if (job.desc_full) {
        return res.render('jobs/show', {
            title: 'Indexador de vagas - Detalhe',
            layout: 'app',
            user: req.user || undefined,
            data: job
        })
    }

    let body = await request(job.url)
    let $ = cheerio.load(body)

    let desc_full = $('.descricao-vaga .col-md-8').html()
    //let { title, url, desc, job_id, date } = job
    //let newJob = { title, url, desc, desc_full, job_id, date }
    let qry = { _id: job._id }
    let newJob = { desc_full: desc_full }

    let updateResult = await Job.findOneAndUpdate(qry, newJob)
    let updatedJob = await Job.findById(qry)

    return res.render('jobs/show', {
        title: 'Indexador de vagas - Detalhe',
        layout: 'app',
        user: req.user || undefined,
        data: updatedJob
    })

}
