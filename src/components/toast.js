import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { color, webColors } from "../constants";

const Toast = ({ toast }) => {
  const { colors, fonts } = useTheme();
  return (
    <View style={{...styles.container,backgroundColor:colors.body}}>
      <View style={styles.hr}></View>
      <View style={styles.content}>
        <Text style={{ ...fonts.medium, fontSize: 18 }}>{toast.message}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    width: "99%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    overflow: "hidden",
    width: "80%",
    borderRadius: 4,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor:color.grey4
    // elevation: 1,
    // borderWidth: 1,
  },
  hr: {
    height: 70,
    width: 5,
    borderRadius: 3,
    backgroundColor: webColors[1],
  },
});
export default Toast;
