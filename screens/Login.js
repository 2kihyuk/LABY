import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Text, TextInput,   StyleSheet } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MY_IP_ADDRESS,LOCAL } from "../config";


// UI가 IOS는 괜찮은데 Anroid는 별로임. 수정해야함. 

function Login(props) {

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // `http://${MY_IP_ADDRESS}:8080/laby/login`
    // http://localhost:8080/login
    // 3.34.152.61:8080
    // 3.34.152.61:8080/laby/api/v1
    // http://${LOCAL}:8080/login
    const handleLogin = async () => {
        try {
            console.log("try문 입장은함")
            const response = await axios.post(`http://${MY_IP_ADDRESS}:8080/login`, {
                email: email,
                password: password
            });
            // console.log(response.data);
            const UserData = response.data;
            if(UserData && UserData.email === email && UserData.password === password){ 
            // 로그인 성공시 처리
            console.log("로그인 성공");
            await AsyncStorage.setItem('email', email); // 서버에서 반환된 토큰을 저장
            await AsyncStorage.setItem('UserData',JSON.stringify(UserData));
            await AsyncStorage.setItem('likerId', email);
            // console.log(email);
            // console.log(UserData);
            navigation.navigate("Overview");
            }else {
                console.log("이메일 또는 비밀번호가 잘못되었습니다.");
                alert("이메일 또는 비밀번호가 잘못되었습니다.");
            }
        } catch (error) {
            // 로그인 실패시 처리
            console.error(error);
            // 실패 처리 예시: 에러 메시지를 사용자에게 알림
            alert("로그인에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <SafeAreaView 
            style={styles.container}>
            <ScrollView
                style={styles.scrollstyle}>
                <Text
                    style={styles.onthelookText}>
                    {"LABY"}
                </Text>
                <Text
                    style={styles.createrText}>
                    {"크리에이터의 취향으로부터 영감을 얻으세요."}
                </Text>
                <View
                     style={styles.TextInputViewStyle}>
                    <TextInput
                        style={styles.TextInputStyle}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder="이메일"
                        placeholderTextColor="#808080"
                    />
                </View>
                <View
                    style={styles.TextInputViewStyle}>
                    <TextInput
                        style={styles.TextInputStyle}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder="비밀번호"
                        placeholderTextColor="#808080"
                        secureTextEntry={true}
                    />
                </View>
                <View style = {styles.ButtonView}>
                  <PrimaryButton
                        onPress={() => {
                            // Handle login button press
                            //해당 버   튼 누르면 , email inputtext내용과 password inputtext내용 가지고 로그인 검사후, 로그인 성공시 메인 화면 이동 , 실패시 다시 로그인.
                            // navigation.navigate("Overview")
                            handleLogin();
                        }}>
                       로그인
                    </PrimaryButton>
                </View>
                <View style = {styles.ButtonView}>
                  <PrimaryButton
                       
                        onPress={() => {
                           navigation.navigate("Authentication")
                        }}>
                       회원가입
                    </PrimaryButton>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    ButtonView : {
        alignItems: "center",
        marginVertical: 10,
        marginHorizontal: 40,
    },
    TextInputStyle : {
        color: "#000000",
        fontSize: 18,
    },
    TextInputViewStyle : {
        backgroundColor: "#FFFFFF",
        borderColor: "#000000",
        borderRadius: 30,
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 19,
        marginBottom: 40,
        marginHorizontal: 40,
        shadowColor: "#00000040",
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 4
                        },
        shadowRadius: 4,
        elevation: 4,
    },
    createrText:{
        color: "#000000",
        fontSize: 20,
        marginBottom: 79,
        marginHorizontal: 105,
        width: 220,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    onthelookText:{
        color: "#000000",
        fontSize: 25,
        marginBottom: 133,
        marginHorizontal: 21,
        fontWeight: 'bold'
    },
    scrollstyle :{
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        paddingTop: 37,
        paddingBottom: 213,
    },
    container : {
        flex: 1,
        backgroundColor: "#FFFFFF",
    }


})

export default Login;
