import { Button } from "@/components/UI/Button/Button";
import Skeleton from "@/components/UI/Skeleton/Skeleton";
import { createStripeCheckout } from "@/lib/firebase";
import { colors } from "@/styles/theme";
import fetcher from "@/utils/fetcher/cartFetcher";
import options from "@/utils/fetcher/options";
import { useAuth } from "@/utils/useAuth";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import SingleProduct from "../SingleProduct/SingleProduct";
import { ProductsContainer } from "./ProfileContent";

const Purchases = () => {
  const { user } = useAuth();

  return <ProductsContainer></ProductsContainer>;
};

export default Purchases;
