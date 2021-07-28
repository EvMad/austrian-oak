const router = require('express').Router()

const db = require("../models/day")


//get all aggregate
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


// get range aggregate
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
    }
    ])
    .then(weekWorkouts => {
        res.json(weekWorkouts);
    })
    .catch(err => {
        res.json(err);
    });
});

//post routes

router.post("/api/workouts", (req, res) => {
    db.day.create({})
    .then(newDay => {
        res.json(newDay);
    })
    .catch(err => {
        res.json(err);
    });
});

router.put("/api/workouts/:id", ({ day, "excercises": [] }, res) => {
    db.day.findByIdAndUpdate(
        params.id, { $push: { exercises: body } }, { new: true, runValidators: true }
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
    db.findByIdandDelete(body.id)
    .then(() => {
        res.json(true);
    })
    .catch(err => {
        res.json(err);
    });
});

module.exports = router;