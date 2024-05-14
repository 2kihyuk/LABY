import React from "react";
import { useState,useEffect ,useCallback } from "react";
import { SafeAreaView, View, ScrollView, Text, Image, StyleSheet ,TouchableOpacity } from "react-native";
import { creators } from "../components/List/CreaterList";
import Filter from "../components/Filter/Filter";
import ImageClickable from "../components/ImageClickable";
import axios from "axios";
import { useFocusEffect } from '@react-navigation/native';
import { LOCAL, MY_IP_ADDRESS } from "../config";


function Recommand() {

  const [posts, setPosts] = useState([]);
 
  // http://${LOCAL}:8080/api/images/get
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/api/images/get`);
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

  // console.log("Get Data Success",posts);
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <View style={styles.imageTextContainer}>
            <Image
              source={{ uri: "https://images.onthelook.co.kr/pr/i6ZBVTnK5pRWCDQs8nQJ51.png?w=192&q=80&f=webp" }}
              resizeMode="stretch"
              style={styles.image}
            />
            <Text style={styles.imageText}>체형별</Text>
          </View>
          <View style={styles.imageTextContainer}>
            <Image
              source={{ uri: "https://images.onthelook.co.kr/pr/fjeHFmmKw8s9tjcHAXogUj.png?w=192&q=80&f=webp" }}
              resizeMode="stretch"
              style={styles.image}
            />
            <Text style={styles.imageText}>계절별</Text>
          </View>
          <View style={styles.imageTextContainer}>
            <Image
              source={{ uri: "https://images.onthelook.co.kr/pr/wXCGfkpq4Vf25Ep9SMbK1c.png?w=192&q=80&f=webp" }}
              resizeMode="stretch"
              style={styles.image}
            />
            <Text style={styles.imageText}>아우터</Text>
          </View>
          <View style={styles.imageTextContainer}>
            <Image
              source={{ uri: "https://images.onthelook.co.kr/pr/vAbRr7jB3s5xG3aY6hEpTZ.png?w=192&q=80&f=webp" }}
              resizeMode="stretch"
              style={styles.image}
            />
            <Text style={styles.imageText}>상의</Text>
          </View>
          <View style={styles.imageTextContainer}>
            <Image
              source={{ uri: "https://images.onthelook.co.kr/pr/5Q4sfrTG785XVfq4dyMHrL.png?w=192&q=80&f=webp" }}
              resizeMode="stretch"
              style={styles.image}
            />
            <Text style={styles.imageText}>하의</Text>
          </View>
        </View>
        <Filter />
        <View style={styles.postContainer}>
          {posts.map((post, index) => (
            <View key={index} style={styles.postItem}>
              <ImageClickable postUrl={post.imageUri} postInfo={post}/>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView >
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
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginHorizontal: 15,
  },
  imageTextContainer: {
    alignItems: "center",
  },
  image: {
    borderRadius: 10,
    width: 61,
    height: 61,
    borderWidth: 2,
    backgroundColor: '#f5f5f5',
    borderWidth: 0,
    marginBottom: 10
  },
  imageText: {
    color: "#656565",
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5
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
