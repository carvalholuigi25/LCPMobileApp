import { HomeScreen, LoginScreen, RegisterScreen, MainScreen, AboutScreen } from "../screens";

export default function MyRoutes() {
    let myroutesdata = [
        {
            key: '1',
            path: "home",
            title: "Home",
            element: HomeScreen
        },
        {
            key: '2',
            path: "login",
            title: "Login",
            element: LoginScreen
        },
        {
            key: '3',
            path: "register",
            title: "Register",
            element: RegisterScreen
        },
        {
            key: '4',
            path: "main",
            title: "Main",
            element: MainScreen
        },
        {
            key: '5',
            path: "about",
            title: "About",
            element: AboutScreen
        }
    ];

    return myroutesdata;
}