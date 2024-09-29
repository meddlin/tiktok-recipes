import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import GroceryList from "@/models/GroceryList";

export async function POST(req) {
    await connectMongo();
    
    const body = await req.json();

    /* TODO: Determine which fields are required to submit; reject if they aren't in the request. */
    // if (!body.title) {
    //     return NextResponse.json({ error: "Title is required" }, { status: 400 });
    // }

    try {
        console.log('RECIPES API - Response: 200...')
        console.log(JSON.stringify(body))
        await GroceryList.create({ 
            // userId: body.userId,
            dateCreated: body.dateCreated,
            name: body.name,
            groceryItems: body.groceryItems,
            relatedRecipes: body.relatedRecipes,
            notes: body.notes
        });

        return NextResponse.json({ });
    } catch (e) {
        console.error(e);
    }
}