// // import { Pressable, StyleSheet, Text, View } from 'react-native';
// // import React, { useState } from 'react';
// // import ScreenWrapper from '../components/ScreenWrapper.jsx';
// // import { StatusBar } from 'expo-status-bar';
// // import Icon from '../assets/icons/index.jsx';
// // import BackButton from '../components/BackButton.jsx';
// // import { theme } from '../constants/theme.js';
// // import InputText from '../components/InputText.jsx';
// // import Button from '../components/Button.jsx';
// // import { useRouter } from 'expo-router';
// // import axios from 'axios';
// // import AsyncStorage from '@react-native-async-storage/async-storage';

// // const Login = () => {
// //     const router = useRouter();

// //     const [email, setEmail] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState(null); // To store error messages

// //     // Handle login form submission
// //     const onSubmit = async () => {
// //         setLoading(true);
// //         setError(null); // Clear previous errors

// //         try {
// //             const response = await axios.post('http://192.168.40.72:3000/api/v1/auth/login', {
// //                 email,
// //                 password,
// //             });

// //             if (response.status === 200) {
// //                 console.log('Login successful:', response.data);

// //                 // Store token and login state
// //                 await AsyncStorage.setItem('authToken', JSON.stringify(response.data.token));
// //                 await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
// //                 const token = await AsyncStorage.getItem("authToken");
// //                 const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
// //                 console.log({ token, isLoggedIn });

// //                 // Navigate to home page
// //                 router.replace('/(tabs)');
// // } else {
// //                 throw new Error('Login failed. Please check your credentials.');
// //             }
// //         } catch (err) {
// //             // Handle login errors
// //             console.error('Login failed:', err.response?.data || err.message);
// //             setError(err.response?.data?.message || 'An error occurred during login');
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     return (
// //         <ScreenWrapper bg="white">
// //             <StatusBar backgroundColor="white" />
// //             <View style={styles.container}>
// //                 <BackButton />

// //                 <View style={styles.header}>
// //                     <Text style={styles.welcomeText}>Let's,</Text>
// //                     <Text style={styles.welcomeText}>Get Started</Text>
// //                 </View>

// //                 {/* Login Form */}
// //                 <View style={styles.form}>
// //                     <InputText
// //                         icon={<Icon name="Mail" size={26} strokeWidth={1.7} />}
// //                         placeholder="Enter your email"
// //                         value={email}
// //                         onChangeText={setEmail}
// //                     />
// //                     <InputText
// //                         icon={<Icon name="Lock" size={26} strokeWidth={1.7} />}
// //                         placeholder="Enter your password"
// //                         value={password}
// //                         onChangeText={setPassword}
// //                         secureTextEntry
// //                     />

// //                     {/* Show error message if any */}
// //                     {error && <Text style={styles.errorText}>{error}</Text>}

// //                     <Button buttonTitle="Login" loading={loading} onPress={onSubmit} />
// //                 </View>

// //                 {/* Footer */}
// //                 <View style={styles.footer}>
// //                     <Text style={styles.footerText}>Don't have an account?</Text>
// //                     <Pressable onPress={() => router.push('SignUp')}>
// //                         <Text style={[styles.footerText, styles.signUpText]}>Sign up</Text>
// //                     </Pressable>
// //                 </View>
// //             </View>
// //         </ScreenWrapper>
// //     );
// // };

// // export default Login;

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         paddingHorizontal: 20,
// //         backgroundColor: theme.colors.white,
// //     },
// //     header: {
// //         marginTop: 20,
// //         marginBottom: 40,
// //     },
// //     welcomeText: {
// //         fontSize: 28,
// //         fontWeight: theme.fonts.extrabold,
// //         color: theme.colors.textDark,
// //     },
// //     form: {
// //         backgroundColor: theme.colors.white,
// //     },
// //     errorText: {
// //         color: theme.colors.error,
// //         marginVertical: 10,
// //         fontSize: 14,
// //     },
// //     footer: {
// //         flexDirection: 'row',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         marginTop: 30,
// //     },
// //     footerText: {
// //         fontSize: theme.radius.sm,
// //         color: theme.colors.textDark,
// //     },
// //     signUpText: {
// //         fontWeight: theme.fonts.extrabold,
// //         color: theme.colors.primary,
// //         marginLeft: 5,
// //     },
// // });

// import { Pressable, StyleSheet, Text, View } from "react-native";
// import React, { useState } from "react";
// import ScreenWrapper from "../components/ScreenWrapper.jsx";
// import { StatusBar } from "expo-status-bar";
// import Icon from "../assets/icons/index.jsx";
// import BackButton from "../components/BackButton.jsx";
// import { theme } from "../constants/theme.js";
// import InputText from "../components/InputText.jsx";
// import Button from "../components/Button.jsx";
// import { useRouter } from "expo-router";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const Login = () => {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null); // To store error messages

//   // Handle login form submission
//   const onSubmit = async () => {
//     setLoading(true);
//     setError(null); // Clear previous errors

//     try {
//       const response = await axios.post(
//         "http://192.168.141.68:3000/api/v1/auth/login",
//         {
//           email,
//           password,
//         }
//       );

//       if (response.status === 200) {
//         console.log("Login successful:", response.data);

//         // Store token and login state
//         await AsyncStorage.setItem(
//           "authToken",
//           JSON.stringify(response.data.token)
//         );
//         await AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));

//         // Navigate to home page (tabs)
//         router.replace("/(tab)");
//       } else {
//         throw new Error("Login failed. Please check your credentials.");
//       }
//     } catch (err) {
//       // Handle login errors
//       console.error("Login failed:", err.response?.data || err.message);
//       setError(err.response?.data?.message || "An error occurred during login");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScreenWrapper bg="white">
//       <StatusBar backgroundColor="white" />
//       <View style={styles.container}>
//         <BackButton />

//         <View style={styles.header}>
//           <Text style={styles.welcomeText}>Let's,</Text>
//           <Text style={styles.welcomeText}>Get Started</Text>
//         </View>

//         {/* Login Form */}
//         <View style={styles.form}>
//           <InputText
//             icon={<Icon name="Mail" size={26} strokeWidth={1.7} />}
//             placeholder="Enter your email"
//             value={email}
//             onChangeText={setEmail}
//           />
//           <InputText
//             icon={<Icon name="Lock" size={26} strokeWidth={1.7} />}
//             placeholder="Enter your password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//           />

//           {/* Show error message if any */}
//           {error && <Text style={styles.errorText}>{error}</Text>}

//           <Button buttonTitle="Login" loading={loading} onPress={onSubmit} />
//         </View>

//         {/* Footer */}
//         <View style={styles.footer}>
//           <Text style={styles.footerText}>Don't have an account?</Text>
//           <Pressable onPress={() => router.push("SignUp")}>
//             <Text style={[styles.footerText, styles.signUpText]}>Sign up</Text>
//           </Pressable>
//         </View>
//       </View>
//     </ScreenWrapper>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     backgroundColor: theme.colors.white,
//   },
//   header: {
//     marginTop: 20,
//     marginBottom: 40,
//   },
//   welcomeText: {
//     fontSize: 28,
//     fontWeight: theme.fonts.extrabold,
//     color: theme.colors.textDark,
//   },
//   form: {
//     backgroundColor: theme.colors.white,
//   },
//   errorText: {
//     color: theme.colors.error,
//     marginVertical: 10,
//     fontSize: 14,
//   },
//   footer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 30,
//   },
//   footerText: {
//     fontSize: theme.radius.sm,
//     color: theme.colors.textDark,
//   },
//   signUpText: {
//     fontWeight: theme.fonts.extrabold,
//     color: theme.colors.primary,
//     marginLeft: 5,
//   },
// });

import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../components/ScreenWrapper.jsx";
import { StatusBar } from "expo-status-bar";
import Icon from "../assets/icons/index.jsx";
import BackButton from "../components/BackButton.jsx";
import { theme } from "../constants/theme.js";
import InputText from "../components/InputText.jsx";
import Button from "../components/Button.jsx";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Login handler
  const onSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://192.168.141.68:3000/api/v1/auth/login",
        { email, password }
      );

      if (response.status === 200) {
        const { token } = response.data;
        await AsyncStorage.setItem("authToken", token);
        await AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
        router.replace("/(tab)");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper bg="white">
      <StatusBar backgroundColor="white" />
      <View style={styles.container}>
        <BackButton />
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Let's,</Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>
        <View style={styles.form}>
          <InputText
            icon={<Icon name="Mail" size={26} strokeWidth={1.7} />}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
          <InputText
            icon={<Icon name="Lock" size={26} strokeWidth={1.7} />}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
          <Button buttonTitle="Login" loading={loading} onPress={onSubmit} />
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Pressable onPress={() => router.push("SignUp")}>
            <Text style={[styles.footerText, styles.signUpText]}>Sign up</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.white,
  },
  header: {
    marginTop: 20,
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: theme.fonts.extrabold,
    color: theme.colors.textDark,
  },
  form: {
    backgroundColor: theme.colors.white,
  },
  errorText: {
    color: theme.colors.error,
    marginVertical: 10,
    fontSize: 14,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  footerText: {
    fontSize: theme.radius.sm,
    color: theme.colors.textDark,
  },
  signUpText: {
    fontWeight: theme.fonts.extrabold,
    color: theme.colors.primary,
    marginLeft: 5,
  },
});
