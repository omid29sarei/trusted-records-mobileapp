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
import TSLogo from './assets/TSLogo.png';
import HeaderLogo from './components/shared/headerLogo';
import TakeSelfieInfo from './components/takeSelfieInfo';
import Verification from './components/verification';
import QRPass from './components/QRPass';

///
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/rootReducer';


const Stack = createStackNavigator()

export default function App() {
  const middleware = [
    thunk
  ]
  const store = createStore(
    rootReducer, applyMiddleware(...middleware)
  );
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
          <Stack.Screen name="Take Selfie Info" component={TakeSelfieInfo} />
          <Stack.Screen name="QR Scan Result" component={QRScanResult} />
          <Stack.Screen name="Verification" component={Verification} />
          <Stack.Screen name="QR Pass" component={QRPass} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
  }
});

