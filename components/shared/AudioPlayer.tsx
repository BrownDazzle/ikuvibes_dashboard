"use client"

import { IEvent } from '@/lib/database/models/event.model';
import { PauseCircleIcon, PlayCircleIcon, StopCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

type CardProps = {
    audioFile: IEvent,
}

const MusicPlayer = ({ audioFile }: CardProps) => {
    const playBtnRef = useRef<HTMLImageElement>(null);
    const stopBtnRef = useRef<HTMLImageElement>(null);
    const volumeBtnRef = useRef<HTMLImageElement>(null);

    const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
    const [mute, setMute] = useState(true);
    const [playPause, setPlayPause] = useState(true);

    useEffect(() => {
        // Initialize WaveSurfer on component mount
        const wavesurferInstance = WaveSurfer.create({
            container: '#waveform',
            waveColor: '#e3bbee',
            progressColor: '#fe38ab',
            barWidth: 3,
            hideScrollbar: true,
            barRadius: 3,
            url: '/audio/brown.mp3'
        });

        setWavesurfer(wavesurferInstance);

        // Load an audio file
        // wavesurferInstance.load('/brown.mp3');

        // Handle play/pause state
        wavesurferInstance.on('play', () => {
            if (playBtnRef.current) {
                playBtnRef.current.src = '/pause.png';
            }
        });

        wavesurferInstance.on('pause', () => {
            if (playBtnRef.current) {
                playBtnRef.current.src = '/play.png';
            }
        });

        // Clean up on component unmount
        return () => wavesurferInstance.destroy();
    }, []);

    const handlePlayPause = () => {
        if (wavesurfer) {
            wavesurfer.playPause();
            setPlayPause(!playPause)
        }
    };

    const handleStop = () => {
        if (wavesurfer) {
            wavesurfer.stop();
            if (playBtnRef.current) {
                playBtnRef.current.src = '/play.png';
            }
        }
    };

    const handleToggleMute = () => {
        if (wavesurfer) {
            wavesurfer.setMuted(!mute);
            if (volumeBtnRef.current) {
                volumeBtnRef.current.src = mute ? '/mute.png' : '/volume.png';
            }
        }
    };

    return (
        <div className="">

            <div className=' h-24 bg-neutral-800 border-t border-neutral-700 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8 rounded-xl'>

                <div className=' items-center space-x-4 w-full'>
                    <div id="waveform" className="w-full h-18"></div>
                </div>
                <div className='flex items-center justify-center'>
                    {!playPause ? <div onClick={handlePlayPause}
                        ref={playBtnRef}><PauseCircleIcon className='h-10 w-10' />
                    </div> : <div onClick={handlePlayPause}
                        ref={playBtnRef}><PlayCircleIcon className='h-10 w-10' />
                    </div>}
                    <div onClick={handleStop}
                    ><StopCircle className='h-10 w-10' />
                    </div>
                    <img
                        src="/stop.png"
                        alt="stop"
                        id="stopBtn"
                        title="Stop"
                        className="h-5 cursor-pointer "
                        onClick={handleStop}
                        ref={volumeBtnRef}
                    />
                    <img
                        src="/volume.png"
                        alt="volume"
                        id="volumeBtn"
                        title="Mute / Unmute"
                        className="h-5 cursor-pointer"
                        onClick={handleToggleMute}
                        ref={volumeBtnRef}
                    />

                </div>

            </div>
        </div >
    );
};

export default MusicPlayer;
