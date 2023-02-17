import BarChart from "@/components/charts/bar/BarChart";
import SearchForm from "@/components/form/searchform/SearchForm";
import BaseLayout from "@/components/layout/BaseLayout";
import Pagination from "@/components/pagination/Pagination";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
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
import { useEffect, useState } from "react";
import { GetAllProduct, GetSelectProduct } from "../api/productApi";

function getAllValueNotDuplicate(data = [], key) {
  let temp = [];
  data?.map((item) => {
    if (temp.includes(item[key]) === false) {
      temp.push(item[key]);
    }
  });
  return temp;
}

function sortData(a, b, sortActive, sortType) {
  if (typeof a[sortActive] === "number") {
    if (sortType === "asc") {
      return a[sortActive] - b[sortActive];
    } else {
      return b[sortActive] - a[sortActive];
    }
  } else {
    var textA = a[sortActive]?.toLowerCase(),
      textB = b[sortActive]?.toLowerCase();
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

function filterData(item, filterData) {
  if (filterData.brand) {
    if (item["brand"] !== filterData.brand) {
      return false;
    }
  }
  if (filterData.category) {
    if (item["category"] !== filterData.category) {
      return false;
    }
  }
  if (filterData.priceStart) {
    const price = item["price"];
    if (price <= filterData.priceStart) {
      return false;
    }
    if (price >= filterData.priceEnd) {
      return false;
    }
  }
  return item;
}

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
  const [sortActive, setSortActive] = useState("");

  const [filterActive, setFilterActive] = useState({
    brand: "",
    priceStart: 0,
    priceEnd: 0,
    category: "",
  });
  const [allCategory, setAllCategory] = useState([]);
  const [allBrand, setAllBrand] = useState([]);

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
    const savedSort = localStorage.getItem("sortQuery");
    const savedFilter = localStorage.getItem("filterQuery");
    if (savedSearch) {
      setKeyword(savedSearch);
    }
    if (savedSort) {
      setSortActive(savedSort);
      setClicked(1);
    }
    if (savedFilter) {
      setFilterActive(JSON.parse(savedFilter));
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    let skip = 0;
    const limit = 100;
    GetAllProduct({ keyword, limit, skip })
      .then((res) => {
        const { products } = res.data;
        setDataProduct(products);
        setTotalData(res.data.total);
        const category = getAllValueNotDuplicate(products, "category");
        const brand = getAllValueNotDuplicate(products, "brand");
        setAllBrand(brand);
        setAllCategory(category);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [search]);

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
  useEffect(() => {}, [filterActive]);

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
    if (sortActive === value) {
      setClicked(clicked + 1);
      if (clicked % 2 === 0) {
        setSortType("asc");
      } else {
        setSortType("desc");
      }
    } else {
      localStorage.setItem("sortQuery", value);
      setSortActive(value);
      setClicked(1);
      setSortType("asc");
    }
  };
  const handleChangeValueFilter = (e) => {
    const { name, value } = e.target;
    setFilterActive({ ...filterActive, [name]: value });
    localStorage.setItem(
      "filterQuery",
      JSON.stringify({ ...filterActive, [name]: value })
    );
  };

  // console.log(filterActive.brand);

  return (
    <Box p="5">
      <Box pb="5">
        <Text fontSize="2xl" fontWeight={700}>
          Filter{" "}
        </Text>
        <HStack pb="2">
          <Text>Brand: </Text>
          <Select
            name="brand"
            onChange={handleChangeValueFilter}
            placeholder="Brand"
            value={filterActive.brand}
          >
            {allBrand?.map((item, key) => (
              <option key={key} value={item}>
                {item}
              </option>
            ))}
          </Select>
          <Text>Category: </Text>
          <Select
            name="category"
            value={filterActive.category}
            onChange={handleChangeValueFilter}
            placeholder="Category"
          >
            {allCategory?.map((item, key) => (
              <option key={key} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </HStack>

        <HStack pb="2">
          <Text w="32" wordBreak="break-word">
            Price Range
          </Text>

          <Text mt="10">{filterActive.priceStart}</Text>
          <RangeSlider
            w="50%"
            aria-label={["min", "max"]}
            defaultValue={[0, 2000]}
            min={0}
            max={2000}
            onChangeEnd={(val) => {
              const temp = {
                ...filterActive,
                priceStart: val[0],
                priceEnd: val[1],
              };
              setFilterActive(temp);
              localStorage.setItem("filterQuery", JSON.stringify(temp));
            }}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0}></RangeSliderThumb>
            <RangeSliderThumb index={1}></RangeSliderThumb>
          </RangeSlider>
          <Text textAlign="end">{filterActive.priceEnd}</Text>
        </HStack>
      </Box>

      <SimpleGrid columns={[1, 2]}>
        <Box>
          <Button colorScheme="purple" onClick={() => setOpenChart(true)}>
            Show Graph
          </Button>
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
                      {item.value === sortActive ? (
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
                ?.filter((item) => filterData(item, filterActive))
                .sort((a, b) => sortData(a, b, sortActive, sortType))
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
