import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

const groceryListSchema = mongoose.Schema({
    // userId: {
    //     type: String,
    //     required: true
    // },
    dateCreated: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    groceryItems: [
        { name: String, quantity: String }
    ],
    relatedRecipes: [
        { recipeId: String, title: String }
    ]
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

groceryListSchema.plugin(toJSON);

export default mongoose.models.GroceryList || mongoose.model("GroceryList", groceryListSchema);