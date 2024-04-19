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

interface StepFourProps {
    prevStep: () => void;
}

const StepFour: React.FC<StepFourProps> = ({ prevStep }) => {
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




    const handlePrevStep = () => {
        prevStep();
    };

    return (
        <div className="flex flex-col justify-center w-full max-w-[900px]">
            <h2 className="text-xl font-semibold mb-4 text-black">Step 4: Succefully Uploaded.!</h2>
            <div className="flex md:flex-row flex-col gap-2 rounded-xl shadow-md w-full  my-10">
                {/* Image & actions */}
                <div className="relative group overflow-hidden rounded-md h-[400px] basis-1/3">
                    <img
                        className="w-full h-full object-cover"
                        src="/"
                        alt=""
                    />
                </div>
                {/* Description */}
                <div className="basis-2/3 flex flex-col gap-1 px-2 gap-3 items-center w-full container">
                    <div className="relative w-full">
                        <div className="w-full flex flex-row justify-between mb-4">
                            <div className="flex flex-col cursor-pointer">
                                <p className={cn(`w-full font-bold text-2xl text-blue-700 truncate`)}>Successfully Uploaded</p>
                            </div>
                        </div>
                        <p className="shadow-lg py-2 px-3 rounded-md text-white bg-blue-700">Go to home.!</p>
                        <hr className="h-[2px] text-blue-700 mx-10 my-5" />

                    </div>

                </div>
            </div >
        </div>
    );
};

export default StepFour;
