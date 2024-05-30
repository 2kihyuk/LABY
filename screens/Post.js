import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Animated, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { AntDesign, FontAwesome, Ionicons, Entypo, Feather } from '@expo/vector-icons';
import PdTag from '../components/Tag/PdTag';
import StTag from '../components/Tag/StTag';
import axios from 'axios';
import { Share } from 'react-native';
import { LOCAL, MY_IP_ADDRESS } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Post = ({ route, navigation }) => {
  const { creatorInfo } = route.params;
  const [likerId, setLikerId] = useState(null);
  const [heartFilled, setHeartFilled] = useState(false);
  const [markFilled, setMarkFilled] = useState(false);
  const [follow, setFollow] = useState(false);
  const [showTag, setShowTag] = useState(true);
  const [currentTag, setCurrentTag] = useState([]);
  const [currentStyleTag, setCurrentStyleTag] = useState({ gender: '', season: '', mood: '', category: '' });
  const [heartVisible, setHeartVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [images, setImage] = useState([]);
  const [nickname, setNickname] = useState('');
  const heartOpacity = useRef(new Animated.Value(0)).current;

  console.log(creatorInfo)

  useEffect(() => {
    const fetchLikerId = async () => {
      const id = await AsyncStorage.getItem('likerId');
      setLikerId(id);
    };

    fetchLikerId();
  }, []);

  useEffect(() => {
    if (creatorInfo && creatorInfo.lookTags) {
      try {
        const tags = JSON.parse(creatorInfo.lookTags); // JSON 문자열 파싱
        if (tags.length > 0) {
          setCurrentTag(tags); // 변경: 태그 배열로 설정
        }
      } catch (error) {
        console.error('Failed to parse tags:', error);
      }
    }
  }, [creatorInfo]);

  useEffect(() => {
    if (creatorInfo && creatorInfo.styleTags) {
      try {
        if (typeof creatorInfo.styleTags === "string" && creatorInfo.styleTags.startsWith('{')) {
          const styleTags = JSON.parse(creatorInfo.styleTags);
          setCurrentStyleTag(styleTags);
        } else {
          console.log("Received non-JSON styleTags:", creatorInfo.styleTags);
          // Handle cases where styleTags is not in JSON format
          // For instance, setting a default or error handling
        }
      } catch (error) {
        console.error('Error details:', error);
      }
    }
  }, [creatorInfo]);

  const handleShareClick = () => {
    Share.share({
      message: `Check out this post by ${creatorInfo.creatorName}: ${creatorInfo.imageUrl}`,
    })
      .then(result => console.log(result))
      .catch(error => console.log(error));
  };

  const postId = creatorInfo.id;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/laby/api/v1/comments/post/${postId}`);
        const modifiedComments = response.data.map(comment => {
          return {
            ...comment,
            commenterId: comment.commenter.nickname
          };
        });
        setComments(modifiedComments);
        // console.log('Fetched comments:', modifiedComments);
      } catch (error) {
        if (error.response) {
          console.error('Error fetching comments:', error.response.status, error.response.data);
        } else {
          console.error('Error fetching comments:', error.message);
        }
      }
    };

    fetchComments();
  }, [postId]);


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



  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/profile`);
        console.log('My.js Console : Check Data : ', response.data);
        setImage(response.data);
        setNickname(response.data.nickname);
      } catch (error) {
        console.error('Error fetching nickname:', error);
      }
    };

    fetchNickname();
  }, []);


  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        console.log('likerId: ', likerId);
        const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/laby/api/v1/hearts/liker/${likerId}`);
        const likeStatus = response.data;

        const isLiked = likeStatus.some(like => like.post.id === creatorInfo.id);
        setHeartFilled(isLiked);
      } catch (error) {
        console.error('Error fetching like status:', error);
      }
    };

    if (likerId) {
      fetchLikeStatus();
    }
  }, [likerId, creatorInfo.id]);

  useEffect(() => {
    const checkFollowStatus = async () => {
      const likerEmail = await AsyncStorage.getItem('email');
      try {
        const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/laby/api/v1/follower/check`, {
          params: {
            followerEmail: likerEmail,  //팔로우 하는 사람
            followeeEmail: creatorInfo.creatorEmail //팔로우 당하는 사람
          }
        });
        setFollow(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error('팔로우 상태 확인 실패:', error);
      }
    };

    checkFollowStatus();
  }, [creatorInfo.creatorEmail]);

  useEffect(() => {
    const checkMarkStatus = async () => {
      const bookmarkEmail = await AsyncStorage.getItem('email');
      try {
        console.log('Checking bookmark status:', {
          userEmail: bookmarkEmail,
          uploadId: creatorInfo.id,
        });
        const response = await axios.get(`http://${MY_IP_ADDRESS}:8080/api/bookmarks/status`, {
          params: {
            userEmail: bookmarkEmail,
            uploadId: creatorInfo.id,
          }
        });
        console.log('Bookmark status response:', response.data);
        setMarkFilled(response.data);
      } catch (error) {
        console.error('북마크 상태 확인 실패:', error);
      }
    };

    checkMarkStatus();
  }, [creatorInfo]);


  const handleHeartClick = async () => {
    setHeartFilled(!heartFilled);

    try {
      const params = new URLSearchParams();
      params.append('likerId', likerId);
      params.append('postId', creatorInfo.id);

      if (heartFilled) {
        await axios.delete(`http://${MY_IP_ADDRESS}:8080/laby/api/v1/hearts`, { params });
        console.log('좋아요 취소 요청 성공');

      } else {
        await axios.post(`http://${MY_IP_ADDRESS}:8080/laby/api/v1/hearts`, params);
        console.log('좋아요 추가 요청 성공');
      }
    } catch (error) {
      console.error('Error handling heart click:', error);
    }
  };


  const handleMarkClick = async () => {
    setMarkFilled(!markFilled);

    try {
      const params = new URLSearchParams();
      params.append('userEmail', likerId); //북마크 누른 사람 이메일 
      params.append('uploadId', creatorInfo.id); //게시물 id
      params.append('uploadEmail', creatorInfo.creatorEmail); //게시물의 업로드한 사람 이메일

      if (markFilled) {
        // 북마크 취소
        await axios.delete(`http://${MY_IP_ADDRESS}:8080/api/bookmarks/remove`, {
          params: {
            userEmail: likerId,
            uploadId: creatorInfo.id,
            uploadEmail: creatorInfo.creatorEmail
          }
        });
        console.log('북마크 취소 요청 성공');
      } else {
        // 북마크 추가
        await axios.post(`http://${MY_IP_ADDRESS}:8080/api/bookmarks/add`, params);
        console.log('북마크 추가 요청 성공');
      }
    } catch (error) {
      console.error('Error handling mark click:', error);
    }
  };

  const handlePostClick = async () => {
    const commentText = searchText.trim();

    if (commentText === '') {
      alert('댓글을 입력해주세요.');
      return;
    }

    console.log('댓글 등록 요청 데이터:', {
      commenterId: likerId,
      postId: creatorInfo.id,
      comment: commentText
    });

    try {
      const params = new URLSearchParams();
      params.append('commenterId', likerId);
      params.append('postId', creatorInfo.id);
      params.append('comment', commentText);

      await axios.post(`http://${MY_IP_ADDRESS}:8080/laby/api/v1/comments`, params);

      const newComment = {
        text: commentText,
        commenterId: nickname,
        postId: creatorInfo.id,
      };

      setComments(prevComments => [...prevComments, newComment]);
      setSearchText('');

      console.log('새로운 댓글:', newComment);
    } catch (error) {
      console.error('댓글 게시 실패:', error);
      alert(`댓글을 등록하는데 실패했습니다.`);
    }
  };


  const handleDeleteComment = async (commentId) => {
    Alert.alert(
      '댓글 삭제',
      '정말로 이 댓글을 삭제하시겠습니까?',
      [
        {
          text: '취소',
          onPress: () => console.log('취소되었습니다.'),
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: async () => {
            try {
              await axios.delete(`http://${MY_IP_ADDRESS}:8080/laby/api/v1/comments/${commentId}`);

              setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));

            } catch (error) {
              console.error('댓글 삭제 중 오류 발생:', error);
              alert('댓글 삭제에 실패했습니다. 다시 시도해주세요.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  //////////////////////////////////팔로우 Logic.

  const handleFollowClick = async () => {
    try {
      const likerEmail = await AsyncStorage.getItem('email');
      if (!likerEmail) {
        alert('로그인 후 다시 시도해주세요.');
        return;
      }
      const params = new URLSearchParams();
      params.append('followerEmail', likerEmail);
      params.append('followeeEmail', creatorInfo.creatorEmail);

      if (!follow) {
        // 팔로우 추가
        await axios.post(`http://${MY_IP_ADDRESS}:8080/laby/api/v1/followers`, params);
      } else {
        // 팔로우 취소 (언팔로우)
        await axios.delete(`http://${MY_IP_ADDRESS}:8080/laby/api/v1/followers`, {
          params: {
            followerEmail: likerEmail,
            followeeEmail: creatorInfo.creatorEmail
          }
        });
      }
      setFollow(!follow); // UI 업데이트
      console.log('팔로우 처리 성공');
    } catch (error) {
      console.error('팔로우 처리 실패:', error);
      alert('팔로우 요청에 실패했습니다. 다시 시도해주세요.');
    }
  };




  const handleTag = () => {
    setShowTag(!showTag);
  }

  const [lastPress, setLastPress] = useState(0);
  const [tapCount, setTapCount] = useState(0);
  const [searchText, setSearchText] = useState('');

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

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const id = creatorInfo.id;
  const handleDeletePostClick = () => {
    Alert.alert(
      '게시글 삭제',
      '정말로 이 게시글을 삭제하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: async () => {
            await axios.delete(`http://${MY_IP_ADDRESS}:8080/api/images/uploads/${id}`);
            alert('게시글이 삭제되었습니다.');
            navigation.navigate('Overview')
          }
        },
      ],
      { cancelable: false }
    );
  };


  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.profile}>
          <Image
            source={creatorInfo.creatorImage ? { uri: creatorInfo.creatorImage } : require('../assets/profile.png')}
            style={styles.creatorImage}
          />
          <View>
            <Text style={styles.name}>{creatorInfo.creatorName} <Ionicons name="checkmark-circle" size={12} color="#378aff" /></Text>
            <Text style={{ marginTop: 2, marginLeft: 7, color: 'gray' }}>{creatorInfo.creatorHeight}cmㆍ{creatorInfo.creatorWeight}kg</Text>
          </View>
          {nickname !== creatorInfo.creatorName && (
            <TouchableOpacity style={styles.follow} onPress={handleFollowClick}>
              <Text style={styles.followText}>{follow ? '팔로잉' : '팔로우'}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.deletePost} onPress={handleDeletePostClick}>
            <Entypo name="dots-three-vertical" size={18} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableWithoutFeedback onPress={handleDoubleTap}>
          <Image source={{ uri: creatorInfo.imageUrl }} style={styles.image} />
        </TouchableWithoutFeedback>
        {showTag && (
          <View style={styles.tagBox}>
            <View style={styles.tagArrow} />
            <View style={styles.tagBody}>
              {currentTag.map((tag, index) => (
                <View key={index}>
                  <Text style={styles.tagText}>{tag.brand}</Text>
                  <Text style={[{ color: '#6a6a6a', fontSize: 13 }]}>₩{tag.price}</Text>
                  <Text style={[{ color: '#378aff', fontSize: 10 }]}>{tag.size}사이즈</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        <View style={styles.icon}>
          <TouchableOpacity onPress={handleHeartClick}>
            {heartFilled ? (
              <AntDesign name="heart" size={23} color="#f95353" />
            ) : (
              <AntDesign name="hearto" size={23} color="black" />
            )}
          </TouchableOpacity>
          <View style={styles.iconSeparator} />
          <TouchableOpacity onPress={handleMarkClick}>
            {markFilled ? (
              <FontAwesome name="bookmark" size={23} color="#ffd728" />
            ) : (
              <FontAwesome name="bookmark-o" size={23} color="black" />
            )}
          </TouchableOpacity>
          <View style={styles.iconSeparator} />
          <AntDesign name="sharealt" size={23} color="black" onPress={handleShareClick} />
          <View style={styles.iconSeparator2} />
          <AntDesign name="tago" size={23} color="black" onPress={handleTag} />
        </View>
        <View style={{ flexDirection: 'row', paddingLeft: 20, marginBottom: 20 }}><Text style={{ fontWeight: 'bold' }}>{creatorInfo.creatorName}   </Text><Text>{creatorInfo.text}</Text></View>
        <View style={styles.stTag}>
          <Text style={{ color: '#bcbcbc', fontWeight: 'bold' }}>착용 제품</Text></View>
        {currentTag && currentTag.length > 0 && (
          <PdTag tags={currentTag} image={creatorInfo.imageUrl} />
        )}
        <View style={styles.stTag}>
          <Text style={{ color: '#bcbcbc', fontWeight: 'bold', marginTop: 15 }}>연관 태그</Text>
        </View>
        <View style={{ marginHorizontal: 15, marginBottom: 20 }}>
          <StTag gender={creatorInfo.gender} season={creatorInfo.season} mood={creatorInfo.mood} category={creatorInfo.category} />
        </View>
        <View style={{ marginHorizontal: 5 }}>
          <View style={{ marginHorizontal: 5 }}>
            {comments.map(comment => (
              <TouchableWithoutFeedback key={comment.id} onLongPress={() => handleDeleteComment(comment.id)}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                  <Image
                    style={styles.myComment}
                    source={
                      comment.commenterId === nickname && images.profileImageUrl
                        ? { uri: images.profileImageUrl }
                        : require('../assets/profile.png')
                    }
                    resizeMode={'stretch'}
                  />
                  <Text style={{ fontWeight: 'bold' }}>{comment.commenterId}  </Text><Text>{comment.content}{comment.text}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>
        <View style={styles.commentContainer}>
          <Image
            style={styles.myComment}
            source={
              images.profileImageUrl
                ? { uri: images.profileImageUrl }
                : require('../assets/profile.png')
            }
            resizeMode={'stretch'}
          />
          <TextInput
            style={styles.commentBox}
            onChangeText={handleSearchTextChange}
            value={searchText}
            placeholder="댓글을 입력해주세요..">
          </TextInput>
          <TouchableOpacity onPress={handlePostClick}>
            <Text style={{ color: '#378aff', fontSize: 14, marginLeft: 10 }}>등록</Text>
          </TouchableOpacity>
        </View>
        {
          heartVisible && (
            <Animated.View style={[styles.heartContainer, { opacity: heartOpacity }]}>
              <AntDesign name="heart" size={48} color="#f95353" />
            </Animated.View>
          )
        }
      </ScrollView >
    </KeyboardAvoidingView >
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
    alignItems: 'center',
    justifyContent: 'space-between',
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
  deletePost: {
    marginLeft: 210,
    marginTop: 10,
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
  },
  icon: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconSeparator: {
    marginHorizontal: 5,
    marginBottom: 50
  },
  iconSeparator2: {
    marginHorizontal: 118,
  },
  stTag: {
    marginLeft: 20,
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
  commentContainer: {
    marginVertical: 30,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  myComment: {
    borderRadius: 50,
    width: 30,
    height: 30,
    marginHorizontal: 10
  },
  commentBox: {
    width: 270,
    backgroundColor: "#f6f4f4",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});

export default Post;