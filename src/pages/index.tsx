import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";
import styles from "./index.module.css";
import { Button, Stack } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Work It</title>
        <meta name="description" content="A super simple workout generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack p="5">
        <Link href="/workout">
          <Button w="100%" colorScheme="facebook">
            Workouts
          </Button>
        </Link>
        <Link href="/exercise">
          <Button w="100%" colorScheme="twitter">
            Exercises
          </Button>
        </Link>
        <Link href="add-exercise">
          <Button w="100%" colorScheme="blue">
            Add Exercise
          </Button>
        </Link>
      </Stack>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.post.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className={styles.authContainer}>
      <p className={styles.showcaseText}>
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className={styles.loginButton}
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
