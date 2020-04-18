import React, { Component } from 'react'
import Header from '../components/Header'
import {Image} from 'react-native-elements'
import { View, RefreshControl, ScrollView, Text, ActivityIndicator } from 'react-native'

export default class AboutScreen extends Component {
    state = {
        refreshing: false,
    }
    currentYear(){
        const date = new Date();
        return date.getFullYear();
    }
    handleRefresh(){
        this.setState({refreshing: true})
      }
    render() {
        return (
            <View style={{flex: 1}}>
                <Header data={this.props} />
                <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={() => this.handleRefresh()} />}>
                    <View style={{paddingVertical: 20, paddingHorizontal: 18, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                        source={require('../image/covid-19.png')}
                        style={{ width: 200, height: 200, marginBottom: 30 }}
                        PlaceholderContent={<ActivityIndicator />}
                        />
                        <Text>Covapp19 adalah aplikasi untuk melihat statistik berbagai negara yang terjangkit virus corona. Data yang ada pada aplikasi ini diambil dari website "worldometers.info" yang discraping oleh NovelCOVID pada repository githubnya.</Text>
                    </View>
                </ScrollView>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{position: 'absolute', bottom: 18}}>© Copyright Adib Fairuz Ikbar {this.currentYear()}</Text>
                </View>
            </View>
        )
    }
}
