import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

// const DirectionsSchema = mongoose.Schema({
//     explanation: {
//         type: String,
//         required: false
//     }
// });

// const IngredientSchema = mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     quantity: {
//         type: Number,
//         required: false
//     },
//     unit: {
//         type: String,
//         required: false
//     }
// });

// const RecipeCreditSchema = mongoose.Schema({
//     url: {
//         type: String,
//         required: false
//     },
//     embedUrl: {
//         type: String,
//         required: false
//     },
//     account: {
//         type: String,
//         required: false
//     },
//     accountUrl: {
//         type: String,
//         required: false
//     },
// });
const RecipeCreditSchema = mongoose.Schema({
    any: Object
});

const recipeSchema = mongoose.Schema(
    {
        // userId: {
        //     type: String,
        //     required: true
        // },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: false
        },
        ingredients: [ 
            { 
                name: String,
                quantity: String
            }
        ],
        // ingredients: [IngredientSchema],
        // directions: [{ type: String }],
        notes: {
            type: String,
            required: false
        },
        // recipeCredit: {
        //     type: RecipeCreditSchema
        // }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);

recipeSchema.plugin(toJSON);
// DirectionsSchema.plugin(toJSON);
// IngredientSchema.plugin(toJSON);
// RecipeCreditSchema.plugin(toJSON);

export default mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);