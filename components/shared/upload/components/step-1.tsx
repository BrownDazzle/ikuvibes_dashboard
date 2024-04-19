// components/StepOne.tsx
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { detailsFormSchema } from "@/lib/validator"
import * as z from 'zod'
import { eventDefaultValues } from "@/constants"
import Dropdown from "@/components/shared/Dropdown"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "@/components/shared/FileUploader"
import { useState, useEffect } from "react"
import Image from "next/image"
import DatePicker from "react-datepicker";
import { useUploadThing } from '@/lib/uploadthing'

import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import GenreDropdown from "@/components/shared/dropdown-genre"
import { AudioUploader } from "@/components/shared/AudioUploader"
import { useSession } from "next-auth/react"
import { useDispatch, useSelector } from "react-redux"
import { addUpload, } from "@/redux/features/uploadSlice"
import { Loader } from "@/components/ui/loader"


interface StepOneProps {
    nextStep: () => void;
}

const StepOne: React.FC<StepOneProps> = ({ nextStep }) => {
    const [files, setFiles] = useState<File[]>([])
    const currentUpload = useSelector((state: any) => state.upload.currentUpload);
    const dispatch = useDispatch()
    const router = useRouter();

    //const { startUpload } = useUploadThing('mediaPost')
    const { startUpload: startImageUpload } = useUploadThing('imageUploader');
    const { startUpload: startAudioUpload } = useUploadThing('audioUploader');

    const form = useForm<z.infer<typeof detailsFormSchema>>({
        resolver: zodResolver(detailsFormSchema),
    })


    const onSubmit = async (values: z.infer<typeof detailsFormSchema>) => {
        let uploadedImageUrl = values.imageUrl;

        if (files.length > 0) {

            const uploadedImages = await startImageUpload(files);

            if (uploadedImages) {
                uploadedImageUrl = uploadedImages[0].url;
            }
        }

        try {
            dispatch(addUpload({ ...values, imageUrl: uploadedImageUrl }))
            currentUpload && nextStep()
        } catch (error) {
            console.log(error);
        }
    }

    const handleNextStep = () => {
        // Validate step one form inputs
        // Proceed to the next step if valid
        nextStep();
    };

    return (
        <div className="container w-full">
            <h2 className="text-xl font-semibold mb-4 text-white">Step 1: Enter Details</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 py-10 px-5">
                    <div className="flex flex-col gap-5 md:flex-row">
                        <div className="basis-1/3">
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
                        <div className="basis-2/3 space-y-4">
                            <FormField
                                control={form.control}
                                name="artist"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input placeholder="Artis name" {...field} className="input-field" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="artist"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input placeholder="Features" {...field} className="input-field" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                        </div>
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
                    </div>
                    <div className="flex flex-col gap-5 md:flex-row">


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
                        disabled={form.formState.isSubmitting}
                        className="button col-span-2 w-full bg-blue-500 text-white text-2xl"
                    >
                        {form.formState.isSubmitting ? (
                            <Loader size={15} />
                        ) : `Next `}</Button>
                </form>
            </Form>
            {/*<button onClick={handleNextStep} className="btn btn-primary">Next</button>*/}
        </div>
    );
};

export default StepOne;
