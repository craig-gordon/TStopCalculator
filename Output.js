import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { data } from './data.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#404041'
  },
  topLabel: {
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: 14,
    color: '#FEFEFE'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  }
});

export default class Output extends React.Component {
  state = {
    ...this.props.navigation.state.params.state
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'center',
            marginTop: 50,
            marginBottom: 50
          }}
        >
          <Image
            style={{
              width: 240,
              height: 50
            }}
            source={require('./assets/zerooptik_logo.jpeg')}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingBottom: 20
          }}
        >
          <Text style={styles.topLabel}>
            {' '}
            Max Aperture Reading
            {` ${this.state.maxApertureReading}`}
          </Text>
          <Text style={styles.topLabel}>
            Max T-Stop Calculation
            {this.state.maxApertureReading > 0
              ? ` ${Math.sqrt(
                  this.state.data[0].Reading(
                    this.state.calibrationReading,
                    this.state.calibrationIndex
                  ) / this.state.maxApertureReading
                ).toFixed(3)}`
              : null}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginBottom: 5
          }}
        >
          <Text
            style={{
              flex: 1,
              fontWeight: 'bold',
              marginLeft: 80,
              color: '#FEFEFE',
              fontSize: 16
            }}
          >
            T-Stop
          </Text>
          <Text
            style={{
              flex: 1,
              fontWeight: 'bold',
              color: '#FEFEFE',
              fontSize: 16
            }}
          >
            Target Reading
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: '#FEFEFE',
            borderBottomWidth: 1,
            marginLeft: 50,
            marginRight: 50,
            marginBottom: 2
          }}
        />
        <ScrollView>
          {data.map((item, idx) => (
            <View key={item.TStop}>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 80
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    color: idx % 3 === 0 ? '#FEFEFE' : '#ED1C24',
                    fontSize: 13,
                    fontWeight: 'bold'
                  }}
                >
                  {item.TStop}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: '#FEFEFE',
                    fontSize: 13
                  }}
                >
                  {item.Reading(
                    this.state.calibrationReading,
                    this.state.calibrationIndex
                  )}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}
