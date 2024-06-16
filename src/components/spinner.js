import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { MD2Colors } from "react-native-paper";
import Welcome from "../screens/welcome";

const Spinner = (props) => {
  const [loading, setLoading] = React.useState(false);
  return (
    <View style={{ flex: 1 }}>
      <ActivityIndicator size={50} style={styles.spinner} />
    </View>
  );
};

const styles = StyleSheet.create({
  spinner: {
    position: "absolute",
    zIndex: 10,
    elevation: 10,

    alignSelf: "center",
    marginTop: "45%",
  },
});
export default Spinner;
