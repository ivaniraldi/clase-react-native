import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import {
  getData,
  getItem,
  getCategories,
  getByCategory,
} from "../lib/products";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Card, { AnimatedCard } from "./Card";
import { Logo } from "./Logo";

export function Main() {
  const [data, setData] = useState([]);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    getData()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View
        style={{
          marginBottom: 10,
          marginTop: 5,
          paddingVertical: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Logo />
        <Text
          style={{
            fontSize: 25,
            fontWeight: "900",
            marginLeft: 10,
          }}
        >
          FakeStore App
        </Text>
      </View>
      {data.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator />
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(data) => data.id.toString()}
          renderItem={({ item, index }) => (
            <AnimatedCard item={item} index={index} />
          )}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
}
