import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventFormSchema } from "@/lib/validator"
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
import { usePathname, useRouter } from "next/navigation"
import { createEvent, updateEvent } from "@/lib/actions/event.actions"
import GenreDropdown from "@/components/shared/dropdown-genre"
import { AudioUploader } from "@/components/shared/AudioUploader"
import { useSession } from "next-auth/react"
import { useDispatch, useSelector } from 'react-redux';
import { startUpload, updateProgress, uploadSuccess, uploadError, completeUpload } from '../../../../redux/features/uploadSlice';
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation"
import { BsThreeDotsVertical } from "react-icons/bs"
import { IoMdClose } from "react-icons/io"
import { cn } from "@/lib/utils"
import MenuItem from "@/components/ui/MenuItem"
import { Upload } from "lucide-react"
import UploadCard from "@/components/ui/upload-card"
import { useSearchParams } from "next/navigation"

interface StepThreeProps {
    prevStep: () => void;
    nextStep: () => void;
    currentUpload: any;
}

const StepThree: React.FC<StepThreeProps> = ({ nextStep, prevStep, currentUpload }) => {
    const { uploading, progress, files, error } = useSelector((state: any) => state.upload);
    const { activeSong, isPlaying } = useSelector((state: any) => state.player);
    const pathname = useSearchParams();
    const path = pathname?.get("path")
    const [audioFiles, setAudioFiles] = useState<File[]>([])
    const [dropdown, setDropdown] = useState(false)

    const handleMenu = (state: boolean) => {
        setDropdown(!state)
    }
    const router = useRouter();

    //const { startUpload } = useUploadThing('mediaPost')
    const { startUpload: startImageUpload } = useUploadThing('imageUploader');
    const { startUpload: startAudioUpload } = useUploadThing('audioUploader');

    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
    })

    const dispatch = useDispatch();

    const handleUpload = () => {
        dispatch(startUpload());
        console.log("CURRENT_DATA", currentUpload)
        // Simulated upload progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            dispatch(updateProgress(progress));
            if (progress === 100) {
                clearInterval(interval);
                dispatch(uploadSuccess());
            }
        }, 1000);
    };



    const onSubmit = async () => {
        handleUpload(); // Progress upload

        try {

            const newEvent = await createEvent({
                // userId: "",
                event: currentUpload,
                path: '/profile'
            })

            if (newEvent) {

                nextStep();
                dispatch(completeUpload())

            }
        } catch (error) {
            console.log(error);
        }
    }
    const handlePrevStep = () => {
        prevStep();
    };

    return (
        <div className="flex flex-col justify-center w-full max-w-[900px]">
            <h2 className="text-xl font-semibold mb-4 text-white">Step 3: Review & Submit</h2>
            <div className="flex md:flex-row flex-col gap-2 rounded-xl shadow-md w-full  my-10">
                {/* Image & actions */}
                <div className="relative group overflow-hidden rounded-md h-[400px] basis-1/3">
                    <img
                        className="w-full h-full object-cover"
                        src={currentUpload?.imageUrl}
                        alt={currentUpload?.title}
                    />
                </div>
                {/* Description */}
                <div className="basis-2/3 flex flex-col gap-1 px-2 gap-3 items-center w-full container">
                    <div className="relative w-full">
                        <div className="w-full flex flex-row justify-between mb-4">
                            <div className="flex flex-col cursor-pointer">
                                <p className={cn(`w-full font-bold text-2xl text-blue-700 truncate`)}>{currentUpload?.artist}</p>
                            </div>
                        </div>
                        <p className="shadow-lg py-2 px-3 rounded-md text-white bg-blue-700">{currentUpload?.description}</p>
                        <hr className="h-[2px] text-blue-700 mx-10 my-5" />
                        <div className="flex flex-col w-full h-auto rounded-md p-4 gap-3 shadow-lg shadow-blue-500 py-2 px-3 rounded-md bg-blue-700">
                            {path === "album_upload" && currentUpload?.albumFiles?.map((file: any) => (
                                <UploadCard song={file} activeSong={activeSong} isPlaying={isPlaying} />
                            ))}
                            {path === "music_upload" && (
                                <UploadCard song={{ name: currentUpload?.title, i: 0 }} activeSong={activeSong} isPlaying={isPlaying} />
                            )}
                            {path === "video_upload" && (
                                <UploadCard song={{ name: currentUpload?.title, i: 0 }} activeSong={activeSong} isPlaying={isPlaying} />
                            )}
                        </div>
                        {dropdown && (
                            <div
                                className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-auto 
            bg-white 
            overflow-hidden 
            right-0 
            top-10 
            text-sm
            z-10
          "
                            >
                                <div className="flex flex-col cursor-pointer">
                                    <>
                                        <MenuItem
                                            label="Like"
                                            onClick={() => router.push(`/orders`)}
                                        />
                                        <MenuItem
                                            label="Add Playlist"
                                            onClick={() => router.push(`/purchases`)}
                                        />

                                    </>
                                </div>

                            </div>
                        )}
                    </div>

                </div>
            </div >
            <div className="container flex justify-between gap-4">
                <button onClick={handlePrevStep}
                    disabled={form.formState.isSubmitting}
                    className="button col-span-2 w-full bg-blue-500 text-white text-2xl"
                >
                    Back</button>
                <Button
                    disabled={form.formState.isSubmitting}
                    className="button col-span-2 w-full bg-blue-500 text-white text-2xl"
                    onClick={onSubmit}
                >
                    {uploading ? (
                        <p>Uploading... {progress}%</p>
                    ) : `Upload `}</Button>
            </div>

        </div>
    );
};

export default StepThree;
