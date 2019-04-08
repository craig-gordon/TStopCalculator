import * as thing from 'react-navigation';
import Input from './Input';
import Output from './Output';

const AppNavigator = thing.createStackNavigator(
  {
    Input: { screen: Input },
    Output: { screen: Output }
  },
  {
    initialRouteName: 'Input'
  }
);

export default AppNavigator;
