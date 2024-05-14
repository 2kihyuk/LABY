import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import Main from './screens/Main';
import SearchTab from './screens/SearchTab';
import MY from './screens/MY';
import BookMark from './screens/BookMark';
import Upload from './screens/Upload';
import EditProfile from './screens/EditProfile';
import SearchResult from './screens/SearchResult';
import FeedPage from './screens/FeedPage';
import Login from './screens/Login';
import Authentication from './screens/Authentication';
import Post from './screens/Post';
import Category from './screens/Category';
import CategorySeason from './screens/CategorySeason';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

axios.defaults.baseURL = 'http://3.36.215.14:8080'; // API 서버 주소
axios.defaults.withCredentials = true; // 쿠키 데이터를 포함시키기 위해


export default function App() {

  function Overview({ navigation }) {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="LABY"
          component={Main}
          options={{
            headerRight: ({ color }) => (
              <Ionicons style={{
                marginRight: 18
              }}
                name="add"
                color={color}
                size={24}
                onPress={() => {
                  navigation.navigate("Upload")
                }} />
            ),

            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            )
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchTab}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" color={color} size={size} />
            )
          }}
        />
        <Tab.Screen
          name="BookMark"
          component={BookMark}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bookmark" color={color} size={size} />
            )
          }}
        />
        <Tab.Screen
          name="MyPage"
          component={MY}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="information" color={color} size={size} />
            )
          }}
        />
      </Tab.Navigator>
    )
  }


  return (
    <>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Stack.Navigator>
          {/* 추가된 로그인 화면 */}
          <Stack.Screen name='Login' component={Login}
            options={{
              headerShown: false
            }} />
          <Stack.Screen name='Authentication' component={Authentication} />

          <Stack.Screen name='Overview' component={Overview} options={{
            headerShown: false
          }} />


          {/*  메인 헤더 상단에 업로드 버튼 클릭시 업로드 페이지 */}
          <Stack.Screen name='Upload' component={Upload} />
          <Stack.Screen name='Post' component={Post}/>
          {/*  MY 페이지에서 프로필 수정 버튼 클릭시 프로필 수정 페이지 */}
          <Stack.Screen name='EditProfile' component={EditProfile} />
          {/* SearchTab 화면에서 검색어 입력후 검색버튼 클릭시 검색결과 화면 */}
          <Stack.Screen name='SearchResult' component={SearchResult} />
          {/* 각 컴포넌트 클릭시 해당 피드 페이지 화면 */}
          <Stack.Screen name='FeedPage' component={FeedPage} />
          <Stack.Screen name='Category' component={Category} />
          <Stack.Screen name='CategorySeason' component={CategorySeason} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}