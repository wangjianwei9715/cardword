import * as $protobuf from "protobufjs";
/** Namespace message. */
export namespace message {

    /** Properties of a RequestChatOn. */
    interface IRequestChatOn {
    }

    /** Represents a RequestChatOn. */
    class RequestChatOn implements IRequestChatOn {

        /**
         * Constructs a new RequestChatOn.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IRequestChatOn);

        /**
         * Creates a new RequestChatOn instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestChatOn instance
         */
        public static create(properties?: message.IRequestChatOn): message.RequestChatOn;

        /**
         * Encodes the specified RequestChatOn message. Does not implicitly {@link message.RequestChatOn.verify|verify} messages.
         * @param message RequestChatOn message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IRequestChatOn, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RequestChatOn message, length delimited. Does not implicitly {@link message.RequestChatOn.verify|verify} messages.
         * @param message RequestChatOn message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IRequestChatOn, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RequestChatOn message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RequestChatOn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.RequestChatOn;

        /**
         * Decodes a RequestChatOn message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RequestChatOn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.RequestChatOn;

        /**
         * Verifies a RequestChatOn message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RequestChatOn message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RequestChatOn
         */
        public static fromObject(object: { [k: string]: any }): message.RequestChatOn;

        /**
         * Creates a plain object from a RequestChatOn message. Also converts values to other types if specified.
         * @param message RequestChatOn
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.RequestChatOn, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RequestChatOn to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RequestChatOff. */
    interface IRequestChatOff {
    }

    /** Represents a RequestChatOff. */
    class RequestChatOff implements IRequestChatOff {

        /**
         * Constructs a new RequestChatOff.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IRequestChatOff);

        /**
         * Creates a new RequestChatOff instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestChatOff instance
         */
        public static create(properties?: message.IRequestChatOff): message.RequestChatOff;

        /**
         * Encodes the specified RequestChatOff message. Does not implicitly {@link message.RequestChatOff.verify|verify} messages.
         * @param message RequestChatOff message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IRequestChatOff, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RequestChatOff message, length delimited. Does not implicitly {@link message.RequestChatOff.verify|verify} messages.
         * @param message RequestChatOff message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IRequestChatOff, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RequestChatOff message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RequestChatOff
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.RequestChatOff;

        /**
         * Decodes a RequestChatOff message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RequestChatOff
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.RequestChatOff;

        /**
         * Verifies a RequestChatOff message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RequestChatOff message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RequestChatOff
         */
        public static fromObject(object: { [k: string]: any }): message.RequestChatOff;

        /**
         * Creates a plain object from a RequestChatOff message. Also converts values to other types if specified.
         * @param message RequestChatOff
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.RequestChatOff, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RequestChatOff to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SendChatMessage. */
    interface ISendChatMessage {

        /** SendChatMessage bucketId */
        bucketId?: (number|Long|null);

        /** SendChatMessage picUrl */
        picUrl?: (string|null);

        /** SendChatMessage content */
        content?: (string|null);
    }

    /** Represents a SendChatMessage. */
    class SendChatMessage implements ISendChatMessage {

        /**
         * Constructs a new SendChatMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.ISendChatMessage);

        /** SendChatMessage bucketId. */
        public bucketId: (number|Long);

        /** SendChatMessage picUrl. */
        public picUrl: string;

        /** SendChatMessage content. */
        public content: string;

        /**
         * Creates a new SendChatMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SendChatMessage instance
         */
        public static create(properties?: message.ISendChatMessage): message.SendChatMessage;

        /**
         * Encodes the specified SendChatMessage message. Does not implicitly {@link message.SendChatMessage.verify|verify} messages.
         * @param message SendChatMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.ISendChatMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SendChatMessage message, length delimited. Does not implicitly {@link message.SendChatMessage.verify|verify} messages.
         * @param message SendChatMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.ISendChatMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SendChatMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SendChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.SendChatMessage;

        /**
         * Decodes a SendChatMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SendChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.SendChatMessage;

        /**
         * Verifies a SendChatMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SendChatMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SendChatMessage
         */
        public static fromObject(object: { [k: string]: any }): message.SendChatMessage;

        /**
         * Creates a plain object from a SendChatMessage message. Also converts values to other types if specified.
         * @param message SendChatMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.SendChatMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SendChatMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ChatMessage. */
    interface IChatMessage {

        /** ChatMessage msgId */
        msgId?: (number|Long|null);

        /** ChatMessage isMy */
        isMy?: (boolean|null);

        /** ChatMessage read */
        read?: (boolean|null);

        /** ChatMessage sendTime */
        sendTime?: (number|Long|null);

        /** ChatMessage picUrl */
        picUrl?: (string|null);

        /** ChatMessage content */
        content?: (string|null);
    }

    /** Represents a ChatMessage. */
    class ChatMessage implements IChatMessage {

        /**
         * Constructs a new ChatMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IChatMessage);

        /** ChatMessage msgId. */
        public msgId: (number|Long);

        /** ChatMessage isMy. */
        public isMy: boolean;

        /** ChatMessage read. */
        public read: boolean;

        /** ChatMessage sendTime. */
        public sendTime: (number|Long);

        /** ChatMessage picUrl. */
        public picUrl: string;

        /** ChatMessage content. */
        public content: string;

        /**
         * Creates a new ChatMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChatMessage instance
         */
        public static create(properties?: message.IChatMessage): message.ChatMessage;

        /**
         * Encodes the specified ChatMessage message. Does not implicitly {@link message.ChatMessage.verify|verify} messages.
         * @param message ChatMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IChatMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChatMessage message, length delimited. Does not implicitly {@link message.ChatMessage.verify|verify} messages.
         * @param message ChatMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IChatMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChatMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.ChatMessage;

        /**
         * Decodes a ChatMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.ChatMessage;

        /**
         * Verifies a ChatMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChatMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChatMessage
         */
        public static fromObject(object: { [k: string]: any }): message.ChatMessage;

        /**
         * Creates a plain object from a ChatMessage message. Also converts values to other types if specified.
         * @param message ChatMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.ChatMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChatMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BucketInfo. */
    interface IBucketInfo {

        /** BucketInfo bucketId */
        bucketId?: (number|Long|null);

        /** BucketInfo good */
        good?: (message.BucketInfo.IGood|null);

        /** BucketInfo talker */
        talker?: (message.BucketInfo.ITalker|null);

        /** 从时间由远到近 */
        msgList?: (message.IChatMessage[]|null);
    }

    /** Represents a BucketInfo. */
    class BucketInfo implements IBucketInfo {

        /**
         * Constructs a new BucketInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBucketInfo);

        /** BucketInfo bucketId. */
        public bucketId: (number|Long);

        /** BucketInfo good. */
        public good?: (message.BucketInfo.IGood|null);

        /** BucketInfo talker. */
        public talker?: (message.BucketInfo.ITalker|null);

        /** 从时间由远到近 */
        public msgList: message.IChatMessage[];

        /**
         * Creates a new BucketInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BucketInfo instance
         */
        public static create(properties?: message.IBucketInfo): message.BucketInfo;

        /**
         * Encodes the specified BucketInfo message. Does not implicitly {@link message.BucketInfo.verify|verify} messages.
         * @param message BucketInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBucketInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BucketInfo message, length delimited. Does not implicitly {@link message.BucketInfo.verify|verify} messages.
         * @param message BucketInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBucketInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BucketInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BucketInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BucketInfo;

        /**
         * Decodes a BucketInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BucketInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BucketInfo;

        /**
         * Verifies a BucketInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BucketInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BucketInfo
         */
        public static fromObject(object: { [k: string]: any }): message.BucketInfo;

        /**
         * Creates a plain object from a BucketInfo message. Also converts values to other types if specified.
         * @param message BucketInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BucketInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BucketInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace BucketInfo {

        /** Properties of a Good. */
        interface IGood {

            /** Good state */
            state?: (number|null);

            /** Good code */
            code?: (string|null);

            /** Good title */
            title?: (string|null);

            /** Good pic */
            pic?: (string|null);

            /** Good price */
            price?: (string|null);

            /** Good leftSec */
            leftSec?: (number|null);
        }

        /** Represents a Good. */
        class Good implements IGood {

            /**
             * Constructs a new Good.
             * @param [properties] Properties to set
             */
            constructor(properties?: message.BucketInfo.IGood);

            /** Good state. */
            public state: number;

            /** Good code. */
            public code: string;

            /** Good title. */
            public title: string;

            /** Good pic. */
            public pic: string;

            /** Good price. */
            public price: string;

            /** Good leftSec. */
            public leftSec: number;

            /**
             * Creates a new Good instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Good instance
             */
            public static create(properties?: message.BucketInfo.IGood): message.BucketInfo.Good;

            /**
             * Encodes the specified Good message. Does not implicitly {@link message.BucketInfo.Good.verify|verify} messages.
             * @param message Good message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: message.BucketInfo.IGood, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Good message, length delimited. Does not implicitly {@link message.BucketInfo.Good.verify|verify} messages.
             * @param message Good message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: message.BucketInfo.IGood, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Good message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Good
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BucketInfo.Good;

            /**
             * Decodes a Good message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Good
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BucketInfo.Good;

            /**
             * Verifies a Good message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Good message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Good
             */
            public static fromObject(object: { [k: string]: any }): message.BucketInfo.Good;

            /**
             * Creates a plain object from a Good message. Also converts values to other types if specified.
             * @param message Good
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: message.BucketInfo.Good, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Good to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Talker. */
        interface ITalker {

            /** Talker userId */
            userId?: (number|Long|null);

            /** Talker name */
            name?: (string|null);

            /** Talker avatar */
            avatar?: (string|null);
        }

        /** Represents a Talker. */
        class Talker implements ITalker {

            /**
             * Constructs a new Talker.
             * @param [properties] Properties to set
             */
            constructor(properties?: message.BucketInfo.ITalker);

            /** Talker userId. */
            public userId: (number|Long);

            /** Talker name. */
            public name: string;

            /** Talker avatar. */
            public avatar: string;

            /**
             * Creates a new Talker instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Talker instance
             */
            public static create(properties?: message.BucketInfo.ITalker): message.BucketInfo.Talker;

            /**
             * Encodes the specified Talker message. Does not implicitly {@link message.BucketInfo.Talker.verify|verify} messages.
             * @param message Talker message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: message.BucketInfo.ITalker, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Talker message, length delimited. Does not implicitly {@link message.BucketInfo.Talker.verify|verify} messages.
             * @param message Talker message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: message.BucketInfo.ITalker, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Talker message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Talker
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BucketInfo.Talker;

            /**
             * Decodes a Talker message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Talker
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BucketInfo.Talker;

            /**
             * Verifies a Talker message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Talker message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Talker
             */
            public static fromObject(object: { [k: string]: any }): message.BucketInfo.Talker;

            /**
             * Creates a plain object from a Talker message. Also converts values to other types if specified.
             * @param message Talker
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: message.BucketInfo.Talker, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Talker to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a PushChatMessage. */
    interface IPushChatMessage {

        /** PushChatMessage bucketId */
        bucketId?: (number|Long|null);

        /** PushChatMessage msg */
        msg?: (message.IChatMessage|null);
    }

    /** Represents a PushChatMessage. */
    class PushChatMessage implements IPushChatMessage {

        /**
         * Constructs a new PushChatMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IPushChatMessage);

        /** PushChatMessage bucketId. */
        public bucketId: (number|Long);

        /** PushChatMessage msg. */
        public msg?: (message.IChatMessage|null);

        /**
         * Creates a new PushChatMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PushChatMessage instance
         */
        public static create(properties?: message.IPushChatMessage): message.PushChatMessage;

        /**
         * Encodes the specified PushChatMessage message. Does not implicitly {@link message.PushChatMessage.verify|verify} messages.
         * @param message PushChatMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IPushChatMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PushChatMessage message, length delimited. Does not implicitly {@link message.PushChatMessage.verify|verify} messages.
         * @param message PushChatMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IPushChatMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PushChatMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PushChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.PushChatMessage;

        /**
         * Decodes a PushChatMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PushChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.PushChatMessage;

        /**
         * Verifies a PushChatMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PushChatMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PushChatMessage
         */
        public static fromObject(object: { [k: string]: any }): message.PushChatMessage;

        /**
         * Creates a plain object from a PushChatMessage message. Also converts values to other types if specified.
         * @param message PushChatMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.PushChatMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PushChatMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BackSendMessage. */
    interface IBackSendMessage {

        /** BackSendMessage code */
        code?: (message.BackSendMessage.RetCode|null);

        /** BackSendMessage msg */
        msg?: (string|null);
    }

    /** Represents a BackSendMessage. */
    class BackSendMessage implements IBackSendMessage {

        /**
         * Constructs a new BackSendMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBackSendMessage);

        /** BackSendMessage code. */
        public code: message.BackSendMessage.RetCode;

        /** BackSendMessage msg. */
        public msg: string;

        /**
         * Creates a new BackSendMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BackSendMessage instance
         */
        public static create(properties?: message.IBackSendMessage): message.BackSendMessage;

        /**
         * Encodes the specified BackSendMessage message. Does not implicitly {@link message.BackSendMessage.verify|verify} messages.
         * @param message BackSendMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBackSendMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BackSendMessage message, length delimited. Does not implicitly {@link message.BackSendMessage.verify|verify} messages.
         * @param message BackSendMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBackSendMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BackSendMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BackSendMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BackSendMessage;

        /**
         * Decodes a BackSendMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BackSendMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BackSendMessage;

        /**
         * Verifies a BackSendMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BackSendMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BackSendMessage
         */
        public static fromObject(object: { [k: string]: any }): message.BackSendMessage;

        /**
         * Creates a plain object from a BackSendMessage message. Also converts values to other types if specified.
         * @param message BackSendMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BackSendMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BackSendMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace BackSendMessage {

        /** RetCode enum. */
        enum RetCode {
            RC_OK = 0,
            RC_WRONG = 1,
            RC_WRONG_BUCKET = 2,
            RC_FORBIDEN = 3,
            RC_OTHER = 4
        }
    }

    /** Properties of a RequestBidOn. */
    interface IRequestBidOn {

        /** RequestBidOn goodCode */
        goodCode?: (string|null);
    }

    /** Represents a RequestBidOn. */
    class RequestBidOn implements IRequestBidOn {

        /**
         * Constructs a new RequestBidOn.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IRequestBidOn);

        /** RequestBidOn goodCode. */
        public goodCode: string;

        /**
         * Creates a new RequestBidOn instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestBidOn instance
         */
        public static create(properties?: message.IRequestBidOn): message.RequestBidOn;

        /**
         * Encodes the specified RequestBidOn message. Does not implicitly {@link message.RequestBidOn.verify|verify} messages.
         * @param message RequestBidOn message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IRequestBidOn, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RequestBidOn message, length delimited. Does not implicitly {@link message.RequestBidOn.verify|verify} messages.
         * @param message RequestBidOn message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IRequestBidOn, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RequestBidOn message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RequestBidOn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.RequestBidOn;

        /**
         * Decodes a RequestBidOn message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RequestBidOn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.RequestBidOn;

        /**
         * Verifies a RequestBidOn message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RequestBidOn message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RequestBidOn
         */
        public static fromObject(object: { [k: string]: any }): message.RequestBidOn;

        /**
         * Creates a plain object from a RequestBidOn message. Also converts values to other types if specified.
         * @param message RequestBidOn
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.RequestBidOn, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RequestBidOn to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RequestBidOff. */
    interface IRequestBidOff {
    }

    /** Represents a RequestBidOff. */
    class RequestBidOff implements IRequestBidOff {

        /**
         * Constructs a new RequestBidOff.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IRequestBidOff);

        /**
         * Creates a new RequestBidOff instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestBidOff instance
         */
        public static create(properties?: message.IRequestBidOff): message.RequestBidOff;

        /**
         * Encodes the specified RequestBidOff message. Does not implicitly {@link message.RequestBidOff.verify|verify} messages.
         * @param message RequestBidOff message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IRequestBidOff, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RequestBidOff message, length delimited. Does not implicitly {@link message.RequestBidOff.verify|verify} messages.
         * @param message RequestBidOff message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IRequestBidOff, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RequestBidOff message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RequestBidOff
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.RequestBidOff;

        /**
         * Decodes a RequestBidOff message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RequestBidOff
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.RequestBidOff;

        /**
         * Verifies a RequestBidOff message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RequestBidOff message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RequestBidOff
         */
        public static fromObject(object: { [k: string]: any }): message.RequestBidOff;

        /**
         * Creates a plain object from a RequestBidOff message. Also converts values to other types if specified.
         * @param message RequestBidOff
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.RequestBidOff, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RequestBidOff to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PushGoodBidList. */
    interface IPushGoodBidList {

        /** PushGoodBidList goodCode */
        goodCode?: (string|null);

        /** PushGoodBidList list */
        list?: (message.PushGoodBidList.IUserBid[]|null);
    }

    /** Represents a PushGoodBidList. */
    class PushGoodBidList implements IPushGoodBidList {

        /**
         * Constructs a new PushGoodBidList.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IPushGoodBidList);

        /** PushGoodBidList goodCode. */
        public goodCode: string;

        /** PushGoodBidList list. */
        public list: message.PushGoodBidList.IUserBid[];

        /**
         * Creates a new PushGoodBidList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PushGoodBidList instance
         */
        public static create(properties?: message.IPushGoodBidList): message.PushGoodBidList;

        /**
         * Encodes the specified PushGoodBidList message. Does not implicitly {@link message.PushGoodBidList.verify|verify} messages.
         * @param message PushGoodBidList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IPushGoodBidList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PushGoodBidList message, length delimited. Does not implicitly {@link message.PushGoodBidList.verify|verify} messages.
         * @param message PushGoodBidList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IPushGoodBidList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PushGoodBidList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PushGoodBidList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.PushGoodBidList;

        /**
         * Decodes a PushGoodBidList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PushGoodBidList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.PushGoodBidList;

        /**
         * Verifies a PushGoodBidList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PushGoodBidList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PushGoodBidList
         */
        public static fromObject(object: { [k: string]: any }): message.PushGoodBidList;

        /**
         * Creates a plain object from a PushGoodBidList message. Also converts values to other types if specified.
         * @param message PushGoodBidList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.PushGoodBidList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PushGoodBidList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace PushGoodBidList {

        /** Properties of a UserBid. */
        interface IUserBid {

            /** UserBid userId */
            userId?: (number|Long|null);

            /** UserBid name */
            name?: (string|null);

            /** UserBid avatar */
            avatar?: (string|null);

            /** UserBid bidTime */
            bidTime?: (number|Long|null);

            /** UserBid price */
            price?: (string|null);
        }

        /** Represents a UserBid. */
        class UserBid implements IUserBid {

            /**
             * Constructs a new UserBid.
             * @param [properties] Properties to set
             */
            constructor(properties?: message.PushGoodBidList.IUserBid);

            /** UserBid userId. */
            public userId: (number|Long);

            /** UserBid name. */
            public name: string;

            /** UserBid avatar. */
            public avatar: string;

            /** UserBid bidTime. */
            public bidTime: (number|Long);

            /** UserBid price. */
            public price: string;

            /**
             * Creates a new UserBid instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UserBid instance
             */
            public static create(properties?: message.PushGoodBidList.IUserBid): message.PushGoodBidList.UserBid;

            /**
             * Encodes the specified UserBid message. Does not implicitly {@link message.PushGoodBidList.UserBid.verify|verify} messages.
             * @param message UserBid message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: message.PushGoodBidList.IUserBid, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UserBid message, length delimited. Does not implicitly {@link message.PushGoodBidList.UserBid.verify|verify} messages.
             * @param message UserBid message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: message.PushGoodBidList.IUserBid, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a UserBid message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UserBid
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.PushGoodBidList.UserBid;

            /**
             * Decodes a UserBid message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UserBid
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.PushGoodBidList.UserBid;

            /**
             * Verifies a UserBid message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a UserBid message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UserBid
             */
            public static fromObject(object: { [k: string]: any }): message.PushGoodBidList.UserBid;

            /**
             * Creates a plain object from a UserBid message. Also converts values to other types if specified.
             * @param message UserBid
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: message.PushGoodBidList.UserBid, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UserBid to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a HeartBeat. */
    interface IHeartBeat {

        /** HeartBeat time */
        time?: (number|Long|null);
    }

    /** Represents a HeartBeat. */
    class HeartBeat implements IHeartBeat {

        /**
         * Constructs a new HeartBeat.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IHeartBeat);

        /** HeartBeat time. */
        public time: (number|Long);

        /**
         * Creates a new HeartBeat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HeartBeat instance
         */
        public static create(properties?: message.IHeartBeat): message.HeartBeat;

        /**
         * Encodes the specified HeartBeat message. Does not implicitly {@link message.HeartBeat.verify|verify} messages.
         * @param message HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IHeartBeat, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HeartBeat message, length delimited. Does not implicitly {@link message.HeartBeat.verify|verify} messages.
         * @param message HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IHeartBeat, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HeartBeat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.HeartBeat;

        /**
         * Decodes a HeartBeat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.HeartBeat;

        /**
         * Verifies a HeartBeat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HeartBeat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HeartBeat
         */
        public static fromObject(object: { [k: string]: any }): message.HeartBeat;

        /**
         * Creates a plain object from a HeartBeat message. Also converts values to other types if specified.
         * @param message HeartBeat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.HeartBeat, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HeartBeat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LoginBroadCastRoom1001. */
    interface ILoginBroadCastRoom1001 {

        /** LoginBroadCastRoom1001 roomId */
        roomId?: (number|Long|null);

        /** LoginBroadCastRoom1001 uid */
        uid?: (string|null);

        /** LoginBroadCastRoom1001 token */
        token?: (string|null);
    }

    /** Represents a LoginBroadCastRoom1001. */
    class LoginBroadCastRoom1001 implements ILoginBroadCastRoom1001 {

        /**
         * Constructs a new LoginBroadCastRoom1001.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.ILoginBroadCastRoom1001);

        /** LoginBroadCastRoom1001 roomId. */
        public roomId: (number|Long);

        /** LoginBroadCastRoom1001 uid. */
        public uid: string;

        /** LoginBroadCastRoom1001 token. */
        public token: string;

        /**
         * Creates a new LoginBroadCastRoom1001 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginBroadCastRoom1001 instance
         */
        public static create(properties?: message.ILoginBroadCastRoom1001): message.LoginBroadCastRoom1001;

        /**
         * Encodes the specified LoginBroadCastRoom1001 message. Does not implicitly {@link message.LoginBroadCastRoom1001.verify|verify} messages.
         * @param message LoginBroadCastRoom1001 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.ILoginBroadCastRoom1001, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LoginBroadCastRoom1001 message, length delimited. Does not implicitly {@link message.LoginBroadCastRoom1001.verify|verify} messages.
         * @param message LoginBroadCastRoom1001 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.ILoginBroadCastRoom1001, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LoginBroadCastRoom1001 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginBroadCastRoom1001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.LoginBroadCastRoom1001;

        /**
         * Decodes a LoginBroadCastRoom1001 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoginBroadCastRoom1001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.LoginBroadCastRoom1001;

        /**
         * Verifies a LoginBroadCastRoom1001 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LoginBroadCastRoom1001 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoginBroadCastRoom1001
         */
        public static fromObject(object: { [k: string]: any }): message.LoginBroadCastRoom1001;

        /**
         * Creates a plain object from a LoginBroadCastRoom1001 message. Also converts values to other types if specified.
         * @param message LoginBroadCastRoom1001
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.LoginBroadCastRoom1001, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LoginBroadCastRoom1001 to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LogoutBroadCastRoom1001. */
    interface ILogoutBroadCastRoom1001 {

        /** LogoutBroadCastRoom1001 roomId */
        roomId?: (number|Long|null);
    }

    /** Represents a LogoutBroadCastRoom1001. */
    class LogoutBroadCastRoom1001 implements ILogoutBroadCastRoom1001 {

        /**
         * Constructs a new LogoutBroadCastRoom1001.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.ILogoutBroadCastRoom1001);

        /** LogoutBroadCastRoom1001 roomId. */
        public roomId: (number|Long);

        /**
         * Creates a new LogoutBroadCastRoom1001 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LogoutBroadCastRoom1001 instance
         */
        public static create(properties?: message.ILogoutBroadCastRoom1001): message.LogoutBroadCastRoom1001;

        /**
         * Encodes the specified LogoutBroadCastRoom1001 message. Does not implicitly {@link message.LogoutBroadCastRoom1001.verify|verify} messages.
         * @param message LogoutBroadCastRoom1001 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.ILogoutBroadCastRoom1001, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LogoutBroadCastRoom1001 message, length delimited. Does not implicitly {@link message.LogoutBroadCastRoom1001.verify|verify} messages.
         * @param message LogoutBroadCastRoom1001 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.ILogoutBroadCastRoom1001, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LogoutBroadCastRoom1001 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LogoutBroadCastRoom1001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.LogoutBroadCastRoom1001;

        /**
         * Decodes a LogoutBroadCastRoom1001 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LogoutBroadCastRoom1001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.LogoutBroadCastRoom1001;

        /**
         * Verifies a LogoutBroadCastRoom1001 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LogoutBroadCastRoom1001 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LogoutBroadCastRoom1001
         */
        public static fromObject(object: { [k: string]: any }): message.LogoutBroadCastRoom1001;

        /**
         * Creates a plain object from a LogoutBroadCastRoom1001 message. Also converts values to other types if specified.
         * @param message LogoutBroadCastRoom1001
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.LogoutBroadCastRoom1001, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LogoutBroadCastRoom1001 to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BackHeartBeat. */
    interface IBackHeartBeat {

        /** BackHeartBeat time */
        time?: (number|Long|null);
    }

    /** Represents a BackHeartBeat. */
    class BackHeartBeat implements IBackHeartBeat {

        /**
         * Constructs a new BackHeartBeat.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBackHeartBeat);

        /** BackHeartBeat time. */
        public time: (number|Long);

        /**
         * Creates a new BackHeartBeat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BackHeartBeat instance
         */
        public static create(properties?: message.IBackHeartBeat): message.BackHeartBeat;

        /**
         * Encodes the specified BackHeartBeat message. Does not implicitly {@link message.BackHeartBeat.verify|verify} messages.
         * @param message BackHeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBackHeartBeat, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BackHeartBeat message, length delimited. Does not implicitly {@link message.BackHeartBeat.verify|verify} messages.
         * @param message BackHeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBackHeartBeat, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BackHeartBeat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BackHeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BackHeartBeat;

        /**
         * Decodes a BackHeartBeat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BackHeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BackHeartBeat;

        /**
         * Verifies a BackHeartBeat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BackHeartBeat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BackHeartBeat
         */
        public static fromObject(object: { [k: string]: any }): message.BackHeartBeat;

        /**
         * Creates a plain object from a BackHeartBeat message. Also converts values to other types if specified.
         * @param message BackHeartBeat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BackHeartBeat, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BackHeartBeat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BackLoginBroadCastRoom1001. */
    interface IBackLoginBroadCastRoom1001 {

        /** BackLoginBroadCastRoom1001 code */
        code?: (message.BackLoginBroadCastRoom1001.RetCode|null);

        /** BackLoginBroadCastRoom1001 msg */
        msg?: (string|null);

        /** BackLoginBroadCastRoom1001 point */
        point?: (number|null);

        /** BackLoginBroadCastRoom1001 applyLianmai */
        applyLianmai?: (boolean|null);
    }

    /** Represents a BackLoginBroadCastRoom1001. */
    class BackLoginBroadCastRoom1001 implements IBackLoginBroadCastRoom1001 {

        /**
         * Constructs a new BackLoginBroadCastRoom1001.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBackLoginBroadCastRoom1001);

        /** BackLoginBroadCastRoom1001 code. */
        public code: message.BackLoginBroadCastRoom1001.RetCode;

        /** BackLoginBroadCastRoom1001 msg. */
        public msg: string;

        /** BackLoginBroadCastRoom1001 point. */
        public point: number;

        /** BackLoginBroadCastRoom1001 applyLianmai. */
        public applyLianmai: boolean;

        /**
         * Creates a new BackLoginBroadCastRoom1001 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BackLoginBroadCastRoom1001 instance
         */
        public static create(properties?: message.IBackLoginBroadCastRoom1001): message.BackLoginBroadCastRoom1001;

        /**
         * Encodes the specified BackLoginBroadCastRoom1001 message. Does not implicitly {@link message.BackLoginBroadCastRoom1001.verify|verify} messages.
         * @param message BackLoginBroadCastRoom1001 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBackLoginBroadCastRoom1001, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BackLoginBroadCastRoom1001 message, length delimited. Does not implicitly {@link message.BackLoginBroadCastRoom1001.verify|verify} messages.
         * @param message BackLoginBroadCastRoom1001 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBackLoginBroadCastRoom1001, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BackLoginBroadCastRoom1001 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BackLoginBroadCastRoom1001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BackLoginBroadCastRoom1001;

        /**
         * Decodes a BackLoginBroadCastRoom1001 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BackLoginBroadCastRoom1001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BackLoginBroadCastRoom1001;

        /**
         * Verifies a BackLoginBroadCastRoom1001 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BackLoginBroadCastRoom1001 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BackLoginBroadCastRoom1001
         */
        public static fromObject(object: { [k: string]: any }): message.BackLoginBroadCastRoom1001;

        /**
         * Creates a plain object from a BackLoginBroadCastRoom1001 message. Also converts values to other types if specified.
         * @param message BackLoginBroadCastRoom1001
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BackLoginBroadCastRoom1001, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BackLoginBroadCastRoom1001 to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace BackLoginBroadCastRoom1001 {

        /** RetCode enum. */
        enum RetCode {
            RC_OK = 0,
            RC_WRONG_IDENTIFIER = 1,
            RC_LOGIN_CLOSED = 2,
            RC_TOO_FAST = 3
        }
    }

    /** Properties of a Message. */
    interface IMessage {

        /** Message list */
        list?: (string[]|null);
    }

    /** Represents a Message. */
    class Message implements IMessage {

        /**
         * Constructs a new Message.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IMessage);

        /** Message list. */
        public list: string[];

        /**
         * Creates a new Message instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Message instance
         */
        public static create(properties?: message.IMessage): message.Message;

        /**
         * Encodes the specified Message message. Does not implicitly {@link message.Message.verify|verify} messages.
         * @param message Message message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Message message, length delimited. Does not implicitly {@link message.Message.verify|verify} messages.
         * @param message Message message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Message message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.Message;

        /**
         * Decodes a Message message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.Message;

        /**
         * Verifies a Message message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Message message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Message
         */
        public static fromObject(object: { [k: string]: any }): message.Message;

        /**
         * Creates a plain object from a Message message. Also converts values to other types if specified.
         * @param message Message
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.Message, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Message to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SendMyPoint. */
    interface ISendMyPoint {

        /** SendMyPoint point */
        point?: (number|null);
    }

    /** Represents a SendMyPoint. */
    class SendMyPoint implements ISendMyPoint {

        /**
         * Constructs a new SendMyPoint.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.ISendMyPoint);

        /** SendMyPoint point. */
        public point: number;

        /**
         * Creates a new SendMyPoint instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SendMyPoint instance
         */
        public static create(properties?: message.ISendMyPoint): message.SendMyPoint;

        /**
         * Encodes the specified SendMyPoint message. Does not implicitly {@link message.SendMyPoint.verify|verify} messages.
         * @param message SendMyPoint message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.ISendMyPoint, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SendMyPoint message, length delimited. Does not implicitly {@link message.SendMyPoint.verify|verify} messages.
         * @param message SendMyPoint message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.ISendMyPoint, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SendMyPoint message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SendMyPoint
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.SendMyPoint;

        /**
         * Decodes a SendMyPoint message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SendMyPoint
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.SendMyPoint;

        /**
         * Verifies a SendMyPoint message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SendMyPoint message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SendMyPoint
         */
        public static fromObject(object: { [k: string]: any }): message.SendMyPoint;

        /**
         * Creates a plain object from a SendMyPoint message. Also converts values to other types if specified.
         * @param message SendMyPoint
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.SendMyPoint, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SendMyPoint to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** NODE enum. */
    enum NODE {
        NONE = 0,
        GATESERVER = 1,
        ACCOUNTSERVER = 2,
        WORLDSERVER = 3,
        CORESERVER = 4,
        FUNCSERVER = 5
    }

    /** Properties of an Ipacket. */
    interface IIpacket {

        /** Ipacket Stx */
        Stx?: (number|null);

        /** Ipacket DestNodeType */
        DestNodeType?: (message.NODE|null);

        /** Ipacket Ckx */
        Ckx?: (number|null);

        /** Ipacket Id */
        Id?: (number|null);
    }

    /** Represents an Ipacket. */
    class Ipacket implements IIpacket {

        /**
         * Constructs a new Ipacket.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IIpacket);

        /** Ipacket Stx. */
        public Stx: number;

        /** Ipacket DestNodeType. */
        public DestNodeType: message.NODE;

        /** Ipacket Ckx. */
        public Ckx: number;

        /** Ipacket Id. */
        public Id: number;

        /**
         * Creates a new Ipacket instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Ipacket instance
         */
        public static create(properties?: message.IIpacket): message.Ipacket;

        /**
         * Encodes the specified Ipacket message. Does not implicitly {@link message.Ipacket.verify|verify} messages.
         * @param message Ipacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IIpacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Ipacket message, length delimited. Does not implicitly {@link message.Ipacket.verify|verify} messages.
         * @param message Ipacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IIpacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Ipacket message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Ipacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.Ipacket;

        /**
         * Decodes an Ipacket message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Ipacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.Ipacket;

        /**
         * Verifies an Ipacket message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Ipacket message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Ipacket
         */
        public static fromObject(object: { [k: string]: any }): message.Ipacket;

        /**
         * Creates a plain object from an Ipacket message. Also converts values to other types if specified.
         * @param message Ipacket
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.Ipacket, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Ipacket to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RpcHead. */
    interface IRpcHead {

        /** RpcHead ClientId */
        ClientId?: (number|null);

        /** RpcHead Key */
        Key?: (string|null);

        /** RpcHead AccountId */
        AccountId?: (number|Long|null);

        /** RpcHead fromNode */
        fromNode?: (number|null);

        /** RpcHead toNode */
        toNode?: (number|null);

        /** RpcHead CallId */
        CallId?: (number|Long|null);

        /** RpcHead SocketId */
        SocketId?: (number|null);
    }

    /** Represents a RpcHead. */
    class RpcHead implements IRpcHead {

        /**
         * Constructs a new RpcHead.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IRpcHead);

        /** RpcHead ClientId. */
        public ClientId: number;

        /** RpcHead Key. */
        public Key: string;

        /** RpcHead AccountId. */
        public AccountId: (number|Long);

        /** RpcHead fromNode. */
        public fromNode: number;

        /** RpcHead toNode. */
        public toNode: number;

        /** RpcHead CallId. */
        public CallId: (number|Long);

        /** RpcHead SocketId. */
        public SocketId: number;

        /**
         * Creates a new RpcHead instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RpcHead instance
         */
        public static create(properties?: message.IRpcHead): message.RpcHead;

        /**
         * Encodes the specified RpcHead message. Does not implicitly {@link message.RpcHead.verify|verify} messages.
         * @param message RpcHead message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IRpcHead, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RpcHead message, length delimited. Does not implicitly {@link message.RpcHead.verify|verify} messages.
         * @param message RpcHead message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IRpcHead, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RpcHead message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RpcHead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.RpcHead;

        /**
         * Decodes a RpcHead message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RpcHead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.RpcHead;

        /**
         * Verifies a RpcHead message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RpcHead message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RpcHead
         */
        public static fromObject(object: { [k: string]: any }): message.RpcHead;

        /**
         * Creates a plain object from a RpcHead message. Also converts values to other types if specified.
         * @param message RpcHead
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.RpcHead, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RpcHead to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RpcPacket. */
    interface IRpcPacket {

        /** RpcPacket FuncName */
        FuncName?: (string|null);

        /** RpcPacket ArgLen */
        ArgLen?: (number|null);

        /** RpcPacket RpcHead */
        RpcHead?: (message.IRpcHead|null);

        /** RpcPacket RpcBody */
        RpcBody?: (Uint8Array|null);
    }

    /** Represents a RpcPacket. */
    class RpcPacket implements IRpcPacket {

        /**
         * Constructs a new RpcPacket.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IRpcPacket);

        /** RpcPacket FuncName. */
        public FuncName: string;

        /** RpcPacket ArgLen. */
        public ArgLen: number;

        /** RpcPacket RpcHead. */
        public RpcHead?: (message.IRpcHead|null);

        /** RpcPacket RpcBody. */
        public RpcBody: Uint8Array;

        /**
         * Creates a new RpcPacket instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RpcPacket instance
         */
        public static create(properties?: message.IRpcPacket): message.RpcPacket;

        /**
         * Encodes the specified RpcPacket message. Does not implicitly {@link message.RpcPacket.verify|verify} messages.
         * @param message RpcPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IRpcPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RpcPacket message, length delimited. Does not implicitly {@link message.RpcPacket.verify|verify} messages.
         * @param message RpcPacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IRpcPacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RpcPacket message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RpcPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.RpcPacket;

        /**
         * Decodes a RpcPacket message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RpcPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.RpcPacket;

        /**
         * Verifies a RpcPacket message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RpcPacket message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RpcPacket
         */
        public static fromObject(object: { [k: string]: any }): message.RpcPacket;

        /**
         * Creates a plain object from a RpcPacket message. Also converts values to other types if specified.
         * @param message RpcPacket
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.RpcPacket, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RpcPacket to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RequestLike. */
    interface IRequestLike {

        /** RequestLike num */
        num?: (number|null);
    }

    /** Represents a RequestLike. */
    class RequestLike implements IRequestLike {

        /**
         * Constructs a new RequestLike.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IRequestLike);

        /** RequestLike num. */
        public num: number;

        /**
         * Creates a new RequestLike instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestLike instance
         */
        public static create(properties?: message.IRequestLike): message.RequestLike;

        /**
         * Encodes the specified RequestLike message. Does not implicitly {@link message.RequestLike.verify|verify} messages.
         * @param message RequestLike message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IRequestLike, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RequestLike message, length delimited. Does not implicitly {@link message.RequestLike.verify|verify} messages.
         * @param message RequestLike message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IRequestLike, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RequestLike message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RequestLike
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.RequestLike;

        /**
         * Decodes a RequestLike message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RequestLike
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.RequestLike;

        /**
         * Verifies a RequestLike message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RequestLike message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RequestLike
         */
        public static fromObject(object: { [k: string]: any }): message.RequestLike;

        /**
         * Creates a plain object from a RequestLike message. Also converts values to other types if specified.
         * @param message RequestLike
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.RequestLike, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RequestLike to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RequestSendGift. */
    interface IRequestSendGift {

        /** RequestSendGift giftTpId */
        giftTpId?: (number|Long|null);

        /** RequestSendGift num */
        num?: (number|null);

        /** RequestSendGift target */
        target?: (number|Long|null);
    }

    /** Represents a RequestSendGift. */
    class RequestSendGift implements IRequestSendGift {

        /**
         * Constructs a new RequestSendGift.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IRequestSendGift);

        /** RequestSendGift giftTpId. */
        public giftTpId: (number|Long);

        /** RequestSendGift num. */
        public num: number;

        /** RequestSendGift target. */
        public target: (number|Long);

        /**
         * Creates a new RequestSendGift instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestSendGift instance
         */
        public static create(properties?: message.IRequestSendGift): message.RequestSendGift;

        /**
         * Encodes the specified RequestSendGift message. Does not implicitly {@link message.RequestSendGift.verify|verify} messages.
         * @param message RequestSendGift message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IRequestSendGift, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RequestSendGift message, length delimited. Does not implicitly {@link message.RequestSendGift.verify|verify} messages.
         * @param message RequestSendGift message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IRequestSendGift, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RequestSendGift message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RequestSendGift
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.RequestSendGift;

        /**
         * Decodes a RequestSendGift message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RequestSendGift
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.RequestSendGift;

        /**
         * Verifies a RequestSendGift message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RequestSendGift message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RequestSendGift
         */
        public static fromObject(object: { [k: string]: any }): message.RequestSendGift;

        /**
         * Creates a plain object from a RequestSendGift message. Also converts values to other types if specified.
         * @param message RequestSendGift
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.RequestSendGift, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RequestSendGift to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RequestSendHongbao. */
    interface IRequestSendHongbao {

        /** RequestSendHongbao giftTpId */
        giftTpId?: (number|Long|null);

        /** RequestSendHongbao delayMinute */
        delayMinute?: (number|null);
    }

    /** Represents a RequestSendHongbao. */
    class RequestSendHongbao implements IRequestSendHongbao {

        /**
         * Constructs a new RequestSendHongbao.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IRequestSendHongbao);

        /** RequestSendHongbao giftTpId. */
        public giftTpId: (number|Long);

        /** RequestSendHongbao delayMinute. */
        public delayMinute: number;

        /**
         * Creates a new RequestSendHongbao instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestSendHongbao instance
         */
        public static create(properties?: message.IRequestSendHongbao): message.RequestSendHongbao;

        /**
         * Encodes the specified RequestSendHongbao message. Does not implicitly {@link message.RequestSendHongbao.verify|verify} messages.
         * @param message RequestSendHongbao message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IRequestSendHongbao, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RequestSendHongbao message, length delimited. Does not implicitly {@link message.RequestSendHongbao.verify|verify} messages.
         * @param message RequestSendHongbao message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IRequestSendHongbao, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RequestSendHongbao message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RequestSendHongbao
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.RequestSendHongbao;

        /**
         * Decodes a RequestSendHongbao message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RequestSendHongbao
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.RequestSendHongbao;

        /**
         * Verifies a RequestSendHongbao message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RequestSendHongbao message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RequestSendHongbao
         */
        public static fromObject(object: { [k: string]: any }): message.RequestSendHongbao;

        /**
         * Creates a plain object from a RequestSendHongbao message. Also converts values to other types if specified.
         * @param message RequestSendHongbao
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.RequestSendHongbao, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RequestSendHongbao to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RequestGrabHongbao. */
    interface IRequestGrabHongbao {

        /** RequestGrabHongbao hongbaoId */
        hongbaoId?: (number|Long|null);
    }

    /** Represents a RequestGrabHongbao. */
    class RequestGrabHongbao implements IRequestGrabHongbao {

        /**
         * Constructs a new RequestGrabHongbao.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IRequestGrabHongbao);

        /** RequestGrabHongbao hongbaoId. */
        public hongbaoId: (number|Long);

        /**
         * Creates a new RequestGrabHongbao instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestGrabHongbao instance
         */
        public static create(properties?: message.IRequestGrabHongbao): message.RequestGrabHongbao;

        /**
         * Encodes the specified RequestGrabHongbao message. Does not implicitly {@link message.RequestGrabHongbao.verify|verify} messages.
         * @param message RequestGrabHongbao message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IRequestGrabHongbao, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RequestGrabHongbao message, length delimited. Does not implicitly {@link message.RequestGrabHongbao.verify|verify} messages.
         * @param message RequestGrabHongbao message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IRequestGrabHongbao, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RequestGrabHongbao message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RequestGrabHongbao
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.RequestGrabHongbao;

        /**
         * Decodes a RequestGrabHongbao message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RequestGrabHongbao
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.RequestGrabHongbao;

        /**
         * Verifies a RequestGrabHongbao message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RequestGrabHongbao message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RequestGrabHongbao
         */
        public static fromObject(object: { [k: string]: any }): message.RequestGrabHongbao;

        /**
         * Creates a plain object from a RequestGrabHongbao message. Also converts values to other types if specified.
         * @param message RequestGrabHongbao
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.RequestGrabHongbao, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RequestGrabHongbao to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RequestSendChatMessage. */
    interface IRequestSendChatMessage {

        /** RequestSendChatMessage content */
        content?: (string|null);
    }

    /** Represents a RequestSendChatMessage. */
    class RequestSendChatMessage implements IRequestSendChatMessage {

        /**
         * Constructs a new RequestSendChatMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IRequestSendChatMessage);

        /** RequestSendChatMessage content. */
        public content: string;

        /**
         * Creates a new RequestSendChatMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestSendChatMessage instance
         */
        public static create(properties?: message.IRequestSendChatMessage): message.RequestSendChatMessage;

        /**
         * Encodes the specified RequestSendChatMessage message. Does not implicitly {@link message.RequestSendChatMessage.verify|verify} messages.
         * @param message RequestSendChatMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IRequestSendChatMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RequestSendChatMessage message, length delimited. Does not implicitly {@link message.RequestSendChatMessage.verify|verify} messages.
         * @param message RequestSendChatMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IRequestSendChatMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RequestSendChatMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RequestSendChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.RequestSendChatMessage;

        /**
         * Decodes a RequestSendChatMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RequestSendChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.RequestSendChatMessage;

        /**
         * Verifies a RequestSendChatMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RequestSendChatMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RequestSendChatMessage
         */
        public static fromObject(object: { [k: string]: any }): message.RequestSendChatMessage;

        /**
         * Creates a plain object from a RequestSendChatMessage message. Also converts values to other types if specified.
         * @param message RequestSendChatMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.RequestSendChatMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RequestSendChatMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RequestSendMerchantCoupon. */
    interface IRequestSendMerchantCoupon {

        /** RequestSendMerchantCoupon tp */
        tp?: (number|null);

        /** RequestSendMerchantCoupon goodCode */
        goodCode?: (string|null);

        /** RequestSendMerchantCoupon amount */
        amount?: (number|null);

        /** RequestSendMerchantCoupon minUseAmount */
        minUseAmount?: (number|null);

        /** RequestSendMerchantCoupon num */
        num?: (number|null);

        /** RequestSendMerchantCoupon lifeMinute */
        lifeMinute?: (number|null);

        /** RequestSendMerchantCoupon delayMinute */
        delayMinute?: (number|null);
    }

    /** Represents a RequestSendMerchantCoupon. */
    class RequestSendMerchantCoupon implements IRequestSendMerchantCoupon {

        /**
         * Constructs a new RequestSendMerchantCoupon.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IRequestSendMerchantCoupon);

        /** RequestSendMerchantCoupon tp. */
        public tp: number;

        /** RequestSendMerchantCoupon goodCode. */
        public goodCode: string;

        /** RequestSendMerchantCoupon amount. */
        public amount: number;

        /** RequestSendMerchantCoupon minUseAmount. */
        public minUseAmount: number;

        /** RequestSendMerchantCoupon num. */
        public num: number;

        /** RequestSendMerchantCoupon lifeMinute. */
        public lifeMinute: number;

        /** RequestSendMerchantCoupon delayMinute. */
        public delayMinute: number;

        /**
         * Creates a new RequestSendMerchantCoupon instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestSendMerchantCoupon instance
         */
        public static create(properties?: message.IRequestSendMerchantCoupon): message.RequestSendMerchantCoupon;

        /**
         * Encodes the specified RequestSendMerchantCoupon message. Does not implicitly {@link message.RequestSendMerchantCoupon.verify|verify} messages.
         * @param message RequestSendMerchantCoupon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IRequestSendMerchantCoupon, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RequestSendMerchantCoupon message, length delimited. Does not implicitly {@link message.RequestSendMerchantCoupon.verify|verify} messages.
         * @param message RequestSendMerchantCoupon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IRequestSendMerchantCoupon, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RequestSendMerchantCoupon message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RequestSendMerchantCoupon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.RequestSendMerchantCoupon;

        /**
         * Decodes a RequestSendMerchantCoupon message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RequestSendMerchantCoupon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.RequestSendMerchantCoupon;

        /**
         * Verifies a RequestSendMerchantCoupon message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RequestSendMerchantCoupon message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RequestSendMerchantCoupon
         */
        public static fromObject(object: { [k: string]: any }): message.RequestSendMerchantCoupon;

        /**
         * Creates a plain object from a RequestSendMerchantCoupon message. Also converts values to other types if specified.
         * @param message RequestSendMerchantCoupon
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.RequestSendMerchantCoupon, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RequestSendMerchantCoupon to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RequestGetMerchantCoupon. */
    interface IRequestGetMerchantCoupon {

        /** RequestGetMerchantCoupon id */
        id?: (number|Long|null);
    }

    /** Represents a RequestGetMerchantCoupon. */
    class RequestGetMerchantCoupon implements IRequestGetMerchantCoupon {

        /**
         * Constructs a new RequestGetMerchantCoupon.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IRequestGetMerchantCoupon);

        /** RequestGetMerchantCoupon id. */
        public id: (number|Long);

        /**
         * Creates a new RequestGetMerchantCoupon instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestGetMerchantCoupon instance
         */
        public static create(properties?: message.IRequestGetMerchantCoupon): message.RequestGetMerchantCoupon;

        /**
         * Encodes the specified RequestGetMerchantCoupon message. Does not implicitly {@link message.RequestGetMerchantCoupon.verify|verify} messages.
         * @param message RequestGetMerchantCoupon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IRequestGetMerchantCoupon, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RequestGetMerchantCoupon message, length delimited. Does not implicitly {@link message.RequestGetMerchantCoupon.verify|verify} messages.
         * @param message RequestGetMerchantCoupon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IRequestGetMerchantCoupon, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RequestGetMerchantCoupon message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RequestGetMerchantCoupon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.RequestGetMerchantCoupon;

        /**
         * Decodes a RequestGetMerchantCoupon message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RequestGetMerchantCoupon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.RequestGetMerchantCoupon;

        /**
         * Verifies a RequestGetMerchantCoupon message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RequestGetMerchantCoupon message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RequestGetMerchantCoupon
         */
        public static fromObject(object: { [k: string]: any }): message.RequestGetMerchantCoupon;

        /**
         * Creates a plain object from a RequestGetMerchantCoupon message. Also converts values to other types if specified.
         * @param message RequestGetMerchantCoupon
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.RequestGetMerchantCoupon, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RequestGetMerchantCoupon to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RequestSwitchLianmaiAllow. */
    interface IRequestSwitchLianmaiAllow {
    }

    /** Represents a RequestSwitchLianmaiAllow. */
    class RequestSwitchLianmaiAllow implements IRequestSwitchLianmaiAllow {

        /**
         * Constructs a new RequestSwitchLianmaiAllow.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IRequestSwitchLianmaiAllow);

        /**
         * Creates a new RequestSwitchLianmaiAllow instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestSwitchLianmaiAllow instance
         */
        public static create(properties?: message.IRequestSwitchLianmaiAllow): message.RequestSwitchLianmaiAllow;

        /**
         * Encodes the specified RequestSwitchLianmaiAllow message. Does not implicitly {@link message.RequestSwitchLianmaiAllow.verify|verify} messages.
         * @param message RequestSwitchLianmaiAllow message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IRequestSwitchLianmaiAllow, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RequestSwitchLianmaiAllow message, length delimited. Does not implicitly {@link message.RequestSwitchLianmaiAllow.verify|verify} messages.
         * @param message RequestSwitchLianmaiAllow message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IRequestSwitchLianmaiAllow, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RequestSwitchLianmaiAllow message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RequestSwitchLianmaiAllow
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.RequestSwitchLianmaiAllow;

        /**
         * Decodes a RequestSwitchLianmaiAllow message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RequestSwitchLianmaiAllow
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.RequestSwitchLianmaiAllow;

        /**
         * Verifies a RequestSwitchLianmaiAllow message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RequestSwitchLianmaiAllow message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RequestSwitchLianmaiAllow
         */
        public static fromObject(object: { [k: string]: any }): message.RequestSwitchLianmaiAllow;

        /**
         * Creates a plain object from a RequestSwitchLianmaiAllow message. Also converts values to other types if specified.
         * @param message RequestSwitchLianmaiAllow
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.RequestSwitchLianmaiAllow, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RequestSwitchLianmaiAllow to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RequestApplyLianmai. */
    interface IRequestApplyLianmai {
    }

    /** Represents a RequestApplyLianmai. */
    class RequestApplyLianmai implements IRequestApplyLianmai {

        /**
         * Constructs a new RequestApplyLianmai.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IRequestApplyLianmai);

        /**
         * Creates a new RequestApplyLianmai instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestApplyLianmai instance
         */
        public static create(properties?: message.IRequestApplyLianmai): message.RequestApplyLianmai;

        /**
         * Encodes the specified RequestApplyLianmai message. Does not implicitly {@link message.RequestApplyLianmai.verify|verify} messages.
         * @param message RequestApplyLianmai message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IRequestApplyLianmai, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RequestApplyLianmai message, length delimited. Does not implicitly {@link message.RequestApplyLianmai.verify|verify} messages.
         * @param message RequestApplyLianmai message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IRequestApplyLianmai, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RequestApplyLianmai message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RequestApplyLianmai
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.RequestApplyLianmai;

        /**
         * Decodes a RequestApplyLianmai message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RequestApplyLianmai
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.RequestApplyLianmai;

        /**
         * Verifies a RequestApplyLianmai message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RequestApplyLianmai message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RequestApplyLianmai
         */
        public static fromObject(object: { [k: string]: any }): message.RequestApplyLianmai;

        /**
         * Creates a plain object from a RequestApplyLianmai message. Also converts values to other types if specified.
         * @param message RequestApplyLianmai
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.RequestApplyLianmai, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RequestApplyLianmai to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ActorRequestLianmaiData. */
    interface IActorRequestLianmaiData {
    }

    /** Represents an ActorRequestLianmaiData. */
    class ActorRequestLianmaiData implements IActorRequestLianmaiData {

        /**
         * Constructs a new ActorRequestLianmaiData.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IActorRequestLianmaiData);

        /**
         * Creates a new ActorRequestLianmaiData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ActorRequestLianmaiData instance
         */
        public static create(properties?: message.IActorRequestLianmaiData): message.ActorRequestLianmaiData;

        /**
         * Encodes the specified ActorRequestLianmaiData message. Does not implicitly {@link message.ActorRequestLianmaiData.verify|verify} messages.
         * @param message ActorRequestLianmaiData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IActorRequestLianmaiData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ActorRequestLianmaiData message, length delimited. Does not implicitly {@link message.ActorRequestLianmaiData.verify|verify} messages.
         * @param message ActorRequestLianmaiData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IActorRequestLianmaiData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ActorRequestLianmaiData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ActorRequestLianmaiData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.ActorRequestLianmaiData;

        /**
         * Decodes an ActorRequestLianmaiData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ActorRequestLianmaiData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.ActorRequestLianmaiData;

        /**
         * Verifies an ActorRequestLianmaiData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ActorRequestLianmaiData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ActorRequestLianmaiData
         */
        public static fromObject(object: { [k: string]: any }): message.ActorRequestLianmaiData;

        /**
         * Creates a plain object from an ActorRequestLianmaiData message. Also converts values to other types if specified.
         * @param message ActorRequestLianmaiData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.ActorRequestLianmaiData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ActorRequestLianmaiData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ActorAgreeLianmaiApply. */
    interface IActorAgreeLianmaiApply {

        /** ActorAgreeLianmaiApply uid */
        uid?: (string|null);
    }

    /** Represents an ActorAgreeLianmaiApply. */
    class ActorAgreeLianmaiApply implements IActorAgreeLianmaiApply {

        /**
         * Constructs a new ActorAgreeLianmaiApply.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IActorAgreeLianmaiApply);

        /** ActorAgreeLianmaiApply uid. */
        public uid: string;

        /**
         * Creates a new ActorAgreeLianmaiApply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ActorAgreeLianmaiApply instance
         */
        public static create(properties?: message.IActorAgreeLianmaiApply): message.ActorAgreeLianmaiApply;

        /**
         * Encodes the specified ActorAgreeLianmaiApply message. Does not implicitly {@link message.ActorAgreeLianmaiApply.verify|verify} messages.
         * @param message ActorAgreeLianmaiApply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IActorAgreeLianmaiApply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ActorAgreeLianmaiApply message, length delimited. Does not implicitly {@link message.ActorAgreeLianmaiApply.verify|verify} messages.
         * @param message ActorAgreeLianmaiApply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IActorAgreeLianmaiApply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ActorAgreeLianmaiApply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ActorAgreeLianmaiApply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.ActorAgreeLianmaiApply;

        /**
         * Decodes an ActorAgreeLianmaiApply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ActorAgreeLianmaiApply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.ActorAgreeLianmaiApply;

        /**
         * Verifies an ActorAgreeLianmaiApply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ActorAgreeLianmaiApply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ActorAgreeLianmaiApply
         */
        public static fromObject(object: { [k: string]: any }): message.ActorAgreeLianmaiApply;

        /**
         * Creates a plain object from an ActorAgreeLianmaiApply message. Also converts values to other types if specified.
         * @param message ActorAgreeLianmaiApply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.ActorAgreeLianmaiApply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ActorAgreeLianmaiApply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ActorTerminateLianmai. */
    interface IActorTerminateLianmai {
    }

    /** Represents an ActorTerminateLianmai. */
    class ActorTerminateLianmai implements IActorTerminateLianmai {

        /**
         * Constructs a new ActorTerminateLianmai.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IActorTerminateLianmai);

        /**
         * Creates a new ActorTerminateLianmai instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ActorTerminateLianmai instance
         */
        public static create(properties?: message.IActorTerminateLianmai): message.ActorTerminateLianmai;

        /**
         * Encodes the specified ActorTerminateLianmai message. Does not implicitly {@link message.ActorTerminateLianmai.verify|verify} messages.
         * @param message ActorTerminateLianmai message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IActorTerminateLianmai, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ActorTerminateLianmai message, length delimited. Does not implicitly {@link message.ActorTerminateLianmai.verify|verify} messages.
         * @param message ActorTerminateLianmai message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IActorTerminateLianmai, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ActorTerminateLianmai message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ActorTerminateLianmai
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.ActorTerminateLianmai;

        /**
         * Decodes an ActorTerminateLianmai message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ActorTerminateLianmai
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.ActorTerminateLianmai;

        /**
         * Verifies an ActorTerminateLianmai message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ActorTerminateLianmai message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ActorTerminateLianmai
         */
        public static fromObject(object: { [k: string]: any }): message.ActorTerminateLianmai;

        /**
         * Creates a plain object from an ActorTerminateLianmai message. Also converts values to other types if specified.
         * @param message ActorTerminateLianmai
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.ActorTerminateLianmai, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ActorTerminateLianmai to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SelfTerminateLianmai. */
    interface ISelfTerminateLianmai {
    }

    /** Represents a SelfTerminateLianmai. */
    class SelfTerminateLianmai implements ISelfTerminateLianmai {

        /**
         * Constructs a new SelfTerminateLianmai.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.ISelfTerminateLianmai);

        /**
         * Creates a new SelfTerminateLianmai instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SelfTerminateLianmai instance
         */
        public static create(properties?: message.ISelfTerminateLianmai): message.SelfTerminateLianmai;

        /**
         * Encodes the specified SelfTerminateLianmai message. Does not implicitly {@link message.SelfTerminateLianmai.verify|verify} messages.
         * @param message SelfTerminateLianmai message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.ISelfTerminateLianmai, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SelfTerminateLianmai message, length delimited. Does not implicitly {@link message.SelfTerminateLianmai.verify|verify} messages.
         * @param message SelfTerminateLianmai message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.ISelfTerminateLianmai, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SelfTerminateLianmai message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SelfTerminateLianmai
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.SelfTerminateLianmai;

        /**
         * Decodes a SelfTerminateLianmai message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SelfTerminateLianmai
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.SelfTerminateLianmai;

        /**
         * Verifies a SelfTerminateLianmai message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SelfTerminateLianmai message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SelfTerminateLianmai
         */
        public static fromObject(object: { [k: string]: any }): message.SelfTerminateLianmai;

        /**
         * Creates a plain object from a SelfTerminateLianmai message. Also converts values to other types if specified.
         * @param message SelfTerminateLianmai
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.SelfTerminateLianmai, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SelfTerminateLianmai to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GmChatBid. */
    interface IGmChatBid {

        /** GmChatBid uid */
        uid?: (string|null);
    }

    /** Represents a GmChatBid. */
    class GmChatBid implements IGmChatBid {

        /**
         * Constructs a new GmChatBid.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IGmChatBid);

        /** GmChatBid uid. */
        public uid: string;

        /**
         * Creates a new GmChatBid instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GmChatBid instance
         */
        public static create(properties?: message.IGmChatBid): message.GmChatBid;

        /**
         * Encodes the specified GmChatBid message. Does not implicitly {@link message.GmChatBid.verify|verify} messages.
         * @param message GmChatBid message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IGmChatBid, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GmChatBid message, length delimited. Does not implicitly {@link message.GmChatBid.verify|verify} messages.
         * @param message GmChatBid message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IGmChatBid, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GmChatBid message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GmChatBid
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.GmChatBid;

        /**
         * Decodes a GmChatBid message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GmChatBid
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.GmChatBid;

        /**
         * Verifies a GmChatBid message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GmChatBid message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GmChatBid
         */
        public static fromObject(object: { [k: string]: any }): message.GmChatBid;

        /**
         * Creates a plain object from a GmChatBid message. Also converts values to other types if specified.
         * @param message GmChatBid
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.GmChatBid, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GmChatBid to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GmKickOutRoom. */
    interface IGmKickOutRoom {

        /** GmKickOutRoom uid */
        uid?: (string|null);
    }

    /** Represents a GmKickOutRoom. */
    class GmKickOutRoom implements IGmKickOutRoom {

        /**
         * Constructs a new GmKickOutRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IGmKickOutRoom);

        /** GmKickOutRoom uid. */
        public uid: string;

        /**
         * Creates a new GmKickOutRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GmKickOutRoom instance
         */
        public static create(properties?: message.IGmKickOutRoom): message.GmKickOutRoom;

        /**
         * Encodes the specified GmKickOutRoom message. Does not implicitly {@link message.GmKickOutRoom.verify|verify} messages.
         * @param message GmKickOutRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IGmKickOutRoom, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GmKickOutRoom message, length delimited. Does not implicitly {@link message.GmKickOutRoom.verify|verify} messages.
         * @param message GmKickOutRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IGmKickOutRoom, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GmKickOutRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GmKickOutRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.GmKickOutRoom;

        /**
         * Decodes a GmKickOutRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GmKickOutRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.GmKickOutRoom;

        /**
         * Verifies a GmKickOutRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GmKickOutRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GmKickOutRoom
         */
        public static fromObject(object: { [k: string]: any }): message.GmKickOutRoom;

        /**
         * Creates a plain object from a GmKickOutRoom message. Also converts values to other types if specified.
         * @param message GmKickOutRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.GmKickOutRoom, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GmKickOutRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BackLike. */
    interface IBackLike {

        /** BackLike msg */
        msg?: (string|null);
    }

    /** Represents a BackLike. */
    class BackLike implements IBackLike {

        /**
         * Constructs a new BackLike.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBackLike);

        /** BackLike msg. */
        public msg: string;

        /**
         * Creates a new BackLike instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BackLike instance
         */
        public static create(properties?: message.IBackLike): message.BackLike;

        /**
         * Encodes the specified BackLike message. Does not implicitly {@link message.BackLike.verify|verify} messages.
         * @param message BackLike message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBackLike, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BackLike message, length delimited. Does not implicitly {@link message.BackLike.verify|verify} messages.
         * @param message BackLike message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBackLike, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BackLike message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BackLike
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BackLike;

        /**
         * Decodes a BackLike message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BackLike
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BackLike;

        /**
         * Verifies a BackLike message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BackLike message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BackLike
         */
        public static fromObject(object: { [k: string]: any }): message.BackLike;

        /**
         * Creates a plain object from a BackLike message. Also converts values to other types if specified.
         * @param message BackLike
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BackLike, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BackLike to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BroadCastLike. */
    interface IBroadCastLike {

        /** BroadCastLike list */
        list?: (message.BroadCastLike.IUserLike[]|null);

        /** BroadCastLike finalLikeNum */
        finalLikeNum?: (number|null);
    }

    /** Represents a BroadCastLike. */
    class BroadCastLike implements IBroadCastLike {

        /**
         * Constructs a new BroadCastLike.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBroadCastLike);

        /** BroadCastLike list. */
        public list: message.BroadCastLike.IUserLike[];

        /** BroadCastLike finalLikeNum. */
        public finalLikeNum: number;

        /**
         * Creates a new BroadCastLike instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BroadCastLike instance
         */
        public static create(properties?: message.IBroadCastLike): message.BroadCastLike;

        /**
         * Encodes the specified BroadCastLike message. Does not implicitly {@link message.BroadCastLike.verify|verify} messages.
         * @param message BroadCastLike message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBroadCastLike, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BroadCastLike message, length delimited. Does not implicitly {@link message.BroadCastLike.verify|verify} messages.
         * @param message BroadCastLike message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBroadCastLike, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BroadCastLike message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BroadCastLike
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BroadCastLike;

        /**
         * Decodes a BroadCastLike message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BroadCastLike
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BroadCastLike;

        /**
         * Verifies a BroadCastLike message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BroadCastLike message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BroadCastLike
         */
        public static fromObject(object: { [k: string]: any }): message.BroadCastLike;

        /**
         * Creates a plain object from a BroadCastLike message. Also converts values to other types if specified.
         * @param message BroadCastLike
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BroadCastLike, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BroadCastLike to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace BroadCastLike {

        /** Properties of a UserLike. */
        interface IUserLike {

            /** UserLike tp */
            tp?: (string|null);

            /** UserLike num */
            num?: (number|null);

            /** UserLike avatar */
            avatar?: (string|null);
        }

        /** Represents a UserLike. */
        class UserLike implements IUserLike {

            /**
             * Constructs a new UserLike.
             * @param [properties] Properties to set
             */
            constructor(properties?: message.BroadCastLike.IUserLike);

            /** UserLike tp. */
            public tp: string;

            /** UserLike num. */
            public num: number;

            /** UserLike avatar. */
            public avatar: string;

            /**
             * Creates a new UserLike instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UserLike instance
             */
            public static create(properties?: message.BroadCastLike.IUserLike): message.BroadCastLike.UserLike;

            /**
             * Encodes the specified UserLike message. Does not implicitly {@link message.BroadCastLike.UserLike.verify|verify} messages.
             * @param message UserLike message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: message.BroadCastLike.IUserLike, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UserLike message, length delimited. Does not implicitly {@link message.BroadCastLike.UserLike.verify|verify} messages.
             * @param message UserLike message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: message.BroadCastLike.IUserLike, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a UserLike message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UserLike
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BroadCastLike.UserLike;

            /**
             * Decodes a UserLike message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UserLike
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BroadCastLike.UserLike;

            /**
             * Verifies a UserLike message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a UserLike message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UserLike
             */
            public static fromObject(object: { [k: string]: any }): message.BroadCastLike.UserLike;

            /**
             * Creates a plain object from a UserLike message. Also converts values to other types if specified.
             * @param message UserLike
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: message.BroadCastLike.UserLike, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UserLike to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a BroadCastBilibili_Send. */
    interface IBroadCastBilibili_Send {

        /** BroadCastBilibili_Send list */
        list?: (message.BroadCastBilibili_Send.IBilibili_Send[]|null);
    }

    /** Represents a BroadCastBilibili_Send. */
    class BroadCastBilibili_Send implements IBroadCastBilibili_Send {

        /**
         * Constructs a new BroadCastBilibili_Send.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBroadCastBilibili_Send);

        /** BroadCastBilibili_Send list. */
        public list: message.BroadCastBilibili_Send.IBilibili_Send[];

        /**
         * Creates a new BroadCastBilibili_Send instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BroadCastBilibili_Send instance
         */
        public static create(properties?: message.IBroadCastBilibili_Send): message.BroadCastBilibili_Send;

        /**
         * Encodes the specified BroadCastBilibili_Send message. Does not implicitly {@link message.BroadCastBilibili_Send.verify|verify} messages.
         * @param message BroadCastBilibili_Send message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBroadCastBilibili_Send, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BroadCastBilibili_Send message, length delimited. Does not implicitly {@link message.BroadCastBilibili_Send.verify|verify} messages.
         * @param message BroadCastBilibili_Send message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBroadCastBilibili_Send, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BroadCastBilibili_Send message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BroadCastBilibili_Send
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BroadCastBilibili_Send;

        /**
         * Decodes a BroadCastBilibili_Send message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BroadCastBilibili_Send
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BroadCastBilibili_Send;

        /**
         * Verifies a BroadCastBilibili_Send message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BroadCastBilibili_Send message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BroadCastBilibili_Send
         */
        public static fromObject(object: { [k: string]: any }): message.BroadCastBilibili_Send;

        /**
         * Creates a plain object from a BroadCastBilibili_Send message. Also converts values to other types if specified.
         * @param message BroadCastBilibili_Send
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BroadCastBilibili_Send, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BroadCastBilibili_Send to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace BroadCastBilibili_Send {

        /** Properties of a Bilibili_Send. */
        interface IBilibili_Send {

            /** Bilibili_Send sender */
            sender?: (string|null);

            /** Bilibili_Send senderAvatar */
            senderAvatar?: (string|null);

            /** Bilibili_Send name */
            name?: (string|null);

            /** Bilibili_Send num */
            num?: (number|null);

            /** Bilibili_Send continuityNum */
            continuityNum?: (number|null);
        }

        /** Represents a Bilibili_Send. */
        class Bilibili_Send implements IBilibili_Send {

            /**
             * Constructs a new Bilibili_Send.
             * @param [properties] Properties to set
             */
            constructor(properties?: message.BroadCastBilibili_Send.IBilibili_Send);

            /** Bilibili_Send sender. */
            public sender: string;

            /** Bilibili_Send senderAvatar. */
            public senderAvatar: string;

            /** Bilibili_Send name. */
            public name: string;

            /** Bilibili_Send num. */
            public num: number;

            /** Bilibili_Send continuityNum. */
            public continuityNum: number;

            /**
             * Creates a new Bilibili_Send instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Bilibili_Send instance
             */
            public static create(properties?: message.BroadCastBilibili_Send.IBilibili_Send): message.BroadCastBilibili_Send.Bilibili_Send;

            /**
             * Encodes the specified Bilibili_Send message. Does not implicitly {@link message.BroadCastBilibili_Send.Bilibili_Send.verify|verify} messages.
             * @param message Bilibili_Send message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: message.BroadCastBilibili_Send.IBilibili_Send, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Bilibili_Send message, length delimited. Does not implicitly {@link message.BroadCastBilibili_Send.Bilibili_Send.verify|verify} messages.
             * @param message Bilibili_Send message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: message.BroadCastBilibili_Send.IBilibili_Send, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Bilibili_Send message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Bilibili_Send
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BroadCastBilibili_Send.Bilibili_Send;

            /**
             * Decodes a Bilibili_Send message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Bilibili_Send
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BroadCastBilibili_Send.Bilibili_Send;

            /**
             * Verifies a Bilibili_Send message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Bilibili_Send message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Bilibili_Send
             */
            public static fromObject(object: { [k: string]: any }): message.BroadCastBilibili_Send.Bilibili_Send;

            /**
             * Creates a plain object from a Bilibili_Send message. Also converts values to other types if specified.
             * @param message Bilibili_Send
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: message.BroadCastBilibili_Send.Bilibili_Send, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Bilibili_Send to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a BackSendGift. */
    interface IBackSendGift {

        /** BackSendGift msg */
        msg?: (string|null);
    }

    /** Represents a BackSendGift. */
    class BackSendGift implements IBackSendGift {

        /**
         * Constructs a new BackSendGift.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBackSendGift);

        /** BackSendGift msg. */
        public msg: string;

        /**
         * Creates a new BackSendGift instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BackSendGift instance
         */
        public static create(properties?: message.IBackSendGift): message.BackSendGift;

        /**
         * Encodes the specified BackSendGift message. Does not implicitly {@link message.BackSendGift.verify|verify} messages.
         * @param message BackSendGift message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBackSendGift, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BackSendGift message, length delimited. Does not implicitly {@link message.BackSendGift.verify|verify} messages.
         * @param message BackSendGift message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBackSendGift, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BackSendGift message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BackSendGift
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BackSendGift;

        /**
         * Decodes a BackSendGift message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BackSendGift
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BackSendGift;

        /**
         * Verifies a BackSendGift message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BackSendGift message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BackSendGift
         */
        public static fromObject(object: { [k: string]: any }): message.BackSendGift;

        /**
         * Creates a plain object from a BackSendGift message. Also converts values to other types if specified.
         * @param message BackSendGift
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BackSendGift, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BackSendGift to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BackSendHongbao. */
    interface IBackSendHongbao {

        /** BackSendHongbao msg */
        msg?: (string|null);
    }

    /** Represents a BackSendHongbao. */
    class BackSendHongbao implements IBackSendHongbao {

        /**
         * Constructs a new BackSendHongbao.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBackSendHongbao);

        /** BackSendHongbao msg. */
        public msg: string;

        /**
         * Creates a new BackSendHongbao instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BackSendHongbao instance
         */
        public static create(properties?: message.IBackSendHongbao): message.BackSendHongbao;

        /**
         * Encodes the specified BackSendHongbao message. Does not implicitly {@link message.BackSendHongbao.verify|verify} messages.
         * @param message BackSendHongbao message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBackSendHongbao, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BackSendHongbao message, length delimited. Does not implicitly {@link message.BackSendHongbao.verify|verify} messages.
         * @param message BackSendHongbao message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBackSendHongbao, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BackSendHongbao message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BackSendHongbao
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BackSendHongbao;

        /**
         * Decodes a BackSendHongbao message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BackSendHongbao
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BackSendHongbao;

        /**
         * Verifies a BackSendHongbao message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BackSendHongbao message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BackSendHongbao
         */
        public static fromObject(object: { [k: string]: any }): message.BackSendHongbao;

        /**
         * Creates a plain object from a BackSendHongbao message. Also converts values to other types if specified.
         * @param message BackSendHongbao
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BackSendHongbao, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BackSendHongbao to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** HongbaoState enum. */
    enum HongbaoState {
        RC_COUNTDOWN = 0,
        RC_READY = 1,
        RC_FINISH = 2,
        RC_OTHER = 3
    }

    /** Properties of a BroadCastHongbao. */
    interface IBroadCastHongbao {

        /** BroadCastHongbao list */
        list?: (message.BroadCastHongbao.IHongbao[]|null);
    }

    /** Represents a BroadCastHongbao. */
    class BroadCastHongbao implements IBroadCastHongbao {

        /**
         * Constructs a new BroadCastHongbao.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBroadCastHongbao);

        /** BroadCastHongbao list. */
        public list: message.BroadCastHongbao.IHongbao[];

        /**
         * Creates a new BroadCastHongbao instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BroadCastHongbao instance
         */
        public static create(properties?: message.IBroadCastHongbao): message.BroadCastHongbao;

        /**
         * Encodes the specified BroadCastHongbao message. Does not implicitly {@link message.BroadCastHongbao.verify|verify} messages.
         * @param message BroadCastHongbao message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBroadCastHongbao, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BroadCastHongbao message, length delimited. Does not implicitly {@link message.BroadCastHongbao.verify|verify} messages.
         * @param message BroadCastHongbao message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBroadCastHongbao, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BroadCastHongbao message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BroadCastHongbao
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BroadCastHongbao;

        /**
         * Decodes a BroadCastHongbao message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BroadCastHongbao
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BroadCastHongbao;

        /**
         * Verifies a BroadCastHongbao message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BroadCastHongbao message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BroadCastHongbao
         */
        public static fromObject(object: { [k: string]: any }): message.BroadCastHongbao;

        /**
         * Creates a plain object from a BroadCastHongbao message. Also converts values to other types if specified.
         * @param message BroadCastHongbao
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BroadCastHongbao, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BroadCastHongbao to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace BroadCastHongbao {

        /** Properties of an Hongbao. */
        interface IHongbao {

            /** Hongbao id */
            id?: (number|Long|null);

            /** Hongbao state */
            state?: (message.HongbaoState|null);

            /** Hongbao sender */
            sender?: (string|null);

            /** Hongbao senderAvatar */
            senderAvatar?: (string|null);

            /** Hongbao point */
            point?: (number|null);

            /** Hongbao startTime */
            startTime?: (number|Long|null);

            /** Hongbao leftNum */
            leftNum?: (number|null);
        }

        /** Represents an Hongbao. */
        class Hongbao implements IHongbao {

            /**
             * Constructs a new Hongbao.
             * @param [properties] Properties to set
             */
            constructor(properties?: message.BroadCastHongbao.IHongbao);

            /** Hongbao id. */
            public id: (number|Long);

            /** Hongbao state. */
            public state: message.HongbaoState;

            /** Hongbao sender. */
            public sender: string;

            /** Hongbao senderAvatar. */
            public senderAvatar: string;

            /** Hongbao point. */
            public point: number;

            /** Hongbao startTime. */
            public startTime: (number|Long);

            /** Hongbao leftNum. */
            public leftNum: number;

            /**
             * Creates a new Hongbao instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Hongbao instance
             */
            public static create(properties?: message.BroadCastHongbao.IHongbao): message.BroadCastHongbao.Hongbao;

            /**
             * Encodes the specified Hongbao message. Does not implicitly {@link message.BroadCastHongbao.Hongbao.verify|verify} messages.
             * @param message Hongbao message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: message.BroadCastHongbao.IHongbao, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Hongbao message, length delimited. Does not implicitly {@link message.BroadCastHongbao.Hongbao.verify|verify} messages.
             * @param message Hongbao message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: message.BroadCastHongbao.IHongbao, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Hongbao message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Hongbao
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BroadCastHongbao.Hongbao;

            /**
             * Decodes an Hongbao message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Hongbao
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BroadCastHongbao.Hongbao;

            /**
             * Verifies an Hongbao message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Hongbao message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Hongbao
             */
            public static fromObject(object: { [k: string]: any }): message.BroadCastHongbao.Hongbao;

            /**
             * Creates a plain object from an Hongbao message. Also converts values to other types if specified.
             * @param message Hongbao
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: message.BroadCastHongbao.Hongbao, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Hongbao to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a BroadCastHongbaoUpdated. */
    interface IBroadCastHongbaoUpdated {

        /** BroadCastHongbaoUpdated list */
        list?: (message.BroadCastHongbaoUpdated.IHongbaoUpdated[]|null);
    }

    /** Represents a BroadCastHongbaoUpdated. */
    class BroadCastHongbaoUpdated implements IBroadCastHongbaoUpdated {

        /**
         * Constructs a new BroadCastHongbaoUpdated.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBroadCastHongbaoUpdated);

        /** BroadCastHongbaoUpdated list. */
        public list: message.BroadCastHongbaoUpdated.IHongbaoUpdated[];

        /**
         * Creates a new BroadCastHongbaoUpdated instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BroadCastHongbaoUpdated instance
         */
        public static create(properties?: message.IBroadCastHongbaoUpdated): message.BroadCastHongbaoUpdated;

        /**
         * Encodes the specified BroadCastHongbaoUpdated message. Does not implicitly {@link message.BroadCastHongbaoUpdated.verify|verify} messages.
         * @param message BroadCastHongbaoUpdated message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBroadCastHongbaoUpdated, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BroadCastHongbaoUpdated message, length delimited. Does not implicitly {@link message.BroadCastHongbaoUpdated.verify|verify} messages.
         * @param message BroadCastHongbaoUpdated message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBroadCastHongbaoUpdated, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BroadCastHongbaoUpdated message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BroadCastHongbaoUpdated
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BroadCastHongbaoUpdated;

        /**
         * Decodes a BroadCastHongbaoUpdated message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BroadCastHongbaoUpdated
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BroadCastHongbaoUpdated;

        /**
         * Verifies a BroadCastHongbaoUpdated message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BroadCastHongbaoUpdated message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BroadCastHongbaoUpdated
         */
        public static fromObject(object: { [k: string]: any }): message.BroadCastHongbaoUpdated;

        /**
         * Creates a plain object from a BroadCastHongbaoUpdated message. Also converts values to other types if specified.
         * @param message BroadCastHongbaoUpdated
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BroadCastHongbaoUpdated, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BroadCastHongbaoUpdated to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace BroadCastHongbaoUpdated {

        /** Properties of an HongbaoUpdated. */
        interface IHongbaoUpdated {

            /** HongbaoUpdated id */
            id?: (number|Long|null);

            /** HongbaoUpdated newState */
            newState?: (message.HongbaoState|null);

            /** HongbaoUpdated leftNum */
            leftNum?: (number|null);
        }

        /** Represents an HongbaoUpdated. */
        class HongbaoUpdated implements IHongbaoUpdated {

            /**
             * Constructs a new HongbaoUpdated.
             * @param [properties] Properties to set
             */
            constructor(properties?: message.BroadCastHongbaoUpdated.IHongbaoUpdated);

            /** HongbaoUpdated id. */
            public id: (number|Long);

            /** HongbaoUpdated newState. */
            public newState: message.HongbaoState;

            /** HongbaoUpdated leftNum. */
            public leftNum: number;

            /**
             * Creates a new HongbaoUpdated instance using the specified properties.
             * @param [properties] Properties to set
             * @returns HongbaoUpdated instance
             */
            public static create(properties?: message.BroadCastHongbaoUpdated.IHongbaoUpdated): message.BroadCastHongbaoUpdated.HongbaoUpdated;

            /**
             * Encodes the specified HongbaoUpdated message. Does not implicitly {@link message.BroadCastHongbaoUpdated.HongbaoUpdated.verify|verify} messages.
             * @param message HongbaoUpdated message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: message.BroadCastHongbaoUpdated.IHongbaoUpdated, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified HongbaoUpdated message, length delimited. Does not implicitly {@link message.BroadCastHongbaoUpdated.HongbaoUpdated.verify|verify} messages.
             * @param message HongbaoUpdated message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: message.BroadCastHongbaoUpdated.IHongbaoUpdated, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an HongbaoUpdated message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns HongbaoUpdated
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BroadCastHongbaoUpdated.HongbaoUpdated;

            /**
             * Decodes an HongbaoUpdated message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns HongbaoUpdated
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BroadCastHongbaoUpdated.HongbaoUpdated;

            /**
             * Verifies an HongbaoUpdated message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an HongbaoUpdated message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns HongbaoUpdated
             */
            public static fromObject(object: { [k: string]: any }): message.BroadCastHongbaoUpdated.HongbaoUpdated;

            /**
             * Creates a plain object from an HongbaoUpdated message. Also converts values to other types if specified.
             * @param message HongbaoUpdated
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: message.BroadCastHongbaoUpdated.HongbaoUpdated, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this HongbaoUpdated to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a BackGrabHongbao. */
    interface IBackGrabHongbao {

        /** BackGrabHongbao point */
        point?: (number|null);

        /** BackGrabHongbao msg */
        msg?: (string|null);
    }

    /** Represents a BackGrabHongbao. */
    class BackGrabHongbao implements IBackGrabHongbao {

        /**
         * Constructs a new BackGrabHongbao.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBackGrabHongbao);

        /** BackGrabHongbao point. */
        public point: number;

        /** BackGrabHongbao msg. */
        public msg: string;

        /**
         * Creates a new BackGrabHongbao instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BackGrabHongbao instance
         */
        public static create(properties?: message.IBackGrabHongbao): message.BackGrabHongbao;

        /**
         * Encodes the specified BackGrabHongbao message. Does not implicitly {@link message.BackGrabHongbao.verify|verify} messages.
         * @param message BackGrabHongbao message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBackGrabHongbao, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BackGrabHongbao message, length delimited. Does not implicitly {@link message.BackGrabHongbao.verify|verify} messages.
         * @param message BackGrabHongbao message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBackGrabHongbao, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BackGrabHongbao message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BackGrabHongbao
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BackGrabHongbao;

        /**
         * Decodes a BackGrabHongbao message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BackGrabHongbao
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BackGrabHongbao;

        /**
         * Verifies a BackGrabHongbao message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BackGrabHongbao message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BackGrabHongbao
         */
        public static fromObject(object: { [k: string]: any }): message.BackGrabHongbao;

        /**
         * Creates a plain object from a BackGrabHongbao message. Also converts values to other types if specified.
         * @param message BackGrabHongbao
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BackGrabHongbao, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BackGrabHongbao to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BackSendChatMessage. */
    interface IBackSendChatMessage {

        /** BackSendChatMessage msg */
        msg?: (string|null);
    }

    /** Represents a BackSendChatMessage. */
    class BackSendChatMessage implements IBackSendChatMessage {

        /**
         * Constructs a new BackSendChatMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBackSendChatMessage);

        /** BackSendChatMessage msg. */
        public msg: string;

        /**
         * Creates a new BackSendChatMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BackSendChatMessage instance
         */
        public static create(properties?: message.IBackSendChatMessage): message.BackSendChatMessage;

        /**
         * Encodes the specified BackSendChatMessage message. Does not implicitly {@link message.BackSendChatMessage.verify|verify} messages.
         * @param message BackSendChatMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBackSendChatMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BackSendChatMessage message, length delimited. Does not implicitly {@link message.BackSendChatMessage.verify|verify} messages.
         * @param message BackSendChatMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBackSendChatMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BackSendChatMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BackSendChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BackSendChatMessage;

        /**
         * Decodes a BackSendChatMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BackSendChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BackSendChatMessage;

        /**
         * Verifies a BackSendChatMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BackSendChatMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BackSendChatMessage
         */
        public static fromObject(object: { [k: string]: any }): message.BackSendChatMessage;

        /**
         * Creates a plain object from a BackSendChatMessage message. Also converts values to other types if specified.
         * @param message BackSendChatMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BackSendChatMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BackSendChatMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BroadCastChatMessage. */
    interface IBroadCastChatMessage {

        /** BroadCastChatMessage list */
        list?: (message.BroadCastChatMessage.IChat[]|null);
    }

    /** Represents a BroadCastChatMessage. */
    class BroadCastChatMessage implements IBroadCastChatMessage {

        /**
         * Constructs a new BroadCastChatMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBroadCastChatMessage);

        /** BroadCastChatMessage list. */
        public list: message.BroadCastChatMessage.IChat[];

        /**
         * Creates a new BroadCastChatMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BroadCastChatMessage instance
         */
        public static create(properties?: message.IBroadCastChatMessage): message.BroadCastChatMessage;

        /**
         * Encodes the specified BroadCastChatMessage message. Does not implicitly {@link message.BroadCastChatMessage.verify|verify} messages.
         * @param message BroadCastChatMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBroadCastChatMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BroadCastChatMessage message, length delimited. Does not implicitly {@link message.BroadCastChatMessage.verify|verify} messages.
         * @param message BroadCastChatMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBroadCastChatMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BroadCastChatMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BroadCastChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BroadCastChatMessage;

        /**
         * Decodes a BroadCastChatMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BroadCastChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BroadCastChatMessage;

        /**
         * Verifies a BroadCastChatMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BroadCastChatMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BroadCastChatMessage
         */
        public static fromObject(object: { [k: string]: any }): message.BroadCastChatMessage;

        /**
         * Creates a plain object from a BroadCastChatMessage message. Also converts values to other types if specified.
         * @param message BroadCastChatMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BroadCastChatMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BroadCastChatMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace BroadCastChatMessage {

        /** Properties of a Chat. */
        interface IChat {

            /** Chat uid */
            uid?: (string|null);

            /** Chat sender */
            sender?: (string|null);

            /** Chat senderAvatar */
            senderAvatar?: (string|null);

            /** Chat content */
            content?: (string|null);

            /** Chat action */
            action?: (string|null);
        }

        /** Represents a Chat. */
        class Chat implements IChat {

            /**
             * Constructs a new Chat.
             * @param [properties] Properties to set
             */
            constructor(properties?: message.BroadCastChatMessage.IChat);

            /** Chat uid. */
            public uid: string;

            /** Chat sender. */
            public sender: string;

            /** Chat senderAvatar. */
            public senderAvatar: string;

            /** Chat content. */
            public content: string;

            /** Chat action. */
            public action: string;

            /**
             * Creates a new Chat instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Chat instance
             */
            public static create(properties?: message.BroadCastChatMessage.IChat): message.BroadCastChatMessage.Chat;

            /**
             * Encodes the specified Chat message. Does not implicitly {@link message.BroadCastChatMessage.Chat.verify|verify} messages.
             * @param message Chat message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: message.BroadCastChatMessage.IChat, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Chat message, length delimited. Does not implicitly {@link message.BroadCastChatMessage.Chat.verify|verify} messages.
             * @param message Chat message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: message.BroadCastChatMessage.IChat, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Chat message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Chat
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BroadCastChatMessage.Chat;

            /**
             * Decodes a Chat message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Chat
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BroadCastChatMessage.Chat;

            /**
             * Verifies a Chat message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Chat message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Chat
             */
            public static fromObject(object: { [k: string]: any }): message.BroadCastChatMessage.Chat;

            /**
             * Creates a plain object from a Chat message. Also converts values to other types if specified.
             * @param message Chat
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: message.BroadCastChatMessage.Chat, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Chat to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a BackSendMerchantCoupon. */
    interface IBackSendMerchantCoupon {

        /** BackSendMerchantCoupon success */
        success?: (boolean|null);

        /** BackSendMerchantCoupon msg */
        msg?: (string|null);
    }

    /** Represents a BackSendMerchantCoupon. */
    class BackSendMerchantCoupon implements IBackSendMerchantCoupon {

        /**
         * Constructs a new BackSendMerchantCoupon.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBackSendMerchantCoupon);

        /** BackSendMerchantCoupon success. */
        public success: boolean;

        /** BackSendMerchantCoupon msg. */
        public msg: string;

        /**
         * Creates a new BackSendMerchantCoupon instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BackSendMerchantCoupon instance
         */
        public static create(properties?: message.IBackSendMerchantCoupon): message.BackSendMerchantCoupon;

        /**
         * Encodes the specified BackSendMerchantCoupon message. Does not implicitly {@link message.BackSendMerchantCoupon.verify|verify} messages.
         * @param message BackSendMerchantCoupon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBackSendMerchantCoupon, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BackSendMerchantCoupon message, length delimited. Does not implicitly {@link message.BackSendMerchantCoupon.verify|verify} messages.
         * @param message BackSendMerchantCoupon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBackSendMerchantCoupon, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BackSendMerchantCoupon message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BackSendMerchantCoupon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BackSendMerchantCoupon;

        /**
         * Decodes a BackSendMerchantCoupon message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BackSendMerchantCoupon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BackSendMerchantCoupon;

        /**
         * Verifies a BackSendMerchantCoupon message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BackSendMerchantCoupon message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BackSendMerchantCoupon
         */
        public static fromObject(object: { [k: string]: any }): message.BackSendMerchantCoupon;

        /**
         * Creates a plain object from a BackSendMerchantCoupon message. Also converts values to other types if specified.
         * @param message BackSendMerchantCoupon
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BackSendMerchantCoupon, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BackSendMerchantCoupon to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BroadCastMerchantCoupon. */
    interface IBroadCastMerchantCoupon {

        /** BroadCastMerchantCoupon list */
        list?: (message.BroadCastMerchantCoupon.ICoupon[]|null);
    }

    /** Represents a BroadCastMerchantCoupon. */
    class BroadCastMerchantCoupon implements IBroadCastMerchantCoupon {

        /**
         * Constructs a new BroadCastMerchantCoupon.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBroadCastMerchantCoupon);

        /** BroadCastMerchantCoupon list. */
        public list: message.BroadCastMerchantCoupon.ICoupon[];

        /**
         * Creates a new BroadCastMerchantCoupon instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BroadCastMerchantCoupon instance
         */
        public static create(properties?: message.IBroadCastMerchantCoupon): message.BroadCastMerchantCoupon;

        /**
         * Encodes the specified BroadCastMerchantCoupon message. Does not implicitly {@link message.BroadCastMerchantCoupon.verify|verify} messages.
         * @param message BroadCastMerchantCoupon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBroadCastMerchantCoupon, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BroadCastMerchantCoupon message, length delimited. Does not implicitly {@link message.BroadCastMerchantCoupon.verify|verify} messages.
         * @param message BroadCastMerchantCoupon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBroadCastMerchantCoupon, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BroadCastMerchantCoupon message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BroadCastMerchantCoupon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BroadCastMerchantCoupon;

        /**
         * Decodes a BroadCastMerchantCoupon message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BroadCastMerchantCoupon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BroadCastMerchantCoupon;

        /**
         * Verifies a BroadCastMerchantCoupon message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BroadCastMerchantCoupon message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BroadCastMerchantCoupon
         */
        public static fromObject(object: { [k: string]: any }): message.BroadCastMerchantCoupon;

        /**
         * Creates a plain object from a BroadCastMerchantCoupon message. Also converts values to other types if specified.
         * @param message BroadCastMerchantCoupon
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BroadCastMerchantCoupon, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BroadCastMerchantCoupon to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace BroadCastMerchantCoupon {

        /** Properties of a Coupon. */
        interface ICoupon {

            /** Coupon id */
            id?: (number|Long|null);

            /** Coupon disappear */
            disappear?: (boolean|null);

            /** Coupon startTime */
            startTime?: (number|Long|null);
        }

        /** Represents a Coupon. */
        class Coupon implements ICoupon {

            /**
             * Constructs a new Coupon.
             * @param [properties] Properties to set
             */
            constructor(properties?: message.BroadCastMerchantCoupon.ICoupon);

            /** Coupon id. */
            public id: (number|Long);

            /** Coupon disappear. */
            public disappear: boolean;

            /** Coupon startTime. */
            public startTime: (number|Long);

            /**
             * Creates a new Coupon instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Coupon instance
             */
            public static create(properties?: message.BroadCastMerchantCoupon.ICoupon): message.BroadCastMerchantCoupon.Coupon;

            /**
             * Encodes the specified Coupon message. Does not implicitly {@link message.BroadCastMerchantCoupon.Coupon.verify|verify} messages.
             * @param message Coupon message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: message.BroadCastMerchantCoupon.ICoupon, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Coupon message, length delimited. Does not implicitly {@link message.BroadCastMerchantCoupon.Coupon.verify|verify} messages.
             * @param message Coupon message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: message.BroadCastMerchantCoupon.ICoupon, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Coupon message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Coupon
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BroadCastMerchantCoupon.Coupon;

            /**
             * Decodes a Coupon message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Coupon
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BroadCastMerchantCoupon.Coupon;

            /**
             * Verifies a Coupon message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Coupon message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Coupon
             */
            public static fromObject(object: { [k: string]: any }): message.BroadCastMerchantCoupon.Coupon;

            /**
             * Creates a plain object from a Coupon message. Also converts values to other types if specified.
             * @param message Coupon
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: message.BroadCastMerchantCoupon.Coupon, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Coupon to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a BackGetMerchantCoupon. */
    interface IBackGetMerchantCoupon {

        /** BackGetMerchantCoupon success */
        success?: (boolean|null);

        /** BackGetMerchantCoupon msg */
        msg?: (string|null);

        /** BackGetMerchantCoupon disappear */
        disappear?: (boolean|null);

        /** BackGetMerchantCoupon coupon */
        coupon?: (message.BackGetMerchantCoupon.ICoupon|null);
    }

    /** Represents a BackGetMerchantCoupon. */
    class BackGetMerchantCoupon implements IBackGetMerchantCoupon {

        /**
         * Constructs a new BackGetMerchantCoupon.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBackGetMerchantCoupon);

        /** BackGetMerchantCoupon success. */
        public success: boolean;

        /** BackGetMerchantCoupon msg. */
        public msg: string;

        /** BackGetMerchantCoupon disappear. */
        public disappear: boolean;

        /** BackGetMerchantCoupon coupon. */
        public coupon?: (message.BackGetMerchantCoupon.ICoupon|null);

        /**
         * Creates a new BackGetMerchantCoupon instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BackGetMerchantCoupon instance
         */
        public static create(properties?: message.IBackGetMerchantCoupon): message.BackGetMerchantCoupon;

        /**
         * Encodes the specified BackGetMerchantCoupon message. Does not implicitly {@link message.BackGetMerchantCoupon.verify|verify} messages.
         * @param message BackGetMerchantCoupon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBackGetMerchantCoupon, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BackGetMerchantCoupon message, length delimited. Does not implicitly {@link message.BackGetMerchantCoupon.verify|verify} messages.
         * @param message BackGetMerchantCoupon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBackGetMerchantCoupon, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BackGetMerchantCoupon message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BackGetMerchantCoupon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BackGetMerchantCoupon;

        /**
         * Decodes a BackGetMerchantCoupon message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BackGetMerchantCoupon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BackGetMerchantCoupon;

        /**
         * Verifies a BackGetMerchantCoupon message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BackGetMerchantCoupon message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BackGetMerchantCoupon
         */
        public static fromObject(object: { [k: string]: any }): message.BackGetMerchantCoupon;

        /**
         * Creates a plain object from a BackGetMerchantCoupon message. Also converts values to other types if specified.
         * @param message BackGetMerchantCoupon
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BackGetMerchantCoupon, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BackGetMerchantCoupon to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace BackGetMerchantCoupon {

        /** Properties of a Coupon. */
        interface ICoupon {

            /** Coupon tp */
            tp?: (number|null);

            /** Coupon goodCode */
            goodCode?: (string|null);

            /** Coupon amount */
            amount?: (number|null);

            /** Coupon minUseAmount */
            minUseAmount?: (number|null);

            /** Coupon durExp */
            durExp?: (string|null);
        }

        /** Represents a Coupon. */
        class Coupon implements ICoupon {

            /**
             * Constructs a new Coupon.
             * @param [properties] Properties to set
             */
            constructor(properties?: message.BackGetMerchantCoupon.ICoupon);

            /** Coupon tp. */
            public tp: number;

            /** Coupon goodCode. */
            public goodCode: string;

            /** Coupon amount. */
            public amount: number;

            /** Coupon minUseAmount. */
            public minUseAmount: number;

            /** Coupon durExp. */
            public durExp: string;

            /**
             * Creates a new Coupon instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Coupon instance
             */
            public static create(properties?: message.BackGetMerchantCoupon.ICoupon): message.BackGetMerchantCoupon.Coupon;

            /**
             * Encodes the specified Coupon message. Does not implicitly {@link message.BackGetMerchantCoupon.Coupon.verify|verify} messages.
             * @param message Coupon message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: message.BackGetMerchantCoupon.ICoupon, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Coupon message, length delimited. Does not implicitly {@link message.BackGetMerchantCoupon.Coupon.verify|verify} messages.
             * @param message Coupon message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: message.BackGetMerchantCoupon.ICoupon, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Coupon message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Coupon
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BackGetMerchantCoupon.Coupon;

            /**
             * Decodes a Coupon message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Coupon
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BackGetMerchantCoupon.Coupon;

            /**
             * Verifies a Coupon message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Coupon message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Coupon
             */
            public static fromObject(object: { [k: string]: any }): message.BackGetMerchantCoupon.Coupon;

            /**
             * Creates a plain object from a Coupon message. Also converts values to other types if specified.
             * @param message Coupon
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: message.BackGetMerchantCoupon.Coupon, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Coupon to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a BroadCastLianmaiAllowed. */
    interface IBroadCastLianmaiAllowed {

        /** BroadCastLianmaiAllowed allowed */
        allowed?: (boolean|null);
    }

    /** Represents a BroadCastLianmaiAllowed. */
    class BroadCastLianmaiAllowed implements IBroadCastLianmaiAllowed {

        /**
         * Constructs a new BroadCastLianmaiAllowed.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBroadCastLianmaiAllowed);

        /** BroadCastLianmaiAllowed allowed. */
        public allowed: boolean;

        /**
         * Creates a new BroadCastLianmaiAllowed instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BroadCastLianmaiAllowed instance
         */
        public static create(properties?: message.IBroadCastLianmaiAllowed): message.BroadCastLianmaiAllowed;

        /**
         * Encodes the specified BroadCastLianmaiAllowed message. Does not implicitly {@link message.BroadCastLianmaiAllowed.verify|verify} messages.
         * @param message BroadCastLianmaiAllowed message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBroadCastLianmaiAllowed, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BroadCastLianmaiAllowed message, length delimited. Does not implicitly {@link message.BroadCastLianmaiAllowed.verify|verify} messages.
         * @param message BroadCastLianmaiAllowed message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBroadCastLianmaiAllowed, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BroadCastLianmaiAllowed message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BroadCastLianmaiAllowed
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BroadCastLianmaiAllowed;

        /**
         * Decodes a BroadCastLianmaiAllowed message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BroadCastLianmaiAllowed
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BroadCastLianmaiAllowed;

        /**
         * Verifies a BroadCastLianmaiAllowed message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BroadCastLianmaiAllowed message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BroadCastLianmaiAllowed
         */
        public static fromObject(object: { [k: string]: any }): message.BroadCastLianmaiAllowed;

        /**
         * Creates a plain object from a BroadCastLianmaiAllowed message. Also converts values to other types if specified.
         * @param message BroadCastLianmaiAllowed
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BroadCastLianmaiAllowed, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BroadCastLianmaiAllowed to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SendLianmaiApply. */
    interface ISendLianmaiApply {

        /** SendLianmaiApply uid */
        uid?: (string|null);

        /** SendLianmaiApply sender */
        sender?: (string|null);

        /** SendLianmaiApply senderAvatar */
        senderAvatar?: (string|null);
    }

    /** Represents a SendLianmaiApply. */
    class SendLianmaiApply implements ISendLianmaiApply {

        /**
         * Constructs a new SendLianmaiApply.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.ISendLianmaiApply);

        /** SendLianmaiApply uid. */
        public uid: string;

        /** SendLianmaiApply sender. */
        public sender: string;

        /** SendLianmaiApply senderAvatar. */
        public senderAvatar: string;

        /**
         * Creates a new SendLianmaiApply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SendLianmaiApply instance
         */
        public static create(properties?: message.ISendLianmaiApply): message.SendLianmaiApply;

        /**
         * Encodes the specified SendLianmaiApply message. Does not implicitly {@link message.SendLianmaiApply.verify|verify} messages.
         * @param message SendLianmaiApply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.ISendLianmaiApply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SendLianmaiApply message, length delimited. Does not implicitly {@link message.SendLianmaiApply.verify|verify} messages.
         * @param message SendLianmaiApply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.ISendLianmaiApply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SendLianmaiApply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SendLianmaiApply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.SendLianmaiApply;

        /**
         * Decodes a SendLianmaiApply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SendLianmaiApply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.SendLianmaiApply;

        /**
         * Verifies a SendLianmaiApply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SendLianmaiApply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SendLianmaiApply
         */
        public static fromObject(object: { [k: string]: any }): message.SendLianmaiApply;

        /**
         * Creates a plain object from a SendLianmaiApply message. Also converts values to other types if specified.
         * @param message SendLianmaiApply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.SendLianmaiApply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SendLianmaiApply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BackApplyLianmai. */
    interface IBackApplyLianmai {

        /** BackApplyLianmai success */
        success?: (boolean|null);

        /** BackApplyLianmai msg */
        msg?: (string|null);
    }

    /** Represents a BackApplyLianmai. */
    class BackApplyLianmai implements IBackApplyLianmai {

        /**
         * Constructs a new BackApplyLianmai.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBackApplyLianmai);

        /** BackApplyLianmai success. */
        public success: boolean;

        /** BackApplyLianmai msg. */
        public msg: string;

        /**
         * Creates a new BackApplyLianmai instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BackApplyLianmai instance
         */
        public static create(properties?: message.IBackApplyLianmai): message.BackApplyLianmai;

        /**
         * Encodes the specified BackApplyLianmai message. Does not implicitly {@link message.BackApplyLianmai.verify|verify} messages.
         * @param message BackApplyLianmai message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBackApplyLianmai, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BackApplyLianmai message, length delimited. Does not implicitly {@link message.BackApplyLianmai.verify|verify} messages.
         * @param message BackApplyLianmai message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBackApplyLianmai, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BackApplyLianmai message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BackApplyLianmai
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BackApplyLianmai;

        /**
         * Decodes a BackApplyLianmai message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BackApplyLianmai
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BackApplyLianmai;

        /**
         * Verifies a BackApplyLianmai message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BackApplyLianmai message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BackApplyLianmai
         */
        public static fromObject(object: { [k: string]: any }): message.BackApplyLianmai;

        /**
         * Creates a plain object from a BackApplyLianmai message. Also converts values to other types if specified.
         * @param message BackApplyLianmai
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BackApplyLianmai, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BackApplyLianmai to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BroadCastLianmaiOn. */
    interface IBroadCastLianmaiOn {

        /** BroadCastLianmaiOn uid */
        uid?: (string|null);

        /** BroadCastLianmaiOn name */
        name?: (string|null);

        /** BroadCastLianmaiOn avatar */
        avatar?: (string|null);

        /** BroadCastLianmaiOn streamId */
        streamId?: (string|null);
    }

    /** Represents a BroadCastLianmaiOn. */
    class BroadCastLianmaiOn implements IBroadCastLianmaiOn {

        /**
         * Constructs a new BroadCastLianmaiOn.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBroadCastLianmaiOn);

        /** BroadCastLianmaiOn uid. */
        public uid: string;

        /** BroadCastLianmaiOn name. */
        public name: string;

        /** BroadCastLianmaiOn avatar. */
        public avatar: string;

        /** BroadCastLianmaiOn streamId. */
        public streamId: string;

        /**
         * Creates a new BroadCastLianmaiOn instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BroadCastLianmaiOn instance
         */
        public static create(properties?: message.IBroadCastLianmaiOn): message.BroadCastLianmaiOn;

        /**
         * Encodes the specified BroadCastLianmaiOn message. Does not implicitly {@link message.BroadCastLianmaiOn.verify|verify} messages.
         * @param message BroadCastLianmaiOn message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBroadCastLianmaiOn, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BroadCastLianmaiOn message, length delimited. Does not implicitly {@link message.BroadCastLianmaiOn.verify|verify} messages.
         * @param message BroadCastLianmaiOn message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBroadCastLianmaiOn, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BroadCastLianmaiOn message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BroadCastLianmaiOn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BroadCastLianmaiOn;

        /**
         * Decodes a BroadCastLianmaiOn message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BroadCastLianmaiOn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BroadCastLianmaiOn;

        /**
         * Verifies a BroadCastLianmaiOn message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BroadCastLianmaiOn message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BroadCastLianmaiOn
         */
        public static fromObject(object: { [k: string]: any }): message.BroadCastLianmaiOn;

        /**
         * Creates a plain object from a BroadCastLianmaiOn message. Also converts values to other types if specified.
         * @param message BroadCastLianmaiOn
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BroadCastLianmaiOn, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BroadCastLianmaiOn to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BroadCastLianmaiOff. */
    interface IBroadCastLianmaiOff {
    }

    /** Represents a BroadCastLianmaiOff. */
    class BroadCastLianmaiOff implements IBroadCastLianmaiOff {

        /**
         * Constructs a new BroadCastLianmaiOff.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBroadCastLianmaiOff);

        /**
         * Creates a new BroadCastLianmaiOff instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BroadCastLianmaiOff instance
         */
        public static create(properties?: message.IBroadCastLianmaiOff): message.BroadCastLianmaiOff;

        /**
         * Encodes the specified BroadCastLianmaiOff message. Does not implicitly {@link message.BroadCastLianmaiOff.verify|verify} messages.
         * @param message BroadCastLianmaiOff message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBroadCastLianmaiOff, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BroadCastLianmaiOff message, length delimited. Does not implicitly {@link message.BroadCastLianmaiOff.verify|verify} messages.
         * @param message BroadCastLianmaiOff message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBroadCastLianmaiOff, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BroadCastLianmaiOff message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BroadCastLianmaiOff
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BroadCastLianmaiOff;

        /**
         * Decodes a BroadCastLianmaiOff message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BroadCastLianmaiOff
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BroadCastLianmaiOff;

        /**
         * Verifies a BroadCastLianmaiOff message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BroadCastLianmaiOff message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BroadCastLianmaiOff
         */
        public static fromObject(object: { [k: string]: any }): message.BroadCastLianmaiOff;

        /**
         * Creates a plain object from a BroadCastLianmaiOff message. Also converts values to other types if specified.
         * @param message BroadCastLianmaiOff
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BroadCastLianmaiOff, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BroadCastLianmaiOff to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BackActorLianmaiData. */
    interface IBackActorLianmaiData {

        /** BackActorLianmaiData allowed */
        allowed?: (boolean|null);

        /** BackActorLianmaiData list */
        list?: (message.BackActorLianmaiData.ILianmai[]|null);
    }

    /** Represents a BackActorLianmaiData. */
    class BackActorLianmaiData implements IBackActorLianmaiData {

        /**
         * Constructs a new BackActorLianmaiData.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBackActorLianmaiData);

        /** BackActorLianmaiData allowed. */
        public allowed: boolean;

        /** BackActorLianmaiData list. */
        public list: message.BackActorLianmaiData.ILianmai[];

        /**
         * Creates a new BackActorLianmaiData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BackActorLianmaiData instance
         */
        public static create(properties?: message.IBackActorLianmaiData): message.BackActorLianmaiData;

        /**
         * Encodes the specified BackActorLianmaiData message. Does not implicitly {@link message.BackActorLianmaiData.verify|verify} messages.
         * @param message BackActorLianmaiData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBackActorLianmaiData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BackActorLianmaiData message, length delimited. Does not implicitly {@link message.BackActorLianmaiData.verify|verify} messages.
         * @param message BackActorLianmaiData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBackActorLianmaiData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BackActorLianmaiData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BackActorLianmaiData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BackActorLianmaiData;

        /**
         * Decodes a BackActorLianmaiData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BackActorLianmaiData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BackActorLianmaiData;

        /**
         * Verifies a BackActorLianmaiData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BackActorLianmaiData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BackActorLianmaiData
         */
        public static fromObject(object: { [k: string]: any }): message.BackActorLianmaiData;

        /**
         * Creates a plain object from a BackActorLianmaiData message. Also converts values to other types if specified.
         * @param message BackActorLianmaiData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BackActorLianmaiData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BackActorLianmaiData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace BackActorLianmaiData {

        /** Properties of a Lianmai. */
        interface ILianmai {

            /** Lianmai tp */
            tp?: (number|null);

            /** Lianmai uid */
            uid?: (string|null);

            /** Lianmai name */
            name?: (string|null);

            /** Lianmai avatar */
            avatar?: (string|null);

            /** Lianmai sec */
            sec?: (number|null);
        }

        /** Represents a Lianmai. */
        class Lianmai implements ILianmai {

            /**
             * Constructs a new Lianmai.
             * @param [properties] Properties to set
             */
            constructor(properties?: message.BackActorLianmaiData.ILianmai);

            /** Lianmai tp. */
            public tp: number;

            /** Lianmai uid. */
            public uid: string;

            /** Lianmai name. */
            public name: string;

            /** Lianmai avatar. */
            public avatar: string;

            /** Lianmai sec. */
            public sec: number;

            /**
             * Creates a new Lianmai instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Lianmai instance
             */
            public static create(properties?: message.BackActorLianmaiData.ILianmai): message.BackActorLianmaiData.Lianmai;

            /**
             * Encodes the specified Lianmai message. Does not implicitly {@link message.BackActorLianmaiData.Lianmai.verify|verify} messages.
             * @param message Lianmai message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: message.BackActorLianmaiData.ILianmai, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Lianmai message, length delimited. Does not implicitly {@link message.BackActorLianmaiData.Lianmai.verify|verify} messages.
             * @param message Lianmai message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: message.BackActorLianmaiData.ILianmai, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Lianmai message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Lianmai
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BackActorLianmaiData.Lianmai;

            /**
             * Decodes a Lianmai message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Lianmai
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BackActorLianmaiData.Lianmai;

            /**
             * Verifies a Lianmai message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Lianmai message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Lianmai
             */
            public static fromObject(object: { [k: string]: any }): message.BackActorLianmaiData.Lianmai;

            /**
             * Creates a plain object from a Lianmai message. Also converts values to other types if specified.
             * @param message Lianmai
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: message.BackActorLianmaiData.Lianmai, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Lianmai to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a BackActorAgreeLianmaiApply. */
    interface IBackActorAgreeLianmaiApply {

        /** BackActorAgreeLianmaiApply success */
        success?: (boolean|null);

        /** BackActorAgreeLianmaiApply msg */
        msg?: (string|null);
    }

    /** Represents a BackActorAgreeLianmaiApply. */
    class BackActorAgreeLianmaiApply implements IBackActorAgreeLianmaiApply {

        /**
         * Constructs a new BackActorAgreeLianmaiApply.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBackActorAgreeLianmaiApply);

        /** BackActorAgreeLianmaiApply success. */
        public success: boolean;

        /** BackActorAgreeLianmaiApply msg. */
        public msg: string;

        /**
         * Creates a new BackActorAgreeLianmaiApply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BackActorAgreeLianmaiApply instance
         */
        public static create(properties?: message.IBackActorAgreeLianmaiApply): message.BackActorAgreeLianmaiApply;

        /**
         * Encodes the specified BackActorAgreeLianmaiApply message. Does not implicitly {@link message.BackActorAgreeLianmaiApply.verify|verify} messages.
         * @param message BackActorAgreeLianmaiApply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBackActorAgreeLianmaiApply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BackActorAgreeLianmaiApply message, length delimited. Does not implicitly {@link message.BackActorAgreeLianmaiApply.verify|verify} messages.
         * @param message BackActorAgreeLianmaiApply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBackActorAgreeLianmaiApply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BackActorAgreeLianmaiApply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BackActorAgreeLianmaiApply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BackActorAgreeLianmaiApply;

        /**
         * Decodes a BackActorAgreeLianmaiApply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BackActorAgreeLianmaiApply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BackActorAgreeLianmaiApply;

        /**
         * Verifies a BackActorAgreeLianmaiApply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BackActorAgreeLianmaiApply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BackActorAgreeLianmaiApply
         */
        public static fromObject(object: { [k: string]: any }): message.BackActorAgreeLianmaiApply;

        /**
         * Creates a plain object from a BackActorAgreeLianmaiApply message. Also converts values to other types if specified.
         * @param message BackActorAgreeLianmaiApply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BackActorAgreeLianmaiApply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BackActorAgreeLianmaiApply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BackTerminateLianmai. */
    interface IBackTerminateLianmai {

        /** BackTerminateLianmai success */
        success?: (boolean|null);

        /** BackTerminateLianmai msg */
        msg?: (string|null);
    }

    /** Represents a BackTerminateLianmai. */
    class BackTerminateLianmai implements IBackTerminateLianmai {

        /**
         * Constructs a new BackTerminateLianmai.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBackTerminateLianmai);

        /** BackTerminateLianmai success. */
        public success: boolean;

        /** BackTerminateLianmai msg. */
        public msg: string;

        /**
         * Creates a new BackTerminateLianmai instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BackTerminateLianmai instance
         */
        public static create(properties?: message.IBackTerminateLianmai): message.BackTerminateLianmai;

        /**
         * Encodes the specified BackTerminateLianmai message. Does not implicitly {@link message.BackTerminateLianmai.verify|verify} messages.
         * @param message BackTerminateLianmai message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBackTerminateLianmai, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BackTerminateLianmai message, length delimited. Does not implicitly {@link message.BackTerminateLianmai.verify|verify} messages.
         * @param message BackTerminateLianmai message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBackTerminateLianmai, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BackTerminateLianmai message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BackTerminateLianmai
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BackTerminateLianmai;

        /**
         * Decodes a BackTerminateLianmai message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BackTerminateLianmai
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BackTerminateLianmai;

        /**
         * Verifies a BackTerminateLianmai message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BackTerminateLianmai message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BackTerminateLianmai
         */
        public static fromObject(object: { [k: string]: any }): message.BackTerminateLianmai;

        /**
         * Creates a plain object from a BackTerminateLianmai message. Also converts values to other types if specified.
         * @param message BackTerminateLianmai
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BackTerminateLianmai, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BackTerminateLianmai to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BackGmChatBid. */
    interface IBackGmChatBid {

        /** BackGmChatBid success */
        success?: (boolean|null);

        /** BackGmChatBid msg */
        msg?: (string|null);
    }

    /** Represents a BackGmChatBid. */
    class BackGmChatBid implements IBackGmChatBid {

        /**
         * Constructs a new BackGmChatBid.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBackGmChatBid);

        /** BackGmChatBid success. */
        public success: boolean;

        /** BackGmChatBid msg. */
        public msg: string;

        /**
         * Creates a new BackGmChatBid instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BackGmChatBid instance
         */
        public static create(properties?: message.IBackGmChatBid): message.BackGmChatBid;

        /**
         * Encodes the specified BackGmChatBid message. Does not implicitly {@link message.BackGmChatBid.verify|verify} messages.
         * @param message BackGmChatBid message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBackGmChatBid, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BackGmChatBid message, length delimited. Does not implicitly {@link message.BackGmChatBid.verify|verify} messages.
         * @param message BackGmChatBid message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBackGmChatBid, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BackGmChatBid message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BackGmChatBid
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BackGmChatBid;

        /**
         * Decodes a BackGmChatBid message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BackGmChatBid
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BackGmChatBid;

        /**
         * Verifies a BackGmChatBid message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BackGmChatBid message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BackGmChatBid
         */
        public static fromObject(object: { [k: string]: any }): message.BackGmChatBid;

        /**
         * Creates a plain object from a BackGmChatBid message. Also converts values to other types if specified.
         * @param message BackGmChatBid
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BackGmChatBid, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BackGmChatBid to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BackGmKickOutRoom. */
    interface IBackGmKickOutRoom {

        /** BackGmKickOutRoom success */
        success?: (boolean|null);

        /** BackGmKickOutRoom msg */
        msg?: (string|null);
    }

    /** Represents a BackGmKickOutRoom. */
    class BackGmKickOutRoom implements IBackGmKickOutRoom {

        /**
         * Constructs a new BackGmKickOutRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBackGmKickOutRoom);

        /** BackGmKickOutRoom success. */
        public success: boolean;

        /** BackGmKickOutRoom msg. */
        public msg: string;

        /**
         * Creates a new BackGmKickOutRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BackGmKickOutRoom instance
         */
        public static create(properties?: message.IBackGmKickOutRoom): message.BackGmKickOutRoom;

        /**
         * Encodes the specified BackGmKickOutRoom message. Does not implicitly {@link message.BackGmKickOutRoom.verify|verify} messages.
         * @param message BackGmKickOutRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBackGmKickOutRoom, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BackGmKickOutRoom message, length delimited. Does not implicitly {@link message.BackGmKickOutRoom.verify|verify} messages.
         * @param message BackGmKickOutRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBackGmKickOutRoom, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BackGmKickOutRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BackGmKickOutRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BackGmKickOutRoom;

        /**
         * Decodes a BackGmKickOutRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BackGmKickOutRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BackGmKickOutRoom;

        /**
         * Verifies a BackGmKickOutRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BackGmKickOutRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BackGmKickOutRoom
         */
        public static fromObject(object: { [k: string]: any }): message.BackGmKickOutRoom;

        /**
         * Creates a plain object from a BackGmKickOutRoom message. Also converts values to other types if specified.
         * @param message BackGmKickOutRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BackGmKickOutRoom, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BackGmKickOutRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
