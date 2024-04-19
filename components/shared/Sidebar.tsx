"use client"

import React, { Dispatch, SetStateAction } from 'react';

import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';

import { links } from '../../constants/data';
import { useStateContext } from '../../contexts/ContextProvider';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchParamProps } from '@/types/index';
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

interface BarProps {
    setPath: Dispatch<SetStateAction<string | null>>;
}
const Sidebar = ({ setPath }: BarProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

    const handleCloseSideBar = () => {
        if (activeMenu !== undefined && screenSize && screenSize <= 900) {
            setActiveMenu(false);
        }
    };

    const onSelectCategory = (path: string) => {
        let newUrl = '';

        if (path) {
            newUrl = formUrlQuery({
                params: searchParams?.toString(),
                key: 'path',
                value: path
            })
            setPath(path)
        } else {
            newUrl = removeKeysFromQuery({
                params: searchParams?.toString(),
                keysToRemove: ['path']
            })
        }

        router.push(newUrl, { scroll: false });
    }

    const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
    const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

    return (
        <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
            {activeMenu && (
                <>
                    <div className="flex justify-between items-center">
                        <Link href="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
                            <SiShopware /> <span>IkuVibes</span>
                        </Link>
                        <button
                            type="button"
                            onClick={() => setActiveMenu(!activeMenu)}
                            style={{ color: currentColor }}
                            className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
                        >
                            <MdOutlineCancel />
                        </button>
                    </div>
                    <div className="mt-10 cursor-pointer">
                        {links.map((item: any) => (
                            <div key={item.title}>
                                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                                    {item.title}
                                </p>
                                {item.links.map((link: any) => (
                                    <div

                                        key={link.name}
                                        onClick={() => onSelectCategory(link.path)}
                                        style={{ backgroundColor: link.path === `${link.name}` ? currentColor : '' }}
                                        className={link.path === `${link.name}` ? activeLink : normalLink}
                                    >
                                        {link.icon}
                                        <span className="capitalize">{link.name}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Sidebar;
