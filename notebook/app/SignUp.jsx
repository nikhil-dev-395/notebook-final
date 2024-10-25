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

const SignUp = () => {
  const router = useRouter();

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false); //loading state

  const onSubmit = async () => {
    setLoading(true);
    console.log("onSubmit");
    console.log(username, email, password);
    try {
      const res = await axios.post(
        "http://192.168.141.68:3000/api/v1/auth/register",
        {
          username,
          email,
          password,
        }
      );

      if (res.status === 201) {
        console.log("Registration successful:", res.data);
        await AsyncStorage.setItem("authToken", res.data.token);
        AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
        router.replace("/(tab)");
      }
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
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

        <View style={{ margin: 20 }}>
          <Text style={styles.welcomeText}>Let's , </Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>
        {/* form */}
        <View style={{ backgroundColor: "white" }}>
          <InputText
            icon={<Icon name="User" size={26} strokeWidth={1.7} />}
            placeholder="enter your name"
            onChangeText={setUsername}
          />
          <InputText
            icon={<Icon name="Mail" size={26} strokeWidth={1.7} />}
            placeholder="enter your email"
            onChangeText={setEmail}
          />
          <InputText
            icon={<Icon name="Lock" size={26} strokeWidth={1.7} />}
            placeholder="enter your password"
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <Button buttonTitle="sign up" loading={loading} onPress={onSubmit} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>already have an account ! </Text>
          <Pressable onPress={() => router.push("Login")}>
            <Text
              style={[
                styles.footerText,
                {
                  fontWeight: theme.fonts.extrabold,
                  color: theme.colors.background,
                },
              ]}
            >
              Log In
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: theme.fonts.extrabold,
    color: theme.colors.textDark,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  footerText: { color: theme.colors.textDark, fontSize: theme.radius.sm },
});
