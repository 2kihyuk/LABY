import React from "react";
import { SafeAreaView, View, ScrollView, Text, } from "react-native";


function Splash2(){
    return (
        <SafeAreaView 
			style = {{
				flex: 1,
				backgroundColor: "#FFFFFF",   //container : {flex : 1,backgroundColor:"#FFFFFF"}
			}}>
			<ScrollView  
				style = {{
					flex: 1,					//innercontainer : {flex : 1 , backgroundColor:"#FFFFFF",paddingVertical:392, paddingHorizontal:126}
					backgroundColor: "#FFFFFF",
					
					paddingVertical: 392,
					paddingHorizontal: 126,
				}}>
				<Text 
					style = {{
                        textAlign:'center',
                        justifyContent:'center',
						color: "#000000",
						fontSize: 30,
                        fontWeight:'bold'
					}}>
					{"LABY"}
				</Text>
			</ScrollView>
		</SafeAreaView>
		
    )
}
export default Splash2;