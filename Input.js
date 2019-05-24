import React from 'react';
import { data, fStops } from './data.js';

import {
  View,
  Text,
  TextInput,
  Image,
  Picker,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#404041',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 30
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20
  },
  topLabel: {
    flex: 2,
    color: '#FEFEFE',
    fontWeight: 'bold',
    fontSize: 18
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  }
});

export default class Input extends React.Component {
  state = {
    calibrationStop: '1.0',
    calibrationIndex: '0',
    calibrationReading: '',
    maxApertureReading: '',
    data
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'center',
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

        <View style={styles.topView}>
          <Text style={styles.topLabel}>Calibration Stop</Text>
          <Picker
            itemStyle={{
              height: 20
            }}
            selectedValue={this.state.calibrationStop}
            style={{
              flex: 1,
              color: '#C7C7CD',
              backgroundColor: 'transparent'
            }}
            mode='dropdown'
            onValueChange={(calibrationStop, index) =>
              this.setState({ calibrationStop, calibrationIndex: index })
            }
          >
            {fStops.map(fstop => (
              <Picker.Item key={fstop} label={fstop} value={fstop} />
            ))}
          </Picker>
        </View>

        <View style={styles.topView}>
          <Text style={styles.topLabel}>Calibration Reading</Text>
          <TextInput
            style={{
              flex: 1,
              fontSize: 18,
              color: '#C7C7CD'
            }}
            keyboardType='numeric'
            onChangeText={calibrationReading => {
              this.setState({ calibrationReading });
            }}
            value={this.state.calibrationReading}
            placeholder='0'
          />
        </View>

        <View style={styles.topView}>
          <Text style={styles.topLabel}>MAX Aperture Reading</Text>
          <TextInput
            style={{
              flex: 0.8,
              fontSize: 18,
              color: '#C7C7CD'
            }}
            keyboardType='numeric'
            onChangeText={maxApertureReading => {
              this.setState({ maxApertureReading });
            }}
            value={this.state.maxApertureReading}
            placeholder='0'
          />
        </View>

        <Text
          style={{
            color: 'grey',
            fontWeight: 'bold',
            fontSize: 18
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
        <TouchableOpacity
          style={{ alignItems: 'center', paddingTop: 50 }}
          title='See output'
          onPress={() =>
            this.props.navigation.navigate('Output', { state: this.state })
          }
        >
          <Image
            style={styles.button}
            source={require('./assets/button_see-output.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
