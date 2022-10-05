// https://github.com/WalletConnect/web-examples/tree/main/dapps/react-dapp-v2
import Client from "@walletconnect/sign-client";
import { SessionTypes } from "@walletconnect/types";
import QRCodeModal from "@walletconnect/qrcode-modal";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getSdkError } from "@walletconnect/utils";
import { Alert, Platform } from "react-native";
import * as Clipboard from "expo-clipboard";
import { Config } from "app/config";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";

interface IContext {
  initialized: boolean;
  session: SessionTypes.Struct | undefined;
  connect: () => Promise<SessionTypes.Struct | undefined>;
  disconnect: () => Promise<void>;
  accounts: string[];
  signXdr: (_xdr: string) => Promise<null | unknown>;
  signAndSubmitXdr: (_xdr: string) => Promise<null | unknown>;
}

export const ClientContext = createContext<IContext>({} as IContext);

export function ClientContextProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [client, setClient] = useState<Client>();
  const [session, setSession] = useState<SessionTypes.Struct>();
  const [accounts, setAccounts] = useState<string[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);
  const user = useRecoilValue(userAtom);

  const reset = () => {
    setSession(undefined);
    setAccounts([]);
  };

  const onSessionConnected = useCallback((session: SessionTypes.Struct) => {
    const allNamespaceAccounts = Object.values(session.namespaces)
      .map((namespace) => namespace.accounts)
      .flat();

    setSession(session);
    setAccounts(allNamespaceAccounts);
  }, []);

  const connect = useCallback(async () => {
    if (typeof client === "undefined") {
      throw new Error("WalletConnect is not initialized");
    }

    try {
      const requiredNamespaces = {
        stellar: {
          methods: ["stellar_signAndSubmitXDR", "stellar_signXDR"],
          chains: [Config.CHAIN_ID],
          events: [],
        },
      };

      const { uri, approval } = await client.connect({
        pairingTopic: undefined,
        requiredNamespaces,
      });

      if (!uri) return;
      if (Platform.OS === "web") {
        QRCodeModal.open(
          uri,
          () => {
            console.log("EVENT", "QR Code Modal closed");
          },
          {
            desktopLinks: [],
            mobileLinks: ["lobstr"],
          }
        );
      } else {
        Alert.alert("WalletConnect link", uri, [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Copy",
            onPress: async () => {
              await Clipboard.setStringAsync(uri);
            },
          },
        ]);
        // TODO find out proper deep link
        // Linking.openURL("https://lobstr.co/uni");
      }

      const session = await approval();
      await onSessionConnected(session);
      if (Platform.OS === "web") {
        QRCodeModal.close();
      }
      return session;
    } catch (e) {
      if (Platform.OS === "web") {
        QRCodeModal.close();
      }
      console.error(e);
      return undefined;
    }
  }, [client, onSessionConnected]);

  const disconnect = useCallback(async () => {
    if (typeof client === "undefined") {
      throw new Error("WalletConnect is not initialized");
    }
    if (typeof session === "undefined") {
      throw new Error("Session is not connected");
    }
    await client.disconnect({
      topic: session.topic,
      reason: getSdkError("USER_DISCONNECTED"),
    });
    reset();
  }, [client, session]);

  const subscribeToEvents = useCallback(
    (wcClient: Client) => {
      if (typeof wcClient === "undefined") {
        throw new Error("WalletConnect is not initialized");
      }

      wcClient.on("session_ping", (args) => {
        console.log("EVENT", "session_ping", args);
      });

      wcClient.on("session_event", (args) => {
        console.log("EVENT", "session_event", args);
      });

      wcClient.on("session_update", ({ topic, params }) => {
        const { namespaces } = params;
        const currentSession = wcClient.session.get(topic);
        const updatedSession = { ...currentSession, namespaces };
        onSessionConnected(updatedSession);
      });

      wcClient.on("session_delete", () => {
        reset();
      });
    },
    [onSessionConnected]
  );

  const createClient = useCallback(async () => {
    try {
      const metadata = {
        name: "Skyhitz",
        description: "Skyhitz",
        url: "https://skyhitz.io",
        icons: ["https://skyhitz.io/img/icon-512.png"],
      };

      const newClient = await Client.init({
        projectId: Config.PROJECT_ID,
        metadata,
      });
      setClient(newClient);
      await subscribeToEvents(newClient);
      setInitialized(true);
    } catch (err) {
      console.log("error", err);
    }
  }, [subscribeToEvents]);

  const requestClient = useCallback(
    async (method: string, xdr: string) => {
      if (!client) throw new Error("WalletConnect Client not initialized");
      const currentSession = session ?? (await connect());
      if (!currentSession) throw new Error("There is no active session");
      // check if the publicKey match with the one of the current user
      const publicKey = Object.values(
        currentSession.namespaces
      )[0]?.accounts[0]!.replace(`${Config.CHAIN_ID}:`, "");
      console.log(publicKey);
      if (user?.publicKey && user.publicKey !== publicKey) {
        console.log("disconnect");
        return;
      }
      const result = await client.request({
        topic: currentSession.topic,
        chainId: Config.CHAIN_ID,
        request: {
          method,
          params: {
            xdr,
          },
        },
      });
      return result;
    },
    [client, session, connect]
  );

  const signXdr = useCallback(
    async (xdr: string) => {
      return requestClient("stellar_signXDR", xdr);
    },
    [requestClient]
  );

  const signAndSubmitXdr = useCallback(
    async (xdr: string) => {
      return requestClient("stellar_signAndSubmitXDR", xdr);
    },
    [requestClient]
  );

  useEffect(() => {
    if (!client) {
      createClient();
    }
  }, [client, createClient]);

  const value = useMemo(
    () => ({
      accounts,
      session,
      connect,
      disconnect,
      signXdr,
      signAndSubmitXdr,
      initialized,
    }),
    [
      accounts,
      session,
      connect,
      disconnect,
      signXdr,
      signAndSubmitXdr,
      initialized,
    ]
  );

  return (
    <ClientContext.Provider
      value={{
        ...value,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}

export function useWalletConnectClient() {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error(
      "useWalletConnectClient must be used within a ClientContextProvider"
    );
  }
  return context;
}
