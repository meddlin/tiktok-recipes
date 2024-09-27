import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Recipe from "@/models/Recipe";

export async function POST(req) {
    let cxn = await connectMongo();

    // const body = await req.json();

    // if (!body.userId) {
    //     return NextResponse.json({ error: "User ID is missing. Must be signed in to request /view-logs." }, { status: 400 });
    // }

    // TODO: Validate the 'userId' is actually a user ID, not something else.
    // const userId = body.userId;
    try {
        // let result = await Recipe.find({ userId: userId });
        let result = await Recipe.find();
        console.log(`SERVER - result from query: ${result}`)
        return NextResponse.json(result)
    } catch (e) {
        console.error(e);
    }
}