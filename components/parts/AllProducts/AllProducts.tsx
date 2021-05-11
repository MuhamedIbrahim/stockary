import { Button, IconButton } from "@/components/UI/Button/Button";
import Skeleton from "@/components/UI/Skeleton/Skeleton";
import { filterConditionContent, filterPriceContent } from "@/config";
import { colors } from "@/styles/theme";
import catsFetcher from "@/utils/fetcher/categoriesFetcher";
import options from "@/utils/fetcher/options";
import prodsFetcher, {
  getCachedProductsShow,
  toggleProductsShow,
} from "@/utils/fetcher/productsFetcher";
import {
  cleanFilterString,
  cloneAllProductsFilterState,
} from "@/utils/generalFunctions";
import { selectAllFavs } from "@/utils/redux/slices/favSlice";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import ProductsHeader from "../ProductsHeader/ProductsHeader";
import SingleProduct from "../SingleProduct/SingleProduct";
import styles from "./AllProducts.module.css";
import FilterSection from "./FilterSection/FilterSection";

const AllProducts = ({
  filter = false,
  filterCats = false,
  filterCondition = false,
  filterPrice = false,
}) => {
  const router = useRouter();

  const [showStyle, setShowStyle] = useState("list");

  const [filterSelections, setFilterSelections] = useState({
    category: [],
    condition: filterConditionContent.map((_) => false),
    price: "",
  });

  const { favs: favProducts = [] } = useSelector(selectAllFavs);

  const dispatch = useDispatch();

  const { data: products = [], isValidating: productsLoading } = useSWR(
    ["products/filter", router.query, ""],
    prodsFetcher,
    options
  );

  const productsFilterSections = useRef(null);
  const productsFilterSectionsCta = useRef(null);

  useEffect(() => {
    getCachedProductsShow(setShowStyle);
    (async () => {
      const productsCats = await catsFetcher("categories/all", "filter");
      setFilterSelections((currentFilter) => {
        const updatedFilter = cloneAllProductsFilterState(currentFilter);
        updatedFilter.category = productsCats;
        const requestedCats = router.query?.cat
          ? Array.isArray(router.query.cat)
            ? router.query.cat
            : [router.query.cat]
          : [];
        const requestedCondition = router.query?.cond
          ? Array.isArray(router.query.cond)
            ? router.query.cond
            : [router.query.cond]
          : [];
        const requestedPrice = router.query?.price ? [router.query?.price] : [];
        updatedFilter.category.map((cat) => {
          if (requestedCats.includes(cat.id)) {
            cat.checked = true;
          }
        });
        filterConditionContent.forEach((cond, index) => {
          if (requestedCondition.includes(cleanFilterString(cond.value))) {
            updatedFilter.condition[index] = true;
          }
        });
        filterPriceContent.forEach((price) => {
          if (requestedPrice.includes(cleanFilterString(price.value))) {
            updatedFilter.price = price.value;
          }
        });
        return updatedFilter;
      });
    })();
  }, [router.query]);

  const onChangeStyleHandler = useCallback((newStyle) => {
    toggleProductsShow(newStyle, setShowStyle);
  }, []);

  const onToggleFilter = useCallback((e, index) => {
    setFilterSelections((currentFilter) => {
      const updatedFilter = cloneAllProductsFilterState(currentFilter);
      if (e.target.name === "category") {
        updatedFilter[e.target.name][index].checked = e.target.checked;
      } else if (e.target.name === "condition") {
        updatedFilter[e.target.name][index] = e.target.checked;
      } else if (e.target.name === "price") {
        updatedFilter[e.target.name] = e.target.value;
      }
      return updatedFilter;
    });
  }, []);

  const onSubmitFilter = useCallback(() => {
    let catsPath = [];
    let condsPath = [];
    let pricePath =
      filterSelections.price === ""
        ? []
        : [cleanFilterString(filterSelections.price)];

    filterSelections.category.forEach((cat) => {
      if (cat.checked) {
        catsPath.push(cat.id);
      }
    });

    filterConditionContent.forEach((cond, index) => {
      if (filterSelections.condition[index] === true) {
        condsPath.push(cleanFilterString(cond.value));
      }
    });

    router.push({
      pathname: "/products",
      query: { cat: catsPath, cond: condsPath, price: pricePath },
    });
  }, [filterSelections]);

  const onClearFilterSectionHandler = useCallback((section, all = false) => {
    if (all) {
      setFilterSelections((currentFilter) => {
        let updatedFilter = cloneAllProductsFilterState(currentFilter);
        updatedFilter.category.forEach((elm) => {
          elm.checked = false;
        });
        return {
          category: updatedFilter.category,
          condition: filterConditionContent.map((_) => false),
          price: "",
        };
      });
      router.push({
        pathname: "/products",
      });
    } else {
      setFilterSelections((currentFilter) => {
        let updatedFilter = cloneAllProductsFilterState(currentFilter);
        if (section === "category") {
          updatedFilter[section].forEach((cat) => {
            cat.checked = false;
          });
        } else if (section === "condition") {
          updatedFilter[section] = filterConditionContent.map((_) => false);
        } else if (section === "price") {
          updatedFilter[section] = "";
        }
        return updatedFilter;
      });
    }
  }, []);

  const onToggleFilterSectionMobile = useCallback(() => {
    if (productsFilterSections && productsFilterSectionsCta) {
      if (
        productsFilterSections.current.classList.contains(
          styles["all_products__filter_section_content--active"]
        )
      ) {
        productsFilterSections.current.classList.remove(
          styles["all_products__filter_section_content--active"]
        );
        productsFilterSectionsCta.current.classList.remove(
          styles["all_products__filter_cta--active"]
        );
      } else {
        productsFilterSections.current.classList.add(
          styles["all_products__filter_section_content--active"]
        );
        productsFilterSectionsCta.current.classList.add(
          styles["all_products__filter_cta--active"]
        );
      }
    }
  }, [productsFilterSections, productsFilterSectionsCta]);

  return (
    <>
      <ProductsHeader
        showStyle={showStyle}
        title="Products"
        changed={onChangeStyleHandler}
      />
      <div className={styles.all_products}>
        <div className="container">
          <div
            className={[
              styles.all_products__content,
              filter ? styles["all_products__content--grid"] : "",
            ].join(" ")}
          >
            {filter && (
              <div className={styles.all_products__filter_section}>
                <div className={styles.all_products__filter_section_toggle}>
                  <Button
                    name="Show Filter"
                    size="sm"
                    bgColor={colors.cyan[70]}
                    color={colors.black[100]}
                    mb="30px"
                    onClick={onToggleFilterSectionMobile}
                  >
                    <svg
                      fill={colors.black[100]}
                      height="15"
                      width="15"
                      viewBox="0 0 512 512"
                    >
                      <path d="M458.5 0h-405a17.26 17.26 0 00-17.26 17.26v73.06c0 4.3 1.6 8.44 4.5 11.62l153.7 168.8v224a17.26 17.26 0 0025.82 14.98l88.6-50.62a17.25 17.25 0 008.7-14.98V270.74l153.7-168.8c2.9-3.18 4.5-7.32 4.5-11.62V17.26C475.76 7.73 468.03 0 458.5 0zm-17.26 83.64l-153.7 168.8a17.23 17.23 0 00-4.5 11.61V434.1L228.96 465V264.06c0-4.3-1.6-8.44-4.5-11.62L70.76 83.64V34.52h370.48v49.12z" />
                    </svg>
                    Filter Products
                  </Button>
                </div>
                <div
                  className={styles.all_products__filter_section_content}
                  ref={productsFilterSections}
                >
                  {filterCats && (
                    <FilterSection
                      onChange={onToggleFilter}
                      title="Categories"
                      contentType="category"
                      filterType="checkbox"
                      onClear={onClearFilterSectionHandler}
                      state={filterSelections["category"]}
                    />
                  )}
                  {filterCondition && (
                    <FilterSection
                      onChange={onToggleFilter}
                      title="Condition"
                      contentType="condition"
                      filterType="checkbox"
                      onClear={onClearFilterSectionHandler}
                      state={filterSelections["condition"]}
                    />
                  )}
                  {filterPrice && (
                    <FilterSection
                      onChange={onToggleFilter}
                      title="Price"
                      contentType="price"
                      filterType="radio"
                      onClear={onClearFilterSectionHandler}
                      state={filterSelections["price"]}
                    />
                  )}
                </div>
                <div
                  className={styles.all_products__filter_cta}
                  ref={productsFilterSectionsCta}
                >
                  <Button
                    name="Apply Filter"
                    size="sm"
                    bgColor={colors.blue[100]}
                    color={colors.white[100]}
                    onClick={onSubmitFilter}
                    mr="10px"
                  >
                    Apply Filters
                  </Button>
                  <Button
                    name="Clear Filter"
                    size="sm"
                    bgColor={colors.cyan[70]}
                    color={colors.black[100]}
                    onClick={() => onClearFilterSectionHandler("", true)}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
            <div className={styles.all_products__filter_products}>
              {productsLoading ? (
                <Skeleton
                  number={20}
                  height="1000px"
                  width="100%"
                  fullwidth
                  bgColor={colors.black[80]}
                />
              ) : products.length === 0 ? (
                <p
                  className={styles.all_products__not_found}
                  style={{ color: colors.black[80] }}
                >
                  Sorry, we can't find your requested products.
                </p>
              ) : (
                <>
                  <div
                    className={[
                      styles.all_products__filter_products_sec,
                      showStyle === "row"
                        ? styles["all_products__filter_products_sec--row"]
                        : "",
                    ].join(" ")}
                  >
                    {products.map((prod) => (
                      <SingleProduct
                        key={prod.id}
                        product={prod}
                        favs={favProducts}
                        rowStyle={showStyle === "row"}
                        dispatch={dispatch}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
