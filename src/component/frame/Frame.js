import React from 'react';
import './Frame.styl'
import { Card } from 'antd';
import 'antd/dist/antd.css';
import { UpCircleOutlined,DownCircleOutlined} from '@ant-design/icons';

class Frame extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            hasError:false,
            display:true
        }
        if(this.props.display!=undefined){
            this.state.display=this.props.display;
        }
        
    }

    componentWillReceiveProps(nextProps) {

    }

  
    //catch the ui error.
    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
    }

    showContent(){
       this.setState({
           display:true
       });
    }
    hideContent(){
        this.setState({
            display:false
        });
     }

    render() {

        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }
        let icon;
        let iconStyle={"fontSize":"20px"}
        if(this.state.display){
            icon=<UpCircleOutlined style={iconStyle} onClick={()=>{this.hideContent()}}/>
        }else{
            icon=<DownCircleOutlined style={iconStyle}  onClick={()=>{this.showContent()}}/>
        }
        return (
            
            <div className="Frame" >
                <Card title={this.props.title} extra={icon} >
                    {this.state.display && this.props.children
                    }
                </Card>
            </div>
        );
    }
}

export default Frame;