import React from 'react';
import { data } from './data.js';
import { View, Text, ScrollView, TextInput, Image } from 'react-native';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    console.log('input was constructed', data);
    this.state = {
      f2Reading: '',
      WfoReading: '',
      data
    };
  }

  render() {
    console.log('in render of input', data);
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: 'center',
            paddingTop: 30
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
        <View style={{ flexDirection: 'row', paddingTop: 50 }}>
          <Text
            style={{
              flex: 1,
              marginLeft: 60,
              fontWeight: 'bold',
              fontSize: 18
            }}
          >
            f/2.0 Reading
          </Text>
          <Text
            style={{
              flex: 1,
              fontWeight: 'bold',
              fontSize: 18
            }}
          >
            WFO Reading
          </Text>
        </View>
        <View style={{ minHeight: 100 }}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 50
            }}
          >
            <TextInput
              style={{
                flex: 1,
                marginLeft: 100,
                fontSize: 18
              }}
              onChangeText={f2Reading => {
                this.setState({ f2Reading });
                console.log('f2Reading', f2Reading);
              }}
              value={this.state.f2Reading}
              placeholder="0"
            />
            <TextInput
              style={{
                flex: 0.8,
                fontSize: 18
              }}
              onChangeText={WfoReading => {
                this.setState({ WfoReading });
                console.log('WfoReading', WfoReading);
              }}
              value={this.state.WfoReading}
              placeholder="0"
            />
          </View>
          {this.state.WfoReading > 0 ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18
                }}
              >
                Maximum T-Stop:
                {` ${Math.sqrt(
                  this.state.data[0].Reading(this.state.f2Reading) /
                    this.state.WfoReading
                ).toFixed(3)}`}
              </Text>
            </View>
          ) : null}
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
                  {item.Reading(this.state.f2Reading)}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}
