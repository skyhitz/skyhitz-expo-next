
import { UserData } from 'app/models/user';
import { useSetRecoilState } from 'recoil';
import { userAtom } from 'app/state/atoms';
import { useRouter } from 'solito/router';
import { SecureStorage } from "app/utils/secure-storage";

export default function useLogIn(): (UserData) => void {
    const setUserData = useSetRecoilState(userAtom)
    const { push } = useRouter()

    const logIn = async (user: UserData) => {
        setUserData(user)
        await SecureStorage.save("token", user.jwt!)
        push("/dashboard/search")
    }

   return logIn;
}