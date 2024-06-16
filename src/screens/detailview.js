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
  ActivityIndicator,
} from "react-native";
import { ImageBackground } from "react-native";
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
import { forceQuery, useClientQuery } from "../services/api";
import WithSpinner from "../components/withspinner";
import Spinner from "../components/spinner";
import DetailItem from "../components/DetailItem";
const imageBck = require("../../assets/back2.jpeg");
const DetailView = ({ navigation, route }) => {
  const { colors, fonts } = useTheme();
  const [loadingMore, setLoadingMore] = React.useState(false);
  const { userId } = route?.params;
  const { data, isError, isLoading, refetch } = useClientQuery(
    `Users/${userId}`
  );
  const {
    data: knitData,
    isError: kintError,
    isLoading: knitIsloadibg,
  } = useClientQuery(`Users/fetchKniters/${userId}`);
  const {
    data: countData,
    isLoading: isCounting,
    refetch: refetchCount,
  } = useClientQuery(`Products/CountUserProducs/${userId}`);

  const {
    data: userProduct,
    isError: isErrorProduct,
    isLoading: isLoadingProducts,
    refetch: refetchProduct,
  } = useClientQuery(`Products/getUserProducst/${userId}`);
  const [updatedData, setUpdatedData] = React.useState(userProduct?.data);
  React.useEffect(() => {
    if (userProduct?.data?.length) {
      setUpdatedData(userProduct?.data);
    }
    // console.log(userProduct,isErrorProduct,userId);
  }, [isLoadingProducts]);

  const loadMore = async () => {
    setLoadingMore(true);
    await forceQuery(
      `Products/getUserProducst/${userId}?` + "position=" + updatedData?.length,
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
    <View style={[styles.container, { backgroundColor: colors.body }]}>
      <View>
        <TouchableOpacity
          style={{ width: 40 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="left" size={30} color={colors.textColor2} />
        </TouchableOpacity>
      </View>
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
            {/* <TouchableNativeFeedback
              onPress={() => navigation.navigate("settings")}
            >
              <AntDesign name="setting" size={24} />
            </TouchableNativeFeedback> */}
          </View>
        </ImageBackground>
      </View>

      <View style={styles.header}>
        <View style={{ marginTop: -40 }}>
          <Avatar.Image
            source={
              data?.data?.[0]?.profileImage
                ? { uri: data?.data?.[0]?.profileImage }
                : require("../../assets/avatar.png")
            }
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "60%",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                ...fonts.small,
                textAlign: "center",
                fontSize: 16,
                color: colors.textColor2,
              }}
            >
              {countData?.data?.[0]?.count || 0}
              {"\n"}
              <Text style={styles.sub}>products</Text>
            </Text>
          </View>
          <TouchableNativeFeedback
            onPress={() => navigation?.navigate("KnittedList", { userId })}
          >
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  ...fonts.small,
                  textAlign: "center",
                  fontSize: 16,
                  color: colors.textColor2,
                }}
              >
                {knitData?.data?.[0]?.knited || 0}
                {"\n"}
                <Text style={styles.sub}>Following</Text>
              </Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => navigation?.navigate("KnittersList", { userId })}
          >
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  ...fonts.small,
                  textAlign: "center",
                  fontSize: 16,
                  color: colors.textColor2,
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
          {data?.data?.[0]?.brand} {"\n"}
          <Text
            style={{
              ...fonts.small,
              fontWeight: "700",
              fontSize: 12,
              color: colors.textColor2,
            }}
          >
            {data?.data?.[0]?.userName && `@${data?.data?.[0]?.userName}`}
          </Text>
        </Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            ...fonts.small,
            // color: "#404040",
            // fontWeight: "400",
            paddingLeft: 10,
            color: colors.textColor2,
          }}
        >
          {data?.data?.[0]?.aboutMe || ""}
        </Text>
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
            <View style={{ flex: 1, alignItems: "center", marginBottom: 10 }}>
              <FlatList
                numColumns={2}
                onRefresh={refetch}
                onEndReached={loadMore}
                refreshing={isLoadingProducts}
                contentContainerStyle={{ justifyContent: "center" }}
                style={{
                  flexWrap: "wrap",
                  display: "flex",
                  width: "100%",
                }}
                data={updatedData || []}
                renderItem={(item) => (
                  <DetailItem navigation={navigation} item={item} />
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
    fontSize: 15,
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
    paddingTop: 20,
  },
  tinyLogo: {
    height: 170,
    width: 170,
  },
});

export default WithSpinner(DetailView);
