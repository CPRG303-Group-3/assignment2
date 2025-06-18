import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  SafeAreaView,
} from "react-native";
import City from "../../components/city";
import InterestingFact from "../../components/interestingfact";

export default function WelcomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: "https://plus.unsplash.com/premium_photo-1673241100156-2e04fca1a4af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FsZ2FyeXxlbnwwfHwwfHx8MA%3D%3D",
            }}
            accessibilityLabel="City of Calgary"
          />
        </View>
        <View style={styles.infoSection}>
          <City link="https://www.calgary.ca/home.html" />
          <InterestingFact
            city="Calgary"
            population={1.414}
            nickname="Cowtown"
            festival="Stampede"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  content: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    justifyContent: "center",
  },
  imageContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 20,
    marginBottom: 30,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
  infoSection: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
