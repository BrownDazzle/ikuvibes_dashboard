import { NextResponse } from 'next/server';

import Genre from '@/lib/database/models/genre.model';
import { getAllGenres } from '@/lib/actions/genre.action';

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

        const genres = await getAllGenres();

        return NextResponse.json(genres, {
            headers: corsHeaders
        });
    } catch (error) {
        console.log('[genres_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};
