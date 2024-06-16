import React from "react";
import { View, StyleSheet, Text, TextInput, Image } from "react-native";
import { color, design } from "../constants";
import { useTheme } from "react-native-paper";
import ButtonC from "../components/buttonc";
import TextInputs from "../components/textInput";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { completeOnboard } from "../redux/reducers/usersSlice";

const Welcome = ({ navigation }) => {
  const { colors, fonts, font } = useTheme();
  const dispatch = useDispatch();

  
  const enter = () => {
    navigation.navigate("HomeScreen");
    dispatch(completeOnboard());
  };

  return (
    <View style={{ ...styles.container, backgroundColor: colors.secondary }}>
      <View
        style={{
          ...styles.center,
          backgroundColor: colors.textColor2,
          ...styles.imageView,
        }}
      >
        <Image
          style={styles.tinyLogo}
          source={require("../../assets/logoonly.png")}
        />
      </View>
      <Text style={{ ...fonts.header2, color: colors.textColor2 }}>
        Welcome to Cartora
      </Text>
      <View style={styles.center}>
        <Text
          style={{
            textAlign: "center",
            marginTop: 16,
            color: colors.textColor2,
            ...fonts.paraOne,
            fontSize: 19,
          }}
        >
          Cartora helps you beautify your {"\n"}social stores (like Instagram,
          Whatsapp,{"\n"} Facebook and many more) with our {"\n"} self created
          carts which makes your {"\n"}social media stores looks like a
          self-made{"\n"} e-commerce website.
        </Text>
      </View>
      <View style={{ alignItems: "center", marginTop: 60 }}>
        <ButtonC
          onPress={enter}
          textStyle={{ color: colors.textColor2 }}
          style={{
            paddingHorizontal: 30,
            backgroundColor: colors.secondary,
            borderColor: colors.textColor2,
          }}
          title="Explore"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: design.padding1,
    alignItems: "center",
    paddingTop: "35%",
  },
  tinyLogo: {
    height: 170,
    width: 170,
  },
  center: {
    alignItems: "center",
  },
  tinyLogo: {
    height: 100,
    width: 100,
  },
  imageView: {
    borderRadius: 100,
    marginBottom: 40,
  },
});

export default Welcome;
