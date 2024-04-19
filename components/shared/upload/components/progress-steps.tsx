"use client"

import { Dispatch, SetStateAction, useState } from 'react';

interface StepsProps {
    step: number;
    setStep: Dispatch<SetStateAction<number>>;
}

const ProgressSteps = ({ step, setStep }: StepsProps) => {

    return (
        <div className="container w-full ">
            <div className="flex items-center justify-center space-x-4 mb-8">
                <div className={`w-8 h-8 rounded flex items-center justify-center ${step >= 1 ? 'bg-blue-500' : 'bg-gray-300'}`}>
                    <span className="text-white">1</span>
                </div>
                <div className={`w-8 h-8 rounded flex items-center justify-center ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`}>
                    <span className="text-white">2</span>
                </div>
                <div className={`w-8 h-8 rounded flex items-center justify-center ${step >= 3 ? 'bg-blue-500' : 'bg-gray-300'}`}>
                    <span className="text-white">3</span>
                </div>
                <div className={`w-8 h-8 rounded flex items-center justify-center ${step >= 4 ? 'bg-blue-500' : 'bg-gray-300'}`}>
                    <span className="text-white">4</span>
                </div>
            </div>
        </div>
    );
};

export default ProgressSteps;