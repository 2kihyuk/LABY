

import { View, Text, FlatList, Image, StyleSheet, Dimensions ,TouchableOpacity  } from 'react-native';
import axios from 'axios';
import { useState,useCallback,useEffect ,} from 'react';
import { useFocusEffect,useNavigation } from '@react-navigation/native';
import ImageClickable from '../components/ImageClickable';
import { LOCAL, MY_IP_ADDRESS } from '../config';

const windowWidth = Dimensions.get('window').width;
const imageWidth = (windowWidth - 30) / 2; // 한 줄에 두 개의 이미지가 있으므로 가로 여백을 제외하고 20을 더해서 나누어 줍니다.



function Category({ route }) {
  const { category } = route.params;
  console.log(category);
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8080/api/images/get`);
  //       setPosts(response.data);
  //     } catch (error) {
  //       console.error('Failed to fetch posts:', error);
  //     }
  //   };

  //   fetchPosts();
  // }, [category]);
  // http://${LOCAL}:8080/api/images/uploads/style/${category}
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/api/images/uploads/style/${category}`);
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        
      }
    };

    fetchPosts();
  }, [category]);

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
      <Text style={styles.header}>{category}</Text>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.container}
      />
      {/* <View style={styles.postContainer}>
          {posts.map((post, index) => (
            <View key={index} style={styles.postItem}>
              <ImageClickable postUrl={post.imageUri} postInfo={post}/>
            </View>
          ))}
        </View> */}
    </View>

  )
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
  header: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  maincontainer: {
    backgroundColor: 'white'
  }
})

export default Category;