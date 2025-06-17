import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
export default function WelcomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to My New App</Text>
      <Image
        style={styles.image}
        source={{
          uri: "https://plus.unsplash.com/premium_photo-1673241100156-2e04fca1a4af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FsZ2FyeXxlbnwwfHwwfHx8MA%3D%3D",
        }}
        accessibilityLabel="City of Calgary"
      />
      <Pressable
        onPress={() => router.push("https://www.calgary.ca/home.html")}
      >
        <Text style={styles.city}>Go to city page</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  welcome: {
    textAlign: "center",
    fontSize: 24,
  },
  city: {
    textAlign: "center",
    fontSize: 16,
  },
  image: {
    width: 250,
    height: 250,
  },
});
