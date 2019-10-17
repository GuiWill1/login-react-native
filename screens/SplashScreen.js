import React,{Component} from 'react';
import {View, Text, StyleSheet,ActivityIndicator,Image} from 'react-native';

import { Container } from 'native-base';
//import firebase from 'firebase';
import Firebase from '../constants/Config';
import '@firebase/firestore';

const db = Firebase.firestore()


class SplashScreen extends Component{
    componentDidMount(){
        this.checkUserLoggedStatus();
    }
    
    checkUserLoggedStatus = () =>{
        Firebase.auth().onAuthStateChanged(
            function(user){
                if (user){
                    let uid = Firebase.auth().currentUser.uid
                   
                    db.collection("Vendedor").doc(uid).get()
                    .then((doc) => {
                        if (doc.exists){
                            this.props.navigation.navigate('HomeAdm')
                        }else{
                            
                            this.props.navigation.navigate('Main')
                            
                        }
                    })
                    
                }else{
                    this.props.navigation.navigate('InicioStack')
                   
                }
        }.bind(this)
        );
    };
    render(){
        return(
            
           
            
            <View style={styles.container}>
                 <Image style={styles.image} source={require('../assets/images/icon.png')}/>
                <ActivityIndicator size="large"/>
               
            </View>
        );
    }
    
}
export default SplashScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image:{
        alignItems: 'center',
        justifyContent: 'center',
        width:200,
        height:200
    }

})
