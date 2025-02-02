import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  Platform,
} from "react-native";
import { color, design } from "../constants";
import { useTheme, Avatar, Modal, Portal } from "react-native-paper";
import { Button, Title, Paragraph } from "react-native-paper";
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from "react-native-paper-tabs";
import ButtonC from "../components/buttonc";
import TextInputs from "../components/textInput";
import { Formik } from "formik";
import Header from "../components/header";
import ProfileItem from "../components/ProfileItem";
import CartEdit from "../components/cartEdit";
import ColorModal from "../components/colorModal";
import { useSelector } from "react-redux";
import { appToast } from "../components/Helpers";
import { useUploadMutations } from "../services/api";
import WithSpinner from "../components/withspinner";

const Cart = ({ navigation, setLoading }) => {
  const { colors, fonts } = useTheme();
  const [eidtText, setEdittest] = useState(false);
  const { mutate } = useUploadMutations();
  const [showPrice, setShowPrice] = useState(false);
  const [stock, setStock] = useState(false);
  const [colorVisible, setColorVisible] = useState();
  const [image, setImage] = React.useState(null);
  const [editPrice, setEditPrice] = useState(0);
  const [detailsFull, setDetailsFull] = useState("g");
  const [details, setDetails] = useState("");
  const [frameColors, setFrameColors] = useState([
    "#cccccc",
    "#ffffff",
    "#cccccc",
    "#cccccc",
  ]);

  const [detailsPromo, setDetailsPromo] = useState("");
  const [detailsPromofull, setDetailsPromofull] = useState("");
  const [capture, setCapture] = useState(false);
  const [captureCollection, setCaptureCollection] = useState(false);
  const [detailsFulltitle, setDetailsFulltitle] = useState("");
  const [detailstitle, setDetailstitle] = useState("");
  const showEditPrice = () => setShowPrice(true);
  const hideEditPrice = () => setShowPrice(false);
  const showEditTest = () => setEdittest(true);
  const hideEditTest = () => setEdittest(false);
  const showColorEdit = () => setColorVisible(true);
  const hideColorEdit = () => setColorVisible(true);
  const clearImage = () => setImage(null);
  const user = useSelector(({ user }) => user);
  const { show } = appToast();
  const onCapture = React.useCallback((uri) => {
    console.log("do something with ", uri);
  }, []);
  const ref = React.useRef();
  const handlePost = () => {
    if (!image) return;
    if (!user.isLoggedIn) {
      show("you need to login to Post a cart :)");
    } else {
      setCapture(true);
    }
  };
  const handlePostToCollection = () => {
    if (!image) return;
    if (!user.isLoggedIn) {
      show("you need to login to save Collection :)");
    } else {
      setCaptureCollection(true);
    }
  };

  // public string description { get; set; } = "";
  // public bool? stock { get; set; } = true;
  // public List<string> frameColors { get; set; } = new List<string> { };
  // //public string frameColors { get; set; } = "";
  // public string? Snapshot { get; set; } = "";
  // public Etypes? Mediatype { get; set; }

  const publish = async (snapShot, imrArr = []) => {
    let formData = new FormData();
    if (Platform.OS === "ios") {
      formData.append("File", {
        uri: "file://" + snapShot,
        type: "image/jpeg",
        name: "snapshot.jpg",
      });
      imrArr.forEach((item) => {
        formData.append("File", {
          uri: "file://" + item,
          type: "image/jpeg",
          name: `${Math.floor(Math.random() * 10000000000)}.jpg`,
        });
      });
    } else {
      formData.append("File", {
        uri: snapShot,
        type: "image/jpeg",
        name: "snapshot.jpg",
      });
      imrArr.forEach((item) => {
        formData.append("File", {
          uri: item,
          type: "image/jpeg",
          name: `${Math.floor(Math.random() * 10000000000)}.jpg`,
        });
      });
    }
    formData.append("stock", stock);
    frameColors.forEach((element) => {
      formData.append("frameColors", element);
    });
    formData.append("Title", detailsFulltitle);
    formData.append("description", detailsFull);
    formData.append("Price", editPrice);
    formData.append("Mediatype", 0);
    console.log(detailsFulltitle);
    setLoading(true);
    mutate(
      {
        key: "Products",
        data: formData,
        method: "post",
      },
      {
        onSuccess: (success) => {
          setLoading(false);
          setImage(null);
          setEditPrice(0);
          setDetailstitle("");
          setDetailsFull("");
          show(success?.message, {
            type: "normal",
          });
          navigation.navigate("Home");
        },
        onError: (err) => {
          console.log(err);
          setLoading(false);
        },
      }
    );
  };
  const publishToCollection = async (snapShot, imrArr = []) => {
    let formData = new FormData();
    if (Platform.OS === "ios") {
      formData.append("File", {
        uri: "file://" + snapShot,
        type: "image/jpeg",
        name: "snapshot.jpg",
      });
      imrArr.forEach((item) => {
        formData.append("File", {
          uri: "file://" + item,
          type: "image/jpeg",
          name: `${Math.floor(Math.random() * 10000000000)}.jpg`,
        });
      });
    } else {
      formData.append("File", {
        uri: snapShot,
        type: "image/jpeg",
        name: "snapshot.jpg",
      });
      imrArr.forEach((item) => {
        formData.append("File", {
          uri: item,
          type: "image/jpeg",
          name: `${Math.floor(Math.random() * 10000000000)}.jpg`,
        });
      });
    }
    formData.append("stock", stock);
    frameColors.forEach((element) => {
      formData.append("frameColors", element);
    });
    formData.append("Title", detailsFulltitle);
    formData.append("description", detailsFull);
    formData.append("Price", editPrice);
    formData.append("iscollection", true);
    formData.append("Mediatype", 0);
    setLoading(true);
    mutate(
      {
        key: "Products",
        data: formData,
        method: "post",
      },
      {
        onSuccess: (success) => {
          console.log(success);
          setLoading(false);
          setImage(null);
          setEditPrice(0);
          setDetailstitle("");
          setDetailsFull("");
          show("Collection saved", {
            type: "normal",
          });
          navigation.navigate("Collections");
        },
        onError: (err) => {
          console.log(err);
          setLoading(false);
        },
      }
    );
  };
  return (
    <View style={[styles.container, { backgroundColor: colors.body }]}>
      <Header navigation={navigation} />
      <ScrollView>
        <View style={{ ...styles.header, borderColor: colors.body5 }}>
          <ButtonC
            style={{
              backgroundColor: colors.body,
              paddingHorizontal: 1,
              borderWidth: 0,
              padding: 2,
            }}
            onPress={handlePostToCollection}
            textStyle={{ color: colors.primary, fontWeight: "700" }}
            title="+ ADD TO COLLECTION"
          />

          <ButtonC
            style={{ backgroundColor: colors.primary, paddingHorizontal: 20 }}
            textStyle={{ color: color.white, fontWeight: "700" }}
            title="POST"
            onPress={handlePost}
          />
        </View>
        <View style={{ marginTop: 40 }}>
          <CartEdit
            {...{
              image,
              setImage,
              frameColors,
              stock,
              capture,
              setCapture,
              publish,
              setCaptureCollection,
              captureCollection,
              publishToCollection,
            }}
            details={detailsFull}
            price={editPrice}
            title={detailsFulltitle}
            detailsPromo={detailsPromofull}
          />
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
          <ButtonC
            style={styles.editbtn}
            onPress={showEditTest}
            textStyle={styles.editBtnTxt}
            title="EDIT TEXT"
          />
          <ButtonC
            style={styles.editbtn}
            textStyle={styles.editBtnTxt}
            title="COLOUR"
            onPress={showColorEdit}
          />
          <ButtonC
            style={styles.editbtn}
            textStyle={styles.editBtnTxt}
            title="SET STOCK"
            onPress={() => setStock(!stock)}
          />

          <ButtonC
            style={styles.editbtn}
            textStyle={styles.editBtnTxt}
            title="PRICE"
            onPress={showEditPrice}
          />
          <ButtonC
            style={styles.editbtn}
            textStyle={styles.editBtnTxt}
            title="CLEAR IMAGE"
            onPress={clearImage}
          />
        </ScrollView>
      </ScrollView>
      <Portal>
        <Modal
          visible={eidtText}
          onDismiss={hideEditTest}
          contentContainerStyle={{
            ...styles.modal1,
            backgroundColor: colors.body,
          }}
        >
          <View style={{ marginBottom: 8 }}>
            <Text
              style={{ ...fonts.small, fontWeight: "800", textAlign: "center" }}
            >
              Product descriptions
            </Text>
          </View>
          <TextInput
            style={{
              ...styles.editText,
              borderColor: colors.body6,
              height: 33,
            }}
            maxLength={200}
            defaultValue={detailstitle}
            onChangeText={setDetailstitle}
            placeholder="title"
          />
          <View style={{ ...styles.editText, borderColor: colors.body6 }}>
            <TextInput
              style={styles.inputText}
              defaultValue={details}
              autoCapitalize={true}
              placeholder={"Add product description"}
              autoFocus={true}
              onChangeText={setDetails}
              // onSubmitEditing={onSubmitEditing}
              multiline={true}
            />
          </View>
          <TextInput
            style={{
              ...styles.editText,
              borderColor: colors.body6,
              height: 32,
            }}
            maxLength={200}
            value={detailsPromo}
            onChangeText={setDetailsPromo}
            placeholder="Promo Text"
          />
          <View style={{ alignItems: "flex-end" }}>
            <ButtonC
              style={{ backgroundColor: colors.primary, paddingHorizontal: 20 }}
              textStyle={{ color: color.white, fontWeight: "700" }}
              title="DONE"
              onPress={() => {
                hideEditTest();
                setDetailsFull(details);
                setDetailsFulltitle(detailstitle);
                setDetailsPromofull(detailsPromo);
              }}
            />
          </View>
        </Modal>
      </Portal>
      <Portal>
        <Modal
          visible={showPrice}
          onDismiss={hideEditPrice}
          contentContainerStyle={{
            ...styles.modal1,
            backgroundColor: colors.body,
            height: 140,
          }}
        >
          <View style={{ marginBottom: 8 }}>
            <Text
              style={{ ...fonts.small, fontWeight: "800", textAlign: "center" }}
            >
              Set price
            </Text>
          </View>
          <View
            style={{
              ...styles.editText,
              borderColor: colors.body6,
              height: 40,
            }}
          >
            <TextInput
              style={styles.inputText}
              value={editPrice}
              autoCapitalize={true}
              maxLength={10}
              placeholder={"Add product description"}
              autoFocus={true}
              onChangeText={setEditPrice}
              // onSubmitEditing={onSubmitEditing}
              keyboardType="number-pad"
            />
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <ButtonC
              style={{ backgroundColor: colors.primary, paddingHorizontal: 20 }}
              textStyle={{ color: colors.textColor2, fontWeight: "700" }}
              title="DONE"
              onPress={() => {
                hideEditPrice();
                // setDetailsFull(details);
              }}
            />
          </View>
        </Modal>
      </Portal>
      <ColorModal
        {...{ colorVisible, setColorVisible, frameColors, setFrameColors }}
      />
    </View>
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
    height: 350,

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

export default WithSpinner(Cart);
