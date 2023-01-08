import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./app/screens/Login";
import Register from "./app/screens/Register";
import Home from "./app/screens/Home";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import Chat from "./app/screens/Chat";
import { auth } from "./app/config/firebase";
import { onAuthStateChanged, User } from 'firebase/auth'
import { ActivityIndicator, View } from "react-native";

export type RootStackParamList = {
    Login: { sort: 'latest' | 'top' } | undefined;
    Register: { sort: 'latest' | 'top' } | undefined;
    Home: undefined;
    Chat: undefined;
};

const Stack = createStackNavigator<RootStackParamList>()

const ChatStack = () => (
    <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen name={'Home'} component={Home}/>
        <Stack.Screen name={'Chat'} component={Chat}/>
    </Stack.Navigator>
)

const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Login'}>
        <Stack.Screen name={'Login'} component={Login}/>
        <Stack.Screen name={'Register'} component={Register}/>
    </Stack.Navigator>
)

const AuthUserContext = createContext<{ user: User | null, setUser: Dispatch<SetStateAction<User | null>> }>({
    user: null,
    setUser: () => null
})
const AuthUserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    return <AuthUserContext.Provider value={{ user, setUser }}>{children}</AuthUserContext.Provider>
}

const RootNavigator = () => {
    const { user, setUser } = useContext(AuthUserContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            user ? setUser(user) : setUser(null)

            setLoading(false)
        })

        return () => unsubscribe()
    }, [user])

    return loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'}/>
        </View>
    ) : (
        <NavigationContainer>
            {user ? <ChatStack/> : <AuthStack/>}
        </NavigationContainer>
    )
}

export default function App() {
    return (
        <AuthUserProvider><RootNavigator/></AuthUserProvider>
    );
}