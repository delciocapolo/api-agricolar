import type express from "express";

export type ctxType = {
  token: {
    createToken: express.Response<any, Record<string, any>>;
    getToken: string | undefined;
  };
};

export type ContextAPI = {
  token: string;
}