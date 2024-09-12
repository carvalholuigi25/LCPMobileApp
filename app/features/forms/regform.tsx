import { Formik, ErrorMessage } from 'formik';
import { TextInput, Text, View, StyleSheet, Pressable } from 'react-native';
import * as Yup from 'yup';

const userSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Email is not valid').required('Email is required'),
    password: Yup.string().min(4, 'Password is too short').required('Password is required'),
});

const RegisterForm = () => {
    const initialValues = { username: '', email: '', password: '' };
    const handleSubmit = (values: any) => {
        // Handle form submission here
        console.log(values);
    };

    return (
        <Formik initialValues={initialValues} validationSchema={userSchema} onSubmit={handleSubmit}>
            {({ handleChange, handleBlur, resetForm, isSubmitting, values, errors, touched }) => (
                <View style={styles.mregfrm}>
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

                    <Text style={styles.frmlbl}>Email</Text>
                    <TextInput
                        placeholder='Write your email here...'
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
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

                    <View style={styles.mfrmbtns}>
                        <Pressable onPress={() => resetForm()} style={styles.frmbtnclear}>
                            <Text>Clear</Text>
                        </Pressable>

                        <Pressable onPress={() => {
                            console.log("Registering...");
                            resetForm();
                        }} style={styles.frmbtnsub}>
                            <Text>Register</Text>
                        </Pressable>
                    </View>
                </View>
            )}
        </Formik>
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
        textAlign: 'center'
    },
    frminperr: {
        color: '#fff',
        padding: 5,
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
        alignItems: 'center'
    },
    frmbtnsub: {
        backgroundColor: '#00FF38',
        padding: 10,
        marginTop: 15,
        marginLeft: 15,
        marginBottom: 15,
        borderRadius: 25,
        width: '50%',
        alignItems: 'center'
    }
});

export default RegisterForm;