import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { Box, Text } from "@chakra-ui/react";
import Sidebar from "@/components/sidebar/Sidebar";
import BaseLayout from "@/components/layout/BaseLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" h="100vh">
      <Text fontSize="2xl" fontWeight={700}>
        Wellcome To Dashboard DummyJSON Data
      </Text>
    </Box>
  );
}

Home.getLayout = (page) => <BaseLayout>{page} </BaseLayout>;
