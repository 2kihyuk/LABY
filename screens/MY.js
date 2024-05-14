import {View , Text,SafeAreaView,StyleSheet, ScrollView , Image,TouchableOpacity ,FlatList} from 'react-native';
import { useState, useEffect  } from 'react';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import { LOCAL, MY_IP_ADDRESS } from '../config';


// 밑에 이름이랑 키 부분에도 백엔드에서 데이터 불러와서 렌더링해야함.   

function MY(){

    const navigation = useNavigation();
    const route = useRoute();

    const handleEditProfile = () => {
        navigation.navigate('EditProfile', { newName: nickname, newHeight: height , newWeight:weight});
    };

    const [nickname, setNickname] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [posts, setPosts] = useState([]);

    // http://${MY_IP_ADDRESS}:8080/api/images/uploads/${userEmail}
    //올린 게시물 렌더링 로직.
    const fetchPosts = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            if (email) {
                console.log('User email:', userEmail);
                const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/api/images/uploads/${email}`);
                if (response.data) {
                    setPosts(response.data);
                } else {
                    console.log('No posts found for this user');
                }
            } else {
                console.log('No user email found');
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
    //컴포넌트가 포커스 받을때 마다 게시물을 새로고침한다. 즉 게시물을 올리고 바로 My.js로 와도 올린 게시물이 바로 업데이트 된다. useFocusEffect.
    useFocusEffect(
        React.useCallback(() => {
            fetchPosts();
        }, [])
    );
    // http://${LOCAL}:8080/profile
    // 사용자 닉네임, 키 , 몸무게 렌더링 로직.
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/profile`);
                setNickname(response.data.nickname);
                setHeight(response.data.height);
                setWeight(response.data.weight);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [nickname,height,weight]);
    


    // const [images, setImages] = useState([
    //     { id: '1', uri: require('../assets/splashimage.png') },
    //     { id: '2', uri: require('../assets/splash.png') },
    //     { id: '3', uri: require('../assets/splashimage.png') },
    //     { id: '4', uri: require('../assets/splash.png') },
    //     // 더 많은 이미지를 필요에 따라 추가할 수 있습니다.
    // ]);


    const renderItem = ({ item }) => (
        <TouchableOpacity
      style={styles.postItem}
      onPress={() => navigation.navigate('Post', { creatorInfo: item })}
    >
      <Image
        style={styles.postImage}
        source={{ uri: item.imageUri }}
        resizeMode={'cover'}
      />
    </TouchableOpacity>
        
        // <Image
        //     style={styles.postImage}
        //     source={{ uri: item.imageUri }}
        //     resizeMode={'cover'} />
    );

    return(
        <SafeAreaView style={styles.container}>
           
                <Text style={styles.headtext}>
                    My  
                </Text>
                <View style={styles.profileView}>
                    <Image
                    style={styles.profileImage}
                    source={require('../assets/profile.png')}
                    resizeMode={'stretch'}/>    
                    <View style={styles.informationView}>
                        <Text style={styles.informationName}>닉네임:{nickname}</Text>
                        <Text style={styles.informationK}>{height}cm</Text>
                        <Text style={styles.informationK}>{weight}kg</Text>

                    </View>
                </View>

                <View style={styles.profileEditButtonView}>

                <TouchableOpacity 
                onPress={handleEditProfile}
                style = {styles.profileEditButton}>
                    <Text>
                        프로필 수정
                    </Text>
                </TouchableOpacity>

            {/* 여기 밑에 텍스트 부분에 로직 추가해서 백엔드에서 데이터가지고와서 렌더링해야함. */}
                <View style={styles.followerView}>
                    <View style={styles.innerfollowerView}>  
                        <Text style={{marginLeft:35}}>팔로워</Text>
                        <Text style={{marginLeft:35}}>팔로잉</Text> 
                        <Text style={{marginLeft:35}}>적립금</Text>
                    </View>
                    <View style={styles.innerfollowerView2}>
                        <Text style={{marginLeft:20}}>5</Text>
                        <Text style={{marginLeft:55}}>20</Text> 
                        <Text style={{marginLeft:55}}>0p</Text>
                    </View>
                </View>
                </View>


                <Text style={styles.PostTextView}>게시물</Text>

                <View style={styles.CreaterOrUser}>

                </View>


                {/* 여기에 줄 하나 긋고, 일반 사용자는 업로드한 게시물이 없습니다. 크리에이터라면, 업로드한 피드를 띄워주는 로직을 추가해야함. */}
                <FlatList
                    data={posts}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2} // 한 줄에 2개의 이미지씩 배치
                    contentContainerStyle={styles.imageList}
                />
                {/* 피드 틀은 만들어 두었고, 피드 클릭시 해당 피드로 이동하는 로직 생성해야함. */}
         

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    scrollViewstyle:{
        flex:1,
        paddingVertical:34,
        // backgroundColor:"#521429"
    },
    headtext:{
        fontSize:16,
        marginBottom:24,
        marginHorizontal:36
    },
    profileView:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:11,
        marginHorizontal:36
    },
    profileImage:{
        width:70,
        height:70,
        marginRight:15
    },
    informationView:{
        flex:1
    },
    informationName:{
        fontSize:15,
        marginBottom:8
    },
    informationK:{
        fontSize:11
    },
    profileEditButtonView:{
        alignItems:'center',
        borderRadius:8,
        paddingVertical:9,
        marginBottom:11,
        marginHorizontal:36
    },  
    profileEditButton:{
        alignItems: "center",
        backgroundColor: "#D9D9D93B",
        borderRadius: 5,
        paddingVertical: 9,
        marginBottom: 11,
        marginHorizontal: 36,
        width:300
    },
    followerView:{
        backgroundColor: "#D9D9D93B",
        borderRadius: 5,
        paddingVertical: 11,
        paddingRight: 39,
        marginBottom: 27,
        marginHorizontal: 36,
        
        
    },
    innerfollowerView:{
        flexDirection: "row",
		alignItems: "center",
		marginBottom: 14,
		marginLeft: 39,
    },
    innerfollowerView2:{
        flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
		marginLeft: 70,
        width:195
    },
    PostTextView:{
        fontSize:16,
        marginBottom:24,
        marginHorizontal:36
    },
    CreaterOrUser:{
        borderBottomWidth: 1, // 선의 두께
    borderBottomColor: 'black', // 선의 색상
    marginVertical: 10, // 선의 수직 여백
    },
    imageList: {
        paddingHorizontal: 16, // 가로 여백
        paddingBottom: 20, // 세로 여백
    },
    // postImage: {
    //     width: '48%', // 한 줄에 두 개의 이미지를 배치하기 위해 너비 조정
    //     aspectRatio: 1, // 이미지 비율 유지
    //     margin: 8, // 이미지 사이 여백
    // },
    postItem: {
        width: '48%',  // 전체 너비의 48% 사용
        aspectRatio: 1,  // 너비와 높이의 비율을 1:1로 유지
        margin: '1.5%',  // 각 항목 주변에 1%의 마진을 줌
      },
      postImage: {
        width: '100%',  // 부모 컨테이너의 100% 너비 사용
        height: '100%',  // 높이를 너비와 같게 설정하여 비율 유지
      },
   


})

export default MY;