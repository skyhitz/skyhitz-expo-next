import { NativeNavigation } from "app/navigation/native";
import { Provider } from "app/provider";
import { RootSiblingParent } from "react-native-root-siblings";

export default function App() {
  return (
    <Provider>
      <RootSiblingParent>
        <NativeNavigation />
      </RootSiblingParent>
    </Provider>
  );
}
