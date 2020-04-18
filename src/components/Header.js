import React, { Component } from 'react'
import { Header, Icon, Button } from 'react-native-elements'

export default class HeaderMenu extends Component {
  hamberger = () => {
    return(
      <Button onPress={()=>this.props.data.navigation.openDrawer()} icon={{name: "menu", color: "white"}} />
    )
  }
  render() {
    return (
      <Header
        placement="left"
        leftComponent={this.hamberger()}
        centerComponent={{ text: this.props.data.route.name.toUpperCase(), style: { color: '#fff' } }}
      />
    )
  }
}

