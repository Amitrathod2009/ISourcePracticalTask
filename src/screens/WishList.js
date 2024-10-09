import React from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Text, Button } from 'react-native-paper';
import { removeFromWishList } from '../redux/slice/wishListSlice';

const WishList = () => {
  const dispatch = useDispatch();
  const { wishList } = useSelector(state => state.wishList);

  const renderWishListItem = ({ item }) => (
    <Card>
      <Card.Cover source={{ uri: item.image }} />
      <Card.Content>
        <Text>{item.title}</Text>
        <Text>{`$${item.price}`}</Text>
        <Button onPress={() => dispatch(removeFromWishList(item))}>Remove</Button>
      </Card.Content>
    </Card>
  );

  return (
    <View>
      <FlatList
        data={wishList}
        renderItem={renderWishListItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default WishList;
