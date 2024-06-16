import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";

export default function MyTabBar({ state, descriptors, navigation }) {
  const { colors, fonts } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:colors.body
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };
        const Icons = (color) => {
          return route.name == "Home" ? (
            <AntDesign name="home" size={24} color={color} />
          ) : route.name == "Collections" ? (
            <FontAwesome5 name="copy" size={24} color={color} />
          ) : route.name == "Account" ? (
            <AntDesign name="user" size={24} color={color} />
          ) : route.name == "Add Cart" ? (
            <AntDesign name="shoppingcart" size={24} color={color} />
          ) : (
            <AntDesign name="star" size={24} color={color} />
          );
        };
        const color = isFocused ? colors.primary : colors.textColor3;
        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <View style={{ alignItems: "center", paddingVertical: 6 }}>
              {Icons(color)}
              <Text style={{ color, fontSize: 10 }}>{label}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ...

{
  /* <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
  {...}
</Tab.Navigator> */
}
