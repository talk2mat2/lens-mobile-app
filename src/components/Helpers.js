import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";

export const AsyncSave = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

// getting data
export const AsyncGetItem = async (key) => {
  try {
    const userData = JSON.parse(await AsyncStorage.getItem(key));

    return userData;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const AsyncRemove = (key) => {
  try {
    AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const appToast = () => {
  const { show, hide, hideAll, update } = useToast();

  return {
    show,
    hide,
    hideAll,
    update,
  };
};

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function sortByDateAsc(a, b) {
  return new Date(b.createdAt) - new Date(a.createdAt);
}
