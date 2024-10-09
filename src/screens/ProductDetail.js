import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text, Button, TextInput, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList, removeFromWishList } from '../redux/slice/wishListSlice';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../css/styles';
const ProductDetail = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { product } = route.params;
    const dispatch = useDispatch();
    const { control, handleSubmit, formState: { errors } } = useForm();

    const wishList = useSelector(state => state.wishList.wishList);
    const isInWishlist = wishList.some(item => item.id === product.id);

    const onSubmit = data => {
        console.log("PRODUCT DETAILS ==>", data);
    };

    const toggleWishlist = () => {
        if (isInWishlist) {
            dispatch(removeFromWishList(product));
        } else {
            dispatch(addToWishList(product));
        }
    };

    return (
        <View style={[styles.marginH12]}>
            <View style={styles.rowContainer}>
                <Image source={{ uri: product.image }} style={{ height: 200, width: 200 }} />
                <View style={styles.wishlistContainer}>
                    <Button onPress={() => navigation.navigate('WishList')}>View Wishlist</Button>
                    <TouchableOpacity onPress={toggleWishlist}>
                        <AntDesign
                            name={isInWishlist ? 'heart' : 'hearto'}
                            size={30}
                            color={isInWishlist ? 'green' : 'black'}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={[styles.marginTop5]}>Title : {product.title}</Text>
            <Text style={[styles.marginTop5]}>Description : {product.description}</Text>
            <Text style={[styles.marginTop5]}>Price : {`$${product.price}`}</Text>

            <Text style={[styles.inquiryText]}>Inquiry Form:</Text>
            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        label="Your Inquiry"
                        value={value}
                        onChangeText={onChange}
                        error={!!errors.inquiry}
                    />
                )}
                name="inquiry"
                rules={{ required: 'Inquiry is required' }}
            />
            {errors.inquiry && <Text>{errors.inquiry.message}</Text>}
            <TouchableOpacity activeOpacity={0.7} onPress={handleSubmit(onSubmit)}>
                <Button
                    style={[styles.submitBtn]}
                    labelStyle={{ color: 'white' }}
                >
                    Submit
                </Button>
            </TouchableOpacity>
        </View>
    );
};

export default ProductDetail;
