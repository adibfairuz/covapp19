import React, { Component } from 'react';
import { Table, Row, Rows } from 'react-native-table-component';
import Header from '../components/Header'
import { View, StyleSheet, RefreshControl, ScrollView, ActivityIndicator } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown';
import {Icon} from 'react-native-elements'
import Axios from 'axios'

export default class ByCountryScreen extends Component {
  state = {
    tableHead: ['Negara', <Icon type="material-community" name="hospital" />, <Icon type="foundation" name="skull" />, <Icon type="materiallicons" name="healing" />],
    tableData: [],
    country: [],
    refreshing: false,
    selected: ''
  }

  componentDidMount(){
    this.getAll();
    this.getCountry()
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.selected !== this.state.selected) {
        this.getByCountry();
    }
  }

  getAll(){
    this.setState({tableData: []})
    let temp = [];
    Axios.get('https://corona.lmao.ninja/countries')
      .then(res => {
        res.data.map((arr, index) => {
            temp[index] = [arr.country, arr.cases, arr.deaths, arr.recovered];
        })
        return temp
      })
      .then(res2 => {
        this.setState({tableData: res2, refreshing: false})
      })
  }

  getByCountry(){
    if (this.state.selected !== '') {
        this.setState({tableData: []})
        let temp = [];
        Axios.get('https://corona.lmao.ninja/countries/'+this.state.selected)
          .then(res => {
            let {country, cases, deaths, recovered} = res.data;
            temp = [country, cases, deaths, recovered];
            this.setState({tableData: [temp]})
          })
    }
  }

  handleRefresh(){
    this.setState({selected: '', refreshing: true})
    this.getAll();
  }

  handleDropdown = (e) => {
    this.setState({selected: e})
  }


  getCountry(){
    Axios.get('https://covid19.mathdro.id/api/countries')
      .then(res => {
        let data = res.data.countries
        let temp = []
        let i = 0;
        for (const country in data) {
          temp[i] = {value: country}
          i++          
        }
        this.setState({country: temp})
      })
  }
 
  render() {
    return (
        <View style={{flex: 1}}>
          <Header data={this.props} />
          <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={() => this.handleRefresh()} />}>
          <View style={{flex: 1, padding: 16, paddingTop: 10}}>
                <Dropdown
                    label='Pilih Negara'
                    data={this.state.country}
                    onChangeText={this.handleDropdown}
                    value={this.state.selected}
                />
            </View>
            <View style={styles.container}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
                <Rows data={this.state.tableData} textStyle={styles.text}/>
                </Table>
            </View>
            {this.state.tableData.length == 0 ? 
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            : null}
      </ScrollView>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 20 },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});