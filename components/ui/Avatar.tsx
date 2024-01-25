'use client';

import { SafeUser } from "@/types";
import Image from "next/image";

interface AvatarProps {
  user: SafeUser | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const imageUrl = user?.picture?.data?.url
  return (
    <Image
      className="rounded-full"
      height="35"
      width="35"
      alt="Avatar"
      src={user?.image || imageUrl || '/user.png'}
    />
  );
}

export default Avatar;