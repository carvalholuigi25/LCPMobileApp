import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextInput, Text, View, Button } from 'react-native';
import * as Yup from 'yup';

const userSchema = Yup.object({
    username: Yup.string().required('Name is required'),
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
                <View>
                    <Text>Username</Text>
                    <TextInput
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                    />
                    <ErrorMessage name="username" />

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

export default RecoverForm;