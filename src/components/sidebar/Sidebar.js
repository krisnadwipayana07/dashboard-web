import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { sidebarLink } from "./SidebarLink";

export default function Sidebar() {
  const router = useRouter();
  const { pathname } = router;
  return (
    <Box>
      <Box
        h="7vh"
        borderBottom="2px solid #E1EEDD"
        display="flex"
        alignItems="center"
      ></Box>
      <Box py="20" pr="5">
        {sidebarLink.map((item, key) => (
          <Link key={key} href={item.url}>
            <Box
              mb="5"
              py="10"
              px="10"
              bgColor={pathname === item.url ? "#6913D8" : ""}
              borderEndRadius="30px"
            >
              <Text
                display="flex"
                color={pathname === item.url ? "white" : "black"}
              >
                {item.name}
              </Text>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
