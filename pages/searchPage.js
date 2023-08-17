import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import Footer from "@/components/Footer";

export default function ProductsPage({products,decodedSearch}) {
  return (
    <>
      <Header />
      <Center>
        <Title>Results for {decodedSearch}</Title>
        <ProductsGrid products={products} />
        <br /><br />
      </Center>
      <Footer/>
    </>
  );
}

export async function getServerSideProps(context) {
    await mongooseConnect();
  
    const { search } = context.query;
    const decodedSearch = search ? decodeURIComponent(search) : '';
    const products = await Product.find({ title: { $regex: decodedSearch, $options: 'i' } }, null, { sort: { '_id': -1 } });
  
    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
        decodedSearch:decodedSearch
      },
    };
  }