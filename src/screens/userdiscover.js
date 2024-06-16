import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { color, design } from "../constants";
import { useTheme } from "react-native-paper";
import ButtonC from "../components/buttonc";
import TextInputs from "../components/textInput";
import { Formik } from "formik";
import DiscoverItem from "../components/discoverItem";
import Header from "../components/header";
import WithSpinner from "../components/withspinner";
import { useClientQuery, useMutations } from "../services/api";
import { useFocusEffect } from "@react-navigation/native";
import { appToast, sortByDateAsc } from "../components/Helpers";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import UsersDiscoverItem from "../components/UsersdiscoverItem";

const UserDiscover = ({ navigation, setLoading, route }) => {
  const { colors, fonts, font } = useTheme();
  const user = useSelector(({ user }) => user.data);
  const { userId } = route?.params;
  const { data, isError, isLoading, refetch } = useClientQuery(
    // `Products/getUserProducst/${user.id}`
    `Products/getUserProducst/${userId}`
  );
  const [updatedData, setUpdatedData] = React.useState([]);
  const { mutate } = useMutations();
  const { show } = appToast();
  useFocusEffect(
    React.useCallback(() => {
      if (!data) {
        refetch();
      }
    }, [])
  );
  React.useEffect(() => {
    setUpdatedData(data?.data);
  }, [isLoading, data]);

  const DeleteProducts = (id) => {
    // console.log(`Products/deleteProduct/${id}`);

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
          const updates = data?.data?.filter((item) => item?.id != id);
          console.log(updates, "uiuujkj");
          refetch();
          setUpdatedData(updates);
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
  return (
    <View style={{ ...styles.container, backgroundColor: colors.body }}>
      {/* <View>
        <TouchableOpacity
          style={{ width: 40 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="left" size={30} color="black" />
        </TouchableOpacity>
      </View> */}
      <View style={{ flexDirection: "row", alignItems: "center" ,height:50}}>
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
          {data?.data?.[0]?.user?.brand || "Details"}
        </Text>
      </View>
      {isLoading && <ActivityIndicator size={50} style={styles.spinner} />}
      {/* <ScrollView style={{ backgroundColor: color.body, ...styles.content }}>
        {data?.data.length > 0 && data.data.map((item) => <DiscoverItem key={item.id} item={item}/>)}
      </ScrollView> */}
      {data?.data?.length > 0 ? (
        <FlatList
          onRefresh={refetch}
          refreshing={false}
          data={updatedData || []}
          renderItem={({ item, index }) => (
            <UsersDiscoverItem
              DeleteProducts={DeleteProducts}
              navigation={navigation}
              key={item.id}
              item={item}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: design.padding1,
    paddingBottom: 20,
    height: "90%",
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
  center: {
    alignItems: "center",
  },
  tinyLogo: {
    height: 100,
    width: 100,
  },
  imageView: {
    borderRadius: 100,
    marginBottom: 40,
  },
  spinner: {
    position: "absolute",
    zIndex: 10,
    elevation: 10,
    alignSelf: "center",
    marginTop: "45%",
  },
});

export default WithSpinner(UserDiscover);
