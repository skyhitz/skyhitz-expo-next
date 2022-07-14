import React, { useEffect } from 'react'
import WalletConnectIcon from 'app/ui/icons/walletconnect-icon'
import QRCodeModal from '@walletconnect/qrcode-modal'
import { signManageDataOp } from 'app/stellar'
import { WalletConnectStore } from 'app/state/wallet-connect'
import Button from 'app/design-system/button'

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
    const { signedXDR } = await (signXdr(xdr) as Promise<{ signedXDR: string }>)
    signInWithXDR && signInWithXDR(signedXDR)
  }

  useEffect(() => {
    if (publicKey && signInWithXDR) handleSignInWithXdr(publicKey)
  }, [publicKey])

  return (
    <Button
      tw="bg-blue rounded-full flex-row items-center justify-center text-white"
      onPress={() => connect()}
      text={
        state === 'session-proposal'
          ? 'Waiting for approval'
          : state === 'session-created'
          ? 'Connected'
          : 'WalletConnect'
      }
      rightIcon={<WalletConnectIcon />}
    />
  )
}

export default WalletConnectBtn
