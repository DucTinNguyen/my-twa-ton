import { Address, fromNano } from "@ton/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";

const useAuctionPrice = () => {
    const client = useTonClient();
    const [auctionPrice, setAuctionPrice] = useState('0');
    const [val, setVal] = useState<null | string>();


    const getPriceAuction = useCallback(async () => {
        if (!client) return;
        const result = await client.runMethod(
            Address.parse("kQApFtSIC4zxh4IydCRHma7URhg3HFE05tOnUwPcLtYZ-j9U"),
            "get_auction_price"
        );
        setAuctionPrice(fromNano((result.stack as any).items[0].value))
        return;
    }, [client])

    const counterContract = useAsyncInitialize(async () => {
        if (!client) return null;
        try {
            const contract = await client.runMethod(
                Address.parse(String(import.meta.env.VITE_CONTRACT_ADDRESS)),
                "get_nft_total_supply"
            );
            return contract;
        } catch (error) {
            console.error("Error initializing counter contract:", error);
            return null;
        }
    }, [client]);

    useEffect(() => {
        async function getValue() {
            if (!counterContract) return;
            try {
                // Check if the necessary properties are available before setting state
                const val = await (counterContract as any)?.stack?.items[0]?.value;
                const gasUsed = counterContract?.gas_used;
                if (val !== undefined && gasUsed !== undefined) {
                    setVal(val);

                }
            } catch (error) {
                console.error("Error retrieving counter value:", error);
            }

        }
        getValue();
    }, [counterContract]);


    return (
        useMemo(() => {
            return {
                auctionPrice, 
                val
            }
        }, [auctionPrice])
    )

}

export default useAuctionPrice