import * as React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Checkbox, useTheme } from "react-native-paper";

function CheckBox({ label, status, onPress }) {
  const { colors, fonts } = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Checkbox status={status} />
        <Text
          style={{
            ...fonts.small,
            fontWeight: "600",
            textAlign: "center",
            fontSize: 15,
          }}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default CheckBox;
