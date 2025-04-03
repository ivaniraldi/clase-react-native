import { View, Text, Image, StyleSheet, Animated } from "react-native";
import React, { useEffect, useRef } from "react";

export default function Card({ item }) {
  return (
    <View style={styles.card} key={item.id}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </View>
  );
}

export function AnimatedCard({ item, index }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      delay: index * 250,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <Card item={item} />
    </Animated.View>
  );
}


const styles = StyleSheet.create({
  card: {
    padding: 22,
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    width: "auto",
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
    borderRadius: 10
  },
  title: {
    fontSize: 20,
    color:"#352F44",
    fontWeight: "900",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color:"#5C5470",
    marginBottom: 10,
  },
  price: {
    color: "#C5BAFF",
    marginTop: 10,
    textAlign: "right",
    fontSize: 24,
    fontWeight: "900",
  },
});
