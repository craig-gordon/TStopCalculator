import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Font } from 'expo';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './AppNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'blue'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

const AppContainer = createAppContainer(AppNavigator);

class App extends Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      'zero-optik': require('./assets/fonts/ZeroOptik.ttf'),
      'din-round': require('./assets/fonts/DINRoundOT.otf')
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.fontLoaded ? <AppContainer /> : null}
      </View>
    );
  }
}

export default App;
