import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { ChakraProvider, Container } from "@chakra-ui/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import NavBar from "~/components/NavBar/NavBar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <NavBar />
        <Container height="100%">
          <Component {...pageProps} />
        </Container>
      </SessionProvider>
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
