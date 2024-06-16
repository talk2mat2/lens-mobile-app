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
  email: Yup.string().email("invalid email").required("Required"),
});

const ForgotPass = ({ navigation, setLoading }) => {
  const { colors, fonts } = useTheme();
  const { mutate } = useMutations();

  const { show } = appToast();

  const dispatch = useDispatch();
  const subMitdata = (datas) => {
    // navigation?.navigate("CodeScreen", { email: datas });
  
    mutate(
      {
        key: `Users/ForgotPassword?email=${datas}`,
        method: "post",
        data: null
      },
      {
        onSuccess: (res) => {
          setLoading(false);
          show(res?.message, {
            type: "normal",
          });
          navigation?.navigate("CodeScreen", { email: datas });
        },
        onError: (error) => {
          setLoading(false);
          show(error?.message);
          z;
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
        initialValues={{ email: "" }}
        onSubmit={(values) => {
          subMitdata(values.email);
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
            {/* <ButtonC
              // onPress={() => navigation?.navigate("SetNewPass")}
              onPress={() => navigation?.navigate("CodeScreen")}
              style={{ width: 110 }}
              title="Procees"
            /> */}
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
                }}
              >
                Enter the email address Linked {"\n"} to your account
              </Text>
            </View>
            <View style={{ marginVertical: 7 }}>
              <TextInputs
                style={styles.input2}
                value={values.email}
                onChangeText={(text) => setFieldValue("email", text)}
                placeholder="Email Address"
              />
              <HelperText
                style={styles.helperText}
                type="error"
                visible={errors.email}
              >
                {errors.email}
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

export default WithSpinner(ForgotPass);
