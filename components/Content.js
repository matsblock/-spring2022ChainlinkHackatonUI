import { useState, useEffect } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import {
  DaiAbi,
  DaiAddress,
  OracleAbi,
  OracleContractAddress,
  BetsAbi,
  BetsContractAddress,
} from "../constants";
import { ethers } from "ethers";
import { Button, Typography } from "web3uikit";

export default function Content() {
  const { account, isWeb3Enabled } = useMoralis();

  const [daiBalance, setDaiBalance] = useState(0);
  const [_gameDetailsAsString, setGameDetailsAsString] = useState("");
  const [_gameScoreAsString, setGameScoreAsString] = useState("");

  const [gameDetailsAsStringArray, setGameDetailsAsStringArray] = useState("");
  let [homeTeam, setHomeTeam] = useState("");
  let [awayTeam, setAwayTeam] = useState("");

  const [gameScoreAsStringArray, setScoreAsStringArray] = useState("");
  let [homeScore, setHomeScore] = useState("");
  let [awayScore, setAwayScore] = useState("");
  let [matchStatus, setMatchStatus] = useState("pending");

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
    console.log(openModal);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (isWeb3Enabled && account) {
      updateUI();
    }
  }, [
    account,
    isWeb3Enabled,
    gameDetailsAsStringArray,
    gameScoreAsStringArray,
  ]);

  async function updateUI() {
    setDaiBalance(String(ethers.utils.formatEther(await balanceOf())));

    setGameDetailsAsString(await gameDetailsAsString());
    setGameScoreAsString(await gameScoreAsString());

    setGameDetailsAsStringArray(String(_gameDetailsAsString).split(","));
    setScoreAsStringArray(String(_gameScoreAsString).split(","));

    setHomeTeam(String(gameDetailsAsStringArray[1]).replace(/"/g, ""));
    setAwayTeam(String(gameDetailsAsStringArray[3]).replace(/"/g, ""));
    setMatchStatus(
      String(gameScoreAsStringArray[0]).replace(/"/g, "").slice(1)
    );
    setHomeScore(gameScoreAsStringArray[1]);
    setAwayScore(String(gameScoreAsStringArray[2]).replace(/]/g, ""));
  }

  const { runContractFunction: balanceOf } = useWeb3Contract({
    abi: DaiAbi,
    contractAddress: DaiAddress,
    functionName: "balanceOf",
    params: {
      account: "0x5609ad815a870cC91B1326e119Ec80aCB0Cf3d2b",
    },
  });

  const { runContractFunction: gameScoreAsString } = useWeb3Contract({
    abi: OracleAbi,
    contractAddress: OracleContractAddress,
    functionName: "gameScoreAsString",
    params: {},
  });

  const { runContractFunction: gameDetailsAsString } = useWeb3Contract({
    abi: OracleAbi,
    contractAddress: OracleContractAddress,
    functionName: "gameDetailsAsString",
    params: {},
  });

  const { runContractFunction: faucet } = useWeb3Contract({
    abi: DaiAbi,
    contractAddress: DaiAddress,
    functionName: "faucet",
    params: {
      amount: "100000000000000000000",
    },
  });

  const { runContractFunction: approve } = useWeb3Contract({
    abi: DaiAbi,
    contractAddress: DaiAddress,
    functionName: "approve",
    params: {
      spender: BetsContractAddress,
      amount: "100000000000000000000",
    },
  });

  const { runContractFunction: setBetHome } = useWeb3Contract({
    abi: BetsAbi,
    contractAddress: BetsContractAddress,
    functionName: "setBet",
    params: {
      _bet: 0,
      _amount: 100000000000000000000n,
    },
  });

  const { runContractFunction: setBetAway } = useWeb3Contract({
    abi: BetsAbi,
    contractAddress: BetsContractAddress,
    functionName: "setBet",
    params: {
      _bet: 1,
      _amount: 100000000000000000000n,
    },
  });

  const { runContractFunction: setBetTied } = useWeb3Contract({
    abi: BetsAbi,
    contractAddress: BetsContractAddress,
    functionName: "setBet",
    params: {
      _bet: 2,
      _amount: 100000000000000000000n,
    },
  });

  const { runContractFunction: claimRewards } = useWeb3Contract({
    abi: BetsAbi,
    contractAddress: BetsContractAddress,
    functionName: "claimRewards",
    params: {},
  });

  async function addTokenToWallet() {
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: "0xeE609996ac3821499aEED5C57f3F7507D0bdC481", // The address that the token is at.
            symbol: "DAI", // A ticker symbol or shorthand, up to 5 chars.
            decimals: "18", // The number of decimals in the token
            image: null, // A string url of the token logo
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-full">
      {/* <h3>Game Details: {_gameDetailsAsString}</h3>
            <h3>Game Score: {_gameScoreAsString}</h3> */}
      <div className=" relative cards h-5/6" onClick={handleCloseModal}>
        {matchStatus === "pending" ? (
          <h3 className=" flex items-center text-white p-5 absolute text-3xl	font-bold left-1/2 transform -translate-x-1/2 ">
            Match: pending
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 stroke-white mt-1 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </h3>
        ) : (
          <h4 className=" flex items-center text-white p-5 absolute text-3xl	font-bold left-1/2 transform -translate-x-1/2 ">
            Result: {homeScore} - {awayScore}
          </h4>
        )}
        <div className="w-full h-full pt-20">
          <div className="h-full flex justify-evenly">
            <div className=" hover:backdrop-blur-2xl hover:outline-4 hover:outline-[#1FA37E] hover:drop-shadow-2xl relative w-1/4 backdrop-blur-3xl outline-[#24BF93] outline outline-2	 h-5/6 rounded-2xl backdrop-blur-xl bg-white/5">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <p className="text-white text-center text-2xl font-bold">
                  {homeTeam} Team name
                </p>
                <p className=" text-white text-center text-lg font-medium">
                  (Home)
                </p>
              </div>
              <div className="w-fit absolute bottom-3 left-1/2 transform -translate-x-1/2 pb-2">
                <Button
                  id="test-button-primary"
                  onClick={setBetHome}
                  text="Bet 100 DAI to Home"
                  theme="primary"
                  type="button"
                  className="hover:bg-sky-700"
                ></Button>
              </div>
            </div>
            <div className="relative h-5/6 w-1/5">
              <div className="-mt-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <h3 className="text-3xl	font-bold text-white">VS</h3>
              </div>
              <div className="w-fit absolute bottom-3 left-1/2 transform -translate-x-1/2">
                <div className="w-fit absolute bottom-2 left-1/2 transform -translate-x-1/2">
                  <Button
                    id="test-button-primary"
                    onClick={setBetTied}
                    text="Bet 100 DAI to Tied"
                    theme="primary"
                    type="button"
                  ></Button>
                </div>
                {/* <div className="w-fit absolute bottom-3 left-1/2 transform -translate-x-1/2"> */}
                <div className="-mb-80 mt-10">
                  {matchStatus === "pending" ? (
                    <Button
                      id="test-button-primary"
                      onClick={approve}
                      text="Approve 100 DAI to BET"
                      theme="primary"
                      type="button"
                    ></Button>
                  ) : (
                    <Button
                      id="test-button-primary"
                      onClick={claimRewards}
                      text="Claim Rewards"
                      theme="primary"
                      type="button"
                    ></Button>
                  )}
                </div>
                {/* </div> */}
              </div>
            </div>

            <div className=" hover:backdrop-blur-2xl hover:outline-4 hover:outline-[#1FA37E] hover:drop-shadow-2xl	 relative w-1/4 backdrop-blur-3xl outline-[#24BF93] outline outline-2	 h-5/6 rounded-2xl backdrop-blur-xl bg-white/5">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <p className="text-white text-center text-2xl font-bold">
                  {awayTeam} Rival Name
                </p>
                <p className=" text-white text-center text-lg font-medium">
                  (Away)
                </p>
              </div>
              <div className=" pb-2 w-fit absolute bottom-3 left-1/2 transform -translate-x-1/2">
                <Button
                  id="test-button-primary"
                  onClick={setBetAway}
                  text="Bet 100 DAI to Away"
                  theme="primary"
                  type="button"
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute top-5 right-0 mr-28 text-white bg-transparent rounded-2xl py-2 px-8 font-bold -mt-0.5 hover:outline-2 hover:outline-[#1FA37E] hover:drop-shadow-2xl outline-[#24BF93] outline outline-1 hover:bg-white/5	"
        onClick={handleOpenModal}
      >
        My balance
      </div>
      {openModal ? (
        <div className="absolute backdrop-blur top-20 bg-[#031B54]/50 w-2/5 rounded-2xl h-fit py-7 right-10 drop-shadow-2xl	">
          <div className="mx-7">
            <div className="flex justify-between items-center">
              <h1 className="text-white font-bold text-xl">
                {" "}
                Your DAI Balance:{" "}
              </h1>
              <h4 className="text-white text-baseline font-medium">
                ${daiBalance}
              </h4>
            </div>
            <div className="flex justify-around pt-5">
              <Button
                id="test-button-primary"
                onClick={faucet}
                text="Get 100 fake DAIs"
                theme="primary"
                type="button"
              ></Button>
              <Button
                id="test-button-primary"
                onClick={addTokenToWallet}
                text="Add fake DAI token to Metamask"
                theme="primary"
                type="button"
              ></Button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
