import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../config/firebase";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";

const backImage = require('../../assets/backImage.png')

const Register = ({ navigation }: StackScreenProps<RootStackParamList>) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = () => {
        if (email !== '' && password !== '') {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => console.log('Register success'))
                .catch(err => Alert.alert('Register error', err.message))
        }
    }

    return (
        <View style={styles.container}>
            <Image source={backImage} style={styles.backImage}/>

            <View style={styles.whiteSheet}>
                <SafeAreaView style={styles.form}>
                    <Text style={styles.title}>Register</Text>
                    <TextInput style={styles.input} placeholder={'Email address'} autoCapitalize={'none'}
                               keyboardType={'email-address'} textContentType={'emailAddress'} autoFocus value={email}
                               onChangeText={v => setEmail(v)}/>
                    <TextInput style={styles.input} placeholder={'Password'} autoCapitalize={'none'} autoCorrect={false}
                               textContentType={'password'} secureTextEntry autoFocus value={password}
                               onChangeText={v => setPassword(v)}/>

                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Sign Up</Text>
                    </TouchableOpacity>

                    <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                        <Text style={{ color: 'grey', fontWeight: '600', fontSize: 14 }}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={{ color: '#f57c00', fontWeight: '600', fontSize: 14 }}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        </View>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: "orange",
        alignSelf: "center",
        paddingBottom: 24,
    },
    input: {
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
    },
    backImage: {
        width: "100%",
        height: 340,
        position: "absolute",
        top: 0,
        resizeMode: 'cover',
    },
    whiteSheet: {
        width: '100%',
        height: '75%',
        position: "absolute",
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    button: {
        backgroundColor: '#f57c00',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
});