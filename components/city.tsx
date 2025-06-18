import { Text, View, Image, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

type CityProps = {
  link: string;
};
export default function City({ link }: CityProps) {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(`${link}`)}>
      <Text style={styles.city}>Go to city page</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  city: {
    textAlign: "center",
    fontSize: 16,
  },
});
