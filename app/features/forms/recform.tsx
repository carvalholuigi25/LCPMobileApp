import { Formik, ErrorMessage } from 'formik';
import { TextInput, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as Yup from 'yup';

const userSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(4, 'Password is too short').required('Password is required'),
});

const RecoverForm = () => {
    const initialValues = { username: '', password: '' };
    const handleSubmit = (values: any) => {
        // Handle form submission here
        console.log(values);
    };

    return (
        <Formik initialValues={initialValues} validationSchema={userSchema} onSubmit={handleSubmit}>
            {props => (
                <View style={styles.mrecfrm}>
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

                    <View style={styles.mfrmbtns}>
                        <TouchableOpacity onPress={() => { props.resetForm(); }} style={styles.frmbtnclear}>
                            <Text>Clear</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { props.handleSubmit(); }} style={styles.frmbtnsub}>
                            <Text>Recover</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    mrecfrm: {
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

export default RecoverForm;