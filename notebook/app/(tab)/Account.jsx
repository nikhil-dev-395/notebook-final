import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import { theme } from "../../constants/theme";
import Icon from "../../assets/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Account = ({ refreshKey }) => {
  // Accepting refreshKey as a prop
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [completedCount, setCompletedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchAccountData = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await fetch(
        "http://192.168.141.68:3000/api/v1/todo/account",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        console.error("Failed to fetch account data:", data.message);
        return;
      }

      const data = await response.json();
      setEmail(data.email);
      setUserName(data.username);
      setCompletedCount(data.completedCount);
      setPendingCount(data.pendingCount);
    } catch (error) {
      console.error("Error fetching account data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []); // Re-fetch when refreshKey changes

  const getTruncatedEmail = (email, maxLength = 18) => {
    return email.length > maxLength
      ? email.substring(0, maxLength) + "...."
      : email;
  };

  if (loading) {
    return (
      <ScreenWrapper bg="white">
        <StatusBar backgroundColor="white" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper bg="white">
      <StatusBar backgroundColor="white" />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.iconBox}>
            <Icon name="User" width={40} height={40} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userEmail}>{getTruncatedEmail(email)}</Text>
            </View>
          </View>

          <View style={styles.taskOverview}>
            <Text style={styles.overviewTitle}>Task Overview</Text>
            <View style={styles.taskContainer}>
              <View style={styles.textContainer}>
                <Text
                  style={[styles.taskText, { fontWeight: "900", fontSize: 30 }]}
                >
                  {completedCount}
                </Text>
                <Text style={styles.taskText}>completed task</Text>
              </View>
              <View style={styles.textContainer}>
                <Text
                  style={[styles.taskText, { fontWeight: "900", fontSize: 30 }]}
                >
                  {pendingCount}
                </Text>
                <Text style={styles.taskText}>tasks pending</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 14,
  },
  iconBox: {
    backgroundColor: theme.colors.primaryBackGround,
    padding: 15,
    width: "90%",
    margin: "auto",
    justifyContent: "space-around",
    flexDirection: "row",
    borderRadius: theme.radius.xxl,
    alignSelf: "start",
    marginBottom: 30,
  },
  userInfo: {
    marginLeft: 50,
  },
  userName: {
    fontSize: 20,
  },
  userEmail: {
    color: "#6b7280",
  },
  taskOverview: {
    backgroundColor: "white",
    borderRadius: 30,
    margin: "auto",
    width: "90%",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    width: "100%",
    color: "#6b7280",
  },
  taskContainer: {
    flex: 1,
    borderRadius: theme.radius.xl,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginBottom: 20,
    flexDirection: "row",
    margin: "auto",
    gap: 20,
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.primaryBackGround,
    borderRadius: theme.radius.xxl,
    padding: 15,
  },
  taskText: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
