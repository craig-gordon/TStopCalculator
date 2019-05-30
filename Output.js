import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  CameraRoll
} from 'react-native';
import { takeSnapshotAsync, Permissions } from 'expo';
import { data } from './data.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#404041'
  },
  logo: {
    color: '#FFFFFF',
    fontFamily: 'zero-optik',
    fontSize: 36
  },
  topLabel: {
    fontFamily: 'din-round-bold',
    fontSize: 15,
    color: '#FEFEFE'
  },
  topValue: {
    fontFamily: 'din-round',
    fontSize: 15,
    color: '#FEFEFE'
  }
});

export default class Output extends React.Component {
  state = {
    ...this.props.navigation.state.params.state,
    buttonPressed: false,
    displaySaved: false
  };

  render() {
    return (
      <ScrollView
        ref={view => (this.pageContainer = view)}
        style={{ ...styles.container, opacity: this.props.appOpacity }}
      >
        <View
          ref={view => (this.info = view)}
          style={{ flex: 1 }}
          collapsable={false}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 100,
              marginBottom: 40
            }}
          >
            <Text style={styles.logo}>ZERO</Text>
            <Text style={styles.logo}>optik</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              flexWrap: 'wrap',
              paddingBottom: 15
            }}
          >
            {this.state.lensManufacturer === '' ? null : (
              <View
                style={{
                  marginBottom: 12,
                  alignItems: 'center'
                }}
              >
                <Text style={styles.topLabel}>Lens Manufacturer</Text>
                <Text style={styles.topValue}>
                  {this.state.lensManufacturer}
                </Text>
              </View>
            )}
            {this.state.lensSeries === '' ? null : (
              <View
                style={{
                  marginBottom: 12,
                  alignItems: 'center'
                }}
              >
                <Text style={styles.topLabel}>Lens Series</Text>
                <Text style={styles.topValue}>{this.state.lensSeries}</Text>
              </View>
            )}
            {this.state.focalLength === '' ? null : (
              <View
                style={{
                  marginBottom: 12,
                  alignItems: 'center'
                }}
              >
                <Text style={styles.topLabel}>Focal Length</Text>
                <Text style={styles.topValue}>{this.state.focalLength}</Text>
              </View>
            )}
            {this.state.nominalMaxAperture === '' ? null : (
              <View
                style={{
                  marginBottom: 12,
                  alignItems: 'center'
                }}
              >
                <Text style={styles.topLabel}>Nominal Max Aperture</Text>
                <Text style={styles.topValue}>
                  {this.state.nominalMaxAperture}
                </Text>
              </View>
            )}
            {this.state.serialNumber === '' ? null : (
              <View
                style={{
                  marginBottom: 15,
                  alignItems: 'center'
                }}
              >
                <Text style={styles.topLabel}>Serial Number</Text>
                <Text style={styles.topValue}>{this.state.serialNumber}</Text>
              </View>
            )}
          </View>
          <View
            style={{
              marginBottom: 30,
              alignItems: 'center'
            }}
          >
            <Text style={styles.topLabel}>Max T-Stop Calculation</Text>
            <Text style={styles.topValue}>
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
              alignItems: 'center',
              marginBottom: 30,
              opacity: this.state.buttonPressed ? 0.25 : 1
            }}
          >
            <TouchableOpacity
              style={{
                borderColor: '#FFFFFF',
                borderWidth: 2
              }}
              onPress={async () => {
                this.setState({ buttonPressed: true });
                const { status } = await Permissions.askAsync(
                  Permissions.CAMERA_ROLL
                );
                if (status === 'granted') {
                  const screenshot = await takeSnapshotAsync(this.info, {
                    format: 'jpg'
                  });
                  await CameraRoll.saveToCameraRoll(screenshot);

                  this.setState(
                    () => ({ displaySaved: true }),
                    () => {
                      setTimeout(
                        () =>
                          this.setState({
                            displaySaved: false,
                            buttonPressed: false
                          }),
                        4000
                      );
                    }
                  );
                } else {
                  this.setState({ buttonPressed: false });
                  throw new Error('Camera Roll permission not granted');
                }
              }}
            >
              <Text
                style={{
                  fontFamily: 'din-round-bold',
                  padding: 10,
                  color: '#FFFFFF'
                }}
              >
                {this.state.displaySaved ? 'Screenshot saved' : 'Screenshot'}
              </Text>
            </TouchableOpacity>
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
                marginLeft: 81,
                color: '#FEFEFE',
                fontSize: 16,
                fontFamily: 'din-round-bold'
              }}
            >
              T-Stop
            </Text>
            <Text
              style={{
                flex: 1,
                marginRight: 60,
                color: '#FEFEFE',
                fontSize: 16,
                fontFamily: 'din-round-bold'
              }}
            >
              Target Reading
            </Text>
          </View>
          <View
            style={{
              borderBottomColor: '#FEFEFE',
              borderBottomWidth: 1,
              marginLeft: 55,
              marginRight: 50,
              marginBottom: 5
            }}
          />
          <View style={{ flex: 1, marginBottom: 50 }}>
            {data.map((item, idx) => (
              <View key={item.TStop}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                  }}
                >
                  <Text
                    style={{
                      // flex: 1,
                      fontFamily: 'din-round',
                      color: idx % 3 === 0 ? '#FEFEFE' : '#ED1C24',
                      fontSize: 15,
                      marginLeft: 20
                    }}
                  >
                    {item.TStop.toPrecision(4)}
                  </Text>
                  <Text
                    style={{
                      // flex: 1,
                      fontFamily: 'din-round',
                      color: idx % 3 === 0 ? '#FEFEFE' : '#ED1C24',
                      fontSize: 15,
                      marginRight: 45
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
          </View>
        </View>
      </ScrollView>
    );
  }
}
