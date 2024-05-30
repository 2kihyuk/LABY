// import React from 'react';
// import { View, Text, FlatList, Image, StyleSheet, Dimensions,TouchableOpacity } from 'react-native';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useState,useEffect } from 'react';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import { useCallback } from 'react';
// const windowWidth = Dimensions.get('window').width;
// const imageWidth = (windowWidth - 30) / 2; // 한 줄에 두 개의 이미지가 있으므로 가로 여백을 제외하고 20을 더해서 나누어 줍니다.



// function Like() {
//   const [likedPosts, setLikedPosts] = useState([]);
//   const navigation = useNavigation();
//   useFocusEffect(
//     useCallback(() => {
//       const loadLikedPosts = async () => {
//         const likerEmail = await AsyncStorage.getItem('email'); // 사용자 이메일 불러오기
//         const key = `likedPosts-${likerEmail}`; // 사용자별 키 생성
//         const posts = await AsyncStorage.getItem(key);
//         setLikedPosts(posts ? JSON.parse(posts) : []);
//       };

//       loadLikedPosts();
//     }, [])
//   );

//   // const renderItem = ({ item }) => (
//   //   <View style={styles.item}>
//   //     <Image
//   //       style={styles.image}
//   //       source={{ uri: item.imageUri}} 
//   //       resizeMode="cover"
//   //     />
//   //   </View>
//   // );

//   // return (
//   //   <FlatList
//   //     data={likedPosts}
//   //     renderItem={renderItem}
//   //     keyExtractor={item => item.id.toString()}
//   //     numColumns={2} // 한 줄에 두 개의 사진을 표시
//   //     contentContainerStyle={styles.container}
//   //   />
//   // );
//   const handleImageClick = (postInfo) => {
//     navigation.navigate('Post', { creatorInfo: postInfo });
//     console.log(postInfo);
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity onPress={() => handleImageClick(item)}>
//       <View style={styles.item}>
//         <Image
//           style={styles.image}
//           source={{ uri: item.imageUrl }}
//           resizeMode="cover"
//         />
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.maincontainer}>
//       <FlatList
//         data={likedPosts}
//         renderItem={renderItem}
//         keyExtractor={item => item.id.toString()}
//         numColumns={2}
//         contentContainerStyle={styles.container}
//       />
//     </View>
//   );

// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 5, // 이미지 간의 간격을 조절합니다.
//   },
//   item: {
//     width: imageWidth,
//     height: imageWidth, // 이미지를 정사각형으로 표시하기 위해 높이도 설정합니다.
//     margin: 5,
//     borderRadius: 5,
//     overflow: 'hidden',
//   },
//   image: {
//     width: '100%',
//     height: '100%', // 이미지가 정사각형으로 표시되도록 높이를 100%로 설정합니다.
//   },
// });

// export default Like;
// import React, { useState, useEffect, useCallback } from 'react';
// import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import ImageClickable from '../ImageClickable';
// import { MY_IP_ADDRESS } from '../../config';

// const windowWidth = Dimensions.get('window').width;
// const imageWidth = (windowWidth - 30) / 2;

// function Like() {
//   const [likedPosts, setLikedPosts] = useState([]);
//   const [likerId, setLikerId] = useState(null);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchLikerId = async () => {
//       const id = await AsyncStorage.getItem('likerId');
//       setLikerId(id);
//     };

//     fetchLikerId();
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       const loadLikedPosts = async () => {
//         const likerId = await AsyncStorage.getItem('email');
  
//         try {
//           const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/laby/api/v1/hearts/liker/${likerId}`);
//           const posts = response.data;
//           console.log('likePosts: ', posts);

//           setLikedPosts(posts);
  
//           posts.forEach(post => {
//             console.log('item 정보:', post.post);
//           });
//         } catch (error) {
//           console.error('좋아요한 게시물을 가져오는 중 오류 발생:', error);
//         }
//       };
  
//       loadLikedPosts();
//     }, [])
//   );  

//   const renderItem = ({ item }) => (
//     <View style={styles.item}>
//       <ImageClickable postUrl={item.post.imageUrl} postInfo={item.post} />
//     </View>
//   );

//   return (
//     <View style={styles.maincontainer}>
//       <FlatList
//         data={likedPosts}
//         renderItem={renderItem}
//         numColumns={2}
//         contentContainerStyle={styles.container}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   maincontainer: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   container: {
//     padding: 5,
//   },
//   item: {
//     width: '48%',
//     marginBottom: 3,
//     marginHorizontal: 3,
//     position: 'relative',
//   },
// });

// export default Like;


// import React, { useState, useEffect, useCallback } from 'react';
// import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import ImageClickable from '../ImageClickable';
// import { MY_IP_ADDRESS } from '../../config';

// const windowWidth = Dimensions.get('window').width;
// const imageWidth = (windowWidth - 30) / 2;

// function Like() {
//   const [likedPosts, setLikedPosts] = useState([]);

//   const [likerId, setLikerId] = useState(null);

 

//   useEffect(() => {
//     const fetchLikerId = async () => {
//       const id = await AsyncStorage.getItem('likerId');
//       setLikerId(id);
//     };

//     fetchLikerId();
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       const loadLikedPosts = async () => {
//         const likerId = await AsyncStorage.getItem('email');
  
//         try {
//           const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/laby/api/v1/hearts/liker/${likerId}`);
//           const posts = response.data;
//           console.log('likePosts: ', posts);

//           setLikedPosts(posts);
  
//           posts.forEach(post => {
//             console.log('item 정보:', post.post);
//           });
//         } catch (error) {
//           console.error('좋아요한 게시물을 가져오는 중 오류 발생:', error);
//         }
//       };
  
//       loadLikedPosts();
//     }, [])
//   );  

//   const renderItem = ({ item }) => (
//     <View style={styles.item}>
//       <ImageClickable postUrl={item.imageUrl} postInfo={item.post} />
//     </View>
//   );

//   return (
//     <View style={styles.maincontainer}>
//       <FlatList
//         data={likedPosts}
//         renderItem={renderItem}
//         numColumns={2}
//         contentContainerStyle={styles.container}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   maincontainer: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   container: {
//     padding: 5,
//   },
//   item: {
//     width: '49%',
//     marginBottom: 3,
//     marginHorizontal: 2,
//     position: 'relative',
//   },
// });

// export default Like;
import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import ImageClickable from '../ImageClickable';
import { MY_IP_ADDRESS } from '../../config';

const windowWidth = Dimensions.get('window').width;
const imageWidth = (windowWidth - 30) / 2;

function Like() {
  const [likedPosts, setLikedPosts] = useState([]);
  const [likerId, setLikerId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLikerId = async () => {
      const id = await AsyncStorage.getItem('likerId');
      setLikerId(id);
    };

    fetchLikerId();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const loadLikedPosts = async () => {
        const likerId = await AsyncStorage.getItem('email');
  
        try {
          const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/laby/api/v1/hearts/liker/${likerId}`);
          const posts = response.data;
          console.log('likePosts: ', posts);

          setLikedPosts(posts);
  
          posts.forEach(post => {
            console.log('item 정보:', post.post);
          });
        } catch (error) {
          console.error('좋아요한 게시물을 가져오는 중 오류 발생:', error);
        }
      };
  
      loadLikedPosts();
    }, [])
  );  

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <ImageClickable postUrl={item.post.imageUrl} postInfo={item.post} />
    </View>
  );

  return (
    <View style={styles.maincontainer}>
      <FlatList
        data={likedPosts}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 5,
  },
  item: {
    width: '49%',
    marginBottom: 3,
    marginHorizontal: 2,
    position: 'relative',
  },
});

export default Like;