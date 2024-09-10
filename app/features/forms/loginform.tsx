import { Formik, ErrorMessage } from 'formik';
import { Pressable, Text, TextInput, View } from 'react-native';
import * as Yup from 'yup';

const userSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    password: Yup.string().min(2, 'Password is too short').required('Password is required'),
});

const LoginForm = () => {
    const initialValues = { username: '', password: '' };
    const handleSubmit = (values: any) => {
        // Handle form submission here
        console.log(values);
    };
    return (
        <Formik initialValues={initialValues} validationSchema={userSchema} onSubmit={handleSubmit}>
            {({ handleChange, handleBlur, values }) => (
                <View style={{flexDirection: 'column'}}>
                    <Text style={{marginTop: 5, textAlign: 'center', color: '#fff'}}>Username</Text>
                    <TextInput
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                        style={{backgroundColor: 'white', borderRadius: 50, width: 300, marginTop: 5, paddingVertical: 5, paddingHorizontal: 15}}
                    />
                    <ErrorMessage name="username" />

                    <Text style={{marginTop: 5, textAlign: 'center', color: '#fff'}}>Password</Text>
                    <TextInput
                        secureTextEntry={true}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        style={{backgroundColor: 'white', borderRadius: 50, width: 300, marginTop: 5, paddingVertical: 5, paddingHorizontal: 15}}
                    />
                    <ErrorMessage name="password" />

                    <Pressable onPress={handleSubmit} style={{backgroundColor: '#00FF38', padding: 10, marginTop: 15, marginBottom: 15, borderRadius: 25, width: 'auto', alignItems: 'center', justifyContent: 'center'}}>
                        <Text>Submit</Text>
                    </Pressable>
                </View>
            )}
        </Formik>
    );
}

export default LoginForm;