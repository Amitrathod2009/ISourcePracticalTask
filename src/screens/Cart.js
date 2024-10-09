import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Text, Button } from 'react-native-paper';
import { removeFromCart, updateCartQuantity } from '../redux/slice/cartSlice';
import styles from '../css/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);

  const renderCartItem = ({ item }) => (
    <Card style={[styles.marginBottom10]}>
      <Card.Cover source={{ uri: item.image }} />
      <Card.Content>
        <Text style={[styles.marginTop5]}>Title : {item.title}</Text>
        <Text style={[styles.marginTop5]}>Price : {`$${item.price}`}</Text>

        <View style={[styles.cartContainer]}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => dispatch(updateCartQuantity({ id: item.id, quantity: item.quantity - 1 }))} disabled={item.quantity <= 1}>
            <Button
              style={[styles.addBtn]}
              labelStyle={[styles.labelWhiteColor]}
            >
              -
            </Button>
          </TouchableOpacity>
          <Text>{`Quantity: ${item.quantity}`}</Text>
          <TouchableOpacity onPress={() => dispatch(updateCartQuantity({ id: item.id, quantity: item.quantity + 1 }))}>
            <Button
              style={[styles.addBtn]}
              l labelStyle={[styles.labelWhiteColor]}
            >
              +
            </Button>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => dispatch(removeFromCart(item))}>
          <Button
            style={[styles.removeBtn, styles.marginTop10]}
            labelStyle={[styles.labelPurple]}
          >
            Remove
          </Button>
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.padding10, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
      {cartItems.length === 0 ? (
        <Text style={{ textAlign: 'center', fontSize: 18 }}>
          Your cart is empty.
          <AntDesign
            name={'shoppingcart'}
            size={30}
            color={'purple'}
          />
        </Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default Cart;

