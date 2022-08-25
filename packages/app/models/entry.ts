import {
  ipfsProtocol,
  videosGateway,
  imagesGateway,
  skyhitzCdn,
} from "app/constants/constants";
import { Payload } from "app/models/payload";

export class EntryPayload extends Payload {
  imageUrl?: string;
  userId?: number;
  commentCount?: number;
  description?: string;
  likeCount?: number;
  publishedAt?: string;
  ranking?: number;
  shareCount?: number;
  title?: string;
  id!: string;
  videoUrl?: string;
  forSale?: boolean;
  price?: number;
  issuer?: string;
  code?: string;
  artist?: string;
}

export class Entry extends EntryPayload {
  constructor(payload: EntryPayload) {
    super(payload);
    this.imageUrl = payload.imageUrl;
    this.userId = payload.userId;
    this.commentCount = payload.commentCount;
    this.description = payload.description;
    this.likeCount = payload.likeCount;
    this.publishedAt = payload.publishedAt;
    this.ranking = payload.ranking;
    this.shareCount = payload.shareCount;
    this.title = payload.title;
    this.id = payload.id;
    this.videoUrl = payload.videoUrl;
    this.forSale = payload.forSale;
    this.price = payload.price;
    this.issuer = payload.issuer;
    this.code = payload.code;
    this.artist = payload.artist;
  }

  get isIpfs() {
    return (
      !!this.videoUrl?.startsWith(ipfsProtocol) &&
      !!this.imageUrl?.startsWith(ipfsProtocol)
    );
  }

  get videoSrc() {
    if (this.videoUrl?.startsWith(ipfsProtocol))
      return `${videosGateway}/${this.videoUrl.replace(ipfsProtocol, "")}`;
    return this.videoUrl;
  }

  get imageSrc() {
    if (this.imageUrl?.startsWith(ipfsProtocol))
      return `${imagesGateway}/${this.imageUrl.replace(ipfsProtocol, "")}`;
    return this.imageUrl;
  }

  get imageUrlSmall() {
    if (this.isIpfs)
      return this.imageUrl?.replace(
        ipfsProtocol,
        `${skyhitzCdn}/width=80/${imagesGateway}/`
      );
    return this.imageUrl?.split("/upload/").join("/upload/w_80/");
  }

  get imageUrlMedium() {
    if (this.isIpfs)
      return this.imageUrl?.replace(
        ipfsProtocol,
        `${skyhitzCdn}/width=225/${imagesGateway}/`
      );
    return this.imageUrl?.split("/upload/").join("/upload/w_500/");
  }
}
