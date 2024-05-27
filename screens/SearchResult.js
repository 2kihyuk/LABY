// import { React, useState } from 'react';
// import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
// import { creators } from '../components/List/CreaterList';
// import { Ionicons } from "@expo/vector-icons";
// import ImageClickable from '../components/ImageClickable';
// import Filter from "../components/Filter/Filter";
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import axios from 'axios';

// const Tab = createMaterialTopTabNavigator();

// function SearchResultTab({ searchData, filterFunction, renderItem, numColumns }) {

//   const dataToShow = creators.filter(item => filterFunction(item, searchData));

//   if (dataToShow.length === 0) {
//     return (
//       <View style={styles.container}>
//         <Ionicons name="search" size={30} color={'lightgray'} />
//         <Text style={styles.noText}>검색결과가 없어요.</Text>
//       </View>
//     );
//   }

//   if (numColumns === 1) {
//     return (
//       <View style={styles.filterContainer}>
//         <FlatList
//           data={dataToShow}
//           renderItem={renderItem}
//           keyExtractor={item => item.name}
//           contentContainerStyle={styles.flatListContainer}
//           numColumns={1}
//         />
//       </View>
//     );
//   } else {
//     return (
//       <View style={styles.filterContainer}>
//         <FlatList
//           data={dataToShow}
//           renderItem={renderItem}
//           keyExtractor={item => item.name}
//           style={styles.flatListContainer}
//           numColumns={2}
//           ListHeaderComponent={<Filter />}
//         />
//       </View>
//     );
//   }
// }

// function StyleTab({ searchData }) {
//   const filterFunction = item => {
//     const { styleTag } = item;
//     return styleTag && Object.values(styleTag).includes(searchData);
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.item}>
//       <ImageClickable postUrl={item.post} />
//     </View>
//   );

//   return <SearchResultTab searchData={searchData} filterFunction={filterFunction} renderItem={renderItem} numColumns={2} />;
// }

// function BrandTab({ searchData }) {
//   const filterFunction = item => {
//     const { tag } = item;

//     return tag.brand.toLowerCase().includes(searchData.toLowerCase());
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.item}>
//       <ImageClickable postUrl={item.post} />
//       <Text style={styles.brand}>{item.tag.brand}</Text>
//       <Text style={styles.pdName}>{item.tag.productName}</Text>
//       <Text style={styles.price}>₩{item.tag.price}</Text>
//     </View>
//   );

//   return <SearchResultTab searchData={searchData} filterFunction={filterFunction} renderItem={renderItem} numColumns={2} />;
// }

// function ItemTab({ searchData }) {
//   const filterFunction = item => {
//     const { tag } = item;
//     return Object.values(tag).some(value => {
//       if (typeof value === 'string') {
//         return value.toLowerCase().includes(searchData.toLowerCase());
//       }
//     });
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.item}>
//       <ImageClickable postUrl={item.post} />
//       <Text style={styles.brand}>{item.tag.brand}</Text>
//       <Text style={styles.pdName}>{item.tag.productName}</Text>
//       <Text style={styles.price}>₩{item.tag.price}</Text>
//     </View>
//   );

//   return <SearchResultTab searchData={searchData} filterFunction={filterFunction} renderItem={renderItem} numColumns={2} />;
// }

// function CreatorTab({ searchData }) {
//   const filterFunction = item => {
//     return Object.values(item).some(value => {
//       if (typeof value === 'string') {
//         return value.toLowerCase().includes(searchData.toLowerCase());
//       }
//     });
//   };

//   // 각 크리에이터의 팔로우 상태를 관리할 객체 생성
//   const [followState, setFollowState] = useState({});

//   // 팔로우 버튼 클릭 시 해당 크리에이터의 팔로우 상태를 토글하는 함수
//   const handleFollowClick = (id) => {
//     setFollowState(prevState => ({
//       ...prevState,
//       [id]: !prevState[id]
//     }));
//   };

//   const renderItem = ({ item }) => {
//     // 각 크리에이터의 id를 기반으로 팔로우 상태 확인
//     const isFollowing = followState[item.id] || false;

//     return (
//       <View style={styles.creatorContainer}>
//         <Image
//           source={{ uri: item.image }}
//           resizeMode="stretch"
//           style={styles.creatorImage}
//         />
//         <View style={styles.creatorInfo}>
//           <Text style={styles.creatorName}>{item.name}</Text>
//         </View>
//         <TouchableOpacity style={styles.follow} onPress={() => handleFollowClick(item.id)}>
//           <Text style={styles.followText}>{isFollowing ? '팔로잉' : '팔로우'}</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   return <SearchResultTab searchData={searchData} filterFunction={filterFunction} renderItem={renderItem} numColumns={1} />;
// }

// function SearchResult({ route }) {
//   const { searchData } = route.params;

//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Style">
//         {() => <StyleTab searchData={searchData} />}
//       </Tab.Screen>
//       <Tab.Screen name="Brand">
//         {() => <BrandTab searchData={searchData} />}
//       </Tab.Screen>
//       <Tab.Screen name="Item">
//         {() => <ItemTab searchData={searchData} />}
//       </Tab.Screen>
//       <Tab.Screen name="Creator">
//         {() => <CreatorTab searchData={searchData} />}
//       </Tab.Screen>
//     </Tab.Navigator>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     alignItems: "center",
//     paddingTop: 200
//   },
//   filterContainer: {
//     flex: 1,
//     backgroundColor: 'white'
//   },
//   noText: {
//     color: "gray",
//     marginTop: 10
//   },
//   flatListContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//     marginTop: 10
//   },
//   item: {
//     flex: 1,
//     backgroundColor: 'white',
//     marginVertical: 5,
//     marginHorizontal: 5,
//     borderRadius: 5,
//     minWidth: '45%',
//   },
//   creatorContainer: {
//     marginTop: 10,
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   creatorInfo: {
//     marginLeft: 10,
//   },
//   creatorImage: {
//     marginLeft: 25,
//     marginBottom: 10,
//     borderRadius: 50,
//     width: 52,
//     height: 52,
//   },
//   creatorName: {
//     fontSize: 16,
//     fontWeight: 'bold'
//   },
//   follow: {
//     height: 30,
//     borderRadius: 10,
//     paddingHorizontal: 17,
//     backgroundColor: '#378aff',
//     justifyContent: 'center',
//     alignSelf: 'center',
//     position: 'absolute',
//     right: 22,
//     top: '50%',
//     transform: [{ translateY: -17 }],
//   },
//   followText: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontSize: 15
//   },
//   brand: {
//     marginHorizontal: 10,
//     marginVertical: 3,
//     marginTop: 10,
//     fontWeight: 'bold',
//     fontSize: 17
//   },
//   pdName: {
//     marginHorizontal: 10,
//     marginVertical: 3
//   },
//   price: {
//     fontWeight: 'bold',
//     marginHorizontal: 10,
//     marginVertical: 3
//   }
// });

// export default SearchResult;

// import React, { useState, useCallback } from 'react';
// import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import { Ionicons } from "@expo/vector-icons";
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import { MY_IP_ADDRESS } from '../config';
// import ImageClickable from '../components/ImageClickable';
// import Filter from "../components/Filter/Filter";

// const Tab = createMaterialTopTabNavigator();

// function SearchResultTab({ data, renderItem, numColumns }) {
//   if (data.length === 0) {
//     return (
//       <View style={styles.container}>
//         <Ionicons name="search" size={30} color={'lightgray'} />
//         <Text style={styles.noText}>검색결과가 없어요.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.filterContainer}>
//       <FlatList
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={item => item.id.toString()}
//         style={styles.flatListContainer}
//         numColumns={numColumns}
//         ListHeaderComponent={numColumns === 2 ? <Filter /> : null}
//       />
//     </View>
//   );
// }

// function StyleTab({ data }) {
//   const navigation = useNavigation();

//   const renderItem = ({ item }) => (
//     <TouchableOpacity onPress={() => navigation.navigate('Post', { creatorInfo: item })}>
//       <View style={styles.item}>
//         <ImageClickable postUrl={item.imageUrl} />
//       </View>
//     </TouchableOpacity>
//   );

//   return <SearchResultTab data={data} renderItem={renderItem} numColumns={2} />;
// }

// function BrandTab({ data }) {
//   const navigation = useNavigation();

//   const renderItem = ({ item }) => {
//     const tags = item.lookTags ? JSON.parse(item.lookTags) : [];
//     return (
//       <TouchableOpacity onPress={() => navigation.navigate('Post', { creatorInfo: item })}>
//         <View style={styles.item}>
//           <ImageClickable postUrl={item.imageUrl} />
//           {tags.length > 0 && (
//             <>
//               <Text style={styles.brand}>{tags[0].brand}</Text>
//               <Text style={styles.pdName}>{tags[0].productName}</Text>
//               <Text style={styles.price}>₩{tags[0].price}</Text>
//             </>
//           )}
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return <SearchResultTab data={data} renderItem={renderItem} numColumns={2} />;
// }

// function ItemTab({ data }) {
//   const navigation = useNavigation();

//   const renderItem = ({ item }) => {
//     const tags = item.lookTags ? JSON.parse(item.lookTags) : [];
//     return (
//       <TouchableOpacity onPress={() => navigation.navigate('Post', { creatorInfo: item })}>
//         <View style={styles.item}>
//           <ImageClickable postUrl={item.imageUrl} />
//           {tags.length > 0 && (
//             <>
//               <Text style={styles.brand}>{tags[0].brand}</Text>
//               <Text style={styles.pdName}>{tags[0].productName}</Text>
//               <Text style={styles.price}>₩{tags[0].price}</Text>
//             </>
//           )}
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return <SearchResultTab data={data} renderItem={renderItem} numColumns={2} />;
// }

// function CreatorTab({ data }) {
//   const [followState, setFollowState] = useState({});
//   const navigation = useNavigation();

//   const handleFollowClick = (id) => {
//     setFollowState(prevState => ({
//       ...prevState,
//       [id]: !prevState[id]
//     }));
//   };

//   const renderItem = ({ item }) => {
//     const isFollowing = followState[item.id] || false;

//     return (
//       <TouchableOpacity onPress={() => navigation.navigate('Post', { creatorInfo: item })}>
//         <View style={styles.creatorContainer}>
//           <Image source={{ uri: item.creatorImage }} style={styles.creatorImage} />
//           <View style={styles.creatorInfo}>
//             <Text style={styles.creatorName}>{item.creatorName}</Text>
//           </View>
//           <TouchableOpacity style={styles.follow} onPress={() => handleFollowClick(item.id)}>
//             <Text style={styles.followText}>{isFollowing ? '팔로잉' : '팔로우'}</Text>
//           </TouchableOpacity>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return <SearchResultTab data={data} renderItem={renderItem} numColumns={1} />;
// }

// function SearchResult({ route }) {
//   const { searchData } = route.params;
//   const [posts, setPosts] = useState([]);
//   const [filteredPosts, setFilteredPosts] = useState([]);

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/api/images/get`);
//       const formattedPosts = response.data.map(post => {
//         let decodedImageUrl = decodeURIComponent(post.imageUrl);
//         decodedImageUrl = decodedImageUrl.replace(/https:\/\/laby-bucket\.s3\.ap-northeast-2\.amazonaws\.com\/https%3A\//, 'https://');
//         return { ...post, imageUrl: decodedImageUrl };
//       });
//       setPosts(formattedPosts);
//       filterPosts(formattedPosts, searchData);
//     } catch (error) {
//       console.error('Failed to fetch posts:', error);
//     }
//   };

//   const filterPosts = (posts, searchData) => {
//     const lowercasedSearchData = searchData.toLowerCase();
//     const filtered = posts.filter(post => {
//       const { category, lookTags, creatorName, mood, season, text } = post;

//       let lookTagsMatch = false;
//       try {
//         const tags = lookTags ? JSON.parse(lookTags) : [];
//         lookTagsMatch = tags.some(tag => {
//           return (
//             tag.brand.toLowerCase().includes(lowercasedSearchData) ||
//             tag.productName.toLowerCase().includes(lowercasedSearchData)
//           );
//         });
//       } catch (error) {
//         console.error('Failed to parse lookTags:', error);
//       }

//       return (
//         (category && category.toLowerCase().includes(lowercasedSearchData)) ||
//         lookTagsMatch ||
//         (creatorName && creatorName.toLowerCase().includes(lowercasedSearchData)) ||
//         (mood && mood.toLowerCase().includes(lowercasedSearchData)) ||
//         (season && season.toLowerCase().includes(lowercasedSearchData)) ||
//         (text && text.toLowerCase().includes(lowercasedSearchData))
//       );
//     });

//     setFilteredPosts(filtered);
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchPosts();
//     }, [])
//   );

//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Style">
//         {() => <StyleTab data={filteredPosts} />}
//       </Tab.Screen>
//       <Tab.Screen name="Brand">
//         {() => <BrandTab data={filteredPosts} />}
//       </Tab.Screen>
//       <Tab.Screen name="Item">
//         {() => <ItemTab data={filteredPosts} />}
//       </Tab.Screen>
//       <Tab.Screen name="Creator">
//         {() => <CreatorTab data={filteredPosts} />}
//       </Tab.Screen>
//     </Tab.Navigator>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     alignItems: "center",
//     paddingTop: 200
//   },
//   filterContainer: {
//     flex: 1,
//     backgroundColor: 'white'
//   },
//   noText: {
//     color: "gray",
//     marginTop: 10
//   },
//   flatListContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//     marginTop: 10
//   },
//   item: {
//     flex: 1,
//     backgroundColor: 'white',
//     marginVertical: 5,
//     marginHorizontal: 5,
//     borderRadius: 5,
//     minWidth: '45%',
//   },
//   creatorContainer: {
//     marginTop: 10,
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   creatorInfo: {
//     marginLeft: 10,
//   },
//   creatorImage: {
//     marginLeft: 25,
//     marginBottom: 10,
//     borderRadius: 50,
//     width: 52,
//     height: 52,
//   },
//   creatorName: {
//     fontSize: 16,
//     fontWeight: 'bold'
//   },
//   follow: {
//     height: 30,
//     borderRadius: 10,
//     paddingHorizontal: 17,
//     backgroundColor: '#378aff',
//     justifyContent: 'center',
//     alignSelf: 'center',
//     position: 'absolute',
//     right: 22,
//     top: '50%',
//     transform: [{ translateY: -17 }],
//   },
//   followText: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontSize: 15
//   },
//   brand: {
//     marginHorizontal: 10,
//     marginVertical: 3,
//     marginTop: 10,
//     fontWeight: 'bold',
//     fontSize: 17
//   },
//   pdName: {
//     marginHorizontal: 10,
//     marginVertical: 3
//   },
//   price: {
//     fontWeight: 'bold',
//     marginHorizontal: 10,
//     marginVertical: 3
//   }
// });

// export default SearchResult;


// import React, { useState, useCallback, useEffect } from 'react';
// import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import { Ionicons } from "@expo/vector-icons";
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import { MY_IP_ADDRESS } from '../config';
// import ImageClickable from '../components/ImageClickable';
// import Filter from "../components/Filter/Filter";

// const Tab = createMaterialTopTabNavigator();

// function SearchResultTab({ data, renderItem, numColumns }) {
//   if (data.length === 0) {
//     return (
//       <View style={styles.container}>
//         <Ionicons name="search" size={30} color={'lightgray'} />
//         <Text style={styles.noText}>검색결과가 없어요.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.filterContainer}>
//       <FlatList
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={item => item.id.toString()}
//         style={styles.flatListContainer}
//         numColumns={numColumns}
//         ListHeaderComponent={numColumns === 2 ? <Filter /> : null}
//       />
//     </View>
//   );
// }

// function StyleTab({ data }) {
//   const navigation = useNavigation();

//   const renderItem = ({ item }) => (
//     <TouchableOpacity onPress={() => navigation.navigate('Post', { creatorInfo: item })}>
//       <View style={styles.item}>
//         <ImageClickable postUrl={item.imageUrl} postInfo={item}/>
//       </View>
//     </TouchableOpacity>
//   );

//   return <SearchResultTab data={data} renderItem={renderItem} numColumns={2} />;
// }

// function BrandTab({ data }) {
//   const navigation = useNavigation();

//   const renderItem = ({ item }) => {
//     const tags = item.lookTags ? JSON.parse(item.lookTags) : [];
//     return (
//       <TouchableOpacity onPress={() => navigation.navigate('Post', { creatorInfo: item })}>
//         <View style={styles.item}>
//           <ImageClickable postUrl={item.imageUrl} postInfo={item}/>
//           {tags.length > 0 && (
//             <>
//               <Text style={styles.brand}>{tags[0].brand}</Text>
//               <Text style={styles.pdName}>{tags[0].productName}</Text>
//               <Text style={styles.price}>₩{tags[0].price}</Text>
//             </>
//           )}
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return <SearchResultTab data={data} renderItem={renderItem} numColumns={2} />;
// }

// function ItemTab({ data }) {
//   const navigation = useNavigation();

//   const renderItem = ({ item }) => {
//     const tags = item.lookTags ? JSON.parse(item.lookTags) : [];
//     return (
//       <TouchableOpacity onPress={() => navigation.navigate('Post', { creatorInfo: item })}>
//         <View style={styles.item}>
//           <ImageClickable postUrl={item.imageUrl} postInfo={item}/>
//           {tags.length > 0 && (
//             <>
//               <Text style={styles.brand}>{tags[0].brand}</Text>
//               <Text style={styles.pdName}>{tags[0].productName}</Text>
//               <Text style={styles.price}>₩{tags[0].price}</Text>
//             </>
//           )}
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return <SearchResultTab data={data} renderItem={renderItem} numColumns={2} />;
// }

// function CreatorTab({ data }) {
//   const [followState, setFollowState] = useState({});
//   const navigation = useNavigation();

//   const handleFollowClick = (id) => {
//     setFollowState(prevState => ({
//       ...prevState,
//       [id]: !prevState[id]
//     }));
//   };

//   const renderItem = ({ item }) => {
//     const isFollowing = followState[item.id] || false;

//     return (
//       <TouchableOpacity onPress={() => navigation.navigate('Post', { creatorInfo: item })}>
//         <View style={styles.creatorContainer}>
//           <Image source={{ uri: item.creatorImage }} style={styles.creatorImage} />
//           <View style={styles.creatorInfo}>
//             <Text style={styles.creatorName}>{item.creatorName}</Text>
//           </View>
//           <TouchableOpacity style={styles.follow} onPress={() => handleFollowClick(item.id)}>
//             <Text style={styles.followText}>{isFollowing ? '팔로잉' : '팔로우'}</Text>
//           </TouchableOpacity>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return <SearchResultTab data={data} renderItem={renderItem} numColumns={1} />;
// }

// function SearchResult({ route }) {
//   const { searchData } = route.params;
//   const [posts, setPosts] = useState([]);
//   const [filteredPosts, setFilteredPosts] = useState([]);

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/api/images/get`);
//       const formattedPosts = response.data.map(post => {
//         let decodedImageUrl = decodeURIComponent(post.imageUrl);
//         decodedImageUrl = decodedImageUrl.replace(/https:\/\/laby-bucket\.s3\.ap-northeast-2\.amazonaws\.com\/https%3A\//, 'https://');
//         return { ...post, imageUrl: decodedImageUrl };
//       });
//       setPosts(formattedPosts);
//       filterPosts(formattedPosts, searchData);
//     } catch (error) {
//       console.error('Failed to fetch posts:', error);
//     }
//   };

//   const filterPosts = (posts, searchData) => {
//     const lowercasedSearchData = searchData.toLowerCase();
//     const filtered = posts.filter(post => {
//       const { category, lookTags, creatorName, mood, season, text } = post;

//       let lookTagsMatch = false;
//       try {
//         const tags = lookTags ? JSON.parse(lookTags) : [];
//         lookTagsMatch = tags.some(tag => {
//           return (
//             tag.brand.toLowerCase().includes(lowercasedSearchData) ||
//             tag.productName.toLowerCase().includes(lowercasedSearchData)
//           );
//         });
//       } catch (error) {
//         console.error('Failed to parse lookTags:', error);
//       }

//       return (
//         (category && category.toLowerCase().includes(lowercasedSearchData)) ||
//         lookTagsMatch ||
//         (creatorName && creatorName.toLowerCase().includes(lowercasedSearchData)) ||
//         (mood && mood.toLowerCase().includes(lowercasedSearchData)) ||
//         (season && season.toLowerCase().includes(lowercasedSearchData)) ||
//         (text && text.toLowerCase().includes(lowercasedSearchData))
//       );
//     });

//     setFilteredPosts(filtered);
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchPosts();
//     }, [])
//   );

//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Style">
//         {() => <StyleTab data={filteredPosts} />}
//       </Tab.Screen>
//       <Tab.Screen name="Brand">
//         {() => <BrandTab data={filteredPosts} />}
//       </Tab.Screen>
//       <Tab.Screen name="Item">
//         {() => <ItemTab data={filteredPosts} />}
//       </Tab.Screen>
//       <Tab.Screen name="Creator">
//         {() => <CreatorTab data={filteredPosts} />}
//       </Tab.Screen>
//     </Tab.Navigator>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     alignItems: "center",
//     paddingTop: 200
//   },
//   filterContainer: {
//     flex: 1,
//     backgroundColor: 'white'
//   },
//   noText: {
//     color: "gray",
//     marginTop: 10
//   },
//   flatListContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//     marginTop: 10
//   },
//   item: {
//     flex: 1,
//     backgroundColor: 'white',
//     marginVertical: 5,
//     marginHorizontal: 5,
//     borderRadius: 5,
//     minWidth: '45%',
//   },
//   creatorContainer: {
//     marginTop: 10,
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   creatorInfo: {
//     marginLeft: 10,
//   },
//   creatorImage: {
//     marginLeft: 25,
//     marginBottom: 10,
//     borderRadius: 50,
//     width: 52,
//     height: 52,
//   },
//   creatorName: {
//     fontSize: 16,
//     fontWeight: 'bold'
//   },
//   follow: {
//     height: 30,
//     borderRadius: 10,
//     paddingHorizontal: 17,
//     backgroundColor: '#378aff',
//     justifyContent: 'center',
//     alignSelf: 'center',
//     position: 'absolute',
//     right: 22,
//     top: '50%',
//     transform: [{ translateY: -17 }],
//   },
//   followText: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontSize: 15
//   },
//   brand: {
//     marginHorizontal: 10,
//     marginVertical: 3,
//     marginTop: 10,
//     fontWeight: 'bold',
//     fontSize: 17
//   },
//   pdName: {
//     marginHorizontal: 10,
//     marginVertical: 3
//   },
//   price: {
//     fontWeight: 'bold',
//     marginHorizontal: 10,
//     marginVertical: 3
//   }
// });

// export default SearchResult;


import React, { useState, useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { MY_IP_ADDRESS } from '../config';
import ImageClickable from '../components/ImageClickable';

const Tab = createMaterialTopTabNavigator();

function SearchResultTab({ data, renderItem, numColumns }) {
  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Ionicons name="search" size={30} color={'lightgray'} />
        <Text style={styles.noText}>검색결과가 없어요.</Text>
      </View>
    );
  }

  return (
    <View style={styles.filterContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.flatListContainer}
        numColumns={numColumns}
      />
    </View>
  );
}

function StyleTab({ data }) {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Post', { creatorInfo: item })}>
      <View style={styles.item}>
        <ImageClickable postUrl={item.imageUrl} postInfo={item} />
      </View>
    </TouchableOpacity>
  );

  return <SearchResultTab data={data} renderItem={renderItem} numColumns={2} />;
}

function BrandTab({ data }) {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    const tags = item.lookTags ? JSON.parse(item.lookTags) : [];
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Post', { creatorInfo: item })}>
        <View style={styles.item}>
          <ImageClickable postUrl={item.imageUrl} postInfo={item} />
          {tags.length > 0 && (
            <>
              <Text style={styles.brand}>{tags[0].brand}</Text>
              <Text style={styles.pdName}>{tags[0].productName}</Text>
              <Text style={styles.price}>₩{tags[0].price}</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return <SearchResultTab data={data} renderItem={renderItem} numColumns={2} />;
}

function ItemTab({ data }) {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    const tags = item.lookTags ? JSON.parse(item.lookTags) : [];
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Post', { creatorInfo: item })}>
        <View style={styles.item}>
          <ImageClickable postUrl={item.imageUrl} postInfo={item} />
          {tags.length > 0 && (
            <>
              <Text style={styles.brand}>{tags[0].brand}</Text>
              <Text style={styles.pdName}>{tags[0].productName}</Text>
              <Text style={styles.price}>₩{tags[0].price}</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return <SearchResultTab data={data} renderItem={renderItem} numColumns={2} />;
}

function SearchResult({ route }) {
  const { searchData } = route.params;
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/api/images/get`);
      const formattedPosts = response.data.map(post => {
        let decodedImageUrl = decodeURIComponent(post.imageUrl);
        decodedImageUrl = decodedImageUrl.replace(/https:\/\/laby-bucket\.s3\.ap-northeast-2\.amazonaws\.com\/https%3A\//, 'https://');
        return { ...post, imageUrl: decodedImageUrl };
      });
      setPosts(formattedPosts);
      filterPosts(formattedPosts, searchData);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const filterPosts = (posts, searchData) => {
    const lowercasedSearchData = searchData.toLowerCase();
    const filtered = posts.filter(post => {
      const { category, lookTags, creatorName, mood, season, text } = post;

      let lookTagsMatch = false;
      try {
        const tags = lookTags ? JSON.parse(lookTags) : [];
        lookTagsMatch = tags.some(tag => {
          return (
            tag.brand.toLowerCase().includes(lowercasedSearchData) ||
            tag.productName.toLowerCase().includes(lowercasedSearchData)
          );
        });
      } catch (error) {
        console.error('Failed to parse lookTags:', error);
      }

      return (
        (category && category.toLowerCase().includes(lowercasedSearchData)) ||
        lookTagsMatch ||
        (creatorName && creatorName.toLowerCase().includes(lowercasedSearchData)) ||
        (mood && mood.toLowerCase().includes(lowercasedSearchData)) ||
        (season && season.toLowerCase().includes(lowercasedSearchData)) ||
        (text && text.toLowerCase().includes(lowercasedSearchData))
      );
    });

    setFilteredPosts(filtered);
  };

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  return (
    <Tab.Navigator>
      <Tab.Screen name="Style">
        {() => <StyleTab data={filteredPosts} />}
      </Tab.Screen>
      <Tab.Screen name="Brand">
        {() => <BrandTab data={filteredPosts} />}
      </Tab.Screen>
      <Tab.Screen name="Item">
        {() => <ItemTab data={filteredPosts} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: "center",
    paddingTop: 200
  },
  filterContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  noText: {
    color: "gray",
    marginTop: 10
  },
  flatListContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 10
  },
  item: {
    flex: 1,
    backgroundColor: 'white',
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 5,
    minWidth: '45%',
  },
  brand: {
    marginHorizontal: 10,
    marginVertical: 3,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 17
  },
  pdName: {
    marginHorizontal: 10,
    marginVertical: 3
  },
  price: {
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginVertical: 3
  }
});

export default SearchResult;
