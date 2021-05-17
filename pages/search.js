import Head from "next/head";
import { useRouter } from "next/router";
import SearchPage from "@/components/parts/SearchPage/SearchPage";

const index = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Stockary - Search: {router?.query?.s}</title>
      </Head>
      <SearchPage />
    </>
  );
};

export default index;
