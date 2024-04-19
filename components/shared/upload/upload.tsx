"use client"
import CategoryCard from '@/components/ui/category-card';
import { useRouter } from 'next/navigation';
import React from 'react';

const UploadPage: React.FC = () => {
    const router = useRouter();

    const uploadFile = (path: string) => {
        router.push(`/upload/${path}`)
    }
    const uploadTypes = ["Song", "Album", "Video"]

    return (
        <div className="container min-h-screen flex flex-col justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-8">Upload Your Music</h1>
            <div className="container grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xl:gap-10 mb-10">
                {uploadTypes.map((typ, i) => (
                    <CategoryCard title={typ} />
                ))}
            </div>
            <p className="container w-full bg-blue-700 p-2 text-white rounded-xl">Uploading constitutes your acceptance of our Terms of Service and Privacy Policy. Uploading music is reserved for Artists, DJs, and Labels. Audiomack is not for storing or sharing your personal music collection or files. DO NOT upload any content which infringes on the rights of 3rd parties. Users who upload 3rd party content will be banned from Audiomack immediately.</p>
        </div>
    );
};

export default UploadPage;