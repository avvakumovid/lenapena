import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import GridView from "react-native-draggable-gridview";

const DnD = () => {
  const [data, setData] = useState(["1", "2", "3", "4", "5", "6"]);
  return (
    <GridView
      data={data}
      numColumns={1}
      renderItem={item => (
        <View
          style={{
            flex: 1,
            margin: 1,
            justifyContent: "center",
            backgroundColor: "gray",
          }}
        >
          <Text style={{ textAlign: "center" }}>{item}</Text>
        </View>
      )}
      onReleaseCell={items => setData(items)}
    />
  );
};

export default DnD;

const styles = StyleSheet.create({});
