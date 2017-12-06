import mongoose from 'mongoose'

const Job = new mongoose.Schema({
    title    : { type: String, required: true },
    url      : { type: String, required: true },
    empresa  : { type: String, required: true },
    salario  : { type: String, required: true },
    desc     : { type: String, required: true },
    desc_full: { type: String },
    date     : { type: Date },
    job_id   : { type: mongoose.SchemaTypes.Mixed }
})

export default mongoose.model('Job', Job)
