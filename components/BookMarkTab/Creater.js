import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { MY_IP_ADDRESS } from '../../config';

const windowWidth = Dimensions.get('window').width;
const imageWidth = (windowWidth - 30) / 2;

function Creater() {
  const [posts, setPosts] = useState([]);
  const [followCreators, setFollowCreators] = useState([]);

  const fetchPosts = async () => {
    const userEmail = await AsyncStorage.getItem('email');
    try {
      const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/laby/api/v1/users/${userEmail}/following`);
      console.log('Fetched posts:', response.data);
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const fetchFollowCreators = async () => {
    try {
      const storedCreators = await AsyncStorage.getItem('followCreators');
      if (storedCreators) {
        setFollowCreators(JSON.parse(storedCreators));
        console.log("로컬 팔로잉", storedCreators);
      }
    } catch (error) {
      console.error('Failed to fetch follow creators:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
      fetchFollowCreators();
    }, [])
  );

  const renderItem = ({ item }) => {
    const creatorImage = followCreators.find(creator => creator.creatorName === item.nickname)?.creatorImage;
  
    return (
      <View style={styles.card}>
        <View style={styles.itemContainer}>
        <Image
          source={{ uri: item.profileImageUrl ? item.profileImageUrl : 'https://i.namu.wiki/i/shlrpQDvlqdGXhFEhsY9VJOX6CU6A9ZxVv0TDAxLAUjhxoAkvQDBdfS6qhjUpQo5D94X1YPhMQRp-_F0GgQRHjK9hma6I_f2SHklZ7ZOa6OO9Oxtsg9JdGajbqImDawbQZj-H5fS9QFV3JM3I3BCRA.webp' }}
          style={styles.profileImage}
        />
          <View style={styles.textContainer}>
            <Text style={styles.username}>{item.nickname} <Ionicons name="checkmark-circle" size={12} color="#378aff" /></Text>
            <Text style={styles.infoText}>키: {item.height}cm  몸무게: {item.weight}kg</Text>
            <Text style={styles.infoText}>{item.email}</Text>
          </View>
        </View>
      </View>
    );
  };  

  return (
    <View style={styles.container}>
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.nocontainer}>
          <Ionicons name="search" size={30} color={'lightgray'} />
          <Text style={styles.noText}>팔로우하는 사용자가 없어요.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  nocontainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: "center",
    paddingTop: 200
  },
  listContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 30,
  },
  textContainer: {
    flex: 1,
  },
  username: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    paddingVertical: 2,
  },
  fullName: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    paddingVertical: 2,
  },
  infoText: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
    paddingVertical: 2
  },
  noText: {
    color: "gray",
    marginTop: 10
  },
});

export default Creater;