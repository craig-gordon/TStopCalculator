import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { Font, SplashScreen, Svg } from 'expo';
import { AntDesign } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './AppNavigator';
import Splash from './Splash';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#404041',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subheader: {
    color: '#efefef',
    fontSize: 20,
    marginBottom: 100
  }
});

const AppContainer = createAppContainer(AppNavigator);

class App extends Component {
  state = {
    fontLoaded: false,
    splashOpacity: new Animated.Value(1),
    appOpacity: new Animated.Value(0)
  };

  async componentDidMount() {
    await Font.loadAsync({
      'zero-optik': require('./assets/fonts/ZeroOptik.ttf'),
      'din-round': require('./assets/fonts/DINRoundOT.ttf'),
      'din-round-bold': require('./assets/fonts/din-round-bold.ttf'),
      ...AntDesign.font
    });

    Animated.timing(this.state.splashOpacity, {
      toValue: 0,
      duration: 500
    }).start(() => {
      this.setState(
        () => ({ fontLoaded: true }),
        () => {
          Animated.spring(this.state.appOpacity, {
            toValue: 1,
            duration: 200
          }).start();
        }
      );
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#404041'
        }}
      >
        {this.state.fontLoaded ? (
          <AppContainer />
        ) : (
          <Animated.View
            style={{
              ...styles.container,
              opacity: this.state.splashOpacity
            }}
          >
            <Svg
              id='Layer_1'
              data-name='Layer 1'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 556.31 369.54'
              height={140}
              width={300}
              fill='#FFFFFF'
              style={{
                marginBottom: 50
              }}
            >
              <Svg.Path d='M106.83,174.25H6.24L70.31,36.89H16.78V9.16h96.94L50.21,146.31h56.62Z' />
              <Svg.Path d='M223.94,174.25H124.37V9.16H224.55V37.1H152.62V71.69h71.32V99.62H152.62v46.69h71.32Z' />
              <Svg.Path d='M355.67,174.25h-35.3l-53.54-69.13v69.13H238.58V9.16h36.81c17.53,0,29.23.73,35.78,2.23a45.76,45.76,0,0,1,25.57,15.49c6.62,8,10,17.82,10,29.27a47.11,47.11,0,0,1-6.82,25.27,43,43,0,0,1-19.59,16.76A65.28,65.28,0,0,1,300.49,103ZM266.83,75.77l19.71.16c11.5,0,17.26-1.33,20.06-2.44a16.89,16.89,0,0,0,8.31-6.71,19.18,19.18,0,0,0,3-10.68,18.06,18.06,0,0,0-3.06-10.3,16.53,16.53,0,0,0-7.85-6.48c-2.54-1-8.06-2.22-19.94-2.22H266.83Z' />
              <Svg.Path d='M384.91,187.41l-21.2-17.23L381.3,149.5c-14.47-15.95-21.8-35.14-21.8-57.12A87.88,87.88,0,0,1,371,48.48a83.59,83.59,0,0,1,31.48-31.74,86.6,86.6,0,0,1,43.65-11.4,88.35,88.35,0,0,1,46.92,13.11L508.33,0l21,17.41-16.13,19a81.54,81.54,0,0,1,13.36,22.38,88.38,88.38,0,0,1,6.09,32.86c0,23.94-8.44,44.55-25.1,61.25s-37.27,25.17-61.21,25.17a87,87,0,0,1-43.89-11.31Zm36.21-42.63a55.79,55.79,0,0,0,24.62,5.46,58.8,58.8,0,0,0,29.52-7.73,55.36,55.36,0,0,0,21-21,59.81,59.81,0,0,0,7.59-29.89c0-12.59-3.17-23.4-9.67-32.84ZM445.79,33.17a56.41,56.41,0,0,0-28.69,7.91,57,57,0,0,0-21.2,21.28,59.9,59.9,0,0,0-7.63,30.09c0,13.48,3.82,25,11.65,35.16l74.15-87.19A57.18,57.18,0,0,0,445.79,33.17Z' />
              <Svg.Path d='M79.12,209.86q34.55,0,57.81,23t23.27,56.74q0,33.39-23.22,56.64T80.36,369.54q-33.82,0-57.09-23.15T0,290.37a81,81,0,0,1,10.6-40.61,78.34,78.34,0,0,1,68.52-39.9Zm.67,14.78A64.88,64.88,0,0,0,24.2,257.12a65.87,65.87,0,0,0-8.49,33.21q0,27.09,18.79,45.76a61.9,61.9,0,0,0,45.29,18.67,65.05,65.05,0,0,0,32.76-8.58,61.42,61.42,0,0,0,23.5-23.48,65.92,65.92,0,0,0,8.44-33.1,64.32,64.32,0,0,0-8.44-32.74,63,63,0,0,0-23.75-23.43A64.33,64.33,0,0,0,79.79,224.64Z' />
              <Svg.Path d='M190.59,213.68h30.28q26,0,35.14,2.28a39,39,0,0,1,21.29,13.18q8.26,10,8.27,25.06t-8.06,25.06q-8.07,9.89-22.22,13.29Q245,295,216.63,295H205.78v70.7H190.59Zm15.19,14.89v51.57l25.74.31q15.6,0,22.84-2.83a23.49,23.49,0,0,0,11.37-9.18,25.48,25.48,0,0,0,4.13-14.19,25.12,25.12,0,0,0-4.13-14,22.88,22.88,0,0,0-10.91-9q-6.76-2.69-22.17-2.68Z' />
              <Svg.Path d='M300.87,228.57V213.68h83.3v14.89h-33.9V365.72h-15.5V228.57Z' />
              <Svg.Path d='M403.91,213.68h15.2v152h-15.2Z' />
              <Svg.Path d='M453.93,213.68h15.51v57.06l60.77-57.06h20.41l-73,68.22,78.71,83.82H536.07L469.44,294.9v70.82H453.93Z' />
            </Svg>
            <Text style={styles.subheader}>T-STOP CALCULATOR</Text>
          </Animated.View>
        )}
      </View>
    );
  }
}

export default App;
