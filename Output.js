import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { data } from './data.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: { alignItems: 'center', backgroundColor: '#DDDDDD', padding: 10 }
});

export default class Output extends React.Component {
  state = {
    ...this.props.navigation.state.params.state
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingTop: 40,
            paddingBottom: 20
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              alignItems: 'center',
              fontSize: 14
            }}
          >
            {' '}
            Max Aperture Reading
            {` ${this.state.maxApertureReading}`}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 14
            }}
          >
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
            backgroundColor: '#D1D1D1',
            marginBottom: 5
          }}
        >
          <Text
            style={{
              flex: 1,
              fontWeight: 'bold',
              marginLeft: 80,
              fontSize: 16
            }}
          >
            T-Stop
          </Text>
          <Text
            style={{
              flex: 1,
              fontWeight: 'bold',
              fontSize: 16
            }}
          >
            Reading
          </Text>
        </View>
        <ScrollView>
          {data.map(item => (
            <View
              key={item.TStop}
              style={{ borderBottomColor: '#F5F5F5', borderBottomWidth: 1 }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 80
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    color: 'grey',
                    fontSize: 13,
                    fontWeight: 'bold'
                  }}
                >
                  {item.TStop}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: 'grey',
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
