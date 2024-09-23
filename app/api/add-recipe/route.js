import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Recipe from "@/models/Recipe";

export async function POST(req) {
    await connectMongo();
    
    const body = await req.json();

    if (!body.title) {
        return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    try {
        console.log('RECIPES API - Response: 200...')
        console.log(JSON.stringify(body))
        await Recipe.create({ 
            // userId: body.userId,
            title: body.title,
            description: body.description,
            category: body.category,
            ingredients: body.ingredients,
            directions: body.directions,
            notes: body.notes,
            recipeCredit: body.recipeCredit
        });

        return NextResponse.json({ });
    } catch (e) {
        console.error(e);
    }
}