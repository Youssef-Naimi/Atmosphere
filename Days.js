import * as React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";


export default function Days({navigation}) {
    return(
        <View style={styles.container}>
            <ImageBackground source={require('./assets/background1.jpg')} blurRadius={10} style={styles.img3}/>
            <Text>Days Menu</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    img3: {
        width: "100%",
        height: "150%",
        position: 'absolute',
        zIndex: -999,
      },
      container: {
        flex: 1,
        height: "60%",
        width: "100%",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center"
      },
})