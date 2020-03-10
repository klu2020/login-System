import React from 'react';
import {connect} from 'react-redux';

import {signIn,signOut} from '../actions';

 
class GoogleAuth extends React.Component {
   // state = {isSignedIn:null};
    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '295762945152-8auk97mse31am1btqmn2v3795vim4jaf.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.authchange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.authchange);
            });
        });
    }
    authchange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }
        else{
            this.props.signOut();
        }
        
    }
    signIn = () => {
        this.auth.signIn();
    }
    signOut = () => {
        this.auth.signOut();
    }
    renderButtonType = () => {
        if(this.props.isSignedIn===null){
            return null
        }
        else if(this.props.isSignedIn){
            return(
                <div>
                <button onClick={this.signOut} className='ui red google button'>
                        <i className='google icon'/>
                        Sign Out
                </button>
                </div>
                
                );
            }
            else
            return(
                <div>
                <button onClick={this.signIn} className='ui red google button'>
                        <i className='google icon'/>
                        Sign In with Google
                </button>
                </div>
            )
    }
    render(){
        return( 
        <div>
        {this.renderButtonType()}
        </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        isSignedIn: state.auth.isSignedIn  
    }
}

export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);