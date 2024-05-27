import React from "react";
import { SafeAreaView, View, ScrollView, Text, } from "react-native";

function Splash1(){
    return (
        <SafeAreaView 
			style = {{
				flex: 1,
				backgroundColor: "#FFFFFF",
			}}>
			<ScrollView  
				style = {{
					flex: 1,
					backgroundColor: "#000000",
					
					paddingVertical: 392,
					paddingHorizontal: 126,
				}}>
				<Text 
					style = {{
                        textAlign:'center',
                        justifyContent:'center',
						color: "#FFFFFF",
						fontSize: 30,
                        fontWeight:'bold'
					}}>
					{"LABY"}
				</Text>
			</ScrollView>
		</SafeAreaView>
		
    )
}
export default Splash1;