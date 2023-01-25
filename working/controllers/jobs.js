async function getJobs (req, res) {
    res.send('Get all jobs');
}

async function getJob (req, res) {
    res.send('Get a job');
}

async function createJob (req, res) {
    res.json({
        message: 'Create a job',
        user: req.user,
        request: req.body
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