import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  FlatList,
  Modal,
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
import { Formik } from "formik";
import Header from "../components/header";
import ProfileItem from "../components/CollectionProfileItem";
import { useSelector } from "react-redux";
import { useClientQuery, useMutations } from "../services/api";
import { useFocusEffect } from "@react-navigation/native";
import Editcart from "./editcart";
import { appToast } from "../components/Helpers";

const Collections = ({ navigation }) => {
  const { colors, fonts } = useTheme();
  const [item, setItems] = React.useState({});
  const user = useSelector(({ user }) => user.data);
  const { data, isError, isLoading, refetch } = useClientQuery(
    `Products/getMyCollections/${user?.id}`
  );
  const { mutate } = useMutations();
  const { show } = appToast();
  const [modalVisible, setModalVisible] = useState(false);
  useFocusEffect(() => {
    refetch();
  });

  const handleShow = (items) => {
    setModalVisible(!modalVisible);
    setItems(items);
  };
  const handleHide = () => {
    setModalVisible(false);
    setItems({});
  };

  const DeleteProducts = (id) => {
    console.log(`Products/deleteProduct/${id}`);

    mutate(
      {
        key: `Products/deleteProduct/${id}`,
        method: "post",
        // data: payload,
      },
      {
        onSuccess: (res) => {
          // setLoading(false);
          show(res?.message, {
            type: "normal",
          });
          // console.log(res);
          refetch();
          // dispatch(logIn(res.data[0]));
          // AsyncSave("token", res?.data?.[0]?.token);
        },

        onError: (error) => {
          // setLoading(false);
          show(error?.message);
          console.log(error);
        },
      }
    );
  };

  const handleDelete = (id) => {
    DeleteProducts(id);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{
          margin: 50,
          backgroundColor: "white",
          elevation: 5,
          borderRadius: 10,
          paddingTop: 80,
        }}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <Editcart items={item} handleHide={handleHide} />
      </Modal>
      <View style={[styles.container, { backgroundColor: colors.body }]}>
        <Header navigation={navigation} />
        <View style={styles.section}>
          <View style={{ flex: 1, alignItems: "center" }}>
            {data?.data?.length > 0 ? (
              <FlatList
                numColumns={2}
                onRefresh={refetch}
                refreshing={isLoading}
                contentContainerStyle={{ justifyContent: "center" }}
                style={{
                  flexWrap: "wrap",
                  display: "flex",
                  width: "100%",
                }}
                data={data?.data || []}
                renderItem={(item) => (
                  <ProfileItem
                    handleDelete={handleDelete}
                    navigation={navigation}
                    handleShow={handleShow}
                    item={item}
                  />
                )}
                keyExtractor={(data, index) => index}
              />
            ) : (
              <Text style={{ color: colors.textColor2 }}>
                Collections is empty
              </Text>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  section: {
    height: "95%",
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
    marginTop: 40,
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

export default Collections;
