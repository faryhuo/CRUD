import {
  observable,
  computed,
  action
} from "mobx";


class ShopCartStore {

  @observable
  selectedFoods = []
  
  minPrice=0

  @action initSelectedFoods(food){
    this.selectedFoods=food;
  }

  @action
  setMinPrice(minPrice){
    this.minPrice=minPrice;
  }

  @action
  addFood(food){
    let isHasSelected= this.selectedFoods.filter((item)=>{
      return item==food;
    }).length
    if(!isHasSelected){
      let sameFood= this.selectedFoods.filter((item)=>{
        return item.name==food.name;
      });
      if(sameFood.length){
        food.count=sameFood[0].count;
        food.count++;
        for(let i=0;i<this.selectedFoods.length;i++){
          if(this.selectedFoods[i].name==food.name){
            this.selectedFoods[i]=food;
          }

        }      
      }else{
        food.count=1;
        this.selectedFoods.push(food);
      }
    }else{
      food.count++;
    }
    console.log(this.selectedFoods)
  }


  @action
  decreaseFood(food){
    if(!food.count || food.count===0){
      let sameFood= this.selectedFoods.filter((item)=>{
        return item.name==food.name;
      });
      if(sameFood.length){
        food.count=sameFood[0].count;
        if( food.count>0){
        food.count--;
        }
        for(let i=0;i<this.selectedFoods.length;i++){
          if(this.selectedFoods[i].name==food.name){
            this.selectedFoods[i]=food;
          }

        }      
      }
      return
    }
    food.count--;
    if(food.count===0){
      this.selectedFoods=this.selectedFoods.filter((data)=>{
        return data!==food;
      })
    }
  }


  @action
  clearFood(){
    this.selectedFoods.map((data)=>{
      data.count=0;
    })
    this.selectedFoods=[];
  }

  @computed
  get totalPrice() {
    let total = 0;
    this.selectedFoods.forEach((food) => {
      total += food.price * food.count;
    });
    return total;
  }
  @computed
  get totalCount() {
    let count = 0;
    this.selectedFoods.forEach((food) => {
      count += food.count;
    });
    return count;
  }




  @computed
  get payDesc() {
    if (this.totalPrice === 0) {
      return `￥${this.minPrice}元起送`;
    } else if (this.totalPrice < this.minPrice) {
      let diff = this.minPrice - this.totalPrice;
      return `还差￥${diff}元起送`;
    } else {
      return "去结算";
    }
  }
  

  computed
  get isEnough() {
    if (this.totalPrice < this.minPrice) {
      return false;
    } else {
      return true;
    }
  }



}

export default ShopCartStore;