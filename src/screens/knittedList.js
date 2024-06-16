import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableNativeFeedback,
  TouchableOpacity,
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
import { useClientQuery } from "../services/api";
import WithSpinner from "../components/withspinner";
import Spinner from "../components/spinner";
import DetailItem from "../components/DetailItem";
import UserCard from "../components/usercard";

const KnittedList = ({ navigation, route }) => {
  const { colors, fonts } = useTheme();
  const { userId } = route?.params;
  // const { data, isError, isLoading, refetch } = useClientQuery(
  //   `Users/${userId}`
  // );
  const {
    data: knitedData,
    isError: kintError,
    isLoading: knitIsloadibg,
    refetch,
  } = useClientQuery(`Users/fetchUserKniteD/${userId}`);
  console.log(knitedData?.data);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#D3D3D3",
        }}
      >
        <TouchableOpacity
          style={{ width: 40 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="left" size={30} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            ...fonts.medium,
            // fontSize: 25,
            marginLeft: "27%",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Knited
        </Text>
      </View>

      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "60%",
          }}
        ></View>
      </View>
      <View style={{ marginTop: "10%" }}>
        {knitedData?.data?.length < 1 ? (
          <View style={{ alignItems: "center" }}>
            <Text style={{ ...fonts.small }}>None yet</Text>
          </View>
        ) : (
          <FlatList refreshing={knitIsloadibg}
            // contentContainerStyle={{ justifyContent: "center" }}
            style={{
           
              width: "100%",
              height:"100%"
            }}
            data={knitedData?.data || []}
            renderItem={(item) => (
              <UserCard navigation={navigation} item={item} refetch={refetch} />
            )}
            // keyExtractor={(data, index) => index}
          />
        )}
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
    paddingHorizontal: 3,
  },
  tinyLogo: {
    height: 170,
    width: 170,
  },
});

export default WithSpinner(KnittedList);
