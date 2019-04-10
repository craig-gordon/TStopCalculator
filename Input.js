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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: { alignItems: 'center', backgroundColor: '#DDDDDD', padding: 10 }
});

export default class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      calibrationStop: '1.0',
      calibrationIndex: '0',
      calibrationReading: '',
      maxApertureReading: '',
      data
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: 'center',
            paddingTop: 30,
            paddingBottom: 30
          }}
        >
          <Image
            style={{
              width: 170,
              height: 35
            }}
            source={require('./zerooptik_logo.jpeg')}
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              flex: 1,
              fontWeight: 'bold',
              fontSize: 18
            }}
          >
            Calibration Stop
          </Text>
          <Picker
            itemStyle={{ height: 44 }}
            selectedValue={this.state.calibrationStop}
            style={{ flex: 1 }}
            onValueChange={(calibrationStop, index) =>
              this.setState({ calibrationStop, calibrationIndex: index })
            }
          >
            {fStops.map(fstop => (
              <Picker.Item key={fstop} label={fstop} value={fstop} />
            ))}
          </Picker>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              flex: 1,
              fontWeight: 'bold',
              fontSize: 18
            }}
          >
            Calibration Reading
          </Text>
          <TextInput
            style={{
              flex: 1,
              fontSize: 18
            }}
            onChangeText={calibrationReading => {
              this.setState({ calibrationReading });
            }}
            value={this.state.calibrationReading}
            placeholder="0"
          />
        </View>

        <View style={{ flexDirection: 'row', paddingBottom: 40 }}>
          <Text
            style={{
              flex: 1,
              fontWeight: 'bold',
              fontSize: 18
            }}
          >
            MAX Aperture Reading
          </Text>
          <TextInput
            style={{
              flex: 0.8,
              fontSize: 18
            }}
            onChangeText={maxApertureReading => {
              this.setState({ maxApertureReading });
            }}
            value={this.state.maxApertureReading}
            placeholder="0"
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
          title="Go see output"
          onPress={() =>
            this.props.navigation.navigate('Output', { state: this.state })
          }
        >
          <Image
            style={styles.button}
            source={require('./button_see-output.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
