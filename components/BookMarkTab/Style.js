import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions , TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const imageWidth = (windowWidth - 30) / 2; // 한 줄에 두 개의 이미지가 있으므로 가로 여백을 제외하고 20을 더해서 나누어 줍니다.

const data = [
  // 이미지 데이터 배열 예시
  { id: '1', uri: require('../../assets/splashimage.png'),usename:'Lee kihyuk' , description:'This is Cloth' , likes:'3' , comments:['31','31','23'] , imageUri:require('../../assets/splashimage.png')},
  { id: '2', uri: require('../../assets/splashimage.png') },
  { id: '3', uri: require('../../assets/splashimage.png') },
  { id: '4', uri: require('../../assets/splashimage.png') },
  { id: '5', uri: require('../../assets/splashimage.png') },
  { id: '6', uri: require('../../assets/splashimage.png') },
  { id: '7', uri: require('../../assets/splashimage.png') },
  { id: '8', uri: require('../../assets/splashimage.png') },
  // 나머지 이미지들...
];



function Style() {

    const navigation = useNavigation();
    // 각 컴포넌트 클릭시 해당 피드 페이지로 이동까지 완료. 각 컴포넌트에 데이터를 추가하여 , FeedPage에서 해당 데이터를 가지고 화면을 렌더링. 백엔드 구축이후 바로 해야함.
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('FeedPage',{data:data})}>
    <View style={styles.item}>
      <Image
        style={styles.image}
        source={item.uri}
        resizeMode="cover"
        
      />
    </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={2} // 한 줄에 두 개의 사진을 표시
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5, // 이미지 간의 간격을 조절합니다.
  },
  item: {
    width: imageWidth,
    height: imageWidth, // 이미지를 정사각형으로 표시하기 위해 높이도 설정합니다.
    margin: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%', // 이미지가 정사각형으로 표시되도록 높이를 100%로 설정합니다.
  },
});

export default Style;



// const [bookmarkedFeeds, setBookmarkedFeeds] = useState([]);

//   useEffect(() => {
//     // 백엔드에서 즐겨찾기한 피드에 대한 데이터를 가져오는 비동기 함수 호출
//     const fetchBookmarkedFeeds = async () => {
//       try {
//         // 즐겨찾기한 피드에 대한 데이터를 백엔드에서 가져오는 API 호출
//         // const response = await fetch('백엔드 API 엔드포인트');
//         // const data = await response.json();

//         // 가져온 데이터를 상태에 설정
//         // setBookmarkedFeeds(data.bookmarkedFeeds);
//         // 예시 데이터로 설정
//         setBookmarkedFeeds([
//           { id: '1', uri: require('../../assets/splashimage.png') },
//           { id: '2', uri: require('../../assets/splashimage.png') },
//           { id: '3', uri: require('../../assets/splashimage.png') },
//           { id: '4', uri: require('../../assets/splashimage.png') },
//         ]);
//       } catch (error) {
//         console.error('Error fetching bookmarked feeds:', error);
//       }
//     };

//     // 페이지가 마운트될 때 한 번만 즐겨찾기한 피드에 대한 데이터를 가져옴
//     fetchBookmarkedFeeds();
//   }, []);
// 만약 사용자가 즐겨찾기한 피드에 대한 데이터를 백엔드에서 가져와서 보여주려면, 다음과 같이 수정할 수 있습니다.

// 먼저, 즐겨찾기한 피드에 대한 데이터를 백엔드에서 가져오는 API를 호출합니다. 이 API는 사용자의 즐겨찾기한 피드에 대한 정보를 반환해야 합니다.

// 가져온 데이터를 FlatList에 전달하여 렌더링합니다. 이 때, FlatList의 data prop에는 백엔드에서 가져온 데이터를 전달합니다.

// 각 아이템을 렌더링할 때, 해당 아이템에 대한 이미지 URI를 설정합니다. 백엔드에서 가져온 데이터에는 이미지에 대한 정보가 포함되어 있어야 합니다.

// 가져온 데이터에 따라 FlatList의 아이템을 동적으로 렌더링합니다. 예를 들어, 백엔드에서 가져온 데이터가 빈 배열인 경우에는 "즐겨찾기한 피드가 없습니다"와 같은 메시지를 표시할 수 있습니다.