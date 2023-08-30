import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import icons
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`;

const SliderContainer = styled.div`
  position: relative; /* Add this */
  width: 100%; /* Set a suitable width for the slider */
  margin: 0 auto;
`;

// Styles for custom navigation buttons
const CustomArrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
 /* background-color: #666666; /* Gray background color */
  color: white;
  width: 100px; /* Increase the button width */
  height: 100px; /* Increase the button height */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 24px; /* Increase the font size */
  transition: background-color 0.3s ease-in-out;
  z-index: 0;
`;

const CustomPrevArrow = styled(CustomArrow)`
  left: -60px; /* Adjust the button's left position */
`;

const CustomNextArrow = styled(CustomArrow)`
  right: -60px; /* Adjust the button's right position */
`;

export default function NewProducts({ products }) {
  const sliderSettings = {
    dots: true, // Show navigation dots
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show 4 products at a time
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow><FaChevronLeft /></CustomPrevArrow>, // Custom previous arrow
    nextArrow: <CustomNextArrow><FaChevronRight /></CustomNextArrow>, // Custom next arrow
  };

  return (
    <Center>
      <Title>New Arrivals</Title>
      <SliderContainer>
        <Slider {...sliderSettings}>
          {products.map((product, index) => (
            <div key={index}>
              <ProductsGrid products={[product]} />
            </div>
          ))}
        </Slider>
      </SliderContainer>
    </Center>
  );
}
