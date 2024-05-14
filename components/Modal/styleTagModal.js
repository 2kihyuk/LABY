// import React, { useState } from 'react';
// import { Modal, View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import { genders, seasons, moods,categorycloth } from '../List/OptionList';

// const StyleTagModal = ({ visible, onSave, onClose }) => {
//   const [selectedGender, setSelectedGender] = useState('');
//   const [selectedSeason, setSelectedSeason] = useState('');
//   const [selectedMood, setSelectedMood] = useState('');
//   const [selectedCategoryCloth , setSelectedCategoryCloth] = useState('');

//   const handleSave = () => {
//     const styleTagData = {
//       gender: selectedGender,
//       season: selectedSeason,
//       mood: selectedMood,
//       categorycloth: selectedCategoryCloth
//     };
//     onSave(styleTagData);
//     onClose();
//   };

//   return (
//     <Modal visible={visible} animationType="slide" transparent={true}>
//       <View style={styles.centeredView}>
//         <View style={styles.modalContainer}>
//           <Text style={styles.title}>스타일 태그를 추가해주세요!</Text>
//           <View style={styles.genderContainer}>
//             {genders.map((gender, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={[
//                   styles.genderButton,
//                   selectedGender === gender && styles.selectedOption
//                 ]}
//                 onPress={() => setSelectedGender(gender)}
//               >
//                 <Text>{gender}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//           <View style={styles.genderContainer}>
//             {seasons.map((season, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={[
//                   styles.genderButton,
//                   selectedSeason === season && styles.selectedOption
//                 ]}
//                 onPress={() => setSelectedSeason(season)}
//               >
//                 <Text>{season}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//           <View style={styles.genderContainer}>
//             {moods.map((mood, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={[
//                   styles.genderButton,
//                   selectedMood === mood && styles.selectedOption
//                 ]}
//                 onPress={() => setSelectedMood(mood)}
//               >
//                 <Text>{mood}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//           <View style={styles.genderContainer}>
//             {categorycloth.map((ctcloth, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={[
//                   styles.genderButton,
//                   selectedCategoryCloth === ctcloth && styles.selectedOption
//                 ]}
//                 onPress={() => setSelectedCategoryCloth(categorycloth)}
//               >
//                 <Text>{categorycloth}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//           <View style={styles.buttonContainer}>
//             <Button title="저장" onPress={handleSave} />
//             <Button title="닫기" onPress={onClose} />
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContainer: {
//     backgroundColor: '#fffffff5',
//     paddingHorizontal: 30,
//     width: '80%',
//     borderRadius: 15,
//     paddingVertical: 20,
//     marginBottom: 30
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center'
//   },
//   genderContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginBottom: 26,
//   },
//   genderButton: {
//     backgroundColor: '#fbfbfb',
//     borderRadius: 5,
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     margin: 4,
//     alignItems: 'center',
//     textAlign: 'center'
//   },
//   selectedOption: {
//     backgroundColor: '#c3effb'
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     alignContent: 'center',
//     justifyContent: 'center'
//   }
// });

// export default StyleTagModal;


//styleTagModal.js


//styleTagModal.js
import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { genders, seasons, moods, categories } from '../List/OptionList';
import Colors from "../../constants/color";

const StyleTagModal = ({ visible, onSave, onClose }) => {
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSave = () => {
    const styleTagData = {
      gender: selectedGender,
      season: selectedSeason,
      mood: selectedMood,
      category: selectedCategory,
    };
    onSave(styleTagData);
    onClose();
  };
  

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>스타일 태그를 추가해주세요!</Text>
          <View style={styles.genderContainer}>
            {genders.map((gender, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.genderButton,
                  selectedGender === gender && styles.selectedOption
                ]}
                onPress={() => setSelectedGender(gender)}
              >
                <Text>{gender}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.genderContainer}>
            {seasons.map((season, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.genderButton,
                  selectedSeason === season && styles.selectedOption
                ]}
                onPress={() => setSelectedSeason(season)}
              >
                <Text>{season}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.genderContainer}>
            {moods.map((mood, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.genderButton,
                  selectedMood === mood && styles.selectedOption
                ]}
                onPress={() => setSelectedMood(mood)}
              >
                <Text>{mood}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.genderContainer}>
            {categories.map((categoryItem, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.genderButton,
                  selectedCategory === categoryItem && styles.selectedOption
                ]}
                onPress={() => setSelectedCategory(categoryItem)}
              >
                <Text>{categoryItem}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={handleSave}><Text style={styles.modalText} >저장</Text></TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={onClose}><Text style={styles.modalText} >닫기</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: '#fffffff5',
    paddingHorizontal: 30,
    width: '80%',
    borderRadius: 15,
    paddingVertical: 20,
    marginBottom: 30
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  genderContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 26,
  },
  genderButton: {
    paddingHorizontal: 12,
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    paddingVertical: 7,
    marginRight: 6,
    marginVertical: 8
  },
  selectedOption: {
    backgroundColor: '#c3effb'
  },
  buttonContainer: {
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  modalButton: {
    backgroundColor: 'black',
    borderRadius: 5,
    marginHorizontal: 20,
    paddingHorizontal: 28,
    paddingVertical: 8
  },
  modalText: {
    color: 'white',
    fontWeight: "bold",
  }
});

export default StyleTagModal;