import React from 'react';
import 'page/BMI/BMI.styl'
import { Form, Input, Button } from 'antd';
import Frame from '@/component/frame/Frame.js';
import Axios from 'axios';
import { result } from 'lodash';


class BMI extends React.Component {
    constructor(props) {
        super(props);
        //react state
        this.state = {
            weight:"",
            height:"",
            result:"",
            bmiLevel:{
                "":{}
            }
        };
    }

    changeValue(field,value){
        let obj={};
        obj[field]=value;
        this.setState(obj);
    }

    calculator(){
        let url=`http://127.0.0.1:8066/bmi/bmi?weight=${this.state.weight}&height=${this.state.height}`;
        Axios.get(url).then((response)=>{
            this.setState({
                result:response.data.BMI
            })
        }).catch(()=>{
            alert("error")
        });
    }

    getResult(){
        let style={};
        if(this.state.result){
            let bmi=parseFloat(this.state.result);
            if(bmi!==NaN){           
                if(bmi>30){
                    style["background"]="#ffcc00";
                }else if(bmi>=30){
                    style["background"]="#ffff00";
                }else if(bmi>=25){
                    style["background"]="#ffcc00";
                }else if(bmi>=18.5){
                    style["background"]="#66cc00";
                }else{
                    style["background"]="#CCCCCC";
                }
            }
        }
        return (<label style={style}>{this.state.result}</label>)
    }

    render() {
        return (
            <div className="BMIPage">
                <Frame display={true} title={"Body Mass Index Calculator"}>

                <Form layout = 'vertical'>
                    <Form.Item label="Weight (kg) ">
                        <Input onChange={(e)=>this.changeValue("weight",e.target.value)} value={this.state.weight} placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item label="Height (cm) ">
                        <Input onChange={(e)=>this.changeValue("height",e.target.value)} value={this.state.height} placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={()=>{this.calculator()}} type="primary">Calculator</Button>
                    </Form.Item>
                    <Form.Item label={<div>Result : {this.getResult()}</div>}>
                        
                    </Form.Item>
                </Form>

                <div className="bmi-desc">
                <table><thead><tr><th bgcolor="#8DD8F8">Category</th><th bgcolor="#8DD8F8">BMI</th></tr></thead>
                <tbody>
                <tr><td bgcolor="#CCCCCC">Underweight</td><td bgcolor="#CCCCCC">&lt; 18.5</td></tr>
                <tr><td bgcolor="#66cc00">Normal weight</td><td bgcolor="#66cc00">18.5 ~ 24.9</td></tr>
                <tr><td bgcolor="#ffff00">Overweight</td><td bgcolor="#ffff00">25.0 ~ 29.9</td></tr>
                <tr><td bgcolor="#ffcc00">Obese</td><td bgcolor="#ffcc00">30 and higher</td></tr>
                </tbody></table>
                </div>
                </Frame>
            </div>
        );
    }
}

export default BMI;