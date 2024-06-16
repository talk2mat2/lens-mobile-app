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
} from "react-native";
import { color, design } from "../constants";
import { useTheme } from "react-native-paper";
import ButtonC from "../components/buttonc";
import TextInputs from "../components/textInput";
import { Formik } from "formik";
import DiscoverItem from "../components/discoverItem";
import Header from "../components/header";
import WithSpinner from "../components/withspinner";
import { forceQuery, useClientQuery, useMutations } from "../services/api";
import { useFocusEffect } from "@react-navigation/native";
import { appToast, sortByDateAsc } from "../components/Helpers";
import { useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";

const Discover = ({ navigation, setLoading }) => {
  const { colors, fonts, font } = useTheme();
  const user = useSelector(({ user }) => user.data);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [page, setPage] = React.useState(0);

  const [updatedData, setUpdatedData] = React.useState([]);
  const { data, isError, isLoading, refetch } = useClientQuery(
    "Products?userId=" + (user?.id || 0) + "&&position=" + 0
  );
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
    if (data?.data?.length) {
      setUpdatedData(data?.data);
    }
  }, [isLoading, data]);
  // console.log(data);
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
  const loadMore = async () => {
    setLoadingMore(true);
    await forceQuery(
      "Products?userId=" +
        (user?.id || 0) +
        "&&position=" +
        updatedData?.length,
      "get",
      null
    )
      .then((res) => {
        setLoadingMore(false);
        setUpdatedData([...updatedData, ...res?.data]);
      })
      .catch((err) => {
        setLoadingMore(false);
      });
  };
  return (
    <>
      <StatusBar style="dark" />
      <View style={{ ...styles.container, backgroundColor: colors.body }}>
        <Header navigation={navigation} />
        {isLoading && <ActivityIndicator size={50} style={styles.spinner} />}
        {/* <ScrollView style={{ backgroundColor: color.body, ...styles.content }}>
        {data?.data.length > 0 && data.data.map((item) => <DiscoverItem key={item.id} item={item}/>)}
      </ScrollView> */}
        {data?.data?.length > 0 ? (
          <FlatList
            onRefresh={refetch}
            refreshing={false}
            onEndReached={() => loadMore()}
            data={updatedData || []}
            renderItem={({ item, index }) => (
              <DiscoverItem
                refetch={refetch}
                DeleteProducts={DeleteProducts}
                navigation={navigation}
                key={item.id}
                item={item}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : null}
        {loadingMore && <ActivityIndicator size={20} style={{}} />}
      </View>
    </>
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

export default WithSpinner(Discover);
