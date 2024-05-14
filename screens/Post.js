import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Animated } from 'react-native';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import PdTag from '../components/Tag/PdTag';
import StTag from '../components/Tag/StTag';
import axios from 'axios';
import { LOCAL, MY_IP_ADDRESS } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Post = ({ route }) => {
  const { creatorInfo } = route.params;
  const [likerId, setLikerId] = useState(null);
  const [heartFilled, setHeartFilled] = useState(false);
  const [markFilled, setMarkFilled] = useState(false);
  const [follow, setFollow] = useState(false);
  const [showTag, setShowTag] = useState(true);
  const [currentTag, setCurrentTag] = useState({ brand: '', price: '', size: '' });
  const [currentStyleTag,setCurrentStyleTag] =useState({ gender: '' , season: '' , mood: '', category:''});
  const [heartVisible, setHeartVisible] = useState(false);
  const heartOpacity = useRef(new Animated.Value(0)).current;

  console.log("likerId:" , likerId);

  useEffect(() => {
    const fetchLikerId = async () => {
      const id = await AsyncStorage.getItem('likerId');
      setLikerId(id);
    };

    fetchLikerId();
  }, []);

console.log(creatorInfo);
useEffect(() => {
    if (creatorInfo && creatorInfo.lookTags) {
      try {
        const tags = JSON.parse(creatorInfo.lookTags); // JSON 문자열 파싱
        if (tags.length > 0) {
          setCurrentTag(tags[0]); // 첫 번째 태그 객체를 사용
        }
      } catch (error) {
        console.error('Failed to parse tags:', error);
      }
    }
  }, [creatorInfo]);

  useEffect(() => {
    if (creatorInfo && creatorInfo.styleTags) {
      try {
        const styleTags = JSON.parse(creatorInfo.styleTags); // JSON 문자열 파싱
        setCurrentStyleTag(styleTags); // 파싱된 객체 저장
      } catch (error) {
        console.error('Failed to parse style tags:', error);
      }
    }
  }, [creatorInfo]);


  useEffect(() => { //좋아요 더블클릭 애니메이션 사용
    if (heartVisible) {
      Animated.timing(heartOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start(() => {
        setTimeout(() => {
          Animated.timing(heartOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
          }).start(() => {
            setHeartVisible(false);
          });
        }, 200);
      });
    }
  }, [heartVisible]);

  console.log("postUser:" , creatorInfo.creatorEmail);
  // const handleHeartClick = async () => {
  //   setHeartFilled(!heartFilled);
    
  //   try {
  //     const postId = creatorInfo.id;
  //     if (heartFilled) {
  //       // 이미 좋아요를 누른 경우 좋아요 취소
  //       await axios.delete(`http://localhost:8080/laby/api/v1/hearts`,{ 
  //         data:
  //          { likerId: likerId, postId: creatorInfo.id, postUser: creatorInfo.creatorEmail } });
  //     } else {
  //       // 좋아요 추가
  //       await axios.post(`http://localhost:8080/laby/api/v1/hearts`,{
  //         likerId : likerId,
  //         postId : creatorInfo.id,
  //         postUser : creatorInfo.creatorEmail
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error handling heart click:', error);
  //   }
  // };
  useEffect(() => {
    const checkLikedStatus = async () => {
      const likerEmail = await AsyncStorage.getItem('email');
      const key = `likedPosts-${likerEmail}`;
      const likedPosts = await AsyncStorage.getItem(key);
      const likedPostsArray = likedPosts ? JSON.parse(likedPosts) : [];
      const isLiked = likedPostsArray.some(post => post.id === creatorInfo.id);
      setHeartFilled(isLiked);
    };

    checkLikedStatus();
  }, [creatorInfo.id]);

  const handleHeartClick = async () => {
    setHeartFilled(!heartFilled);
    
    try {
      const postId = creatorInfo.id;
      const likerEmail = await AsyncStorage.getItem('email'); // 사용자 이메일 불러오기
      const key = `likedPosts-${likerEmail}`; // 사용자별 키 생성

      if (heartFilled) {
        // 좋아요 취소
        // await axios.delete(`http://${MY_IP_ADDRESS}:8080/laby/api/v1/hearts`, {
        //   data: { likerId: likerId, postId: postId, postUser: creatorInfo.creatorEmail }
        // });
        // AsyncStorage에서 해당 게시물 삭제
        const storedPosts = await AsyncStorage.getItem(key);
        const filteredPosts = storedPosts ? JSON.parse(storedPosts).filter(item => item.id !== postId) : [];
        await AsyncStorage.setItem(key, JSON.stringify(filteredPosts));
      } else {
        // 좋아요 추가
        // await axios.post(`http://${MY_IP_ADDRESS}:8080/laby/api/v1/hearts`, {
        //   likerId: likerId,
        //   postId: postId,
        //   postUser: creatorInfo.creatorEmail
        // });
        // AsyncStorage에 게시물 정보 추가
        const newPost = { ...creatorInfo, id: postId };
        const storedPosts = await AsyncStorage.getItem(key);
        const updatedPosts = storedPosts ? [...JSON.parse(storedPosts), newPost] : [newPost];
        await AsyncStorage.setItem(key, JSON.stringify(updatedPosts));
      }
    } catch (error) {
      console.error('Error handling heart click:', error);
    }
};

  const handleMarkClick = () => {
    setMarkFilled(!markFilled);
    //북마크 기능
  };

  const handleFollowClick = async () => {
    try {
        const likerEmail = await AsyncStorage.getItem('email');
        if (!likerEmail) {
            console.log('사용자 정보를 찾을 수 없습니다.');
            alert('로그인 후 다시 시도해주세요.');
            return;
        }

        const key = `followedUsers-${likerEmail}`;
        const followedUsers = await AsyncStorage.getItem(key);
        const followedUsersArray = followedUsers ? JSON.parse(followedUsers) : [];

        const isFollowing = followedUsersArray.some(user => user.creatorEmail === creatorInfo.creatorEmail);

        if (isFollowing) {
            // 이미 팔로우 중인 경우, 팔로우 취소
            const updatedUsers = followedUsersArray.filter(user => user.creatorEmail !== creatorInfo.creatorEmail);
            await AsyncStorage.setItem(key, JSON.stringify(updatedUsers));
            // await axios.delete(`http://${MY_IP_ADDRESS}:8080/laby/api/v1/unfollow`, {
            //     data: {
            //         followerEmail: likerEmail,
            //         followingEmail: creatorInfo.creatorEmail
            //     }
            // });
        } else {
            // 팔로우하지 않은 경우, 팔로우 추가
            const updatedUsers = [...followedUsersArray, { ...creatorInfo, posts }];
            await AsyncStorage.setItem(key, JSON.stringify(updatedUsers));
            // await axios.post(`http://${MY_IP_ADDRESS}:8080/laby/api/v1/follow`, {
            //     followerEmail: likerEmail,
            //     followingEmail: creatorInfo.creatorEmail
            // });
        }
        setFollow(!follow); // UI 업데이트
        console.log('팔로우 처리 성공');
    } catch (error) {
        console.error('팔로우 처리 실패:', error);
        alert('팔로우 요청에 실패했습니다. 다시 시도해주세요.');
    }
};


  // const handleFollowClick = async () => {
  //   try {
  //     const likerEmail = await AsyncStorage.getItem('email');
  //     if (likerEmail) {
  //       const response = await axios.post(`http://localhost:8080/laby/api/v1/follow`,{
  //         followerEmail: likerEmail,
  //         followingEmail: creatorInfo.creatorEmail,
  //       });
  //       console.log('팔로우 성공');
  //       setFollow(!follow);
  //     } else {
  //       console.log('사용자 정보를 찾을 수 없습니다.');
  //       alert('로그인 후 다시 시도해주세요.');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert('팔로우 요청에 실패했습니다. 다시 시도해주세요.');
  //   }
  // };

  

  const handleTag = () => {
    setShowTag(!showTag);
  }

  const [lastPress, setLastPress] = useState(0);
  const [tapCount, setTapCount] = useState(0);

  useEffect(() => {
    if (tapCount === 2) {
      setHeartVisible(true);
      handleHeartClick();
      setTapCount(0);
    }
  }, [tapCount]);

  const handleDoubleTap = () => {
    const now = new Date().getTime();
    if (now - lastPress < 300) {
      setHeartVisible(true);
      handleHeartClick();
      setTapCount(0);
    } else {
      setLastPress(now);
      setTapCount(1);
    }
  }
  console.log("creatorInfo.category : ", creatorInfo.category);
  console.log("creatorInfo.gender : ", creatorInfo.gender);
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={styles.profile}>
        <Image source={{ uri: creatorInfo.creatorImage }} style={styles.creatorImage} />
        <View>
          <Text style={styles.name}>{creatorInfo.creatorName} <Ionicons name="checkmark-circle" size={12} color="#378aff" /></Text>
          <Text style={{ marginTop: 2, marginLeft: 7, color: 'gray' }}>{creatorInfo.creatorHeight}cmㆍ{creatorInfo.creatorWeight}kg</Text>
        </View>
        <TouchableOpacity style={styles.follow} onPress={handleFollowClick}>
          <Text style={styles.followText}>{follow ? '팔로잉' : '팔로우'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableWithoutFeedback onPress={handleDoubleTap}>
        <Image source={{ uri: creatorInfo.imageUri }} style={styles.image} />
      </TouchableWithoutFeedback>
      {showTag && (
        <View style={styles.tagBox}>
          <View style={styles.tagArrow} />
          <View style={styles.tagBody}>
            <Text style={styles.tagText}>{currentTag.brand}</Text>
            <Text style={[{ color: '#6a6a6a', fontSize: 13 }]}>₩{currentTag.price}</Text>
            <Text style={[{ color: '#378aff', fontSize: 10 }]}>{currentTag.size}사이즈</Text>
          </View>
        </View>
      )}
      <View style={styles.icon}>
        <TouchableOpacity onPress={handleHeartClick}>
          {heartFilled ? (
            <AntDesign name="heart" size={24} color="#f95353" />
          ) : (
            <AntDesign name="hearto" size={24} color="black" />
          )}
        </TouchableOpacity>
        <View style={styles.iconSeparator} />
        <TouchableOpacity onPress={handleMarkClick}>
          {markFilled ? (
            <FontAwesome name="bookmark" size={24} color="#ffd728" />
          ) : (
            <FontAwesome name="bookmark-o" size={24} color="black" />
          )}
        </TouchableOpacity>
        <View style={styles.iconSeparator} />
        <AntDesign name="sharealt" size={24} color="black" />
        <View style={styles.iconSeparator2} />
        <AntDesign name="tagso" size={24} color="black" onPress={handleTag} />
      </View>
      <View style={{ flexDirection: 'row', paddingLeft: 20, marginBottom: 20 }}><Text style={{ fontWeight: 'bold' }}>{creatorInfo.creatorName}   </Text><Text>{creatorInfo.text}</Text></View>
      <View style={styles.stTag}>
        <Text style={{ color: '#bcbcbc', fontWeight: 'bold' }}>착용 제품</Text></View>
      {currentTag && (
        <PdTag tag={currentTag} image={creatorInfo.imageUri} />)}
      <View style={styles.stTag}>
        <Text style={{ color: '#bcbcbc', fontWeight: 'bold' }}>연관 태그</Text>
        <StTag gender={creatorInfo.gender} season={creatorInfo.season} mood={creatorInfo.mood} category={currentStyleTag.category} />
      </View>
      {heartVisible && (
        <Animated.View style={[styles.heartContainer, { opacity: heartOpacity }]}>
          <AntDesign name="heart" size={48} color="#f95353" />
        </Animated.View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  profile: {
    marginTop: 15,
    flexDirection: 'row',
  },
  creatorImage: {
    borderRadius: 50,
    width: 35,
    height: 35,
    marginLeft: 10
  },
  name: {
    marginTop: 2,
    marginLeft: 7,
    fontSize: 15,
    fontWeight: 'bold'
  },
  follow: {
    marginLeft: 165,
    marginTop: 3,
    height: 30,
    borderRadius: 10,
    paddingHorizontal: 17,
    backgroundColor: '#378aff',
    justifyContent: 'center'
  },
  followText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15
  },
  image: {
    height: 420,
    marginTop: 13,
    marginBottom: 10
  },
  icon: {
    marginLeft: 15,
    flexDirection: 'row'
  },
  iconSeparator: {
    marginHorizontal: 5,
    marginBottom: 50
  },
  iconSeparator2: {
    marginHorizontal: 118,
  },
  stTag: {
    marginLeft: 20
  },
  tagBox: {
    position: 'absolute',
    flexDirection: 'row',
    top: 200,
    left: 20,
    zIndex: 1,
  },
  tagArrow: {
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderTopColor: 'transparent',
    borderBottomWidth: 10,
    borderBottomColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: "#e8e4e4",
  },
  tagBody: {
    backgroundColor: "#e8e4e4",
    padding: 10,
    borderRadius: 10,
    marginLeft: -8,
  },
  tagText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  heartContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: '32%',
    left: '47%',
    marginLeft: -10,
    marginTop: -10,
  },
});

export default Post;
