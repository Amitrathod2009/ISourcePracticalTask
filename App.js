import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import store from './store';
import ProductList from './src/screens/ProductList';
import ProductDetail from './src/screens/ProductDetail';
import WishList from './src/screens/WishList';
import Cart from './src/screens/Cart';
import CustomHeader from './src/components/CustomHeader';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="ProductList">
            <Stack.Screen
              name="ProductList"
              component={ProductList}
              options={{
                header: () => <CustomHeader title="Product List" />,
              }}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetail}
              options={{
                header: () => <CustomHeader title="Product Details" />,
              }}
            />
            <Stack.Screen
              name="WishList"
              component={WishList}
              options={{
                header: () => <CustomHeader title="Wish List" />,
              }}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{
                header: () => <CustomHeader title="Cart" />,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
