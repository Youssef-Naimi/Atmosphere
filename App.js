import { StatusBar } from 'expo-status-bar';
import { View, ImageBackground, StyleSheet } from 'react-native';
import Main from './Main';



export default function App() {
  return (
    <>
      <Main/>
      <StatusBar style='light'/>
    </>
  );
}
