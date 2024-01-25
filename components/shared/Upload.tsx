import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import { useStateContext } from '../../contexts/ContextProvider';
import EventForm from './EventForm';
import { auth } from '@clerk/nextjs';
import Button from '../ui/u-button';

interface UploadProps {
    userId?: string | undefined
}

const Upload: React.FC<UploadProps> = ({ userId }) => {

    const { currentColor } = useStateContext();

    return (
        <div className="bg-black opacity-75 w-full fixed nav-item top-0 right-0 ">
            <div className="float-right h-auto overflow-y-scroll bg-white duration-1000 ease-in-out dark:text-gray-200 transition-all dark:bg-[#484B52] bg-white md:w-700 p-8 ">
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-lg">File Upload</p>
                    <Button
                        icon={<MdOutlineCancel />}
                        color="rgb(153, 171, 180)"
                        bgHoverColor="light-gray"
                        size="2xl"
                        borderRadius="50%"
                    />
                </div>
                <EventForm userId={userId as string} type="Create" />
            </div>
        </div>
    );
};

export default Upload;
