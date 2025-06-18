import { Text, View, StyleSheet } from "react-native";
import React from "react";

type FactProp = {
  city: string;
  population: number;
  nickname: string;
  festival: string;
};

export default function InterestingFact({
  city,
  population,
  nickname,
  festival,
}: FactProp) {
  return (
    <View>
      <Text style={styles.intro}>Interesting Facts about {city}, Alberta</Text>
      <Text>
        {"\u2022"}
        {city} is a city in Alberta with a population of around {population}
        million as of 2022.
      </Text>
      <Text>
        {"\u2022"}City is also lovingly known as {nickname}
      </Text>
      <Text>
        {"\u2022"}
        Most popular festival in {city} is {festival}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  intro: {
    fontSize: 18,
    textDecorationLine: "underline",
  },
});
