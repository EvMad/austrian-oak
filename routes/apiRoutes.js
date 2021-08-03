const express = require('express');
const router = require('express').Router();
const Day = require("../models/day");

console.log(Day);

//get all aggregate
router.get("/api/workouts", (req, res) => {
    
    Day.aggregate([
        
        {

        $addFields: {
            totalDuration: {$sum: "$exercises.duration"},
            totalWeight: { $sum: "$execrcises.weight"},
            totalSets: { $sum: "$exercises.sets"},
            totalReps: { $sum: "$exercises.reps"},
            totalDistance: { $sum: "$exercises.distance"}
        }
    }])
    .then((dbData) => {
        res.json(dbData);
    })
    .catch((err) => {
        res.json(err);
    });
});


// get range aggregate
router.get("/api/workouts/range", (req, res) => {
    
    Day.aggregate([

        {
            $addFields: {
                totalDuration: {$sum: "$exercises.duration"},
                totalWeight: { $sum: "$execrcises.weight"},
                totalSets: { $sum: "$exercises.sets"},
                totalReps: { $sum: "$exercises.reps"},
                totalDistance: { $sum: "$exercises.distance"}
        }
    }
    ]).limit(7)
    .then(weekWorkouts => {
        res.json(weekWorkouts);
    })
    .catch(err => {
        res.json(err);
    });
});

//post routes

router.post("/api/workouts/", ({ body }, res) => {
    
    Day.create(body)
    .then(newDay => {
        res.json(newDay);
    })
    .catch(err => {
        res.json(err);
    });
});


// body = { day, "excercises": [] } ???

router.put("/api/workouts/:id", ( req , res) => {
    console.log(req.body)
    Day.findByIdAndUpdate(
       Day.id, { $push: { exercises: req.body } }, { new: true, runValidators: true }
    )
    .then(updateId => {
        res.json(updateId);
    })
    .catch(err => {
        res.json(err);
    });
});

// delete route

router.delete("/api/workouts", ({ body }, res) => {
    Day.findByIdandDelete(body.id)
    .then(() => {
        res.json(true);
    })
    .catch(err => {
        res.json(err);
    });
});

module.exports = router;