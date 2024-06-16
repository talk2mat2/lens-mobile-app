import React from "react";
import { Text, TouchableHighlight } from "react-native";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const SearchItem = ({ item, navigation }) => {
  const { colors, fonts } = useTheme();
  return (
    <TouchableHighlight
      onPress={() => {
        navigation?.navigate("DetailView", { userId: item?.id });
      }}
      underlayColor={colors.body6}
      style={{ ...styles.container, borderColor: "#f2f2f2",backgroundColor:colors.body }}
    >
      <View>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ ...fonts.small, fontWeight: "bold", fontSize: 15 ,  color:colors.textColor2}}>
            {item?.userName}
          </Text>
          <Text
            style={{ ...fonts.small, fontSize: 14, color: colors.textColor3 }}
          >
            @{item?.brand}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    width: "85%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    marginVertical: 2,
    padding: 5,
  },
});
export default SearchItem;
