import {observable, computed, action } from "mobx";
import Axios from "axios";

class SellerListStore{
  static filterType={
    name:1,
    sellCount:2,
    position:3,
    multiple:4,
    rating:5,
    other:6
  } 
  @observable filter={
    type:SellerListStore.filterType.multiple,
    value:""
  };
  @observable data=[{
    "id":1,
    "name":"粥品香坊（回龙观）",
    "icon":"http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg",
    "sellCount":4358,
    "deliveryTime":30,
    "minPrice":20,
    "deliveryPrice":3,
    "averagePrice":28,
    "score":4.5,
    "position":1.1,
    "desc":[{
      "type":1,
      "text":"折扣商品5.31折起"
    }]
  },{
    "id":2,
    "name":"111111",
    "icon":"http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg",
    "sellCount":4358,
    "deliveryTime":30,
    "minPrice":20,
    "deliveryPrice":3,
    "averagePrice":28,
    "score":4.5,
    "position":1.1,
    "desc":[{
      "type":1,
      "text":"折扣商品5.31折起"
    }]
  },{
    "id":3,
    "name":"222222",
    "icon":"http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg",
    "sellCount":4358,
    "deliveryTime":30,
    "minPrice":20,
    "deliveryPrice":3,
    "averagePrice":28,
    "score":4.5,
    "position":1.1,
    "desc":[{
      "type":1,
      "text":"折扣商品5.31折起"
    }]
  },{
    "id":4,
    "name":"333333",
    "icon":"http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg",
    "sellCount":4358,
    "deliveryTime":30,
    "minPrice":20,
    "deliveryPrice":3,
    "averagePrice":28,
    "score":4.5,
    "position":1.1,
    "desc":[{
      "type":1,
      "text":"折扣商品5.31折起"
    }]
  },{
    "id":5,
    "name":"44444",
    "icon":"http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg",
    "sellCount":4358,
    "deliveryTime":30,
    "minPrice":20,
    "deliveryPrice":3,
    "averagePrice":28,
    "score":4.5,
    "position":1.1,
    "desc":[{
      "type":1,
      "text":"折扣商品5.31折起"
    }]
  },{
    "id":6,
    "name":"55555",
    "icon":"http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg",
    "sellCount":4358,
    "deliveryTime":30,
    "minPrice":20,
    "deliveryPrice":3,
    "averagePrice":28,
    "score":4.5,
    "position":1.1,
    "desc":[{
      "type":1,
      "text":"折扣商品5.31折起"
    }]
  },{
    "id":7,
    "name":"66666",
    "icon":"http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg",
    "sellCount":4358,
    "deliveryTime":30,
    "minPrice":20,
    "deliveryPrice":3,
    "averagePrice":28,
    "score":4.5,
    "position":1.1,
    "desc":[{
      "type":1,
      "text":"折扣商品5.31折起"
    }]
  }];
/*
id": 1,
"name": "name",
"description": null,
"deliveryTime": 30,
"score": 4.5,
"serviceScore": 4.5,
"foodScore": 4.5,
"rankRate": null,
"minPrice": 20,
"averagePrice": 25,
"deliveryPrice": 5,
"ratingCount": null,
"sellCount": 4358,
"bulletin": null,
"icon": "http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg",
"createTime": 1533095571000,
"updateTime": 1533095571000
*/
  constructor(){
    // Axios.get("http://119.23.106.55:8081/api/Seller/getSellerList").then((rep)=>{
    //   console.log(rep.data.data.list)
    //   this.data=rep.data.data.list;
    // });
  }


  @computed
  get sellerList(){
    if(this.filter.type==SellerListStore.filterType.multiple){
       return this.data;
    }else{
        return this.data.filter((item,i)=>{
          return this.filterType>i;
        })
    }
    
  }

  @computed
  get filterType(){
    return this.filter.type;
  }

  @action
  changeFilterType(type){
    this.filter.type=type;
  }

}

export default SellerListStore;