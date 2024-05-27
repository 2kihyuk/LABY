// //Following.js
// import React from "react";
// import { SafeAreaView, View, ScrollView, Text, Image, StyleSheet } from "react-native";
// import Colors from "../constants/color";
// import { creators } from "../components/List/CreaterList";
// import ImageClickable from "../components/ImageClickable";
// import { useState,useCallback } from "react";
// import axios from "axios";
// import { useFocusEffect } from '@react-navigation/native';
// import { LOCAL, MY_IP_ADDRESS } from "../config";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useEffect } from "react";

// const Following = (props) => {

//   const [posts, setPosts] = useState([]);
//   const [userId, setUserId] = useState('');

//   useEffect(() => {
//     const fetchFollowingUserData = async () => {
//       const followingData = await AsyncStorage.getItem('followPageData');
//       if (followingData) {
//         const parsedData = JSON.parse(followingData);
//         if (parsedData && parsedData.id) {
//           setUserId(parsedData.id);
//         }
//       }
//     };

//     fetchFollowingUserData();
//   }, []);

//   const fetchPosts = async () => {
//     if (!userId) return;

//     try {
//       const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/api/images/following/${userId}`);
//       setPosts(response.data);
//     } catch (error) {
//       console.error('Failed to fetch posts:', error);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchPosts();
//     }, [userId])
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.heading}>팔로우중인 크리에이터</Text>
//       <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollView}>
//         <View style={styles.creatorContainer}>
//           {creators.map((creator, index) => (
//             <View key={index} style={styles.creator}>
//               <Image
//                 source={{ uri: creator.image }}
//                 resizeMode="stretch"
//                 style={styles.creatorImage}
//               />
//               <Text style={styles.creatorName}>{creator.name}</Text>
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//       <ScrollView style={styles.imageScrollView}>
//         <View style={styles.postContainer}>
//           {posts.map((post, index) => (
//             <View key={index} style={styles.postItem}>
//                <ImageClickable postUrl={post.imageUrl} postInfo={post} />
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     </SafeAreaView >
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//   },
//   scrollView: {
//     maxHeight: 100,
//   },
//   heading: {
//     color: "#000000",
//     fontSize: 15,
//     fontWeight: 'bold',
//     marginBottom: 14,
//     marginHorizontal: 25,
//   },
//   creatorContainer: {
//     flexDirection: "row",
//     marginHorizontal: 25,
//     marginBottom: 20
//   },
//   creator: {
//     flexDirection: "column",
//     alignItems: "center",
//     marginRight: 15,
//   },
//   creatorImage: {
//     borderRadius: 50,
//     width: 65,
//     height: 65,
//     marginBottom: 5,
//   },
//   creatorName: {
//     color: Colors.primary100,
//     fontSize: 12,
//   },
//   imageScrollView: {
//     flex: 1,
//   },
//   postContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//   },
//   postItem: {
//     width: '48%',
//     marginBottom: 3,
//     marginHorizontal: 3,
//     position: 'relative',
//   },
//   post: {
//     width: '100%',
//     height: 240,
//   }
// });

// export default Following;
//Following.js


// import React from "react";
// import { SafeAreaView, View, ScrollView, Text, Image, StyleSheet } from "react-native";
// import Colors from "../constants/color";
// import { creators } from "../components/List/CreaterList";
// import ImageClickable from "../components/ImageClickable";
// import { useState,useCallback } from "react";
// import axios from "axios";
// import { useFocusEffect } from '@react-navigation/native';
// import { LOCAL, MY_IP_ADDRESS } from "../config";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useEffect } from "react";

// const Following = (props) => {

//   const [posts, setPosts] = useState([]);
//   const [userId, setUserId] = useState('');

//   useEffect(() => {
//     const fetchFollowingUserData = async () => {
//       const followingData = await AsyncStorage.getItem('followPageData');
//       if (followingData) {
//         const parsedData = JSON.parse(followingData);
//         if (parsedData && parsedData.id) {
//           setUserId(parsedData.id);
//         }
//       }
//     };

//     fetchFollowingUserData();
//   }, []);

//   const fetchPosts = async () => {
//     if (!userId) return;

//     try {
//       const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/api/images/following/${userId}`);
//       setPosts(response.data);
//     } catch (error) {
//       console.error('Failed to fetch posts:', error);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchPosts();
//     }, [userId])
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.heading}>팔로우중인 크리에이터</Text>
//       <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollView}>
//         <View style={styles.creatorContainer}>
//           {creators.map((creator, index) => (
//             <View key={index} style={styles.creator}>
//               <Image
//                 source={{ uri: creator.image }}
//                 resizeMode="stretch"
//                 style={styles.creatorImage}
//               />
//               <Text style={styles.creatorName}>{creator.name}</Text>
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//       <ScrollView style={styles.imageScrollView}>
//         <View style={styles.postContainer}>
//           {posts.map((post, index) => (
//             <View key={index} style={styles.postItem}>
//                <ImageClickable postUrl={post.imageUrl} postInfo={post} />
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     </SafeAreaView >
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     marginTop: 20
//   },
//   scrollView: {
//     maxHeight: 100,
//   },
//   heading: {
//     color: "#000000",
//     fontSize: 15,
//     fontWeight: 'bold',
//     marginBottom: 14,
//     marginHorizontal: 25,
//   },
//   creatorContainer: {
//     flexDirection: "row",
//     marginHorizontal: 25,
//     marginBottom: 20
//   },
//   creator: {
//     flexDirection: "column",
//     alignItems: "center",
//     marginRight: 15,
//   },
//   creatorImage: {
//     borderRadius: 50,
//     width: 65,
//     height: 65,
//     marginBottom: 5,
//   },
//   creatorName: {
//     color: Colors.primary100,
//     fontSize: 12,
//   },
//   imageScrollView: {
//     flex: 1,
//   },
//   postContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//   },
//   postItem: {
//     width: '48%',
//     marginBottom: 3,
//     marginHorizontal: 3,
//     position: 'relative',
//   },
//   post: {
//     width: '100%',
//     height: 240,
//   }
// });

// export default Following;

import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, View, ScrollView, Text, Image, StyleSheet } from "react-native";
import Colors from "../constants/color";
import ImageClickable from "../components/ImageClickable";
import axios from "axios";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MY_IP_ADDRESS } from "../config";

const Following = (props) => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState('');
  const [followCreators, setFollowCreators] = useState([]);

  useEffect(() => {
    const fetchFollowingUserData = async () => {
      const followingData = await AsyncStorage.getItem('followPageData');
      if (followingData) {
        const parsedData = JSON.parse(followingData);
        if (parsedData && parsedData.id) {
          setUserId(parsedData.id);
        }
      }
    };

    fetchFollowingUserData();
  }, []);

  const fetchPosts = async () => {
    if (!userId) return;

    try {
      const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/api/images/following/${userId}`);
      setPosts(response.data);
      console.log("팔로우 페이지: ", response.data);

      const uniqueCreators = Array.from(new Map(response.data.map(post => [post.creatorName, post])).values());
      setFollowCreators(uniqueCreators);
      await storeFollowCreators(uniqueCreators);
    } catch (error) {
      console.error('게시물 가져오기 실패:', error);
    }
  };

  const storeFollowCreators = async (creators) => {
    try {
      await AsyncStorage.setItem('followCreators', JSON.stringify(creators));
    } catch (error) {
      console.error('팔로우 크리에이터 저장 실패:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [userId])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>팔로우중인 크리에이터</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.creatorContainer}>
          {followCreators.map((creator, index) => (
            <View key={index} style={styles.creator}>
              <Image
                source={{ uri: creator.creatorImage }}
                resizeMode="stretch"
                style={styles.creatorImage}
              />
              <Text style={styles.creatorName}>{creator.creatorName}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <ScrollView style={styles.imageScrollView}>
        <View style={styles.postContainer}>
          {posts.map((post, index) => (
            <View key={index} style={styles.postItem}>
              <ImageClickable postUrl={post.imageUrl} postInfo={post} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 20
  },
  scrollView: {
    maxHeight: 100,
  },
  heading: {
    color: "#000000",
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 14,
    marginHorizontal: 25,
  },
  creatorContainer: {
    flexDirection: "row",
    marginHorizontal: 25,
    marginBottom: 20
  },
  creator: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 15,
  },
  creatorImage: {
    borderRadius: 50,
    width: 65,
    height: 65,
    marginBottom: 5,
  },
  creatorName: {
    color: Colors.primary100,
    fontSize: 12,
  },
  imageScrollView: {
    flex: 1,
  },
  postContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  postItem: {
    width: '48%',
    marginBottom: 3,
    marginHorizontal: 3,
    position: 'relative',
  },
  post: {
    width: '100%',
    height: 240,
  }
});

export default Following;