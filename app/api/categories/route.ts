import { NextResponse } from 'next/server';

import Category from '@/lib/database/models/category.model';
import { getAllCategories } from '@/lib/actions/category.actions';

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

        const categories = await getAllCategories();

        return NextResponse.json(categories, {
            headers: corsHeaders
        });
    } catch (error) {
        console.log('[CATEGORIES_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};
