import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const dispatch = useDispatch();

  const { width } = useWindowDimensions();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    keyboardHide();
    dispatch(authSignInUser(state));
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/photo.jpg")}
        >
          <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 20 : 30,
              }}
            >
              <View style={{ width: width - 2 * 16 }}>
                <View style={styles.header}>
                  <Text style={styles.title}>Увійти</Text>
                </View>
                <View style={{ marginBottom: 16 }}>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: isEmail ? "#ff6c00" : "#e8e8e8",
                      backgroundColor: isEmail ? "#fff" : "#f6f6f6",
                    }}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      setIsEmail(true);
                    }}
                    onBlur={() => setIsEmail(false)}
                    value={state.email}
                    placeholder="Адреса електронної пошти"
                    placeholderTextColor="#bdbdbd"
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, email: value }))
                    }
                  />
                </View>
                <View style={{ position: "relative" }}>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: isPassword ? "#ff6c00" : "#e8e8e8",
                      backgroundColor: isPassword ? "#fff" : "#f6f6f6",
                    }}
                    secureTextEntry={isPasswordHidden}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      setIsPassword(true);
                    }}
                    onBlur={() => setIsPassword(false)}
                    value={state.password}
                    placeholder="Пароль"
                    placeholderTextColor="#bdbdbd"
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.btn}
                    onPress={() => {
                      setIsPasswordHidden((prevState) => !prevState);
                    }}
                  >
                    <Text style={styles.textPassword}>
                      {isPasswordHidden ? "Показати" : "Приховати"}
                    </Text>
                  </TouchableOpacity>
                </View>
                {!isShowKeyboard && (
                  <View>
                    <TouchableOpacity
                      style={styles.button}
                      activeOpacity={0.8}
                      onPress={handleSubmit}
                    >
                      <Text style={styles.btnTitle}>Увійти</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.link}
                      activeOpacity={0.8}
                      onPress={({}) => navigation.navigate("Register")}
                    >
                      <Text style={styles.linkTitle}>
                        Немає облікового запису? Зареєструватись
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  form: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: "relative",
    paddingTop: 32,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 35,
    letterSpacing: 0.01,
    color: "#212121",
    fontFamily: "Roboto-Medium",
  },
  input: {
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    backgroundColor: "#F6F6F6",
  },
  btn: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  textPassword: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
  },
  button: {
    borderWidth: 1,
    height: 50,
    borderRadius: 100,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff6c00",
    borderColor: "transparent",
  },
  btnTitle: {
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
    fontFamily: "Roboto-Regular",
  },
  link: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 132,
  },
  linkTitle: {
    color: "#1b4371",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
});
