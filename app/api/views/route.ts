import { NextResponse } from 'next/server';

import { increaseEventViews } from '@/lib/actions/event.actions';
import Event from '@/lib/database/models/event.model';
import { connectToDatabase } from '@/lib/database';
import { ObjectId } from 'mongodb';

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        if (!params.id) {
            return new NextResponse("Id is required", { status: 400 });
        }

        await connectToDatabase();

        const existingPageView = await Event.findOne({ _id: params.id });

        if (existingPageView) {
            // If page view record exists, increment count
            existingPageView.views += 1;
            await existingPageView.save();
            return existingPageView.views;
        } else {
            // If no record exists, create a new one
            const newPageView = await Event.findByIdAndUpdate(new ObjectId(params.id), { $inc: { views: 1 } });
            await newPageView.save();
            return NextResponse.json(newPageView.count, {
                headers: corsHeaders
            });
        }
    } catch (error) {
        console.log('[ALL_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};
