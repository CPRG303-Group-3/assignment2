import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function WelcomePage() {
  const router = useRouter();
  return (
    <View>
      <Pressable onPress={() => router.push("https://www.edmonton.ca/")}>
        <Text style={styles.city}>Go to city page</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  city: {
    textAlign: "center",
    fontSize: 16,
  },
});
