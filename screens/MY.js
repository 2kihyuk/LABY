

// import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
// import { useState, useEffect } from 'react';
// import React from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { useRoute } from '@react-navigation/native';
// import axios from 'axios';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useFocusEffect } from '@react-navigation/native';
// import { LOCAL, MY_IP_ADDRESS } from '../config';

// function MY() {
//     const navigation = useNavigation();
//     const route = useRoute();

//     const handleEditProfile = () => {
//         navigation.navigate('EditProfile', { newName: nickname, newHeight: height, newWeight: weight });
//     };

//     const [nickname, setNickname] = useState('');
//     const [height, setHeight] = useState('');
//     const [weight, setWeight] = useState('');
//     const [posts, setPosts] = useState([]);
//     const [followingCount, setFollowingCount] = useState('');
//     const [followerCount, setFollowerCount] = useState('');

//     const fetchData = async () => {
//         try {
//             const email = await AsyncStorage.getItem('email');
//             if (email) {
//                 const profileResponse = axios.get(`http://${MY_IP_ADDRESS}:8080/profile`);
//                 const postsResponse = axios.get(`http://${MY_IP_ADDRESS}:8080/api/images/uploads/${email}`);
//                 const followingResponse = axios.get(`http://${MY_IP_ADDRESS}:8080/laby/api/v1/users/${email}/following-count`);
//                 const followerResponse = axios.get(`http://${MY_IP_ADDRESS}:8080/laby/api/v1/users/${email}/follower-count`);

//                 const [profileData, postsData, followingData, followerData] = await Promise.all([profileResponse, postsResponse, followingResponse, followerResponse]);

//                 setNickname(profileData.data.nickname);
//                 setHeight(profileData.data.height);
//                 setWeight(profileData.data.weight);
//                 setPosts(postsData.data);
//                 setFollowingCount(followingData.data);
//                 setFollowerCount(followerData.data);
//             } else {
//                 console.log('사용자 이메일을 찾을 수 없습니다.');
//             }
//         } catch (error) {
//             console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
//         }
//     };

//     useFocusEffect(
//         React.useCallback(() => {
//             fetchData();
//         }, [])
//     );

//     const renderItem = ({ item }) => (
//         <TouchableOpacity
//             style={styles.postItem}
//             onPress={() => navigation.navigate('Post', { creatorInfo: item })}
//         >
//             <Image
//                 style={styles.postImage}
//                 source={{ uri: item.imageUrl }}
//                 resizeMode={'cover'}
//             />
//         </TouchableOpacity>
//     );

//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.profileView}>
//                 <Image
//                     style={styles.profileImage}
//                     source={require('../assets/profile.png')}
//                     resizeMode={'stretch'} />
//                 <View style={styles.informationView}>
//                     <Text style={styles.informationName}>{nickname}</Text>
//                     <Text style={styles.informationK}>{height}cm {weight}kg</Text>
//                 </View>
//             </View>

//             <View style={styles.profileEditButtonView}>
//                 <TouchableOpacity
//                     onPress={handleEditProfile}
//                     style={styles.profileEditButton}>
//                     <Text>프로필 수정</Text>
//                 </TouchableOpacity>

//                 <View style={styles.followerView}>
//                     <View style={styles.innerfollowerView}>
//                         <Text style={{ fontSize: 18 }}>팔로워     <Text style={{ fontWeight: 'bold' }}>{followerCount}</Text></Text>
//                         <Text style={{ marginLeft: 35, fontSize: 18 }}>팔로잉     <Text style={{ fontWeight: 'bold' }}>{followingCount}</Text></Text>
//                     </View>
//                 </View>
//             </View>

//             <Text style={styles.PostTextView}>내 게시물</Text>

//             <View style={styles.CreaterOrUser}></View>

//             <FlatList
//                 data={posts}
//                 renderItem={renderItem}
//                 keyExtractor={item => item.id.toString()}
//                 numColumns={2}
//                 contentContainerStyle={styles.imageList}
//             />
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#ffffff'
//     },
//     profileView: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 25,
//         marginBottom: 11,
//         marginHorizontal: 36
//     },
//     profileImage: {
//         width: 70,
//         height: 70,
//         marginRight: 15
//     },
//     informationView: {
//         flex: 1
//     },
//     informationName: {
//         fontSize: 16,
//         marginBottom: 8,
//         fontWeight: 'bold'
//     },
//     informationK: {
//         fontSize: 13
//     },
//     profileEditButtonView: {
//         alignItems: 'center',
//         borderRadius: 8,
//         paddingVertical: 9,
//         marginBottom: 11,
//         marginHorizontal: 36
//     },
//     profileEditButton: {
//         alignItems: "center",
//         backgroundColor: "#D9D9D93B",
//         borderRadius: 5,
//         paddingVertical: 9,
//         marginBottom: 11,
//         marginHorizontal: 36,
//         width: 300
//     },
//     followerView: {
//         backgroundColor: "#D9D9D93B",
//         width: 300,
//         borderRadius: 5,
//         paddingVertical: 20,
//         marginBottom: 27,
//         marginHorizontal: 36,
//     },
//     innerfollowerView: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: 'center',
//         alignContent: 'center',
//     },
//     PostTextView: {
//         fontSize: 16,
//         marginBottom: 5,
//         marginHorizontal: 36,
//         color: '#7d7d7d'
//     },
//     CreaterOrUser: {
//         borderBottomWidth: 0.5,
//         borderBottomColor: '#cbcbcb',
//         marginVertical: 10,
//     },
//     imageList: {
//         paddingHorizontal: 2,
//         paddingBottom: 3,
//         justifyContent: 'center',
//     },
//     postItem: {
//         width: '49%',
//         aspectRatio: 1,
//         marginHorizontal: 2
//     },
//     postImage: {
//         width: '100%',
//         height: '100%',
//     },
// });

// export default MY;

import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import { MY_IP_ADDRESS } from '../config';

function MY() {
    const navigation = useNavigation();
    const route = useRoute();

    const handleEditProfile = () => {
        navigation.navigate('EditProfile', { newName: nickname, newHeight: height, newWeight: weight });
    };

    const [nickname, setNickname] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [posts, setPosts] = useState([]);
    const [followingCount, setFollowingCount] = useState('');
    const [followerCount, setFollowerCount] = useState('');
    const [profileImage, setProfileImage] = useState('');

    const fetchData = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            if (email) {
                const profileResponse = await axios.get(`http://${MY_IP_ADDRESS}:8080/profile`);
                const postsResponse = await axios.get(`http://${MY_IP_ADDRESS}:8080/api/images/uploads/${email}`);
                const followingResponse = await axios.get(`http://${MY_IP_ADDRESS}:8080/laby/api/v1/users/${email}/following-count`);
                const followerResponse = await axios.get(`http://${MY_IP_ADDRESS}:8080/laby/api/v1/users/${email}/follower-count`);

                const [profileData, postsData, followingData, followerData] = await Promise.all([profileResponse, postsResponse, followingResponse, followerResponse]);

                console.log("프로필 정보:", profileData);
                setNickname(profileData.data.nickname);
                setHeight(profileData.data.height);
                setWeight(profileData.data.weight);
                setPosts(postsData.data);
                setFollowingCount(followingData.data);
                setFollowerCount(followerData.data);
                setProfileImage(profileData.data.profileImageUrl); 
            } else {
                console.log('사용자 이메일을 찾을 수 없습니다.');
            }
        } catch (error) {
            console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    const handleChooseProfileImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('카메라 롤 접근 권한이 필요합니다!');
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (!pickerResult.cancelled && pickerResult.assets.length > 0) {
            try {
                const email = await AsyncStorage.getItem('email');
                const formData = new FormData();
                formData.append('profileImage', {
                    uri: pickerResult.assets[0].uri,
                    name: 'profileImage.jpg',
                    type: 'image/jpg',
                });
                formData.append('newName', nickname);
                formData.append('newHeight', height);
                formData.append('newWeight', weight);

                const response = await axios.put(`http://${MY_IP_ADDRESS}:8080/profile`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response.data);
                setProfileImage(pickerResult.assets[0].uri);
            } catch (error) {
                console.error('프로필 이미지 업데이트 중 오류:', error);
                alert('프로필 이미지를 업데이트하는 중 오류가 발생했습니다.');
            }
        } else {
            console.log('이미지 선택이 취소되었거나 이미지를 찾을 수 없습니다.');
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.postItem}
            onPress={() => navigation.navigate('Post', { creatorInfo: item })}
        >
            <Image
                style={styles.postImage}
                source={{ uri: item.imageUrl }}
                resizeMode={'cover'}
            />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileView}>
                <TouchableOpacity onPress={handleChooseProfileImage}>
                    {profileImage ? (
                        <Image
                            style={styles.profileImage}
                            source={{ uri: profileImage }}
                            resizeMode={'stretch'} />
                    ) : (
                        <Image
                            style={styles.profileImage}
                            source={require('../assets/profile.png')}
                            resizeMode={'stretch'} />
                    )}
                </TouchableOpacity>
                <View style={styles.informationView}>
                    <Text style={styles.informationName}>{nickname}</Text>
                    <Text style={styles.informationK}>{height}cm {weight}kg</Text>
                </View>
            </View>

            <View style={styles.profileEditButtonView}>
                <TouchableOpacity
                    onPress={handleEditProfile}
                    style={styles.profileEditButton}>
                    <Text>프로필 수정</Text>
                </TouchableOpacity>

                <View style={styles.followerView}>
                    <View style={styles.innerfollowerView}>
                        <Text style={{ fontSize: 18 }}>팔로워     <Text style={{ fontWeight: 'bold' }}>{followerCount}</Text></Text>
                        <Text style={{ marginLeft: 35, fontSize: 18 }}>팔로잉     <Text style={{ fontWeight: 'bold' }}>{followingCount}</Text></Text>
                    </View>
                </View>
            </View>

            <Text style={styles.PostTextView}>내 게시물</Text>

            <View style={styles.CreaterOrUser}></View>

            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.imageList}
            />
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    profileView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 11,
        marginHorizontal: 36
    },
    profileImage: {
        width: 70,
        height: 70,
        marginRight: 15,
        borderRadius: 50
    },
    informationView: {
        flex: 1
    },
    informationName: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold'
    },
    informationK: {
        fontSize: 13
    },
    profileEditButtonView: {
        alignItems: 'center',
        borderRadius: 8,
        paddingVertical: 9,
        marginBottom: 11,
        marginHorizontal: 36
    },
    profileEditButton: {
        alignItems: "center",
        backgroundColor: "#D9D9D93B",
        borderRadius: 5,
        paddingVertical: 9,
        marginBottom: 11,
        marginHorizontal: 36,
        width: 300
    },
    followerView: {
        backgroundColor: "#D9D9D93B",
        width: 300,
        borderRadius: 5,
        paddingVertical: 20,
        marginBottom: 27,
        marginHorizontal: 36,
    },
    innerfollowerView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        alignContent: 'center',
    },
    PostTextView: {
        fontSize: 16,
        marginBottom: 5,
        marginHorizontal: 36,
        color: '#7d7d7d'
    },
    CreaterOrUser: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#cbcbcb',
        marginVertical: 10,
    },
    imageList: {
        paddingHorizontal: 5,
        paddingBottom: 5,
        justifyContent: 'center',
    },
    postItem: {
        width: '49%',
        aspectRatio: 1,
        marginVertical: 2,
        marginHorizontal: 2,
    },
    postImage: {
        width: '100%',
        height: '100%',
    },
});

export default MY;