import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import {fetchStreams} from '../actions';

class StreamList extends React.Component {
    buttonCreate = () => {
        if(this.props.isSignedIn){
            return(
                <div style={{textAlign:'right'}}>
                    <Link to='/streams/new' className='ui button primary'>Create Stream</Link>
                </div>
            )
        }}

    componentDidMount(){ 
        this.props.fetchStreams();
    }
    renderTwoButton = (stream) => {
        if(stream.userId===this.props.userId)
        return(
            <div className='right floated content'> 
                <Link to={`/streams/edit/${stream.id}`} className='ui button primary'>Edit</Link>
                <Link to='/streams/delete' className='ui button negative'>Delete</Link>
            </div>   
        )
    }
    renderList = () => {
        return(
        this.props.streams.map(stream => {
         return (
         <div className='item' key={stream.id}>
               <div>{this.renderTwoButton(stream)}</div>
               <Link to={`/streams/show/${stream.id}`}>
               <i className='large middle aligned icon camera'/>
             <div className='content'>
                 {stream.title}
             </div>    
             <div className='description'>
                 {stream.description}
             </div>
                </Link>
            
        </div>
        )}))
    }

    render(){
    return (
        <div className='ui container'>
        <h3>Streams</h3>
        <div className='ui celled list'>
            {this.renderList()}
        </div>
       <div>
            {this.buttonCreate()}
        </div>
        </div>
       )
    }
}
const mapStateToProps = state => {
    return {isSignedIn: state.auth.isSignedIn, streams: Object.values(state.stream), userId: state.auth.userId }
}
export default connect(mapStateToProps,{fetchStreams}) (StreamList);