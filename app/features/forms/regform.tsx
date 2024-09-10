import { Formik, ErrorMessage } from 'formik';
import { Button, TextInput, Text, View } from 'react-native';
import * as Yup from 'yup';

const userSchema = Yup.object({
    username: Yup.string().required('Name is required'),
    email: Yup.string().email('Email is not valid').required('Email is required'),
    password: Yup.string().min(2, 'Password is too short').required('Password is required'),
});

const RegisterForm = () => {
    const initialValues = { username: '', email: '', password: '' };
    const handleSubmit = (values: any, { setSubmitting }: any) => {
        // Handle form submission here
        console.log(values);
    };
    return (
        <Formik initialValues={initialValues} validationSchema={userSchema} onSubmit={handleSubmit}>
            {({ handleChange, handleBlur, values }) => (
                <View>
                    <Text>Username</Text>
                    <TextInput
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                    />
                    <ErrorMessage name="username" />

                    <Text>Email</Text>
                    <TextInput
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                    />
                    <ErrorMessage name="email" />

                    <Text>Password</Text>
                    <TextInput
                        secureTextEntry={true}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                    />
                    <ErrorMessage name="password" />

                    <Button title="Submit" />
                </View>
            )}
        </Formik>
    );
}

export default RegisterForm;