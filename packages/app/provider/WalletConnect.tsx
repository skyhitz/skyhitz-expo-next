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
import { Platform } from "react-native";
import { Config } from "app/config";
import { buildTransactionForAuth } from "app/utils/stellar";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";
import * as assert from "assert";

interface IContext {
  initialized: boolean;
  session: SessionTypes.Struct | undefined;
  connect: (
    showModal: (uri: string) => void
  ) => Promise<SessionTypes.Struct | undefined>;
  disconnect: () => Promise<void>;
  accounts: string[];
  signXdr: (
    xdr: string,
    currentSession?: SessionTypes.Struct
  ) => Promise<null | unknown>;
  signAndSubmitXdr: (
    xdr: string,
    currentSession?: SessionTypes.Struct
  ) => Promise<null | unknown>;
  authNewSession: (
    showModal: (uri: string) => void,
    restore?: boolean
  ) => Promise<unknown>;
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

  const reset = useCallback(() => {
    setSession(undefined);
    setAccounts([]);
  }, [setSession, setAccounts]);

  const onSessionConnected = useCallback((session: SessionTypes.Struct) => {
    const allNamespaceAccounts = Object.values(session.namespaces)
      .map((namespace) => namespace.accounts)
      .flat();

    setSession(session);
    setAccounts(allNamespaceAccounts);
  }, []);

  const connect = useCallback(
    async (showModal: (uri: string) => void) => {
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
              // no-op
            },
            {
              desktopLinks: [],
              mobileLinks: ["lobstr"],
            }
          );
        } else {
          showModal(uri);
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
    },
    [client, onSessionConnected]
  );

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
  }, [client, session, reset]);

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
    [onSessionConnected, reset]
  );

  const tryRestoreSession = useCallback(
    async (newClient: Client) => {
      // populates (the last) existing session to state
      if (newClient.session.length) {
        const lastKeyIndex = newClient.session.keys.length - 1;
        const restoredSession = newClient.session.get(
          newClient.session.keys[lastKeyIndex]!
        );
        await onSessionConnected(restoredSession);
        return restoredSession;
      }
    },
    [onSessionConnected]
  );

  const createClient = useCallback(async () => {
    try {
      const metadata = {
        name: "Skyhitz",
        description: "Skyhitz",
        url: "https://skyhitz.io",
        icons: ["https://skyhitz.io/icon.png"],
      };

      const newClient = await Client.init({
        projectId: Config.PROJECT_ID,
        metadata,
      });
      setClient(newClient);
      await tryRestoreSession(newClient);
      await subscribeToEvents(newClient);
      setInitialized(true);
    } catch (err) {
      console.log("error", err);
    }
  }, [subscribeToEvents]);

  const requestClient = useCallback(
    async (
      method: string,
      xdr: string,
      currentSession: SessionTypes.Struct
    ) => {
      if (!client) throw new Error("WalletConnect Client not initialized");
      // check if the publicKey match with the one of the current user
      const publicKey = Object.values(
        currentSession.namespaces
      )[0]?.accounts[0]!.replace(`${Config.CHAIN_ID}:`, "");
      if (user?.publicKey && user.publicKey !== publicKey) {
        disconnect();
        throw new Error(
          "Provided public key does not match with your account public key. Change wallet if you want to continue."
        );
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
    async (xdr: string, currentSession = session) => {
      if (!currentSession) throw new Error("There is no active session");
      return requestClient("stellar_signXDR", xdr, currentSession);
    },
    [requestClient, session]
  );

  const signAndSubmitXdr = useCallback(
    async (xdr: string, currentSession = session) => {
      if (!currentSession) throw new Error("There is no active session");
      return requestClient("stellar_signAndSubmitXDR", xdr, currentSession);
    },
    [requestClient, session]
  );

  const authNewSession = useCallback(
    async (showModal: (uri: string) => void, restore = false) => {
      if (!client) throw new Error("Client not initiliazed");
      let sessionToAuth = session;
      if (!restore || !session) {
        const newSession = await connect(showModal);
        if (!newSession) {
          throw new Error("Couldn't establish wallet connect session");
        }
        sessionToAuth = newSession;
      }

      assert.ok(sessionToAuth);

      const publicKey = Object.values(
        sessionToAuth.namespaces
      )[0]?.accounts[0]!.replace(`${Config.CHAIN_ID}:`, "");
      if (!publicKey) {
        throw new Error("Invalid public key");
      }
      const xdr = await buildTransactionForAuth(publicKey);
      const result = await client.request({
        topic: sessionToAuth.topic,
        chainId: Config.CHAIN_ID,
        request: {
          method: "stellar_signXDR",
          params: {
            xdr,
          },
        },
      });
      return result;
    },
    [client, session, connect, buildTransactionForAuth]
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
      authNewSession,
      initialized,
    }),
    [
      accounts,
      session,
      connect,
      disconnect,
      signXdr,
      signAndSubmitXdr,
      authNewSession,
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
