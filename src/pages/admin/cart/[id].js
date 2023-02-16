import BaseLayout from "@/components/layout/BaseLayout";
import Pagination from "@/components/pagination/Pagination";
import { GetCartDetail } from "@/pages/api/cartApi";
import { GetUserDetail } from "@/pages/api/userApi";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  SimpleGrid,
  Skeleton,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function CartDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    GetCartDetail({ id })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        const { userId } = res.data;
        GetUserDetail(userId)
          .then((res) => setUserData(res.data))
          .catch((err) => console.log(err))
          .finally(() => setIsLoading(false));
      })
      .catch((err) => console.log(err));

    console.log(data, id);
  }, [id]);

  if (isLoading) {
    return (
      <Box display="flex" h="90vh" justifyContent="center" alignItems="center">
        <Spinner />
      </Box>
    );
  }

  return (
    <Box p="5">
      <IconButton onClick={() => router.back()}>
        <ArrowBackIcon />
      </IconButton>
      <Box p="5">
        <Text fontSize="xl" pb="2" fontWeight={700} color="purple.700">
          Details
        </Text>
        <Box w="90%" p="3" bgColor="whitesmoke" border="3px solid #CBD5E0">
          <SimpleGrid columns={[1, 2]} spacing="5">
            <Text fontWeight={500}>User : {userData?.username}</Text>
            <Text fontWeight={500}># of items : {data?.totalProducts} </Text>
            <Text fontWeight={500}>Email : {userData?.email}</Text>
            <Text fontWeight={500}>
              Total Amount : {data?.discountedTotal}{" "}
            </Text>
          </SimpleGrid>
        </Box>
      </Box>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color="purple.700">Product Name</Th>
              <Th color="purple.700">Qty</Th>
              <Th color="purple.700">Price</Th>
              <Th color="purple.700">Discount %</Th>
              <Th color="purple.700">Total</Th>
              <Th color="purple.700">Total + Discount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.products?.map((item, key) => (
              <Tr key={key}>
                <Td>{item.title}</Td>
                <Td>{item.quantity}</Td>
                <Td>{item.price}</Td>
                <Td>{item.discountPercentage + "%"}</Td>
                <Td>{item.total}</Td>
                <Td>{item.discountedPrice}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

CartDetail.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
