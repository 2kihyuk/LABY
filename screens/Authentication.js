// import React, { useState } from "react";
// import { SafeAreaView, View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
// import PrimaryButton from "../components/PrimaryButton";
// import { useNavigation } from "@react-navigation/native";
// import axios from "axios";
// import { MY_IP_ADDRESS } from "../config";

// function Authentication() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [nickname, setNickname] = useState('');
//     const [height, setHeight] = useState('');
//     const [weight, setWeight] = useState('');
//     const [gender, setGender] = useState('');

//     const navigation = useNavigation();

//     const handleSignUp = async () => {
//         try {
//             console.log(MY_IP_ADDRESS);
//             const response = await axios.post(`http://${MY_IP_ADDRESS}:8080/signup`, {
//                 email: email,
//                 password: password,
//                 nickname: nickname,
//                 height: height,
//                 weight: weight,
//                 gender: gender
//             });
//             console.log(response.data);
            
//             navigation.navigate("Login");
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             <ScrollView style={styles.scrollviewstyle}>
//                 <Text style={styles.authenticationtextstyle}>
//                     {"회원가입"}
//                 </Text>
//                 <View style={styles.innercontainer}>
//                     <TextInput
//                         style={styles.placeholderstyle}
//                         value={email}
//                         onChangeText={(text) => setEmail(text)}
//                         placeholder="이메일"
//                         placeholderTextColor="#808080"
//                     />
//                     <TouchableOpacity style={styles.touchouble}>
//                         <Text style={styles.touchoubletext}>중복확인</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View style={styles.innercontainer}>
//                     <TextInput
//                         style={styles.placeholderstyle}
//                         value={password}
//                         onChangeText={(text) => setPassword(text)}
//                         placeholder="비밀번호"
//                         placeholderTextColor="#808080"
//                         secureTextEntry={true}
//                     />
//                 </View>
//                 <View style={styles.innercontainer}>
//                     <TextInput
//                         style={styles.placeholderstyle}
//                         onChangeText={(text) => setHeight(text)}
//                         placeholder="키"
//                         placeholderTextColor="#808080"
//                     />
//                 </View>
//                 <View style={styles.innercontainer}>
//                     <TextInput
//                         style={styles.placeholderstyle}
//                         onChangeText={(text) => setWeight(text)}
//                         placeholder="몸무게"
//                         placeholderTextColor="#808080"
//                     />
//                 </View>
//                 <View style={styles.innercontainer}>
//                     <TextInput
//                         style={styles.placeholderstyle}
//                         value={nickname}
//                         onChangeText={(text) => setNickname(text)}
//                         placeholder="닉네임"
//                         placeholderTextColor="#808080"
//                     />
//                 </View>
//                 <View style={styles.genderContainer}>
//                     <TouchableOpacity
//                         style={[styles.genderButton, gender === 'Men' && styles.selected]}
//                         onPress={() => setGender('Men')}>
//                         <Text style={styles.genderText}>남성</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         style={[styles.genderButton, gender === 'Women' && styles.selected]}
//                         onPress={() => setGender('Women')}>
//                         <Text style={styles.genderText}>여성</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View style={styles.ButtonView}>
//                     <PrimaryButton onPress={handleSignUp}>
//                         회원가입
//                     </PrimaryButton>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fcfafa",
//     },
//     scrollviewstyle: {
//         flex: 1,
//         backgroundColor: "#fcfafa",
//         borderRadius: 30,
//         paddingTop: 25,
//         paddingBottom: 289,
//     },
//     authenticationtextstyle: {
//         color: "#bab7b7",
//         fontSize: 25,
//         marginTop: 30,
//         marginBottom: 40,
//         textAlign: 'center',
//         fontWeight: 'bold'
//     },
//     innercontainer: {
//         flexDirection: "row",
//         alignItems: "center",
//         backgroundColor: "#FFFFFF",
//         borderColor: "#000000",
//         borderRadius: 10,
//         paddingVertical: 12,
//         paddingLeft: 25,
//         marginBottom: 30,
//         marginHorizontal: 40,
//         shadowColor: "#00000040",
//         shadowOpacity: 0.3,
//         shadowOffset: {
//             width: 0,
//             height: 4
//         },
//         shadowRadius: 4,
//         elevation: 4,
//     },
//     placeholderstyle: {
//         color: "#000000",
//         fontSize: 16,
//         flex: 1,
//     },
//     touchouble: {
//         borderRadius: 10,
//         width: 80,
//     },
//     touchoubletext: {
//         backgroundColor: '#def1f7',
//         paddingVertical: 5,
//         marginRight: 10,
//         fontSize: 15,
//         color: '#bab7b7',
//         fontWeight: 'bold',
//         textAlign: 'center'
//     },
//     genderContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         marginBottom: 20,
//         marginHorizontal: 40
//     },
//     genderButton: {
//         backgroundColor: '#FFFFFF',
//         padding: 10,
//         width: '48%'
//     },
//     genderText: {
//         textAlign: 'center',
//         color: '#bab7b7',
//         fontWeight: 'bold',
//         fontSize: 16
//     },
//     selected: {
//         backgroundColor: '#def1f7',
//         color: '#FFFFFF'
//     },
//     ButtonView: {
//         alignItems: "center",
//         marginVertical: 10,
//         marginHorizontal: 40,
//     },
// });

// export default Authentication;

import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { MY_IP_ADDRESS } from "../config";

function Authentication() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');

    const navigation = useNavigation();

    const handleEmailCheck = async () => {
        try {
            Alert.alert(
                "중복 확인",
                "사용 가능한 이메일입니다.",
                [
                    { text: "확인", onPress: () => console.log("확인 버튼 클릭") }
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleSignUp = async () => {
        try {
            console.log(MY_IP_ADDRESS);
            const response = await axios.post(`http://${MY_IP_ADDRESS}:8080/signup`, {
                email: email,
                password: password,
                nickname: nickname,
                height: height,
                weight: weight,
                gender: gender
            });
            console.log(response.data);
            navigation.navigate("Overview");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollviewstyle}>
                <Text style={styles.authenticationtextstyle}>
                    {"회원가입"}
                </Text>
                <View style={styles.innercontainer}>
                    <TextInput
                        style={styles.placeholderstyle}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder="이메일"
                        placeholderTextColor="#808080"
                    />
                    <TouchableOpacity onPress={handleEmailCheck}>
                        <Text style={styles.touchoubletext}>중복확인</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.innercontainer}>
                    <TextInput
                        style={styles.placeholderstyle}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder="비밀번호"
                        placeholderTextColor="#808080"
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.innercontainer}>
                    <TextInput
                        style={styles.placeholderstyle}
                        onChangeText={(text) => setHeight(text)}
                        placeholder="키"
                        placeholderTextColor="#808080"
                    />
                </View>
                <View style={styles.innercontainer}>
                    <TextInput
                        style={styles.placeholderstyle}
                        onChangeText={(text) => setWeight(text)}
                        placeholder="몸무게"
                        placeholderTextColor="#808080"
                    />
                </View>
                <View style={styles.innercontainer}>
                    <TextInput
                        style={styles.placeholderstyle}
                        value={nickname}
                        onChangeText={(text) => setNickname(text)}
                        placeholder="닉네임"
                        placeholderTextColor="#808080"
                    />
                </View>
                <View style={styles.genderContainer}>
                    <TouchableOpacity
                        style={[styles.genderButton, gender === 'Men' && styles.selected]}
                        onPress={() => setGender('Men')}>
                        <Text style={[styles.genderText, gender === 'Men' && styles.selectedText]}>남성</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.genderButton, gender === 'Women' && styles.selected]}
                        onPress={() => setGender('Women')}>
                        <Text style={[styles.genderText, gender === 'Women' && styles.selectedText]}>여성</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.ButtonView}>
                    <PrimaryButton onPress={handleSignUp}>
                        회원가입
                    </PrimaryButton>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    scrollviewstyle: {
        flex: 1,
        backgroundColor: "#ffffff",
        borderRadius: 30,
        paddingTop: 25,
        paddingBottom: 289,
    },
    authenticationtextstyle: {
        color: "#bab7b7",
        fontSize: 25,
        marginTop: 30,
        marginBottom: 40,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    innercontainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderColor: "#000000",
        borderRadius: 10,
        paddingVertical: 12,
        paddingLeft: 25,
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
    placeholderstyle: {
        color: "#000000",
        fontSize: 16,
        flex: 1,
    },
    touchoubletext: {
        paddingVertical: 5,
        paddingHorizontal: 17,
        fontSize: 15,
        color: '#58648E',
        fontWeight: 'bold',
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        marginHorizontal: 40
    },
    genderButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        width: '48%'
    },
    genderText: {
        textAlign: 'center',
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 16
    },
    selected: {
        backgroundColor: '#58648E'
    },
    selectedText: {
        color: '#ffffff',
    },
    ButtonView: {
        alignItems: "center",
        marginVertical: 10,
        marginHorizontal: 40,
    },
});

export default Authentication;