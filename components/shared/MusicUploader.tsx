"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventFormSchema } from "@/lib/validator"
import * as z from 'zod'
import { eventDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "./FileUploader"
import { useState, useEffect } from "react"
import Image from "next/image"
import DatePicker from "react-datepicker";
import { useUploadThing } from '@/lib/uploadthing'

import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox"
import { useRouter } from "next/navigation"
import { createEvent, updateEvent } from "@/lib/actions/event.actions"
import { IEvent } from "@/lib/database/models/event.model"
import { getAllCategories } from "@/lib/actions/category.actions"
import { ICategory } from "@/lib/database/models/category.model"
import { getAllGenres } from "@/lib/actions/genre.action"
import { IGenre } from "@/lib/database/models/genre.model"
import GenreDropdown from "./dropdown-genre"
import { VideoUploader } from "./VideoUploader"
import { AudioUploader } from "./AudioUploader"


const MusicForm = () => {
    const [files, setFiles] = useState<File[]>([])
    const [audioFiles, setAudioFiles] = useState<File[]>([])

    const router = useRouter();

    //const { startUpload } = useUploadThing('mediaPost')
    const { startUpload: startImageUpload } = useUploadThing('imageUploader');
    const { startUpload: startAudioUpload } = useUploadThing('audioUploader');

    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
    })


    const onSubmit = async (values: z.infer<typeof eventFormSchema>) => {
        let uploadedImageUrl = values.imageUrl;
        let uploadedAudioUrl = values.audioUrl;
        console.log("UPFiles", { files: uploadedImageUrl, Files: uploadedAudioUrl })

        if (files.length > 0) {

            const uploadedImages = await startImageUpload(files);
            console.log("UPImg", uploadedImages);
            if (uploadedImages) {
                uploadedImageUrl = uploadedImages[0].url;
            }

        }

        if (audioFiles.length > 0) {

            const uploadedImages = await startAudioUpload(audioFiles);
            console.log("UPImg", uploadedImages);
            if (uploadedImages) {
                uploadedAudioUrl = uploadedImages[0].url;
            }

        }

        try {
            const newEvent = await createEvent({
                event: { ...values, imageUrl: uploadedImageUrl, audioUrl: uploadedAudioUrl },
                path: '/profile'
            })

            if (newEvent) {
                form.reset();
                router.push(`/events/${newEvent._id}`)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 py-10 px-5">
                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="File title" {...field} className="input-field" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Dropdown onChangeHandler={field.onChange} value={field.value} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>


                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="h-72">
                                    <Textarea placeholder="Description" {...field} className="textarea rounded-2xl" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="h-72">
                                    <FileUploader
                                        onFieldChange={field.onChange}
                                        imageUrl={field.value}
                                        setFiles={setFiles}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="genre"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <GenreDropdown onChangeHandler={field.onChange} value={field.value} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="audioUrl"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="h-72">
                                    <AudioUploader
                                        onFieldChange={field.onChange}
                                        audioUrl={field.value}
                                        setAudioFiles={setAudioFiles}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/*  <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/genre-grey.svg"
                        alt="calendar"
                        width={24}
                        height={24}
                      />

                      <Input placeholder="Event genre or Online" {...field} className="input-field" />
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />*/}
                </div>
                <Button
                    type="submit"
                    size="lg"
                    disabled={form.formState.isSubmitting}
                    className="button col-span-2 w-full"
                >
                    {form.formState.isSubmitting ? (
                        'Submitting...'
                    ) : `Upload `}</Button>
            </form>
        </Form>
    )
}

export default MusicForm