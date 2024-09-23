import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

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
        directions: [
            {
                explanation: String
            }
        ],
        notes: {
            type: String,
            required: false
        },
        recipeCredit: {
            url: String,
            embedUrl: String,
            account: String,
            accountUrl: String
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);

recipeSchema.plugin(toJSON);

export default mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);