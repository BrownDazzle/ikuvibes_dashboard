import { increaseEventViews } from "@/lib/actions/event.actions";
import { connectToDatabase } from "@/lib/database";
import Category from "@/lib/database/models/category.model";
import Event from "@/lib/database/models/event.model";
import Genre from "@/lib/database/models/genre.model";
import { handleError } from "@/lib/utils";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

const populateEvent = (query: any) => {
  return query
    //.populate({ path: 'organizer', model: User, select: '_id firstName lastName' })
    .populate([
      { path: 'category', model: Category, select: '_id name' },
      { path: 'genre', model: Genre, select: '_id name' }
      // Add more populate options if needed
    ])
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    await connectToDatabase()
    //await increaseEventViews(params.id)
    const product = await populateEvent(Event.findById(params.id));
    // Find the event by ID and increment the views
    console.log("EVE__IT", product)

    if (!product) throw new Error('File not found')

    return NextResponse.json(product, {
      headers: corsHeaders
    });
  } catch (error) {
    handleError(error)
  }

};
