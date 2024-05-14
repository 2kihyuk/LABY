// // SearchResult.js
// import React from 'react';
// import { View, FlatList, Text, StyleSheet } from 'react-native';

// // 검색 결과 데이터 예시
// const DUMMYDATA = [
//   { id: 1, searchData: '브랜드A - 스타일A - 의류A' },
//   { id: 2, searchData: '브랜드B - 스타일B - 의류B' },
//   { id: 3, searchData: '브랜드C - 스타일C - 의류C' },
//   { id: 4, searchData: '브랜드A - 스타일C - 의류C' },
//   // 추가적인 데이터...
// ];

// function SearchResult({ route }) {
//   const { searchData } = route.params;

//   const renderSearchResult = ({ item }) => (
//     <View style={styles.item}>
//       <Text>{item.searchData}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={DUMMYDATA.filter(item => item.searchData.includes(searchData))} // 검색어를 포함하는 데이터만 필터링하여 표시합니다.
//         renderItem={renderSearchResult}
//         keyExtractor={item => item.id.toString()}
//         contentContainerStyle={styles.flatListContainer}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   flatListContainer: {
//     paddingVertical: 10,
//   },
//   item: {
//     flex: 1,
//     marginVertical: 5,
//     marginHorizontal: 10,
//     padding: 10,
//     borderRadius: 5,
//     backgroundColor: '#e0e0e0',
//   },
// });

// export default SearchResult;
//------------------------------------



import { React, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { creators } from '../components/List/CreaterList';
import { Ionicons } from "@expo/vector-icons";
import ImageClickable from '../components/ImageClickable';
import Filter from "../components/Filter/Filter";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from 'axios';

const Tab = createMaterialTopTabNavigator();

function SearchResultTab({ searchData, filterFunction, renderItem, numColumns }) {

  const dataToShow = creators.filter(item => filterFunction(item, searchData));

  if (dataToShow.length === 0) {
    return (
      <View style={styles.container}>
        <Ionicons name="search" size={30} color={'lightgray'} />
        <Text style={styles.noText}>검색결과가 없어요.</Text>
      </View>
    );
  }

  if (numColumns === 1) {
    return (
      <View style={styles.filterContainer}>
        <FlatList
          data={dataToShow}
          renderItem={renderItem}
          keyExtractor={item => item.name}
          contentContainerStyle={styles.flatListContainer}
          numColumns={1}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.filterContainer}>
        <FlatList
          data={dataToShow}
          renderItem={renderItem}
          keyExtractor={item => item.name}
          style={styles.flatListContainer}
          numColumns={2}
          ListHeaderComponent={<Filter />}
        />
      </View>
    );
  }
}

function StyleTab({ searchData }) {
  const filterFunction = item => {
    const { styleTag } = item;
    return styleTag && Object.values(styleTag).includes(searchData);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <ImageClickable postUrl={item.post} />
    </View>
  );

  return <SearchResultTab searchData={searchData} filterFunction={filterFunction} renderItem={renderItem} numColumns={2} />;
}

function BrandTab({ searchData }) {
  const filterFunction = item => {
    const { tag } = item;

    return tag.brand.toLowerCase().includes(searchData.toLowerCase());
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <ImageClickable postUrl={item.post} />
      <Text style={styles.brand}>{item.tag.brand}</Text>
      <Text style={styles.pdName}>{item.tag.productName}</Text>
      <Text style={styles.price}>₩{item.tag.price}</Text>
    </View>
  );

  return <SearchResultTab searchData={searchData} filterFunction={filterFunction} renderItem={renderItem} numColumns={2} />;
}

function ItemTab({ searchData }) {
  const filterFunction = item => {
    const { tag } = item;
    return Object.values(tag).some(value => {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchData.toLowerCase());
      }
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <ImageClickable postUrl={item.post} />
      <Text style={styles.brand}>{item.tag.brand}</Text>
      <Text style={styles.pdName}>{item.tag.productName}</Text>
      <Text style={styles.price}>₩{item.tag.price}</Text>
    </View>
  );

  return <SearchResultTab searchData={searchData} filterFunction={filterFunction} renderItem={renderItem} numColumns={2} />;
}

function CreatorTab({ searchData }) {
  const filterFunction = item => {
    return Object.values(item).some(value => {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchData.toLowerCase());
      }
    });
  };

  // 각 크리에이터의 팔로우 상태를 관리할 객체 생성
  const [followState, setFollowState] = useState({});

  // 팔로우 버튼 클릭 시 해당 크리에이터의 팔로우 상태를 토글하는 함수
  const handleFollowClick = (id) => {
    setFollowState(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const renderItem = ({ item }) => {
    // 각 크리에이터의 id를 기반으로 팔로우 상태 확인
    const isFollowing = followState[item.id] || false;

    return (
      <View style={styles.creatorContainer}>
        <Image
          source={{ uri: item.image }}
          resizeMode="stretch"
          style={styles.creatorImage}
        />
        <View style={styles.creatorInfo}>
          <Text style={styles.creatorName}>{item.name}</Text>
        </View>
        <TouchableOpacity style={styles.follow} onPress={() => handleFollowClick(item.id)}>
          <Text style={styles.followText}>{isFollowing ? '팔로잉' : '팔로우'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return <SearchResultTab searchData={searchData} filterFunction={filterFunction} renderItem={renderItem} numColumns={1} />;
}

function SearchResult({ route }) {
  const { searchData } = route.params;

  return (
    <Tab.Navigator>
      <Tab.Screen name="Style">
        {() => <StyleTab searchData={searchData} />}
      </Tab.Screen>
      <Tab.Screen name="Brand">
        {() => <BrandTab searchData={searchData} />}
      </Tab.Screen>
      <Tab.Screen name="Item">
        {() => <ItemTab searchData={searchData} />}
      </Tab.Screen>
      <Tab.Screen name="Creator">
        {() => <CreatorTab searchData={searchData} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: "center",
    paddingTop: 200
  },
  filterContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  noText: {
    color: "gray",
    marginTop: 10
  },
  flatListContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 10
  },
  item: {
    flex: 1,
    backgroundColor: 'white',
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 5,
    minWidth: '45%',
  },
  creatorContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  creatorInfo: {
    marginLeft: 10,
  },
  creatorImage: {
    marginLeft: 25,
    marginBottom: 10,
    borderRadius: 50,
    width: 52,
    height: 52,
  },
  creatorName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  follow: {
    height: 30,
    borderRadius: 10,
    paddingHorizontal: 17,
    backgroundColor: '#378aff',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    right: 22,
    top: '50%',
    transform: [{ translateY: -17 }],
  },
  followText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15
  },
  brand: {
    marginHorizontal: 10,
    marginVertical: 3,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 17
  },
  pdName: {
    marginHorizontal: 10,
    marginVertical: 3
  },
  price: {
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginVertical: 3
  }
});

export default SearchResult;