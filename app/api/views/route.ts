import { NextResponse } from 'next/server';

import { increaseEventViews } from '@/lib/actions/event.actions';

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


        const data = await increaseEventViews(params.id);

        return NextResponse.json(data, {
            headers: corsHeaders
        });
    } catch (error) {
        console.log('[ALL_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};
