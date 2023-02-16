import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, IconButton, MenuIcon, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import Sidebar from "../sidebar/Sidebar";

export default function BaseLayout({ children }) {
  const sidebarWidth = 15;
  return (
    <Box display="flex">
      <Box
        w={sidebarWidth + "vw"}
        bgColor="whitesmoke"
        py="20"
        px="5"
        boxShadow="dark-lg"
      >
        <Sidebar />
      </Box>
      <Box minH="100vh" w={100 - sidebarWidth + "vw"}>
        <Box h="5vh" bgColor="whitesmoke" boxShadow="dark-lg">
          <IconButton>
            <HamburgerIcon />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Box>
  );
}
