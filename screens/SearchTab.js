// import React from "react";
// import { SafeAreaView, View, ScrollView, Image, Text, ImageBackground, StyleSheet, TextInput } from "react-native";
// import CategoryComponent from "../components/SearchTab/CategoryComponent";
// import SeasonComponent from "../components/SearchTab/SeasonComponent";
// import { Ionicons } from "@expo/vector-icons";
// import { useState } from "react";
// import { useNavigation } from '@react-navigation/native';
// //여기서 부터 작업.

// const dummyData = [
// 	{ id: 1, title: '상의 1', image: 'image-url-1', category: '상의' },
// 	{ id: 2, title: '하의 1', image: 'image-url-2', category: '하의' },
// 	{ id: 3, title: '신발 1', image: 'image-url-3', category: '신발' },
// 	// 추가적인 더미 데이터...
//   ];

// function SearchTab(){

// 	// const [category, setCategory] = useState(''); // 선택된 카테고리 상태
//   	// const [photos, setPhotos] = useState(dummyData); // 더미 데이터 상태

// 	//   const handleCategoryPress = (selectedCategory) => {
// 	// 	setCategory(selectedCategory); // 선택된 카테고리를 상태에 저장
// 	//   };
// 	//   const filteredPhotos = category ? photos.filter(photo => photo.category === category) : photos;

// 	const navigation = useNavigation();
	
// 	const [searchText, setSearchText] = useState(''); // 검색어를 저장할 상태
// 	const [searchData, setSearchData] = useState([]); // 검색 결과 데이터를 저장할 상태

// 	// 검색어 입력 핸들러 함수
// 	const handleSearchTextChange = (text) => {
// 		setSearchText(text); // 입력된 검색어를 상태에 저장
// 	  };

// 	// 검색 버튼 클릭 핸들러 함수
// 	const SearchHandler = () => {
// 		// 검색어와 검색 결과 데이터를 전달하여 SearchResult 컴포넌트에 렌더링
// 		setSearchData(searchText); // 검색어를 상태에 저장하여 SearchResult 컴포넌트로 전달

// 		navigation.navigate('SearchResult',{searchData : searchText});
// 	  };
	 

//     return (
//       <SafeAreaView style = {styles.container}>
// 			  <ScrollView style = {styles.scroll}>
// 				  <View style={styles.innercontainer}>
					
			
// 					<View style = {styles.textInputView}>
// 						<TextInput 
// 							value={searchText}
// 							onChangeText={handleSearchTextChange}
//             				placeholder="브랜드 / 스타일 / 의류 검색">
// 						</TextInput>
						
// 					</View>
// 					<Ionicons name="search" size={36} onPress={SearchHandler}/>
// 				</View>

// 				<Text 
// 					style = {styles.categorytext}>
// 					{"카테고리 검색"}
// 				</Text>

// 				<View style = {styles.categoryView}>
//          		 <CategoryComponent icon='footsteps' size={48} children={'아우터'} ></CategoryComponent>
// 				  <CategoryComponent icon='footsteps' size={48} children={'상의'} ></CategoryComponent>
// 				  <CategoryComponent icon='footsteps' size={48} children={'하의'} ></CategoryComponent>
// 				  <CategoryComponent icon='footsteps' size={48} children={'신발'} ></CategoryComponent>
// 				  <CategoryComponent icon='footsteps' size={48} children={'모자'} ></CategoryComponent>
// 				  <CategoryComponent icon='footsteps' size={48} children={'액세서리'} ></CategoryComponent>
// 				</View>

// 				<Text 
// 					style = {styles.seasontext}>
// 					{"계절별 검색"}
// 				</Text>

// 				<View style = {styles.seasonView}>
// 					<SeasonComponent icon='footsteps' size={48} children={'봄'}></SeasonComponent>
// 					<SeasonComponent icon='footsteps' size={48} children={'여름'}></SeasonComponent>
// 				</View>

// 				<View style = {styles.seasonView2}>
// 					<SeasonComponent icon='footsteps' size={48} children={'가을'}></SeasonComponent>
// 					<SeasonComponent icon='footsteps' size={48} children={'겨울'}></SeasonComponent>
// 				</View>
				
// 			</ScrollView>
// 		</SafeAreaView>
		
//     )
// }

// const styles = StyleSheet.create({
//     container:{
//       flex : 1,
//     },
//     scroll :{
    
//         flex: 1,
//         backgroundColor: "#FFFFFF",
//         // borderRadius: 30,
//         paddingVertical: 22,
//     },
//     innercontainer:{
//       	flexDirection: "row",
// 		justifyContent: "space-between",
// 		alignItems: "center",
//       	marginBottom: 56,
// 		marginHorizontal: 14,
//     },
//     textInputView :{
//       	width: 302,
// 			flexDirection: "row",
// 			justifyContent: "space-between",
// 			alignItems: "center",
// 			backgroundColor: "#F1F1F1",
// 			borderRadius: 20,
// 			paddingVertical: 4,
// 			paddingHorizontal: 9,
//     },
//     categorytext:{
      
//         color: "#000000",
//         fontSize: 24,
//         marginBottom: 27,
//         marginHorizontal: 18,
      
//     },
//     categoryView:{
//       flexDirection: "row",
// 	  flexWrap:'wrap',
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginBottom: 10,
//       marginHorizontal: 20,
	  
	  
      
//     },
// 	seasontext:{
		
// 			color: "#000000",
// 			fontSize: 24,
// 			marginBottom: 13,
// 			marginHorizontal: 26,
		
// 	},
// 	seasonView:{
		
// 			flexDirection: "row",
// 			justifyContent: "space-between",
// 			alignItems: "center",
// 			marginBottom: 21,
// 			marginHorizontal: 48,
			
		
// 	},
// 	seasonView2:{
// 		flexDirection: "row",
// 						justifyContent: "space-between",
// 						alignItems: "center",
// 						marginBottom: 45,
// 						marginHorizontal: 48,
// 	}

// })
// export default SearchTab;

//-------------------------------

import React from "react";
import { SafeAreaView, View, ScrollView, Image, Text, ImageBackground, StyleSheet, TextInput } from "react-native";
import CategoryComponent from "../components/SearchTab/CategoryComponent";
import SeasonComponent from "../components/SearchTab/SeasonComponent";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
//여기서 부터 작업.

const dummyData = [
	{ id: 1, title: '상의 1', image: 'image-url-1', category: '상의' },
	{ id: 2, title: '하의 1', image: 'image-url-2', category: '하의' },
	{ id: 3, title: '신발 1', image: 'image-url-3', category: '신발' },
	// 추가적인 더미 데이터...
];

function SearchTab() {

	// const [category, setCategory] = useState(''); // 선택된 카테고리 상태
	// const [photos, setPhotos] = useState(dummyData); // 더미 데이터 상태

	//   const handleCategoryPress = (selectedCategory) => {
	// 	setCategory(selectedCategory); // 선택된 카테고리를 상태에 저장
	//   };
	//   const filteredPhotos = category ? photos.filter(photo => photo.category === category) : photos;

	const navigation = useNavigation();

	const [searchText, setSearchText] = useState(''); // 검색어를 저장할 상태
	const [searchData, setSearchData] = useState([]); // 검색 결과 데이터를 저장할 상태

	// 검색어 입력 핸들러 함수
	const handleSearchTextChange = (text) => {
		setSearchText(text); // 입력된 검색어를 상태에 저장
	};

	// 검색 버튼 클릭 핸들러 함수
	const SearchHandler = () => {
		// 검색어와 검색 결과 데이터를 전달하여 SearchResult 컴포넌트에 렌더링
		setSearchData(searchText); // 검색어를 상태에 저장하여 SearchResult 컴포넌트로 전달

		navigation.navigate('SearchResult', { searchData: searchText });
	};


	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scroll}>
				<View style={styles.innercontainer}>
					<View style={styles.textInputView}>
						<TextInput
							value={searchText}
							onChangeText={handleSearchTextChange}
							placeholder="크리에이터, 스타일, 카테고리 등">
						</TextInput>
					</View>
					<Ionicons name="search" size={25} onPress={SearchHandler} />
				</View>

				<Text
					style={styles.categorytext}>
					{"카테고리 검색"}
				</Text>

				<View style={styles.categoryView}>
					<CategoryComponent children={'아우터'} imageUrl={"https://images.onthelook.co.kr/p/iBSEyQ5jpUoyU2564mmzVf.png?w=256&q=80&f=webp"}></CategoryComponent>
					<CategoryComponent children={'상의'} imageUrl={"https://images.onthelook.co.kr/p/h4yqTEbHSoZaReaQHDXzia.png?w=256&q=80&f=webp"}></CategoryComponent>
					<CategoryComponent children={'하의'} imageUrl={"https://images.onthelook.co.kr/p/pvBoTp84gq7WrYiQmb2awX.png?w=256&q=80&f=webp"}></CategoryComponent>
					<CategoryComponent children={'신발'} imageUrl={"https://images.onthelook.co.kr/p/eXdzQhVwE1WFWsbxKKwyqu.png?w=256&q=80&f=webp"}></CategoryComponent>
					<CategoryComponent children={'모자'} imageUrl={"https://images.onthelook.co.kr/p/8iciUostfqTtgMpW8MbYsW.png?w=256&q=80&f=webp"}></CategoryComponent>
					<CategoryComponent children={'액세서리'} imageUrl={"https://images.onthelook.co.kr/p/fBfhAAm6ZcDW27GveW55qB.png?w=256&q=80&f=webp"}></CategoryComponent>
				</View>

				<Text
					style={styles.categorytext}>
					{"계절 검색"}
				</Text>

				<View style={styles.seasonView}>
					<SeasonComponent children={'봄'} imageUrl={"https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202203/25/etoday/20220325005035025ll1e.jpeg"}></SeasonComponent>
					<SeasonComponent children={'여름'} imageUrl={"https://news.nateimg.co.kr/orgImg/kp/2021/07/16/i_a_1626408492507972w540.jpg"}></SeasonComponent>
				</View>

				<View style={styles.seasonView2}>
					<SeasonComponent children={'가을'} imageUrl={"https://thumbs.dreamstime.com/z/rz%C4%85d-%C5%BC%C3%B3%C5%82ty-ginkgo-drzewo-w-nami-wyspie-korea-80723030.jpg?w=992"}></SeasonComponent>
					<SeasonComponent children={'겨울'} imageUrl={"https://img.freepik.com/premium-photo/winter-snowcovered-alley-park-trees-snow_464654-272.jpg?w=996"}></SeasonComponent>
				</View>

			</ScrollView>
		</SafeAreaView>

	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	scroll: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		// borderRadius: 30,
		paddingVertical: 22,
	},
	innercontainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 30,
		marginHorizontal: 14,
	},
	textInputView: {
		width: 315,
		backgroundColor: "#F1F1F1",
		borderRadius: 8,
		paddingVertical: 8,
		paddingHorizontal: 10,
	},
	categorytext: {
		color: "#000000",
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
		marginHorizontal: 15,
	},
	categoryView: {
		flexDirection: "row",
		flexWrap: 'wrap',
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
		marginHorizontal: 20,
	},
	seasonView: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
		marginTop: 10,
		marginHorizontal: 20,
	},
	seasonView2: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 75,
		marginHorizontal: 20,
	}

})
export default SearchTab;