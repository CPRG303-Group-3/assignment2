import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";

interface UserDetails {
  "First Name": string;
  "Last Name": string;
}

export default function Landing() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = useState("User");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserDetails() {
      setIsLoading(true);
      try {
        console.log("Fetching user details for:", user?.email);
        if (user?.email) {
          const { data, error } = await supabase
            .from("user_details")
            .select("*")
            .eq("Email", user.email);

          if ((!data || data.length === 0) && error === null) {
            const { data: lowercaseData, error: lowercaseError } =
              await supabase
                .from("user_details")
                .select("*")
                .ilike("Email", user.email.toLowerCase());

            if (lowercaseData && lowercaseData.length > 0) {
              const userData = lowercaseData[0];
              const fullName = `${userData["First Name"] || ""} ${
                userData["Last Name"] || ""
              }`.trim();
              setUserName(fullName || "User");
            } else {
              console.error("No user details found for email:", user.email);
              setUserName("User");
            }
          } else if (data && data.length > 0) {
            const userData = data[0];
            const fullName = `${userData["First Name"] || ""} ${
              userData["Last Name"] || ""
            }`.trim();
            setUserName(fullName || "User");
          } else {
            console.error("No user details found for email:", user.email);
            setUserName("User");
          }

          if (error) {
            console.error("Exact match error:", error);
          }
        }
      } catch (err) {
        console.error("Unexpected error:", JSON.stringify(err));
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserDetails();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {userName}</Text>
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f8ff",
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#ff4500",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  logoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
