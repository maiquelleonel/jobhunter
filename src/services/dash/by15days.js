import moment from 'moment'
import Job    from './../../models/job'
//import Math   from 'mathjs'

export default (req, res) => {
    const options = [{
        $match: {
            'date':{
                '$gte': new Date(moment().subtract(15,'days')),
                '$lt': new Date()
            }
        }
    },{
        $group: {
            _id  : '$date',
            count: {
                $sum: 1
            }
        }
    }]

    Job
        .aggregate(options)
        .sort({'title' : 'desc'})
        .then((result) => {
            let labels = result.map(item => moment(item._id).format('DD/MM/YYYY'))
            let data   = result.map(item => item.count)
            return res.json({
                labels,
                datasets: [{
                    data: data,
                    backgroundColor: data.map(function(){
                        return 'rgba('
                            + Math.floor( Math.random() * 255) +', '
                            + Math.floor( Math.random() * 255) +', '
                            + Math.floor( Math.random() * 255) +', '
                            + '0.2)'
                    })
                }]
            })
        })
}
