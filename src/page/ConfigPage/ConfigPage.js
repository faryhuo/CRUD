import React from 'react';
import 'page/ConfigPage/ConfigPage.styl'
import { Input } from '@progress/kendo-react-inputs';
import { Card, CardHeader, CardTitle, CardBody, CardActions, CardImage, CardSubtitle, Avatar } from '@progress/kendo-react-layout';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import Frame from '@/component/frame/Frame.js';
import Split from '@/component/split/Split.js';
import AjaxParameter from '@/component/ajaxParameter/AjaxParameter.js';

import { Collapse } from 'antd';
const { Panel } = Collapse;

class ConfigPage extends React.Component {
    constructor(props) {
        super(props);
        //react state
        this.state = {
            types:["string","numeric","date"]
        };
    }



    //get the api input element form.
    getApiListForm() {
        var arr = [];
        console.log(this.props.apiList);
        for (let item in this.props.apiList) {
            arr.push(<div key={item} className="config-item">
                <Collapse >
                    <Panel header={<div><label>{this.props.apiList[item].title} : </label><Input onClick={(e)=>{e.preventDefault;}}  onChange={(e) => { this.props.changeApiList(item, e.target.value) }} value={this.props.apiList[item].url} className="url-input"></Input></div>}>
                       <AjaxParameter  changeBodyParamsTemp={(p1)=>{this.props.changeBodyParamsTemp(item,p1)}} changeUrlParamsTemp={(p1,p2,p3)=>{this.props.changeUrlParamsTemp(item,p1,p2,p3)}}  apiConfig={this.props.apiList[item]}></AjaxParameter>
                    </Panel>
                </Collapse>
            </div>);
        }
        return arr;
    }


    //get the columns config page
    getColumnListForm(){
        var arr = [];
        for (let index in this.props.columns) {
            arr.push(<div key={index} className="config-item">
                <div className="option-item"> 
                    <label>Title : </label>
                    <Input onChange={(e) => { this.props.changeColumns(index,"title", e.target.value) }} value={this.props.columns[index].title}></Input>
                </div>
                <div className="option-item"> 
                    <label>Field : </label>
                    <Input onChange={(e) => { this.props.changeColumns(index,"field", e.target.value) }} value={this.props.columns[index].field}></Input>
                </div>
                <div className="option-item"> 
                    <label>Editable : </label>
                    <input disabled={this.props.primaryKey===this.props.columns[index].field?true:false}  checked={this.props.columns[index].editable===false?false:true}  onChange={(e) => { this.props.changeColumns(index,"editable", e.target.checked) }} type="checkbox" id={"editable_"+index} className="k-checkbox" />
                                <label className="k-checkbox-label" htmlFor={"editable_"+index}></label><br />
                </div>  
                <div className="option-item"> 
                    <label>PK : </label>
                    <input name="PK" checked={this.props.primaryKey===this.props.columns[index].field?true:false} 
                     onChange={(e) => { this.props.changePrimaryKey(this.props.columns[index].field);
                     this.props.changeColumns(index,"editable", false);
                      }} type="radio" id={"PK"+index} className="k-radio" />
                                <label className="k-radio-label" htmlFor={"PK"+index}></label><br />
                </div>  
                <div className="option-item"> 
                    <label>Type : </label>
                    <DropDownList data={this.state.types} style={{width:100}}  onChange={(e) => { this.props.changeColumns(index,"type", e.target.value) }} value={this.props.columns[index].type}></DropDownList>
                </div>  
                <div className="option-item"> 
                    <label>Width : </label>
                    <Input style={{width:100}}  onChange={(e) => { this.props.changeColumns(index,"width", e.target.value) }} value={this.props.columns[index].width}></Input>
                </div>  
                <div className="option-item"> 
                    <label>Hidden : </label>
                    <input 
                     checked={this.props.columns[index].hidden===true?true:false}  
                     onChange={(e) => { this.props.changeColumns(index,"hidden", e.target.checked) }} 
                     type="checkbox" id={"hidden_"+index} className="k-checkbox" />
                                <label className="k-checkbox-label" htmlFor={"hidden_"+index}></label><br />
                </div>                    
            </div>);
        }
        return arr;
    }





    render() {
        return (
            <div className="ConfigPage" >
                <div className="api-list">
                    <Frame display={true} title={<div className="config-list-header"><h2>Rest API Url Setting</h2></div>}>
                        <div className="config-list">
                                {this.getApiListForm()}
                        </div>
                    </Frame>
                </div>

                <Split></Split>           

                <div className="column-list">
                    <Frame display={true} title={<div className="config-list-header"><h2>Grid Columns Setting</h2></div>}>
                        <div className="config-list">
                        {this.getColumnListForm()}
                        </div>
                    </Frame>
                </div>
            </div>
        );
    }
}

export default ConfigPage;