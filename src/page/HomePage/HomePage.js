import React from 'react';
import 'page/HomePage/HomePage.styl'
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import Grid from '@/component/grid/Grid.js';
import { Input } from '@progress/kendo-react-inputs';
import { Card, CardHeader, CardTitle, CardBody, CardActions, CardImage, CardSubtitle, Avatar } from '@progress/kendo-react-layout';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Loader } from '@progress/kendo-react-indicators';
import ConfigPage from '@/page/ConfigPage/ConfigPage';
import BMI from '@/page/BMI/BMI';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        //react state
        this.state = {
            selected: 0,
            loading: false,
            dialog: {
                visible: false, 
                text: "Do you want to delete the record",
                title:"Please confirm",
                buttonList: [{
                    text: "OK"
                }]
            },
            apiList: {
                getListApi: {
                    title: "Get List",
                    url: "http://127.0.0.1:8066/SimpleDataQuery/MobileTradeInPriceList",
                    urlParamsTemp:[{enable:true,param:"Brand",value:""},
                    {enable:true,param:"BrandOperator",value:""},
                    {enable:true,param:"HandsetModelOperator",value:""},
                    {enable:true,param:"HandsetModel",value:""},
                    {enable:true,param:"TradeinPriceOperator",value:""},
                    {enable:true,param:"TradeinPrice",value:""}],
                    bodyParamsTemp:""
                },
                insertApi: {
                    title: "Add",
                    url: "http://mock-api.com/jz8AWbg4.mock/insert",
                    urlParamsTemp:[{enable:true,param:"",value:""}],
                    bodyParamsTemp:""
                }
                ,
                updateApi: {
                    title: "Update",
                    url: "http://mock-api.com/jz8AWbg4.mock/update",
                    urlParamsTemp:[{enable:true,param:"",value:""}],
                    bodyParamsTemp:""
                }
                , deleteApi: {
                    title: "Delete",
                    url: "http://mock-api.com/jz8AWbg4.mock/delete",
                    bodyParamsTemp:"",
                    urlParamsTemp:[{enable:true,param:"",value:""}],
                }
            },
            //primaryKey
            primaryKey:"Handset Model"
            ,
            //gird 's columns attibute
            columns: [{
                title: "Handset Model",
                field: "Handset Model",
                type: "string",
                width: "150px"
            }, {
                title: "Brand",
                field: "Brand",
                type: "string",
                width: "200px"
            }, {
                title: "Trade-in Price",
                field: "Trade-in Price",
                type: "string",
                width: "200px"
            }, {
                title: "",
                field: "",
                type: "",
                width: "",
                hidden:true
            },  {
                title: "",
                field: "",
                type: "",
                width: "",
                hidden:true
            }, {
                title: "",
                field: "",
                type: "",
                width: "",
                hidden:true
            }]
        };
        if(localStorage["apiConfig"]){
            this.state.apiList=JSON.parse(localStorage["apiConfig"]);
        }
        if(localStorage["columnConfig"]){
            this.state.columns=JSON.parse(localStorage["columnConfig"]);
        }
        if(localStorage["primaryKeyConfig"]){
            this.state.primaryKey=localStorage["primaryKeyConfig"];
        }
    }


    //change the api form 's value.
    changeApiList(item, value) {
        this.state.apiList[item].url = value;
        this.setState({ apiList: this.state.apiList });
        if (item === "getListApi") {
            if (this.refs.grid) {
                this.refs.grid.getDataSource();
            }
        }
        localStorage["apiConfig"]=JSON.stringify(this.state.apiList);
    }

    componentWillMount() {
        document.title = "Home";
    }
    componentWillReceiveProps(nextProps) {

    }

    changeUrlParamsTemp(apiName,index,field,value){
        let config=this.state.apiList[apiName];
        if(!config.urlParamsTemp[index]){
            config.urlParamsTemp[index]={};;
        }
        config.urlParamsTemp[index][field]=value;
        if(index===config.urlParamsTemp.length-1 && field!=="enable"){
            config.urlParamsTemp.push({enable:true,param:"",value:""});
        }
        console.log(config.urlParamsTemp);
        this.setState({
            apiList:this.state.apiList
        });
    }

    changeBodyParamsTemp(apiName,value){
        let config=this.state.apiList[apiName];
        config.bodyParamsTemp=value;
        this.setState({
            apiList:this.state.apiList
        });
    }


    //get the api input element form.
    getApiListForm() {
        var arr = [];
        for (let item in this.state.apiList) {
            arr.push(<div key={item} className="api-item">
                <label>{this.state.apiList[item].title} : </label><Input onChange={(e) => { this.changeApiList(item, e.target.value) }} value={this.state.apiList[item].url}></Input>
            </div>);
        }
        return arr;
    }


    //change the tab
    handleSelect = (e) => {
        this.setState({ selected: e.selected });
    }

    componentWillUnmount() {
    }

    //close a dialog 
    closeDialog() {
        let dialog = this.state.dialog;
        dialog.visible = false;
        this.setState({
            dialog
        });
    }


    //show a dialog.
    showDialog(buttonList,message,title) {
        let dialog = this.state.dialog;
        dialog.visible = true;
        if (buttonList) {
            dialog.buttonList = buttonList;
        }else{
            dialog.buttonList=[{
                text: "OK",
                action:()=>{
                    this.closeDialog();
                }
            }]
        }
        if(message){
            dialog.text=message;
        }else{
            dialog.text="Do you want to delete the record";
        }
        if(title){
            dialog.title=title;
        }else{
            dialog.title="Please confirm"
        }
        this.setState({
            dialog
        });
    }

    changeColumns(index,field,value){
        this.state.columns[index][field]=value;
        this.setState({
            columns:this.state.columns
        });
        localStorage["columnConfig"]=JSON.stringify(this.state.columns);
    }

    //show a loading.
    showLoading() {
        this.setState({
            loading: true
        });
    }

    //close a loading.
    closeLoading() {
        this.setState({
            loading: false
        });
    }

    //change the pk
    changePrimaryKey(field){
       this.setState({
          primaryKey:field 
       });
       localStorage["primaryKeyConfig"]=field;

    }

    render() {
        return (
            <div className="HomePage" >
                <div className="page-header"> 
                    <h2>AJ UI Template Demo</h2>
                </div>

                <TabStrip selected={this.state.selected} onSelect={this.handleSelect}>
                <TabStripTab title="BMI">
                        <div className="BMI-page">
                            <BMI></BMI>
                        </div>
                    </TabStripTab>
                    <TabStripTab title="CRUD">
                        <div className="grid-page">
                            <Grid ref="grid" primaryKey={this.state.primaryKey} columns={this.state.columns} apiList={this.state.apiList} showDialog={(buttonList,message,title) => this.showDialog(buttonList,message,title)} closeDialog={(e) => this.closeDialog(e)} showLoading={(e) => this.showLoading(e)} closeLoading={(e) => this.closeLoading(e)}></Grid>
                        </div>
                    </TabStripTab>
                    <TabStripTab title="Config">
                        <ConfigPage changeBodyParamsTemp={(p1,p2)=>{this.changeBodyParamsTemp(p1,p2)}} changeUrlParamsTemp={(p1,p2,p3,p4)=>{this.changeUrlParamsTemp(p1,p2,p3,p4)}} primaryKey={this.state.primaryKey} changePrimaryKey={(e)=>{this.changePrimaryKey(e)}} changeColumns={(index,field,value)=>{this.changeColumns(index,field,value)}} columns={this.state.columns} apiList={this.state.apiList} changeApiList={(item, value) => { this.changeApiList(item, value) }}></ConfigPage>
                    </TabStripTab>
                </TabStrip>

                {this.state.dialog.visible && <Dialog title={this.state.dialog.title} onClose={(e) => this.closeDialog(e)}>
                    <p style={{ margin: "25px", textAlign: "center" }}>{this.state.dialog.text}</p>
                    <DialogActionsBar >
                        {
                            this.state.dialog.buttonList.map(item => <button key={item.text} className="k-button" onClick={(e) => item.action(e)}>{item.text}</button>)
                        }
                    </DialogActionsBar>
                </Dialog>}
                {this.state.loading &&
                    <div className="loading">
                        <Loader size='large' type="converging-spinner" />
                    </div>
                }
            </div>
        );
    }
}

export default HomePage;