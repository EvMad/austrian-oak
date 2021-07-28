const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const daySchema = new Schema(

    {
        day: {
            type: Date,
            default: () => new Date()
        },

        exercises: [
            {
                type: {
                    type: String,
                    trim: true,
                    required: "Enter 'cardio' or 'resistance'"
                },

                name: {
                    type: String,
                    trim: true,
                    required: "Enter an exercise name"
                },

                duration: {
                    type: Number,
                    required: "Enter an exercise duration in minutes"
                },

                weight: {
                    type: Number
                },

                reps: {
                    type: Number
                },

                sets: {
                    type: Number,
                }
            }
        ]
    },

    {
        toJSON: {
            virtuals: true
        }
    }
);

const day = mongoose.model("Day", daySchema);

modules.exports = day;
