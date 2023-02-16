import BarChart from "@/components/charts/bar/BarChart";
import SearchForm from "@/components/form/searchform/SearchForm";
import BaseLayout from "@/components/layout/BaseLayout";
import Pagination from "@/components/pagination/Pagination";
import {
  Box,
  Button,
  Input,
  Skeleton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GetAllProduct } from "../api/productApi";

export default function Products() {
  const limit = 5;

  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(1);
  const [dataProduct, setDataProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState(1);

  useEffect(() => {
    let skip = limit * (page - 1);
    setIsLoading(true);
    GetAllProduct({ keyword, limit, skip })
      .then((res) => {
        setDataProduct(res.data.products);
        setTotalData(res.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [page, search]);

  const handlePrevPage = () => setPage(page - 1);
  const handleNextPage = () => setPage(page + 1);
  const handleChangeSearch = (e) => setKeyword(e.target.value);
  const handleSearchClick = (e) => {
    e.preventDefault();
    setSearch(search + 1);
  };

  return (
    <Box>
      <SearchForm
        handleChangeSearch={handleChangeSearch}
        handleSearchClick={handleSearchClick}
        value={keyword}
      />
      {/* <BarChart data={dataProduct}></BarChart> */}
      <TableContainer px="5">
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
                <Th color="purple.700">Product Name</Th>
                <Th color="purple.700">Brand</Th>
                <Th color="purple.700" isNumeric>
                  Price
                </Th>
                <Th color="purple.700" isNumeric>
                  Stock
                </Th>
                <Th color="purple.700">Category</Th>
              </Tr>
            </Thead>

            <Tbody>
              {dataProduct?.map((item, key) => (
                <Tr key={key}>
                  <Td>{item.title}</Td>
                  <Td>{item.brand}</Td>
                  <Td isNumeric>{item.price}</Td>
                  <Td isNumeric>{item.stock}</Td>
                  <Td>{item.category}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Skeleton>
      </TableContainer>
    </Box>
  );
}

Products.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
