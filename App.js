import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import MyDrawer from './src/components/Drawer';
export default class App extends React.Component {

  render() {
    return (
      // <SafeAreaProvider>
      //   <SafeAreaView>
            <MyDrawer />
      //   </SafeAreaView>
      // </SafeAreaProvider>
    );
  }
}
