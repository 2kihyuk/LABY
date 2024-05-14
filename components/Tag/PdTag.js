import { React, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/color';

const PdTag = ({ tag, image }) => {

  const [markFilled, setMarkFilled] = useState(false);

  const handleMarkClick = () => {
    setMarkFilled(!markFilled);
  };

  return (
    <View style={styles.pdContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.pdImage} source={{ uri: image }} resizeMode='cover' />
      </View>
      <View style={styles.textContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>[{tag.brand}]</Text>
          <Text style={{ color: 'gray' }}>  {tag.productName}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>₩{tag.price}ㆍ</Text>
          <Text style={{ color: '#378aff', fontSize: 14, marginLeft: 2, fontWeight: 'bold' }}>{tag.size}사이즈</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleMarkClick} style={styles.iconContainer}>
        {markFilled ? (
          <FontAwesome name="bookmark" size={22} color="#ffd728" />
        ) : (
          <FontAwesome name="bookmark-o" size={22} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pdContainer: {
    width: 355,
    height: 70,
    flexDirection: "row",
    borderRadius: 5,
    paddingHorizontal: 11,
    marginLeft: 8,
    marginTop: 10,
    marginBottom: 18,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: Colors.primary900,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  pdImage: {
    borderRadius: 2,
    width: 50,
    height: 58,
    marginVertical: 5
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    alignSelf: 'center',
    position: 'absolute',
    right: 18,
    top: '50%',
    transform: [{ translateY: -11 }],
  },
});

export default PdTag;
