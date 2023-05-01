import Current from './Current';
import Astro from './Astro';
import Days from './Days';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const currentName = "Home";
const astroName = "Astro";
const daysName = "Days";
const Tab = createBottomTabNavigator(); 

export default function Main() {

    const [fontsLoaded] = useFonts({
        "interfaces-regular" : require("./assets/fonts/TTInterfaces-Regular.ttf"),
        "interfaces-semi-bold" : require("./assets/fonts/TTInterfaces-DemiBold.ttf")
       })

    return (
        <NavigationContainer>
            { fontsLoaded &&
            <Tab.Navigator
            initialRouteName={currentName}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === currentName) {
                        iconName = focused ? "home-variant" : "home-variant-outline"
                    } else if (rn === astroName) {
                        iconName = focused ? "star" : "star-outline"
                    } else if (rn === daysName) {
                        iconName = focused ? "calendar" : "calendar-outline"
                    }

                    return <MaterialCommunityIcons name={iconName} size={size} color={color}/>
                },
                headerShown: false,
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "white",
                tabBarStyle: {
                    backgroundColor: "transparent",
                    borderTopWidth: 0,
                    position: 'absolute',
                    elevation: 0,
                    bottom: 10,
                },
                tabBarLabelStyle: {
                    fontFamily: "interfaces-regular"
                }
            })}>
                <Tab.Screen name={currentName} component={Current}/>
                <Tab.Screen name={astroName} component={Astro}/>
                <Tab.Screen name={daysName} component={Days}/>
            </Tab.Navigator>
            }
        </NavigationContainer>
        );
}


