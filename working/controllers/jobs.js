async function getJobs (req, res) {
    res.send('Get all jobs');
}

async function getJob (req, res) {
    res.send('Get a job');
}

async function createJob (req, res) {
    res.send('Create a job');
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