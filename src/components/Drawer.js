import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import ByCountryScreen from "../screens/ByCountryScreen";
import IndonesiaScreen from "../screens/IndonesiaScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AboutScreen from "../screens/AboutScreen";
const Drawer = createDrawerNavigator();

export default class MyDrawer extends Component {
  render(){
    console.log(this.props)
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Dunia">
            <Drawer.Screen name="Dunia" component={HomeScreen} />
            <Drawer.Screen name="Indonesia" component={IndonesiaScreen} />
            <Drawer.Screen name="Negara" component={ByCountryScreen} />
            <Drawer.Screen name="Tentang" component={AboutScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
