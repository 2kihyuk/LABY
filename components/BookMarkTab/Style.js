import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { MY_IP_ADDRESS } from '../../config';
import ImageClickable from '../ImageClickable';
import AsyncStorage from '@react-native-async-storage/async-storage';
//북마크쪽.

const windowWidth = Dimensions.get('window').width;
const imageWidth = (windowWidth - 30) / 2; // 한 줄에 두 개의 이미지가 있으므로 가로 여백을 제외하고 20을 더해서 나누어 줍니다.


function Style() {

    const [posts, setPosts] = useState([]);
    const navigation = useNavigation();
    const fetchPosts = async () => {
      try {
          const userEmail = await AsyncStorage.getItem('email');
          if (!userEmail) {
              console.error('User email is null');
              return;
          }

          const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/api/bookmarks/user/${userEmail}`);
          setPosts(response.data);
      } catch (error) {
          console.error('Failed to fetch posts:', error);
      }
  };

  useFocusEffect(
      useCallback(() => {
          fetchPosts();
      }, [])
  );

    // 각 컴포넌트 클릭시 해당 피드 페이지로 이동까지 완료. 각 컴포넌트에 데이터를 추가하여 , FeedPage에서 해당 데이터를 가지고 화면을 렌더링. 백엔드 구축이후 바로 해야함.
    const renderItem = ({ item }) => (
      <View style={styles.item}>
        <ImageClickable postUrl={item.imageUrl} postInfo={item} />
      </View>
    );

    return (
      <View style={styles.maincontainer}>
        <FlatList
          data={posts}
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
    width: '48%',
    marginBottom: 3,
    marginHorizontal: 3,
    position: 'relative',
  },
});

export default Style;

