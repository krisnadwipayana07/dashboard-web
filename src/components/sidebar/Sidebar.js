import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { sidebarLink } from "./SidebarLink";

export default function Sidebar() {
  return (
    <Box>
      {sidebarLink.map((item, key) => (
        <Box key={key} py="10">
          <Link href={item.url}>
            <Text>{item.name}</Text>
          </Link>
        </Box>
      ))}
    </Box>
  );
}
