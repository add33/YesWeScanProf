import React from 'react';
import { FlatList, Text, View, Image, ScrollView, AsyncStorage } from 'react-native';

import { Header } from '../components/header';
import { styleProduct } from '../styles/product.css';

import listAllAdditifs from '../data/listAllAdditifs.json';

export default class ProductScreen extends React.Component {

    static navigationOptions = {
        headerTitle: <Header title="Fiche Produit" />,
    };
    
    constructor(props) {
        super(props);
        let product = this.props.navigation.getParam("data")
        
        let additifs = []
        for (var item in product.additives_tags) {
            let additif = listAllAdditifs.tags.find(obj => obj.id == product.additives_tags[item]);
            additifs.push(additif)
        }

        AsyncStorage.getItem("productsStored", (err, result) => {
            let productsStored = (result != null) ? productsStored = JSON.parse(result) : []
            productsStored.push(product)
            AsyncStorage.setItem('productsStored', JSON.stringify(productsStored));
        })
        this.state = { additifs: additifs }

    }

    renderList(item) {
        return (
            <Text style={[styleProduct.ingredient]}> - {item.item}</Text>
        )
    }

    renderList2(item) {
        return (
            <Text style={[styleProduct.ingredient]}> - {item.item.name}</Text>
        )
    }

    render() {
        let p = this.props.navigation.getParam("data")
        console.log('re',p)
        
        return (
            <ScrollView>
                <View style={styleProduct.product}>

                    <View style={styleProduct.center}>
                        <Text style={styleProduct.name}>{p.product_name}</Text>
                        <Text style={styleProduct.subName}>{p.generic_name_fr}</Text>
                        <Image
                            resizeMode="contain"
                            source={{ uri: "https://static.openfoodfacts.org/images/misc/nutriscore-" + p.nutrition_grade_fr + ".png" }}
                            style={{ width: 220, height: 120 }}
                        />
                    </View>
                    
                    <Text style={styleProduct.title}>Informations</Text>
                    <View style={styleProduct.row}>
                        <Image
                            resizeMode="contain"
                            source={{ uri: p.image_url }}
                            style={{ width: 200, height: 200 }}
                        />
                        <View style={styleProduct.col}>

                            <Text style={styleProduct.label}>Marques : </Text>
                            <Text style={styleProduct.textInfo}>{p.brands}</Text>

                            <Text style={styleProduct.label}>Quantité : </Text>
                            <Text style={styleProduct.textInfo}>{p.quantity}</Text>

                            <Text style={styleProduct.label}>Catégories : </Text>
                            <Text style={styleProduct.textInfo}>{p.categories}</Text>

                        </View>
                    </View>

                    <Text style={styleProduct.title}>Additifs</Text>
                    <View>
                        <FlatList
                            data={this.state.additifs}
                            renderItem={(item) => this.renderList2(item)}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>

                    <Text style={styleProduct.title}>Ingrédients</Text>
                    <View style={styleProduct.row}>
                        <Image
                            resizeMode="contain"
                            source={{ uri: p.image_ingredients_url }}
                            style={{ width: 180, height: 200 }}
                        />
                        <FlatList
                            data={p.ingredients_ids_debug}
                            renderItem={(item) => this.renderList(item)}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>

                </View>
            </ScrollView>
        );
    }
}