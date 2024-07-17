import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";


// Define types for the main navigation items
export interface NavItem {
    title: string;
    path: string;
    icon: JSX.Element;
    iconClosed?: JSX.Element;
    iconOpened?: JSX.Element;
}

// Define the SidebarData array using the NavItem type
export const SidebarData: NavItem[] = [
    {
        title: "Home",
        path: "/home",
        icon: <FaIcons.FaHome />,
    },
    {
        title: "Users",
        path: "/home/users",
        icon: <FaIcons.FaUsers />,
    },
    {
        title: "Settings",
        path: "/home/settings",
        icon: <FaIcons.FaCog />,
    },
    {
        title: "Logout",
        path: "/",
        icon: <IoIcons.IoMdLogOut />,
    },
];
