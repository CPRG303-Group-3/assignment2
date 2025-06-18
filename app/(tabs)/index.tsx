import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import City from "../../components/city";
import InterestingFact from "../../components/interestingfact";

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
      <City link="https://www.calgary.ca/home.html" />
      <InterestingFact
        city="Calgary"
        population={1.414}
        nickname="Cowtown"
        festival="Stampede"
      />
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
