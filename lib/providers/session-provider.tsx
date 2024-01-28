"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
    children: ReactNode;
    session: any; // Assuming you are using the Session type from next-auth
}

const Provider = (props: Props) => {
    return <SessionProvider session={props.session}>{props.children}</SessionProvider>;
}

export default Provider