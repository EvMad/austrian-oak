const router = require('express').Router()

const db = require("../models/day")

router.get("/api/workouts", (req, res) => {

    db.day.aggregate([
        
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

router.get("/api/workouts/range", (req, res) => {
    db.day.find({}).limit(7).aggregate([

        {
            $addFields: {
                totalDuration: {$sum: "$exercises.duration"},
                totalWeight: { $sum: "$execrcises.weight"},
                totalSets: { $sum: "$exercises.sets"},
                totalReps: { $sum: "$exercises.reps"},
                totalDistance: { $sum: "$exercises.distance"}
        }
    ])
    .then(weekWorkouts => {
        res.json(weekWorkouts);
    })
    .catch(err => {
        res.json(err);
    });
});