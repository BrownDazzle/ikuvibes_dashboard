"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addUpload, completeUpload } from '@/redux/features/uploadSlice';
import { AudioUploader } from '@/components/shared/AudioUploader';
import { filesFormSchema } from '@/lib/validator';
import * as z from 'zod';
import { Loader } from '@/components/ui/loader';
import { useUploadThing } from '@/lib/uploadthing';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { usePathname, useSearchParams } from 'next/navigation';
import { VideoUploader } from '@/components/shared/VideoUploader';
import { AlbumUploader } from '@/components/shared/AlbumUploader';

interface StepTwoProps {
    nextStep: () => void;
    prevStep: () => void;
    currentUpload: any;
    path?: string;
}

const StepTwo: React.FC<StepTwoProps> = ({ nextStep, prevStep, currentUpload }) => {
    const [audioFiles, setAudioFiles] = useState<File[]>([]);
    const [videoFiles, setVideoFiles] = useState<File[]>([])
    const [loading, setSetLoading] = useState(false);
    const pathname = useSearchParams();
    const path = pathname?.get("path")
    const dispatch = useDispatch();
    const form = useForm<z.infer<typeof filesFormSchema>>({
        resolver: zodResolver(filesFormSchema),
    });

    //const { startUpload } = useUploadThing('mediaPost')
    const { startUpload: startVideoUpload } = useUploadThing('videoUploader');
    const { startUpload: startAudioUpload } = useUploadThing('audioUploader');

    const handlePrevStep = () => {
        // Validate step one form inputs
        // Proceed to the next step if valid
        prevStep();
    };

    const onSubmit = async (values: z.infer<typeof filesFormSchema>) => {
        try {
            let uploadedAudioUrl
            let uploadedAlbumUrls
            let uploadedVideoUrl
            let type: string

            if (path === "album_upload" && audioFiles.length > 0) {
                setSetLoading(true)
                const categoryAlbum = "Album"
                const uploadedAudioUrls = await Promise.all(audioFiles.map(async (file, i) => {
                    const uploadedFile = await startAudioUpload([file]);
                    console.log("UPLOADED_FILE", uploadedFile)
                    return {
                        i: i,
                        name: file.name,
                        url: uploadedFile?.[0].url
                    };
                }));

                if (uploadedAudioUrls) {
                    console.log("ALBUM_FILES", uploadedAudioUrls)
                    uploadedAlbumUrls = uploadedAudioUrls as any;
                    dispatch(addUpload({ ...currentUpload, type: categoryAlbum, albumFiles: uploadedAlbumUrls }));
                    uploadedAlbumUrls && setSetLoading(false)
                    uploadedAlbumUrls && nextStep();
                }

            }
            if (path === "music_upload" && audioFiles.length > 0) {
                setSetLoading(true)
                const categorySingle = "Single"
                audioFiles.map(async (file) => {
                    const uploadedImages = await startAudioUpload([file]);

                    if (uploadedImages) {
                        uploadedAudioUrl = uploadedImages[0].url;
                        dispatch(addUpload({ ...currentUpload, type: categorySingle, audioUrl: uploadedAudioUrl }));
                        uploadedAudioUrl && setSetLoading(false)
                        uploadedAudioUrl && nextStep();
                    }
                })
            }

            if (path === "video_upload" && videoFiles.length > 0) {
                const categoryVideo = "Video"
                setSetLoading(true)
                videoFiles.map(async (file) => {
                    const uploadedVideo = await startVideoUpload([file]);

                    if (uploadedVideo) {
                        uploadedVideoUrl = uploadedVideo[0].url;
                        dispatch(addUpload({ ...currentUpload, type: categoryVideo, videoUrl: uploadedVideoUrl }));
                        uploadedVideoUrl && setSetLoading(false)
                        uploadedVideoUrl && nextStep();
                    }
                })
            }
            //Upload multiple audio files



        } catch (error) {
            console.error('Error uploading audio files:', error);
        }
    };

    const handleFileChange = (files: File[]) => {
        setAudioFiles(files);
    };

    const handleRemoveFile = (index: number) => {
        const updatedFiles = [...audioFiles];
        updatedFiles.splice(index, 1);
        setAudioFiles(updatedFiles);
    };

    return (
        <div>
            <h2 className="text-xl font-semibold text-slate-900">Step 2: Upload Audio Files</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 py-10 px-5">
                <div className="w-full flex flex-col justify-center gap-5 md:flex-row">
                    <div className="w-full">
                        {audioFiles.length === 1 ? <h2 className="text-xl font-semibold mb-4 text-slate-900">Selected Files</h2> : null}
                        {audioFiles.map((file, index) => (
                            <div className='container'>

                                <div key={index} className="flex justify-between px-5 py-2 items-center mt-2 bg-slate-900 rounded-md w-full">
                                    <span className='text-white'>{file.name}</span>
                                    <button onClick={() => handleRemoveFile(index)} className="ml-2 text-red-900">Remove</button>
                                </div>
                            </div>
                        ))}
                        <Form {...form}>
                            <div className="flex flex-col gap-5 pb-10 px-5">
                                <div className="w-full flex flex-col justify-center gap-5 md:flex-row">
                                    {path === "music_upload" && (<FormField
                                        control={form.control}
                                        name="audioUrl"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormControl className="h-72">
                                                    <AudioUploader
                                                        onFieldChange={field.onChange}
                                                        setAudioFiles={setAudioFiles}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />)}
                                    {path === "album_upload" && (<FormField
                                        control={form.control}
                                        name="albumUrl"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormControl className="h-72">
                                                    <AlbumUploader
                                                        onFieldChange={field.onChange}
                                                        setAudioFiles={setAudioFiles}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />)}
                                    {path === "video_upload" && (<FormField
                                        control={form.control}
                                        name="videoUrl"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormControl className="h-72">
                                                    <VideoUploader
                                                        onFieldChange={field.onChange}
                                                        videoUrl={field.value || ""}
                                                        setVideoFiles={setVideoFiles}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />)}
                                </div>
                            </div>
                        </Form>
                        <p className="container w-full bg-sl  ate-900 p-2 text-white rounded-xl">Uploading constitutes your acceptance of our Terms of Service and Privacy Policy. Uploading music is reserved for Artists, DJs, and Labels. Audiomack is not for storing or sharing your personal music collection or files. DO NOT upload any content which infringes on the rights of 3rd parties. Users who upload 3rd party content will be banned from Audiomack immediately.</p>
                    </div>

                </div>
                <div className="container flex justify-between gap-4">
                    <button onClick={handlePrevStep} disabled={form.formState.isSubmitting} className="button col-span-2 w-full bg-slate-900 text-white text-2xl">
                        Back
                    </button>
                    <button type="submit" disabled={form.formState.isSubmitting} className="button col-span-2 w-full bg-slate-900 text-white text-2xl">
                        {loading ? <Loader size={15} /> : 'Next'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StepTwo;
