import React from 'react';
import {fetchStream, editStream} from '../actions';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import history from './history';



class StreamEdit extends React.Component {
    errorRender = (props) =>{
        if(props.meta.error && props.meta.touched){
       return <div>{props.meta.error}</div>
        }
    }
    formRender = (props) => {
        const fieldName = `field ${props.meta.error && props.meta.touched ? 'error' :''}`
        return(
        <div className={fieldName}>
            <label>{props.label}</label>
            <input {...props.input}/>
            <div>{this.errorRender(props)}</div>
        </div>
        )
    }
    onSubmit = formValue => {
        console.log(formValue);
       this.props.editStream(this.props.match.params.id,formValue);
    }

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }
    render(){
    if(!this.props.isSignedIn){
        history.push('/');
    }
    else if(!this.props.stream){
        return <div>Loading...</div>
    }
    return (
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form ui container'>
            <Field name='title' component={this.formRender} label= 'Enter Title:'/>
            <Field name='description' component={this.formRender} label='Enter Description:' />
            <div style={{textAlign:'right'}}>
                <button className='ui button primary'>Submit</button>
            </div>   
        </form>
    )
    }

    
}
const validate = props => {
    const errors = {};
     if(!props.title){
         errors.title='You must enter a title';
     }
     if(!props.description){
         errors.description = 'You must enter a description';
     }
     return errors;
 }

const mapStateToProps = (state,ownProp) => {
    return {stream: state.stream[ownProp.match.params.id], 
            isSignedIn: state.auth.isSignedIn,
            initialValues: {title:state.stream[ownProp.match.params.id].title, description:state.stream[ownProp.match.params.id].description}
        }
}
const formPackage = reduxForm({form:'StreamEdit', validate:validate}) (StreamEdit)
export default connect(mapStateToProps,{fetchStream,editStream})(formPackage);