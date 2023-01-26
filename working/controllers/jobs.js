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

const updateJob = async (req, res) => {
    const {
        body: { company, position },
        user: { userId },
        params: { id: jobId },
    } = req

    if (company === '' || position === '') {
        throw new BadRequestError('Company or Position fields cannot be empty')
    }
    const job = await Job.findByIdAndUpdate(
        { _id: jobId, createdBy: userId },
        {company, position},
        { new: true, runValidators: true }
    )
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

async function deleteJob (req, res) {
    const {user: { userId }, params: { id: jobId }} = req


    const job = await Job.findByIdAndDelete(
        { _id: jobId, createdBy: userId },
        { new: false}
    )

    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }

    res.status(StatusCodes.OK).json({ job })
}


module.exports = {
    getJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}