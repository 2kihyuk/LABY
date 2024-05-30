import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { creators } from '../components/List/CreaterList';

function ImageClickable({ postUrl ,postInfo }) {
  const navigation = useNavigation();

  const handleImageClick = () => {
    
    navigation.navigate('Post', {creatorInfo : postInfo});
  };

  return (
    <TouchableOpacity onPress={handleImageClick}>
      <Image
        source={{ uri: postUrl }}
        resizeMode="cover"
        style={{ width: '100%', height: 240 }}
      />
    </TouchableOpacity>
  );
}

export default ImageClickable;


