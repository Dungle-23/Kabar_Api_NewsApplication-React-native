import { StyleSheet, Text, View, Image, TextInput, FlatList,ActivityIndicator } from 'react-native'
import React, { useContext,useState,useEffect } from 'react'
import { AppContext } from '../Context/AppContext'
import { Button } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import customAxios from '../Context/AxiosIntance'
import ItemListNews from './ItemListNews'

const MainProfile = () => {
    const { inforUser } = useContext(AppContext)
    const navigation = useNavigation()
    const [daTa, setdaTa] = useState([]);
    const [isLoading, setisLoading] = useState(true)
    useEffect(() => {
        const getMyNews = async () => {
            const response = await customAxios().get("articles/my-articles");
            if (response.error == false) {
                setdaTa(response.data);
                setisLoading(false);
                //console.log(response.data)
            } else {

            }
        }


        getMyNews();

        return () => {

        }
    }, [])

    return (
        <View style={{ margin: 10 }}>
            <View>
                <Text style={{ textAlign: 'center', color: 'black' }}>Profile</Text>
            </View>
            <View style={{ marginTop: 8, flexDirection: 'row' }}>
                <Image source={{ uri: inforUser.avatar }} style={{ backgroundColor: 'gray', width: 80, height: 80, borderRadius: 60, marginEnd: 10 }} />
                <View>
                    <Text style={styles.txt}>{inforUser.name}</Text>
                    <Text style={styles.txt}>Phone:{inforUser.phone}</Text>
                    <Text style={styles.txt} numberOfLines={2}>Email:{inforUser.email}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-around' }}>
                <Button title={"Edit profile"} style={styles.button} onPress={() => navigation.navigate('Profile')}></Button>
                <Button title={"Create news"} style={styles.button}onPress={() => navigation.navigate('PostNews')}></Button>
                <Button title={"Exit accout"} style={styles.button}></Button>
            </View>
            <Text style={{ textAlign: 'center', marginTop: 5, color: 'black' }}>My news</Text>
            <View>
            {
                    isLoading == true ? (
                    <View>
                        <ActivityIndicator size='large' color='#fff00'/>
                        
                        
                    </View>
                    ):(
                        <FlatList
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={daTa}
                        renderItem={(data) => { return <ItemListNews dulieu={data} /> }}
                        keyExtractor={item => item._id} />
                    
                    )

                }
                
            </View>
        </View>
    )
}

export default MainProfile

const styles = StyleSheet.create({
    txt: {
        color: 'black',
        fontSize: 15,
        fontWeight: '500'
    },
    button: {
        width: 100, borderRadius: 30
    }
})