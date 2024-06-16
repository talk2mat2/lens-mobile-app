import React from "react";
import { View, StyleSheet, Text, TextInput, Image } from "react-native";
import { color, design } from "../constants";
import { HelperText, useTheme } from "react-native-paper";
import ButtonC from "../components/buttonc";
import TextInputs from "../components/textInput";
import * as Yup from "yup";
import { Formik } from "formik";
import { useMutations } from "../services/api";
import { appToast } from "../components/Helpers";
import WithSpinner from "../components/withspinner";

const Schema = Yup.object().shape({
  newPsdd: Yup.string().required("Required"),
  newPsdd2: Yup.string().required("Required"),
});
const NewPassword = ({ route, navigation, setLoading }) => {
  const { colors, fonts } = useTheme();
  const { email, otp } = route?.params;
  const { show } = appToast();

  const { mutate } = useMutations();

  const subMitdata = (datas) => {
    mutate(
      {
        key: "Users/ChangePassword",
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
              navigation?.navigate("Login");
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
  return (
    <View style={styles.container}>
      <Formik validationSchema={Schema}
        initialValues={{ newPsdd: "", email, otp, newPsdd2: "" }}
        onSubmit={(values) => {
          if (values.newPsdd != values.newPsdd2) {
            return show("Both password do not macth", {
              type: "normal",
            });
          }
          subMitdata(values)
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
            <View
              style={{
                marginHorizontal: 10,
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  ...fonts.h1,
                  color: colors.textColor1,
                  fontWeight: "700",
                }}
              >
                CREATE A SECURED PASSWORD
              </Text>
            </View>
            <View style={{ marginVertical: 7 }}>
              <TextInputs
                value={values.newPsdd}
                secureTextEntry={true}
                onChangeText={(xxx) => setFieldValue("newPsdd", xxx)}
                placeholder="New Password"
              />
              <HelperText
                style={styles.helperText}
                type="error"
                visible={errors.email}
              >
                {errors.newPsdd}
              </HelperText>
              <TextInputs
                value={values.newPsdd2}
                secureTextEntry={true}
                onChangeText={(xxx) => setFieldValue("newPsdd2", xxx)}
                placeholder="Confirm New Password"
              />
              <HelperText
                style={styles.helperText}
                type="error"
                visible={errors.email}
              >
                {errors.newPsdd2}
              </HelperText>
            </View>
            <View style={{ alignItems: "center", marginTop: 30 }}>
              <ButtonC onPress={handleSubmit} style={{ width: 110 }} title="Finish" />
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
});

export default WithSpinner(NewPassword)
