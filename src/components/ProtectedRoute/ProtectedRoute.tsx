import { signIn, useSession } from "next-auth/react";
import { Button, Center, Heading, Stack } from "@chakra-ui/react";

type Props = {
    children: React.ReactNode
}
export default function ProtectedRoute({ children }: Props) {
    const { status } = useSession()
    if (status === "authenticated") {
        return children
    }
    return <Center p="5">
        <Stack>
            <Heading>Please Login</Heading>
            <Button onClick={() => signIn()} colorScheme="twitter">Login</Button>
        </Stack>
    </Center>
}