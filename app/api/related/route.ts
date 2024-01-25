import { getAllEvents } from '@/lib/actions/event.actions';
import { connectToDatabase } from '@/lib/database';
import Category from '@/lib/database/models/category.model';
import Event from '@/lib/database/models/event.model';
import Genre from '@/lib/database/models/genre.model';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}


const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: 'i' } })
}

const getGenreByName = async (name: string) => {
  return Genre.findOne({ name: { $regex: name, $options: 'i' } })
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
) {
  try {
    const { searchParams } = new URL(req.url)

    const categoryId = searchParams.get('categoryId') || undefined;
    const eventId = searchParams.get('eventId') || undefined;
    const page = searchParams.get('page');
    const limitString = searchParams.get('limit') || null;

    // Convert limitString to a number or use a default value if it's null or not a valid number
    const limit = limitString ? parseInt(limitString, 10) : 1;

    await connectToDatabase();

    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { $and: [{ category: categoryId }, { _id: { $ne: eventId } }] }

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const events = await populateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)

    return NextResponse.json({ data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }, {
      headers: corsHeaders
    });
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
