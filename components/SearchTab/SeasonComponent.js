// import {View,Text,StyleSheet} from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// function SeasonComponent({children,icon,size,onPress}){
//     return(
//         <View style = {styles.container}>
//             <Ionicons name={icon} size={size} onPress={onPress} resizeMode={'stretch'}>
//             <Text style = {styles.text}>
// 				{children}
// 			</Text>
//             </Ionicons>
// 		</View>
//     )
// }

// const styles = StyleSheet.create({
//     container:{
        
//         width: 100,
//         height:100,
//         backgroundColor: 'black',
//         borderColor: 'black',
//         borderWidth: 1,
//         paddingHorizontal: 19,
//         borderRadius:8,
//         alignItems:'center',
//         justifyContent:'center',
            
        
//     },
//     text:{
        
//             color: 'white',
//             fontSize: 16,
//             alignItems:'center',
//             justifyContent:'center',
//             marginLeft:40
        
//     }
// })

// export default SeasonComponent;

// import React from "react";
// import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// function SeasonComponent({ children, imageUrl }) {
//     const navigation = useNavigation();

//     return (
//         <TouchableOpacity onPress={() => navigation.navigate('CategorySeason', { season: children })}>
//             <View style={styles.container}>
//                 <ImageBackground source={{ uri: imageUrl }} style={styles.imageBackground}>
//                     <Text style={styles.text}>
//                         {children}
//                     </Text>
//                 </ImageBackground>
//             </View>
//         </TouchableOpacity >
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         width: 162,
//         height: 100,
//         borderRadius: 8,
//         overflow: 'hidden'
//     },
//     imageBackground: {
//         width: '100%',
//         height: '100%',
//         resizeMode: 'cover',
//         justifyContent: 'center',
//         alignItems: 'center',
//         opacity: 0.6,
//     },
//     text: {
//         color: "#000000",
//         fontWeight: 'bold',
//         fontSize: 18,
//         textAlign: 'center',
//         paddingHorizontal: 10,
//         paddingVertical: 5
//     },
// });

// export default SeasonComponent;

import React from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function SeasonComponent({ children, imageUrl }) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('CategorySeason', { season: children })}>
            <View style={styles.container}>
                <View style={styles.CategoryClickComponent}>
                    <Text style={styles.text}>
                        {children}
                    </Text>
                </View>
            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 40,
        borderRadius: 8,
    },
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
    text: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 13,
        textAlign: 'center',
        marginTop: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
});

export default SeasonComponent;