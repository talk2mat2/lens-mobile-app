import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Image } from "react-native";
import { color, design } from "../constants";
import { useTheme } from "react-native-paper";
import ButtonC from "../components/buttonc";
import TextInputs from "../components/textInput";
import CountDown from "react-native-countdown-component";
import Ionicons from '@expo/vector-icons/AntDesign';
import { Formik } from "formik";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
const CELL_COUNT = 6;
// checkcircleo
const SuccessVerify = () => {
  const { colors, fonts } = useTheme();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View style={styles.container}>
      <View>
        <View style={{ width: "75%" }}>
          <View style={{alignItems:"center"}}>
            <Ionicons name="checkcircleo" size={100} color="green" />
          </View>
          <View style={{ marginHorizontal: 10, alignItems: "center",marginTop:30 }}>
            <Text style={{ ...fonts.h1, color: colors.textColor3 }}>
              EMAIL VERIFIED
            </Text>
          </View>

          <View style={{ alignItems: "center", marginTop: 30 }}>
            <ButtonC
              textStyle={{ fontSize: 20 }}
              style={{ paddingHorizontal: 25 }}
              title="Proceed to login"
            />
          </View>
        </View>
      </View>
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
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 30,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: color.blue,
    textAlign: "center",
    marginHorizontal: 4,
  },
  focusCell: {
    borderColor: "#000",
  },
});

export default SuccessVerify;
