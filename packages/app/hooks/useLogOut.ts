import { useSetRecoilState } from 'recoil';
import { userAtom } from 'app/state/atoms';
import { useRouter } from 'solito/router';
import { SecureStorage } from "app/utils/secure-storage";

export default function useLogOut(): () => void {
    const setUserData = useSetRecoilState(userAtom)
    const { push } = useRouter()

    const logIn = async () => {
        setUserData(null)
        await SecureStorage.clear("token")
        push("/")
    }

   return logIn;
}