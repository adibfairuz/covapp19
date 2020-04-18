import React, { Component } from 'react'
import Header from '../components/Header'
import { View, Text, RefreshControl, ScrollView, Dimensions, ActivityIndicator } from 'react-native'
import {PieChart} from 'react-native-chart-kit'
import Axios from 'axios'

const screenWidth = Dimensions.get("window").width;
const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5
};

export default class HomeScreen extends Component {
  state = {
    confirmed: null,
    deaths: null,
    recovered: null,
    refreshing: false,
    data: []
  }
  componentDidMount(){
    this.getAll();
  }
  getAll(){
    Axios.get('https://corona.lmao.ninja/countries/indonesia')
      .then(res => {
        let temp = [];
        let {cases, deaths, recovered} = res.data;
        this.setState(
          {
            confirmed: cases,
            deaths: deaths,
            recovered: recovered,
            refreshing: false
          }
        )
        temp[0] = {
          name: "",
          population: cases-deaths-recovered,
          color: "#ffd868",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        }
        temp[1] = {
          name: "",
          population: deaths,
          color: "#d63447",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        }
        temp[2] = {
          name: "",
          population: recovered,
          color: "#a3f7bf",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        }
        return temp;
      }).then(res2 => {
        this.setState({data: res2})
      })
  }
  handleRefresh(){
    this.setState({refreshing: true})
    this.getAll();
  }
  render() {
    return (
      <View style={{flex: 1}}>
          <Header data={this.props} />
          <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={() => this.handleRefresh()} />}>
            <View style={{marginTop:27, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View style={{backgroundColor: '#ffd868', width: 70, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{fontSize: 10}}> Aktif</Text>
              </View>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View style={{backgroundColor: '#d63447', width: 70, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{fontSize: 10}}> Meninggal</Text>
              </View>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View style={{backgroundColor: '#a3f7bf', width: 70, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{fontSize: 10}}> Sembuh</Text>
              </View>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              {this.state.data.length > 0
                ? 
                <PieChart
                data={this.state.data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
              : <ActivityIndicator style={{margin: 20}} />}
            </View>
            <View style={{marginTop: 20, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{fontSize: 20}}> Total Kasus: {this.state.confirmed !== null ? this.state.confirmed : '...'} </Text>
            </View>
          </ScrollView>
      </View>
    )
  }
}

