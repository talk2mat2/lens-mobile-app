import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import { color, design } from "../constants";
import { useTheme, Avatar } from "react-native-paper";
import { Button, Title, Paragraph } from "react-native-paper";
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from "react-native-paper-tabs";
import ButtonC from "../components/buttonc";
import TextInputs from "../components/textInput";
import { AntDesign } from "@expo/vector-icons";
import { Formik } from "formik";
import Header from "../components/header";
import ProfileItem from "../components/ProfileItem";

const SignIn = ({ navigation }) => {
  const { colors, fonts } = useTheme();

  return (
    <View style={styles.container}>
      {/* <Header /> */}

      <View style={{ marginTop: "20%", paddingHorizontal: design.padding1 }}>
        <View
          style={{
            // flexDirection: "row",
            alignItems: "center",
            marginBottom: 50,
          }}
        >
          <Avatar.Image size={150} style={{ backgroundColor: "#cccccc" }} />
          <Text
            style={{
              ...fonts.medium,
              fontSize: 20,
              marginVertical: 10,
              marginLeft: 10,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Not Signed in
          </Text>
        </View>
        <ButtonC
          onPress={() => navigation.navigate("Login")}
          textStyle={{ color: colors.textColor2, fontWeight: "bold" }}
          style={{ height: 50, backgroundColor: colors.primary }}
          title="Go to sign in "
        />
      </View>
      <View>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Signup")}>
          <Text
            style={{
              ...fonts.medium,
              fontSize: 13,
              marginVertical: 10,
              marginLeft: 10,
              textAlign: "center",
              marginTop: "40%",
              color: colors.secondary,
            }}
          >
            Dont Have Account? Register
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabssection: {
    height: "68%",
    width: "100%",
    marginTop: 20,
  },
  sub: {
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 17,
    paddingVertical: 5,
  },
  header: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: "10%",
    paddingLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: color.body,
    padding: design.padding1,
  },
  tinyLogo: {
    height: 170,
    width: 170,
  },
});

export default SignIn;
