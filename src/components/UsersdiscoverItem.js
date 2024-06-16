import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  Linking,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import {
  useTheme,
  Avatar,
  Button,
  Menu,
  Divider,
  Provider,
} from "react-native-paper";

import EntypoIcons from "@expo/vector-icons/Entypo";
import ButtonC from "./buttonc";
import { appToast, numberWithCommas } from "./Helpers";
import { debounce } from "lodash";
import { AntDesign } from "@expo/vector-icons";
import { useMutations } from "../services/api";
import ViewShot from "react-native-view-shot";
import { useSelector } from "react-redux";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
// import RNFetchBlob from 'rn-fetch-blob';
const UsersDiscoverItem = ({ item, navigation, DeleteProducts, refetch }) => {
  const [visible, setVisible] = React.useState(false);
  const [learnMore, setLearnMore] = React.useState(false);
  const { colors, fonts } = useTheme();
  const { show } = appToast();
  const user = useSelector(({ user }) => user.data);
  const { mutate } = useMutations();
  const fileUri = FileSystem.cacheDirectory + "tmp.jpg";

  const { mutate: knitmutate, isLoading: knitisloading } = useMutations();
  const openMenu = () => setVisible(true);
  const _animation = new Animated.Value(0);
  const ref = React.useRef();
  const closeMenu = () => setVisible(false);
  // const handleknit = () => {
  //   show("this feature is comming soon");
  // };
  const animatedStyle = {
    opacity: _animation,
  };

  // const Menus = (
  //   <Menu
  //     visible={visible}
  //     onDismiss={closeMenu}
  //     anchor={<Button onPress={openMenu}>Show menu</Button>}
  //   >
  //     <Menu.Item onPress={() => {}} title="Item 1" />
  //     <Menu.Item onPress={() => {}} title="Item 2" />
  //     <Divider />
  //     <Menu.Item onPress={() => {}} title="Item 3" />
  //   </Menu>
  // );
  const closeOverlay = debounce(() => {
    setLearnMore(false);
  }, 5000);

  const openOverlay = () => {
    setLearnMore(true);
    console.log("called");
  };
  const devLink =
    "http://api.whatsapp.com/send?phone=234" + item?.user?.phoneNo || "090";
  React.useEffect(() => {
    if (learnMore) {
      Animated.timing(_animation, {
        toValue: 0.7,
        duration: 700,
        useNativeDriver: false,
      }).start();
    }
    learnMore && closeOverlay();
  }, [learnMore]);

  const share = async (imageURL) => {
    let newImageUrl;
    if (Platform.OS === "ios") {
      newImageUrl = "file://" + imageURL;
    } else {
      newImageUrl = imageURL;
    }
    const options = {
      mimeType: "image/jpeg",
      dialogTitle: "Cartora- item",
      UTI: "image/jpeg",
    };

    // await FileSystem.downloadAsync(imageURL, fileUri)
    //   .then(({ uri }) => {
    //     // setState(`Downloaded image to ${uri}`);
    //   })
    //   .catch((err) => {
    //     alert("An error occured");
    //     console.log(JSON.stringify(err));
    //   });

    // Sharing only allows one to share a file.
    Sharing.shareAsync(newImageUrl, options)
      .then((data) => {
        // alert("Shared");
      })
      .catch((err) => {
        // alert("Error sharing image");
        console.log(JSON.stringify(err));
      });
  };

  const captureView = () => {
    ref.current.capture().then((uri) => {
      //we will upload the edited frame view for sharing to socialmedia
      // console.log("do something with ", uri);
      // console.log(uri)
      // return
      // console.log(uri)
      share(uri);
    });
  };
  const likeProducts = (datas) => {
    const payload = {
      productId: item?.id,
      userId: user?.id,
    };
    console.log(payload);

    mutate(
      {
        key: "Products/likeProduct",
        method: "post",
        data: payload,
      },
      {
        onSuccess: (res) => {
          // setLoading(false);
          show(res?.message, {
            type: "normal",
          });
          console.log(res);
          refetch();
          // dispatch(logIn(res.data[0]));
          // AsyncSave("token", res?.data?.[0]?.token);
        },

        onError: (error) => {
          // setLoading(false);
          refetch();
          show(error?.message);
          console.log(error);
        },
      }
    );
  };
  // const DeleteProducts = (datas) => {
  //   mutate(
  //     {
  //       key: `deleteProduct/${id}`,
  //       method: "delete",
  //       // data: payload,
  //     },
  //     {
  //       onSuccess: (res) => {
  //         // setLoading(false);
  //         show(res?.message, {
  //           type: "normal",
  //         });
  //         console.log(res);
  //         // dispatch(logIn(res.data[0]));
  //         // AsyncSave("token", res?.data?.[0]?.token);
  //       },

  //       onError: (error) => {
  //         // setLoading(false);
  //         show(error?.message);
  //         console.log(error);
  //       },
  //     }
  //   );
  // };
  const handleknit = (id) => {
    knitmutate(
      {
        key: `Products/kintit/${id}`,
        method: "get",
        data: null,
      },
      {
        onSuccess: (res) => {
          // setLoading(false);
          show(res?.message, {
            type: "normal",
          });
          console.log(res);
          refetch();
          // dispatch(logIn(res.data[0]));
          // AsyncSave("token", res?.data?.[0]?.token);
        },

        onError: (error) => {
          // setLoading(false);
          show(error?.message || "A network occured");
          console.log(error);
        },
      }
    );
  };

  return (
    <View style={{ ...styles.container, backgroundColor: colors.body2 }}>
      <View style={{ ...styles.headerItem, backgroundColor: colors.body }}>
        <TouchableOpacity
          onPress={() => {
            console.log(navigation);
            navigation?.navigate("DetailView", { userId: item?.userId });
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar.Image size={40} />
            <View style={{ marginLeft: 9, justifyContent: "center" }}>
              <Text
                style={{
                  ...fonts.small,
                  fontWeight: "700",
                  fontSize: 16,
                  lineHeight: 17,
                  paddingVertical: 5,
                }}
              >
                {item?.user?.brand}
                {"\n"}
                <Text
                  style={{ ...fonts.small, fontWeight: "700", fontSize: 12 }}
                >
                  @{item?.user?.userName}
                </Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <TouchableHighlight
                underlayColor={colors.body6}
                onPress={openMenu}
              >
                <EntypoIcons
                  name="dots-three-vertical"
                  size={20}
                  color={colors.textColor3}
                />
              </TouchableHighlight>
            }
          >
            {/* SHARE, REPORT, UNKNIT, LIKE */}
            <Menu.Item
              titleStyle={{ ...fonts.small }}
              style={{ height: 40, backgroundColor: colors.body }}
              onPress={() => {
                captureView();
                // share(item?.snapshot);
                // console.log(item)
                closeMenu();
              }}
              title="Share"
            />

            {/* <Menu.Item
              titleStyle={{ ...fonts.small }}
              style={{ height: 40, backgroundColor: colors.body }}
              onPress={() => {
                closeMenu();
         
              }}
              title="Edit"
            /> */}

            {user?.id == item?.userId && (
              <Menu.Item
                titleStyle={{ ...fonts.small }}
                style={{ height: 40, backgroundColor: colors.body }}
                onPress={() => {
                  DeleteProducts(item.id);
                  closeMenu();
                }}
                title="Delete"
              />
            )}
          </Menu>
        </View>
      </View>
      <ViewShot
        style={{ backgroundColor: "#ffffff", borderRadius: 10 }}
        ref={ref}
        options={{ format: "jpg", quality: 1 }}
      >
        <View style={{ width: "100%", aspectRatio: 1, position: "relative" }}>
          {learnMore && (
            <Animated.View style={{ ...styles.overLay, ...animatedStyle }}>
              <Text style={{ ...fonts.small, color: colors.body }}>
                CLICK TO LEARN MORE ON THIS PRODUCT
              </Text>
              <ButtonC
                onPress={() => {
                  Linking.openURL(devLink);
                }}
                style={{
                  paddingHorizontal: 10,
                  backgroundColor: colors.body,
                  borderWidth: 0,
                  marginTop: 9,
                }}
                title="LEARN MORE"
              />
            </Animated.View>
          )}

          <TouchableWithoutFeedback onPress={() => openOverlay()}>
            <Image
              style={styles.stock}
              // source={require("../../assets/stock.png")}
              source={{ uri: item?.snapshot || "" }}
              snapshot
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={{ ...styles.footerItem }}>
          <View style={{ maxWidth: "60%", padding: 3 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  ...fonts.small,
                  fontWeight: "700",
                  fontSize: 16,
                }}
              >
                N{item?.price ? numberWithCommas(item?.price) : ""}
              </Text>
              {item?.stock == true ? (
                <Text
                  style={{
                    ...fonts.small,
                    marginLeft: 20,
                    fontSize: 13,
                    color: colors.body4,
                  }}
                >
                  in stock
                </Text>
              ) : (
                <Text
                  style={{
                    ...fonts.small,
                    marginLeft: 20,
                    fontSize: 13,
                    color: colors.primary,
                  }}
                >
                  out of stock
                </Text>
              )}
              <Text
                style={{
                  ...fonts.small,
                  marginLeft: 20,
                  fontSize: 13,
                }}
              >
                {item?.likeCount || "0"} likes
              </Text>
            </View>
            <Text
              style={{
                ...fonts.small,
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              {item?.title}
            </Text>
            <Text
              ellipsizeMode="tail"
              numberOfLines={4}
              style={{
                ...fonts.small,
                fontWeight: "200",
                fontSize: 13,
              }}
            >
              {item?.description}
            </Text>
          </View>

          <ButtonC
            onPress={() => {
              Linking.openURL(devLink);
            }}
            style={{
              paddingHorizontal: 20,
              borderColor: colors.body,
              backgroundColor: colors.body4,
              marginRight: 5,
              paddingVertical: 5,
            }}
            textStyle={{
              fontSize: 15,
              fontWeight: "bold",
              color: colors.textColor2,
            }}
            title="ORDER NOW"
          />
        </View>
      </ViewShot>
    </View>
  );
};
const styles = StyleSheet.create({
  overLay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgb(0,0,0)",
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  footerItem: {
    marginTop: "auto",
    minHeight: 20,
    padding: 3,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerItem: {
    minHeight: 20,
    width: "100%",
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 9,
    paddingVertical: 8,
    borderRadius: 9,
  },
  container: {
    flex: 1,
    minHeight: 440,
    borderRadius: 9,
    marginVertical: 10,
    elevation: 5,
    paddingBottom: 5,
  },
  tinyLogo: {
    height: 170,
    width: 170,
  },
  stock: {
    resizeMode: "cover",

    aspectRatio: 1,
    height: "100%",
  },
});
export default UsersDiscoverItem;
