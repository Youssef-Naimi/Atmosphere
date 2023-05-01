import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, ImageBackground } from 'react-native';
import * as Location from "expo-location"
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Octicons } from '@expo/vector-icons';
import conditions from "./weather_conditions.json";
import Card from './Card';
const img1 = require("./1.png")
const img2 = require("./2.2.png")
const img3 = require("./4.png")
const img4 = require("./6.png")
const img5 = require("./7.png")
const img6 = require("./10.png")
const img7 = require("./11.png")
const img8 = require("./14.png")
const img9 = require("./16.png")
const img10 = require("./17.png")
const img11 = require("./18.png")
const img12 = require("./22.png")
const img13 = require("./23.png")
const img14 = require("./24.png")
const img15 = require("./25.png")
const img16 = require("./26.png")
const img17 = require("./27.png")
const img18 = require("./28.png")
const img19 = require("./31.png")
const img20 = require("./35.png")



export default function Current({navigation}) {
  const [city, setCity] = useState(null);
  const [condition, setCondition] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null);
  const [day, setDay] = useState(null);
  const [check, setCheck] = useState({});
  const [degrees, setDegrees] = useState(null);
  const [wnd, setWnd] = useState(null);
  const [hum, setHum] = useState(null);
  const [hourly, setHourly] = useState([])
  const [fontsLoaded] = useFonts({
    "interfaces-regular" : require("./assets/fonts/TTInterfaces-Regular.ttf"),
    "interfaces-semi-bold" : require("./assets/fonts/TTInterfaces-DemiBold.ttf")
   })


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      let long = await location.coords.longitude
      let lat = await location.coords.latitude
      let url = 'http://api.weatherapi.com/v1/forecast.json?key=a011d09aca264cac9e0212958222312&q=' + lat + "," + long + '&days=1&aqi=no&alerts=no'
      let response = await fetch(url).then((response) => response.json())
      let condition = await response.current.condition.text
      let forecastHourly = await response.forecast.forecastday[0].hour
      let degrees = await response.current.temp_c + " °C"
      let city = await response.location.name
      let code = await response.current.condition.code
      let check = await conditions.find((item) => item.code == code)
      let isDay = await response.current.is_day
      let wnd = await response.current.wind_kph
      let hum = await response.current.humidity
      console.log(location)
      setDay(isDay)
      setDegrees(degrees)
      setCheck(check)
      setCity(city)
      setHum(hum)
      setWnd(wnd)
      setCondition(condition)
      setHourly(forecastHourly)
    })();
  }, []);

  let text = 'Waiting..';
  let dayState = null;
  let error = 'Permission to access location was denied'
  let weather = null;
  let degreesC = null;
  let place = null;
  let wind = null;
  let humidity = null
  let forecastHourly = null

  if (error !== errorMsg) {
    weather = check
    text = condition
    dayState = day
    place = "   " + city
    wind = wnd + " Km/h"
    degreesC = degrees
    humidity = hum + " %"
    forecastHourly = hourly
    console.log(weather)
 } else {
  text = errorMsg
 }
  
  return(
    <View style={styles.container}>
      <ImageBackground source={require('./assets/background1.jpg')} blurRadius={10} style={styles.img3}/>
      <View style={styles.div}>
        <Octicons name="location" size={24} color="white" style={styles.img1}/>
        {fontsLoaded && <Text style={styles.city}>{place}</Text>}
      </View>
      {fontsLoaded && <Text style={styles.txt}>{text}</Text>}
      <View>
        {fontsLoaded && <Text style={styles.temp}>Temp :</Text>}
        {fontsLoaded && <Text style={styles.wnd}>Wind Speed :</Text>}
        {fontsLoaded && <Text style={styles.hum}>Humidity :</Text>}
        <View style={styles.separator}></View>
        <View style={styles.separator1}></View>
        {fontsLoaded && <Text style={styles.degrees}>{degreesC}</Text>}
        <View style={{justifyContent: "center", alignItems: "center"}}>
          {fontsLoaded && <Text style={styles.wnspd}>{wind}</Text>}
        </View>
        {fontsLoaded && <Text style={styles.humidity}>{humidity}</Text>}
      </View>
      {
        weather.nightIcon == 1 && dayState == 0 ? <Image source={img1} style={styles.img} blurRadius={20}/> : 
        weather.nightIcon == 2.2 && dayState == 0 ? <Image source={img2} style={styles.img} blurRadius={20}/> :
        weather.icon == 4 && dayState == 1 ? <Image source={img3} style={styles.img} blurRadius={20}/> :
        weather.icon == 6 && dayState == 1 ? <Image source={img4} style={styles.img} blurRadius={20}/> :
        weather.icon == 7 ? <Image source={img5} style={styles.img} blurRadius={20}/> :
        weather.nightIcon == 10 && dayState == 0 ? <Image source={img6} style={styles.img} blurRadius={20}/> :
        weather.icon == 11 && dayState == 1 ? <Image source={img7} style={styles.img} blurRadius={20}/> :
        weather.nightIcon == 14 && dayState == 0 ? <Image source={img8} style={styles.img} blurRadius={20}/> :
        weather.icon == 16 && dayState == 1 ? <Image source={img9} style={styles.img} blurRadius={20}/> :
        weather.icon == 17 && dayState == 1 ? <Image source={img10} style={styles.img} blurRadius={20}/> :
        weather.nightIcon == 18 ? <Image source={img11} style={styles.img} blurRadius={20}/> :
        weather.nightIcon == 22 ? <Image source={img12} style={styles.img} blurRadius={20}/> :
        weather.nightIcon == 23 ? <Image source={img13} style={styles.img} blurRadius={20}/> :
        weather.nightIcon == 24 ? <Image source={img14} style={styles.img} blurRadius={20}/> :
        weather.nightIcon == 25 ? <Image source={img15} style={styles.img} blurRadius={20}/> :
        weather.icon == 26 && dayState == 1 ? <Image source={img16} style={styles.img} blurRadius={20}/> :
        weather.icon == 27 && dayState == 1 ? <Image source={img17} style={styles.img} blurRadius={20}/> :
        weather.nightIcon == 28 ? <Image source={img18} style={styles.img} blurRadius={20}/> :
        weather.nightIcon == 31 && dayState == 0 ? <Image source={img19} style={styles.img} blurRadius={20}/> :
        weather.nightIcon == 35 ? <Image source={img20} style={styles.img} blurRadius={20}/> :
        <Image source={null}/>
      }
      {
        weather.nightIcon == 1 && dayState == 0 ? <Image source={img1} style={styles.img}/> : 
        weather.nightIcon == 2.2 && dayState == 0 ? <Image source={img2} style={styles.img}/> :
        weather.icon == 4 && dayState == 1 ? <Image source={img3} style={styles.img}/> :
        weather.icon == 6 && dayState == 1 ? <Image source={img4} style={styles.img}/> :
        weather.icon == 7 ? <Image source={img5} style={styles.img}/> :
        weather.nightIcon == 10 && dayState == 0 ? <Image source={img6} style={styles.img}/> :
        weather.icon == 11 && dayState == 1 ? <Image source={img7} style={styles.img}/> :
        weather.nightIcon == 14 && dayState == 0 ? <Image source={img8} style={styles.img}/> :
        weather.icon == 16 && dayState == 1 ? <Image source={img9} style={styles.img}/> :
        weather.icon == 17 && dayState == 1 ? <Image source={img10} style={styles.img}/> :
        weather.nightIcon == 18 ? <Image source={img11} style={styles.img}/> :
        weather.nightIcon == 22 ? <Image source={img12} style={styles.img}/> :
        weather.nightIcon == 23 ? <Image source={img13} style={styles.img}/> :
        weather.nightIcon == 24 ? <Image source={img14} style={styles.img}/> :
        weather.nightIcon == 25 ? <Image source={img15} style={styles.img}/> :
        weather.icon == 26 && dayState == 1 ? <Image source={img16} style={styles.img}/> :
        weather.icon == 27 && dayState == 1 ? <Image source={img17} style={styles.img}/> :
        weather.nightIcon == 28 ? <Image source={img18} style={styles.img}/> :
        weather.nightIcon == 31 && dayState == 0 ? <Image source={img19} style={styles.img}/> :
        weather.nightIcon == 35 ? <Image source={img20} style={styles.img}/> :
        <Image source={null}/>
      }
      <View style={{position: "absolute", top: "117%", width: "100%", height: "30%"}}>
      <ScrollView horizontal={true} 
         style={styles.scrl} 
         contentContainerStyle={{height: "100%", alignItems: "center"}} 
         showsHorizontalScrollIndicator={false}>
        {
          forecastHourly.map((item) => {
          let tome = item.time.split(" ")
          let hour = tome[1]
          let int = hour.split(":")
          let t = int[0]
          let time = new Date()
          let currentHour = time.getHours()
          let code = item.condition.code
          let dayState = item.is_day
          let weather = conditions.find((item) => item.code == code)
          if (currentHour < parseInt(t)) { return(
            <View style={styles.div1}>
              {
                weather.nightIcon == 1 && dayState == 0 ? <Image source={img1} style={styles.img2}/> : 
                weather.nightIcon == 2.2 && dayState == 0 ? <Image source={img2} style={styles.img2}/> :
                weather.icon == 4 && dayState == 1 ? <Image source={img3} style={styles.img2}/> :
                weather.icon == 6 && dayState == 1 ? <Image source={img4} style={styles.img2}/> :
                weather.icon == 7 ? <Image source={img5} style={styles.img2}/> :
                weather.nightIcon == 10 && dayState == 0 ? <Image source={img6} style={styles.img2}/> :
                weather.icon == 11 && dayState == 1 ? <Image source={img7} style={styles.img2}/> :
                weather.nightIcon == 14 && dayState == 0 ? <Image source={img8} style={styles.img2}/> :
                weather.icon == 16 && dayState == 1 ? <Image source={img9} style={styles.img2}/> :
                weather.icon == 17 && dayState == 1 ? <Image source={img10} style={styles.img2}/> :
                weather.nightIcon == 18 ? <Image source={img11} style={styles.img2}/> :
                weather.nightIcon == 22 ? <Image source={img12} style={styles.img2}/> :
                weather.nightIcon == 23 ? <Image source={img13} style={styles.img2}/> :
                weather.nightIcon == 24 ? <Image source={img14} style={styles.img2}/> :
                weather.nightIcon == 25 ? <Image source={img15} style={styles.img2}/> :
                weather.icon == 26 && dayState == 1 ? <Image source={img16} style={styles.img2}/> :
                weather.icon == 27 && dayState == 1 ? <Image source={img17} style={styles.img2}/> :
                weather.nightIcon == 28 ? <Image source={img18} style={styles.img2}/> :
                weather.nightIcon == 31 && dayState == 0 ? <Image source={img19} style={styles.img2}/> :
                weather.nightIcon == 35 ? <Image source={img20} style={styles.img2}/> :
                <Image source={null}/>
              }
              <View style={styles.txtDiv}>
                {fontsLoaded && <Text style={styles.hour}>{hour}</Text>}
                {fontsLoaded && <Text style={styles.txt1}>{item.temp_c + " °C"}</Text>}
                {fontsLoaded && <Text style={styles.txt1}>{item.wind_kph + " Km/h"}</Text>}
                {fontsLoaded && <Text style={styles.txt1}>{item.humidity + " %"}</Text>}
              </View>
           </View>
          )} else {
            return
          }
          })
        }
      </ScrollView>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "60%",
    width: "100%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center"
  },
  img: {
    width: "50%",
    height: "35%",
    top: "45%",
    position: "absolute"
  },
  txt: {
    fontFamily: "interfaces-semi-bold",
    fontSize: 25,
    color: "#fff",
    top: "35%",
    position: "absolute"
  },
  degrees: {
    fontFamily: "interfaces-semi-bold",
    fontSize: 18,
    color: "#fff",
    top: 230,
    left: "-36%",
    position: "absolute"
  },
  city: {
    fontFamily: "interfaces-semi-bold",
    fontSize: 35,
    color: "#fff",
    top: 0,
  },
  div: {
    position: 'absolute',
    top: "13%",
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  img1: {
    top: 6,
  },
  temp: {
    color: "#999",
    top: 200,
    left: "-36%",
    fontFamily : "interfaces-regular",
    position: 'absolute'
  },
  separator: {
    width: 1, 
    height: 50,
    left: "-17%",
    position: 'absolute',
    top: 200,
    backgroundColor: '#999'
  },
  separator1: {
    width: 1, 
    height: 50,
    left: "17.5%",
    position: 'absolute',
    top: 200,
    backgroundColor: '#999'
  },
  wnd: {
    color: "#999",
    top: 200,
    left: "-8.75%",
    fontFamily : "interfaces-regular",
    position: 'absolute'
  },
  hum: {
    color: "#999",
    top: 200,
    left: "25%",
    fontFamily : "interfaces-regular",
    position: 'absolute'
  },
  wnspd: {
    fontFamily: "interfaces-semi-bold",
    fontSize: 18,
    color: "#fff",
    top: 230,
    position: "absolute"
  },
  humidity: {
    fontFamily: "interfaces-semi-bold",
    fontSize: 18,
    color: "#fff",
    top: 230,
    left: "27.5%",
    position: "absolute"
  },
  scrl: {
    flexGrow: 1,
    height: "30%"
  },
  img2: {
    width: "40%",
    height: "65%",
    opacity: 1,
    position: "absolute",
    left: "10%"
  },
  div1: {
      borderRadius: 25,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      height: 100,
      width: 190,
      backgroundColor: "rgba( 160, 160, 160, 0.4)",
      marginLeft: 10
  },
  txtDiv: {
      position: "absolute",
      right: "12%"
  },
  txt1: {
      color: "#fff",
      fontFamily: "interfaces-regular",
      margin: 2
  },
  hour: {
    fontFamily: "interfaces-semi-bold",
    fontSize: 20,
    color: "#fff"
  },
  img3: {
    width: "100%",
    height: "150%",
    position: 'absolute',
    zIndex: -999,
  },
});

