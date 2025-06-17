import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";
export default function WelcomeScreen() {
  const router = useRouter();
  return (
    <View>
      <Text style={styles.welcome}>Welcome to My New App</Text>
      <Pressable
        onPress={() => router.push("https://www.calgary.ca/home.html")}
      >
        <Text style={styles.city}>Go to city page</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  welcome: {
    textAlign: "center",
    fontSize: 24,
  },
  city: {
    textAlign: "center",
    fontSize: 16,
  },
});
