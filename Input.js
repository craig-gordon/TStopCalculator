import React from 'react';
import { data, fStops } from './data.js';
import {
  View,
  Text,
  TextInput,
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
    paddingHorizontal: 50
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
    justifyContent: 'space-between',
    marginBottom: 15
  },
  topLabel: {
    fontFamily: 'din-round',
    flex: 1,
    color: '#FEFEFE',
    fontSize: 18
  },
  button: {
    borderColor: '#FFFFFF',
    borderWidth: 2
  }
});

export default class Input extends React.Component {
  state = {
    calibrationStop: '1.0',
    calibrationIndex: '',
    calibrationReading: '',
    maxApertureReading: '',
    lensManufacturer: '',
    lensSeries: '',
    focalLength: '',
    nominalMaxAperture: '',
    lensSerial: '',
    data,
    opacity: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.spring(this.state.opacity, {
      toValue: 1,
      duration: 300
    }).start();
  }

  shouldCalcBeDisabled = () => {
    return (
      this.state.calibrationReading === '' ||
      this.state.maxApertureReading === ''
    );
  };

  determineOpacity = stateValue => {
    return stateValue === '' ? 0.4 : 1;
  };

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

        <Animated.View style={{ ...styles.topView, marginBottom: 5, opacity }}>
          <Text style={styles.topLabel}>Calibration Stop</Text>
          <Picker
            selectedValue={this.state.calibrationStop}
            style={{
              flex: null,
              width: 56,
              color: '#C7C7CD',
              backgroundColor: 'transparent',
              transform: [{ translateX: 8 }]
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
              fontSize: 18,
              color: '#C7C7CD',
              textAlign: 'right',
              opacity: this.determineOpacity(this.state.calibrationReading),
              width: 100
            }}
            keyboardType='numeric'
            onChangeText={calibrationReading => {
              this.setState({ calibrationReading });
            }}
            value={this.state.calibrationReading}
            placeholder='0'
          />
        </Animated.View>

        <Animated.View style={{ ...styles.topView, marginBottom: 50, opacity }}>
          <Text style={styles.topLabel}>MAX Aperture Reading</Text>
          <TextInput
            style={{
              fontSize: 18,
              color: '#C7C7CD',
              textAlign: 'right',
              opacity: this.determineOpacity(this.state.maxApertureReading),
              width: 100
            }}
            keyboardType='numeric'
            onChangeText={maxApertureReading => {
              this.setState({ maxApertureReading });
            }}
            value={this.state.maxApertureReading}
            placeholder='0'
          />
        </Animated.View>

        <Animated.View style={{ ...styles.topView, opacity }}>
          <Text style={styles.topLabel}>Lens Manufacturer</Text>
          <TextInput
            style={{
              fontSize: 18,
              color: '#C7C7CD',
              textAlign: 'right',
              opacity: this.determineOpacity(this.state.lensManufacturer),
              width: 100
            }}
            onChangeText={lensManufacturer => {
              this.setState({ lensManufacturer });
            }}
            value={this.state.lensManufacturer}
            placeholder='none'
          />
        </Animated.View>

        <Animated.View style={{ ...styles.topView, opacity }}>
          <Text style={styles.topLabel}>Lens Series</Text>
          <TextInput
            style={{
              fontSize: 18,
              color: '#C7C7CD',
              textAlign: 'right',
              opacity: this.determineOpacity(this.state.lensSeries),
              width: 100
            }}
            onChangeText={lensSeries => {
              this.setState({ lensSeries });
            }}
            value={this.state.lensSeries}
            placeholder='none'
          />
        </Animated.View>

        <Animated.View style={{ ...styles.topView, opacity }}>
          <Text style={styles.topLabel}>Nominal Max Aperture</Text>
          <TextInput
            style={{
              fontSize: 18,
              color: '#C7C7CD',
              textAlign: 'right',
              opacity: this.determineOpacity(this.state.nominalMaxAperture),
              width: 100
            }}
            keyboardType='numeric'
            onChangeText={nominalMaxAperture => {
              this.setState({ nominalMaxAperture });
            }}
            value={this.state.nominalMaxAperture}
            placeholder='0'
          />
        </Animated.View>

        <Animated.View style={{ ...styles.topView, opacity }}>
          <Text style={styles.topLabel}>Focal Length</Text>
          <TextInput
            style={{
              fontSize: 18,
              color: '#C7C7CD',
              textAlign: 'right',
              opacity: this.determineOpacity(this.state.focalLength),
              width: 100
            }}
            keyboardType='numeric'
            onChangeText={focalLength => {
              this.setState({ focalLength });
            }}
            value={this.state.focalLength}
            placeholder='0'
          />
        </Animated.View>

        <Animated.View style={{ ...styles.topView, marginBottom: 50, opacity }}>
          <Text style={styles.topLabel}>Lens Serial</Text>
          <TextInput
            style={{
              fontSize: 18,
              color: '#C7C7CD',
              textAlign: 'right',
              opacity: this.determineOpacity(this.state.lensSerial),
              width: 100
            }}
            onChangeText={lensSerial => {
              this.setState({ lensSerial });
            }}
            value={this.state.lensSerial}
            placeholder='none'
          />
        </Animated.View>

        <TouchableOpacity
          disabled={this.shouldCalcBeDisabled()}
          style={{
            ...styles.button,
            opacity: this.shouldCalcBeDisabled() ? 0.4 : 1
          }}
          onPress={() =>
            this.props.navigation.navigate('Output', { state: this.state })
          }
        >
          <Text
            style={{
              fontFamily: 'din-round-bold',
              padding: 10,
              color: '#FFFFFF'
            }}
          >
            Calculate
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
