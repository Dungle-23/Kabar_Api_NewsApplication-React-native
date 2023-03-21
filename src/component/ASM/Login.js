import { View, Text, TextInput, StyleSheet, Button, TouchableOpacityBase, Image, ToastAndroid, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import customAxios from '../Context/AxiosIntance';
import { AppContext } from '../Context/AppContext';


const Login = (props) => {
    const { navigation } = props;
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isDangKy, setIsDangKy] = useState(true);
    const { setisDangNhap ,setinforUser} = useContext(AppContext);
    const login = async () => {
        try {
            const dn = await customAxios().post('auth/login', { "email": email, "password": password });

            if (dn.data.error != false) {
                await AsyncStorage.setItem('token', dn.data.token);
                console.log(dn.data.token)
                console.log(dn.data.user)
                ToastAndroid.show("Dang Nhap Thanh Cong", ToastAndroid.SHORT);
                setinforUser(dn.data.user);
                setisDangNhap(true)
            } else {
                ToastAndroid.show("Dang Nhap Khong Thanh Cong", ToastAndroid.SHORT);
            }
        } catch (e) {
            console.log(e);
        }
    }
   
    const sigup = async () => {
        
        console.log(email,password);
        try {
            const dk = await customAxios().post('users/register', { "email": email, "password": password });
            console.log(dk);
            if (dk.error == false) {
                console.log(dk.data._id)
                ToastAndroid.show("Dang Ky Thanh Cong", ToastAndroid.SHORT);
                
            }
            else {
                ToastAndroid.show("Dang Ky Khong Thanh Cong", ToastAndroid.SHORT);
            }
        } catch (e) {
            // console.log(e);

        }
    }
    return (
        <View style={{ flexDirection: 'column', margin: 25 }}>
            {isDangKy ?
                //trang dangnhap
                (<View>
                    <View style={{ width: 167, height: 144 }}>
                        <Text style={{ fontSize: 48, color: '#050505' }}>Hello <Text style={{ color: '#1877F2' }}>Again!</Text></Text>
                    </View>
                    <View style={{ width: 222, height: 60 }}>
                        <Text style={{ fontSize: 20, color: '#4E4B66', marginTop: 2 }}>Welcome back you’ve been missed</Text>
                    </View>
                </View>) : (
                    //trang dang ky
                    <View>
                        <View style={{ width: 167, }}>
                        <Text style={{ fontSize: 48, color: '#050505' }}>Kabar <Text style={{ color: '#1877F2' }}>Hello!</Text></Text>
                        </View>
                        <View style={{ width: 222, }}>
                            <Text style={{ fontSize: 20, color: '#4E4B66', marginTop: 2 }}>Signup to get Started</Text>
                        </View>
                    </View>)}


            <View style={{ marginTop: 24 }}>
                <Text style={{ color: '#4E4B66' }}>Email<Text style={{ color: '#C30052' }}>*</Text></Text>
                <TextInput style={style.input} onChangeText={setEmail}>
                  
                </TextInput>
            </View>
            <View>
                <Text style={{ color: '#4E4B66' }}>Password<Text style={{ color: '#C30052' }}>*</Text></Text>
                <TextInput style={[style.input]} onChangeText={setPassword}  >
                    
                </TextInput>

            </View>

            <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 9 }}>
                <CheckBox></CheckBox>
                <Text style={{ marginTop: 5, fontSize: 14, color: 'black' }}>Remember me </Text>
                <Text style={{ marginTop: 5, marginStart: 45, color: '#5890FF' }}>Forgot the password ?</Text>
            </View>
            {isDangKy 
            // dang ky = true = dăng ký rồi => login
                ?
                (
                    <Button style={style.button} title='Login' onPress={login}></Button>
                )
            // dang ky = false = chưa đăng ký => sigup
                :
                (
                    <Button style={[style.button]} title='Register' onPress={sigup}></Button>
                )
            }
            <Text style={{ marginStart: 100, marginTop: 5, fontSize: 14, color: 'black', marginTop: 8 }}>or continue with</Text>
            <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginTop: 8, marginBottom: 8 }}>
                <Image source={require('../ASM/Images/ButtonFacebook.png')} style={style.img} />
                <Image source={require('../ASM/Images/ButtonGoogle.png')} style={style.img} />
            </View>
            <Pressable onPress={() => { (setIsDangKy(!isDangKy)) }}>
                <Text style={{ fontSize: 14, marginStart: 60, color: '#4E4B66' }}> {isDangKy ? (<Text> don’t have an account ? Sigup</Text>) : (<Text> Already have an account ! Login</Text>)}</Text>
            </Pressable>
        </View>
    )
};
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
        width: 379,
        height: 50,
        borderRadius: 6,
        textTransform: 'lowercase'
    },
    img: {
        width: 135,
        height: 45
    }


}

)

export default Login