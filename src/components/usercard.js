import { View, StyleSheet, Text } from "react-native";
import { Avatar, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import { useMutations } from "../services/api";
import ButtonC from "./buttonc";
import { appToast } from "./Helpers";

const UserCard = ({ item, refetch = () => {} }) => {
  const { colors, fonts } = useTheme();
  const { mutate: knitmutate, isLoading: knitisloading } = useMutations();
  const { show } = appToast();
  const user = useSelector(({ user }) => user);
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
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Avatar.Image
          size={40}
          source={
            item?.item?.profileImage
              ? { uri: item?.item?.profileImage }
              : require("../../assets/avatar.png")
          }
        />

        <View style={{ marginLeft: 10 }}>
          <Text style={{ ...fonts.small, fontWeight: "bold", fontSize: 15 }}>
            {item?.item?.brand} .
          </Text>
          <Text
            style={{ ...fonts.small, fontSize: 14, color: colors.textColor3 }}
          >
            @{item?.item?.userName}
          </Text>
        </View>
      </View>
      <ButtonC
        style={{
          paddingHorizontal: 20,
          borderColor: colors.body3,
          marginRight: 5,
        }}
        onPress={() => {
          if (!user.isLoggedIn) {
            show("you need to login to knit a brand :)");
          } else {
            handleknit(item?.item.id);
          }
        }}
        textStyle={{ fontSize: 13, fontWeight: "bold" }}
        // title={knitisloading ? "..." : item?.isKnigted ? "Unknit" : "KNIT IT"}
        title={
          knitisloading ? "..." : item?.item?.isKnigted ? "Unknit" : "KNIT IT"
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
});
export default UserCard;
