import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";

export default function guardedComponentFactory<T>(
  component: (_props?: T) => JSX.Element
) {
  function GuardedComponent(props: T) {
    const user = useRecoilValue(userAtom);
    return user ? component(props) : null;
  }

  return GuardedComponent;
}
