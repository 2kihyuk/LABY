// import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // useRoute 추가
import axios from 'axios';
import { LOCAL } from '../config';
import { useState } from 'react';

function EditProfile() {
  const navigation = useNavigation();
  const route = useRoute(); // route 사용
  // const [newName, setNewName] = useState(route.params?.newName ?? ''); // 초기값 설정
  // const [newHeight, setNewHeight] = useState(route.params?.newHeight ?? ''); // 초기값 설정
  // const [newWeight, setNewWeight] = useState(route.params?.newWeight ?? ''); // 초기값 설정
    
  const routeParams = route.params ?? {};
const { newName: initialName = '', newHeight: initialHeight = '', newWeight: initialWeight = '' } = routeParams;

const [newName, setNewName] = useState(initialName);
const [newHeight, setNewHeight] = useState(initialHeight.toString());
  const [newWeight, setNewWeight] = useState(initialWeight.toString());


  
  
  const handleSave = async () => {
    try {
      // 서버로 보낼 데이터 객체 생성
      const data = {
        newName: newName,
        newHeight: parseFloat(newHeight),
        newWeight: parseFloat(newWeight)

      };
      // http://${LOCAL}:8080/profile
      // 서버로 PUT 요청 보내기
      const response = await axios.put(`http://localhost:8080/profile`, data);

      // 업데이트가 성공하면 이전 화면으로 돌아가기
      navigation.goBack();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>이름 *</Text>
      <TextInput
        style={styles.input}
        value={newName}
        placeholder="이름을 입력해주세요."
        onChangeText={text => setNewName(text)}
      />
      <Text style={styles.label}>키<Text style={styles.text}> (cm)</Text>*</Text>
      <TextInput
        style={styles.input}
        value={newHeight}
        placeholder="키를 입렵해주세요."
        onChangeText={text => setNewHeight(text)}
      />
      <Text style={styles.label}>몸무게<Text style={styles.text}> (kg)</Text> *</Text>
      <TextInput
        style={styles.input}
        value={newWeight}
        placeholder="몸무게를 입력해주세요."
        onChangeText={text => setNewHeight(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>저장</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    paddingHorizontal: 35,
    backgroundColor: 'white'
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    marginTop: 5
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  text: {
    fontSize: 13,
    color: 'gray'
  },
  genderContainer: {
    flexDirection: 'row',
    marginBottom: 10
  },
  genderPick: {
    paddingHorizontal: 12,
    alignItems: "center",
    borderColor: "#d4d2d2",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 72,
    marginRight: 6,
    marginVertical: 8
  },
  selectedOption: {
    backgroundColor: '#c3effb'
  },
});

export default EditProfile;