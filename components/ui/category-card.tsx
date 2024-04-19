"use client"

import React from 'react';
import { FaRegEye } from 'react-icons/fa';
import { HiCloudDownload } from 'react-icons/hi';
import { IoMusicalNotes } from "react-icons/io5";

interface CategoryCardProps {
    image?: string;
    title: string;
    href?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ image, title, href }) => {
    return (
        <>
            <a href={href} className="relative flex flex-col justify-between overflow-hidden bg-black bg-opacity-20 rounded-lg shadow-lg shadow-white w-full max-w-64 h-64 py-5 px-5">
                {/* Category Image */}
                <IoMusicalNotes
                    className="object-cover object-center h-34 w-34 rounded-full opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-transparent to-transparent opacity-0 opacity-80 transition-opacity duration-300"></div>
                {/* Content */}
                <div className="flex flex-col justify-center items-center w-full">
                    {/* Category Title */}

                    {/* Category Description */}
                    {/* Explore Button */}
                    <div className="flex flex-row gap-y-5 justify-between ml-2 w-full">
                        <p className="flex flex-row gap-2 text-xs text-blue-900">54k <FaRegEye /></p>
                        <p className="flex flex-row gap-2 text-xs text-blue-900">12k <HiCloudDownload /></p>
                    </div>
                    <p className="mt-4 bg-blue-500 text-white hover:bg-blue-400 mx-2 py-1 px-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 text-sm font-semibold">Upload {title}</p>
                </div>
            </a>
        </>
    );
};

export default CategoryCard;
