import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Splash from '../components/Auth/Splash';
import LoginSignup from '../components/Auth/LoginSignup';
import Home from '../components/Home/Home';
import AddItem from '../components/Item/AddItem';

const stack = createStackNavigator();

const Stack = () => {
  return (
    <NavigationContainer>
      <stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Splash">
        <stack.Screen name="Splash" component={Splash} />
        <stack.Screen name="LoginSignup" component={LoginSignup} />
        <stack.Screen name="Home" component={Home} />
        <stack.Screen name="AddItem" component={AddItem} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default Stack;
