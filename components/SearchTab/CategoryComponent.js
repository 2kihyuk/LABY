// import {View,Text,ImageBackground,StyleSheet , TouchableOpacity} from 'react-native';
// import {Ionicons} from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// function CategoryComponent({children,icon,size, onPress}){
//     const navigation = useNavigation();
//     return(
//         <TouchableOpacity onPress={() => navigation.navigate('CategoryDetailPage', {category:children , })}>
//          <View style = {styles.CategoryClickComponent}>
//             <Ionicons name={icon} size={size} onPress={onPress} resizeMode={'stretch'}>
//             <Text style = {styles.text}>
// 				{children}
// 			</Text>
//             </Ionicons>
// 			</View> 
//             </TouchableOpacity>
//     )
// }

// const styles = StyleSheet.create({
//     CategoryClickComponent:{
        
//     width: 100,
//     height:100,
//     backgroundColor: 'black',
//     borderColor: 'black',
//     borderWidth: 1,
//     paddingHorizontal: 19,
//     borderRadius:8,
//     marginVertical:10
                    
//     },
//     text:{
//         color: 'white',
// 		fontSize: 16,
//         alignItems: "center",
//         justifyContent:'center',
        
//     },
//     // icons:{
//     //     alignItems: "center",
// 	// 	paddingVertical: 23,
// 	// 	marginTop: 19,
//     //     justifyContent:'center'
//     // }

// })

// export default CategoryComponent;

// import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// function CategoryComponent({ children, imageUrl }) {
//     const navigation = useNavigation();
//     return (
//         <TouchableOpacity onPress={() => navigation.navigate('Category', { category: children })}>
//             <View style={styles.CategoryClickComponent}>
//             <ImageBackground source={{ uri: imageUrl }} style={styles.imageBackground}>
//                 <Text style={styles.text}>
//                     {children}
//                 </Text>
//             </ImageBackground>
//             </View>
//         </TouchableOpacity>
//     )
// }

// const styles = StyleSheet.create({
//     CategoryClickComponent: {
//         width: 105,
//         height: 105,
//         backgroundColor: '#e3e2e2',
//         paddingVertical: 5,
//         borderRadius: 8,
//         marginVertical: 5,
//         alignItems: 'center',
//         alignContent: 'center',
//         justifyContent: 'center',
//     },
//     imageBackground: {
//         width: '100%',
//         height: '100%',
//         resizeMode: 'cover',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     text: {
//         color: 'white',
//         fontWeight: 'bold',
//         fontSize: 16,
//         textAlign: 'center',
//         paddingHorizontal: 10,
//         paddingVertical: 5,
//     },
// })

// export default CategoryComponent;
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function CategoryComponent({ children, imageUrl }) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Category', { category: children })}>
            <View style={styles.CategoryClickComponent}>
                <ImageBackground source={{ uri: imageUrl }} style={styles.imageBackground}>
                </ImageBackground>
            </View>
            <Text style={styles.text}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    CategoryClickComponent: {
        width: 70,
        height: 70,
        backgroundColor: '#e3e2e2',
        paddingVertical: 5,
        marginHorizontal: 2,
        borderRadius: 8,
        marginVertical: 5,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 13,
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
})

export default CategoryComponent;