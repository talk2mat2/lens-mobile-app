import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableNativeFeedback,
  TouchableHighlight,
  ActivityIndicator,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ImageBackground } from "react-native";
import { color, design } from "../constants";
import { useTheme, Avatar, Modal, Portal } from "react-native-paper";
import { Button, Title, Paragraph } from "react-native-paper";
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from "react-native-paper-tabs";
import ButtonC from "../components/buttonc";
import TextInputs from "../components/textInput";
import { AntDesign } from "@expo/vector-icons/";
import { Formik } from "formik";
import Header from "../components/header";
import ProfileItem from "../components/ProfileItem";
import { useDispatch, useSelector } from "react-redux";
import {
  forceQuery,
  useClientQuery,
  useMutations,
  useUploadMutations,
} from "../services/api";
import { useFocusEffect } from "@react-navigation/native";
import WithSpinner from "../components/withspinner";
import { useState } from "react";
import { appToast } from "../components/Helpers";
import { logIn } from "../redux/reducers/usersSlice";

const imageBck = require("../../assets/back2.jpeg");

const Account = ({ navigation, setLoading }) => {
  const { colors, fonts } = useTheme();
  const [eidtText, setEdittest] = useState(false);
  const user = useSelector(({ user }) => user.data);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const { data, isError, isLoading, refetch } = useClientQuery(
    `Products/getUserProducst/${user?.id}?` + "position=" + 0
  );
  const {
    data: countData,
    isLoading: isCounting,
    refetch: refetchCount,
  } = useClientQuery(`Products/CountUserProducs/${user?.id}`);
  const [updatedData, setUpdatedData] = React.useState(data?.data);

  const [details, setDetails] = useState(user?.aboutMe || "");
  const { mutate } = useMutations();
  const { mutate: mutateUpload } = useUploadMutations();
  const {
    data: knitData,
    isError: kintError,
    isLoading: knitIsloadibg,
    refetch: knitRefetch,
  } = useClientQuery(`Users/fetchKniters/${user?.id}`);

  const { show } = appToast();
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      refetch();
      console.log("usefocus");
      refetchCount();
      knitRefetch();
    }, [])
  );
  React.useEffect(() => {
    if (data?.data?.length) {
      setUpdatedData(data?.data);
    }
  }, [isLoading, data]);
  const showEditTest = () => setEdittest(true);
  const hideEditTest = () => setEdittest(false);

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
        key: "Users/updateAbout",
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
          // AsyncSave("token", res?.data?.[0]?.token);
        },
        onError: (error) => {
          setLoading(false);
          show(error?.message);
        },
      }
    );
  };

  const DeleteProducts = (id) => {
    mutate(
      {
        key: `Products/deleteProduct/${id}`,
        method: "post",
        // data: payload,
      },
      {
        onSuccess: (res) => {
          // setLoading(false);
          const newUpdates = updatedData?.filter((item) => item?.id != id);

          setUpdatedData(newUpdates);
          refetchCount();
          show(res?.message, {
            type: "normal",
          });

          refetch();
        },

        onError: (error) => {
          refetchCount();
          refetch();
          // setLoading(false);
          show(error?.message);
          console.log(error);
        },
      }
    );
  };
  React.useEffect(() => {
    if (data?.data?.length > 0) {
      setUpdatedData(data?.data);
    }
    console.log(user);
  }, [isLoading]);
  const handleDelete = (id) => {
    DeleteProducts(id);
  };

  const loadMore = async () => {
    setLoadingMore(true);
    await forceQuery(
      `Products/getUserProducst/${user?.id}?` +
        "position=" +
        updatedData?.length,
      "get",
      null
    )
      .then((res) => {
        setLoadingMore(false);

        res?.data?.length && setUpdatedData([...updatedData, ...res?.data]);
      })
      .catch((err) => {
        setLoadingMore(false);
      });
  };
  return (
    <>
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
              style={{
                ...fonts.small,
                fontWeight: "800",
                textAlign: "center",
                color: colors.textColor2,
              }}
            >
              Edit About
            </Text>
          </View>

          <View style={{ ...styles.editText, borderColor: colors.body6 }}>
            <TextInput
              style={styles.inputText}
              defaultValue={details}
              autoCapitalize={true}
              placeholder={"Add description"}
              autoFocus={true}
              onChangeText={setDetails}
              // onSubmitEditing={onSubmitEditing}
              multiline={true}
            />
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <ButtonC
              style={{ backgroundColor: colors.primary, paddingHorizontal: 20 }}
              textStyle={{ color: colors.textColor2, fontWeight: "700" }}
              title="DONE"
              onPress={() => {
                hideEditTest();
                subMitdata({ aboutme: details });
                // setDetailsFull(details);
                // setDetailsFulltitle(detailstitle);
                // setDetailsPromofull(detailsPromo);
              }}
            />
          </View>
        </Modal>
      </Portal>
      <View style={[styles.container, { backgroundColor: colors.body2 }]}>
        <Header navigation={navigation} />

        <View
          style={{
            height: 130,
            backgroundColor: color.grey2,
            position: "relative",
          }}
        >
          <ImageBackground
            style={{ flex: 1, justifyContent: "center", marginTop: 4 }}
            source={imageBck}
            resizeMode="cover"
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                paddingHorizontal: 10,
                marginTop: 8,
                position: "absolute",
                right: 2,
              }}
            >
              {/* <Text
          style={{
            ...fonts.small,
            fontWeight: "700",
            fontSize: 19,
            lineHeight: 17,
            paddingVertical: 5,
          }}
        >
          Profile
        </Text> */}
              <TouchableNativeFeedback
                onPress={() => navigation.navigate("settings")}
              >
                <AntDesign color={color.white} name="setting" size={24} />
              </TouchableNativeFeedback>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.header}>
          <View style={{ marginTop: -40 }}>
            <Avatar.Image
              source={
                user?.profileImage
                  ? { uri: user.profileImage }
                  : require("../../assets/avatar.png")
              }
            />
            {/* <TouchableNativeFeedback onPress={pickImage}>
              <AntDesign
                style={{ position: "absolute", bottom: -10, right: -10 }}
                name="edit"
                size={24}
              />
            </TouchableNativeFeedback> */}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "60%",
            }}
          >
            <View style={{ alignItems: "center", marginRight: "5%" }}>
              <Text
                style={{
                  ...fonts.small,
                  textAlign: "center",
                  fontSize: 16,
                  color:colors.textColor2
                }}
              >
                {countData?.data?.[0]?.count || 0}
                {"\n"}
                <Text style={[styles.sub, { color: colors.textColor2 }]}>
                  products
                </Text>
              </Text>
            </View>
            <TouchableNativeFeedback
              onPress={() =>
                navigation?.navigate("KnittedList", { userId: user?.id })
              }
            >
              <View style={{ alignItems: "center", marginRight: "7%" }}>
                <Text
                  style={{
                    ...fonts.small,
                    textAlign: "center",
                    fontSize: 16,
                    color:colors.textColor2
                  }}
                >
                  {knitData?.data?.[0]?.knited || 0}
                  {"\n"}
                  <Text style={[styles.sub, { color: colors.textColor2 }]}>
                    Following
                  </Text>
                </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() =>
                navigation?.navigate("KnittersList", { userId: user?.id })
              }
            >
              <View style={{ alignItems: "center", marginRight: "5%" }}>
                <Text
                  style={{
                    ...fonts.small,
                    textAlign: "center",
                    fontSize: 16,
                    color:colors.textColor2
                  }}
                >
                  {knitData?.data?.[0]?.kniters || 0}
                  {"\n"}
                  <Text style={[styles.sub, { color: colors.textColor2 }]}>
                    Followers
                  </Text>
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View
          style={{ alignItems: "flex-start", width: "100%", paddingLeft: 10 }}
        >
          <Text
            style={{
              ...fonts.small,
              fontWeight: "700",
              fontSize: 16,
              lineHeight: 17,
              paddingVertical: 5,
              color: colors.textColor2,
            }}
          >
            {user?.brand} {"\n"}
            <Text
              style={{
                ...fonts.small,
                fontWeight: "700",
                fontSize: 12,
                color: colors.textColor2,
              }}
            >
              @{user?.userName}
            </Text>
          </Text>
        </View>
        <View style={{ marginTop: 10, position: "relative" }}>
          <Text
            numberOfLines={3}
            ellipsizeMode="tail"
            style={{
              ...fonts.small,
              // color: "#404040",
              // fontWeight: "400",
              paddingLeft: 10,
              color: colors.textColor2,
            }}
          >
            {user?.aboutMe || "About user"}
          </Text>
          <TouchableHighlight
            onPress={() => showEditTest()}
            style={{
              position: "absolute",
              right: 9,
              backgroundColor: color.body,
              top: 0,
            }}
          >
            <AntDesign color={colors.secondary} name="edit" size={24} />
          </TouchableHighlight>
        </View>
        <View style={styles.tabssection}>
          <Tabs
            // defaultIndex={0} // default = 0
            // uppercase={false} // true/false | default=true | labels are uppercase
            // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
            // iconPosition // leading, top | default=leading
            style={{ backgroundColor: colors.body }} // works the same as AppBar in react-native-paper
            // dark={false} // works the same as AppBar in react-native-paper
            // theme={} // works the same as AppBar in react-native-paper
            // mode="scrollable" // fixed, scrollable | default=fixed
            // onChangeIndex={(newIndex) => {}} // react on index change
            // showLeadingSpace={true} //  (default=true) show leading space in scrollable tabs inside the header
            // disableSwipe={false} // (default=false) disable swipe to left/right gestures
          >
            <TabScreen label="" icon="home">
              <View style={{ flex: 1, alignItems: "center", marginBottom: 40 }}>
                <FlatList
                  numColumns={2}
                  onRefresh={refetch}
                  onEndReached={loadMore}
                  refreshing={isLoading}
                  contentContainerStyle={{ justifyContent: "center" }}
                  style={{
                    flexWrap: "wrap",
                    display: "flex",
                    width: "100%",
                  }}
                  data={updatedData || []}
                  renderItem={(item) => (
                    <ProfileItem
                      id={user?.id}
                      navigation={navigation}
                      item={item}
                      handleDelete={handleDelete}
                    />
                  )}
                  keyExtractor={(data, index) => index}
                />
                {loadingMore && <ActivityIndicator size={20} style={{}} />}
              </View>
            </TabScreen>

            <TabScreen
              label=""
              icon="message"
              // optional props
              // onPressIn={() => {
              //   console.log('onPressIn explore');
              // }}
              // onPress={() => {
              //   console.log('onPress explore');
              // }}
            >
              <View style={{ flex: 1 }}>{/* <Text>comming soon</Text> */}</View>
            </TabScreen>
          </Tabs>
        </View>
      </View>
    </>
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
  modal1: {
    height: 300,

    marginHorizontal: 20,
    borderRadius: 10,
    padding: 10,
  },
  editText: {
    height: 180,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
});

export default WithSpinner(Account);
