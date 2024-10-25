// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Stack } from "expo-router";
// const _layout = () => {
//   const auth = AsyncStorage.getItem("authToken");
//   console.log(auth);

//   return (
//     <Stack
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       {/* {auth ? <Stack.Screen name="(tab)" /> : <Stack.Screen name="index" />} */}

//       <Stack.Screen name="index" />
//       <Stack.Screen name="Login" />
//       <Stack.Screen name="SignUp" />
//     </Stack>
//   );
// };

// export default _layout;
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";

const _layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        setIsAuthenticated(!!token); // Set as true if token exists
      } catch (error) {
        console.error("Failed to retrieve authToken:", error);
      }
    };

    checkAuthToken();
  }, []);

  useEffect(() => {
    // Navigate to the correct screen based on authentication status
    if (isAuthenticated) {
      router.replace("(tab)"); // Navigate to the main tab screen
    } else {
      router.replace("Login"); // Navigate to the login screen
    }
  }, [isAuthenticated, router]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" />
      <Stack.Screen name="SignUp" />
      <Stack.Screen name="(tab)" />
    </Stack>
  );
};

export default _layout;
