import {types,destroy} from "mobx-state-tree";

const shop_array = [
    {title:'可乐',image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524829533493&di=1ae74db746c27da90723dc2bae5fafbc&imgtype=0&src=http%3A%2F%2Fwww.jxmall.com%2Fpic%2Fmallfiles%2F2014%2F11%2Ff104145f-ac0f-4ce0-a2e7-ccded67bbc68.jpg',price:3,},
    {title:'鸡腿',image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525424275&di=bea1b36a6b4f295a73f9d548916c53fb&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F6c224f4a20a44623e451d46b9222720e0cf3d724.jpg',price:8},
    {title:'衣服',image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524829576581&di=96cfd25064ea47887322cc6e6cf07194&imgtype=0&src=http%3A%2F%2F0.image.kw.okbuycdn.com%2Fstatic%2F73fd80835834a6d0af6b47f409a72600.jpg',price:20}
];

const shopItem = types.model('shopItems',{
    title:types.string,
    image:types.string,
    price:types.number,
    quantity:0,

}).actions(self =>({
    shopAdd(){
        self.quantity = self.quantity+1;
    },
    shopRemove(){
        if (self.quantity==1){
            alert('数量最低为1!')
            return
        }
        self.quantity = self.quantity-1;
    }
})).views(self =>({
    total(){
        return self.quantity * self.price
    }
}));

const shop = types.model('shop',{
    shops:types.array(shopItem)
}).actions(self =>({
    remove_item(item){
        destroy(item);
        alert("该商品已移除购物车")
    },
    pushItem(item){
        self.shops.push(item)
    }
})).views(self =>({
    total(){
        return self.shops.reduce((sum,item)=>sum+item.total(),0)
    }
})).create({
    shops:[]
});

const buy = types.model('buy',{
    buys:types.array(shopItem)
}).actions(self =>({
    add_shop(item){
        if(shop.shops.find(item1 => item1.title == item.title)){
            alert('购买失败,购物车里已存在该商品');
            return
        }
        alert('商品已经成功添加到购物车');
        shop.pushItem({
            ...item,
            quantity:item.quantity+1
        });
    }
})).create({
    buys:shop_array
});

export {
    shop ,buy ,shopItem
} ;