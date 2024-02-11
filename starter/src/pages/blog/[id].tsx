import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import PageTitle from "../../components/PageTitle";
import RelatedBlogs from "../../components/RelatedBlogs";
import {
  BlogDetailProps,
  FeaturedBlogsProps,
} from "../../interfaces/Interfaces";

const BlogDetail: NextPage<BlogDetailProps> = ({ blogDetailData,  randomBlogsData }) => {
  return (
    <>
      <Head>
        <title>Store - title</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageTitle title={blogDetailData.title} />

      <section className="bg0 p-t-52 p-b-20">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-9 p-b-80">
              <div className="p-r-45 p-r-0-lg">
                <div className="wrap-pic-w how-pos5-parent">
                  <img src={blogDetailData.img} alt="IMG-BLOG" />
                </div>

                <div className="p-t-32">
                  <span className="flex-w align-items-center flex-m stext-111 cl2 p-b-19">
                    <span className="flex-c-m mr-3 bor7 p-lr-15 trans-04">
                      {blogDetailData.category}
                    </span>

                    <span>
                      <span className="cl4">By</span> {blogDetailData.author}
                      <span className="cl12 m-l-4 m-r-6">|</span>
                    </span>

                    <span>{blogDetailData.date}</span>
                  </span>

                  <h4 className="ltext-109 cl2 p-b-28">{blogDetailData.title}</h4>

                  <p className="stext-117 cl6 p-b-26">{blogDetailData.first_content}</p>

                  <p className="stext-117 cl6 p-b-26">{blogDetailData.second_content}</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-lg-3 p-b-80">
              <div className="side-menu">
                <RelatedBlogs randomBlogs={randomBlogsData}/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogsRes = await fetch("http://localhost:5001/blogs");
  const blogsData: FeaturedBlogsProps[] = await blogsRes.json();

  const paths = blogsData.map((blog) => ({
    params: { id: blog.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  
  let blogDetailData: FeaturedBlogsProps | null = null;

  if (params && params.id) {
    const blogDetailRes = await fetch(
      `http://localhost:5001/blogs/${params.id}`
    );
    blogDetailData = await blogDetailRes.json();
  }
  const randomNo = Math.floor(Math.random() * 4);
  const randomBlogsRes = await fetch(`http://localhost:5001/blogs?_start=${randomNo}&_limit=3`);
  const randomBlogsData = await randomBlogsRes.json();
  
  return {
    props: {
      blogDetailData: blogDetailData || {},
      randomBlogsData
    },
  };
};

export default BlogDetail;