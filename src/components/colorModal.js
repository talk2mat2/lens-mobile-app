import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { color, design, webColors } from "../constants";
import { useTheme, Avatar, Modal, Portal } from "react-native-paper";
import { RadioButton } from "react-native-paper";
import ButtonC from "./buttonc";
const ColorModal = ({
  colorVisible,
  setColorVisible,
  frameColors,
  setFrameColors,
}) => {
  const { colors, fonts } = useTheme();
  const [checked, setChecked] = React.useState(1);
  const changeColor = (itemcolor) => {
    // const index = selected - 1;
    const snapshot = [itemcolor, itemcolor, itemcolor, itemcolor];
    // snapshot[index] = itemcolor;
    setFrameColors(snapshot);
  };

  return (
    <Portal>
      <Modal
        visible={colorVisible}
        onDismiss={setColorVisible}
        contentContainerStyle={{
          ...styles.modal1,
          backgroundColor: colors.body,
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ marginBottom: 8 }}>
            <Text
              style={{ ...fonts.small, fontWeight: "800", textAlign: "center" }}
            >
              Edit Color
            </Text>
          </View>

          {/* <View style={{ alignItems: "flex-end" }}>
            <ButtonC
              style={{ backgroundColor: colors.primary, paddingHorizontal: 20 }}
              textStyle={{ color: colors.textColor2, fontWeight: "700" }}
              title="DONE"
              onPress={() => {
                hideEditTest();
                setDetailsFull(details);
                setDetailsFulltitle(detailstitle);
                setDetailsPromofull(detailsPromo);
              }}
            />
          </View> */}
          <View>
            <View>
              <Text
                style={{
                  ...fonts.medium,
                  fontSize: 20,
                  marginVertical: 10,
                  color: colors.secondary,
                  marginBottom: 14,
                }}
              >
                Frame color :
              </Text>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                {/* <View>
                  <Text
                    style={{
                      ...fonts.medium,
                      fontSize: 15,
                    }}
                  >
                    Color1
                  </Text>
                  <RadioButton
                    value={1}
                    status={checked === 1 ? "checked" : "unchecked"}
                    onPress={() => setChecked(1)}
                  />
                </View> */}
                {/* <View>
                  <Text
                    style={{
                      ...fonts.medium,
                      fontSize: 15,
                    }}
                  >
                    Color2
                  </Text>
                  <RadioButton
                    value={2}
                    status={checked === 2 ? "checked" : "unchecked"}
                    onPress={() => setChecked(2)}
                  />
                </View> */}
                {/* <View>
                  <Text
                    style={{
                      ...fonts.medium,
                      fontSize: 15,
                    }}
                  >
                    Color3
                  </Text>
                  <RadioButton
                    value={3}
                    status={checked === 3 ? "checked" : "unchecked"}
                    onPress={() => setChecked(3)}
                  />
                </View> */}
                {/* <View>
                  <Text
                    style={{
                      ...fonts.medium,
                      fontSize: 15,
                    }}
                  >
                    Color5
                  </Text>
                  <RadioButton
                    value={4}
                    status={checked === 4 ? "checked" : "unchecked"}
                    onPress={() => setChecked(4)}
                  />
                </View> */}
              </View>
            </View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              // contentContainerStyle={{ justifyContent: "space-around" }}
              horizontal
              style={{
                // flexDirection: "row",
                flexGrow: 0,
                marginTop: "auto",
                marginBottom: 3,
                elevation: 2,
                paddingVertical: 1,
                backgroundColor: colors.body,
                borderColor: colors.body5,
                borderRadius: 10,
                borderWidth: 3,
              }}
            >
              {webColors.map((item, index) => (
                <ButtonC
                  key={index}
                  onPress={() => changeColor(item)}
                  style={{
                    ...styles.editbtn,
                    backgroundColor: item,
                    width: 40,
                    marginHorizontal: 2,
                    height: 40,
                  }}
                  textStyle={styles.editBtnTxt}
                  title=""
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};
const styles = StyleSheet.create({
  inputText: {
    fontSize: 17,
  },
  editText: {
    height: 180,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  modal1: {
    height: 200,

    marginHorizontal: 20,
    borderRadius: 10,
    padding: 10,
  },
  editbtn: {
    borderWidth: 0,
    marginHorizontal: 10,
    marginVertical: 2,
  },
  editBtnTxt: {
    fontSize: 13,
    fontWeight: "800",
  },
  section: {
    height: "95%",
    width: "100%",
    marginTop: 20,
  },
  sub: {
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 17,
    paddingVertical: 5,
  },
  header: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    paddingHorizontal: 3,
    alignItems: "center",
    justifyContent: "space-between",

    borderRadius: 10,
    borderWidth: 3,
    paddingVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: color.body,
    padding: design.padding1,
  },
  tinyLogo: {
    height: 170,
    width: 170,
  },
});
export default ColorModal;
