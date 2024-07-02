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
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/reducers/usersSlice";
import SearchItem from "../components/searchItem";
import { useMutations } from "../services/api";
import { useState } from "react";
import { appToast } from "../components/Helpers";

const NewComment = ({ navigation }) => {
  const { colors, fonts } = useTheme();
  const { show } = appToast();
  const [details, setDetails] = useState("");
  const user = useSelector(({ user }) => user);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const dispatch = useDispatch();
  const { mutate } = useMutations();
  const handleLogout = () => {
    dispatch(logOut());
  };

  const subMitdata = (query) => {
    if (!query) {
      setResult([]);
      return;
    }
    setLoading(true);
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

  const handlePostComment = (query) => {
    if (!details) {
      show("Emty message bocy", {
        type: "normal",
      });
      return;
    } else {
      subMitdata(details);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.body }]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={{ width: 40 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="left" size={30} color={colors.textColor2} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          ...styles.editText,
          borderColor: colors.body6,
          marginTop: 10,
          marginHorizontal: 10,
        }}
      >
        <TextInput
          style={styles.inputText}
          defaultValue={details}
          autoCapitalize={true}
          placeholder={"Message.."}
          autoFocus={true}
          onChangeText={setDetails}
          // onSubmitEditing={onSubmitEditing}
          multiline={true}
        />
      </View>
      <View
        style={{
          alignItems: "flex-end",
          marginVertical: 10,
          minHeight: 30,
          paddingRight: 10,
        }}
      >
        {user?.isLoggedIn && (
          <ButtonC
            onPress={() => {
              handlePostComment();
            }}
            style={{ width: 100 }}
            title="Send"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    padding: design.padding1,
    paddingTop: 10,
  },
  inputText: {
    fontSize: 17,
  },
  tinyLogo: {
    height: 170,
    width: 170,
  },
  editText: {
    height: 300,
    padding: 10,
    width: "100%",
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
});

export default NewComment;
