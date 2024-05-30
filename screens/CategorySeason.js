import { View, Text, FlatList, Image, StyleSheet, Dimensions ,TouchableOpacity  } from 'react-native';
import axios from 'axios';
import { useState,useCallback,useEffect ,} from 'react';
import { useFocusEffect,useNavigation } from '@react-navigation/native';
import { LOCAL, MY_IP_ADDRESS } from '../config';
import React from 'react';

const windowWidth = Dimensions.get('window').width;
const imageWidth = (windowWidth - 30) / 2; // 한 줄에 두 개의 이미지가 있으므로 가로 여백을 제외하고 20을 더해서 나누어 줍니다.



function CategorySeason({ route }) {
  const { season } = route.params;
  
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  
  useFocusEffect(
    React.useCallback(() => {
      const fetchPosts = async () => {
        try {
          const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/api/images/uploads/seasons/${season}`);
          setPosts(response.data);
          console.log(response.data);  // Logging the fetched data for debugging.
        } catch (error) {
          console.error('Failed to fetch posts:', error);
        }
      };
      
      fetchPosts();
      return () => {};  // Optional cleanup mechanism.
    }, [season])
  );

  const handleImageClick = (postInfo) => {
    navigation.navigate('Post', { creatorInfo: postInfo });
    console.log(postInfo);  // Logging the clicked post info for debugging.
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleImageClick(item)}>
      <View style={styles.item}>
        <Image
          style={styles.image}
          source={{ uri: item.imageUrl }}  // Ensure the source is correctly set from item.
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.maincontainer}>
      <Text style={styles.header}>{season}</Text>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.container}
      />
     
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems:'center',
    justifyContent: 'center'
  },
  item: {
    width: imageWidth,
    height: 240,
    overflow: 'hidden',
    marginBottom: 3,
    marginHorizontal: 2,
  },
  image: {
    width: '100%',
    height: 240,
  },
  header: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  maincontainer: {
    backgroundColor: 'white',
    flex: 1
  }
})

export default CategorySeason;