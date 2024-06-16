import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Keyboard,
} from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
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
const CELL_COUNT = 4;
const logiSchema = Yup.object().shape({
  email: Yup.string().email("invalid email").required("Required"),
});

const ForgotPass = ({ navigation, setLoading, loading, route }) => {
  const { colors, fonts } = useTheme();
  const { mutate } = useMutations();
  const [value, setValue] = useState("");
  const { email } = route?.params;
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const { show } = appToast();

  const dispatch = useDispatch();
  const subMitdata = (datas) => {
    console.log(datas)

    mutate(
      {
        key: "Users/ValidateOtp",
        method: "post",
        data: datas,
      },
      {
        onSuccess: (res) => {
          setLoading(false);

          show(res?.message, {
            type: "normal",
          });

          if (res?.status == true) {
            setTimeout(() => {
              navigation?.navigate("NewPassword", { email, otp: datas?.otp });
            }, 3000);
          }
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

  React.useEffect(() => {
    if (value.length == CELL_COUNT) {
      subMitdata({ email, otp: value });
    }
  }, [value]);
  return (
    <View style={styles.container}>
      <Formik
        validationSchema={logiSchema}
        initialValues={{ email: email, otp: value }}
        onSubmit={(values) => {
          subMitdata({ email, otp: value });
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
              onPress={() => navigation?.navigate("SetNewPass")}
              style={{ width: 110 }}
              title="Procees"
            /> */}
            <View
              style={{
                justifyContent: "flex-start",
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
                Enter the OTP sent to you registered email address
              </Text>
            </View>
            <View
              style={{ marginTop: 10, paddingHorizontal: 40, marginBottom: 30 }}
            >
              {!loading && (
                <CodeField
                  ref={ref}
                  {...props}
                  // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                  value={value}
                  onChangeText={setValue}
                  cellCount={CELL_COUNT}
                  rootStyle={styles.codeFieldRoot}
                  keyboardType="number-pad"
                  textContentType="oneTimeCode"
                  renderCell={({ index, symbol, isFocused }) => (
                    <Text
                      key={index}
                      style={[styles.cell, isFocused && styles.focusCell]}
                      onLayout={getCellOnLayoutHandler(index)}
                    >
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  )}
                />
              )}
            </View>
            <View
              style={{
                alignItems: "center",
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <ButtonC
                onPress={() => navigation?.goBack()}
                style={{ width: 110 }}
                title="Back"
              />
              <ButtonC
                onPress={handleSubmit}
                style={{ width: 110 }}
                title="Proceed"
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
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
});

export default WithSpinner(ForgotPass);
