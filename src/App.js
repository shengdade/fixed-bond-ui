import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { ethers } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { BOND_CONTRACT_ADDRESS } from "./constants";
import abi from "./abi/FixedBond.json";

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [bondInfo, setBondInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const hasMetamask = useMemo(() => {
    const { ethereum } = window;
    if (!ethereum) {
      setErrorMessage("Make sure you have Metamask installed!");
      return false;
    }
    return true;
  }, []);

  const connectWallet = async () => {
    try {
      if (!hasMetamask) return;
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    const initializeWallet = async () => {
      try {
        if (!hasMetamask) return;
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          setCurrentAccount(account);
        } else {
          setErrorMessage("No authorized account found");
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    initializeWallet();
  }, [hasMetamask]);

  useEffect(() => {
    if (currentAccount) {
      getBondInfo();
    }
  }, [currentAccount]);

  const getBondInfo = async () => {
    try {
      if (hasMetamask) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          BOND_CONTRACT_ADDRESS,
          abi.abi,
          signer
        );
        const bondInfo = await contract.bondInfo();
        console.log(bondInfo);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}
      {currentAccount && <Alert severity="success">{currentAccount}</Alert>}
      {hasMetamask && !currentAccount && (
        <Button variant="outlined" onClick={connectWallet}>
          Connect Wallet
        </Button>
      )}
      <h3>{bondInfo}</h3>
    </div>
  );
}

export default App;
