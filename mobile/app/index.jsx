import { Link } from "expo-router";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import { useState } from "react";

export default function Index() {
  const [name, setname] = useState("Amit");
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link
        href={"./help"}
        style={{
          color: "red",
          fontSize: 30,
          paddingHorizontal: 10,
          margin: 20,
        }}
      >
        About{" "}
      </Link>
      <Image
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
        style={{ width: 100, height: 100 }}
      />
      <Text onPress={() => setname("Hello")}>{name}</Text>
    </View>
  );
}
