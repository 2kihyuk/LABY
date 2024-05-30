// //Main.js
// import React, { useState, useEffect } from "react";
// import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet } from "react-native";
// // import Filter from "../components/Filter/Filter";
// import TopFilter from "../components/Filter/TopFilter";
// import Recommand from "./Recommand"; // Recommand.js 파일 import
// import Ranking from "./Ranking";
// import Following from "./Following";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { LOCAL, MY_IP_ADDRESS } from "../config";

// function Main() {


//   //여기서 업로드한 게시물에 대한 모든 정보를 가져다 놓고, AsyncStorage에 정보를 저장하고.. 
//   const saveData = async (key, value) => {
//     try {
//       await AsyncStorage.setItem(key, JSON.stringify(value));
//       console.log('Data saved successfully');
//     } catch (error) {
//       console.error('Error saving data:', error);
//     }
//   };
//   // http://${LOCAL}:8080/api/posts
//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/api/posts`);
//       const posts = response.data.posts;
//       saveData('posts', posts); // 게시물 정보를 AsyncStorage에 저장
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//   };
  

  
//   const [selectedCategory, setSelectedCategory] = useState("추천");

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <TopFilter onCategoryChange={handleCategoryChange} />
//       <ScrollView style={styles.scrollView}>
//         {selectedCategory === "추천" && (
//           <Recommand />
//         )}
//         {selectedCategory === "스타일랭킹" && (
//           <View>
//             <Ranking/>
//           </View>
//         )}
//         {selectedCategory === "팔로잉" && (
//           <View>
//             <Following/>
//           </View>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF"
//   },
//   scrollView: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     paddingTop: 20,
//     paddingBottom: 98,
//   }
// });

// export default Main;//Main.js


import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet } from "react-native";
// import Filter from "../components/Filter/Filter";
import TopFilter from "../components/Filter/TopFilter";
import Recommand from "./Recommand"; // Recommand.js 파일 import
import Ranking from "./Ranking";
import Following from "./Following";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCAL, MY_IP_ADDRESS } from "../config";

function Main() {


  //여기서 업로드한 게시물에 대한 모든 정보를 가져다 놓고, AsyncStorage에 정보를 저장하고.. 
  const saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  // http://${LOCAL}:8080/api/posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/api/posts`);
      const posts = response.data.posts;
      saveData('posts', posts); // 게시물 정보를 AsyncStorage에 저장
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  

  
  const [selectedCategory, setSelectedCategory] = useState("추천");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopFilter onCategoryChange={handleCategoryChange} />
      <ScrollView style={styles.scrollView}>
        {selectedCategory === "추천" && (
          <Recommand />
        )}
        {selectedCategory === "스타일랭킹" && (
          <View>
            <Ranking/>
          </View>
        )}
        {selectedCategory === "팔로잉" && (
          <View>
            <Following/>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
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
    paddingTop: 0,
    paddingBottom: 0,
  }
});

export default Main;