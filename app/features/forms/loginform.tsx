import { Link } from '@react-navigation/native';
import { Formik, ErrorMessage } from 'formik';
import { TextInput, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import CheckBox from 'expo-checkbox';
import * as Yup from 'yup';

const userSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(4, 'Password is too short').required('Password is required'),
    rememberme: Yup.bool()
});

const LoginForm = () => {
    const initialValues = { username: '', password: '', rememberme: false };

    const handleClear = ({resetForm}: any) => {
        resetForm()
    };

    const handleSubmit = (values: any, { resetForm, setSubmitting }: any) => {
        // Handle form submission here
        console.log(values);
        setSubmitting(false);
        resetForm();
    };

    return (
        <Formik initialValues={initialValues} validationSchema={userSchema} onSubmit={handleSubmit}>
            {({ handleChange, handleBlur, resetForm, values, errors, touched, setFieldValue, setSubmitting }) => (
                <View style={styles.mlogfrm}>
                    <Text style={styles.frmlbl}>Username</Text>
                    
                    <TextInput
                        placeholder='Write your username here...'
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                        style={styles.frminp}
                    />

                    {errors.username && touched.username && (
                        <Text style={styles.frminperr}>
                            <ErrorMessage name="username" />
                        </Text>
                    )}

                    <Text style={styles.frmlbl}>Password</Text>

                    <TextInput
                        secureTextEntry={true}
                        placeholder='Write your password here...'
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        style={styles.frminp}
                    />

                    {errors.password && touched.password && (
                        <Text style={styles.frminperr}>
                            <ErrorMessage name="password" />
                        </Text>
                    )}

                    <View style={styles.mlnks}>
                        <View style={styles.mchkrememberme}>
                            <CheckBox
                                disabled={false}
                                value={values.rememberme}
                                onValueChange={(nextValue) => setFieldValue('rememberme', nextValue)}
                                style={styles.chkrememberme}
                            />
                            
                            <Text style={styles.txtrememberme}>
                                Stay logged in?
                            </Text>
                        </View>

                        <Link to='/screens/auth/recover' style={styles.lnkrecover}>
                            Forgot Password?
                        </Link>
                    </View>

                    <View style={styles.mfrmbtns}>
                        <TouchableOpacity onPress={() => handleClear({resetForm})} style={styles.frmbtnclear}>
                            <Text>Clear</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { handleSubmit(values, { resetForm, setSubmitting })}} style={styles.frmbtnsub} disabled={!values.username || !values.password ? true : false}>
                            <Text>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    mlogfrm: {
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
        fontSize: 14,
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
    mlnks: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 15,
        paddingHorizontal: 0
    },
    mchkrememberme: {
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
    },
    chkrememberme: {
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
    txtrememberme: {
        textAlign: 'left',
        marginLeft: 10,
        color: '#fff'
    },
    lnkrecover: {
        textAlign: 'right',
        color: '#fff',
        fontWeight: 'normal'
    },
    mfrmbtns: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 0,
        marginTop: 10,
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
    }
});

export default LoginForm;