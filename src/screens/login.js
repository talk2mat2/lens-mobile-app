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
  email: Yup.string().required("Required"),
  password: Yup.string()
    .min(5, "password is too short")
    .max(80, "password is too long")
    .required(),
});

const Login = ({ navigation, setLoading }) => {
  const { colors, fonts } = useTheme();
  const { mutate } = useMutations();

  const { show } = appToast();

  const dispatch = useDispatch();
  const subMitdata = (datas) => {
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
        initialValues={{ email: "", password: "" }}
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
            <View style={{ alignItems: "center" }}>
              <Image
                style={[styles.tinyLogo,{objectFit:"contain"}]}
                source={require("../../assets/logo3.png")}
              />
            </View>
            <View style={{ marginVertical: 7 }}>
              <TextInputs
                style={styles.input2}
                value={values.email}
                onChangeText={(text) => setFieldValue("email", text)}
                placeholder="Email Address or Username"
              />
              <HelperText
                style={styles.helperText}
                type="error"
                visible={errors.email}
              >
                {errors.email}
              </HelperText>
              <TextInputs
                secureTextEntry={true}
                style={styles.input2}
                value={values.password}
                onChangeText={(txt) => setFieldValue("password", txt)}
                placeholder="Password"
              />
              <HelperText
                style={styles.helperText}
                type="error"
                visible={errors.email}
              >
                {errors.password}
              </HelperText>
            </View>
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <ButtonC
                onPress={handleSubmit}
                style={{ width: 110 }}
                title="Login"
              />
            </View>
            <View
              style={{ alignItems: "center", marginTop: 10, paddingBottom: 8 }}
            >
              <Text
                style={{
                  color: color.blue,
                  marginVertical: 5,
                  fontWeight: "700",
                }}
              >
                New Here ?
              </Text>
              <ButtonC
                onPress={() => navigation.navigate("Signup")}
                style={{ paddingHorizontal: 10 }}
                title="Create New Account"
              />
              <View style={{ marginTop: "5%" }}>
                <ButtonC
                  onPress={() => navigation.navigate("ForgotPass")}
                  style={{ paddingHorizontal: 10,borderWidth:0 }}
                  title="Forgot Password ?"
                />
              </View>
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
    // height: 170,
    // width: 170,
    height:80,
   width:180,
    objectFit:"contain"

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

export default WithSpinner(Login);
