import * as React from 'react';
import * as Yup from 'yup';
import Checkbox from 'expo-checkbox';
import { ErrorMessage, Formik, FormikHelpers } from 'formik';
import { IconButton, MD3Colors } from 'react-native-paper';
import { Image, TextInput, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const userSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(4, 'Password is too short').required('Password is required'),
    email: Yup.string().email('Email is not valid').required('Email is required'),
    firstname: Yup.string().required('Firstname is required'),
    lastname: Yup.string().required('Lastname is required'),
    avatar: Yup.string(),
    cover: Yup.string(),
    privacy: Yup.boolean().isTrue().oneOf([true], "The terms and conditions must be accepted.")
});

const RegisterForm = () => {
    const initialValues = {
        username: '',
        password: '',
        email: '',
        firstname: '',
        lastname: '',
        avatar: '',
        cover: '',
        privacy: false
    };

    const onSubmit = async (
        values: any,
        { setSubmitting }: FormikHelpers<any>
    ) => {
        console.log(values);
    };

    return (
        <>
            <Formik
                onSubmit={onSubmit}
                initialValues={initialValues}
                validationSchema={userSchema}
            >
                {props => (
                    <View style={styles.mregfrm}>
                        <Text style={styles.frmlbl}>Username</Text>
                        <TextInput
                            placeholder='Write your username here...'
                            onChangeText={props.handleChange('username')}
                            onBlur={props.handleBlur('username')}
                            value={props.values.username}
                            style={styles.frminp}
                        />

                        {props.errors.username && props.touched.username && (
                            <Text style={styles.frminperr}>
                                <ErrorMessage name="username" />
                            </Text>
                        )}

                        <Text style={styles.frmlbl}>Password</Text>
                        <TextInput
                            secureTextEntry={true}
                            placeholder='Write your password here...'
                            onChangeText={props.handleChange('password')}
                            onBlur={props.handleBlur('password')}
                            value={props.values.password}
                            style={styles.frminp}
                        />

                        {props.errors.password && props.touched.password && (
                            <Text style={styles.frminperr}>
                                <ErrorMessage name="password" />
                            </Text>
                        )}

                        <Text style={styles.frmlbl}>Email</Text>
                        <TextInput
                            placeholder='Write your email here...'
                            onChangeText={props.handleChange('email')}
                            onBlur={props.handleBlur('email')}
                            value={props.values.email}
                            style={styles.frminp}
                        />

                        {props.errors.email && props.touched.email && (
                            <Text style={styles.frminperr}>
                                <ErrorMessage name="email" />
                            </Text>
                        )}

                        <Text style={styles.frmlbl}>First Name</Text>
                        <TextInput
                            placeholder='Write your first name here...'
                            onChangeText={props.handleChange('firstname')}
                            onBlur={props.handleBlur('firstname')}
                            value={props.values.firstname}
                            style={styles.frminp}
                        />

                        {props.errors.firstname && props.touched.firstname && (
                            <Text style={styles.frminperr}>
                                <ErrorMessage name="firstname" />
                            </Text>
                        )}

                        <Text style={styles.frmlbl}>Last Name</Text>
                        <TextInput
                            placeholder='Write your last name here...'
                            onChangeText={props.handleChange('lastname')}
                            onBlur={props.handleBlur('lastname')}
                            value={props.values.lastname}
                            style={styles.frminp}
                        />

                        {props.errors.lastname && props.touched.lastname && (
                            <Text style={styles.frminperr}>
                                <ErrorMessage name="lastname" />
                            </Text>
                        )}

                        <Text style={styles.frmlbl}>Avatar</Text>
                        <View style={styles.frmmavatar}>
                            <Image
                                style={styles.frmavatar}
                                source={require('assets/images/users/luis.jpg')}
                            />
                            <IconButton
                                icon="upload"
                                iconColor={MD3Colors.error50}
                                size={20}
                                style={styles.frmicouplavatar}
                                onPress={() => console.log('image icon pressed...')}
                            />
                        </View>
                        <Text style={styles.txtmaxresimg}>Max resolution size: 150x150 (cropped to: 100x100)</Text>

                        <Text style={styles.frmlbl}>Cover</Text>
                        <View style={styles.frmmavatar}>
                            <Image
                                style={styles.frmcover}
                                source={require('assets/images/users/covers/luis_c.jpeg')}
                            />
                            <IconButton
                                icon="upload"
                                iconColor={MD3Colors.error50}
                                size={20}
                                style={styles.frmicoupl}
                                onPress={() => console.log('image icon pressed...')}
                            />
                        </View>
                        <Text style={styles.txtmaxresimg}>Max resolution size: 1920x1080 (cropped to: 300x150)</Text>

                        <Text style={styles.frmlbl}>Terms & Conditions</Text>
                        <TextInput
                            editable={false}
                            multiline={true}
                            numberOfLines={1}
                            value={'Lorem ipsum...'}
                            style={styles.frminp}
                        />

                        <View style={styles.magreeterms}>
                            <Checkbox
                                disabled={false}
                                value={props.values.privacy}
                                onValueChange={(newVal) => { props.setFieldValue("privacy", newVal); }}
                                style={styles.chkagreeterms}
                            />
                            <Text style={styles.txtagreeterms}>
                                I agree the terms & conditions.
                            </Text>
                        </View>
                            
                        {props.errors.privacy && props.touched.privacy && (
                            <Text style={styles.frminperr}>
                                <ErrorMessage name="privacy" />
                            </Text>
                        )}

                        <View style={styles.mfrmbtns}>
                            <TouchableOpacity onPress={() => { props.resetForm(); }} style={styles.frmbtnclear}>
                                <Text>Clear</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { props.handleSubmit(); }} style={styles.frmbtnsub}>
                                <Text>Register</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </>
    );
}

const styles = StyleSheet.create({
    mregfrm: {
        flexDirection: 'column',
        marginTop: 0,
        padding: 15
    },
    frmlbl: {
        marginTop: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff'
    },
    frminp: {
        backgroundColor: 'white',
        borderRadius: 50,
        width: '100%',
        marginTop: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingVertical: 5,
        paddingHorizontal: 15,
        textAlign: 'center',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10
    },
    frminperr: {
        color: '#fff',
        padding: 5,
        marginTop: 15,
        textAlign: 'center'
    },
    mfrmbtns: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 0,
        marginTop: 10,
    },
    frmavatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 15,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    frmcover: {
        width: 300,
        height: 150,
        borderRadius: 5,
        marginTop: 15,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    frmmavatar: { 
        position: 'relative' 
    },
    frmmcover: { 
        position: 'relative' 
    },
    frmicouplavatar: {
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: -10, 
        left: '50%',
        right: 'auto',
        width: 25,
        height: 25
    },
    frmicoupl: { 
        backgroundColor: '#fff',
        position: 'absolute', 
        bottom: -10, 
        left: 'auto',
        right: 0,
        width: 25,
        height: 25
    },
    txtmaxresimg: {
        color: '#fff',
        marginTop: 15, 
        textAlign: 'center'
    },
    frmbtnback: {
        backgroundColor: '#12C2FF',
        padding: 10,
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 25,
        width: '50%',
        alignItems: 'center',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10
    },
    frmbtnnext: {
        backgroundColor: '#00FF38',
        padding: 10,
        marginTop: 15,
        marginLeft: 15,
        marginBottom: 15,
        borderRadius: 25,
        width: '50%',
        alignItems: 'center',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10
    },
    frmbtnclear: {
        backgroundColor: '#12C2FF',
        padding: 10,
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 25,
        width: '50%',
        alignItems: 'center',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10
    },
    frmbtnsub: {
        backgroundColor: '#00FF38',
        padding: 10,
        marginTop: 15,
        marginLeft: 15,
        marginBottom: 15,
        borderRadius: 25,
        width: '50%',
        alignItems: 'center',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10
    },
    magreeterms: {
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    chkagreeterms: {
        width: 25,
        height: 25,
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderRadius: 30,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10
    },
    txtagreeterms: {
        textAlign: 'left',
        marginLeft: 10,
        color: '#fff'
    },
});

export default RegisterForm;