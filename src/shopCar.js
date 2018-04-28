import React from 'react';
import {View, StyleSheet, Text, Image,ScrollView,Dimensions} from 'react-native';
import {observer} from 'mobx-react';
import {shop} from './store/shop';
import {createStackNavigator}  from 'react-navigation';

class ShopCar extends React.Component{

    static navigationOptions ={
        title: '购物车',
    }

    render(){

        const {shops} = shop;

        return(

            <View style={{flex:1}}>

            <ScrollView style={styles.contain}>
                {shops.map(item=>
                    <View
                        activeOpacity={1}
                        key={item.title} style={{marginBottom:20,borderBottomWidth:1}}>

                        <View style={{flexDirection:'row'}}>
                            <View>
                                <Text>{item.title}</Text>
                            </View>
                        <Image source={{uri:item.image}} style={styles.shop_item}/>
                            <View>
                        <Text>数量{item.quantity}</Text>
                            </View>

                            <View style={{marginLeft:20}}>
                            <View style={{width:40,height:40, borderWidth:1,justifyContent:'center',alignItems:'center',
                                marginTop:10}}>
                                <Text style={{fontSize:20}} onPress={()=>item.shopAdd()}>+1</Text>
                            </View>

                            <View style={{width:40,height:40, borderWidth:1,justifyContent:'center',alignItems:'center',
                                marginTop:10}}>
                                <Text style={{fontSize:20}} onPress={()=>item.shopRemove()}>-1</Text>
                            </View>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',marginTop:10}}>
                            <Text style={{marginRight:20}}>单价{item.price}元</Text>
                            <Text >总计{item.total()}元</Text>
                        </View>
                        <Text style={{marginTop:10,marginBottom:20}} onPress={()=>this.remove(item)}>移除该商品</Text>
                    </View>
                )}

            </ScrollView>

                {shops.length && shops.length>0?
                    <View style={styles.sum}>
                        <Text>所有商品总价格{shop.total()}元</Text>
                    </View>
                    :
                    <Text style={{position:'absolute',top:0}}>
                        购物车暂无商品哦
                    </Text>
                }
            </View>
        )

    }


    remove(item){
        shop.remove_item(item)
    }

}

export default createStackNavigator({
    Shop:{screen:observer(ShopCar)}
})

// export default observer(ShopCar)

const styles  = StyleSheet.create({

    contain:{
        flex:1,
        paddingTop:20
    },
    shop_item:{
        width:100,
        height:100,

    },
    sum:{
        position:'absolute',
        bottom:0,
        left:0,
        width:Dimensions.get('window').width,
        height:50,
        backgroundColor:'#ccc',
        justifyContent:'center',
        alignItems:'center'
    }
})