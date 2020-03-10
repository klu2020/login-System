import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {createStream} from '../actions';

import history from './history';

class StreamCreate extends React.Component {
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
       this.props.createStream(formValue);
    }
    render(){ 
        if(!this.props.isSignedIn){
        history.push('/');
        }
        return(
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
const mapStateToProps = state => {
    return {isSignedIn: state.auth.isSignedIn}
}
const formPackage = reduxForm({form:'StreamCreate',validate:validate}) (StreamCreate)
export default connect(mapStateToProps,{createStream})(formPackage);
