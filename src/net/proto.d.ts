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

    /** Properties of a BackLike. */
    interface IBackLike {

        /** BackLike code */
        code?: (message.BackLike.RetCode|null);

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

        /** BackLike code. */
        public code: message.BackLike.RetCode;

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

    namespace BackLike {

        /** RetCode enum. */
        enum RetCode {
            RC_OK = 0,
            RC_LOGIN_CLOSED = 2,
            RC_TOO_FAST = 3
        }
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

    /** Properties of a BroadBilibili. */
    interface IBroadBilibili {

        /** BroadBilibili list */
        list?: (message.BroadBilibili.IBilibili[]|null);
    }

    /** Represents a BroadBilibili. */
    class BroadBilibili implements IBroadBilibili {

        /**
         * Constructs a new BroadBilibili.
         * @param [properties] Properties to set
         */
        constructor(properties?: message.IBroadBilibili);

        /** BroadBilibili list. */
        public list: message.BroadBilibili.IBilibili[];

        /**
         * Creates a new BroadBilibili instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BroadBilibili instance
         */
        public static create(properties?: message.IBroadBilibili): message.BroadBilibili;

        /**
         * Encodes the specified BroadBilibili message. Does not implicitly {@link message.BroadBilibili.verify|verify} messages.
         * @param message BroadBilibili message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: message.IBroadBilibili, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BroadBilibili message, length delimited. Does not implicitly {@link message.BroadBilibili.verify|verify} messages.
         * @param message BroadBilibili message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: message.IBroadBilibili, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BroadBilibili message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BroadBilibili
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BroadBilibili;

        /**
         * Decodes a BroadBilibili message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BroadBilibili
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BroadBilibili;

        /**
         * Verifies a BroadBilibili message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BroadBilibili message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BroadBilibili
         */
        public static fromObject(object: { [k: string]: any }): message.BroadBilibili;

        /**
         * Creates a plain object from a BroadBilibili message. Also converts values to other types if specified.
         * @param message BroadBilibili
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: message.BroadBilibili, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BroadBilibili to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace BroadBilibili {

        /** Properties of a Bilibili. */
        interface IBilibili {

            /** Bilibili sender */
            sender?: (string|null);

            /** Bilibili name */
            name?: (string|null);

            /** Bilibili num */
            num?: (number|null);
        }

        /** Represents a Bilibili. */
        class Bilibili implements IBilibili {

            /**
             * Constructs a new Bilibili.
             * @param [properties] Properties to set
             */
            constructor(properties?: message.BroadBilibili.IBilibili);

            /** Bilibili sender. */
            public sender: string;

            /** Bilibili name. */
            public name: string;

            /** Bilibili num. */
            public num: number;

            /**
             * Creates a new Bilibili instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Bilibili instance
             */
            public static create(properties?: message.BroadBilibili.IBilibili): message.BroadBilibili.Bilibili;

            /**
             * Encodes the specified Bilibili message. Does not implicitly {@link message.BroadBilibili.Bilibili.verify|verify} messages.
             * @param message Bilibili message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: message.BroadBilibili.IBilibili, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Bilibili message, length delimited. Does not implicitly {@link message.BroadBilibili.Bilibili.verify|verify} messages.
             * @param message Bilibili message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: message.BroadBilibili.IBilibili, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Bilibili message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Bilibili
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): message.BroadBilibili.Bilibili;

            /**
             * Decodes a Bilibili message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Bilibili
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): message.BroadBilibili.Bilibili;

            /**
             * Verifies a Bilibili message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Bilibili message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Bilibili
             */
            public static fromObject(object: { [k: string]: any }): message.BroadBilibili.Bilibili;

            /**
             * Creates a plain object from a Bilibili message. Also converts values to other types if specified.
             * @param message Bilibili
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: message.BroadBilibili.Bilibili, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Bilibili to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
