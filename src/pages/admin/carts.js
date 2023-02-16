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
  const [totalData, setTotalData] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState(1);

  useEffect(() => {
    let skip = limit * (page - 1);
    setIsLoading(true);
    GetAllCart({ limit, skip })
      .then((res) => {
        setData(res.data.carts);
        setTotalData(res.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
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
    <Box p="5">
      <form>
        <Box display="flex" justifyContent="end" py="5">
          <Input
            w="30%"
            placeholder="Search"
            name="search"
            onChange={handleChangeSearch}
          />
          <Button ml="1" type="submit" onClick={handleSearchClick}>
            Search
          </Button>
        </Box>
      </form>
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
                <Th>Total Products</Th>
                <Th>Total Qty</Th>
                <Th>Total Price</Th>
                <Th>Total Discount</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((item, key) => (
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
