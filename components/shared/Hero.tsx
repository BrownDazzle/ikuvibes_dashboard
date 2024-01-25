// components/MusicHero.tsx
import React from 'react';

const MusicHero: React.FC = () => {
    return (
        <div className="relative md:h-[50vh] h-[40vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("/assets/images/hero.png")' }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="text-center z-10">
                <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-4">Discover the Magic of Music</h1>
                <p className="text-md md:text-lg text-gray-300 mb-8">Explore a world of melodies and rhythms</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Get Started</button>
            </div>
        </div>
    );
};

export default MusicHero;
