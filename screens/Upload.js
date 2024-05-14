import React, { useState,useEffect } from 'react';
import { SafeAreaView, Button, Image, View, StyleSheet, ScrollView, TextInput, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import LookTagModal from '../components/Modal/LookTagModal';
import StyleTagModal from '../components/Modal/styleTagModal';
import Colors from '../constants/color';
// import { addImage } from '../components/List/CreaterList';
import { addImage } from '../components/List/CreaterList';
import { useNavigation } from '@react-navigation/native';
import PdTag from '../components/Tag/PdTag';
import StTag from '../components/Tag/StTag';
import axios from 'axios';
import * as ImageManipulator from 'expo-image-manipulator';
import { Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCAL, MY_IP_ADDRESS } from '../config';


export default function Upload() {
  const [image, setImage] = useState(null);
  const [showButton, setShowButton] = useState(true);
  const [text, setText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [lookTags, setLookTags] = useState([]);
  const [styleTag, setStyleTag] = useState({});
  const [UserDataParsed, setUserDataParsed] = useState('');
  const navigation = useNavigation();


  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('UserData');
        if (userData !== null) {
          setUserDataParsed(JSON.parse(userData));
        } else {
          // 사용자 데이터가 없는 경우에 대한 처리
          Alert.alert('사용자 정보를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('사용자 정보 로딩 중 오류 발생');
      }
    };
  
    getUserData();
  }, []);

  // console.log("Test UserDataParsed",UserDataParsed.email);


  const creator = {
    name: 'Sang_S',
    image: 'https://images.onthelook.co.kr/user-profile/20240303090353932840360.jpeg?w=192&q=60&f=webp',
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      multiple: true
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      setShowButton(false);
    }
  };

  const handleUpload = async () => {
    try {
      if (!image) {
        Alert.alert('이미지를 선택해주세요.');
        return;
      }
      
      if (Object.keys(styleTag).length === 0) {
        Alert.alert('스타일 태그를 선택해주세요.');
        return;
      }
      
      if (lookTags.length === 0) {
        Alert.alert('의류 태그를 선택해주세요.');
        return;
      }
  
      // 이미지를 압축하여 저장
      const compressedImage = await ImageManipulator.manipulateAsync(
        image,
        [],
        { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG } // 압축률과 포맷 설정
      );

      const { gender, season, mood, category } = styleTag;
  
      const formData = new FormData();
      formData.append('creatorEmail',UserDataParsed.email); //업로드하는 사람의 이메일
      formData.append('creatorName', UserDataParsed.nickname);//업로드하는 사람의 닉네임
      formData.append('creatorheight', UserDataParsed.height);//업로드하는 사람의 키
      formData.append('creatorweight', UserDataParsed.weight);//업로드하는 사람의 몸무게
      formData.append('creatorImage', creator.image); // Ensure this is a string URL , 업로드하는 사람의 프로필 이미지
      // formData.append('imageUri', compressedImage.uri);  //업로드하는 사진
      formData.append('imageUri', {
        uri: compressedImage.uri,
        type: 'image/jpeg',
        name: 'upload.jpg'
      });
      
      formData.append('lookTags', JSON.stringify(lookTags)); //업로드하는 게시물의 의류정보태그
      formData.append('styleTag', JSON.stringify(styleTag)); // 업로드하는 게시물의 스타일 태그
      formData.append('text', text);//업로드하는 게시물의 텍스트
      formData.append('gender',gender);
      formData.append('season',season);
      formData.append('mood',mood);
      formData.append('category',category);
      
      
      // http://${LOCAL}:8080/api/images/upload
      const response = await axios.post(`http://${MY_IP_ADDRESS}:8080/api/images/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      

  
      if (response.status === 200,201) {
        Alert.alert('업로드 성공!');
        console.log(response.status);
        // console.log("test Email 1",UserDataParsed.email);
        

        addImage(UserDataParsed.nickname, creator.image, image, lookTags, gender,season,mood,category, text, UserDataParsed.height,UserDataParsed.weight);
        navigation.goBack();
        // 업로드 후 작업...
      } else {
        Alert.alert('업로드 실패!');
        console.log(response.status);
      }
    } catch (error) {
      console.error('업로드 에러:', error);
      
      console.log(response.status);
      Alert.alert('업로드 중 에러 발생!');
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSaveLookTag = (lookTagData) => {
    setLookTags([...lookTags, lookTagData]);
    toggleModal();
  };

  const toggleModal2 = () => {
    setIsModalVisible2(!isModalVisible2);
  };

  const handleSaveStyleTag = (styleTagData) => {
    setStyleTag(styleTagData);
    toggleModal2();
    console.log('StyleTag:', styleTagData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.creatorContainer}>
          <Image
            source={{ uri: creator.image }}
            resizeMode="contain"
            style={styles.creatorImage}
          />
          <Text style={styles.creatorName}>{UserDataParsed.nickname}</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="착용한 아이템 및 스타일을 소개해 주세요"
          onChangeText={setText}
          value={text}
          multiline
        />
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          {image ? <Image source={{ uri: image }} style={styles.image} /> : <Ionicons name="add" size={50} color='#d9d8d8' />}
        </TouchableOpacity>
        <View style={styles.tagContainer}>
          {image && (<>
            <Text style={styles.tagFont} onPress={toggleModal}>#의류 태그</Text>
          </>)}
        </View>
        {lookTags.map((tag, index) => (
          <View key={index}>
            <PdTag tag={tag} image={image} />
          </View>
        ))}
        <View style={styles.tagContainer}>
          {image && (
            <>
              <Text style={styles.tagFont} onPress={toggleModal2}>#스타일 태그</Text>
              <StTag
                gender={styleTag.gender}
                season={styleTag.season}
                mood={styleTag.mood}
                category={styleTag.category}
              />

            </>
          )}
        </View>

        {image && (
          <Button title="업로드" onPress={handleUpload} />
        )}
        <LookTagModal visible={isModalVisible} onSave={handleSaveLookTag} onClose={toggleModal} />
        <StyleTagModal visible={isModalVisible2} onSave={handleSaveStyleTag} onClose={toggleModal2} />
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  imageContainer: {
    width: 380,
    height: 420,
    backgroundColor: '#f3f3f3',
    marginBottom: 20,
    alignItems: "center",
    justifyContent: 'center'
  },
  image: {
    width: 380,
    height: 420,
    marginTop: 13,
    marginBottom: 20,
  },
  creatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10
  },
  creatorImage: {
    borderRadius: 50,
    width: 35,
    height: 35,
    marginRight: 10
  },
  creatorName: {
    fontSize: 16,
    flex: 1,
  },
  input: {
    marginTop: 10,
    padding: 13,
    width: '100%',
    textAlignVertical: 'top',
  },
  tagContainer: {
    flexDirection: 'column',
    justifyContent: "space-between",
    marginBottom: 10,
    marginHorizontal: 12
  },
  tagFont: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 3,
    color: "#6d6d6d"
  },
  pdContainer: {
    width: 355,
    height: 70,
    flexDirection: "row",
    borderRadius: 5,
    paddingHorizontal: 11,
    marginLeft: 8,
    marginBottom: 18,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: Colors.primary900,
  },
  pdImage: {
    borderRadius: 2,
    width: 50,
  },
  modalButton: {
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 15,
    marginTop: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  modalText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold'
  }

});
