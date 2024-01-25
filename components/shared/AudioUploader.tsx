'use client'

import { useCallback, Dispatch, SetStateAction } from 'react'
import type { FileWithPath } from '@uploadthing/react'
import { useDropzone } from '@uploadthing/react/hooks'
import { generateClientDropzoneAccept } from 'uploadthing/client'

import { Button } from '@/components/ui/button'
import { convertFileToUrl } from '@/lib/utils'

type FileUploaderProps = {
    onFieldChange: (url: string) => void
    audioUrl: string
    setAudioFiles: Dispatch<SetStateAction<File[]>>
}

export function AudioUploader({ audioUrl, onFieldChange, setAudioFiles }: FileUploaderProps) {
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setAudioFiles(acceptedFiles)
        onFieldChange(convertFileToUrl(acceptedFiles[0]))
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'audio/*' ? generateClientDropzoneAccept(['audio/*']) : undefined,
    })

    return (
        <div
            {...getRootProps()}
            className="flex-center bg-dark-3 flex h-15 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50">
            <input {...getInputProps()} className="cursor-pointer" />
            <div className="flex-center flex-col py-5 text-grey-500">
                <audio src={audioUrl} controls />
                <h3 className="mb-2 mt-2">Drag audio here</h3>
                <p className="p-medium-12 mb-4">MP3</p>
                {/*<Button type="button" className="rounded-full">
                    Select from computer
    </Button>*/}
            </div>
        </div>
    )
}
