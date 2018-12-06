import React from 'react';
import { Text, View, Image, AsyncStorage, FlatList, TouchableWithoutFeedback } from 'react-native';

import { Header } from '../components/header';
import { styles } from '../styles/main.css';
import { styleHistory } from '../styles/history.css';

export default class HistoryScreen extends React.Component {

  static navigationOptions = {
    headerTitle: <Header title="Historique" />,
  };

  constructor(props) {
    super(props);
    this.state = { test: 'additifs' }
  }

  componentDidMount(){
    AsyncStorage.getItem("productsStored", (err, result) => {
      let productsStored = (result != null) ? productsStored = JSON.parse(result) : []
      this.setState({ 
        productsStored: productsStored,
        test: 'prouted'
      })
    })
  }

  delItem(item) {
    productsStored = this.state.productsStored
    productsStored.splice(item.index, 1)
    this.setState({
      productsStored: productsStored
    })
    AsyncStorage.setItem('productsStored', JSON.stringify(productsStored));
  }

  renderList(item) {
    let p = item.item
    return (
      <TouchableWithoutFeedback 
        onLongPress = {() => this.delItem(item)}
      >
        <View style={[styleHistory.product]}>
          <Text style={[styleHistory.name]}> - {p.product_name}</Text>    
          <Image
            resizeMode="contain"
            source={{ uri: p.image_url }}
            style={{ width: 80, height: 80 }}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.productsStored}
          renderItem={(item) => this.renderList(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}