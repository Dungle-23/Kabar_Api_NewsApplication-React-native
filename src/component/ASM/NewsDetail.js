import { ScrollView, StyleSheet, Text, View, Image, Pressable, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import customAxios from '../Context/AxiosIntance';

const NewsDetail = (props) => {
  const { navigation } = props;
  const { route } = props;
  const { params } = route;
  const [isLoading, setisLoading] = useState(true)
  const [imgUrl, setimgUrl] = useState();
  const [title, settitle] = useState()
  const [content, setcontent] = useState()
  const back = () => {
    navigation.goBack();
  }
  useEffect(() => {
    const GetDetail = async () => {
      const response = await customAxios().get('articles/' + params.id + '/detail')
      console.log(response.data)

      if (response.error == false) {
        setcontent(response.data[0].content)
        settitle(response.data[0].title)
        setimgUrl(response.data[0].image)
        
        setisLoading(false);
      } else {
        ToastAndroid.show('Lấy dữ liệu thất bại', ToastAndroid.SHORT);
      }

    }

    GetDetail();

    return () => {

    }
  }, [])


  return (
    <>
      {
        isLoading == true ? (
          <View style={styles.viewner}>
            <ActivityIndicator size='large' color='#fff00' />
            <Text>Loading...</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20.22 }}>
              <Pressable onPress={back}><Image source={require('../ASM/Images/LeftArrow.png')} /></Pressable>
              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../ASM/Images/Share.png')} style={{ marginEnd: 10 }} />
                <Image source={require('../ASM/Images/Dot.png')} style={{ marginTop: 2 }} />
              </View>
            </View>

            <Image style={styles.image} source={{ uri: imgUrl }} />
            <View>
              <Text style={styles.txt2}>Việt Nam</Text>
              <Text style={styles.txtTitle}>{title}</Text>
              <Text style={styles.txt3}>{content}</Text>

            </View>
          </ScrollView>
        )
      }
    </>
  )
}

export default NewsDetail

const styles = StyleSheet.create({
  viewner: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    margin: 15
  },
  image: {
    width: 380,
    height: 248,
    marginBottom: 16
  },
  imageAvar: {
    width: 50,
    height: 50,
    marginEnd: 4
  }
  , txt1: {
    fontSize: 16,
    fontWeight: '600'
    , color: 'black'
  },
  txtTitle: {
    fontSize: 24,
    color: 'black',
    fontWeight: '400',
    marginBottom: 16
  }, txt2: {
    fontSize: 14,
    color: '#4E4B66'
  }, txt3: {
    fontWeight: '400', color: '#4E4B66',
    fontSize: 16,
    marginBottom: 20
  },
  navBottom: {
    height: 78
    , margin: -15,
    width: 428
  }
})