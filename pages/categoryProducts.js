import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import Footer from "@/components/Footer";

/*******************************************************


export default function ProductsPage({products,parsedCategory}) {
  

  return (
    <>
      <Header />
      <Center>
        <Title>${parsedCategory.name} products</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();

  const { category } = context.query;
  const products = await Product.find({ category: category._id }, null, { sort: { '_id': -1 } });
  return {
    props:{
      products: JSON.parse(JSON.stringify(products)),
      parsedCategory:category ,
    }
  };
}

*/

export default function ProductsPage({ products, parsedCategory }) {
    return (
      <>
        <Header />
        <Center>
          <Title>{parsedCategory.name} Products </Title>
          <ProductsGrid products={products} />
        </Center>
        <Footer/>
      </>
    );
  }
  
  export async function getServerSideProps(context) {
    await mongooseConnect();
  
    const { category } = context.query;
    const parsedCategory = category ? JSON.parse(decodeURIComponent(category)) : null;
    const products = await Product.find({ category: parsedCategory._id }, null, { sort: { '_id': -1 } });
  
    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
        parsedCategory: parsedCategory,
      },
    };
  }