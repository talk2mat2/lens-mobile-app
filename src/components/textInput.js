import React from "react";
import { TextInput } from "react-native-paper";
import { color, design } from "../constants";
import { useTheme } from "react-native-paper";

const TextInputs = (
  { placeholder = "", style = {}, onChangeText, value, secureTextEntry,autoFocus },
  otherProps
) => {
  const { fonts, colors } = useTheme();
  return (
    <TextInput
      autoFocus={autoFocus}
      value={value}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      placeholderTextColor={colors.textColor1}
      underlineColor={colors.primary}
      autoCapitalize="none"
      theme={{ colors: { text:colors.textColor2 } }}
      placeholder={placeholder}
      style={{
        textAlign: "center",
        fontFamily: "ProximaNova",

        fontSize: 17,
        width: "100%",
        justifyContent: "flex-end",
        height: 40,

        marginVertical: 10,
        backgroundColor: color.body,
        borderBottomWidth: 0.5,
        // borderBottomColor: colors.primary,
        ...style,
      }}
    />
  );
};

export default TextInputs;
