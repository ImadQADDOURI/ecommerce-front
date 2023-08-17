import styled from "styled-components";
import { FaPhone, FaEnvelope, FaInfoCircle, FaNewspaper, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Link from "next/link";

const StyledFooter = styled.footer`
  background-color: #222;
  color: white;
  margin-top: 50px; /* Add margin to create space between content and footer */
  padding: 40px 0;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IconContainer = styled.div`
  background-color: #f39c12;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContactText = styled.p`
  margin: 0;
`;

const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SocialIconLink = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  color: white;
  text-decoration: none;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #3498db;
  }
`;

const IconLabel = styled.span`
  font-size: 14px;
`;

const SectionWithIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SubscribeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SubscribeButton = styled.button`
  background-color: #f39c12;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #e67e22;
  }
`;

const NewsletterInput = styled.input`
  padding: 10px;
  border: none;
  border-radius: 4px;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <FooterContainer>
        <FooterSection>
          <h3>Contact Us</h3>
          <ContactInfo>
            <IconContainer>
              <FaPhone />
            </IconContainer>
            <ContactText>+1 (123) 456-7890</ContactText>
          </ContactInfo>
          <ContactInfo>
            <IconContainer>
              <FaEnvelope />
            </IconContainer>
            <ContactText>TopTech@Ecommerce.com</ContactText>
          </ContactInfo>
        </FooterSection>
        <FooterSection>
          <h3>Follow Us</h3>
          <SocialLinks>
            <SocialIconLink href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
              <IconLabel>Facebook</IconLabel>
            </SocialIconLink>
            <SocialIconLink href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
              <IconLabel>Twitter</IconLabel>
            </SocialIconLink>
            <SocialIconLink href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
              <IconLabel>Instagram</IconLabel>
            </SocialIconLink>
          </SocialLinks>
        </FooterSection>
        <FooterSection>
          <h3>About Us</h3>
          <p>
          Welcome to TopTech - Your Destination for Premium Electronics. Explore our curated selection of cutting-edge tech products, where innovation meets quality. Join us in revolutionizing your shopping experience.          </p>
        </FooterSection>
        <FooterSection>
          <h3>Newsletter</h3>
          <SubscribeSection>
            <p>Subscribe to our newsletter for updates.</p>
            <NewsletterInput type="email" placeholder="Enter your email" />
            <SubscribeButton>Subscribe</SubscribeButton>
          </SubscribeSection>
        </FooterSection>
      </FooterContainer>
    </StyledFooter>
  );
}
