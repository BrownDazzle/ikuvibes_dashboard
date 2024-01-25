import { NextResponse } from 'next/server';

import Genre from '@/lib/database/models/genre.model';
import { getAllGenres } from '@/lib/actions/genre.action';
import Event from '@/lib/database/models/event.model';
import { getEvents } from '@/lib/actions/event.actions';

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(
    req: Request
) {
    try {

        const data = await getEvents();

        return NextResponse.json(data, {
            headers: corsHeaders
        });
    } catch (error) {
        console.log('[ALL_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};
