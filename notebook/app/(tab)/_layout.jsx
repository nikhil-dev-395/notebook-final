import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons"; // Import the icons you want

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
          tabBarLabel: "Home",
        }}
      />
   
      <Tabs.Screen
        name="AiChat"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="chat" color={color} size={size} />
          ),
          tabBarLabel: "AI Chat",
        }}
      />
      <Tabs.Screen
        name="Account"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
          tabBarLabel: "Account",
        }}
      />
    </Tabs>
  );
};

export default _layout;
