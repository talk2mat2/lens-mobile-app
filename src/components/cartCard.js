import React from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { color } from "../constants";

const ChatCard = ({
  title = "John",
  body = "thi si s is not a function (it is undefined thi si s is not a function (it is undef ",
}) => {
  const { colors, fonts } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: styles.container }]}>
      <Text
        style={{
          ...fonts.small,
          fontWeight: "800",
          color: color.orange,
        }}
      >
        {title} says
      </Text>
      <Text
        style={{
          ...fonts.small,
          fontSize:14,
          fontWeight: "200",
        }}
      >
        {body}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 6,
    borderBottomWidth:1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    minHeight: 80,
  },
});

export default ChatCard;
