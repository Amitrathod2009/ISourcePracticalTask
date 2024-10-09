import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slice/productSlice';
import { Card, Text, Menu, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Autocomplete from 'react-native-autocomplete-input';
import { addToCart } from '../redux/slice/cartSlice';
import styles from '../css/styles';

const ProductList = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { products, loading } = useSelector(state => state.products);
    const [search, setSearch] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [rating, setRating] = useState(null);
    const [priceRange, setPriceRange] = useState('none');
    const [menuVisible, setMenuVisible] = useState(false);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        navigation.navigate('Cart');
    };

    useEffect(() => {
        const applyFilters = () => {
            let updatedProducts = [...products];

            if (rating) {
                updatedProducts = updatedProducts.filter(product => product.rating.rate >= rating);
            }
            if (search) {
                updatedProducts = updatedProducts.filter(product =>
                    product.title.toLowerCase().includes(search.toLowerCase())
                );
            }

            if (priceRange === 'lowToHigh') {
                updatedProducts.sort((a, b) => a.price - b.price);
            } else if (priceRange === 'highToLow') {
                updatedProducts.sort((a, b) => b.price - a.price);
            }

            setFilteredProducts(updatedProducts);
            console.log("Filtered Products: ", updatedProducts);
        };

        applyFilters();
    }, [rating, priceRange, products, search]);

    const renderProduct = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
            <Card style={styles.card}>
                <Card.Cover source={{ uri: item.image }} />
                <Card.Content>
                    <Text>{item.title}</Text>
                    <Text>{`$${item.price}`}</Text>
                    <Text>{`Rating: ${item.rating.rate} (${item.rating.count} reviews)`}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => handleAddToCart(item)}>
                            <Button
                                style={[styles.addBtn]}
                                labelStyle={{ color: 'white' }}
                            >
                                Add To Cart
                            </Button>
                        </TouchableOpacity>
                    </View>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchFilterContainer}>
                <Autocomplete
                    data={search.length < 1 ? [] : filteredProducts.map(product => product.title)}
                    defaultValue={search}
                    onChangeText={setSearch}
                    placeholder="Search Products"
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {

                            const selectedProduct = filteredProducts.find(product => product.title === item);
                            if (selectedProduct) {
                                setSearch(selectedProduct.title);
                                navigation.navigate('ProductDetail', { product: selectedProduct });
                            }
                        }}>
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    )}
                    containerStyle={styles.autocompleteContainer}
                />
                <Menu
                    visible={menuVisible}
                    onDismiss={() => setMenuVisible(false)}
                    anchor={<Button onPress={() => setMenuVisible(true)}>Filter</Button>}
                    style={styles.menu}
                >
                    <Menu.Item
                        onPress={() => {
                            console.log('Setting rating to 4');
                            setRating(4);
                            setMenuVisible(false);
                        }}
                        titleStyle={styles.menuItem}
                        title="Rating 4 and above"
                    />
                    <Menu.Item
                        onPress={() => {
                            console.log('Setting rating to 3');
                            setRating(3);
                            setMenuVisible(false);
                        }}
                        titleStyle={styles.menuItem}
                        title="Rating 3 and above"
                    />
                    <Menu.Item
                        onPress={() => {
                            console.log('Clearing rating filter');
                            setRating(null);
                            setMenuVisible(false);
                        }}
                        titleStyle={styles.menuItem}
                        title="Clear Rating Filter"
                    />
                    <Menu.Item
                        onPress={() => {
                            console.log('Setting price range to low to high');
                            setPriceRange('lowToHigh');
                            setMenuVisible(false);
                        }}
                        titleStyle={styles.menuItem}
                        title="Price: Low to High"
                    />
                    <Menu.Item
                        onPress={() => {
                            console.log('Setting price range to high to low');
                            setPriceRange('highToLow');
                            setMenuVisible(false);
                        }}
                        titleStyle={styles.menuItem}
                        title="Price: High to Low"
                    />
                    <Menu.Item
                        onPress={() => {
                            console.log('Clearing price filter');
                            setPriceRange('none');
                            setMenuVisible(false);
                        }}
                        titleStyle={styles.menuItem}
                        title="Clear Price Filter"
                    />
                </Menu>
            </View>

            {loading ? <Text>Loading...</Text> :
                <FlatList
                    data={filteredProducts.length > 0 ? filteredProducts : products}
                    renderItem={renderProduct}
                    keyExtractor={(item) => item.id.toString()}
                />
            }
        </View>
    );
};

export default ProductList;
