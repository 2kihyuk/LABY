import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Image, Text, TextInput, Button ,StyleSheet, TouchableOpacity } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import Main from "./Main";
import axios from "axios";
import { MY_IP_ADDRESS,LOCAL} from "../config";


function Authentication() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [nickname, setNickname] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [gender,setGender] = useState('');

    const navigation = useNavigation();
    // http://${LOCAL}:8080/signup
    // http://localhost:8080/signup
    // http://3.34.152.61:8080/laby/api/v1/members
    const handleSignUp = async () => {
        try {
            console.log(MY_IP_ADDRESS);
            const response = await axios.post(`http://${MY_IP_ADDRESS}:8080/signup`, {
                email: email,
                password: password,
                nickname: nickname,
                height:height,
                weight:weight,
                gender: gender
            });
            // 회원가입 성공시 처리
            console.log(response.data);
            navigation.navigate("Overview");
        } catch (error) {
            // 회원가입 실패시 처리
            console.error(error);
        }
    };

    //이메일, 비밀번호, 닉네임 TextInput내용 상태관리. 
    //회원가입 버튼 눌러서 회원가입 성공하면 해당 textInput내용을 db로 전송. 
    //중복확인에 대한 유효성 검사도 필요.
    //Backbutton 클릭시 로그인 화면으로 이동하는 작업도 필요.
    //Backbutton 이미지만 올려놨는데, 버튼 요소로 만드는 작업도 필요함.

    return (
        <SafeAreaView
            style={styles.container}>
            <ScrollView
                style={styles.scrollviewstyle}>
                
                <Text
                    style={styles.authenticationtextstyle}>
                    {"회원가입"}
                </Text>
                <View
                    style={styles.innercontainer}>
                    <TextInput
                        style={styles.placeholderstyle}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder="이메일"
                        placeholderTextColor="#808080"
                    />
                    <TouchableOpacity
                    style={styles.touchouble}>
                        <Text style={styles.touchoubletext}>중복확인</Text>

                    </TouchableOpacity>
                </View>

                <View
                    style={styles.innercontainer}>
                    <TextInput
                        style={styles.placeholderstyle}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder="비밀번호"
                        placeholderTextColor="#808080"
                        secureTextEntry={true}
                    />
                </View>
                <View
                    style={styles.innercontainer}>
                    <TextInput
                        style={styles.placeholderstyle}
                        // value={height}
                        onChangeText={(text) => setHeight(text)}
                        placeholder="키"
                        placeholderTextColor="#808080"
                        // secureTextEntry={true}
                    />
                </View>
                <View
                    style={styles.innercontainer}>
                    <TextInput
                        style={styles.placeholderstyle}
                        // value={weight}
                        onChangeText={(text) => setWeight(text)}
                        placeholder="몸무게"
                        placeholderTextColor="#808080"
                        // secureTextEntry={true}
                    />
                </View>

                
                
                <View
                    style={styles.innercontainer}>
                    <TextInput
                            style={styles.placeholderstyle}
                            value={nickname}
                            onChangeText={(text) => setNickname(text)}
                            placeholder="닉네임"
                            placeholderTextColor="#808080"
                        />
                </View>
                      {/* 성별 선택 */}
                <View style={styles.genderContainer}>
                    <TouchableOpacity
                        style={[styles.genderButton, gender === 'Women' && styles.selected]}
                        onPress={() => setGender('Men')}>
                        <Text style={styles.genderText}>남성</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.genderButton, gender === 'Men' && styles.selected]}
                        onPress={() => setGender('Women')}>
                        <Text style={styles.genderText}>여성</Text>
                    </TouchableOpacity>
                </View>
               
                <View style = {styles.ButtonView}>
                  <PrimaryButton
                        onPress={handleSignUp}>
                       회원가입 
                    </PrimaryButton>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    ButtonView : {
        alignItems: "center",
        marginVertical: 10,
        marginHorizontal: 40,
    },
    scrollviewstyle:{
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        paddingTop: 25,
        paddingBottom: 289
    },
    backbutton:{
        
        width: 31,
        height: 25,
        marginBottom: 50,
        marginHorizontal: 30,
        marginTop: 20
     },
     authenticationtextstyle:{
        color: "#000000",
        fontSize: 20,
        marginBottom: 52,
        marginHorizontal: 47,
        fontWeight:'bold'
     },
     innercontainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderColor: "#000000",
        borderRadius: 30,
        borderWidth: 1,
        paddingVertical: 3,
        paddingLeft: 25,
        paddingRight: 1,
        marginBottom: 30,
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
    placeholderstyle:{
        color: "#000000",
        fontSize: 18,
        flex: 1,
    },
    touchouble:{
        borderWidth:3,
        borderRadius:30,
        width: 70
    },
    touchoubletext:{
        backgroundColor:'black',
        fontWeight:'bold',
        fontSize:15,
        color : 'white',
        textAlign:'center'
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        marginHorizontal: 40
    },
    genderButton: {
        backgroundColor: '#FFFFFF',
        borderColor: '#007BFF',
        borderWidth: 2,
        borderRadius: 15,
        padding: 10,
        width: '45%'
    },
    genderText: {
        textAlign: 'center',
        color: '#007BFF',
        fontSize: 16
    },
    selected: {
        backgroundColor: '#007BFF',
        color: '#FFFFFF'
    }

    
})
export default Authentication;
