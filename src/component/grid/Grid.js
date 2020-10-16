import React from 'react';
import './Grid.styl'
import { Grid as KendoGrid, GridColumn, GridDetailRow, GridToolbar } from '@progress/kendo-react-grid';
import Axios from 'axios';
import CommandCell from '@/component/commandCell/CommandCell.js'
import { ColumnMenu } from '@/component/columnMenu/columnMenu.js'
import { process } from '@progress/kendo-data-query';
import moment from "moment";
import _ from 'lodash';
class Grid extends React.Component {
    constructor(props) {
        super(props);
        //set the grid status.
        this.editField="inEdit"
        const dataState = {
            skip: 0,
            take: 20,
            sort: [
                { field: 'orderDate', dir: 'desc' }
            ],
            group: [
            ]
        };
        this.format="MM/dd/yyyy";
        this.state = {
            //gird 's status
            dataState: dataState,
            //gird 's data
            data:[{orderId:"011"}],
            //grid 's total for data
            total:0
        };
        //get the data for api.
        this.getDataSource();
    }

    componentWillReceiveProps(nextProps) {

    }

    showErrorMessage(message){
        this.props.showDialog([{text:"OK",action:()=>{this.props.closeDialog()}}],message)
    }
    

    //get the data by ajax. send the 'GET' http method.
    getDataSource(){
        this.props.showLoading();
        //send the GET requset
        let url=this.props.apiList.getListApi.url;
        let arr=this.props.apiList.getListApi.urlParamsTemp
        if(arr.length){
            url=url+"?";
            for(let i=0;i<arr.length;i++){
                url=url+encodeURI(arr[i].param+"="+arr[i].value);
                if(i!==(arr.length-1)){
                    url=url+"&";
                }
            }
        }
        Axios.get(url).then((response)=>{
            this.props.closeLoading();
            //set the data to grid.
            let data=response.data;
            if(data instanceof Object){
                for(let item in data){
                    if(item==="_alchemyj_info"){
                        continue;
                    }
                    if(data[item] instanceof Array){
                        data=data[item];
                    }
                }
            }
            if(!data || !(data instanceof Array)){
                data=[];
            }
            for(let i=0;i<data.length;i++){
                for(let j=0;j<this.props.columns.length;j++){
                    if(this.props.columns[j].type==="date"){
                        data[i][this.props.columns[j].field]=moment(data[i][this.props.columns[j].field],"MM/DD/YYYY").toDate();
                    }else if(this.props.columns[j].type==="numeric"){
                        data[i][this.props.columns[j].field]=parseFloat(data[i][this.props.columns[j].field]);
                    };
                }
            }
            this.originalData=_.cloneDeep(data);
            this.setState({
                data: data,
                total:data.length
            });
        }).catch(()=>{
            this.props.closeLoading();
            this.showErrorMessage("Fail to get the data");
        });
    }

    //insert a record by ajax. send the 'POST' http method.
    insert(dataItem){
        this.props.showLoading();
        //send the POST requset
        let parameters = Object.assign({},dataItem);
        this.props.showLoading();
        for(let i=0;i<this.props.columns.length;i++){
            if(this.props.columns[i].type==="date"){
                parameters[this.props.columns[i].field]=moment(parameters[this.props.columns[i].field]).format("MM/DD/YYYY");
            };
        }
        //call the url to do the insert
        Axios.post(this.props.apiList.insertApi.url,dataItem).then(()=>{
            //if success then add the record to dataSource
            dataItem[this.props.primaryKey]=new Date().getTime();
            this.props.closeLoading();
            //refresh the grid data.
            this.setState({
                data: this.state.data,
                total:this.state.total+1
            });
            this.originalData.push(_.cloneDeep(dataItem));
        }).catch(()=>{
            //if fail reset the record status and popup the message.
            this.props.closeLoading();
            dataItem.inEdit = true;
            delete dataItem[this.props.primaryKey];
            this.setState({
                data: this.state.data,
            });
            this.showErrorMessage("Fail to add the record");
        });
    }
    //update a record by ajax. send the 'PUT' http method.
    update(dataItem){
        //set the parameter and update record status.
        let data=this.state.data;
        const updatedItem = Object.assign({},dataItem);
        updatedItem.inEdit=false;
        let parameters = Object.assign({},dataItem);
        this.props.showLoading();
        for(let i=0;i<this.props.columns.length;i++){
            if(this.props.columns[i].type==="date"){
                parameters[this.props.columns[i].field]=moment(parameters[this.props.columns[i].field]).format("MM/DD/YYYY");
            };
        }
        //send a request to do the update.
        Axios.put(this.props.apiList.updateApi.url,parameters).then(()=>{
            this.props.closeLoading();
            //update the recorcd from grid.
            this.updateItem(data, updatedItem);    
            this.updateItem(this.originalData, _.cloneDeep(updatedItem));    
            //refresh the grid data.
            this.setState({ data:data });
        }).catch(()=>{
            //if fail then popup the message.
            this.props.closeLoading();
            this.showErrorMessage("Fail to update the record");
        });

    }

    //delete a record by ajax. send the 'DELETE' http method.
    delete(dataItem){
        this.props.showLoading();
        let data=this.state.data;
        //call api to delele the record.
        Axios.delete(this.props.apiList.deleteApi.url,dataItem).then(()=>{
            //close the loading and change the dataSource.
            this.props.closeLoading();
            let index = this.originalData.findIndex(p => p === dataItem || (dataItem[this.props.primaryKey] && p[this.props.primaryKey]=== dataItem[this.props.primaryKey]));
            if (index >= 0) {
               this.originalData.splice(index,1);
               let dataSource=process(this.originalData.slice(0), this.state.dataState);
               this.setState({
                    data:dataSource.data,
                    total:dataSource.total
               });
            }
        }).catch(()=>{
            this.props.closeLoading();
            this.showErrorMessage("Fail to delete the record");
        });
    }

    //update the record
    updateItem = (data, item) => {
        let index = data.findIndex(p => p === item || (item[this.props.primaryKey] && p[this.props.primaryKey] === item[this.props.primaryKey]));
        if (index >= 0) {
            data[index] = item;
        }
    }


    //set the record to edit mode
    enterEdit(dataItem){
        let data=this.state.data;
        this.setState({
            data: data.map((item)=>{
                    if(item[this.props.primaryKey] === dataItem[this.props.primaryKey]){
                        item.inEdit=true;
                    }
                    return item;
                }
            )
        });
    };

    componentWillUnmount() {
    }


    //call api to insert the record
    add(dataItem){
        let data=this.state.data;
        dataItem.inEdit = false;
        this.insert(dataItem);
    };

    //remove the record from gir
    removeItem(data, item) {
        let index = data.findIndex(p => p === item || (item[this.props.primaryKey] && p[this.props.primaryKey] === item[this.props.primaryKey]));
        if (index >= 0) {
            data.splice(index, 1);
        }
    }
    //cancel the add operation.
    discard(dataItem){
        const data = this.state.data;
        this.removeItem(data, dataItem);
        this.removeItem(this.originalData, dataItem);
        this.setState({ data });
    }

    //cancel the update operation
    cancel(dataItem) {
        const originalItem = _.cloneDeep(this.originalData.find((originalItem) => {
                return originalItem[this.props.primaryKey] === dataItem[this.props.primaryKey];
            }
        ));
        console.log(originalItem);
        const data = this.state.data.map(item =>{
            if(item[this.props.primaryKey] === originalItem[this.props.primaryKey]){
                originalItem.inEdit=false;
                return originalItem;
            }
            return item;
        }      
        );

        this.setState({ data });
    };


    //show a dialog to confirm if to delete the record.
    showDialog(dataItem){
        this.props.showDialog([{
            text:"Yes",action:()=>{
                this.delete(dataItem);
                this.props.closeDialog()
            }
        },{
            text:"No",action:(e)=>{
                this.props.closeDialog()
            }
        }])
    }

    //get the action button 
    getActionButton(props){
        if(props.rowType==="groupHeader" || this.state.dataState.group.length>0){
            return <td style={{width:0}}></td>;
        }
        return <CommandCell
                {...props}
                edit={(e)=>{this.enterEdit(e)}}
                remove={(e)=>{this.showDialog(e)}}
                add={(e)=>{this.add(e)}}
                update={(e)=>{this.update(e)}}
                cancel={(e)=>{this.cancel(e)}}
                discard={(e)=>{this.discard(e)}}
                id={this.props.primaryKey}
                editField={this.editField}/>
    }

    //change the item
    itemChange(event){
        const data = this.state.data.map(item =>{
            if(item[this.props.primaryKey] === event.dataItem[this.props.primaryKey]){
                item[event.field]=event.value;
            }
            return item;
        });
        this.setState({ data });
    }


    //add a record to grid
    addNew = () => {
        const newDataItem = { inEdit: true, Discontinued: false };
        this.state.data.push(newDataItem);
        this.setState({
            data: this.state.data
        });
    }

    //change the grid 's state
    dataStateChange = (event) => {
        console.log(event);
        let dataSource=process(this.originalData.slice(0), event.dataState);
        this.setState({
            data:dataSource.data,
            total:dataSource.total,
            dataState:event.dataState
        })
    }
    

    //get Grid 's columns element
    getGridColumns(){
        let columns=[];
        for(let i=0;i<this.props.columns.length;i++){
            let column=this.props.columns[i];
            if(column.hidden===true){
                continue;
            }
            let props=Object.assign(column,{});
            if(column.type==="date"){
                props.editor="date";
                props.format=`{0:${this.format}}`;
            }else if(column.type==="numeric"){
                props.editor="numeric";
                if(!props.format){
                    props.format="{0:n}";
                }
            }else{
                props.editor="text";
            }
            let element=(<GridColumn key={i} columnMenu={ColumnMenu}
                  {...props}/>);
            columns.push(element);
        }
        return columns;
    }
    //catch the ui error.
    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
    }
    render() {

        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong. Please check the grid configuration.</h1>;
        }

        return (
            <div className="Grid" >
                        <KendoGrid editField={this.editField}
                                        onItemChange={(e)=>{this.itemChange(e)}}
                            style={{ height: '700px' }}
                            sortable
                            groupable
                            reorderable
                            onDataStateChange={this.dataStateChange}
                            data={this.state.data}
                            total={this.state.total}
                            pageable={{ buttonCount: 4, pageSizes: true }}
                            {...this.state.dataState}>
                      <GridToolbar>
                        <button
                            title="Add Record"
                            className="k-button k-primary"
                            onClick={this.addNew}
                        >
                            Add Record
                        </button>
                        </GridToolbar>
                            {this.getGridColumns()}
                            <GridColumn width="200px" cell={(props)=>this.getActionButton(props)} title="Action"/>
                        </KendoGrid>
            </div>
        );
    }
}

export default Grid;