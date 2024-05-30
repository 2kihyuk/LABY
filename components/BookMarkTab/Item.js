// import React from 'react';
// import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';

// const windowWidth = Dimensions.get('window').width;
// const imageWidth = (windowWidth - 30) / 2; // 한 줄에 두 개의 이미지가 있으므로 가로 여백을 제외하고 20을 더해서 나누어 줍니다.


// function Item() {
//   const renderItem = ({ item }) => (
//     <View style={styles.item}>
//       <Image
//         style={styles.image}
//         source={item.uri}
//         resizeMode="cover"
//       />
//     </View>
//   );

//   return (
//     <FlatList
//       data={data}
//       renderItem={renderItem}
//       keyExtractor={item => item.id}
//       numColumns={2} // 한 줄에 두 개의 사진을 표시
//       contentContainerStyle={styles.container}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 5, // 이미지 간의 간격을 조절합니다.
//   },
//   item: {
//     width: imageWidth,
//     height: imageWidth, // 이미지를 정사각형으로 표시하기 위해 높이도 설정합니다.
//     margin: 5,
//     borderRadius: 5,
//     overflow: 'hidden',
//   },
//   image: {
//     width: '100%',
//     height: '100%', // 이미지가 정사각형으로 표시되도록 높이를 100%로 설정합니다.
//   },
// });

// export default Item;
