import * as React from 'react';
import * as Yup from 'yup';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import { ErrorMessage, Formik, FormikHelpers } from 'formik';
import { IconButton, MD3Colors } from 'react-native-paper';
import { Image, TextInput, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

const userSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(4, 'Password is too short').required('Password is required'),
    email: Yup.string().email('Email is not valid').required('Email is required'),
    firstname: Yup.string().required('Firstname is required'),
    lastname: Yup.string().required('Lastname is required'),
    avatar: Yup.string(),
    cover: Yup.string(),
    privacy: Yup.boolean().isTrue().oneOf([true], "The terms and conditions must be accepted."),
    role: Yup.string()
});

const RegisterFormStepper = () => {
    const [curstep, setCurStep] = useState(0);
    const [step1Data, setStep1Data] = useState({
        username: '',
        password: '',
        email: '',
        firstname: '',
        lastname: ''
    });

    const [step2Data, setStep2Data] = useState({
        avatar: '',
        cover: ''
    });

    const [step3Data, setStep3Data] = useState({
        privacy: false,
        role: 'user'
    });

    const initialValues = {
        username: '',
        password: '',
        email: '',
        firstname: '',
        lastname: '',
        avatar: '',
        cover: '',
        privacy: false,
        role: 'user'
    };

    const clearStepsData = (props: any) => {        
        setStep1Data({
            username: '',
            password: '',
            email: '',
            firstname: '',
            lastname: ''
        });

        setStep2Data({
            avatar: '',
            cover: ''
        });

        setStep3Data({
            privacy: false,
            role: 'user'
        });

        setCurStep(0);
        props.resetForm();
    }

    const onSubmit = async (
        values: any,
        { setSubmitting, resetForm }: FormikHelpers<any>
    ) => {
        console.log(values);
        resetForm();
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
                        <ProgressSteps activeStep={curstep}>
                            <ProgressStep label="User info">
                                <Text style={styles.frmlbl}>Username</Text>
                                <TextInput
                                    placeholder='Write your username here...'
                                    value={step1Data.username}
                                    onChangeText={v => { setStep1Data({ ...step1Data, username: v }); props.setFieldValue("username", v); props.handleChange('username'); }}
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
                                    value={step1Data.password}
                                    onChangeText={v => { setStep1Data({ ...step1Data, password: v }); props.setFieldValue("password", v); props.handleChange('password'); }}
                                    onBlur={props.handleBlur('password')}
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
                                    value={step1Data.email}
                                    onChangeText={v => { setStep1Data({ ...step1Data, email: v }); props.setFieldValue("email", v); props.handleChange('email'); }}
                                    onBlur={props.handleBlur('email')}
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
                                    value={step1Data.firstname}
                                    onChangeText={v => { setStep1Data({ ...step1Data, firstname: v }); props.setFieldValue("firstname", v); props.handleChange('firstname'); }}
                                    onBlur={props.handleBlur('firstname')}
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
                                    value={step1Data.lastname}
                                    onChangeText={v => { setStep1Data({ ...step1Data, lastname: v }); props.setFieldValue("lastname", v); props.handleChange('lastname'); }}
                                    onBlur={props.handleBlur('lastname')}
                                    style={styles.frminp}
                                />

                                {props.errors.lastname && props.touched.lastname && (
                                    <Text style={styles.frminperr}>
                                        <ErrorMessage name="lastname" />
                                    </Text>
                                )}
                            </ProgressStep>

                            <ProgressStep label="Avatar & Cover">
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
                                        onPress={() => { setStep2Data({ ...step2Data, avatar: 'assets/images/users/luis.jpg' }); props.setFieldValue("avatar", 'assets/images/users/users/luis.jpg'); console.log('image icon pressed...'); }}
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
                                        onPress={() => { setStep2Data({ ...step2Data, cover: 'assets/images/users/covers/luis_c.jpeg' }); props.setFieldValue("cover", 'assets/images/users/covers/luis_c.jpeg'); console.log('image icon pressed...'); }}
                                    />
                                </View>
                                <Text style={styles.txtmaxresimg}>Max resolution size: 1920x1080 (cropped to: 300x150)</Text>
                            </ProgressStep>

                            <ProgressStep label="Final steps">
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
                                        value={step3Data.privacy}
                                        onValueChange={(newVal) => { setStep3Data({ ...step3Data, privacy: newVal }); props.setFieldValue("privacy", newVal); }}
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
                                    <TouchableOpacity onPress={() => { clearStepsData(props); }} style={styles.frmbtnclear}>
                                        <Text>Clear</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => { console.log(props.values); clearStepsData(props); props.resetForm(); }} style={styles.frmbtnsub}>
                                        <Text>Register</Text>
                                    </TouchableOpacity>
                                </View>
                            </ProgressStep>
                        </ProgressSteps>
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
    }
});

export default RegisterFormStepper;