import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { capitalize } from "lodash";

interface Props {
  children: React.ReactNode;
  link: string;
}

const Links = [
  { title: "Workouts", link: "/workout" },
  { title: "Exercises", link: "/exercise" },
  { title: "Add Exercise", link: "/add-exercise" },
];

const NavLink = (props: Props) => {
  const { children, link } = props;
  const { data: sessionData } = useSession();
  console.log("session", sessionData);

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={link}
    >
      {children}
    </Box>
  );
};

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: sessionData } = useSession();
  const router = useRouter();

  const getTitle = (route: string) => {
    switch (route) {
      case "/exercise":
        return "Exercise List";

      case "/add-exercise":
        return "Add Exercise";

      case "/exercise/[id]":
        return "Exercise Details";

      case "/add-exercise":
        return "Add Exercise";

      case "/workout":
        return "Workout List";

      case "/add-workout":
        return "Add Workout";

      case "/workout/[workoutId]":
        return "Your Workout";

      default:
        return "Work It";
    }
  };

  const title = getTitle(router.route);
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Link href="/">
              <Box>{title}</Box>
            </Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.link} link={link.link}>
                  {link.title}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={sessionData?.user.image || "/temp-profile.png"}
                />
              </MenuButton>
              <MenuList>
                {sessionData && (
                  <Box p="1">
                    <Text fontWeight="bold" align="left" pl="2">
                      {capitalize(sessionData.user?.name ?? "")}
                    </Text>
                  </Box>
                )}
                <MenuDivider />
                <MenuItem
                  onClick={
                    sessionData ? () => void signOut() : () => void signIn()
                  }
                >
                  {sessionData ? "Sign out" : "Sign in"}
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.link} link={link.link}>
                  {link.title}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
