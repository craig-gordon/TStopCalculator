import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
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
  constructor(props) {
    super(props);
    this.state = { ...this.props.navigation.state.params.state };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          title="Go see input"
          onPress={() => this.props.navigation.navigate('Input')}
        />
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
              fontSize: 18
            }}
          >
            T-Stop
          </Text>
          <Text
            style={{
              flex: 1,
              fontWeight: 'bold',
              fontSize: 18
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
                    fontSize: 18,
                    fontWeight: 'bold'
                  }}
                >
                  {item.TStop}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: 'grey',
                    fontSize: 18
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
