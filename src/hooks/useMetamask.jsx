import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

export const useMetamask = ({ isMobileResolution }) => {
  const [metamask, setMetamask] = useState(false);

  useEffect(() => {
    const readMetamaskProvider = async () => {
      const provider = await detectEthereumProvider();
      setMetamask(provider);
    };
    readMetamaskProvider();
  }, [isMobileResolution]);

  return metamask;
};
