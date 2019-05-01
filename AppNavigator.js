import { createStackNavigator } from 'react-navigation';
import Input from './Input';
import Output from './Output';

const AppNavigator = createStackNavigator(
  {
    Input: {
      screen: Input,
      navigationOptions: {
        header: null
      }
    },
    Output: {
      screen: Output,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Input'
  }
);

export default AppNavigator;
