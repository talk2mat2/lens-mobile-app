import { useSelector } from "react-redux";

export const color = {
  blue: "#003399",
  dark:"#000000",
  orange: "#FF5E00",
  purplr: "#A31A8C",
  body: "#ffffff",
  body2:"#171717",
  white: "#ffffff",
  grey1: "#8e8e8e",
  grey2: "#f2f2f2",
  grey3: "#7b7b7b",
  grey4: "#f2f2f2",
  grey5: "#CCCCCC",
  grey6: "#404040",
  grey7: "#595959",
  green: "green",
};
export const fonts = {
  h1: { fontFamily: "ProximaNova" },
  h2: 15,
};

export const fontConfig = {
  ios: {
    h1: {
      fontFamily: "ProximaNova",
      // fontWeight: "normal",
      fontSize: 17,
    },
    header2: {
      fontFamily: "Frunch",
      // fontWeight: "700",
      letterSpacing: 1,
      fontSize: 35,
    },
    discoverBrand: {
      fontFamily: "Frunch",
      fontSize: 25,
    },
    paraOne: {
      fontFamily: "ProximaNova",

      letterSpacing: 1,
      lineHeight: 23,
    },
    small: {
      fontFamily: "ProximaNova",
      // fontWeight: "700",
      fontSize: 17,
    },

    medium: {
      fontWeight: "500",
      fontFamily: "ProximaNova",
      fontSize: 25,
    },
    light: {
      fontFamily: "sans-serif-light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "sans-serif-thin",
      fontWeight: "normal",
    },
  },
  android: {
    h1: {
      fontFamily: "ProximaNova",
      // fontWeight: "normal",
      fontSize: 17,
    },
    header2: {
      fontFamily: "Frunch",
      // fontWeight: "700",
      letterSpacing: 1,
      fontSize: 35,
    },
    discoverBrand: {
      fontFamily: "Frunch",
      fontSize: 25,
    },
    paraOne: {
      fontFamily: "ProximaNova",

      letterSpacing: 1,
      lineHeight: 23,
    },
    small: {
      fontFamily: "ProximaNova",
      // fontWeight: "700",
      fontSize: 17,
    },

    medium: {
      fontWeight: "500",
      fontFamily: "ProximaNova",
      fontSize: 25,
    },
    light: {
      fontFamily: "sans-serif-light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "sans-serif-thin",
      fontWeight: "normal",
    },
  },
};

export const design = {
  padding1: 3,
  round1: 7,
};

export const webColors = [
  "#FFB6C1",
  "#FFC0CB",
  "#FF6347",
  "#FFA500",
  "#FFD700",
  "#F4A460",
  "#DDA0DD",
  "#FFFFFF",
  "#D3D3D3",
  "#00BFFF",
  "#66CDAA",
];

export const useColorMode = () => {
  const theme = useSelector((state) => state.theme);

  //we dont want dark mode on those pathnames
  const isDarkMode = theme?.colorMode === "dark";
  // React.useEffect(() => {
  //   console.log(location?.pathname);
  // }, []);
  return { isDarkMode };
};
