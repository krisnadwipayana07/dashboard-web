import BarChart from "@/components/charts/bar/BarChart";
import SearchForm from "@/components/form/searchform/SearchForm";
import BaseLayout from "@/components/layout/BaseLayout";
import Pagination from "@/components/pagination/Pagination";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
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
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GetAllProduct, GetSelectProduct } from "../api/productApi";

export default function ProductsFilter() {
  const limit = 5;

  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(1);
  const [dataProduct, setDataProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState(1);
  const [graphData, setGraphData] = useState({});
  const [openChart, setOpenChart] = useState(false);
  const [clicked, setClicked] = useState(0);
  const [sortType, setSortType] = useState("");

  const [filterActive, setFilterActive] = useState("");

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
  const headerTable = [
    { name: "Product Name", value: "title" },
    { name: "Brand", value: "brand" },
    { name: "Price", value: "price", isNumber: true },
    { name: "Stock", value: "stock", isNumber: true },
    { name: "Category", value: "category" },
  ];

  useEffect(() => {
    const savedSearch = localStorage.getItem("searchQuery");
    if (savedSearch) {
      setKeyword(savedSearch);
      setSearch(search + 1);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    let skip = 0;
    const limit = 100;
    GetAllProduct({ keyword, limit, skip })
      .then((res) => {
        setDataProduct(res.data.products);
        setTotalData(res.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

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
  const HandleChangeFilter = (value) => {
    if (filterActive === value) {
      setClicked(clicked + 1);
      if (clicked % 2 === 0) {
        setSortType("asc");
      } else {
        setSortType("desc");
      }
    } else {
      setFilterActive(value);
      setClicked(1);
      setSortType("asc");
    }
  };

  function filteringData(a, b) {
    if (typeof a[filterActive] === "number") {
      if (sortType === "asc") {
        return a[filterActive] - b[filterActive];
      } else {
        return b[filterActive] - a[filterActive];
      }
    } else {
      var textA = a[filterActive]?.toLowerCase(),
        textB = b[filterActive]?.toLowerCase();
      if (sortType === "asc") {
        if (textA < textB) {
          return -1;
        }
        if (textA > textB) {
          return 1;
        }
      } else {
        if (textA > textB) {
          return -1;
        }
        if (textA < textB) {
          return 1;
        }
      }
    }
  }
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
                {headerTable.map((item, key) => (
                  <Th color="purple.700" key={key} isNumeric={item.isNumber}>
                    <Button
                      variant="ghost"
                      onClick={() => HandleChangeFilter(item.value)}
                    >
                      {item.name}
                      {item.value === filterActive ? (
                        sortType === "asc" ? (
                          <ArrowUpIcon />
                        ) : (
                          <ArrowDownIcon />
                        )
                      ) : (
                        <></>
                      )}
                    </Button>
                  </Th>
                ))}
              </Tr>
            </Thead>

            <Tbody>
              {dataProduct
                ?.sort((a, b) => filteringData(a, b))
                .slice(limit * (page - 1), limit * page)
                .map((item, key) => (
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

ProductsFilter.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
