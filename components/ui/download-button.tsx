"use client"
import React from 'react';

const DownloadButton: React.FC = () => {
    const handleDownload = () => {
        // Replace '/path/to/your/file.pdf' with the actual path to your downloadable file.
        const fileUrl = '/audio/brown.mp3';

        // Create a link element
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'brown.mp3'; // Set the desired file name for download
        document.body.appendChild(link);

        // Trigger the click event on the link
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
    };

    return (
        <button
            className="bg-slate-900 hover:bg-slate-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline rounded-full my-5"
            onClick={handleDownload}
        >
            Download
        </button>
    );
};

export default DownloadButton;
