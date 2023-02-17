import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Grid,
  GridItem,
  IconButton,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";

export default function BaseLayout({ children }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (username === "") {
      const usernameTemp = localStorage.getItem("username");
      setUsername(usernameTemp);
    }
  }, [username]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    router.push("/login");
  };

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
          <Grid templateColumns="repeat(3, 1fr)">
            <Box>
              <IconButton
                p="10"
                size="lg"
                colorScheme="purple"
                onClick={() => setIsOpen(!isOpen)}
              >
                <HamburgerIcon color="#553C9A" />
              </IconButton>
            </Box>
            <GridItem
              colSpan={2}
              display="flex"
              justifyContent="end"
              alignItems="center"
            >
              <Text fontSize="0.9em">Wellcome : {username}</Text>
              <Button
                ml="10"
                borderBottom="2px solid purple"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </GridItem>
          </Grid>
        </Box>
        {children}
      </Box>
    </Box>
  );
}
