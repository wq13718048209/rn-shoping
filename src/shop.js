import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react';
import {createStackNavigator}  from 'react-navigation';
import {buy} from './store/shop';


class Shop extends React.Component{

    static navigationOptions ={
        title: '商场',
    }

    render(){

        const {buys} = buy;

        return(
            <View style={styles.contain}>
                {buys.map(item=>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={()=>this.shop(item)}
                        key={item.title} style={styles.item}>
                        <Text>{item.title}</Text>
                        <Text>{item.price}元</Text>
                        <Image source={{uri:item.image}} style={styles.shop_item}/>
                        <Text onPress={this.buy}>点击购买</Text>
                    </TouchableOpacity>
                )}
            </View>
        )

    }

    shop(item){
        buy.add_shop(item);

    }

}

export default createStackNavigator({
    shop:{screen: observer(Shop)}
})


const styles  = StyleSheet.create({

    contain:{
        flex:1,
    },
    shop_item:{
        width:100,
        height:100,

    },
    topTitle:{
        justifyContent:'center',
        alignItems:'center',
        height:66,
        backgroundColor:'#eaeaea'
    },
    item:{
        marginBottom:20,
        flexDirection:'row',
        marginTop:20,
        alignItems:'center',
        borderBottomWidth:1,
    }

})