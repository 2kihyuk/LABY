// import {View, Text ,Pressable , StyleSheet  }from 'react-native';
// import Colors from '../constants/color';


// function PrimaryButton({children,onPress}){
   
//     return (
       
//         <View style={styles.buttonOuterContainer}>
//              <Pressable
//               style={({pressed})=>pressed 
//               ?[styles.buttonInnercontainer,styles.pressed] 
//               : styles.buttonInnercontainer} 
//               onPress={onPress} 
//               android_ripple={{color:Colors.primary600}}
//               >
//             <Text style={styles.buttonText}>{children}</Text>
//             </Pressable>
//         </View>
       
//     )
// }

// const styles = StyleSheet.create({

//     buttonOuterContainer : {
//         // borderRadius:28,
//         margin : 4,
//         overflow:'hidden',
//         width : 270,
//         height : 56
        
//     },
//     buttonInnercontainer : {
//         backgroundColor: 'black',
      
//         paddingVertical:8,
//         paddingHorizontal:16,
//         elevation: 2 , //Android 그림자
        
//     },
//     buttonText : {
//         color:'white',
//         textAlign:'center',
//         fontSize : 20
//     },
//     pressed : {
//         opacity : 0.75,
        
//     }
// })

// export default PrimaryButton;

// import {View, Text ,Pressable , StyleSheet  }from 'react-native';
// import Colors from '../constants/color';


// function PrimaryButton({children,onPress}){
   
//     return (
       
//         <View style={styles.buttonOuterContainer}>
//              <Pressable
//               style={({pressed})=>pressed 
//               ?[styles.buttonInnercontainer,styles.pressed] 
//               : styles.buttonInnercontainer} 
//               onPress={onPress} 
//               android_ripple={{color:Colors.primary600}}
//               >
//             <Text style={styles.buttonText}>{children}</Text>
//             </Pressable>
//         </View>
       
//     )
// }

// const styles = StyleSheet.create({

//     buttonOuterContainer : {
//         // borderRadius:28,
//         margin : 4,
//         overflow:'hidden',
//         width : 300,
//         height : 56
        
//     },
//     buttonInnercontainer : {
//         backgroundColor: '#b6d1da',
//         borderRadius: 30,
//         paddingVertical: 15,
//         paddingHorizontal: 19,
//         elevation: 2 , //Android 그림자
//         borderRadius: 10
//     },
//     buttonText : {
//         color:'#ffffff',
//         textAlign:'center',
//         fontWeight: 'bold',
//         fontSize : 20
//     },
//     pressed : {
//         opacity : 0.75,
        
//     }
// })

// export default PrimaryButton;

import {View, Text ,Pressable , StyleSheet  }from 'react-native';
import Colors from '../constants/color';


function PrimaryButton({children,onPress}){
   
    return (
       
        <View style={styles.buttonOuterContainer}>
             <Pressable
              style={({pressed})=>pressed 
              ?[styles.buttonInnercontainer,styles.pressed] 
              : styles.buttonInnercontainer} 
              onPress={onPress} 
              android_ripple={{color:'#bab7b7'}}
              >
            <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
       
    )
}

const styles = StyleSheet.create({

    buttonOuterContainer : {
        // borderRadius:28,
        margin : 4,
        overflow:'hidden',
        width : 300,
        height : 56
        
    },
    buttonInnercontainer : {
        backgroundColor: '#58648E',
        paddingVertical: 15,
        paddingHorizontal: 19,
        borderRadius: 10
    },
    buttonText : {
        color:'#ffffff',
        textAlign:'center',
        fontWeight: 'bold',
        fontSize : 20
    },
    pressed : {
        opacity : 0.75,
        
    }
})

export default PrimaryButton;