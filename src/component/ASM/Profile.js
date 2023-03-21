import { View, Text, Image, StyleSheet, TextInput, ToastAndroid, Pressable } from 'react-native'
import React, { useContext } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { AppContext } from '../Context/AppContext';
import customAxios from '../Context/AxiosIntance';

const Profile = () => {
    const navigation = useNavigation();
    const {inforUser,setinforUser} = useContext(AppContext)
    const capture = async () => {
        const resuilt = await launchCamera();
        console.log(resuilt.assets[0].uri);
        
        const formdata = new FormData();
        formdata.append('image',{
            uri: resuilt.assets[0].uri,
            type: 'image/jpeg',
            name: 'image.jpg',
        });
        const response = await customAxios('multipart/form-data').post('media/upload',formdata,);
        console.log(response.data.path);

        setinforUser({...inforUser, avatar:response.data.path})
    };
    const imageLibrary = async() =>{
        const resuilt = await launchImageLibrary();
        
        
        const formdata = new FormData();
        formdata.append('image',{
            uri: resuilt.assets[0].uri,
            type: 'image/jpeg',
            name: 'image.jpg',
        });
        const response = await customAxios('multipart/form-data').post('media/upload',formdata,);
        console.log(resuilt.assets[0].uri);
        console.log(response.data);

        setinforUser({...inforUser, avatar:response.data.path})
    }
    const updateProfile= async()=>{
        const response = await customAxios().post("users/update-profile",{name: inforUser.name,address:inforUser.address,phone:inforUser.phone,avatar:inforUser.avatar,dob:inforUser.dob})
        if(response.error==false){
            console.log("thanhcong")
            ToastAndroid.show("Cập nhật  thành công",ToastAndroid.SHORT)
            navigation.goBack();
        }
    }
    
    return (
        <View style={{ margin: 15, height: 26, flexDirection: 'column' }}>
            <Text style={{textAlign:'center',color:'green',fontSize:18,backgroundColor:'cyan',borderRadius: 10,textTransform:'uppercase',fontWeight:'bold'}}>Update Profile</Text>
            {
                inforUser.avatar == "" ? 
                (<View style={{ width: 130, height: 130, marginStart: 100, marginTop: 8 }}>
                    <Image source={require('../ASM/Images/ProfileAvatar.png')} style={{backgroundColor:'gray',width:130,height:130,borderRadius:60}}/>
                    <Pressable onPress={imageLibrary}><Image source={require('../ASM/Images/Frame.png')} style={{ marginTop: -30, marginStart: 95 }} /></Pressable>
                </View>):
                (<View style={{ width: 130, height: 130, marginStart: 100, marginTop: 8 }}>
                    <Image source={{uri:inforUser.avatar}} style={{backgroundColor:'gray'}}/>
                    <Pressable onPress={imageLibrary}><Image source={require('../ASM/Images/Frame.png')} style={{ marginTop: -30, marginStart: 95 }} /></Pressable>
                </View>)

            }
            
            <View style={{ marginTop: 2 }}>
                <Text style={{ color: '#4E4B66' }}>Họ và tên<Text style={{ color: '#C30052' }}>*</Text></Text>
                <TextInput style={style.input} value={inforUser.name} onChangeText={(text) => setinforUser({...inforUser, name:text})}/>
            </View>
            <View style={{ marginTop: 2 }}>
                <Text style={{ color: '#4E4B66' }}>Địa chỉ</Text>
                <TextInput style={style.input} value={inforUser.address} onChangeText={(text) => setinforUser({...inforUser, address:text})}/>
            </View>
            <View style={{ marginTop: 2 }}>
                <Text style={{ color: '#4E4B66' }}>Email<Text style={{ color: '#C30052' }}>*</Text></Text>
                <TextInput style={style.input} value={inforUser.email} editable={false}/>
                
            </View>
            <View style={{ marginTop: 2}}>
                <Text style={{ color: '#4E4B66' }}>Số điện thoại<Text style={{ color: '#C30052' }}>*</Text></Text>
                <TextInput style={style.input} value={inforUser.phone} onChangeText={(text) => setinforUser({...inforUser, phone:text})}/>
            </View>
            <View style={{ marginTop: 2 }}>
                <Text style={{ color: '#4E4B66' }}>Ngày sinh<Text style={{ color: '#C30052' }}>*</Text></Text>
                <TextInput style={style.input} value={inforUser.dob} onChangeText={(text) => setinforUser({...inforUser, dob:text})}/>
            </View>
            <View style={{  marginTop: 8 }}>
                <Pressable onPress={updateProfile} style={style.button}>
                    <Text style={{fontSize: 16, color: 'white',fontSize:24,marginTop:5}}>Cập nhật</Text>
                </Pressable>
            </View>
            


        </View>
    )
}
const style = StyleSheet.create({
    input: {
        height: 48,
        borderColor: '#4E4B66',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 2

    },
    button: {
        height: 50,
        borderColor: '#1877F2',
        backgroundColor: '#1877F2',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 4,
        alignItems:'center'

        ,
    }
})
export default Profile