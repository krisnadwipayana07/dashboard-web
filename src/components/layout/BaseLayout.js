import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";

export default function BaseLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Box display="flex">
      <Box
        hidden={!isOpen}
        w="14em"
        boxShadow="dark-lg"
        borderRight="2px solid #E1EEDD"
      >
        <Sidebar />
      </Box>
      <Box minH="100vh" w={100 + "vw"}>
        <Box
          h="7vh"
          bgColor="whitesmoke"
          p="5"
          borderBottom="2px solid #E1EEDD"
        >
          <IconButton
            p="10"
            size="lg"
            colorScheme="purple"
            onClick={() => setIsOpen(!isOpen)}
          >
            <HamburgerIcon color="#553C9A" />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Box>
  );
}
