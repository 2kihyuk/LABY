// //Ranking.js
// import React from 'react';
// import { SafeAreaView, ScrollView, Text, Image, View, StyleSheet } from "react-native";
// import { creators } from "../components/List/CreaterList";
// import Filter from "../components/Filter/Filter";
// import ImageClickable from '../components/ImageClickable';
// import axios from 'axios';
// import { useFocusEffect } from '@react-navigation/native';
// import { useState,useEffect ,useCallback } from "react";
// import { LOCAL, MY_IP_ADDRESS } from '../config';

// // Ranking에서도 업로드한 게시물 리스트 띄워줄 때 ,  Recommand에서 한 방식처럼 하면 다 되는데, Ranking. 순위를 어떻게 할것인지??????????? 무작위 랜덤? 아니면 조회수순위???
// //

// function Ranking() {

//   const [posts, setPosts] = useState([]);
 
//   // http://${LOCAL}:8080/api/images/get
//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/api/images/get`);
      
//       const formattedPosts = response.data.map(post => {
//         let decodedImageUrl = decodeURIComponent(post.imageUrl);
//         // console.log('Recommand.js Console : ImageUrl :' ,post.imageUrl);
//         // 잘못된 URL 부분 수정
//         decodedImageUrl = decodedImageUrl.replace(/https:\/\/laby-bucket\.s3\.ap-northeast-2\.amazonaws\.com\/https%3A\//, 'https://');
//         return { ...post, imageUrl: decodedImageUrl };
//       });
//       setPosts(formattedPosts);
  
//     } catch (error) {
//       console.error('Failed to fetch posts:', error);
//     }
//   };
//   useFocusEffect(
//     useCallback(() => {
//       fetchPosts();
//     }, [])
//   );


//   return (
//     <>
//       <Filter />
//       <SafeAreaView style={styles.container}>
//         <ScrollView style={styles.scrollView}>
//           <View style={styles.postContainer}>
//             {posts.map((post, index) => (
//               <View key={index} style={styles.postItem}>
//                  <ImageClickable postUrl={post.imageUrl} postInfo={post} />
//                 <Text style={styles.number}>{index + 1}</Text>
//               </View>
//             ))}
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// }

// export default Ranking;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF"
//   },
//   scrollView: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     paddingBottom: 10
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
//     marginHorizontal:3,
//     position: 'relative',
//   },
//   post: {
//     width: '100%',
//     height: 240,
//   },
//   number: {
//     position: 'absolute',
//     top: 10,
//     left: 10,
//     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//     borderRadius: 20,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//   }
// });

import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, ScrollView, Text, Image, View, StyleSheet } from 'react-native';
import ImageClickable from '../components/ImageClickable';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { MY_IP_ADDRESS } from '../config';

function Ranking() {
  const [posts, setPosts] = useState([]);

  // 배열 랜덤
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // 서버에서 게시물 데이터를 가져오는 함수
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/api/images/get`);
      const formattedPosts = response.data.map(post => {
        let decodedImageUrl = decodeURIComponent(post.imageUrl);
        decodedImageUrl = decodedImageUrl.replace(/https:\/\/laby-bucket\.s3\.ap-northeast-2\.amazonaws\.com\/https%3A\//, 'https://');
        return { ...post, imageUrl: decodedImageUrl };
      });
      setPosts(shuffleArray(formattedPosts)); // 셔플된 배열을 상태로 설정
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.postContainer}>
            {posts.map((post, index) => (
              <View key={index} style={styles.postItem}>
                <ImageClickable postUrl={post.imageUrl} postInfo={post} />
                <Text style={styles.number}>{index + 1}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingBottom: 10
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
    marginHorizontal: 2,
    position: 'relative',
  },
  number: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  }
});

export default Ranking;