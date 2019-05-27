import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#404041',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header1: {
    color: '#FFFFFF',
    fontFamily: 'zero-optik',
    fontSize: 48
  },
  header2: {
    color: '#FFFFFF',
    fontFamily: 'zero-optik',
    fontSize: 48,
    marginBottom: 40
  },
  subheader: {
    color: '#FFFFFF',
    fontSize: 20,
    marginBottom: 100
  }
});

export default class Splash extends React.Component {
  componentDidMount() {
    setTimeout(() => this.props.navigation.navigate('Input'), 500);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header1}>ZERO</Text>
        <Text style={styles.header2}>optik</Text>
        <Text style={styles.subheader}>T-STOP CALCULATOR</Text>
      </View>
    );
  }
}
