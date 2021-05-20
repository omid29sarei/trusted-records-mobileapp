import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Button } from 'react-native';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
//Custom Components
import QRReader from './components/QRScanner';
import QRScanResult from './components/QRScanResult';
import { store } from './redux/store';
import TSLogo from './assets/TSLogo.png';
import HeaderLogo from './components/shared/headerLogo';


function SuccessScreen({ route, navigation }) {
  const { data } = route.params;
  return (
    <View style={{ flex: 1, padding: 60 }}>
      {data ?
        (<Text>{data}</Text>) :
        (<Text>NO VALID DATA</Text>)
      }
    </View>
  )
}
function DettailScreen() {
  return (
    <View>
      <Text>Detail SCREEN</Text>
    </View>
  )
}

const Stack = createStackNavigator()

export default function App() {
  const defaultOptions = {
    headerStyle: {
      backgroundColor: '#1a1a1a',
      elevation: 0,
      shadowColor: "transparent",
    },
    headerTitle: () => (
      <HeaderLogo imageSrc={TSLogo} />
    ),
    headerTitleAlign: "center",
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="QR Reader" screenOptions={defaultOptions}>
          <Stack.Screen name="QR Reader" component={QRReader} />
          <Stack.Screen name="QR Scan Result" component={QRScanResult} />
          <Stack.Screen name="Detail" component={DettailScreen} />
          <Stack.Screen name="Success Screen" component={SuccessScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
  }
});

