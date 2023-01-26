const Job = require('../models/Job');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');

async function getJobs (req, res) {
    const jobs = await Job.find({
        createdBy: req.user.userId
    }).sort('-createdAt')

    res.status(StatusCodes.OK).json({count: jobs.length, jobs});
}
async function getJob (req, res) {
    const job = await Job.findOne({
        createdBy: req.user.userId,
        _id: req.params.id
    })

    if(!job) {
        throw new NotFoundError(`No job with id ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({job});
}

async function createJob (req, res) {

    const createdBy = req.user.userId;
    const {company, position} = req.body;
    const job = await Job.create({position, company, createdBy})

    res.status(StatusCodes.CREATED).json({
        message: 'Create a job',
        user: req.user,
        request: req.body,
        job
    });
}

async function updateJob (req, res) {
    res.send('Update a job');
}

async function deleteJob (req, res) {
    res.send('Delete a job');
}


module.exports = {
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}