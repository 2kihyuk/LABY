// import { View, Text, StyleSheet } from 'react-native';

// const StTag = ({ styleTag }) => {
//   console.log('styleTag:', styleTag); 

// //   if (!styleTag) return null;
// //   const parsedTag = JSON.parse(styleTag);

// //   return (
// //     <View style={styles.genderContainer}>
// //       {parsedTag.gender && (
// //         <View style={styles.genderButton}>
// //           <Text style={{fontWeight: "bold", color: "#378aff"}}>{parsedTag.gender}</Text></View>
// //       )}
// //       {styleTag.season && (
// //         <View style={styles.genderButton}>
// //           <Text style={{fontWeight: "bold", color: "#378aff"}}>{parsedTag.season}</Text></View>
// //       )}
// //       {styleTag.mood && (
// //         <View style={styles.genderButton}>
// //           <Text style={{fontWeight: "bold", color: "#378aff"}}>{parsedTag.mood}</Text></View>
// //       )}
// //     </View>
// //   );
// // };
// let parsedTag;
//   try {
//     parsedTag = typeof styleTag === 'string' ? JSON.parse(styleTag) : styleTag;
//   } catch (error) {
//     console.error('Error parsing style tags:', error);
//     return null; // JSON 파싱에 실패하면 null 반환
//   }

//   return (
//     <View style={styles.genderContainer}>
//       {parsedTag.gender && (
//         <View style={styles.genderButton}>
//           <Text style={{fontWeight: "bold", color: "#378aff"}}>{parsedTag.gender}</Text>
//         </View>
//       )}
//       {parsedTag.season && (
//         <View style={styles.genderButton}>
//           <Text style={{fontWeight: "bold", color: "#378aff"}}>{parsedTag.season}</Text>
//         </View>
//       )}
//       {parsedTag.mood && (
//         <View style={styles.genderButton}>
//           <Text style={{fontWeight: "bold", color: "#378aff"}}>{parsedTag.mood}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({  
//   genderContainer: {
//     flexDirection: 'row',
//     flexWrap: "wrap",
//     marginTop: 5,
//   },
//   genderButton: {
//     backgroundColor: '#eff2f2',
//     borderRadius: 7,
//     paddingVertical: 6,
//     paddingHorizontal: 10,
//     margin: 4,
//     alignItems: 'center',
//     textAlign: 'center'
//   },
// });

// export default StTag;


//StTag.js
//StTag.js
import { View, Text, StyleSheet } from 'react-native';

const StTag = ({ gender, season, mood, category }) => {
  return (
    <View style={styles.tagContainer}>
      {gender && (
        <View style={styles.genderButton}>
          <Text style={styles.tagText}>{gender}</Text>
        </View>
      )}
      {season && (
        <View style={styles.genderButton}>
          <Text style={styles.tagText}>{season}</Text>
        </View>
      )}
      {mood && (
        <View style={styles.genderButton}>
          <Text style={styles.tagText}>{mood}</Text>
        </View>
      )}
      {category && (
        <View style={styles.genderButton}>
          <Text style={styles.tagText}>{category}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  genderButton: {
    backgroundColor: '#eff2f2',
    borderRadius: 7,
    paddingVertical: 6,
    paddingHorizontal: 10,
    margin: 4,
  },
  tagText: {
    fontWeight: 'bold',
    color: '#378aff',
  },
});

export default StTag;