import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ToastAndroid, Pressable, ActivityIndicator } from 'react-native'
import React, { useState , useEffect} from 'react'
import ItemListNews from '../ASM/ItemListNews'
import { NavigationContainer, useNavigation } from  '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axiosInstance from '../Context/AxiosIntance';

const HomePage = (props) => {
    const navigation = useNavigation();
    

    const deltail = () => {
    
   }
    const [daTa,setdaTa] = useState([]);
    const [isLoading, setisLoading] = useState(true)
    
    useEffect(() => {
      const getNews = async () => {
        const response = await axiosInstance().get("articles");
        if(response.error == false){
            setdaTa(response.data);
            setisLoading(false);
            //console.log(response.data)
        }else{

        }
      }
      
   
      getNews(); 
    
      return () => {
        
      }
    }, [])
    
    return (
        
        <View style={{ margin: 15, flex:1 }}>
            <View style={{ height: 24, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={()=>{navigation.navigate('HomePage')}}><Image source={require('../ASM/Images/Vector.png')} style={style.image} /></TouchableOpacity>
                <TouchableOpacity><Image source={require('../ASM/Images/Bell.png')} /></TouchableOpacity>
            </View>
            
            <View style={{ height: 32, flexDirection: 'row', justifyContent: 'space-around', marginTop: 16 }}>
                <TouchableOpacity><Text style={{ marginEnd: 10, color: 'black' }}>All</Text></TouchableOpacity>
                <TouchableOpacity><Text style={style.textNag}>Sports</Text></TouchableOpacity>
                <TouchableOpacity><Text style={style.textNag}>Politics</Text></TouchableOpacity>
                <TouchableOpacity><Text style={style.textNag}>Bussiness</Text></TouchableOpacity>
                <TouchableOpacity><Text style={style.textNag}>Health</Text></TouchableOpacity>
                <TouchableOpacity><Text style={style.textNag}>Travel</Text></TouchableOpacity>
                <TouchableOpacity><Text >Science</Text></TouchableOpacity>
            </View>
            <View style={[style.container]}>

                {
                    isLoading == true ? (
                    <View>
                        <ActivityIndicator size='large' color='#fff00'/>
                        <Text>Loading...</Text>
                        
                    </View>
                    ):(
                    <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={daTa}
                    renderItem={(data) => { return  <ItemListNews dulieu = {data}/>}}
                    keyExtractor={item => item._id}
                    //onRefresh={} 
                    refreshing={false}
                    />
                    
                    )

                }
                   
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    image: {
        width: 99
        , height: 30
    },
    textNag: {
        marginEnd: 10
    },
    container:{
        
        flex :1 , 
        justifyContent: 'center',
        alignItems:'center'
    }
})

export default HomePage

// const DATA =
//     [
//         {
//             "_id": "1",
//             "title": "Trường công lập đầu tiên dạy và thi chương trình dự bị đại học Mỹ",
//             "content": "Phổ thông Năng khiếu là trường công lập đầu tiên ở Việt Nam dạy và thi 6 môn của chương trình Advanced Placement (AP), thường gọi là chương trình dự bị đại học Mỹ.",
//             "image": "https://i1-vnexpress.vnecdn.net/2023/02/02/328463889-891024988600042-6177-9136-2603-1675295134.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=BCVEDMn0Smx1XLiCRi0rrA",
//             "createdAt": "2023-01-12T06:26:17.539Z",
//             "createdBy": {
//                 "_id": "63ac39aeedf7c80016c57a67",
//                 "name": "",
//                 "avatar": ""
//             }
//         },
//         {
//             "_id": "2",
//             "title": "Lịch thi đánh giá năng lực, tư duy năm 2023",
//             "content": "Các kỳ thi đánh giá năng lực, tư duy diễn ra từ tháng 3 đến 7, thí sinh có thể tham dự nhiều đợt và đăng ký từ đầu tháng 2.",
//             "image": "https://i1-vnexpress.vnecdn.net/2023/01/31/117f5804708184dfdd90-162556098-1999-1999-1675148782.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=Ie6cEqbs1YL8PDAG85QrsA",
//             "createdAt": "2023-01-12T06:26:17.539Z",
//             "createdBy": {
//                 "_id": "63ac39aeedf7c80016c57a67",
//                 "name": "",
//                 "avatar": ""
//             }
//         },
//         {
//             "_id": "3",
//             "title": "Đối phó với bài tập Tết",
//             "content": "Ngày nghỉ Tết cuối cùng, hàng chục trang bài tập Toán, Tiếng Việt và Tiếng Anh của Anh Thư được giải quyết, nhưng do mẹ và dì làm giúp.",
//             "image": "https://i1-vnexpress.vnecdn.net/2023/01/30/4313-1662984910-1675082690-4516-1675083076.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=BnjiAv8Bq8iaZcGQ2jJC3Q",
//             "createdAt": "2023-01-12T06:26:17.539Z",
//             "createdBy": {
//                 "_id": "63ac39aeedf7c80016c57a67",
//                 "name": "",
//                 "avatar": ""
//             }
//         },
//         {
//             "_id": "4",
//             "title": "Đường trở thành giáo viên ở Mỹ của một phụ nữ Việt",
//             "content": "Chị Đinh Thu Hồng phải theo học chương trình đào tạo giáo viên và hoàn thành nhiều thủ tục để được cấp phép hành nghề dạy học ở Mỹ.",
//             "image": "https://i1-vnexpress.vnecdn.net/2023/01/31/giao-vien3-7193-1674696213-167-6044-9285-1675150549.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=GJm7EfgbBZ4Pvlut0Bl1rw",
//             "createdAt": "2023-01-12T06:26:17.539Z",
//             "createdBy": {
//                 "_id": "63ac39aeedf7c80016c57a67",
//                 "name": "",
//                 "avatar": ""
//             }
//         },
//         {
//             "_id": "5",
//             "title": "Cô giáo đèo hai con giữa mưa rét, vượt 100 km đến trường",
//             "content": "Cô Nguyễn Thị Hà gây xúc động khi đèo hai con, vượt 100 km trong mưa lạnh để trở lại điểm trường ở xã Trà Dơn, huyện Nam Trà My, sau Tết.",
//             "image": "https://i1-vnexpress.vnecdn.net/2023/01/31/untitled-1675115482-6811-1675116325.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=sDv36arZmV-B6KEYjStHbA",
//             "createdAt": "2023-01-12T06:26:17.539Z",
//             "createdBy": {
//                 "_id": "63ac39aeedf7c80016c57a67",
//                 "name": "",
//                 "avatar": ""
//             }
//         },
//         {
//             "_id": "6",
//             "title": "Nam sinh trả lại hơn 40 triệu đồng nhặt được",
//             "content": "Lê Hải Thăng, 17 tuổi, được tuyên dương vì nộp lại túi nylon đựng hơn 40 triệu đồng nhặt được hôm 29 Tết.",
//             "image": "https://i1-vnexpress.vnecdn.net/2023/01/30/tuyenduongnamsinh-1675076463-2581-1675077291.jpg?w=300&h=180&q=100&dpr=1&fit=crop&s=vlqGCurXgocetWe4SYl13g",
//             "createdAt": "2023-01-12T06:26:17.539Z",
//             "createdBy": {
//                 "_id": "63ac39aeedf7c80016c57a67",
//                 "name": "",
//                 "avatar": ""
//             }
//         },
//         {
//             "_id": "7",
//             "title": "Cho con đi ngắm trăng, sao từ bé",
//             "content": "Từ khi 4 tuổi, con trai chị Hồng Anh đã được đưa đi ngắm nhật thực, mưa sao băng và tham gia câu lạc bộ thiên văn trẻ em.",
//             "image": "https://i1-vnexpress.vnecdn.net/2023/01/30/danny-kim-png-1929-1673698701-1199-6656-1675037287.png?w=300&h=180&q=100&dpr=1&fit=crop&s=uYWNW2YjIsttuhLT4s8fqQ",
//             "createdAt": "2023-01-12T06:26:17.539Z",
//             "createdBy": {
//                 "_id": "63ac39aeedf7c80016c57a67",
//                 "name": "",
//                 "avatar": ""
//             }
//         }
//     ]
