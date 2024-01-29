import { Stack } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type Props = { children: ReactNode; isCenter?: boolean };

export default function Footer({ children, isCenter }: Props) {
  return (
    <Stack
      direction="row"
      justifyContent={isCenter ? "center" : "space-between"}
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
