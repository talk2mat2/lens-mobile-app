import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { color, design } from "../constants";
import { useTheme } from "react-native-paper";
import ButtonC from "./buttonc";
import TextInputs from "./textInput";
import { Formik } from "formik";
import DiscoverItem from "./discoverItem";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { appToast } from "./Helpers";

const Header = ({ navigation }) => {
  const { colors, fonts, font } = useTheme();
  const user = useSelector(({ user }) => user);
  const { show } = appToast();

  const createCart = () => {
    !user?.isLoggedIn && show("You need login or create account first");
    setTimeout(() => {
      navigation && navigation.navigate("Login");
    }, 2000);
  };

  const handleSearch = () => {
    navigation && navigation.navigate("Search");
  };

  return (
    <View style={{ ...styles.header, backgroundColor: colors.primary }}>
      <Text style={{ ...fonts.discoverBrand, color: color.white }}>
        Lens
      </Text>
      {!user?.isLoggedIn ? (
        <ButtonC
          onPress={createCart}
          textStyle={{ color: colors.primary, fontWeight: "700" }}
          style={{ paddingHorizontal: 10 }}
          title="Create Cart"
        />
      ) : (
        <TouchableOpacity onPress={handleSearch} style={{ marginRight: 10 }}>
          <FontAwesome name="search" size={20} color={color.white} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: design.padding1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
    marginTop:7,
    alignItems: "center",
    paddingVertical: 4,
    elevation: 4,
  },
  container: {
    flex: 1,

    paddingTop: 2,
    // alignItems: "center",
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

export default Header;
