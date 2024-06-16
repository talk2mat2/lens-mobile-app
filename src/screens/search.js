import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Touchable,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";

import { color, design } from "../constants";
import { useTheme } from "react-native-paper";
import ButtonC from "../components/buttonc";
import TextInputs from "../components/textInput";
import { Formik } from "formik";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/reducers/usersSlice";
import SearchItem from "../components/searchItem";
import { useMutations } from "../services/api";

const Search = ({ navigation }) => {
  const { colors, fonts } = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const dispatch = useDispatch();
  const { mutate } = useMutations();
  const handleLogout = () => {
    dispatch(logOut());
  };

  const subMitdata = (query) => {
    if(!query){
      setResult([])
      return
    }
    setLoading(true)
    mutate(
      {
        key: "Users/autoSearch?query=" + query,
        method: "get",
        // data: datas,
      },
      {
        onSuccess: (res) => {
          setLoading(false);
          
          setResult(res?.data);
        },
        onError: (error) => {
          setResult([]);
          setLoading(false);
          show(error?.message);
        },
      }
    );
  };

  const handleSearch = (query) => {
    if (query != null) {
      setQuery(query);
      subMitdata(query);
    }
  };

  return (
    <View style={[styles.container,{backgroundColor:colors.body}]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={{ width: 40 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="left" size={30} color={colors.textColor2} />
        </TouchableOpacity>

        <TextInputs
          autoFocus={true}
          placeholder={"Search Brands"}
          value={query}
          onChangeText={(text) => handleSearch(text)}
          style={{
            backgroundColor: colors.body5,
            boderRadius: 10,
            width: "80%",
            color:colors.textColor2
          }}
        />
        {/* <Text
          style={{
            ...fonts.medium,
            // fontSize: 25,
            marginLeft: "27%",
          }}
        >
          Settings
        </Text> */}
      </View>
      {loading && <ActivityIndicator size={20} style={{}} />}
      <View
        style={{
          width: "100%",
          flex: 1,
          paddingHorizontal: 10,
          alignItems: "center",
        }}
      >
        {result?.map((item) => (
          <SearchItem navigation={navigation} item={item} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.body,
    padding: design.padding1,
    paddingTop: 10,
  },
  tinyLogo: {
    height: 170,
    width: 170,
  },
});

export default Search;
