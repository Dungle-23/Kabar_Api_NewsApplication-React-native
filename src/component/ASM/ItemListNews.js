import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React, { useState,useEffect, useContext } from 'react';
import { Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from '../Context/AppNavigator';
import { AppContext } from '../Context/AppContext';
import customAxios from '../Context/AxiosIntance';

const ItemListNews = (props) => {
  const  navigation =  useNavigation();
  const { dulieu } = props;
  const {route} = props;
  const params = route;
  const dulieu2 = dulieu.item;
  
  const Click= () => {
    navigation.navigate('NewsDetail',{id:dulieu2._id})
    console.log("click me");
  }
  const {inforUser} = useContext(AppContext)
  
  const DelNews = async() =>{
    const response = await customAxios().delete('articles/'+params.id+'delete')
    console.log(response.error);
    if(response.error==false){
      ToastAndroid.show('Xóa thành công', ToastAndroid.SHORT);
      console.log("xoa ok");
    }
  }
  
  
  
  

  // const [data, setData] = useState()
  return (
    <TouchableOpacity onPress={Click} onLongPress={DelNews} delayLongPress={3000}>
      <View style={{ flexDirection: 'row', marginBottom: 32 }}>
        <Image source={{ uri: dulieu2.image }} style={style.img} />
        <View style={{ height: 96, marginStart: 4, width: Dimensions.get('window').width - 130 }}>
          <Text style={{ fontSize: 13, fontWeight: '500', marginTop: -2, color: '#4E4B66' }}>Việt Nam</Text>
          <Text style={style.txtTitle} numberOfLines={1}>{dulieu2.title}</Text>
          <Text style={style.txtContent} numberOfLines={2}>{dulieu2.content}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Image source={{uri: inforUser.avatar}} style={style.imgAva} />
            <Text style={{ fontSize: 13, fontWeight: '600', marginEnd: 9.17, color: '#4E4B66' }}>{inforUser.name}</Text>
            <Image source={require('../ASM/Images/Clock.png')} style={style.icon} />
            <Text testID='time' style={{ fontSize: 12, fontWeight: '400', marginEnd: 80.75, color: 'black' }}>{dulieu2.createdAt}</Text>
            <Image source={require('../ASM/Images/ThreeDot.png')} style={{ color: '#4E4B66' }} />
          </View>
        </View>
      </View>
    </TouchableOpacity>


  )
}
const style = StyleSheet.create({
  img: {
    width: 96,
    height: 96,
    borderRadius: 10,

  },
  imgAva: {
    width: 20,
    height: 20,
    marginEnd: 4
  },
  icon: {
    width: 11.67,
    height: 11.67,
    marginEnd: 5.17
  },
  txtTitle: {
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 4,
    color: '#4E4B66'
  },
  txtContent: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    marginBottom: 4,

  }
})

export default ItemListNews