const ResponseCode={
    OK:0
  };
const RatingType={
     POSITIVE:0,
     NEGATIVE:1,
     ALL:2
  };


const host="119.23.106.55";
const port="8080"
const isSimlatorMode=false;

let Api={
   getSeller(sellerId){
     if(isSimlatorMode){
       return "/api/seller";
     }
     return `http://${host}:${port}/api/Seller/${sellerId}`;
   },
   getGoods(sellerId){
    if(isSimlatorMode){
      return "/api/goods";
    }    
    return `http://${host}:${port}/api/Seller/Goods/${sellerId}`;
  },
  getRatings(sellerId){
    if(isSimlatorMode){
      return "/api/ratings";
    }    
    return `http://${host}:${port}/api/Seller/Rating/${sellerId}`;
  },
  getSellerList(param){
    if(isSimlatorMode){
      return "/api/sellerList";
    }    
    let pageSize=10;
    let pageNum=1;
    if(param){
        param.pageSize && (pageSize=param.pageSize);
        param.pageNum && (pageNum=param.pageNum);
    }
    let url= `http://${host}:${port}/api/Seller/getSellerList?pageSize=${pageSize}&pageNum=${pageNum}`;  
    return encodeURI(url);
  },
  getOrderList(param){
    if(isSimlatorMode){
      return "/api/getOrderList";
    }  
    let pageSize=10;
    let pageNum=1;
    if(param){
        param.pageSize && (pageSize=param.pageSize);
        param.pageNum && (pageNum=param.pageNum);
    }
    let url= `http://${host}:${port}/api/Order/getOrderList?pageSize=${pageSize}&pageNum=${pageNum}`;  
    return encodeURI(url);
  },
  getUserInfo(){
    if(isSimlatorMode){
      return "/api/getUserInfo";
    }  
    let url= `http://${host}:${port}/api/User/getUserInfo`;
    return url;
  }


  
}

export  {ResponseCode,RatingType,Api};