import React from 'react';
import { Text, View, Image, AsyncStorage, FlatList } from 'react-native';
import { RNCamera } from 'react-native-camera';

import { Header } from '../components/header';
import { styles } from '../styles/main.css';

export default class CameraScreen extends React.Component {

  waiting = false

  static navigationOptions = {
    headerTitle: <Header title="Scanner..." />,
  };

  constructor(props) {
    super(props);
  }

  fetchProduct(codebar) {
    if (this.waiting == false) {
        this.waiting = true
        console.log(codebar)
        fetch("https://fr.openfoodfacts.org/api/v0/product/" + codebar.data + ".json", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
            }
            }
        ).then((response) => response.json()
        ).then((responseData) => {
            this.waiting = false
            this.props.navigation.navigate('Product', {
            title: "responseData",
            data: responseData.product
            })
        })
    }
  }

  render() {
    return (
      <View style={styles.cameraWrap}>
        <RNCamera
            ref={ref => { this.camera = ref }}
            style = {styles.camera}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            onBarCodeRead={ (codebar) => this.fetchProduct(codebar)}
        />
      </View>
    );
  }
}