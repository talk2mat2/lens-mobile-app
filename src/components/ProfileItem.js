import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTheme, Avatar } from "react-native-paper";
import EntypoIcons from "@expo/vector-icons/Entypo";
import ButtonC from "./buttonc";
import { numberWithCommas } from "./Helpers";
const ProfileItem = ({ item, navigation, handleDelete = () => {}, id }) => {
  const { colors, fonts } = useTheme();

  return (
    <TouchableWithoutFeedback
      // onPress={() => navigation?.navigate("UserDiscover")}
      onPress={() => navigation?.navigate("UserDiscover", { userId: id })}
    >
      <View style={{ ...styles.container, backgroundColor: colors.body2 }}>
        <View style={{ width: "100%", aspectRatio: 1 }}>
          <Image style={styles.stock} source={{ uri: item?.item?.snapshot }} />
        </View>
        <View style={{ ...styles.footerItem }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              maxWidth: "60%",
            }}
          >
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    ...fonts.small,
                    fontWeight: "700",
                    fontSize: 16,
                  }}
                >
                  N
                  {item?.item?.price ? numberWithCommas(item?.item?.price) : ""}
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
                numberOfLines={8}
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
          <AntDesign
            onPress={() =>
              navigation?.navigate("EditCart", { item: item?.item })
            }
            name="edit"
       
            size={24}
          />
          <AntDesign
               style={{ marginLeft:9 }}
            onPress={() => handleDelete(item?.item?.id)}
            name="delete"
            size={24}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
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
export default ProfileItem;
