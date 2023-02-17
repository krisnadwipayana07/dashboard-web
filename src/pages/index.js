import BaseLayout from "@/components/layout/BaseLayout";
import { Box, Text } from "@chakra-ui/react";
import { Inter } from "@next/font/google";

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
