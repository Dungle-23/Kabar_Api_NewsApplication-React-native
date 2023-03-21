import { StyleSheet, Text, View, Image, Pressable, TextInput, ScrollView, Alert, ToastAndroid,Button } from 'react-native'
import React, { useState } from 'react'
import { Dialog, ButtonGroup, BottomSheet } from '@rneui/themed';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import customAxios from '../Context/AxiosIntance';
import { useNavigation } from '@react-navigation/native';

const PostNews = () => {
  const [imgNe,setimgNe] = useState("")
  const [titleNe,settitleNe] = useState("")
  const [contentNe,setcontentNe] = useState("")
  const navigation = useNavigation();
  const capture = async () => {
    const resuilt = await launchCamera();
    console.log(resuilt.assets[0].uri);
    const formdata = new FormData();
    formdata.append('image', {
      uri: resuilt.assets[0].uri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    const response = await customAxios('multipart/form-data').post('media/upload', formdata);
    console.log(response.data.path);
    
    if(response.error == false )
    {
      setimgNe(response.data.path);
      ToastAndroid.show("Upload thanh cong",ToastAndroid.SHORT)
    }
    else{
      ToastAndroid.show("Upload fail",ToastAndroid.SHORT)
    }
  };
  const imageLibrary = async () => {
    const resuilt = await launchImageLibrary();
    const formdata = new FormData();
    formdata.append('image', {
      uri: resuilt.assets[0].uri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    const response = await customAxios('multipart/form-data').post('media/upload', formdata,);
    console.log(resuilt.assets[0].uri);
    if(response.error == false )
    {
      setimgNe(response.data.path);
      ToastAndroid.show("Upload thanh cong",ToastAndroid.SHORT)
    }
    else{
      ToastAndroid.show("Upload fail",ToastAndroid.SHORT)
    }
  }
  
  const dangTin = async() =>{
    const response = await customAxios().post("articles",{title: titleNe,content:contentNe,image:imgNe})
    if(response.error==false){
      ToastAndroid.show("Đăng tin thành công",ToastAndroid.SHORT)
      navigation.goBack();
    }else {
      ToastAndroid.show("Đăng tin không thành công",ToastAndroid.SHORT)
    }
  }
  const [visible2, setVisible2] = useState(false);
  const toggleDialog2 = () => {
    setVisible2(!visible2);
  };

  return (

    <View style={{ margin: 10 }}>
      <Dialog
        isVisible={visible2}
        onBackdropPress={toggleDialog2}>
        <Dialog.Title title="Add Cover Photo From :" />
        <Dialog.Actions >
          <Dialog.Button title="Camera" onPress={capture} />
          <Dialog.Button title="Library" onPress={imageLibrary} />
        </Dialog.Actions>
      </Dialog>
      <View style={styles.header}>
        <Image source={require('../ASM/Images/LeftArrow.png')} />
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Create News</Text>
        <Image source={require('../ASM/Images/Dot.png')} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={toggleDialog2}>
          {
            setimgNe != " " ?
            (<Image source={require('../ASM/AddPhoto.png')} style={{ width: 340, marginTop: 16 }} />)
            :
            (<Image source={{uri:response.data.image}} style={{ width: 340, marginTop: 16 }} />)
          }
          
        </Pressable>
        <View>
          <TextInput placeholder='News title' style={{ borderBottomColor: 'gray', borderBottomWidth: 1, fontSize: 18 }} onChangeText={settitleNe} />
          <TextInput placeholder='Add News/Article' numberOfLines={12} onChangeText={setcontentNe} />
          <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', width: 218, marginLeft: 20, padding: 5, justifyContent: 'space-around', marginTop: -15 }}>
            <Pressable><Image source={require('./Images/B.png')} /></Pressable>
            <Pressable><Image source={require('./Images/I.png')} /></Pressable>
            <Pressable><Image source={require('./Images/BaGach.png')} /></Pressable>
            <Pressable><Image source={require('./Images/BaChamGach.png')} /></Pressable>
            <Pressable><Image source={require('./Images/ShareLink.png')} /></Pressable>
          </View>
        </View>
        <View style={{ borderTopWidth: 1, borderTopColor: 'gray', flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', padding: 14, backgroundColor: '#FFFFFF' }}>
            <View style={{ flexDirection: 'row', marginTop: 10}}>
              <Pressable><Image source={require('./Images/Aa.png')} style={styles.img} /></Pressable>
              <Pressable><Image source={require('./Images/Gach.png')} style={styles.img} /></Pressable>
              <Pressable><Image source={require('./Images/Anh.png')} style={styles.img} /></Pressable>
              <Pressable><Image source={require('./Images/BaChamNgang.png')} style={[styles.img, { marginTop: 7 }]} /></Pressable>
            </View>
            <View style={{ marginStart: 120 }}>
              <Button onPress={dangTin} title={"Đăng Tin"}  ></Button>
            </View>
          </View>
        </View>

      </ScrollView>

    </View>

  )
}

export default PostNews

const styles = StyleSheet.create({
  header: {

    justifyContent: 'space-between'
    , flexDirection: 'row',
    padding: 2

  },
  img: {
    marginEnd: 10
  }

})