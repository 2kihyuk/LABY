import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MY_IP_ADDRESS } from '../config';

const ChatRoom = ({ route }) => {
  const { room, userId, userName } = route.params;
  const roomId = room.id;
  const roomTitle = room.title;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);
  const webSocketRef = useRef(null);

  useEffect(() => {
    webSocketRef.current = new WebSocket(`ws://${MY_IP_ADDRESS}:8080/ws/chat`);

    webSocketRef.current.onopen = () => {
      console.log('WebSocket 연결 성공');
      const enterMessage = JSON.stringify({ messageType: 'ENTER', senderId: userId, chatRoomId: roomId });
      webSocketRef.current.send(enterMessage);
    };

    webSocketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("전달받은 데이터:", data);
      if (data.message_type === 'TALK' && data.message !== null) {
        setMessages(prevMessages => [...prevMessages, data]);
      }
    };

    webSocketRef.current.onclose = () => {
      console.log('WebSocket 연결 종료');
    };

    webSocketRef.current.onerror = (error) => {
      console.error('WebSocket 연결 오류:', error);
    };

    return () => {
      console.log('WebSocket 연결 해제');
      webSocketRef.current.close();
    };
  }, [roomId, userId]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        messageType: 'TALK',
        senderId: userId,
        chatRoomId: roomId,
        message: message,
        sentAt: new Date().toISOString()
      };
      const sendMessage = JSON.stringify(newMessage);
      console.log('보낸 메시지:', sendMessage);
      webSocketRef.current.send(sendMessage);
      setMessage('');
    }
  };

  const formatMessageTime = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 90}
    >
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.messageWrapper}>
            {item.senderId != userId && (
              <View style={styles.senderContainer}>
                <Text style={styles.senderText}>{item.sender}</Text>
              </View>
            )}
            <View style={[styles.messageContainer, item.senderId == userId ? styles.fromMe : styles.fromOther]}>
              <Text style={styles.messageText}>{item.message}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messagesList}
        ref={flatListRef}
        getItemLayout={(data, index) => ({ length: 50, offset: 50 * index, index })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="메시지를 입력하세요"
          onSubmitEditing={handleSend} // 키보드 엔터를 누를 때 메시지 전송
        />
        <Feather name="send" size={24} color="black" onPress={handleSend} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  messagesList: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  messageWrapper: {
    marginBottom: 10,
  },
  messageContainer: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 10,
  },
  fromMe: {
    alignSelf: 'flex-end',
    backgroundColor: '#d8e2f0',
  },
  fromOther: {
    alignSelf: 'flex-start',
    backgroundColor: '#dff5dc',
  },
  messageText: {
    fontSize: 15,
  },
  timeText: {
    fontSize: 10,
    color: '#888',
    alignSelf: 'flex-end',
    marginHorizontal: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  senderContainer: {
    alignSelf: 'flex-start',
    marginLeft: 3,
    marginBottom: 5
  },
  senderMe: {
    alignSelf: 'flex-end',
    marginRight: 3,
    marginBottom: 5
  },
  senderText: {
    fontSize: 12,
    color: '#888',
  },
});

export default ChatRoom;