import BarChart from "@/components/charts/bar/BarChart";
import SearchForm from "@/components/form/searchform/SearchForm";
import BaseLayout from "@/components/layout/BaseLayout";
import Pagination from "@/components/pagination/Pagination";
import {
  Box,
  Button,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
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
import {
  GetAllCategories,
  GetAllProduct,
  GetSelectProduct,
} from "../api/productApi";

export default function Products() {
  const limit = 5;

  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(1);
  const [dataProduct, setDataProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState(1);
  const [graphData, setGraphData] = useState({});
  const [openChart, setOpenChart] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [category, setCategory] = useState("");

  const labels = Object.keys(graphData);

  const DataBrand = {
    labels,
    datasets: [
      {
        label: "Total Product",
        data: Object.values(graphData),
        backgroundColor: "#553C9A",
      },
    ],
  };

  useEffect(() => {
    const savedSearch = localStorage.getItem("searchQuery");
    if (savedSearch) {
      setKeyword(savedSearch);
      setSearch(search + 1);
    }
  }, []);
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
  useEffect(() => {
    const select = "brand";
    const limit = 100;
    const temp = {};
    GetSelectProduct({ select, limit }).then((res) => {
      res.data.products?.forEach((item) => {
        if (temp[item.brand] === undefined) {
          temp[item.brand] = 1;
        } else {
          temp[item.brand] = temp[item.brand] + 1;
        }
      });
    });
    setGraphData(temp);
  }, []);

  const handlePrevPage = () => setPage(page - 1);
  const handleNextPage = () => setPage(page + 1);
  const handleChangeSearch = (e) => setKeyword(e.target.value);
  const handleSearchClick = (e) => {
    e.preventDefault();
    setSearch(search + 1);
    setPage(1);
    localStorage.setItem("searchQuery", keyword);
  };
  const handleCloseChart = () => {
    setOpenChart(false);
  };
  const HandleChangeCategory = (e) => {
    setCategory(e.target.value);
    console.log(category);
  };

  return (
    <Box p="5">
      <SimpleGrid columns={[1, 2]}>
        <Box>
          <Button onClick={() => setOpenChart(true)}>Show Graph</Button>
        </Box>
        <SearchForm
          handleChangeSearch={handleChangeSearch}
          handleSearchClick={handleSearchClick}
          value={keyword}
        />
      </SimpleGrid>

      <TableContainer pt="3">
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
      <Modal size="4xl" isOpen={openChart} onClose={handleCloseChart}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chart Brand</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <BarChart data={DataBrand}></BarChart>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

Products.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
