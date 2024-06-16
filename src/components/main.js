import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "../screens/login";
import SignUp from "../screens/signup";
import VerifyEmail from "../screens/verifyemail";
import Welcome from "../screens/welcome";
import SuccessVerify from "../screens/successVerify";
import NewPassword from "../screens/newPassword";
import Discover from "../screens/discover";
import UserDiscover from "../screens/userdiscover";
import { View } from "react-native";
import MyTabBar from "./tabbar";
import Account from "../screens/account";
import Collections from "../screens/collections";
import Cart from "../screens/cart";
import Settings from "../screens/settings";
import SignIn from "../screens/signin";
import { useSelector } from "react-redux";
import { AsyncGetItem } from "./Helpers";
import Search from "../screens/search";
import DetailView from "../screens/detailview";
import Profile from "../screens/profile";
import editprofile from "../screens/editprofile";
import knittersList from "../screens/knittersList";
import knittedList from "../screens/knittedList";
import Editcart from "../screens/editcart";
import privacypolicy from "../screens/privacypolicy";
import forgotpass from "../screens/forgotpass";
import setNewPass from "../screens/setNewPass";
import codescreen from "../screens/codescreen";

const HomeScreen = () => {
  const user = useSelector(({ user }) => user);
  const isLoggedIn = user?.isLoggedIn;
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Discover} />
      <Tab.Screen name="Add Cart" component={Cart} />

      <Tab.Screen name="Collections" component={Collections} />
      {/* <Tab.Screen name="Account" component={Account} /> */}
      <Tab.Screen name="Account" component={!isLoggedIn ? SignIn : Account} />
    </Tab.Navigator>
  );
};

const Main = () => {
  const Stack = createNativeStackNavigator();
  const user = useSelector(({ user }) => user);
  const isLoggedIn = user?.isLoggedIn;
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetailView" component={DetailView} />
        <Stack.Screen name="EditCart" component={Editcart} />
        <Stack.Screen name="KnittersList" component={knittersList} />
        <Stack.Screen name="KnittedList" component={knittedList} />
        <Stack.Screen name="PrivacyPolicy" component={privacypolicy} />
        <Stack.Screen name="UserDiscover" component={UserDiscover} />
        {!isLoggedIn && (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SetNewPass" component={setNewPass} />
            <Stack.Screen name="ForgotPass" component={forgotpass} />
            <Stack.Screen name="Signup" component={SignUp} />

            <Stack.Screen name="NewPassword" component={NewPassword} />
            <Stack.Screen name="CodeScreen" component={codescreen} />
            <Stack.Screen name="SuccessVerify" component={SuccessVerify} />
          </>
        )}
        {isLoggedIn && (
          <>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="settings" component={Settings} />
            <Stack.Screen name="EditProfile" component={editprofile} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
