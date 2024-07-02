import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import ChatCard from "./cartCard";
import ButtonC from "./buttonc";
import { useSelector } from "react-redux";

const ChatScreen = ({ navigation }) => {
  const user = useSelector(({ user }) => user);
  const { colors, fonts } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.body }]}>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7]}
        renderItem={(item) => <ChatCard />}
      />
      <View style={{ alignItems: "center", marginVertical: 10, minHeight: 30 }}>
        {user?.isLoggedIn && (
          <ButtonC
            onPress={() => {
              navigation?.navigate("NewComment");
            }}
            style={{ width: 200 }}
            title="Post a comment"
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 90,
    padding: 10,
    marginBottom: 20,
  },
});
export default ChatScreen;
