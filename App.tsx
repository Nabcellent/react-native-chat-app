import { createStackNavigator } from "@react-navigation/stack";
import Chat from "./app/screens/Chat";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator()

const ChatStack = () => (
    <Stack.Navigator>
        <Stack.Screen name={'Chat'} component={Chat}/>
    </Stack.Navigator>
)

const RootNavigator = () => (
    <NavigationContainer>
        <ChatStack/>
    </NavigationContainer>
)

export default function App() {
    return (
        <RootNavigator/>
    );
}