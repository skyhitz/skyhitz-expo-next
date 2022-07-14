import React, { useEffect } from 'react'
import { Text, Pressable } from 'app/design-system'
import WalletConnectIcon from 'app/ui/icons/walletconnect-icon'
import QRCodeModal from '@walletconnect/qrcode-modal'
import { signManageDataOp } from 'app/stellar'
import { WalletConnectStore } from 'app/state/wallet-connect'

const WalletConnectBtn = ({ signInWithXDR }: { signInWithXDR?: (_) => {} }) => {
  let { uri, signXdr, publicKey, connect, state } = WalletConnectStore()

  useEffect(() => {
    if (!uri) return QRCodeModal.close()
    QRCodeModal.open(uri, () => {}, {
      desktopLinks: [],
      mobileLinks: ['lobstr'],
    })
  }, [uri])

  const handleSignInWithXdr = async (publicKey: string) => {
    const xdr = await signManageDataOp(publicKey)
    const { signedXDR } = await signXdr(xdr)
    signInWithXDR && signInWithXDR(signedXDR)
  }

  useEffect(() => {
    if (publicKey && signInWithXDR) handleSignInWithXdr(publicKey)
  }, [publicKey])

  return (
    <Pressable
      tw="bg-blue rounded-full flex-row items-center justify-center text-white"
      onPress={() => connect()}
    >
      <Text tw="flex text-white text-center text-base font-bold py-2 mr-2">
        {state === 'session-proposal'
          ? 'Waiting for approval'
          : state === 'session-created'
          ? 'Connected'
          : 'WalletConnect'}
      </Text>
      <WalletConnectIcon />
    </Pressable>
  )
}

export default WalletConnectBtn
