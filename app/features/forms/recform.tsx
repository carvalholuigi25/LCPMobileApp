import { Formik, ErrorMessage } from 'formik';
import { TextInput, Text, View, StyleSheet, Pressable } from 'react-native';
import * as Yup from 'yup';

const userSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(2, 'Password is too short').required('Password is required'),
});

const RecoverForm = () => {
    const initialValues = { username: '', password: '' };
    const handleSubmit = (values: any) => {
        // Handle form submission here
        console.log(values);
    };

    return (
        <Formik initialValues={initialValues} validationSchema={userSchema} onSubmit={handleSubmit}>
            {({ handleChange, handleBlur, values }) => (
                <View style={styles.mrecfrm}>
                    <Text style={styles.frmlbl}>Username</Text>
                    <TextInput
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                        style={styles.frminp}
                    />
                    <ErrorMessage name="username" />

                    <Text style={styles.frmlbl}>Password</Text>
                    <TextInput
                        secureTextEntry={true}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        style={styles.frminp}
                    />
                    <ErrorMessage name="password" />

                    <Pressable onPress={handleSubmit} style={styles.frmbtnsub}>
                        <Text>Submit</Text>
                    </Pressable>
                </View>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    mrecfrm: {
        flexDirection: 'column'
    },
    frmlbl: {
        marginTop: 5, 
        textAlign: 'center', 
        color: '#fff'
    },
    frminp: {
        backgroundColor: 'white', 
        borderRadius: 50, 
        width: 300, 
        marginTop: 5, 
        paddingVertical: 5, 
        paddingHorizontal: 15
    },
    frmbtnsub: {
        backgroundColor: '#00FF38', 
        padding: 10, 
        marginTop: 15, 
        marginBottom: 15, 
        borderRadius: 25, 
        width: 'auto', 
        alignItems: 'center', 
        justifyContent: 'center'
    }
});

export default RecoverForm;