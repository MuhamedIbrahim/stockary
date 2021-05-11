import ProductsHeader from "@/components/parts/ProductsHeader/ProductsHeader";
import options from "@/utils/fetcher/options";
import fetcher, {
  getCachedProductsShow,
  toggleProductsShow,
} from "@/utils/fetcher/productsFetcher";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import SingleProduct from "../SingleProduct/SingleProduct";
import Skeleton from "@/components/UI/Skeleton/Skeleton";
import { colors } from "@/styles/theme";
import PopularProducts from "../PopularProducts/PopularProducts";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectAllFavs } from "@/utils/redux/slices/favSlice";

const SearchProducts = styled.div.attrs((props: { showStyle: string }) => ({
  showStyle: props.showStyle,
}))`
  display: grid;
  grid-template-columns: ${({ showStyle }) =>
    showStyle === "list" ? "repeat(4, 1fr)" : "repeat(1, 1fr) !important"};
  gap: 30px;
  margin-top: 30px;
  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 576px) {
    grid-template-columns: auto;
  }
`;

const SearchContent = styled.div`
  margin-top: 30px;
`;

const SearchPage = () => {
  let { query } = useRouter();

  const [showStyle, setShowStyle] = useState("list");

  const { favs: favProducts = [] } = useSelector(selectAllFavs);

  const dispatch = useDispatch();

  const { data: dataProducts = [], isValidating: isLoading } = useSWR(
    query?.s && ["products/search", null, query?.s],
    fetcher,
    options
  );

  useEffect(() => {
    getCachedProductsShow(setShowStyle);
  }, []);

  const onChangeStyleHandler = useCallback((newStyle) => {
    toggleProductsShow(newStyle, setShowStyle);
  }, []);

  return (
    <>
      {!query?.s && isLoading ? (
        <div className="container" style={{ paddingTop: "40px" }}>
          <Skeleton
            height="36px"
            width="100%"
            bgColor={colors.black[80]}
            number={2}
          />
        </div>
      ) : (
        <ProductsHeader
          showStyle={showStyle}
          title={`Search for: ${query?.s}`}
          changed={onChangeStyleHandler}
          hideStyle={dataProducts.length === 0}
        />
      )}
      <SearchContent>
        <div className="container">
          {isLoading ? (
            <Skeleton
              height="1000px"
              width="100%"
              bgColor={colors.black[80]}
              number={25}
              fullwidth
            />
          ) : dataProducts.length === 0 ? (
            <p style={{ color: colors.black[80], fontSize: "15px", margin: 0 }}>
              Can't find what you are looking for. Try another keywords.
            </p>
          ) : (
            <SearchProducts showStyle={showStyle}>
              {dataProducts.map((prod) => (
                <SingleProduct
                  rowStyle={showStyle === "row"}
                  key={prod.id}
                  product={prod}
                  favs={favProducts}
                  dispatch={dispatch}
                />
              ))}
            </SearchProducts>
          )}
        </div>
      </SearchContent>
      {dataProducts.length === 0 && !isLoading && <PopularProducts />}
    </>
  );
};

export default SearchPage;
