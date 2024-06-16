import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Image } from "react-native";
import { color, design } from "../constants";
import { useTheme } from "react-native-paper";
import ButtonC from "../components/buttonc";
import TextInputs from "../components/textInput";
import CountDown from "react-native-countdown-component";
import { Formik } from "formik";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
const CELL_COUNT = 6;

const VerifyEmail = () => {
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
          <View style={{ marginVertical: 1 }}>
            <View style={{ marginHorizontal: 10, alignItems: "center" }}>
              <Text
                style={{
                  ...fonts.h1,
                  color: colors.textColor1,
                  fontWeight: "700",
                }}
              >
                VERIFY EMAIL
              </Text>
            </View>
          </View>
          <View
            style={{ marginTop: 6, paddingHorizontal: 40, marginBottom: 10 }}
          >
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
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CountDown
              until={60 * 10 + 30}
              size={17}
              onFinish={() => alert("Finished")}
              digitStyle={{ padding: 0, height: 31, width: 26 }}
              digitTxtStyle={{
                color: "#8e8e8e",
                fontWeight: "700",
                fontSize: 20,
              }}
              timeToShow={["M", "S"]}
              showSeparator
              timeLabels={{ m: "", s: "" }}
            />
            <Text style={{ ...fonts.h1, fontWeight: "700", color: "#8e8e8e" }}>
              s LEFT
            </Text>
          </View>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <ButtonC
              textStyle={{ color: "lime", fontSize: 20 }}
              style={{ paddingHorizontal: 10, borderWidth: 0 }}
              title="Resend Code"
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

export default VerifyEmail;
