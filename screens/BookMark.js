import {View ,Text} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Style from '../components/BookMarkTab/Style';
import Creater from '../components/BookMarkTab/Creater';
import Item from '../components/BookMarkTab/Item';
import Like from '../components/BookMarkTab/Like';

const Tab = createMaterialTopTabNavigator();


function BookMark(){
    return (
        <>
         <Tab.Navigator>
        <Tab.Screen name="Style" component={Style} />
        <Tab.Screen name="Creater" component={Creater}/>
        <Tab.Screen name="Item" component={Item}/>
        <Tab.Screen name="Like" component={Like}/>

        </Tab.Navigator>
        </>
    )
}

export default BookMark;