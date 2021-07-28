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

