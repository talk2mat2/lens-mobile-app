import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import {
  MD3LightTheme as DefaultTheme,
  MD2DarkTheme as DarkTheme,
  Provider as PaperProvider,
  useTheme,
  configureFonts,
} from "react-native-paper";
import { color, fontConfig, fonts, useColorMode } from "./src/constants";
import { useFonts } from "expo-font";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastProvider } from "react-native-toast-notifications";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

import Main from "./src/components/main";
import { store, persistor } from "./src/redux/store";
import Toast from "./src/components/toast";
const RootApp = () => {
  const { isDarkMode } = useColorMode();
  

  const themeDark = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: color.purplr,
      secondary: color.white,
      textColor1: color.blue,
      body: color.body2,
      body2: color.body2,
      body3: color.grey3,
      body5: color.body2,
      body6: color.grey5,
      body4: color.green,
      textColor2: color.white,
      textColor3: color.grey1,
    },
    fonts: configureFonts(fontConfig),
    font: fonts,
  };
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: color.purplr,
      secondary: color.blue,
      textColor1: color.blue,
      body: color.body,
      body2: color.grey2,
      body3: color.grey3,
      body5: color.grey4,
      body6: color.grey5,
      body4: color.green,
      textColor2: color.dark,
      textColor3: color.grey1,
    },
    fonts: configureFonts(fontConfig),
    font: fonts,
  };
  return (
    <PaperProvider theme={isDarkMode ? themeDark : theme}>
      <ToastProvider
        offsetBottom={70}
        renderToast={(toast) => <Toast toast={toast} />}
      >
        <Main />
        <StatusBar style="auto" />
      </ToastProvider>
    </PaperProvider>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    ProximaNova: require("./assets/fonts/SFLIGHT.otf"),
    Frunch: require("./assets/fonts/Frunch.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  const queryClient = new QueryClient();

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <RootApp />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 0 : 25,
  },
});
