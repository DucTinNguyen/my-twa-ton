import { beginCell } from "@ton/core";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import TonWeb from "tonweb";
import { mintType } from "../type/land-contract";

const BtnBid = () => {
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();

  const handleBid = async () => {
    let a = new TonWeb.boc.Cell();
    a.bits.writeUint(5, 32);
    a.bits.writeUint(0, 64);
    a.bits.writeAddress(new TonWeb.utils.Address(address));
    a.bits.writeCoins(0.05 * 1000000000);

    const result = await a.toBoc();
    const payload = TonWeb.utils.bytesToBase64(result);

    const message = [
      {
        address: "kQApFtSIC4zxh4IydCRHma7URhg3HFE05tOnUwPcLtYZ-j9U",
        amount: String(0.05 * 1000000000),
        payload,
      },
    ];

    tonConnectUI.sendTransaction({
      messages: message,
      validUntil: Date.now() + 1 * 60 * 1000, // 5 minutes for user to approve
    });
  };

  const handleMintLand = async (params: mintType) => {
    let body = new TonWeb.boc.Cell();
    body.bits.writeUint(1, 32);
    body.bits.writeUint(params.queryId || 0, 64);
    body.bits.writeCoins(params.amount);
    body.bits.writeAddress(new TonWeb.utils.Address(address));
    const result = await body.toBoc();
    const payload = TonWeb.utils.bytesToBase64(result);

    const message = [
      {
        address: "kQApFtSIC4zxh4IydCRHma7URhg3HFE05tOnUwPcLtYZ-j9U",
        amount: String(params.amount),
        payload,
      },
    ];
    try {
      await tonConnectUI.sendTransaction({
        messages: message,
        validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
      });
    } catch (err) {
      console.log("--error: ", err);
    }
  };

  return (
    <>
      <button onClick={handleBid}>BtnBid</button>
      <button
        onClick={() => {
          handleMintLand({
            queryId: 0,
            amount: BigInt(0.05 * 1000000000),
          });
        }}
      >
        Mint
      </button>
    </>
  );
};

export default BtnBid;
