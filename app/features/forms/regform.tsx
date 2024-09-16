import * as React from 'react';
import * as Yup from 'yup';
import { FormikStepper, FormikHelpers, InputField, CheckBoxField } from 'formik-stepper';
import { Image, TextInput, Text, View, StyleSheet } from 'react-native';
import { IconButton, MD3Colors } from 'react-native-paper';
import FormikStep from 'formik-stepper/dist/fromikForm/FormikStep';

const userSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Email is not valid').required('Email is required'),
    password: Yup.string().required('Password is required').matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*)[A-Za-z\d]{8,}$/,
        `Must Contain 8 Characters, One Uppercase, One Lowercase,
        One Number and one special case Character [@$!%*#?&-_]`
    ),
    firstname: Yup.string().required('Firstname is required'),
    lastname: Yup.string().required('Lastname is required'),
    avatar: Yup.string(),
    cover: Yup.string(),
    privacy: Yup.boolean().isTrue().oneOf([true], "The terms and conditions must be accepted.")
});

const RegisterForm = () => {
    const initialValues = { 
        username: '', 
        email: '', 
        password: '', 
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
            <FormikStepper 
                onSubmit={onSubmit}
                initialValues={initialValues} 
                validationSchema={userSchema} 
                withStepperLine={true}
                nextButton={{ label: "Step" }}
                prevButton={{ label: "Back" }}
                submitButton={{ label: "Done", style: { background: "blue" } }}
            >
                <View style={styles.mregfrm}>
                    <FormikStep label="Personal Info">
                        <InputField
                            type="text"
                            name="username"
                            label="Username"
                            placeholder='Write your username here...'
                            style={styles.frminp}
                        />

                        <InputField
                            type="email"
                            name="email"
                            label="Email"
                            placeholder='Write your email here...'
                            style={styles.frminp}
                        />

                        <InputField
                            type="password"
                            name="password"
                            label="Password"
                            placeholder='Write your password here...'
                            style={styles.frminp}
                        />

                        <InputField
                            type="text"
                            name="firstname"
                            label="First Name"
                            placeholder='Write your first name here...'
                            style={styles.frminp}
                        />

                        <InputField
                            type="text"
                            name="lastname"
                            label="Last Name"
                            placeholder='Write your last name here...'
                            style={styles.frminp}
                        />
                    </FormikStep>

                    <FormikStep label="Avatar & Cover">
                        <View>
                            <Text style={styles.frmlbl}>Avatar</Text>
                            <Image
                                style={styles.frmavatar}
                                source={require('@expo/snack-static/react-native-logo.png')}
                            />
                            <IconButton
                                icon="upload"
                                iconColor={MD3Colors.error50}
                                size={20}
                                onPress={() => console.log('image icon pressed...')}
                            />
                        </View>

                        <View>
                            <Text style={styles.frmlbl}>Cover</Text>
                            <Image
                                style={styles.frmcover}
                                source={require('@expo/snack-static/react-native-logo.png')}
                            />
                            <IconButton
                                icon="upload"
                                iconColor={MD3Colors.error50}
                                size={20}
                                onPress={() => console.log('image icon pressed...')}
                            />
                        </View>
                    </FormikStep>

                    <FormikStep label="Final Steps">
                        <Text style={styles.frmlbl}>Terms & Conditions</Text>
                        <TextInput
                            editable={false}
                            multiline={true}
                            numberOfLines={4}
                            value={'Lorem ipsum...'}
                        />

                        <View style={styles.magreeterms}>
                            <CheckBoxField
                                name='privacy'
                                label='privacy'
                                disabled={false}
                                value={false}
                                onValueChange={() => {}}
                                style={styles.chkagreeterms}
                            />

                            <Text style={styles.txtagreeterms}>
                                I agree the terms & conditions.
                            </Text>
                        </View>
                    </FormikStep>
                </View>
            </FormikStepper>
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
        borderRadius: 50
    },
    frmcover: {
        width: 300,
        height: 150,
        borderRadius: 5
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