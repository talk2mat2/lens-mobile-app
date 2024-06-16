import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Touchable,
  Linking,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Keyboard,
  Alert,
  Switch,
} from "react-native";

import { color, design } from "../constants";
import { IconButton, useTheme } from "react-native-paper";
import ButtonC from "../components/buttonc";
import TextInputs from "../components/textInput";
import { Formik } from "formik";
import { Checkbox } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Avatar, Modal, Portal } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/reducers/usersSlice";
import CheckBox from "../components/CheckBox";
import { StatusBar } from "expo-status-bar";
import { baseUrl, useClientQuery, useMutations } from "../services/api";
import { appToast } from "../components/Helpers";
import WithSpinner from "../components/withspinner";
import { ToggleButton } from "react-native-paper";
import { toggle } from "../redux/reducers/themeSlice";

const Settings = ({ navigation, setLoading }) => {
  const { colors, fonts } = useTheme();
  const user = useSelector(({ user }) => user.data);
  const dispatch = useDispatch();
  const [password, setPassword] = React.useState("");
  const { data, isError, isLoading, refetch } = useClientQuery(
    `Users/fetchUserTags/${user?.id}`
  );
  const [eidtText, setEdittest] = useState(false);
  const { mutate } = useMutations();
  const [showTags, setshowTags] = useState(false);
  const handleLogout = () => {
    dispatch(logOut());
  };
  const theme = useSelector((state) => state.theme);
  const hideEditTags = () => setshowTags(false);
  const showEditTags = () => setshowTags(true);
  const { show } = appToast();
  const showEditTest = () => setEdittest(true);
  const hideEditTest = () => setEdittest(false);
  const handleToggleTheme = () => {
    dispatch(toggle());
  };
  const subMitdata = (datas) => {
    // console.log(datas)

    console.log(datas);
    mutate(
      {
        key: "Users/updatetags",
        method: "post",
        data: datas,
      },
      {
        onSuccess: (res) => {
          setLoading(false);
          hideEditTags();
          refetch();
          show(res?.message, {
            type: "normal",
          });
          // console.log(res.data?.[0])
          // dispatch(logIn(res.data[0]));

          // AsyncSave("token", res?.data?.[0]?.token);
        },
        onError: (error) => {
          setLoading(false);
          refetch();
          hideEditTags();
          show(error?.message);
        },
      }
    );
  };

  const handleDeleteAccount = () => {
    if (!password) {
      return show("Password is required");
    }
    const payload = {
      password: password,
      id: user?.id,
    };
    mutate(
      {
        key: "Users/DeletemyAccount",
        method: "post",
        data: payload,
      },
      {
        onSuccess: (res) => {
          setLoading(false);
          show(res?.message, {
            type: "normal",
          });
          setTimeout(() => {
            handleLogout();
          }, 2000);
        },
        onError: (error) => {
          setLoading(false);
          setPassword("");
          show(error?.message);
        },
      }
    );
  };
  // console.log(
  //   data?.data?.sort(
  //     (a, b) => [true, false].indexOf(a) > [true, false].indexOf(b)
  //   ),
  //   "filter"
  // );
  const PromptDelete = () =>
    Alert.alert(
      "Delete Account",
      "Your Account with Cartora will be deleted. This action can not be reversed",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Proceed",
          onPress: () => {
            showEditTest();
          },
        },
      ]
    );
  return (
    <>
      <StatusBar style="dark" />
      <Portal>
        <Modal
          visible={eidtText}
          onDismiss={hideEditTest}
          contentContainerStyle={{
            ...styles.modal1,
            backgroundColor: colors.body,
          }}
        >
          <View style={{ marginBottom: 8 }}>
            <Text
              style={{ ...fonts.small, fontWeight: "800", textAlign: "center" }}
            >
              Confirm Account Password
            </Text>
          </View>

          <View style={{ ...styles.editText }}>
            <TextInputs
              secureTextEntry={true}
              style={styles.input2}
              value={password}
              onChangeText={(txt) => setPassword(txt)}
              placeholder="Password"
            />
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <ButtonC
              style={{ backgroundColor: colors.primary, paddingHorizontal: 20 }}
              textStyle={{ color: colors.textColor2, fontWeight: "700" }}
              title="Continue"
              onPress={() => {
                hideEditTest();
                handleDeleteAccount();
                // setDetailsFull(details);
                // setDetailsFulltitle(detailstitle);
                // setDetailsPromofull(detailsPromo);
              }}
            />
          </View>
        </Modal>
      </Portal>
      <ScrollView style={{ backgroundColor: colors.body }}>
        <Portal>
          <Modal
            visible={showTags}
            onDismiss={hideEditTags}
            contentContainerStyle={{
              ...styles.modal1,
              backgroundColor: colors.body,
              minHeight: "90%",
            }}
          >
            <View style={{ marginBottom: 8 }}>
              <Text
                style={{
                  ...fonts.small,
                  fontWeight: "800",
                  textAlign: "center",
                }}
              >
                Set Business tags
              </Text>
            </View>

            <Formik
              // validationSchema={{}}
              initialValues={{
                Vehicles: data?.data?.[0]?.vehicles || false,
                // User: false,
                Properties: data?.data?.[0]?.properties || false,
                Electronics: data?.data?.[0]?.electronics || false,
                Furnitures: data?.data?.[0]?.furnitures || false,
                Health: data?.data?.[0]?.health || false,
                Fashion: data?.data?.[0]?.fashion || false,
                Sport: data?.data?.[0]?.sport || false,
                Services: data?.data?.[0]?.services || false,
                Jobs: data?.data?.[0]?.jobs || false,
                Babies: data?.data?.[0]?.babies || false,
                Agric: data?.data?.[0]?.agric || false,
                Repairs: data?.data?.[0]?.repairs || false,
                Equipments: data?.data?.[0]?.equipments || false,
              }}
              onSubmit={(values) => {
                subMitdata(values);
                setLoading(true);
                Keyboard.dismiss();
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                setFieldValue,
              }) => (
                <>
                  <View style={{ marginTop: "15%" }}>
                    <ScrollView>
                      <CheckBox
                        onPress={() =>
                          setFieldValue("Vehicles", !values.Vehicles)
                        }
                        status={values.Vehicles === true ? "checked" : ""}
                        label="Vehicles"
                      />
                      <CheckBox
                        onPress={() =>
                          setFieldValue("Properties", !values.Properties)
                        }
                        status={values.Properties === true ? "checked" : ""}
                        label="Properties"
                      />

                      <CheckBox
                        onPress={() =>
                          setFieldValue("Electronics", !values.Electronics)
                        }
                        status={values.Electronics === true ? "checked" : ""}
                        label="Electronics"
                      />
                      <CheckBox
                        onPress={() =>
                          setFieldValue("Furnitures", !values.Furnitures)
                        }
                        status={values.Furnitures === true ? "checked" : ""}
                        label="Furnitures"
                      />
                      <CheckBox
                        onPress={() => setFieldValue("Health", !values.Health)}
                        status={values.Health === true ? "checked" : ""}
                        label="Health"
                      />
                      <CheckBox
                        onPress={() =>
                          setFieldValue("Fashion", !values.Fashion)
                        }
                        status={values.Fashion === true ? "checked" : ""}
                        label="Fashion"
                      />
                      <CheckBox
                        onPress={() => setFieldValue("Sport", !values.Sport)}
                        status={values.Sport === true ? "checked" : ""}
                        label="Sport & Outdoors"
                      />
                      <CheckBox
                        onPress={() =>
                          setFieldValue("Services", !values.Services)
                        }
                        status={values.Services === true ? "checked" : ""}
                        label="Services"
                      />
                      <CheckBox
                        onPress={() => setFieldValue("Jobs", !values.Jobs)}
                        status={values.Jobs === true ? "checked" : ""}
                        label="Jobs"
                      />
                      <CheckBox
                        onPress={() => setFieldValue("Babies", !values.Babies)}
                        status={values.Babies === true ? "checked" : ""}
                        label="Babies"
                      />
                      <CheckBox
                        onPress={() => setFieldValue("Agric", !values.Agric)}
                        status={values.Agric === true ? "checked" : ""}
                        label="Agric"
                      />
                      <CheckBox
                        onPress={() =>
                          setFieldValue("Repairs", !values.Repairs)
                        }
                        status={values.Repairs === true ? "checked" : ""}
                        label="Repairs"
                      />
                      <CheckBox
                        onPress={() =>
                          setFieldValue("Equipments", !values.Equipments)
                        }
                        status={values.Equipments === true ? "checked" : ""}
                        label="Equipments"
                      />
                    </ScrollView>
                  </View>
                  <View style={{ alignItems: "flex-end", marginTop: "auto" }}>
                    <ButtonC
                      style={{
                        backgroundColor: colors.primary,
                        paddingHorizontal: 20,
                      }}
                      textStyle={{
                        color: colors.textColor2,
                        fontWeight: "700",
                      }}
                      title="DONE"
                      onPress={() => {
                        // hideEditTags()
                        handleSubmit();
                        // setDetailsFull(details);
                      }}
                    />
                  </View>
                </>
              )}
            </Formik>
          </Modal>
        </Portal>
        <View style={[styles.container, { backgroundColor: colors.body }]}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={{ width: 40}}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="left" size={30} color={ colors.textColor2} />
            </TouchableOpacity>

            <Text
              style={{
                ...fonts.medium,
                // fontSize: 25,
                marginLeft: "27%",
                fontWeight: "bold",
                color: colors.textColor2,
              }}
            >
              Settings
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: design.padding1,
              marginTop: 20,
              minHeight: "40%",
            }}
          >
            <TouchableHighlight
              underlayColor={colors.body6}
              // onPress={() => null}
              onPress={() =>
                Linking.openURL(
                  "mailto:cartoraapp@gmail.com?subject=Feedback&body=''"
                )
              }
            >
              <Text
                style={{
                  ...fonts.medium,
                  fontSize: 20,
                  marginVertical: 10,
                  color: colors.secondary,
                }}
              >
                Support & FeedBack
              </Text>
            </TouchableHighlight>
            {/* <TouchableHighlight
              underlayColor={colors.body6}
              onPress={() => null}
            >
              <Text
                style={{
                  ...fonts.medium,
                  fontSize: 20,
                  marginVertical: 10,
                  color: colors.secondary,
                }}
              >
             
              </Text>
            </TouchableHighlight> */}
            <TouchableHighlight
              underlayColor={colors.body6}
              onPress={() => navigation?.navigate("EditProfile")}
            >
              <Text
                style={{
                  ...fonts.medium,
                  fontSize: 20,
                  marginVertical: 10,
                  color: colors.secondary,
                }}
              >
                Edit my profile
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={colors.body6}
              onPress={() => Linking.openURL(baseUrl + "/Users/privacy_policy")}
            >
              <Text
                style={{
                  ...fonts.medium,
                  fontSize: 20,
                  marginVertical: 10,
                  color: colors.secondary,
                }}
              >
                Privacy Policy
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={colors.body6}
              onPress={() => showEditTags()}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    ...fonts.medium,
                    fontSize: 20,
                    marginVertical: 10,
                    color: colors.secondary,
                  }}
                >
                  My Keywords
                </Text>
                <AntDesign color={colors.secondary} name="edit" size={24} />
              </View>
            </TouchableHighlight>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {data?.data &&
                Object.entries(data?.data?.[0]).map((entry) => {
                  const [key, value] = entry;
                  return (
                    value == true && (
                      <View key={key} style={styles.tags}>
                        <Text
                          style={{ fontSize: 11, color: colors.textColor2 }}
                        >
                          {" "}
                          # {key}
                        </Text>
                      </View>
                    )
                  );
                })}
              {/* <View style={styles.tags}>
              <Text> # holidays</Text>
            </View>
            <View style={styles.tags}>
              <Text> # leasure</Text>
            </View>
            <View style={styles.tags}>
              <Text> # Cars</Text>
            </View> */}
            </View>
            <TouchableHighlight
              underlayColor={colors.body6}
              onPress={() => {
                Linking.openURL(
                  "https://www.instagram.com/cartora.app?r=nametag"
                );
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    ...fonts.medium,
                    fontSize: 20,
                    marginVertical: 10,
                    color: colors.secondary,
                    marginRight: 9,
                  }}
                >
                  Join Cartora on Instaram
                </Text>

                <AntDesign name="instagram" size={24} color="#C13584" />
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={colors.body6}
              onPress={handleLogout}
            >
              <Text
                style={{
                  ...fonts.medium,
                  fontSize: 20,

                  marginVertical: 10,
                  color: colors.secondary,
                }}
              >
                Sign Out
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={colors.body6}
              onPress={handleLogout}
            >
              <Text
                style={{
                  ...fonts.medium,
                  fontSize: 20,

                  marginVertical: 10,
                  color: colors.secondary,
                }}
              >
                Share App
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={colors.body6}
              onPress={handleLogout}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    ...fonts.medium,
                    fontSize: 20,

                    marginVertical: 10,
                    color: colors.secondary,
                  }}
                >
                  Theme (Day or Night Mode)
                </Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={colors.body2}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={handleToggleTheme}
                  value={theme.colorMode === "dark"}
                />
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={colors.body6}
              onPress={handleLogout}
            >
              <Text
                style={{
                  ...fonts.medium,
                  fontSize: 20,

                  marginVertical: 10,
                  color: colors.secondary,
                }}
              >
                Rate App
              </Text>
            </TouchableHighlight>
          </View>
          <View style={{ marginTop: 20 }}>
            <View style={{ alignItems: "center" }}>
              <Image
                style={styles.tinyLogo}
                source={require("../../assets/logo3.png")}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  ...fonts.small,
                  fontWeight: "700",
                  fontSize: 16,
                  lineHeight: 10,
                  paddingVertical: 5,
                  textAlign: "center",
                  color:colors.textColor2
                }}
              >
                Version 1.1.5{"\n"}
                {"\n"}
                <Text
                  style={{ ...fonts.small, fontWeight: "300", fontSize: 13 }}
                >
                  Terms of Service and privacy Policy{"\n"}
                  {"\n"}
                </Text>
              </Text>
              <TouchableHighlight
                underlayColor={colors.body6}
                onPress={PromptDelete}
              >
                <Text
                  style={{ ...fonts.small, fontWeight: "300", fontSize: 13 }}
                >
                  Delete My Lens Account{"\n"}
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.body,
    padding: design.padding1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  tinyLogo: {
    height: 80,
    width: 180,
    objectFit: "contain",
  },
  tags: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "grey",
    paddingHorizontal: 9,
    paddingVertical: 4,
    marginHorizontal: 4,
    marginVertical: 7,
  },
  modal1: {
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 10,
    paddingTop: 20,
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingBottom: 15,
  },
  editText: {
    height: 100,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    // borderWidth: 1,
  },
  inputText: {
    fontSize: 17,
  },
  input2: {
    marginBottom: 0,
    marginTop: 0,
  },
});

export default WithSpinner(Settings);
