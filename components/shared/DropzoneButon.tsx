"use client";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";

import { UploadDropzone } from "@uploadthing/react";

import { OurFileRouter } from "../../app/api/uploadthing/core";

import { Dispatch, SetStateAction, useState } from 'react'
import Link from "next/link"

type FileUploaderProps = {
    setFiles: Dispatch<SetStateAction<File[]>>
}

export default function DropzoneButton({ setFiles }: FileUploaderProps) {
    const [images, setImages] = useState<{
        fileUrl: string;
        fileKey: string;
    }[]>([])

    const title = images.length ? (
        <>
            <p>Upload Complete!</p>
            <p className="mt-2">{images.length} files</p>
        </>
    ) : null

    const imgList = (
        <>
            {title}
            <ul>
                {images.map(image => (
                    <li key={image.fileUrl} className="mt-2">
                        <Link href={image.fileUrl} target="_blank">
                            {image.fileUrl}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )

    return (
        <main className="flex flex-col items-center justify-start">
            <UploadDropzone<OurFileRouter>
                endpoint="mediaPost"
                onClientUploadComplete={(res) => {
                    // Do something with the response
                    setImages(res)
                    setFiles(res)
                    const json = JSON.stringify(res)
                    // Do something with the response
                    console.log(json);
                    console.log("Files: ", res);
                    alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                }}
                onUploadBegin={(name) => {
                    // Do something once upload begins
                    console.log("Uploading: ", name);
                }}
            />
            {imgList}
        </main>
    );
}