import React, { useState, useEffect } from "react";
import Moment from "moment";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
const images = [
  "https://cdn.pixabay.com/photo/2021/05/23/15/56/child-6276604_960_720.jpg",
  "https://cdn.pixabay.com/photo/2022/09/06/14/40/beach-7436793_960_720.jpg",
  "https://cdn.pixabay.com/photo/2022/09/01/09/31/sunset-glow-7425170_960_720.jpg",
  "https://cdn.pixabay.com/photo/2022/08/19/12/11/leaves-7396788_960_720.jpg",
];
const { width, height } = Dimensions.get("window");
const api = "";
const Index = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={{ paddingLeft: 10, paddingRight: 10 }}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          marginBottom: 10,
        }}
      >
        <View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.white}>Business</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.white}>Entertaiment</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.white}>Variable</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.white}>Food</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.white}>Health</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <FlatList
            data={data.data}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <View
                key="1"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <View>
                  <Image
                    source={{ uri: item.image_url }}
                    style={{ width: 100, height: 100, borderRadius: 5 }}
                  />
                </View>
                <View style={{ paddingLeft: 10 }}>
                  <Text
                    style={{ fontWeight: "bold", fontSize: 15, color: "#000" }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: "#363636", marginTop: 3 }}
                  >
                    {item.description}
                  </Text>
                  <Text
                    style={{
                      fontStyle: "normal",
                      fontSize: 9,
                      color: "#ff0000",
                      marginTop: 3,
                    }}
                  >
                    <Text style={{ color: "#363636" }}>Post date: </Text>
                    {Moment(item.publishedAt).format("dddd MM, YYYY")}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  wrap: {
    width: width,
    height: width * 0.6,
  },
  image: {
    width: height,
    height: 300,
  },
  paging: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  pagingText: {
    color: "#888",
    margin: 3,
  },
  button: {
    borderRadius: 5,
    backgroundColor: "red",
    padding: 10,
    margin: 3,
  },
  white: {
    color: "#fff",
    fontWeight: "bold",
  },
});
export default Index;
