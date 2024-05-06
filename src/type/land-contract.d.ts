import { Address } from "@ton/core";

export type bidParams = {
  queryId: number;
  bidAddress: Address;
  amount: bigint;
};

export type mintType = {
  queryId: number;
  amount: bigint;
};