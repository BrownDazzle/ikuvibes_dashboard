"use client"

import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart, FiUpload } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { useStateContext } from '../../contexts/ContextProvider';
import Image from 'next/image';
import Upload from './Upload';
import MobileNav from './MobileNav';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import Button from '../ui/sign-button';
import Avatar from '../ui/Avatar';
import { SafeUser } from '@/types';
import MenuItem from '../ui/MenuItem';

interface NavButtonProps {
  title: string;
  customFunc: () => void;
  icon: React.ReactNode;
  color: string;
  dotColor?: string;
}

const NavButton: React.FC<NavButtonProps> = ({ title, customFunc, icon, color, dotColor }) => (

  <button
    type="button"
    onClick={() => customFunc()}
    style={{ color }}
    className="relative text-xl rounded-full p-3 hover:bg-light-gray"
  >
    <span
      style={{ background: dotColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
    />
    {icon}
  </button>
);

const Navbar: React.FC = () => {
  const { data: session } = useSession()
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);



  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);


  useEffect(() => {
    if (screenSize && screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
      <div className="flex">
        {/*<NavButton title="Upload" customFunc={() => router.push("/events/create")} color={currentColor} icon={<FiUpload />} />
        <NavButton title="Chat" dotColor="#03C9D7" customFunc={() => handleClick('chat')} color={currentColor} icon={<BsChatLeft />} />
  <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => signIn("google")} color={currentColor} icon={<RiNotification3Line />} />*/}

        {!session?.user ? (
          <>
            <Button
              outline
              small={true}
              label="SignIn"
              onClick={() => signIn("google")}
            />
          </>
        ) : (
          <div className="flex items-center" onClick={toggleOpen}>
            <Avatar user={session?.user as SafeUser} />
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        )}
        <MobileNav />



        {isClicked?.cart && (<Upload />)}
        {/* {isClicked?.addProduct && (<AddProduct />)}
        {isClicked?.chat && (<Chat />)}
        {isClicked?.notification && (<Notification />)}
  {isClicked?.userProfile && (<UserProfile />)}*/}
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl 
            shadow-md
            bg-white 
            overflow-hidden 
            right-0 
            top-20 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {session?.user ? (
              <>
                <MenuItem
                  label="Logout"
                  onClick={() => signOut()}
                />
              </>
            ) : null}
          </div>
        </div>
      )
      }
    </div>
  );
};

export default Navbar;
