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
  ScrollView,
  Keyboard,
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
import * as ImagePicker from "expo-image-picker";
import ProfileItem from "../components/ProfileItem";
import {
  useClientQuery,
  useMutations,
  useUploadMutations,
} from "../services/api";
import WithSpinner from "../components/withspinner";
import Spinner from "../components/spinner";
import DetailItem from "../components/DetailItem";
import { useDispatch, useSelector } from "react-redux";
import { appToast } from "../components/Helpers";
import { logIn } from "../redux/reducers/usersSlice";

const EditProfile = ({ navigation, route, setLoading }) => {
  const { colors, fonts } = useTheme();
  const { show } = appToast();
  const user = useSelector(({ user }) => user.data);
  const { mutate } = useMutations();
  const [image, setImage] = React.useState(null);
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = React.useState({});
  const { mutate: mutateUpload } = useUploadMutations();
  // React.useEffect(() => {
  //   // console.log(data);
  // }, [isLoading]);
  const ddd = true;
  const uploadprofile = async (Image) => {
    let formData = new FormData();
    formData.append("File", {
      uri: Image?.uri,
      type: "image/jpeg",
      name: `${Math.floor(Math.random() * 10000000000)}.jpg`,
    });
    // setLoading(true);

    console.log("url is", Image?.uri);

    mutateUpload(
      {
        key: "Products/uploadprofile",
        data: formData,
        method: "post",
      },
      {
        onSuccess: (success) => {
          setLoading(false);
          console.log(success?.data[0]);
          show(success?.message, {
            type: "normal",
          });
          dispatch(logIn(success.data[0]));
        },
        onError: (err) => {
          console.log(err);
          setLoading(false);
        },
      }
    );
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });

    console.log(result);

    if (!result.cancelled) {
      uploadprofile(result);
      setImage(result.uri);
    }
  };
  const subMitdata = (datas) => {
    // console.log(datas)
    mutate(
      {
        key: "Users/UpdateUserProfile",
        method: "post",
        data: datas,
      },
      {
        onSuccess: (res) => {
          setLoading(false);
          show(res?.message, {
            type: "normal",
          });
          // console.log(res.data?.[0])
          dispatch(logIn(res.data[0]));
          console.log(res?.data);
          // AsyncSave("token", res?.data?.[0]?.token);
        },
        onError: (error) => {
          setLoading(false);
          show(error?.message);
        },
      }
    );
  };

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
          }}
        >
          Edit Profile
        </Text>
      </View>
      <Formik
        // validationSchema={{}}
        initialValues={{
          // email: user?.email || "",
          // userName: user?.userName || "",
          // LinktoWhatsapp: user?.LinktoWhatsapp || false,
          LinktoWhatsapp: ddd || null,
          brand: user?.brand || "",
          phoneNo: user?.phoneNo || "",
          location: "12, Greg Street, UK",
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
          <ScrollView>
            {console.log(values.LinktoWhatsapp)}
            <View style={{ marginTop: "6%", paddingHorizontal: 10 }}>
              <View
                style={{
                  alignItems: "center",
                  marginBottom: "25%",
                  position: "relative",
                }}
              >
                <Avatar.Image
                  size={150}
                  source={
                    user?.profileImage
                      ? { uri: user.profileImage }
                      : require("../../assets/avatar.png")
                  }
                />
                <TouchableNativeFeedback onPress={pickImage}>
                  <AntDesign
                    style={{ position: "absolute", bottom: -10, right: "25%" }}
                    name="edit"
                    size={24}
                  />
                </TouchableNativeFeedback>
              </View>

              <View style={styles.itemList}>
                <Text
                  style={{
                    ...fonts.small,

                    fontSize: 16,
                  }}
                >
                  Brand Name
                </Text>
                <TextInput
                  style={styles.inputItem}
                  onChangeText={(xx) => setFieldValue("brand", xx)}
                  value={values.brand}
                />
              </View>
              <View style={styles.itemList}>
                <Text
                  style={{
                    ...fonts.small,
                    fontSize: 16,
                  }}
                >
                  UserName
                </Text>
                <TextInput
                  style={styles.inputItem}
                  onChangeText={(xx) => setFieldValue("userName", xx)}
                  value={values.userName}
                />
              </View>
              <View style={styles.itemList}>
                <Text
                  style={{
                    ...fonts.small,

                    fontSize: 16,
                  }}
                >
                  Email
                </Text>
                <Text
                  style={{
                    ...fonts.small,
                    ...styles.inputItem,

                    fontSize: 16,
                  }}
                >
                  {user?.email}
                </Text>
              </View>
              <View style={styles.itemList}>
                <Text
                  style={{
                    ...fonts.small,

                    fontSize: 16,
                  }}
                >
                  PhoneNumber
                </Text>
                <TextInput
                  onChangeText={(xx) => setFieldValue("phoneNo", xx)}
                  style={{
                    ...fonts.small,
                    ...styles.inputItem,

                    fontSize: 16,
                  }}
                  value={values.phoneNo}
                />
              </View>
              <View style={styles.itemList}>
                <Text
                  style={{
                    ...fonts.small,

                    fontSize: 16,
                  }}
                >
                  Link Order to Whatsapp
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    paddingVertical: 4,
                    paddingLeft: 16,
                    paddingRight: 10,
                    borderRadius: 15,
                    marginBottom: 20,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      ...fonts.small,
                      ...styles.inputItem,
                      marginBottom: 0,
                      fontSize: 16,
                    }}
                  >
                    {values.LinktoWhatsapp == true ? "Enabled" : "Disabled"}
                  </Text>
                  <View
                    style={{
                      height: 27,
                      width: 27,
                      borderRadius: 40,
                      backgroundColor:
                        values.LinktoWhatsapp == true
                          ? color.green
                          : color.error,
                    }}
                  ></View>
                </View>
              </View>
              <View style={styles.itemList}>
                <Text
                  style={{
                    ...fonts.small,

                    fontSize: 16,
                  }}
                >
                  Change Location
                </Text>
                <TextInput
                  onChangeText={(xx) => setFieldValue("phoneNo", xx)}
                  style={{
                    ...fonts.small,
                    ...styles.inputItem,

                    fontSize: 16,
                  }}
                  value={values.location}
                />
              </View>
              <View
                style={{
                  alignItems: "center",
                  marginTop: "35%",
                  marginBottom: "20%",
                }}
              >
                {(values?.brand && values?.email && !values.phoneNo) ||
                  (values?.userName && (
                    <ButtonC
                      onPress={handleSubmit}
                      style={{ width: 110 }}
                      title="Update"
                    />
                  ))}
              </View>
            </View>
          </ScrollView>
        )}
      </Formik>
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
  itemList: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  inputItem: {
    color: "#808080",
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
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

export default WithSpinner(EditProfile);
