import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { LoginUser } from "./api/userApi";

export default function Login() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleChangeLoginData = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleLogin = () => {
    setIsLoading(true);
    LoginUser(loginData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          setErrorMessage("User credential not found");
        }
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <Box
      h="100vh"
      w="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box p="5" border="1px solid gray" borderRadius="xl" boxShadow="dark-lg">
        <Text
          textAlign="center"
          fontSize="2xl"
          fontWeight={700}
          pb="5"
          color="purple.700"
        >
          Login
        </Text>
        <Stack spacing="2" w="sm">
          <FormControl>
            <FormLabel color="purple.700">Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleChangeLoginData}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="purple.700">Password</FormLabel>
            <InputGroup>
              <Input
                name="password"
                value={loginData.password}
                type={showPassword ? "text" : "password"}
                onChange={handleChangeLoginData}
              />
              <InputRightElement>
                <IconButton onClick={handleChangeShowPassword}>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </IconButton>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          {errorMessage !== "" && <Text color="red">{errorMessage}</Text>}
          <Button
            isLoading={isLoading}
            isDisabled={!loginData.username || !loginData.password}
            colorScheme="purple"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
