import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { MY_IP_ADDRESS } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

const ChatModal = ({ isVisible, onClose }) => {
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);

  const handleMessageChange = (text) => {
    setMessage(text);
  };

  const handleSendMessage = () => {
    console.log(`채팅방 이름: ${message}`);
    setMessage('');
    onClose();
    createChatRoom(userId, message);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('UserData');
        console.log('Fetched UserData:', storedUserData);
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          setUserData(userData);
          setUserId(userData.id);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const createChatRoom = async (ownerId, title) => {
    console.log('ownerId:', ownerId);
    console.log('title:', title);
    try {
      const params = new URLSearchParams();
      params.append('ownerId', ownerId);
      params.append('title', title);

      const response = await axios.post(`http://${MY_IP_ADDRESS}:8080/chatrooms/create`, params);

      console.log('Chat room created:', response.data);
    } catch (error) {
      console.error('Error creating chat room:', error);
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>채팅방 만들기</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={styles.input}
              placeholder="채팅방 이름을 입력해주세요"
              value={message}
              onChangeText={handleMessageChange}
              multiline={true}
            />
            <TouchableOpacity onPress={handleSendMessage}>
              <MaterialIcons name="person-add-alt-1" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: '60%',
    backgroundColor: '#f1eeee',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 10
  }
});

export default ChatModal;