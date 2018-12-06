import { Dimensions } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Colors } from './src/styles/colors';

import HomeScreen from './src/scenes/home';
import ProductScreen from './src/scenes/product';
import HistoryScreen from './src/scenes/history';
import CameraScreen from './src/scenes/camera';

let dim = Dimensions.get('window')

let screens = {
  Home: { screen: HomeScreen },
  Product: { screen: ProductScreen },
  History: { screen: HistoryScreen },
  Camera: { screen: CameraScreen },
}

let options = {
  defaultNavigationOptions: {
    initialRouteName: 'Home',
    headerStyle: {
      height: dim.height * 0.12,
      backgroundColor: Colors.darkBlue
    }
  }
}

const AppNavigator = createStackNavigator(screens, options);

export default createAppContainer(AppNavigator);