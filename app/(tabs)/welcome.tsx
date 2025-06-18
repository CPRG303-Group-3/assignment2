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

export default function WelcomePage() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: "https://images.unsplash.com/photo-1574541647051-099cedfb7f8f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWRtb250b258ZW58MHx8MHx8fDA%3D",
            }}
            accessibilityLabel="City of Edmonton"
          />
        </View>
        <View style={styles.infoSection}>
          <City link="https://www.edmonton.ca/" />
          <InterestingFact
            city="Edmonton"
            population={1.087}
            nickname="Festival City"
            festival="Edmonton Heritage Festival"
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
