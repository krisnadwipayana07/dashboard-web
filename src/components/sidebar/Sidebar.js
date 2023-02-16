import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { sidebarLink } from "./SidebarLink";

export default function Sidebar() {
  return (
    <Box>
      {sidebarLink.map((item, key) => (
        <Link key={key} href={item.url}>
          <Box py="10" border="1px " borderBottomColor="#6913D8">
            <Text>{item.name}</Text>
          </Box>
        </Link>
      ))}
    </Box>
  );
}
