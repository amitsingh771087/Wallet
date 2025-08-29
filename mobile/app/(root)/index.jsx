import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SignOutButton } from "@/components/SignOutButton.jsx";
import { useTransactions } from "../../hooks/useTransactions";
import { useEffect } from "react";

export default function Page() {
  const { user } = useUser();

  const { transactions, summary, loadData, isLoaded, deleteTransaction } =
    useTransactions(user.id);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>

        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  );
}
