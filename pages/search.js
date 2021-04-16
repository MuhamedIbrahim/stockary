import Header from "@/components/parts/Header/Header";
import { useRouter } from "next/router";

const index = () => {
  const { query: routerQuery } = useRouter();
  return (
    <>
      <h1>Search query: {routerQuery.s}</h1>
    </>
  );
};

export default index;
