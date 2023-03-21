import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppContext } from './AppContext';
import Login from '../ASM/Login';

import HomePage from '../ASM/HomePage';
import NewsDetail from '../ASM/NewsDetail'
import ItemListNews from '../ASM/ItemListNews';
import PostNews from '../ASM/PostNews';
import Profile from '../ASM/Profile';
import MainProfile from '../ASM/MainProfile';


const Tab = createBottomTabNavigator();

//list news,detail,profile,news manage =>bottom
const Main = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name='News' component={News} options={{title:"Trang Chủ"}} />
            
            <Tab.Screen name='PF' component={PF} options={{title:"Cá nhân"}}/>
        </Tab.Navigator>
    )

}

const News =()=> {
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='HomePage' component={HomePage}/>
            <Stack.Screen name= 'NewsDetail' component={NewsDetail}/>
            <Stack.Screen name='ItemListNews' component={ItemListNews}/>
        </Stack.Navigator>
    )
}

const Stack = createNativeStackNavigator();
// login, register => stack
const Users = () => {
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    )

}
const PF =() =>{
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="MainProfile" component={MainProfile}/>
            <Stack.Screen name='Profile' component={Profile}/>
            <Stack.Screen name='PostNews' component={PostNews} />
        </Stack.Navigator>
    )
}

const AppNavigator = () => {
    const { isDangNhap } = useContext(AppContext)
    return (
        <>
            {
                isDangNhap == false ? <Users /> : <Main />
            }
        </>
    );
}

export default AppNavigator