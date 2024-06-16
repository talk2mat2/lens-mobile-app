import React from "react";
import { debounce } from "lodash";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  Linking,
} from "react-native";
import { useTheme, Avatar } from "react-native-paper";
import EntypoIcons from "@expo/vector-icons/Entypo";
import ButtonC from "./buttonc";
import { numberWithCommas } from "./Helpers";
const DetailItem = ({ item, navigation }) => {
  const { colors, fonts } = useTheme();
  const [learnMore, setLearnMore] = React.useState(false);
  const _animation = new Animated.Value(0);
  const closeOverlay = debounce(() => {
    setLearnMore(false);
  }, 5000);

  const openOverlay = () => {
    setLearnMore(true);
    console.log("called");
  };
  const animatedStyle = {
    opacity: _animation,
  };

  const devLink = "http://api.whatsapp.com/send?phone=234$9051322343";
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

  return (
    <View style={{ ...styles.container, backgroundColor: colors.body2 }}>
      <View style={{ width: "100%", aspectRatio: 1, position: "relative" }}>
        {learnMore && (
          <Animated.View style={{ ...styles.overLay, ...animatedStyle }}>
            <Text style={{ ...fonts.small, color: colors.body, fontSize: 10 }}>
              CLICK TO LEARN MORE ON THIS PRODUCT
            </Text>
            <ButtonC
              // onPress={() => {
              //   Linking.openURL(devLink);
              // }}

              style={{
                paddingHorizontal: 10,
                backgroundColor: colors.body,
                borderWidth: 0,
                marginTop: 9,
              }}
              textStyle={{ fontSize: 13 }}
              title="LEARN MORE"
            />
          </Animated.View>
        )}
        {/* 
        <TouchableWithoutFeedback onPress={() => openOverlay()}>
          <Image
            style={styles.stock}
            // source={require("../../assets/stock.png")}
            source={{ uri: item?.snapshot || "" }}
            snapshot
          />
        </TouchableWithoutFeedback> */}
        {/* <TouchableWithoutFeedback onPress={() => openOverlay()}> */}
        <TouchableWithoutFeedback
          onPress={() =>
            navigation?.navigate("UserDiscover", { userId: item?.item?.userId })
          }
        >
          <View style={{ width: "100%", aspectRatio: 1 }}>
            <Image
              style={styles.stock}
              source={{ uri: item?.item?.snapshot }}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={{ ...styles.footerItem }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  ...fonts.small,
                  fontWeight: "700",
                  fontSize: 16,
                }}
              >
                N{item?.item?.price ? numberWithCommas(item?.item?.price) : ""}
              </Text>
              {item?.item?.stock == true ? (
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
            </View>
            <Text
              style={{
                ...fonts.small,
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              {item?.item?.title}
            </Text>
            <Text
              style={{
                ...fonts.small,
                fontWeight: "200",
                fontSize: 13,
              }}
            >
              {item?.item?.description}
            </Text>
          </View>
        </View>
        {/* <ButtonC
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
        /> */}
      </View>
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
    width: Dimensions.get("screen").width / 2.11,
    minHeight: 100,
    borderRadius: 9,
    marginVertical: 10,
    elevation: 5,
    paddingBottom: 5,
    margin: 1,
  },

  stock: {
    resizeMode: "cover",

    aspectRatio: 1,
    height: "100%",
  },
});
export default DetailItem;
