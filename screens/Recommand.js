// import React from "react";
// import { useState, useEffect, useCallback } from "react";
// import Swiper from 'react-native-swiper';
// import { SafeAreaView, View, ScrollView, Text, Image, StyleSheet } from "react-native";
// import Filter from "../components/Filter/Filter";
// import ImageClickable from "../components/ImageClickable";
// import axios from "axios";
// import { useFocusEffect } from '@react-navigation/native';
// import { LOCAL, MY_IP_ADDRESS } from "../config";

// function Recommand() {
//   const [posts, setPosts] = useState([]);
//   const [filteredPosts, setFilteredPosts] = useState([]);
//   const [filters, setFilters] = useState({ gender: [], season: [], mood: [], height: { min: 140, max: 195 } });

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/api/images/get`);

//       const formattedPosts = response.data.map(post => {
//         let decodedImageUrl = decodeURIComponent(post.imageUrl);
//         decodedImageUrl = decodedImageUrl.replace(/https:\/\/laby-bucket\.s3\.ap-northeast-2\.amazonaws\.com\/https%3A\//, 'https://');
//         return { ...post, imageUrl: decodedImageUrl };
//       });
//       setPosts(formattedPosts);
//       setFilteredPosts(formattedPosts); // 초기 필터링 된 데이터 설정
//     } catch (error) {
//       console.error('Failed to fetch posts:', error);
//     }
//   };
//   useFocusEffect(
//     useCallback(() => {
//       fetchPosts();
//     }, [])
//   );

//   const handleFilterChange = (options) => {
//     setFilters(options);
//   };

//   useEffect(() => {
//     applyFilters(filters, posts);
//   }, [filters, posts]);

//   const applyFilters = (filters, posts) => {
//     let filtered = posts;

//     if (filters.gender.length > 0) {
//       filtered = filtered.filter(post => filters.gender.includes(post.gender));
//     }
//     if (filters.season.length > 0) {
//       filtered = filtered.filter(post => filters.season.includes(post.season));
//     }
//     if (filters.mood.length > 0) {
//       filtered = filtered.filter(post => filters.mood.includes(post.mood));
//     }
//     filtered = filtered.filter(post => post.creatorHeight >= filters.height.min && post.creatorHeight <= filters.height.max);

//     setFilteredPosts(filtered);
//   };

//   const bannerImages = [
    
//     require('../assets/1.png'),
//     require('../assets/2.png'),
//     require('../assets/3.png')
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.bannerContainer}>
//         <Swiper
//           autoplay={true}
//           autoplayTimeout={3}
//           loop={true}
//           showsPagination={false}
//         >
//           {bannerImages.map((image, index) => (
//             <View key={index} style={styles.slide}>
//               <Image
//                 source={image}
//                 resizeMode="cover"
//                 style={styles.bannerImage}
//               />
//             </View>
//           ))}
//         </Swiper>
//       </View>
//       <ScrollView style={styles.scrollView}>
//         <View style={styles.imageContainer}>
//           <View style={styles.imageTextContainer}>
//             <Image
//               source={{ uri: "https://images.onthelook.co.kr/pr/i6ZBVTnK5pRWCDQs8nQJ51.png?w=192&q=80&f=webp" }}
//               resizeMode="stretch"
//               style={styles.image}
//             />
//             <Text style={styles.imageText}>체형별</Text>
//           </View>
          
//           {/* <View style={styles.imageTextContainer}>
//             <Image
//               source={{ uri: "https://images.onthelook.co.kr/pr/wXCGfkpq4Vf25Ep9SMbK1c.png?w=192&q=80&f=webp" }}
//               resizeMode="stretch"
//               style={styles.image}
//             />
//             <Text style={styles.imageText}>아우터</Text>
//           </View>
//           <View style={styles.imageTextContainer}>
//             <Image
//               source={{ uri: "https://images.onthelook.co.kr/pr/vAbRr7jB3s5xG3aY6hEpTZ.png?w=192&q=80&f=webp" }}
//               resizeMode="stretch"
//               style={styles.image}
//             />
//             <Text style={styles.imageText}>상의</Text>
//           </View>
//           <View style={styles.imageTextContainer}>
//             <Image
//               source={{ uri: "https://images.onthelook.co.kr/pr/5Q4sfrTG785XVfq4dyMHrL.png?w=192&q=80&f=webp" }}
//               resizeMode="stretch"
//               style={styles.image}
//             />
//             <Text style={styles.imageText}>하의</Text>
//           </View> */}
//         </View>
//         <Filter onFilterChange={handleFilterChange} />
//         <View style={styles.postContainer}>
//           {filteredPosts.map((post, index) => (
//             <View key={index} style={styles.postItem}>
//               <ImageClickable postUrl={post.imageUrl} postInfo={post} />
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// export default Recommand;

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
//   bannerContainer: {
//     width: '100%',
//     height: 200,
//     marginBottom: 10,
//   },
//   bannerImage: {
//     width: '100%',
//     height: '100%',
//   },
//   imageContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginHorizontal: 35,
//   },
//   imageTextContainer: {
//     alignItems: "center",
//   },
//   image: {
//     borderRadius: 10,
//     width: 61,
//     height: 61,
//     borderWidth: 2,
//     backgroundColor: '#f5f5f5',
//     borderWidth: 0,
//     marginBottom: 10
//   },
//   imageText: {
//     color: "#656565",
//     fontSize: 15,
//     fontWeight: 'bold',
//     marginBottom: 5
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
//     marginHorizontal: 2,
//     position: 'relative',
//   },
//   post: {
//     width: '100%',
//     height: 240,
//   }
// });



// import React from "react";
// import { useState, useEffect, useCallback } from "react";
// import { SafeAreaView, View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
// import Swiper from 'react-native-swiper';
// import Filter from "../components/Filter/Filter";
// import ImageClickable from "../components/ImageClickable";
// import axios from "axios";
// import { useFocusEffect } from '@react-navigation/native';
// import { LOCAL, MY_IP_ADDRESS } from "../config";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// function Recommand() {
//   const [posts, setPosts] = useState([]);
//   const [filteredPosts, setFilteredPosts] = useState([]);
//   const [filters, setFilters] = useState({ gender: [], season: [], mood: [], height: { min: 140, max: 195 } });

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/api/images/get`);
//       const formattedPosts = response.data.map(post => {
//         let decodedImageUrl = decodeURIComponent(post.imageUrl);
//         decodedImageUrl = decodedImageUrl.replace(/https:\/\/laby-bucket\.s3\.ap-northeast-2\.amazonaws\.com\/https%3A\//, 'https://');
//         return { ...post, imageUrl: decodedImageUrl };
//       });
//       setPosts(formattedPosts);
//       setFilteredPosts(formattedPosts); // 초기 필터링 된 데이터 설정
//     } catch (error) {
//       console.error('Failed to fetch posts:', error);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchPosts();
//     }, [])
//   );

//   const handleFilterChange = (options) => {
//     setFilters(options);
//   };

//   useEffect(() => {
//     applyFilters(filters, posts);
//   }, [filters, posts]);

//   const applyFilters = (filters, posts) => {
//     let filtered = posts;
//     if (filters.gender.length > 0) {
//       filtered = filtered.filter(post => filters.gender.includes(post.gender));
//     }
//     if (filters.season.length > 0) {
//       filtered = filtered.filter(post => filters.season.includes(post.season));
//     }
//     if (filters.mood.length > 0) {
//       filtered = filtered.filter(post => filters.mood.includes(post.mood));
//     }
//     filtered = filtered.filter(post => post.creatorHeight >= filters.height.min && post.creatorHeight <= filters.height.max);
//     setFilteredPosts(filtered);
//   };

//   const handleFeatureClick = async () => {
//     try {
//       const userDataJson = await AsyncStorage.getItem('UserData');
//       if (userDataJson) {
//         const userData = JSON.parse(userDataJson);
//         const userId = userData.id;
//         console.log(userId);

//         const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/api/images/filterByUser/${userId}`);
//         const formattedPosts = response.data.map(post => {
//           let decodedImageUrl = decodeURIComponent(post.imageUrl);
//           decodedImageUrl = decodedImageUrl.replace(/https:\/\/laby-bucket\.s3\.ap-northeast-2\.amazonaws\.com\/https%3A\//, 'https://');
//           return { ...post, imageUrl: decodedImageUrl };
//         });
//         setFilteredPosts(formattedPosts); // 필터링 된 데이터로 상태 업데이트
//       } else {
//         console.error('No user data found in AsyncStorage');
//       }
//     } catch (error) {
//       console.error('Failed to fetch filtered posts:', error);
//     }
//   };

//   const bannerImages = [
//     require('../assets/1.png'),
//     require('../assets/2.png'),
//     require('../assets/3.png')
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.bannerContainer}>
//         <Swiper
//           autoplay={true}
//           autoplayTimeout={3}
//           loop={true}
//           showsPagination={false}
//         >
//           {bannerImages.map((image, index) => (
//             <View key={index} style={styles.slide}>
//               <Image
//                 source={image}
//                 resizeMode="cover"
//                 style={styles.bannerImage}
//               />
//             </View>
//           ))}
//         </Swiper>
//       </View>
//       <ScrollView style={styles.scrollView}>
//         <TouchableOpacity onPress={handleFeatureClick}>
//           <View style={styles.featureContainer}>
//             <View style={styles.imageTextWrapper}>
//               <View style={styles.imageTextContainer}>
//                 <Image
//                   source={{ uri: "https://images.onthelook.co.kr/pr/i6ZBVTnK5pRWCDQs8nQJ51.png?w=192&q=80&f=webp" }}
//                   resizeMode="stretch"
//                   style={styles.image}
//                 />
//                 <Text style={styles.imageText}>체형별</Text>
//               </View>
//             </View>
//             <Text style={styles.descriptionText}>당신의 체형에 맞는 LABY만의 자동필터링!</Text>
//           </View>
//         </TouchableOpacity>
//         <Filter onFilterChange={handleFilterChange} />
//         <View style={styles.postContainer}>
//           {filteredPosts.map((post, index) => (
//             <View key={index} style={styles.postItem}>
//               <ImageClickable postUrl={post.imageUrl} postInfo={post} />
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// export default Recommand;

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
//   bannerContainer: {
//     width: '100%',
//     height: 200,
//     marginBottom: 10,
//   },
//   bannerImage: {
//     width: '100%',
//     height: '100%',
//   },
//   featureContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginHorizontal: 20,
//     marginVertical: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     backgroundColor: '#f0f0f0'
//   },
//   imageTextWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   imageTextContainer: {
//     alignItems: "center", // 수직 방향으로 정렬
//   },
//   image: {
//     borderRadius: 10,
//     width: 61,
//     height: 61,
//     backgroundColor: '#f5f5f5',
//     marginBottom: 5 // 이미지와 텍스트 사이의 여백 추가
//   },
//   imageText: {
//     color: "#333",
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   descriptionText: {
//     flex: 1,
//     color: "#656565",
//     fontSize: 15,
//     fontWeight: 'bold',
//     marginLeft: 20, // 이미지 텍스트와 설명 텍스트 사이의 여백 추가
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
//     marginHorizontal: 2,
//     position: 'relative',
//   },
//   post: {
//     width: '100%',
//     height: 240,
//   }
// });

import React from "react";
import { useState, useEffect, useCallback } from "react";
import { SafeAreaView, View, ScrollView, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import Swiper from 'react-native-swiper';
import Filter from "../components/Filter/Filter";
import ImageClickable from "../components/ImageClickable";
import axios from "axios";
import { useFocusEffect } from '@react-navigation/native';
import { LOCAL, MY_IP_ADDRESS } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Recommand() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filters, setFilters] = useState({ gender: [], season: [], mood: [], height: { min: 140, max: 195 } });
  const [loading, setLoading] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/api/images/get`);
      const formattedPosts = response.data.map(post => {
        let decodedImageUrl = decodeURIComponent(post.imageUrl);
        decodedImageUrl = decodedImageUrl.replace(/https:\/\/laby-bucket\.s3\.ap-northeast-2\.amazonaws\.com\/https%3A\//, 'https://');
        return { ...post, imageUrl: decodedImageUrl };
      });
      setPosts(formattedPosts);
      setFilteredPosts(formattedPosts); // 초기 필터링 된 데이터 설정
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (posts.length === 0) { // 이미 데이터가 로드된 경우, 다시 로드하지 않음
        fetchPosts();
      }
    }, [posts])
  );

  const handleFilterChange = (options) => {
    setFilters(options);
  };

  useEffect(() => {
    applyFilters(filters, posts);
  }, [filters, posts]);

  const applyFilters = (filters, posts) => {
    let filtered = posts;
    if (filters.gender.length > 0) {
      filtered = filtered.filter(post => filters.gender.includes(post.gender));
    }
    if (filters.season.length > 0) {
      filtered = filtered.filter(post => filters.season.includes(post.season));
    }
    if (filters.mood.length > 0) {
      filtered = filtered.filter(post => filters.mood.includes(post.mood));
    }
    filtered = filtered.filter(post => post.creatorHeight >= filters.height.min && post.creatorHeight <= filters.height.max);
    setFilteredPosts(filtered);
  };

  const handleFeatureClick = async () => {
    if (isFiltered) {
      // If currently filtered, reset to original posts
      setFilteredPosts(posts);
      setIsFiltered(false);
    } else {
      // If not filtered, apply the filter
      try {
        setLoading(true);
        const userDataJson = await AsyncStorage.getItem('UserData');
        if (userDataJson) {
          const userData = JSON.parse(userDataJson);
          const userId = userData.id;
          console.log(userId);

          const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/api/images/filterByUser/${userId}`);
          const formattedPosts = response.data.map(post => {
            let decodedImageUrl = decodeURIComponent(post.imageUrl);
            decodedImageUrl = decodedImageUrl.replace(/https:\/\/laby-bucket\.s3\.ap-northeast-2\.amazonaws\.com\/https%3A\//, 'https://');
            return { ...post, imageUrl: decodedImageUrl };
          });
          setFilteredPosts(formattedPosts); // 필터링 된 데이터로 상태 업데이트
          setIsFiltered(true);
          setLoading(false);
        } else {
          console.error('No user data found in AsyncStorage');
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch filtered posts:', error);
        setLoading(false);
      }
    }
  };

  const bannerImages = [
    require('../assets/1.png'),
    require('../assets/2.png'),
    require('../assets/3.png')
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bannerContainer}>
        <Swiper
          autoplay={true}
          autoplayTimeout={3}
          loop={true}
          showsPagination={false}
        >
          {bannerImages.map((image, index) => (
            <View key={index} style={styles.slide}>
              <Image
                source={image}
                resizeMode="cover"
                style={styles.bannerImage}
              />
            </View>
          ))}
        </Swiper>
      </View>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity onPress={handleFeatureClick}>
          <View style={styles.featureContainer}>
            <View style={styles.imageTextWrapper}>
              <View style={styles.imageTextContainer}>
                <Image
                  source={{ uri: "https://images.onthelook.co.kr/pr/i6ZBVTnK5pRWCDQs8nQJ51.png?w=192&q=80&f=webp" }}
                  resizeMode="stretch"
                  style={styles.image}
                />
                <Text style={styles.imageText}>체형별</Text>
              </View>
            </View>
            <Text style={styles.descriptionText}>당신의 체형에 맞는 LABY만의 자동필터링!</Text>
          </View>
        </TouchableOpacity>
        <Filter onFilterChange={handleFilterChange} />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={styles.postContainer}>
            {filteredPosts.map((post, index) => (
              <View key={index} style={styles.postItem}>
                <ImageClickable postUrl={post.imageUrl} postInfo={post} />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Recommand;

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
  bannerContainer: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  featureContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#f0f0f0'
  },
  imageTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageTextContainer: {
    alignItems: "center", // 수직 방향으로 정렬
  },
  image: {
    borderRadius: 10,
    width: 61,
    height: 61,
    backgroundColor: '#f5f5f5',
    marginBottom: 5 // 이미지와 텍스트 사이의 여백 추가
  },
  imageText: {
    color: "#333",
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionText: {
    flex: 1,
    color: "#656565",
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 20, // 이미지 텍스트와 설명 텍스트 사이의 여백 추가
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
  post: {
    width: '100%',
    height: 240,
  }
});
