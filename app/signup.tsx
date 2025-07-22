import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Platform,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { signUpWithEmail } from "../utils/supabaseAuth";

export default function SignUp() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const goBack = () => {
    router.push("/");
  };

  const handleSignUp = async () => {
    let validated = true;

    setFirstNameError("");
    if (firstName.length < 1) {
      setFirstNameError("Please enter a First Name");
      validated = false;
    }

    setLastNameError("");
    if (lastName.length < 1) {
      setLastNameError("Please enter a Last Name");
      validated = false;
    }

    setEmailError("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length < 1 || !emailRegex.test(email)) {
      setEmailError("Please enter a valid email");
      validated = false;
    }

    setPasswordError("");
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character."
      );
      validated = false;
    }

    if (validated) {
      try {
        await signUpWithEmail(email, password, firstName, lastName);
        alert(
          "Sign Up Successful, please verify your email before signing in."
        );
      } catch (error: any) {
        console.log("Error: ", error);

        if (error.message == "User already registered") {
          alert("Sign up unsuccesful\n User already exists with that email");
        } else {
          alert("Sign up unsuccesful");
        }
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Sign Up</Text>

        <View style={styles.inputContainer}>
          {firstNameError ? (
            <Text style={styles.errorMessage}>{firstNameError}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            placeholderTextColor="#a0a0a0"
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputContainer}>
          {lastNameError ? (
            <Text style={styles.errorMessage}>{lastNameError}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            placeholderTextColor="#a0a0a0"
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputContainer}>
          {emailError ? (
            <Text style={styles.errorMessage}>{emailError}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#a0a0a0"
          />
        </View>

        <View style={styles.inputContainer}>
          {passwordError ? (
            <Text style={styles.errorMessage}>{passwordError}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#a0a0a0"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backLink} onPress={goBack}>
          <Text style={styles.backLinkText}>Back to Sign In?</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f8ff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    width: SCREEN_WIDTH,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 32,
    marginBottom: 30,
    fontWeight: "bold",
    color: "#333",
    alignSelf: "center",
  },
  inputContainer: {
    width: SCREEN_WIDTH - 40,
    marginBottom: 15,
  },
  errorMessage: {
    color: "#dc3545",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#a0a0a0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "white",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    width: SCREEN_WIDTH - 40,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#007bff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  backLink: {
    marginTop: 15,
    padding: 10,
  },
  backLinkText: {
    color: "#007bff",
    fontSize: 14,
    alignSelf: "center",
  },
});
