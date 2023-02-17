import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, useEffect } from "react";

export const GeneralContext = createContext();

export default function GeneralContextProvider({ children }) {
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const checkToken = localStorage.getItem("token");
    if (!checkToken && router.pathname !== "/login") {
      router.push("/login");
    }
  }, [router.pathname]);

  let shareValue = {};
  return (
    <GeneralContext.Provider value={shareValue}>
      {children}
    </GeneralContext.Provider>
  );
}
