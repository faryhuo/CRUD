import React from 'react';
import './AjaxParameter.styl'
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import { Table, Carousel } from 'antd';
import { random } from 'lodash';
import { Input } from '@progress/kendo-react-inputs';

const { Column, ColumnGroup } = Table;

class AjaxParameter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            data: [{
                index:0,
                checkedItem: true,
                key:"",
                value:"",
            }]
        }
    }

    isCheckAll() {
        for (let i = 0; i < this.props.apiConfig.urlParamsTemp.length; i++) {
            if (!this.props.apiConfig.urlParamsTemp[i].enable) {
                return false;
            }
        }
        return true;
    }

    componentWillReceiveProps(nextProps) {

    }


    //catch the ui error.
    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
    }
    //change the tab
    handleSelect = (e) => {
        this.setState({ selected: e.selected });
    }

    changeUrlParam(index,field,value){
        this.props.changeUrlParamsTemp(index,field,value);
    }

    render() {

        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }
        

        return (
            <div className="AjaxParameter" >
                <TabStrip selected={this.state.selected} onSelect={this.handleSelect}>
                    <TabStripTab title="Url Params">
                        <div>
                            <Table
                                dataSource={this.props.apiConfig.urlParamsTemp}
                                bordered
                                pagination={false}
                            >
                                <Column title={(<div> </div>)}
                                    dataIndex="enable"
                                    key="enable"
                                    render={(checkedItem,dataItem,index) => (
                                            <div>
                                                <input onClick={(e)=>{this.changeUrlParam(index,"enable",e.target.checked)}}  checked={checkedItem} type="checkbox" id={"checkedItem_" + index} className="k-checkbox" />
                                                <label className="k-checkbox-label" htmlFor={"checkedItem_" + index}></label>
                                            </div>)
                                    } />
                                  <Column title={"Param"}
                                    dataIndex="param"
                                    key="param"
                                    render={(param,dataItem,index) =>  (
                                            <div key={param}>
                                               <Input onChange={(e)=>{this.changeUrlParam(index,"param",e.target.value)}}  style={{width:"100%"}} value={param}></Input>
                                            </div>)
                                    } />
                                   <Column title={"VALUE"}
                                    dataIndex="value"
                                    key="value"
                                    render={(value,dataItem,index) =>  (
                                            <div >
                                               <Input onChange={(e)=>{this.changeUrlParam(index,"value",e.target.value)}} style={{width:"100%"}} value={value}></Input>
                                            </div>)
                                    } />
                            </Table>
                        </div>
                    </TabStripTab>
                    <TabStripTab title="Body">
                        <div>
                            <textarea onChange={(e)=>{this.props.changeBodyParamsTemp(e.target.value)}} style={{width:"100%",height:"300px"}} value={this.props.apiConfig.bodyParamsTemp}></textarea>
                        </div>
                    </TabStripTab>
                </TabStrip>
            </div>
        );
    }
}

export default AjaxParameter;