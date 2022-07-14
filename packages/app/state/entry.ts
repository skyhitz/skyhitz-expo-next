import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'
import { nftStorageApi } from 'app/constants/constants'
import { entriesBackend } from '../api/entries'

const uploadingVideoAtom = atom<boolean>({
  key: 'uploadingVideo',
  default: false,
})
const uploadingErrorAtom = atom<string>({
  key: 'uploadingError',
  default: '',
})
const loadingVideoAtom = atom<boolean>({
  key: 'loadingVideo',
  default: false,
})
const loadingImageAtom = atom<boolean>({
  key: 'loadingImage',
  default: false,
})
const descriptionAtom = atom<string>({
  key: 'description',
  default: '',
})
const issuerAtom = atom<string>({
  key: 'issuer',
  default: '',
})
const titleAtom = atom<string>({
  key: 'title',
  default: '',
})
const artistAtom = atom<string>({
  key: 'artist',
  default: '',
})
const availableForSaleAtom = atom<boolean>({
  key: 'availableForSale',
  default: false,
})
const equityForSaleAtom = atom<number>({
  key: 'equityForSale',
  default: 1,
})
const equityForSalePercentageAtom = selector<string>({
  key: 'equityForSalePercentage',
  get: ({ get }) => {
    const equity = get(equityForSaleAtom)
    return `${equity} %`
  },
})
const priceAtom = atom<number>({
  key: 'price',
  default: 1,
})
const filesProgressAtom = atom<{ [key: string]: number }>({
  key: 'filesProgress',
  default: {},
})

const currentUploadAtom = selector({
  key: 'currentUpload',
  get: () => {
    return Object.keys(filesProgressAtom).includes('video')
      ? 'video'
      : Object.keys(filesProgressAtom).includes('meta')
      ? 'meta'
      : 'none'
  },
})
const canCreateAtom = selector({
  key: 'canCreate',
  get: ({ get }) => {
    return (
      get(imageBlobAtom) &&
      get(videoBlobAtom) &&
      get(descriptionAtom) &&
      get(titleAtom) &&
      get(artistAtom)
    )
  },
})
const progressAtom = selector<number>({
  key: 'progress',
  get: () => {
    return Math.min(...Object.values(filesProgressAtom))
  },
})
const creatingAtom = atom<boolean>({
  key: 'creating',
  default: false,
})
const imageBlobAtom = atom<Blob | undefined>({
  key: 'imageBlob',
  default: undefined,
})
const videoBlobAtom = atom<Blob | undefined>({
  key: 'videoBlob',
  default: undefined,
})

export const EntryStore = () => {
  const [filesProgress, setFilesProgress] = useRecoilState(filesProgressAtom)
  const [issuer, setIssuer] = useRecoilState(issuerAtom)
  const [uploadingError, setUploadingError] = useRecoilState(uploadingErrorAtom)
  const [creating, setCreating] = useRecoilState(creatingAtom)
  const [loadingVideo, setLoadingVideo] = useRecoilState(loadingVideoAtom)
  const [loadingImage, setLoadingImage] = useRecoilState(loadingImageAtom)
  const [uploadingVideo, setUploadingVideo] = useRecoilState(uploadingVideoAtom)
  const [description, setDescription] = useRecoilState(descriptionAtom)
  const [title, setTitle] = useRecoilState(titleAtom)
  const [artist, setArtist] = useRecoilState(artistAtom)
  const [availableForSale, setAvailableForSale] =
    useRecoilState(availableForSaleAtom)
  const [price, setPrice] = useRecoilState(priceAtom)
  const [equityForSale, setEquityForSale] = useRecoilState(equityForSaleAtom)
  const [imageBlob, setImageBlob] = useRecoilState(imageBlobAtom)
  const [videoBlob, setVideoBlob] = useRecoilState(videoBlobAtom)
  const equityForSalePercentage = useRecoilValue(equityForSalePercentageAtom)
  const currentUpload = useRecoilValue(currentUploadAtom)
  const canCreate = useRecoilValue(canCreateAtom)
  const progress = useRecoilValue(progressAtom)

  const clearUploadingError = () => {
    setUploadingError('')
  }

  const uploadFile = async (file: any, id: string) => {
    return new Promise((resolve: (value: string) => void, reject) => {
      setFilesProgress((oldValue) => {
        oldValue[id] = 0
        return oldValue
      })
      let xhr = new XMLHttpRequest()
      xhr.open('POST', `${nftStorageApi}/upload`, true)
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
      xhr.setRequestHeader(
        'Authorization',
        `Bearer ${process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY}`
      )

      xhr.upload.addEventListener('progress', (e) => {
        const progress = Math.round((e.loaded * 100.0) / e.total)

        setFilesProgress((oldValue) => {
          oldValue[id] = progress
          return oldValue
        })
        if (progress === 100) {
          setFilesProgress((oldValue) => {
            delete oldValue[id]
            return oldValue
          })
        }
      })

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let { value, ok } = JSON.parse(xhr.responseText)
          if (!ok) {
            setUploadingError('Something went wrong!')
            reject()
            return
          }
          resolve(value.cid)
        }
      }

      xhr.send(file)
    })
  }

  const storeNFT = async () => {
    const name = `${artist} - ${title}`
    const ipfsProtocol = 'ipfs://'

    const code = `${title}${artist}`
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/ /g, '')
      .replace(/-/g, '')
      .replace(/[^0-9a-z]/gi, '')
      .substr(0, 12)
      .toUpperCase()

    const [imageCid, videoCid] = [
      await uploadFile(imageBlob, 'image'),
      await uploadFile(videoBlob, 'video'),
    ]

    const imageUrl = `${ipfsProtocol}${imageCid}`
    const videoUrl = `${ipfsProtocol}${videoCid}`

    const issuer = await entriesBackend.getIssuer(videoCid)
    setIssuer(issuer)
    if (!issuer) throw 'could not generate issuer'

    const json = {
      name: name,
      description: description,
      code: code,
      issuer: issuer,
      domain: 'skyhitz.io',
      supply: 1,
      image: imageUrl,
      animation_url: videoUrl,
      video: videoUrl,
      url: videoUrl,
    }

    const blob = new Blob([JSON.stringify(json)], { type: 'application/json' })

    const nftCid = await uploadFile(blob, 'meta')
    return { videoCid, nftCid, imageUrl, videoUrl, code }
  }

  const clearStore = () => {
    setUploadingVideo(false)
    setLoadingImage(false)
    setDescription('')
    setTitle('')
    setArtist('')
    setAvailableForSale(false)
    setPrice(0)
    setEquityForSale(1)
    setCreating(false)
  }

  const indexEntry = async (issuerPayload = issuer) => {
    if (!issuerPayload) return false
    return await entriesBackend.indexEntry(issuerPayload)
  }

  const create = async () => {
    setCreating(true)
    const { videoCid, nftCid, imageUrl, videoUrl, code } = await storeNFT()
    if (!nftCid || !imageUrl || !videoUrl) {
      setUploadingError('Could not store NFT')
      return
    }
    return await entriesBackend.createFromUpload(
      videoCid,
      nftCid,
      code,
      availableForSale,
      price,
      equityForSale
    )
  }

  const updatePricing = async (entry: any) => {
    if (!availableForSale) {
      return
    }
    if (!price) {
      return
    }
    if (!equityForSale) {
      return
    }
    await entriesBackend.updatePricing(
      entry.id,
      price,
      availableForSale,
      equityForSale
    )
    clearStore()
  }

  const remove = async (entryId: string) => {
    await entriesBackend.remove(entryId)
  }

  return {
    remove,
    updatePricing,
    create,
    indexEntry,
    clearStore,
    storeNFT,
    uploadFile,
    clearUploadingError,
    filesProgress,
    uploadingError,
    creating,
    loadingVideo,
    loadingImage,
    uploadingVideo,
    setLoadingVideo,
    setImageBlob,
    setVideoBlob,
    equityForSalePercentage,
    currentUpload,
    canCreate,
    progress,
    issuer,
    equityForSale,
    setUploadingError,
    setArtist,
    artist,
    setDescription,
    title,
    setTitle,
    availableForSale,
    setAvailableForSale,
    description,
    price,
    setPrice,
    setEquityForSale,
    imageBlob,
    videoBlob,
  }
}
