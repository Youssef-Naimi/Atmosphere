import { View, Text, Image, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

export default function Card(all) {
    const [fontsLoaded] = useFonts({
        "interfaces-regular" : require("./assets/fonts/TTInterfaces-Regular.ttf"),
        "interfaces-semi-bold" : require("./assets/fonts/TTInterfaces-DemiBold.ttf")
       })
    
    let temp = all.temp_c
    let wnd = all.wind_kph
    let hum = all.humidity

    return(
        <View style={styles.div}>
            <Image source={require("./1.png")} style={styles.img} blurRadius={20}/>
            <Image source={require("./1.png")} style={styles.img}/>
            <View style={styles.txtDiv}>
                {fontsLoaded && <Text style={styles.txt}>{temp}</Text>}
                {fontsLoaded && <Text style={styles.txt}>{wnd}</Text>}
                {fontsLoaded && <Text style={styles.txt}>{hum}</Text>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    img2: {
        width: "40%",
        height: "65%",
        opacity: 1,
        position: "absolute",
        left: "10%"
    },
    div1: {
        borderRadius: 25,
        position: "absolute",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        height: "25%",
        width: "50%",
        backgroundColor: "rgba( 160, 160, 160, 0.4)",
        top: "115%"
    },
    txtDiv: {
        position: "absolute",
        right: "12%"
    },
    txt1: {
        color: "#fff",
        fontFamily: "interfaces-semi-bold"
    }
})