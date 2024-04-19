"use client"

import { useState } from 'react';
import StepOne from './components/step-1';
import StepTwo from './components/step-2';
import StepThree from './components/step-3';
import ProgressSteps from './components/progress-steps';
import { useSelector } from 'react-redux';
import StepFour from './components/step-4';

interface SongProps {
    path: string
}

const SongForm = ({ path }: SongProps) => {
    const currentUpload = useSelector((state: any) => state.upload.currentUpload);
    const [files, setFiles] = useState<File[]>([])
    const [audioFiles, setAudioFiles] = useState<File[]>([])

    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    return (
        <div className="container min-h-screen max-w-full mx-auto p-4 pt-20 md:px-20">
            <ProgressSteps step={step} setStep={setStep} />
            {step === 1 && <StepOne nextStep={nextStep} />}
            {step === 2 && <StepTwo nextStep={nextStep} prevStep={prevStep} currentUpload={currentUpload} path={path} />}
            {step === 3 && <StepThree nextStep={nextStep} prevStep={prevStep} currentUpload={currentUpload} />}
            {step === 4 && <StepFour prevStep={prevStep} />}
        </div>
    );
};

export default SongForm;