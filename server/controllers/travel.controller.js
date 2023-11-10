const Travel = require('../models/travel.model');

module.exports = {
    getAllTravels: (req, res) => {
        Travel.find({})
            .then((travels) => {
                res.json(travels)
            })
            .catch(err => {
                res.json({message: 'Something went wrong in find all controllers', error: err})
            })
    },

    createTravel: (req, res) => {
        Travel.create(req.body)
            .then(newlyCreatedTravel => {
                res.json(newlyCreatedTravel)
                })
            .catch((err) => {
                res.json({ message: 'Something went wrong in create controllers', error: err })
            })
    },

    getOne: (req, res) => {
        Travel.findOne({ _id: req.params.id })
        .then(oneSingleTravel => {
            res.json(oneSingleTravel)
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong in find one controllers', error: err })
        })
    },

    delete: (req, res) => {
        Travel.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong in delete controller', error: err })
        })
    },

    update: (req, res) => {
        Travel.findOneAndUpdate(
            { _id: req.params.id }, req.body,
        )
        .then(updatedTravel => {
            res.json(updatedTravel)
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong in update controllers', error: err });
        })
    },

}