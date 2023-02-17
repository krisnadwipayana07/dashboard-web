import BaseLayout from "@/components/layout/BaseLayout";
import Pagination from "@/components/pagination/Pagination";
import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  Skeleton,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GetAllCart } from "../api/cartApi";

export default function Carts() {
  const router = useRouter();
  const limit = 5;

  const [page, setPage] = useState(1);
  const [pageFetched, setPageFetched] = useState(0);
  const [totalData, setTotalData] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState(1);

  let skip = limit * (page - 1);

  useEffect(() => {
    if (pageFetched < page) {
      setPageFetched(page);
      setIsLoading(true);
      GetAllCart({ limit, skip })
        .then((res) => {
          const { carts } = res.data;
          setData([...data, ...carts]);
          setTotalData(res.data.total);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, [page]);

  const handlePrevPage = () => setPage(page - 1);
  const handleNextPage = () => setPage(page + 1);
  const handleChangeSearch = (e) => setKeyword(e.target.value);
  const handleClickView = (id) => {
    router.push("/admin/cart/" + id);
  };
  const handleSearchClick = (e) => {
    e.preventDefault();
  };

  return (
    <Box p="5" pt="10">
      <TableContainer>
        <Skeleton isLoaded={!isLoading}>
          <Table variant="simple">
            <TableCaption>
              <Pagination
                page={page}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                disableNext={limit * page >= totalData}
              />
            </TableCaption>
            <Thead>
              <Tr>
                <Th color="purple.700">Total Products</Th>
                <Th color="purple.700">Total Qty</Th>
                <Th color="purple.700">Total Price</Th>
                <Th color="purple.700">Total Discount</Th>
                <Th color="purple.700">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.slice(skip, limit * page).map((item, key) => (
                <Tr key={key}>
                  <Td>{item.totalProducts}</Td>
                  <Td>{item.totalQuantity}</Td>
                  <Td>{item.total}</Td>
                  <Td>{item.discountedTotal}</Td>
                  <Td>
                    <HStack spacing="2">
                      <IconButton onClick={() => handleClickView(item.id)}>
                        <ViewIcon />
                      </IconButton>
                      {/* <IconButton></IconButton>
                    <IconButton></IconButton> */}
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Skeleton>
      </TableContainer>
    </Box>
  );
}

Carts.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
