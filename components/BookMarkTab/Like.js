import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions,TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState,useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
const windowWidth = Dimensions.get('window').width;
const imageWidth = (windowWidth - 30) / 2; // 한 줄에 두 개의 이미지가 있으므로 가로 여백을 제외하고 20을 더해서 나누어 줍니다.



function Like() {
  const [likedPosts, setLikedPosts] = useState([]);
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      const loadLikedPosts = async () => {
        const likerEmail = await AsyncStorage.getItem('email'); // 사용자 이메일 불러오기
        const key = `likedPosts-${likerEmail}`; // 사용자별 키 생성
        const posts = await AsyncStorage.getItem(key);
        setLikedPosts(posts ? JSON.parse(posts) : []);
      };

      loadLikedPosts();
    }, [])
  );

  // const renderItem = ({ item }) => (
  //   <View style={styles.item}>
  //     <Image
  //       style={styles.image}
  //       source={{ uri: item.imageUri}} 
  //       resizeMode="cover"
  //     />
  //   </View>
  // );

  // return (
  //   <FlatList
  //     data={likedPosts}
  //     renderItem={renderItem}
  //     keyExtractor={item => item.id.toString()}
  //     numColumns={2} // 한 줄에 두 개의 사진을 표시
  //     contentContainerStyle={styles.container}
  //   />
  // );
  const handleImageClick = (postInfo) => {
    navigation.navigate('Post', { creatorInfo: postInfo });
    console.log(postInfo);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleImageClick(item)}>
      <View style={styles.item}>
        <Image
          style={styles.image}
          source={{ uri: item.imageUri }}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.maincontainer}>
      <FlatList
        data={likedPosts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.container}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    padding: 5, // 이미지 간의 간격을 조절합니다.
  },
  item: {
    width: imageWidth,
    height: imageWidth, // 이미지를 정사각형으로 표시하기 위해 높이도 설정합니다.
    margin: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%', // 이미지가 정사각형으로 표시되도록 높이를 100%로 설정합니다.
  },
});

export default Like;
