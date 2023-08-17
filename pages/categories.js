import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import {mongooseConnect} from "@/lib/mongoose";
import { Category } from '@/models/Category';import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { useRouter } from 'next/router';
import {useState} from "react";
import Footer from "@/components/Footer";


const CategoryButton = styled.button`
width: 100%;
 border: none;
 color: black;
 background-color: transparent;
 text-align: left;
 font-size: 20px;
 cursor: pointer;
 padding : 1rem;  
 margin: 0%;

`;

const Myol = styled.ol`
 list-style: none;
	counter-reset: list;
	padding: 0 1rem;
`;
const Myli = styled.li`
	max-width: 70%;
	margin: 1rem auto;
	padding: 0%;
	box-shadow: 0.1rem 0.1rem 1.5rem rgba(0, 0, 0, 0.3);
	border-radius: 0.25rem;
	overflow: hidden;
	background-color: white;
  transition: 0.5s;

  &:hover  {
    padding-right: 25px;

  background-color: #64E06A; /* Green */
  color: white;
  }
  &:hover after {
    opacity: 1;
    right: 0;
  }


`;



export default function CategoriesPage({categories}) {

  const router = useRouter();
  const [category, setCategory] = useState({ name: 'Electronics', id: 1 });

  const handleCategorySelect = (category) => {
    setCategory(category);
    router.push({
      pathname: '/categoryProducts',
      query: { category: JSON.stringify(category) }
    });  
  };

console.log(categories);
  return (
    <>
  
      <Header />  
      
      <Center>
        <Title>All Categories</Title>

        <Myol >
          {categories.length > 0 && categories.map(category => (
            <Myli key={category._id} onClick={() => handleCategorySelect(category)}>
            <CategoryButton >
      
            {category.name}
      
           </CategoryButton>
            </Myli>
              
              
          ))}
          </Myol>
          
      </Center>
      <Footer/>
    </>
  );
}

export async function getServerSideProps() {
    await mongooseConnect();
    const categories = await Category.find({}, null, {sort:{'name':1}});
    return {
      props:{
        categories: JSON.parse(JSON.stringify(categories)),
      }
    };
  }
