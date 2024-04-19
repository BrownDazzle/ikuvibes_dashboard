"use client";

import { useRouter } from "next/navigation";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { playPause, setActiveSong } from '@/redux/features/playerSlice';
import { cn } from "@/lib/utils";
import { FaCross, FaRegEye, FaTractor, FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import MenuItem from "@/components/ui/MenuItem";
import { IoMdClose } from "react-icons/io";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
import { BsThreeDotsVertical } from "react-icons/bs";

interface UploadCardProps {
    song: any,
    isPlaying: boolean,
    activeSong: any,
    data?: any,
    i?: any
}

const UploadCard: React.FC<UploadCardProps> = ({
    song, isPlaying, activeSong, data, i
}) => {
    const [dropdown, setDropdown] = useState(false)
    const router = useRouter();
    const dispatch = useDispatch();

    const handlePauseClick = () => {
        dispatch(playPause(false));
    };

    const handlePlayClick = () => {
        dispatch(setActiveSong({ song, data, i }));
        dispatch(playPause(true));
    };

    const handleMenu = (state: boolean) => {
        setDropdown(!state)
    }

    return (
        <div className="flex gap-2 rounded-xl shadow-md w-full h-full bg-white items-center">
            {/* Image & actions */}
            <div className="relative group overflow-hidden rounded-md h-[60px] w-[60px]">
                <p
                    className="flex justify-center items-center h-full w-full bg-white text-orange-700 text-3xl font-bold"

                >{song?.i + 1}</p>
                <div className={cn(`absolute flex justify-center items-center inset-0 bg-black opacity-0 group-hover:opacity-75 ${isPlaying && activeSong?.name === song?.name ? "opacity-75" : null} transition-opacity`)}>
                    <div className='flex flex-row gap-4 items-center'>
                        <button onClick={() => isPlaying && activeSong?.name === song?.name ? handlePauseClick() : handlePlayClick()} className="text-white">
                            {isPlaying ? <CiPause1 size={40} /> : <CiPlay1 size={40} />}
                        </button>
                    </div>
                </div>
            </div>
            {/* Description */}
            <div className="flex flex-col gap-1 px-2 gap-3 items-center w-full h-full">
                <div className="relative w-full h-full">
                    <div className="w-full flex flex-row justify-between items-center h-full">
                        <div className="flex flex-col items-center cursor-pointer">
                            <p className={cn(`w-full font-bold text-lg text-orange-900 truncate`)}>{song?.name}</p>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <DeleteConfirmation eventId={song?._id} />
                            <div onClick={() => handleMenu(dropdown)} className={`inset-0 justify-center items-center bg-opacity-50 group-hover:flex rounded-full cursor-pointer`}>
                                {!dropdown ? (<BsThreeDotsVertical size={24} />) : (<IoMdClose size={24} />)}
                            </div>
                        </div>
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
    );
}

export default UploadCard;
