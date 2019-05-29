import React from 'react';
import { data, fStops } from './data.js';
import { AntDesign } from '@expo/vector-icons';
import {
  View,
  Text,
  TextInput,
  Image,
  Picker,
  TouchableOpacity,
  StyleSheet,
  Animated
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
  logo: {
    color: '#FFFFFF',
    fontFamily: 'zero-optik',
    fontSize: 36
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20
  },
  topLabel: {
    fontFamily: 'din-round',
    flex: 2,
    color: '#FEFEFE',
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
    data,
    opacity: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.spring(this.state.opacity, {
      toValue: 1,
      duration: 300
    }).start();
  }

  render() {
    const { opacity } = this.state;
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 50,
            opacity
          }}
        >
          <Text style={styles.logo}>ZERO</Text>
          <Text style={styles.logo}>optik</Text>
        </Animated.View>

        <Animated.View style={{ ...styles.topView, opacity }}>
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
        </Animated.View>

        <Animated.View style={{ ...styles.topView, opacity }}>
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
        </Animated.View>

        <Animated.View style={{ ...styles.topView, opacity }}>
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
        </Animated.View>

        <Animated.Text
          style={{
            color: 'grey',
            fontFamily: 'din-round',
            fontSize: 18,
            opacity
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
        </Animated.Text>
        <AntDesign
          name='calculator'
          size={35}
          color='#FFFFFF'
          onPress={() =>
            this.props.navigation.navigate('Output', { state: this.state })
          }
        />
      </View>
    );
  }
}
