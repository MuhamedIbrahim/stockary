import { memo } from "react";

const CarouselPagination = ({ pages, activePage, onClick, styles }) => {
  return (
    <div className={styles.featured_prods_carousel_pagination}>
      {pages?.map((page) => (
        <button
          aria-label="Carousel Pagination"
          onClick={() => onClick(page)}
          key={page}
          disabled={activePage === page}
          className={[
            styles.featured_prods_carousel_pagination_dot,
            activePage === page
              ? styles["featured_prods_carousel_pagination_dot--active"]
              : "",
          ].join(" ")}
        ></button>
      ))}
    </div>
  );
};

export default memo(CarouselPagination);
