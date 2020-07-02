const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.send(events);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

router.get('/:id', getEventById, (req, res) => {
    res.send(res.event)
});


router.post('/', async (req, res) => {
    const event = new Event({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    })

    try {
        const newEvent = await event.save()
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});


router.patch('/:id', getEventById, async (req, res) => {
    if (req.body.name !== null) {
        res.event.firstName = req.body.firstName
    }
    if (req.body.lastName !== null) {
        res.event.lastName = req.body.lastName
    }

    try {
        const updatedEvent = await res.event.save();
        res.json(updatedEvent);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});


router.delete('/:id', getEventById, async (req, res) => {
    try {
        await res.event.remove();
        res.json({message: "event deleted"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

async function getEventById(req, res, next) {
    let event;
    try {
        event = await Event.findById(req.params.id);
        if (event == null) {
            return res.status(404).json({message: 'Cannot find event'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    res.event = event;
    next();
}

module.exports = router;