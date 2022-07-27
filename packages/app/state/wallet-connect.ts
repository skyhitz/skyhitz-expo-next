import { useEffect } from 'react'

import WalletConnect from '@walletconnect/sign-client'
import { atom, useRecoilState } from 'recoil'

const stellarMeta = {
  chainName: 'stellar:pubnet',
  methods: ['stellar_signAndSubmitXDR', 'stellar_signXDR'],
}

const clientAtom = atom<null | any>({
  key: 'client',
  default: null,
})

const uriAtom = atom<null | string>({
  key: 'uri',
  default: null,
})

const stateAtom = atom<
  | 'disconnected'
  | 'paring-proposal'
  | 'paring-created'
  | 'session-proposal'
  | 'session-created'
>({
  key: 'state',
  default: 'disconnected',
})

const publicKeyAtom = atom<string | null>({
  key: 'publicKey',
  default: null,
})

const sessionAtom = atom<any>({
  key: 'session',
  default: null,
})

export const WalletConnectStore = () => {
  let client: WalletConnect
  const [uri, setUri] = useRecoilState(uriAtom)
  const [state, setState] = useRecoilState(stateAtom)
  const [publicKey, setPublicKey] = useRecoilState(publicKeyAtom)
  const [session, setSession] = useRecoilState(sessionAtom)
  console.log('wallet connect store')
  const init = async () => {
    if (client) return
    client = await WalletConnect.init({
      projectId: '422a527ddc3ed4c5fff60954fcc8ed83',
      metadata: {
        name: 'Skyhitz',
        description: 'Skyhitz',
        url: 'https://skyhitz.io',
        icons: ['https://skyhitz.io/img/icon-512.png'],
      },
    })
    subscribeToEvents()
  }

  useEffect(() => {
    init()
  })

  const clearState = () => {
    setState('disconnected')
    setPublicKey('')
    onSessionUpdate(null)
  }

  const onSessionUpdate = (session) => {
    setSession(session)
    const { state } = session
    const [stellarAccount] = state.accounts
    setPublicKey(stellarAccount.replace(`${stellarMeta.chainName}:`, ''))
    setState('session-created')
    return publicKey
  }

  const connect = async () => {
    if (!client) return
    try {
      const { uri, approval } = await client.connect({
        requiredNamespaces: {
          stellar: {
            methods: stellarMeta.methods,
            chains: [stellarMeta.chainName],
            events: ['chainChanged', 'accountsChanged'],
          },
        },
      })
      if (!uri) return
      setUri(uri)
      setState('paring-proposal')
      const session = await approval()
      onSessionUpdate(session)
      setState('paring-created')
      setUri(null)
    } catch (e) {
      console.log('catched error on reject:', e)
      setState('disconnected')
    }

    return publicKey
  }

  const disconnect = async () => {
    await client?.disconnect({
      topic: session.topic,
      reason: {
        code: 1,
        message: 'Logged out',
      },
    })
    await clearState()
  }

  const subscribeToEvents = () => {
    if (!client) return

    client.on('session_proposal', async (proposal) => {
      setState('session-proposal')
    })

    client.on('session_update', ({ topic, params }) => {
      const { namespaces } = params
      const _session = client.session.get(topic)
      // Overwrite the `namespaces` of the existing session with the incoming one.
      const updatedSession = { ..._session, namespaces }
      // Integrate the updated session state into your dapp state.
      onSessionUpdate(updatedSession)
      setState('session-created')
    })

    client.on('session_delete', (session) => {
      console.log(session)
      clearState()
    })
  }

  const signXdr = (xdr) => {
    if (!client) return
    return client.request({
      topic: session.topic,
      chainId: stellarMeta.chainName,
      request: {
        jsonrpc: '2.0',
        method: 'stellar_signXDR',
        params: {
          xdr,
        },
      } as any,
    })
  }

  const signAndSubmitXdr = (xdr) => {
    if (!client) return
    return client.request({
      topic: session.topic,
      chainId: stellarMeta.chainName,
      request: {
        jsonrpc: '2.0',
        method: 'stellar_signAndSubmitXDR',
        params: {
          xdr,
        },
      } as any,
    })
  }

  return {
    signAndSubmitXdr,
    signXdr,
    subscribeToEvents,
    disconnect,
    connect,
    clearState,
    init,
    publicKey,
    uri,
    session,
    state,
  }
}
