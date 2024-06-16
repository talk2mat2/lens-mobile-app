import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Keyboard,
} from "react-native";
import { color, design } from "../constants";
import { useTheme, HelperText } from "react-native-paper";
import ButtonC from "../components/buttonc";
import TextInputs from "../components/textInput";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutations } from "../services/api";
import WithSpinner from "../components/withspinner";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/reducers/usersSlice";
import { appToast, AsyncSave } from "../components/Helpers";

const logiSchema = Yup.object().shape({
  password: Yup.string().min(7, "too shot").required("Required"),
  password2: Yup.string().min(7, "too shot").required("Required"),
});

const SetNewPass = ({ navigation, setLoading }) => {
  const { colors, fonts } = useTheme();
  const { mutate } = useMutations();

  const { show } = appToast();

  const dispatch = useDispatch();
  const subMitdata = (datas) => {
    if (datas?.password != datas?.password2) {
      return show("Both Password do not match");
    }
    mutate(
      {
        key: "Users/login",
        method: "post",
        data: datas,
      },
      {
        onSuccess: (res) => {
          setLoading(false);
          show(res?.message, {
            type: "normal",
          });
          dispatch(logIn(res.data[0]));
          AsyncSave("token", res?.data?.[0]?.token);
        },
        onError: (error) => {
          setLoading(false);
          show(error?.message);
        },
      }
    );
  };
  // React.useEffect(() => {
  //   toast.show("hello martins", {
  //     type: "normal",
  //   });
  // }, []);
  return (
    <View style={styles.container}>
      <Formik
        validationSchema={logiSchema}
        initialValues={{ password2: "", password: "" }}
        onSubmit={(values) => {
          subMitdata(values);
          setLoading(true);
          Keyboard.dismiss();
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          setFieldValue,
        }) => (
          <View style={{ width: "75%" }}>
            {/* src/screens/login.js{" "} */}
            {/* <View style={{ alignItems: "center" }}>
              <Image
                style={styles.tinyLogo}
                source={require("../../assets/logo2.png")}
              />
            </View> */}
            <View
              style={{
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: color.blue,
                  marginVertical: 5,
                  fontWeight: "700",
                  fontSize: 17,
                }}
              >
                Set New Password
              </Text>
            </View>
            <View style={{ marginVertical: 7, marginTop: 20 }}>
              <TextInputs
                style={styles.input2}
                value={values.password}
                secureTextEntry={true}
                onChangeText={(text) => setFieldValue("password", text)}
                placeholder="New Password"
              />
              <HelperText
                style={styles.helperText}
                type="error"
                visible={errors.email}
              >
                {errors.password}
              </HelperText>
            </View>
            <View style={{ marginVertical: 2 }}>
              <TextInputs
                style={styles.input2}
                value={values.password2}
                secureTextEntry={true}
                onChangeText={(text) => setFieldValue("password2", text)}
                placeholder="Repeat New Password"
              />
              <HelperText
                style={styles.helperText}
                type="error"
                visible={errors.email}
                sec
              >
                {errors.password2}
              </HelperText>
            </View>
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <ButtonC
                onPress={handleSubmit}
                style={{ width: 110 }}
                title="Procees"
              />
            </View>
            <View
              style={{ alignItems: "center", marginTop: 10, paddingBottom: 8 }}
            >
              <View style={{ marginTop: "5%" }}></View>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.body,
    padding: design.padding1,
    alignItems: "center",
    justifyContent: "center",
  },
  tinyLogo: {
    height: 170,
    width: 170,
  },
  input2: {
    marginBottom: 0,
    marginTop: 0,
  },
  helperText: {
    marginTop: 0,
    paddingVertical: 0,
  },
});

export default WithSpinner(SetNewPass);
