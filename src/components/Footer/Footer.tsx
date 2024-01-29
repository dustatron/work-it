import { Box, Stack } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type Props = { children: ReactNode };

export default function Footer({ children }: Props) {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      position="fixed"
      bottom="0"
      left="0"
      padding="2"
      borderTop="1px solid black"
      w="100%"
      bg="gray.50"
    >
      {children}
    </Stack>
  );
}
