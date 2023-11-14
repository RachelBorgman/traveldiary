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
                res.status(400).json({ err });
            })
            // .catch((err) => {
            //     if (err.name === 'ValidationError') {
            //         const errors = Object.values(err.errors).map(e => e.message);
            //         return res.status(400).json({ errors });
            //     }
            //     res.status(500).json({ message: 'Something went wrong in create controllers', error: err })
            // })
    },

    getOne: (req, res) => {
        Travel.findOne({ _id: req.params.id },
            req.body,
            { new: true, runValidators: true })
        .then(oneSingleTravel => {
            res.json(oneSingleTravel)
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong in find one controllers', err })
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
            { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedTravel => {
            console.log("THIS IS UPDATED travel BEFORE RES.JSON: ", updatedTravel)
            res.json(updatedTravel)
            console.log("THIS IS UPDATED travel AFTER RES.JSON: ", updatedTravel)
        })
        .catch((err) => {
            res.status(400).json({ err });
        })
    }
    //         { _id: req.params.id }, req.body,
    //     )
    //     .then(updatedTravel => {
    //         res.json(updatedTravel)
    //     })
    //     .catch((err) => {                
    //         if (err.name === 'ValidationError') {
    //         const errors = Object.values(err.errors).map(e => e.message);
    //         return res.status(400).json({ errors });
    //     }
    //     res.status(500).json({ message: 'Something went wrong in update controllers', error: err });
    //     })
    // },

}