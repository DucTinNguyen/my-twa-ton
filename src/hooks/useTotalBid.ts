import { Address, fromNano } from "@ton/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTonClient } from "./useTonClient";


const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

const useTotalBid = () => {
    const client = useTonClient();
    const [totalBid,setTotalBid] = useState('0');

    const getTotalBid = useCallback(async () => {
        if (!client) return;
        const result = await client.runMethod(
            Address.parse("kQApFtSIC4zxh4IydCRHma7URhg3HFE05tOnUwPcLtYZ-j9U"),
            "get_auction_price"
        );
        setTotalBid(fromNano((result.stack as any).items[0].value))
        
        return;
    },[client])

    useEffect(()=>{
        getTotalBid()
    },[getTotalBid, client])


    return (
        useMemo(()=>{
            return {
                totalBid
            }
        },[totalBid])
    )

}

export default useTotalBid;