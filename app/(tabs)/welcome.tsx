import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";

export default function WelcomePage() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: "https://images.unsplash.com/photo-1574541647051-099cedfb7f8f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWRtb250b258ZW58MHx8MHx8fDA%3D",
        }}
        accessibilityLabel="City of Edmonton"
      />
      <Pressable onPress={() => router.push("https://www.edmonton.ca/")}>
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
  city: {
    textAlign: "center",
    fontSize: 16,
  },
  image: {
    width: 250,
    height: 250,
  },
});
