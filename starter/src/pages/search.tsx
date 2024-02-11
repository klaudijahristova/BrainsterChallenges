import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import BlogItem from "../components/BlogItem";
import PageTitle from "../components/PageTitle";
import ProductItem from "../components/ProductItem";
import { SearchPageProps } from "../interfaces/Interfaces";


const Search: NextPage<SearchPageProps> = ({ blogsData, productsData }) => {
  return (
    <>
      <Head>
        <title>Store - Search</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageTitle title={"Search"} />

      <div className="bg0 m-t-23 p-b-140 mt-5">
        <div className="container">
          <>
            {blogsData && blogsData.length > 0 ? (
              <h2 className="mb-5">Blogs</h2>
            ) : (
              ""
            )}
            <div className="row isotope-grid">
              <div className="col-4">
                {blogsData && blogsData.length > 0
                  ? blogsData.map((blog) => (
                    
                      <BlogItem blogs={blog} key={blog.id} />
                    ))
                  : ""}
              </div>
              {/* !! */}
            </div>
          </>

          <>
            {productsData && productsData.length ? (
              <h2 className="mb-5">Products</h2>
            ) : (
              ""
            )}

            <div className="row isotope-grid">
              {productsData && productsData.length > 0
                ? productsData.map((product) => (
                    <ProductItem product={product} key={product.id} />
                  ))
                : ""}
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let blogsData = null;
  let productsData = null;

  const searchFilter = query.q;
  if (searchFilter) {
    const blogsRes = await fetch(
      `http://localhost:5001/blogs?q=${searchFilter}`
    );
    blogsData = await blogsRes.json();
    const productsRes = await fetch(
      `http://localhost:5001/products?q=${searchFilter}`
    );
    productsData = await productsRes.json();
  }

  return {
    props: {
      blogsData,
      productsData,
    },
  };
};

export default Search;
