const express = require('express');

const router = express.Router();
const Task = require('../models/Task');
const auth = require('../midleware/auth');

router.get('/', auth, async (req, res) => {
    const user = req.user;
    const task = await Task.find({user: user._id});
    return res.send(task)
});

router.post('/', auth, async (req, res) => {
    const user = req.user;
    const object = {
        user: user._id,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    };
    const task = new Task(object);

    try {
        await task.save();
        return res.send(task);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.put('/:id', auth, async (req, res) => {
    const user = req.user;
    const task = await Task.findOne({_id: req.params.id});
    if (JSON.stringify(user._id) === JSON.stringify(task.user)) {
    task.title = req.body.title;
    task.description = req.body.description;
    task.status = req.body.status;
    try {
    await task.save();
    return res.send(task)
    } catch (e) {
        return res.status(400).send(e);
    }
    } else {
        res.status(404).send({message: 'Not found'})
    }
});




module.exports = router;