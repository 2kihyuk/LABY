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
              android_ripple={{color:Colors.primary600}}
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
        width : 270,
        height : 56
        
    },
    buttonInnercontainer : {
        backgroundColor: 'black',
      
        paddingVertical:8,
        paddingHorizontal:16,
        elevation: 2 , //Android 그림자
        
    },
    buttonText : {
        color:'white',
        textAlign:'center',
        fontSize : 20
    },
    pressed : {
        opacity : 0.75,
        
    }
})

export default PrimaryButton;