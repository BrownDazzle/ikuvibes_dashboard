"use client"

import React, { useEffect } from 'react';
import { FiSettings } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useStateContext } from '../contexts/ContextProvider';
import Sidebar from '../components/shared/Sidebar';
import Navbar from '../components/shared/Navbar';
import Ecommerce from '../components/shared/Ecommerce';

//import { withRouter, NextRouter } from 'next/router';
import { useParams } from 'next/navigation';
import Footer from './shared/Footer';
import { SearchParamProps } from '@/types/index';
import CategoryFilter from './shared/CategoryFilter';
import OrdersPage from './shared/Orders/orders';
import { IOrder } from "@/lib/database/models/order.model";
import VideoUploadForm from './shared/YoutubeUploader';
import MusicForm from './shared/MusicUploader';

// ...

interface IndexComponentProps {
    searchParams: SearchParamProps,
    orders: IOrder
}

const IndexComponent: React.FC<IndexComponentProps> = () => {
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
    const analyticsData = [30, 50, 20, 80, 45];
    const analyticsLabels = ['Song 1', 'Song 2', 'Song 3', 'Song 4', 'Song 5'];

    useEffect(() => {
        const currentThemeColor = localStorage.getItem('colorMode');
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, []);

    return (
        <div className={currentMode === 'Dark' ? 'dark' : ''}>
            <div className="flex relative dark:bg-main-dark-bg">
                <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                    <button
                        type="button"
                        onClick={() => setThemeSettings(true)}
                        style={{ background: currentColor, borderRadius: '50%' }}
                        className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                    >
                        <FiSettings />
                    </button>
                </div>

                {activeMenu ? (
                    <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                        <Sidebar />
                    </div>
                ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                        <Sidebar />
                    </div>
                )}
                <div
                    className={
                        activeMenu
                            ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                            : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                    }
                >
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                        <Navbar />
                    </div>
                    <div>
                        {/*{themeSettings && <ThemeSettings />}*/}

                        {(
                            <>
                                <Ecommerce />
                                <MusicForm />
                                <VideoUploadForm />
                            </>
                        )}
                        <Footer />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default IndexComponent;
