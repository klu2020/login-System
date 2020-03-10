import React from 'react';
import {fetchStream} from '../actions';
import {connect} from 'react-redux';

class StreamShow extends React.Component  {
    
    componentDidMount(){
       this.props.fetchStream(this.props.match.params.id);
    }

    render(){
        if(!this.props.selectedStream){
            return <div>Loading...</div>
        }
        return (
        <div className='ui container'>
            <h1>{this.props.selectedStream.title}</h1>
            <h5>{this.props.selectedStream.description}</h5> 
        </div> 
        )
    }

}

const mapStateToProps = (state, ownProps) => {
 return {selectedStream:state.stream[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchStream}) (StreamShow);