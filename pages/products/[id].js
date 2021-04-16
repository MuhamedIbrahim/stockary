import productsfetcher from "@/utils/fetcher/productsFetcher";
import SingleProductPage from "@/components/parts/SingleProductPage/SingleProductPage";

const productPage = ({ product }) => {
  return <SingleProductPage product={product} />;
};

export const getStaticProps = async ({ params }) => {
  const product = await productsfetcher(`products/${params.id}`);
  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { id: "5L98r5cVfyNhFmZ1f8Yq" } }],
    fallback: true,
  };
};

export default productPage;
