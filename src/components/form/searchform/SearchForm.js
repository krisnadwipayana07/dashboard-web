import { Box, Button, Input } from "@chakra-ui/react";
import React from "react";

export default function SearchForm({
  handleChangeSearch,
  handleSearchClick,
  value,
}) {
  return (
    <form>
      <Box display="flex">
        <Input
          placeholder="Search"
          name="search"
          value={value}
          onChange={handleChangeSearch}
        />
        <Button
          ml="1"
          type="submit"
          colorScheme="purple"
          onClick={handleSearchClick}
        >
          Search
        </Button>
      </Box>
    </form>
  );
}
