import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions, TextInput, FlatList, Button } from 'react-native';

const DEVICE = Dimensions.get('window');
import data from './data.json';

const currencyFormat = num => 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

export const HomeScreen = ({route}) => {
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [searchInput, setSearchInput] = React.useState('')

    const updatePrice = price => setTotalPrice(totalPrice + Number(price));

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.headContainer}>
                    <View style={styles.userContainer}>
                        <Text>Hai</Text>
                        <Text style={styles.userText}>{route.params && route.params.userName || 'anonymous'}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text>Total Harga</Text>
                        <Text style={styles.priceText}>{currencyFormat(totalPrice)}</Text>
                    </View>
                </View>

                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Cari barang..."
                        onChangetext={text => setSearchInput({text})} />
                </View>
            </View>

            <FlatList
                data={data.produk}
                CellRendererComponent={({item}) => {
                    return (
                        <View style={styles.listItemContainer}>
                            {item.map(data => <ListItem data={data} key={data.id} priceFn={updatePrice} />)}
                        </View>
                    )
                }}
                style={styles.list}
                numColumns={2} />
        </View>
    )
}

export const ListItem = props => {
    
    const { data, priceFn } = props;

    return (
        <View style={styles.itemContainer}>
            <Image source={{ uri: data.gambaruri }} style={styles.itemImage} resizeMode='contain' />
            <Text numberOfLines={2} ellipsizeMode='tail' style={styles.itemName}>{data.nama}</Text>
            <Text style={styles.itemPrice}>{currencyFormat(Number(data.harga))}</Text>
            <Text style={styles.itemStock}>Sisa stok: {data.stock}</Text>
            <Button style={styles.itemButton} title='BELI' color='blue' onPress={() => priceFn(data.harga)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer: {
        minHeight: 50,
        width: DEVICE.width * .88 + 20,
        marginVertical: 8
    },
    headContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    userContainer: {
        alignItems: 'flex-start'
    },
    priceContainer: {
        alignItems: 'flex-end'
    },
    userText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    searchContainer: {
        marginTop: 8
    },  
    searchInput: {
        backgroundColor: '#fff'
    },
    list: {
        width: '100%',
        padding: 3
    },
    listItemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    itemContainer: {
        flex: 1,
        backgroundColor: '#fff',
        elevation: 1,
        marginVertical: 6,
        marginHorizontal: 6,
        padding: 8,
        overflow: 'hidden'
    },
    itemImage: {
        width: '100%',
        height: 90,
        marginBottom: 10
    },
    itemName: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    itemPrice: {
        textAlign: 'center',
        color: 'blue'
    },
    itemStock: {
        textAlign: 'center',
        marginBottom: 10
    }
})