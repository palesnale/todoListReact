const express = require("express");
const router = express.Router();
const Task = require("../models/TaskSchema");

router.get('/', async (req, res) => {
    let filter = {};
    if(req.query.category)
        filter.category = req.query.category;
    if(req.query.status)
        filter.status = req.query.status;
    if(req.query.dueDate)
        filter.dueDate = req.query.dueDate;
    console.log(filter);
    const tasks = await Task.find(filter);
    res.json(tasks);
});

router.get('/categories', async(req, res) => {
    const cats = new Set();
    const tasks = await Task.find({}, 'category');
    tasks.forEach(task => {
        if(task.category)
            cats.add(task.category);
    });
    res.json(Array.from(cats));
});

router.get('/dueDates', async(req, res) => {
    const dates = new Set();
    const tasks = await Task.find({}, 'dueDate');
    tasks.forEach(task => {
        if(task.dueDate)
            dates.add(task.dueDate.toISOString().split('T')[0]);
    });
    res.json(Array.from(dates));
});

router.post('/', async (req, res) => {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
});

router.put('/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new : true});
    res.json(task);
});

router.delete('/:id', async (req, res) => {
    console.log(req.params.id);
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

module.exports = router;