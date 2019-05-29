import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  CameraRoll
} from 'react-native';
import { takeSnapshotAsync, Permissions } from 'expo';
import { AntDesign } from '@expo/vector-icons';
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
    ...this.props.navigation.state.params.state
  };

  render() {
    return (
      <ScrollView
        ref={view => (this.pageContainer = view)}
        style={{ ...styles.container, opacity: this.props.appOpacity }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 100,
            marginBottom: 20
          }}
        >
          <Text style={styles.logo}>ZERO</Text>
          <Text style={styles.logo}>optik</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginBottom: 30
          }}
        >
          <AntDesign
            name='camera'
            size={40}
            color='#FFFFFF'
            onPress={async () => {
              const { status } = await Permissions.askAsync(
                Permissions.CAMERA_ROLL
              );
              if (status === 'granted') {
                const screenshot = await takeSnapshotAsync(this.info);
                const newScreenshotURI = await CameraRoll.saveToCameraRoll(
                  screenshot
                );
                return newScreenshotURI;
              } else {
                throw new Error('Camera Roll permission not granted');
              }
            }}
          />
        </View>
        <View
          ref={view => (this.info = view)}
          style={{ flex: 1 }}
          collapsable={false}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              flexWrap: 'wrap',
              paddingBottom: 20
            }}
          >
            <View
              style={{
                alignItems: 'center',
                marginLeft: 10,
                marginRight: 10
              }}
            >
              <Text style={styles.topLabel}>Max Aperture Reading</Text>
              <Text style={styles.topValue}>
                {this.state.maxApertureReading}
              </Text>
            </View>
            <View
              style={{
                marginBottom: 15,
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
            {this.state.lensManufacturer === '' ? null : (
              <View
                style={{
                  marginBottom: 15,
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
                  marginBottom: 15,
                  alignItems: 'center'
                }}
              >
                <Text style={styles.topLabel}>Lens Series</Text>
                <Text style={styles.topValue}>{this.state.lensSeries}</Text>
              </View>
            )}
            {this.state.nominalMaxAperture === '0' ? null : (
              <View
                style={{
                  marginBottom: 15,
                  alignItems: 'center'
                }}
              >
                <Text style={styles.topLabel}>Nominal Max Aperture</Text>
                <Text style={styles.topValue}>
                  {this.state.nominalMaxAperture}
                </Text>
              </View>
            )}
            {this.state.focalLength === '0' ? null : (
              <View
                style={{
                  marginBottom: 15,
                  alignItems: 'center'
                }}
              >
                <Text style={styles.topLabel}>Focal Length</Text>
                <Text style={styles.topValue}>{this.state.focalLength}</Text>
              </View>
            )}
            {this.state.lensSerial === '' ? null : (
              <View
                style={{
                  marginBottom: 15,
                  alignItems: 'center'
                }}
              >
                <Text style={styles.topLabel}>Lens Serial</Text>
                <Text style={styles.topValue}>{this.state.lensSerial}</Text>
              </View>
            )}
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
                marginLeft: 72,
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
                marginRight: 80,
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
              marginLeft: 50,
              marginRight: 60,
              marginBottom: 5
            }}
          />
          <View style={{ flex: 1 }}>
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
                    {item.TStop.toPrecision(4)}
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
          </View>
        </View>
      </ScrollView>
    );
  }
}
