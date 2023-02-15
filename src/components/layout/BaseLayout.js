import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import Sidebar from "../sidebar/Sidebar";

export default function BaseLayout({ children }) {
  const sidebarWidth = 15;
  return (
    <Box display="flex">
      <Box w={sidebarWidth + "vw"} bgColor="whitesmoke" py="20" px="5">
        <Sidebar />
      </Box>
      <Box p="10" minH="100vh" w={100 - sidebarWidth + "vw"}>
        {children}
      </Box>
    </Box>
  );
}
