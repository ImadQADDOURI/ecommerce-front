import {createGlobalStyle} from "styled-components";
import {CartContextProvider} from "@/components/CartContext";

import { SessionProvider as Provider } from "next-auth/react"; 


const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  body{
    background-color: #eee;
    padding:0;
    margin:0;
    font-family: 'Poppins', sans-serif;
  }
`;

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Provider session={session} >
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </Provider>
  );
}
