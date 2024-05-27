import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, Image, StyleSheet,
  TouchableOpacity, KeyboardAvoidingView, Platform,
  Alert, TextInput, SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MY_IP_ADDRESS } from '../config';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RoomFilter from '../components/Filter/RoomFilter';

const Chat = () => {
  const navigation = useNavigation();
  const [chatRooms, setChatRooms] = useState([]);
  const [myChatRooms, setMyChatRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userId, setUserId] = useState(null);
  const [userName, setuserName] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("추천");

  const fetchMyRooms = async (id) => {
    try {
      const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/chatrooms/participant?userId=${id}`);
      setMyChatRooms(response.data);
    } catch (error) {
      console.error('Error fetching myRooms:', error);
    }
  };

  const handleClick = async (room) => {
    const isParticipated = myChatRooms.some(myRoom => myRoom.id === room.id);

    if (isParticipated) {
      console.log("네비 정보: ", room, userId, userName);
      navigation.navigate('ChatRoom', { room, userId: userId, userName: userName });
      return;
    }

    Alert.alert(
      '입장하시겠습니까?',
      '',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '확인',
          onPress: async () => {
            try {
              const params = new URLSearchParams();
              params.append('chatRoomId', room.id);
              params.append('userId', userId);

              await axios.post(`http://${MY_IP_ADDRESS}:8080/chatrooms/participant`, params);

              fetchMyRooms(userId);
              navigation.navigate('ChatRoom', { room, userId: userId, userName: userName });

            } catch (error) {
              console.error('Error adding participant:', error);
            }
          }
        },
      ],
      { cancelable: false }
    );
  };

  const handleLongPress = async (room) => {
    Alert.alert(
      '채팅방을 나가겠습니까?',
      '',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '확인',
          onPress: async () => {
            try {
              await axios.delete(`http://${MY_IP_ADDRESS}:8080/chatrooms/leave`, {
                data: { chatRoomId: room.id, userId: userId },
                params: { chatRoomId: room.id, userId: userId }
              });

              fetchMyRooms(userId);
            } catch (error) {
              console.error('Error leaving chatroom:', error);
            }
          }
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('UserData');
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          setUserId(userData.id);
          setuserName(userData.nickname);
          console.log("사용자: ", userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchRooms = async () => {
        try {
          const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/chatrooms/all`);
          console.log('Received data:', response.data);
          setChatRooms(response.data);
        } catch (error) {
          console.error('채팅방을 불러오는 중 오류 발생:', error);
        }
      };

      fetchRooms();
      fetchMyRooms(userId);
    }
  }, [userId]);

  const filteredChatRooms = chatRooms.filter(room =>
    room.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMyChatRooms = myChatRooms.filter(room =>
    room.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const ChatRoomItem = ({ room, onPress, onLongPress }) => (
    <TouchableOpacity
      key={room.id}
      onPress={() => onPress(room)}
      onLongPress={() => onLongPress && onLongPress(room)}
    >
      <View style={styles.profileView}>
        <Image
          style={styles.profileImage}
          source={require('../assets/profile.png')}
          resizeMode={'stretch'} />
        <View style={styles.informationView}>
          <Text style={styles.informationName}>
            {room.title} <Ionicons name="person" size={10} color="#afaeae" />
            <Text style={{ fontSize: 12, color: 'gray' }}> {room.participantCount}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <RoomFilter onCategoryChange={handleCategoryChange} />
      <ScrollView style={styles.scrollView}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={styles.keyboardAvoidingView}
        >
          <TextInput
            style={styles.input}
            placeholder="채팅방 검색"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {selectedCategory === "추천" && filteredChatRooms.map(room => (
            <ChatRoomItem key={room.id} room={room} onPress={handleClick} />
          ))}
          {selectedCategory === "내 채팅방" && filteredMyChatRooms.map(room => (
            <ChatRoomItem key={room.id} room={room} onPress={handleClick} onLongPress={handleLongPress} />
          ))}
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 11,
    marginHorizontal: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    marginRight: 13,
  },
  informationView: {
    flex: 1,
  },
  informationName: {
    fontSize: 15,
    marginBottom: 3,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f6f3f3',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 15,
    marginBottom: 10,
    marginHorizontal: 20,
  },
});

export default Chat;