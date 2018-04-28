/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {createMaterialBottomTabNavigator} from 'react-navigation';
import Shop from './src/shop';
import ShopCar from './src/shopCar';

export default createMaterialBottomTabNavigator({
    Main:{screen:Shop,
        navigationOptions:{
            title:'商场',
        }
    },
    Mine:{screen:ShopCar,
        navigationOptions:{
            title:'购物车',
        }},
},{
    tabBarOptions:{
        showLabel:false,

    }
})
