import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";

export default function Pagination({
  page,
  handlePrevPage,
  handleNextPage,
  disableNext,
}) {
  return (
    <Box display="flex" justifyContent="end">
      <Button isDisabled={page <= 1} size="sm" onClick={handlePrevPage}>
        Prev
      </Button>
      <Box display="flex" alignItems="center" mx="3">
        <Text textAlign="center">{page}</Text>
      </Box>
      <Button isDisabled={disableNext} size="sm" onClick={handleNextPage}>
        Next
      </Button>
    </Box>
  );
}
