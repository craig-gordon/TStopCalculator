import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default class Output extends React.Component {
  constructor(props) {
    super(props);
    console.log('output was constructed');
  }

  render() {
    console.log('in output');
    return (
      <View style={styles.container}>
        <Text>>We have no output!</Text>
        <Button
          title="Go see output"
          onPress={() => this.props.navigation.navigate('Input')}
        />
      </View>
    );
  }
}
