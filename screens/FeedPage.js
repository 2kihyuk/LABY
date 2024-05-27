import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const FeedPage = ({ route }) => {
//   const { username, imageUri, description, likes, comments } = route.params.data;
const { username, imageUri, description, likes, comments = [] } = route.params.data;


  return (
    <View style={styles.container}>
      <Text style={styles.username}>{username}</Text>
      <Image source={imageUri} style={styles.image} />
      <Text style={styles.description}>{description}</Text>
      <Text>Likes: {likes}</Text>
      <Text>Comments:</Text>
      {comments.map(comment => (
        <View key={comment.id} style={styles.comment}>
          <Text style={styles.commentUsername}>{comment.username}</Text>
          <Text>{comment.text}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1, // 이미지 비율 유지
    resizeMode: 'cover',
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
  },
  comment: {
    marginBottom: 5,
  },
  commentUsername: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
});

export default FeedPage;
