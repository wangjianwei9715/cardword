/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.message = (function() {

    /**
     * Namespace message.
     * @exports message
     * @namespace
     */
    var message = {};

    message.RequestChatOn = (function() {

        /**
         * Properties of a RequestChatOn.
         * @memberof message
         * @interface IRequestChatOn
         */

        /**
         * Constructs a new RequestChatOn.
         * @memberof message
         * @classdesc Represents a RequestChatOn.
         * @implements IRequestChatOn
         * @constructor
         * @param {message.IRequestChatOn=} [properties] Properties to set
         */
        function RequestChatOn(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new RequestChatOn instance using the specified properties.
         * @function create
         * @memberof message.RequestChatOn
         * @static
         * @param {message.IRequestChatOn=} [properties] Properties to set
         * @returns {message.RequestChatOn} RequestChatOn instance
         */
        RequestChatOn.create = function create(properties) {
            return new RequestChatOn(properties);
        };

        /**
         * Encodes the specified RequestChatOn message. Does not implicitly {@link message.RequestChatOn.verify|verify} messages.
         * @function encode
         * @memberof message.RequestChatOn
         * @static
         * @param {message.IRequestChatOn} message RequestChatOn message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RequestChatOn.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified RequestChatOn message, length delimited. Does not implicitly {@link message.RequestChatOn.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.RequestChatOn
         * @static
         * @param {message.IRequestChatOn} message RequestChatOn message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RequestChatOn.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RequestChatOn message from the specified reader or buffer.
         * @function decode
         * @memberof message.RequestChatOn
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.RequestChatOn} RequestChatOn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RequestChatOn.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.RequestChatOn();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RequestChatOn message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.RequestChatOn
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.RequestChatOn} RequestChatOn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RequestChatOn.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RequestChatOn message.
         * @function verify
         * @memberof message.RequestChatOn
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RequestChatOn.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a RequestChatOn message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.RequestChatOn
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.RequestChatOn} RequestChatOn
         */
        RequestChatOn.fromObject = function fromObject(object) {
            if (object instanceof $root.message.RequestChatOn)
                return object;
            return new $root.message.RequestChatOn();
        };

        /**
         * Creates a plain object from a RequestChatOn message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.RequestChatOn
         * @static
         * @param {message.RequestChatOn} message RequestChatOn
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RequestChatOn.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this RequestChatOn to JSON.
         * @function toJSON
         * @memberof message.RequestChatOn
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RequestChatOn.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RequestChatOn;
    })();

    message.RequestChatOff = (function() {

        /**
         * Properties of a RequestChatOff.
         * @memberof message
         * @interface IRequestChatOff
         */

        /**
         * Constructs a new RequestChatOff.
         * @memberof message
         * @classdesc Represents a RequestChatOff.
         * @implements IRequestChatOff
         * @constructor
         * @param {message.IRequestChatOff=} [properties] Properties to set
         */
        function RequestChatOff(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new RequestChatOff instance using the specified properties.
         * @function create
         * @memberof message.RequestChatOff
         * @static
         * @param {message.IRequestChatOff=} [properties] Properties to set
         * @returns {message.RequestChatOff} RequestChatOff instance
         */
        RequestChatOff.create = function create(properties) {
            return new RequestChatOff(properties);
        };

        /**
         * Encodes the specified RequestChatOff message. Does not implicitly {@link message.RequestChatOff.verify|verify} messages.
         * @function encode
         * @memberof message.RequestChatOff
         * @static
         * @param {message.IRequestChatOff} message RequestChatOff message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RequestChatOff.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified RequestChatOff message, length delimited. Does not implicitly {@link message.RequestChatOff.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.RequestChatOff
         * @static
         * @param {message.IRequestChatOff} message RequestChatOff message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RequestChatOff.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RequestChatOff message from the specified reader or buffer.
         * @function decode
         * @memberof message.RequestChatOff
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.RequestChatOff} RequestChatOff
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RequestChatOff.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.RequestChatOff();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RequestChatOff message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.RequestChatOff
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.RequestChatOff} RequestChatOff
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RequestChatOff.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RequestChatOff message.
         * @function verify
         * @memberof message.RequestChatOff
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RequestChatOff.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a RequestChatOff message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.RequestChatOff
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.RequestChatOff} RequestChatOff
         */
        RequestChatOff.fromObject = function fromObject(object) {
            if (object instanceof $root.message.RequestChatOff)
                return object;
            return new $root.message.RequestChatOff();
        };

        /**
         * Creates a plain object from a RequestChatOff message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.RequestChatOff
         * @static
         * @param {message.RequestChatOff} message RequestChatOff
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RequestChatOff.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this RequestChatOff to JSON.
         * @function toJSON
         * @memberof message.RequestChatOff
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RequestChatOff.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RequestChatOff;
    })();

    message.SendChatMessage = (function() {

        /**
         * Properties of a SendChatMessage.
         * @memberof message
         * @interface ISendChatMessage
         * @property {number|Long|null} [bucketId] SendChatMessage bucketId
         * @property {string|null} [picUrl] SendChatMessage picUrl
         * @property {string|null} [content] SendChatMessage content
         */

        /**
         * Constructs a new SendChatMessage.
         * @memberof message
         * @classdesc Represents a SendChatMessage.
         * @implements ISendChatMessage
         * @constructor
         * @param {message.ISendChatMessage=} [properties] Properties to set
         */
        function SendChatMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SendChatMessage bucketId.
         * @member {number|Long} bucketId
         * @memberof message.SendChatMessage
         * @instance
         */
        SendChatMessage.prototype.bucketId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SendChatMessage picUrl.
         * @member {string} picUrl
         * @memberof message.SendChatMessage
         * @instance
         */
        SendChatMessage.prototype.picUrl = "";

        /**
         * SendChatMessage content.
         * @member {string} content
         * @memberof message.SendChatMessage
         * @instance
         */
        SendChatMessage.prototype.content = "";

        /**
         * Creates a new SendChatMessage instance using the specified properties.
         * @function create
         * @memberof message.SendChatMessage
         * @static
         * @param {message.ISendChatMessage=} [properties] Properties to set
         * @returns {message.SendChatMessage} SendChatMessage instance
         */
        SendChatMessage.create = function create(properties) {
            return new SendChatMessage(properties);
        };

        /**
         * Encodes the specified SendChatMessage message. Does not implicitly {@link message.SendChatMessage.verify|verify} messages.
         * @function encode
         * @memberof message.SendChatMessage
         * @static
         * @param {message.ISendChatMessage} message SendChatMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SendChatMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.bucketId != null && Object.hasOwnProperty.call(message, "bucketId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.bucketId);
            if (message.picUrl != null && Object.hasOwnProperty.call(message, "picUrl"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.picUrl);
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.content);
            return writer;
        };

        /**
         * Encodes the specified SendChatMessage message, length delimited. Does not implicitly {@link message.SendChatMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.SendChatMessage
         * @static
         * @param {message.ISendChatMessage} message SendChatMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SendChatMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SendChatMessage message from the specified reader or buffer.
         * @function decode
         * @memberof message.SendChatMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.SendChatMessage} SendChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SendChatMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.SendChatMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.bucketId = reader.int64();
                    break;
                case 2:
                    message.picUrl = reader.string();
                    break;
                case 3:
                    message.content = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SendChatMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.SendChatMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.SendChatMessage} SendChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SendChatMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SendChatMessage message.
         * @function verify
         * @memberof message.SendChatMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SendChatMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.bucketId != null && message.hasOwnProperty("bucketId"))
                if (!$util.isInteger(message.bucketId) && !(message.bucketId && $util.isInteger(message.bucketId.low) && $util.isInteger(message.bucketId.high)))
                    return "bucketId: integer|Long expected";
            if (message.picUrl != null && message.hasOwnProperty("picUrl"))
                if (!$util.isString(message.picUrl))
                    return "picUrl: string expected";
            if (message.content != null && message.hasOwnProperty("content"))
                if (!$util.isString(message.content))
                    return "content: string expected";
            return null;
        };

        /**
         * Creates a SendChatMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.SendChatMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.SendChatMessage} SendChatMessage
         */
        SendChatMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.message.SendChatMessage)
                return object;
            var message = new $root.message.SendChatMessage();
            if (object.bucketId != null)
                if ($util.Long)
                    (message.bucketId = $util.Long.fromValue(object.bucketId)).unsigned = false;
                else if (typeof object.bucketId === "string")
                    message.bucketId = parseInt(object.bucketId, 10);
                else if (typeof object.bucketId === "number")
                    message.bucketId = object.bucketId;
                else if (typeof object.bucketId === "object")
                    message.bucketId = new $util.LongBits(object.bucketId.low >>> 0, object.bucketId.high >>> 0).toNumber();
            if (object.picUrl != null)
                message.picUrl = String(object.picUrl);
            if (object.content != null)
                message.content = String(object.content);
            return message;
        };

        /**
         * Creates a plain object from a SendChatMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.SendChatMessage
         * @static
         * @param {message.SendChatMessage} message SendChatMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SendChatMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.bucketId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.bucketId = options.longs === String ? "0" : 0;
                object.picUrl = "";
                object.content = "";
            }
            if (message.bucketId != null && message.hasOwnProperty("bucketId"))
                if (typeof message.bucketId === "number")
                    object.bucketId = options.longs === String ? String(message.bucketId) : message.bucketId;
                else
                    object.bucketId = options.longs === String ? $util.Long.prototype.toString.call(message.bucketId) : options.longs === Number ? new $util.LongBits(message.bucketId.low >>> 0, message.bucketId.high >>> 0).toNumber() : message.bucketId;
            if (message.picUrl != null && message.hasOwnProperty("picUrl"))
                object.picUrl = message.picUrl;
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = message.content;
            return object;
        };

        /**
         * Converts this SendChatMessage to JSON.
         * @function toJSON
         * @memberof message.SendChatMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SendChatMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SendChatMessage;
    })();

    message.ChatMessage = (function() {

        /**
         * Properties of a ChatMessage.
         * @memberof message
         * @interface IChatMessage
         * @property {number|Long|null} [msgId] ChatMessage msgId
         * @property {boolean|null} [isMy] ChatMessage isMy
         * @property {boolean|null} [read] ChatMessage read
         * @property {number|Long|null} [sendTime] ChatMessage sendTime
         * @property {string|null} [picUrl] ChatMessage picUrl
         * @property {string|null} [content] ChatMessage content
         */

        /**
         * Constructs a new ChatMessage.
         * @memberof message
         * @classdesc Represents a ChatMessage.
         * @implements IChatMessage
         * @constructor
         * @param {message.IChatMessage=} [properties] Properties to set
         */
        function ChatMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ChatMessage msgId.
         * @member {number|Long} msgId
         * @memberof message.ChatMessage
         * @instance
         */
        ChatMessage.prototype.msgId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ChatMessage isMy.
         * @member {boolean} isMy
         * @memberof message.ChatMessage
         * @instance
         */
        ChatMessage.prototype.isMy = false;

        /**
         * ChatMessage read.
         * @member {boolean} read
         * @memberof message.ChatMessage
         * @instance
         */
        ChatMessage.prototype.read = false;

        /**
         * ChatMessage sendTime.
         * @member {number|Long} sendTime
         * @memberof message.ChatMessage
         * @instance
         */
        ChatMessage.prototype.sendTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ChatMessage picUrl.
         * @member {string} picUrl
         * @memberof message.ChatMessage
         * @instance
         */
        ChatMessage.prototype.picUrl = "";

        /**
         * ChatMessage content.
         * @member {string} content
         * @memberof message.ChatMessage
         * @instance
         */
        ChatMessage.prototype.content = "";

        /**
         * Creates a new ChatMessage instance using the specified properties.
         * @function create
         * @memberof message.ChatMessage
         * @static
         * @param {message.IChatMessage=} [properties] Properties to set
         * @returns {message.ChatMessage} ChatMessage instance
         */
        ChatMessage.create = function create(properties) {
            return new ChatMessage(properties);
        };

        /**
         * Encodes the specified ChatMessage message. Does not implicitly {@link message.ChatMessage.verify|verify} messages.
         * @function encode
         * @memberof message.ChatMessage
         * @static
         * @param {message.IChatMessage} message ChatMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChatMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.msgId != null && Object.hasOwnProperty.call(message, "msgId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.msgId);
            if (message.isMy != null && Object.hasOwnProperty.call(message, "isMy"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isMy);
            if (message.read != null && Object.hasOwnProperty.call(message, "read"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.read);
            if (message.sendTime != null && Object.hasOwnProperty.call(message, "sendTime"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.sendTime);
            if (message.picUrl != null && Object.hasOwnProperty.call(message, "picUrl"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.picUrl);
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.content);
            return writer;
        };

        /**
         * Encodes the specified ChatMessage message, length delimited. Does not implicitly {@link message.ChatMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.ChatMessage
         * @static
         * @param {message.IChatMessage} message ChatMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChatMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ChatMessage message from the specified reader or buffer.
         * @function decode
         * @memberof message.ChatMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.ChatMessage} ChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChatMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.ChatMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.msgId = reader.int64();
                    break;
                case 2:
                    message.isMy = reader.bool();
                    break;
                case 3:
                    message.read = reader.bool();
                    break;
                case 4:
                    message.sendTime = reader.int64();
                    break;
                case 5:
                    message.picUrl = reader.string();
                    break;
                case 6:
                    message.content = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ChatMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.ChatMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.ChatMessage} ChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChatMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ChatMessage message.
         * @function verify
         * @memberof message.ChatMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ChatMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.msgId != null && message.hasOwnProperty("msgId"))
                if (!$util.isInteger(message.msgId) && !(message.msgId && $util.isInteger(message.msgId.low) && $util.isInteger(message.msgId.high)))
                    return "msgId: integer|Long expected";
            if (message.isMy != null && message.hasOwnProperty("isMy"))
                if (typeof message.isMy !== "boolean")
                    return "isMy: boolean expected";
            if (message.read != null && message.hasOwnProperty("read"))
                if (typeof message.read !== "boolean")
                    return "read: boolean expected";
            if (message.sendTime != null && message.hasOwnProperty("sendTime"))
                if (!$util.isInteger(message.sendTime) && !(message.sendTime && $util.isInteger(message.sendTime.low) && $util.isInteger(message.sendTime.high)))
                    return "sendTime: integer|Long expected";
            if (message.picUrl != null && message.hasOwnProperty("picUrl"))
                if (!$util.isString(message.picUrl))
                    return "picUrl: string expected";
            if (message.content != null && message.hasOwnProperty("content"))
                if (!$util.isString(message.content))
                    return "content: string expected";
            return null;
        };

        /**
         * Creates a ChatMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.ChatMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.ChatMessage} ChatMessage
         */
        ChatMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.message.ChatMessage)
                return object;
            var message = new $root.message.ChatMessage();
            if (object.msgId != null)
                if ($util.Long)
                    (message.msgId = $util.Long.fromValue(object.msgId)).unsigned = false;
                else if (typeof object.msgId === "string")
                    message.msgId = parseInt(object.msgId, 10);
                else if (typeof object.msgId === "number")
                    message.msgId = object.msgId;
                else if (typeof object.msgId === "object")
                    message.msgId = new $util.LongBits(object.msgId.low >>> 0, object.msgId.high >>> 0).toNumber();
            if (object.isMy != null)
                message.isMy = Boolean(object.isMy);
            if (object.read != null)
                message.read = Boolean(object.read);
            if (object.sendTime != null)
                if ($util.Long)
                    (message.sendTime = $util.Long.fromValue(object.sendTime)).unsigned = false;
                else if (typeof object.sendTime === "string")
                    message.sendTime = parseInt(object.sendTime, 10);
                else if (typeof object.sendTime === "number")
                    message.sendTime = object.sendTime;
                else if (typeof object.sendTime === "object")
                    message.sendTime = new $util.LongBits(object.sendTime.low >>> 0, object.sendTime.high >>> 0).toNumber();
            if (object.picUrl != null)
                message.picUrl = String(object.picUrl);
            if (object.content != null)
                message.content = String(object.content);
            return message;
        };

        /**
         * Creates a plain object from a ChatMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.ChatMessage
         * @static
         * @param {message.ChatMessage} message ChatMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ChatMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.msgId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.msgId = options.longs === String ? "0" : 0;
                object.isMy = false;
                object.read = false;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.sendTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.sendTime = options.longs === String ? "0" : 0;
                object.picUrl = "";
                object.content = "";
            }
            if (message.msgId != null && message.hasOwnProperty("msgId"))
                if (typeof message.msgId === "number")
                    object.msgId = options.longs === String ? String(message.msgId) : message.msgId;
                else
                    object.msgId = options.longs === String ? $util.Long.prototype.toString.call(message.msgId) : options.longs === Number ? new $util.LongBits(message.msgId.low >>> 0, message.msgId.high >>> 0).toNumber() : message.msgId;
            if (message.isMy != null && message.hasOwnProperty("isMy"))
                object.isMy = message.isMy;
            if (message.read != null && message.hasOwnProperty("read"))
                object.read = message.read;
            if (message.sendTime != null && message.hasOwnProperty("sendTime"))
                if (typeof message.sendTime === "number")
                    object.sendTime = options.longs === String ? String(message.sendTime) : message.sendTime;
                else
                    object.sendTime = options.longs === String ? $util.Long.prototype.toString.call(message.sendTime) : options.longs === Number ? new $util.LongBits(message.sendTime.low >>> 0, message.sendTime.high >>> 0).toNumber() : message.sendTime;
            if (message.picUrl != null && message.hasOwnProperty("picUrl"))
                object.picUrl = message.picUrl;
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = message.content;
            return object;
        };

        /**
         * Converts this ChatMessage to JSON.
         * @function toJSON
         * @memberof message.ChatMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ChatMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ChatMessage;
    })();

    message.BucketInfo = (function() {

        /**
         * Properties of a BucketInfo.
         * @memberof message
         * @interface IBucketInfo
         * @property {number|Long|null} [bucketId] BucketInfo bucketId
         * @property {message.BucketInfo.IGood|null} [good] BucketInfo good
         * @property {message.BucketInfo.ITalker|null} [talker] BucketInfo talker
         * @property {Array.<message.IChatMessage>|null} [msgList] 从时间由远到近
         */

        /**
         * Constructs a new BucketInfo.
         * @memberof message
         * @classdesc Represents a BucketInfo.
         * @implements IBucketInfo
         * @constructor
         * @param {message.IBucketInfo=} [properties] Properties to set
         */
        function BucketInfo(properties) {
            this.msgList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BucketInfo bucketId.
         * @member {number|Long} bucketId
         * @memberof message.BucketInfo
         * @instance
         */
        BucketInfo.prototype.bucketId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * BucketInfo good.
         * @member {message.BucketInfo.IGood|null|undefined} good
         * @memberof message.BucketInfo
         * @instance
         */
        BucketInfo.prototype.good = null;

        /**
         * BucketInfo talker.
         * @member {message.BucketInfo.ITalker|null|undefined} talker
         * @memberof message.BucketInfo
         * @instance
         */
        BucketInfo.prototype.talker = null;

        /**
         * 从时间由远到近
         * @member {Array.<message.IChatMessage>} msgList
         * @memberof message.BucketInfo
         * @instance
         */
        BucketInfo.prototype.msgList = $util.emptyArray;

        /**
         * Creates a new BucketInfo instance using the specified properties.
         * @function create
         * @memberof message.BucketInfo
         * @static
         * @param {message.IBucketInfo=} [properties] Properties to set
         * @returns {message.BucketInfo} BucketInfo instance
         */
        BucketInfo.create = function create(properties) {
            return new BucketInfo(properties);
        };

        /**
         * Encodes the specified BucketInfo message. Does not implicitly {@link message.BucketInfo.verify|verify} messages.
         * @function encode
         * @memberof message.BucketInfo
         * @static
         * @param {message.IBucketInfo} message BucketInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BucketInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.bucketId != null && Object.hasOwnProperty.call(message, "bucketId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.bucketId);
            if (message.good != null && Object.hasOwnProperty.call(message, "good"))
                $root.message.BucketInfo.Good.encode(message.good, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.talker != null && Object.hasOwnProperty.call(message, "talker"))
                $root.message.BucketInfo.Talker.encode(message.talker, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.msgList != null && message.msgList.length)
                for (var i = 0; i < message.msgList.length; ++i)
                    $root.message.ChatMessage.encode(message.msgList[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified BucketInfo message, length delimited. Does not implicitly {@link message.BucketInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.BucketInfo
         * @static
         * @param {message.IBucketInfo} message BucketInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BucketInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BucketInfo message from the specified reader or buffer.
         * @function decode
         * @memberof message.BucketInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.BucketInfo} BucketInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BucketInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.BucketInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.bucketId = reader.int64();
                    break;
                case 2:
                    message.good = $root.message.BucketInfo.Good.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.talker = $root.message.BucketInfo.Talker.decode(reader, reader.uint32());
                    break;
                case 4:
                    if (!(message.msgList && message.msgList.length))
                        message.msgList = [];
                    message.msgList.push($root.message.ChatMessage.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BucketInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.BucketInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.BucketInfo} BucketInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BucketInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BucketInfo message.
         * @function verify
         * @memberof message.BucketInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BucketInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.bucketId != null && message.hasOwnProperty("bucketId"))
                if (!$util.isInteger(message.bucketId) && !(message.bucketId && $util.isInteger(message.bucketId.low) && $util.isInteger(message.bucketId.high)))
                    return "bucketId: integer|Long expected";
            if (message.good != null && message.hasOwnProperty("good")) {
                var error = $root.message.BucketInfo.Good.verify(message.good);
                if (error)
                    return "good." + error;
            }
            if (message.talker != null && message.hasOwnProperty("talker")) {
                var error = $root.message.BucketInfo.Talker.verify(message.talker);
                if (error)
                    return "talker." + error;
            }
            if (message.msgList != null && message.hasOwnProperty("msgList")) {
                if (!Array.isArray(message.msgList))
                    return "msgList: array expected";
                for (var i = 0; i < message.msgList.length; ++i) {
                    var error = $root.message.ChatMessage.verify(message.msgList[i]);
                    if (error)
                        return "msgList." + error;
                }
            }
            return null;
        };

        /**
         * Creates a BucketInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.BucketInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.BucketInfo} BucketInfo
         */
        BucketInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.message.BucketInfo)
                return object;
            var message = new $root.message.BucketInfo();
            if (object.bucketId != null)
                if ($util.Long)
                    (message.bucketId = $util.Long.fromValue(object.bucketId)).unsigned = false;
                else if (typeof object.bucketId === "string")
                    message.bucketId = parseInt(object.bucketId, 10);
                else if (typeof object.bucketId === "number")
                    message.bucketId = object.bucketId;
                else if (typeof object.bucketId === "object")
                    message.bucketId = new $util.LongBits(object.bucketId.low >>> 0, object.bucketId.high >>> 0).toNumber();
            if (object.good != null) {
                if (typeof object.good !== "object")
                    throw TypeError(".message.BucketInfo.good: object expected");
                message.good = $root.message.BucketInfo.Good.fromObject(object.good);
            }
            if (object.talker != null) {
                if (typeof object.talker !== "object")
                    throw TypeError(".message.BucketInfo.talker: object expected");
                message.talker = $root.message.BucketInfo.Talker.fromObject(object.talker);
            }
            if (object.msgList) {
                if (!Array.isArray(object.msgList))
                    throw TypeError(".message.BucketInfo.msgList: array expected");
                message.msgList = [];
                for (var i = 0; i < object.msgList.length; ++i) {
                    if (typeof object.msgList[i] !== "object")
                        throw TypeError(".message.BucketInfo.msgList: object expected");
                    message.msgList[i] = $root.message.ChatMessage.fromObject(object.msgList[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a BucketInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.BucketInfo
         * @static
         * @param {message.BucketInfo} message BucketInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BucketInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.msgList = [];
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.bucketId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.bucketId = options.longs === String ? "0" : 0;
                object.good = null;
                object.talker = null;
            }
            if (message.bucketId != null && message.hasOwnProperty("bucketId"))
                if (typeof message.bucketId === "number")
                    object.bucketId = options.longs === String ? String(message.bucketId) : message.bucketId;
                else
                    object.bucketId = options.longs === String ? $util.Long.prototype.toString.call(message.bucketId) : options.longs === Number ? new $util.LongBits(message.bucketId.low >>> 0, message.bucketId.high >>> 0).toNumber() : message.bucketId;
            if (message.good != null && message.hasOwnProperty("good"))
                object.good = $root.message.BucketInfo.Good.toObject(message.good, options);
            if (message.talker != null && message.hasOwnProperty("talker"))
                object.talker = $root.message.BucketInfo.Talker.toObject(message.talker, options);
            if (message.msgList && message.msgList.length) {
                object.msgList = [];
                for (var j = 0; j < message.msgList.length; ++j)
                    object.msgList[j] = $root.message.ChatMessage.toObject(message.msgList[j], options);
            }
            return object;
        };

        /**
         * Converts this BucketInfo to JSON.
         * @function toJSON
         * @memberof message.BucketInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BucketInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        BucketInfo.Good = (function() {

            /**
             * Properties of a Good.
             * @memberof message.BucketInfo
             * @interface IGood
             * @property {number|null} [state] Good state
             * @property {string|null} [code] Good code
             * @property {string|null} [title] Good title
             * @property {string|null} [pic] Good pic
             * @property {string|null} [price] Good price
             * @property {number|null} [leftSec] Good leftSec
             */

            /**
             * Constructs a new Good.
             * @memberof message.BucketInfo
             * @classdesc Represents a Good.
             * @implements IGood
             * @constructor
             * @param {message.BucketInfo.IGood=} [properties] Properties to set
             */
            function Good(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Good state.
             * @member {number} state
             * @memberof message.BucketInfo.Good
             * @instance
             */
            Good.prototype.state = 0;

            /**
             * Good code.
             * @member {string} code
             * @memberof message.BucketInfo.Good
             * @instance
             */
            Good.prototype.code = "";

            /**
             * Good title.
             * @member {string} title
             * @memberof message.BucketInfo.Good
             * @instance
             */
            Good.prototype.title = "";

            /**
             * Good pic.
             * @member {string} pic
             * @memberof message.BucketInfo.Good
             * @instance
             */
            Good.prototype.pic = "";

            /**
             * Good price.
             * @member {string} price
             * @memberof message.BucketInfo.Good
             * @instance
             */
            Good.prototype.price = "";

            /**
             * Good leftSec.
             * @member {number} leftSec
             * @memberof message.BucketInfo.Good
             * @instance
             */
            Good.prototype.leftSec = 0;

            /**
             * Creates a new Good instance using the specified properties.
             * @function create
             * @memberof message.BucketInfo.Good
             * @static
             * @param {message.BucketInfo.IGood=} [properties] Properties to set
             * @returns {message.BucketInfo.Good} Good instance
             */
            Good.create = function create(properties) {
                return new Good(properties);
            };

            /**
             * Encodes the specified Good message. Does not implicitly {@link message.BucketInfo.Good.verify|verify} messages.
             * @function encode
             * @memberof message.BucketInfo.Good
             * @static
             * @param {message.BucketInfo.IGood} message Good message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Good.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.state);
                if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.code);
                if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.title);
                if (message.pic != null && Object.hasOwnProperty.call(message, "pic"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.pic);
                if (message.price != null && Object.hasOwnProperty.call(message, "price"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.price);
                if (message.leftSec != null && Object.hasOwnProperty.call(message, "leftSec"))
                    writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.leftSec);
                return writer;
            };

            /**
             * Encodes the specified Good message, length delimited. Does not implicitly {@link message.BucketInfo.Good.verify|verify} messages.
             * @function encodeDelimited
             * @memberof message.BucketInfo.Good
             * @static
             * @param {message.BucketInfo.IGood} message Good message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Good.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Good message from the specified reader or buffer.
             * @function decode
             * @memberof message.BucketInfo.Good
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {message.BucketInfo.Good} Good
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Good.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.BucketInfo.Good();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.state = reader.uint32();
                        break;
                    case 2:
                        message.code = reader.string();
                        break;
                    case 3:
                        message.title = reader.string();
                        break;
                    case 4:
                        message.pic = reader.string();
                        break;
                    case 5:
                        message.price = reader.string();
                        break;
                    case 6:
                        message.leftSec = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Good message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof message.BucketInfo.Good
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {message.BucketInfo.Good} Good
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Good.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Good message.
             * @function verify
             * @memberof message.BucketInfo.Good
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Good.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.state != null && message.hasOwnProperty("state"))
                    if (!$util.isInteger(message.state))
                        return "state: integer expected";
                if (message.code != null && message.hasOwnProperty("code"))
                    if (!$util.isString(message.code))
                        return "code: string expected";
                if (message.title != null && message.hasOwnProperty("title"))
                    if (!$util.isString(message.title))
                        return "title: string expected";
                if (message.pic != null && message.hasOwnProperty("pic"))
                    if (!$util.isString(message.pic))
                        return "pic: string expected";
                if (message.price != null && message.hasOwnProperty("price"))
                    if (!$util.isString(message.price))
                        return "price: string expected";
                if (message.leftSec != null && message.hasOwnProperty("leftSec"))
                    if (!$util.isInteger(message.leftSec))
                        return "leftSec: integer expected";
                return null;
            };

            /**
             * Creates a Good message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof message.BucketInfo.Good
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {message.BucketInfo.Good} Good
             */
            Good.fromObject = function fromObject(object) {
                if (object instanceof $root.message.BucketInfo.Good)
                    return object;
                var message = new $root.message.BucketInfo.Good();
                if (object.state != null)
                    message.state = object.state >>> 0;
                if (object.code != null)
                    message.code = String(object.code);
                if (object.title != null)
                    message.title = String(object.title);
                if (object.pic != null)
                    message.pic = String(object.pic);
                if (object.price != null)
                    message.price = String(object.price);
                if (object.leftSec != null)
                    message.leftSec = object.leftSec >>> 0;
                return message;
            };

            /**
             * Creates a plain object from a Good message. Also converts values to other types if specified.
             * @function toObject
             * @memberof message.BucketInfo.Good
             * @static
             * @param {message.BucketInfo.Good} message Good
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Good.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.state = 0;
                    object.code = "";
                    object.title = "";
                    object.pic = "";
                    object.price = "";
                    object.leftSec = 0;
                }
                if (message.state != null && message.hasOwnProperty("state"))
                    object.state = message.state;
                if (message.code != null && message.hasOwnProperty("code"))
                    object.code = message.code;
                if (message.title != null && message.hasOwnProperty("title"))
                    object.title = message.title;
                if (message.pic != null && message.hasOwnProperty("pic"))
                    object.pic = message.pic;
                if (message.price != null && message.hasOwnProperty("price"))
                    object.price = message.price;
                if (message.leftSec != null && message.hasOwnProperty("leftSec"))
                    object.leftSec = message.leftSec;
                return object;
            };

            /**
             * Converts this Good to JSON.
             * @function toJSON
             * @memberof message.BucketInfo.Good
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Good.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Good;
        })();

        BucketInfo.Talker = (function() {

            /**
             * Properties of a Talker.
             * @memberof message.BucketInfo
             * @interface ITalker
             * @property {number|Long|null} [userId] Talker userId
             * @property {string|null} [name] Talker name
             * @property {string|null} [avatar] Talker avatar
             */

            /**
             * Constructs a new Talker.
             * @memberof message.BucketInfo
             * @classdesc Represents a Talker.
             * @implements ITalker
             * @constructor
             * @param {message.BucketInfo.ITalker=} [properties] Properties to set
             */
            function Talker(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Talker userId.
             * @member {number|Long} userId
             * @memberof message.BucketInfo.Talker
             * @instance
             */
            Talker.prototype.userId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Talker name.
             * @member {string} name
             * @memberof message.BucketInfo.Talker
             * @instance
             */
            Talker.prototype.name = "";

            /**
             * Talker avatar.
             * @member {string} avatar
             * @memberof message.BucketInfo.Talker
             * @instance
             */
            Talker.prototype.avatar = "";

            /**
             * Creates a new Talker instance using the specified properties.
             * @function create
             * @memberof message.BucketInfo.Talker
             * @static
             * @param {message.BucketInfo.ITalker=} [properties] Properties to set
             * @returns {message.BucketInfo.Talker} Talker instance
             */
            Talker.create = function create(properties) {
                return new Talker(properties);
            };

            /**
             * Encodes the specified Talker message. Does not implicitly {@link message.BucketInfo.Talker.verify|verify} messages.
             * @function encode
             * @memberof message.BucketInfo.Talker
             * @static
             * @param {message.BucketInfo.ITalker} message Talker message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Talker.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.userId);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.avatar != null && Object.hasOwnProperty.call(message, "avatar"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.avatar);
                return writer;
            };

            /**
             * Encodes the specified Talker message, length delimited. Does not implicitly {@link message.BucketInfo.Talker.verify|verify} messages.
             * @function encodeDelimited
             * @memberof message.BucketInfo.Talker
             * @static
             * @param {message.BucketInfo.ITalker} message Talker message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Talker.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Talker message from the specified reader or buffer.
             * @function decode
             * @memberof message.BucketInfo.Talker
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {message.BucketInfo.Talker} Talker
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Talker.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.BucketInfo.Talker();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.userId = reader.int64();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    case 3:
                        message.avatar = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Talker message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof message.BucketInfo.Talker
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {message.BucketInfo.Talker} Talker
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Talker.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Talker message.
             * @function verify
             * @memberof message.BucketInfo.Talker
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Talker.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.userId != null && message.hasOwnProperty("userId"))
                    if (!$util.isInteger(message.userId) && !(message.userId && $util.isInteger(message.userId.low) && $util.isInteger(message.userId.high)))
                        return "userId: integer|Long expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.avatar != null && message.hasOwnProperty("avatar"))
                    if (!$util.isString(message.avatar))
                        return "avatar: string expected";
                return null;
            };

            /**
             * Creates a Talker message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof message.BucketInfo.Talker
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {message.BucketInfo.Talker} Talker
             */
            Talker.fromObject = function fromObject(object) {
                if (object instanceof $root.message.BucketInfo.Talker)
                    return object;
                var message = new $root.message.BucketInfo.Talker();
                if (object.userId != null)
                    if ($util.Long)
                        (message.userId = $util.Long.fromValue(object.userId)).unsigned = false;
                    else if (typeof object.userId === "string")
                        message.userId = parseInt(object.userId, 10);
                    else if (typeof object.userId === "number")
                        message.userId = object.userId;
                    else if (typeof object.userId === "object")
                        message.userId = new $util.LongBits(object.userId.low >>> 0, object.userId.high >>> 0).toNumber();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.avatar != null)
                    message.avatar = String(object.avatar);
                return message;
            };

            /**
             * Creates a plain object from a Talker message. Also converts values to other types if specified.
             * @function toObject
             * @memberof message.BucketInfo.Talker
             * @static
             * @param {message.BucketInfo.Talker} message Talker
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Talker.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.userId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.userId = options.longs === String ? "0" : 0;
                    object.name = "";
                    object.avatar = "";
                }
                if (message.userId != null && message.hasOwnProperty("userId"))
                    if (typeof message.userId === "number")
                        object.userId = options.longs === String ? String(message.userId) : message.userId;
                    else
                        object.userId = options.longs === String ? $util.Long.prototype.toString.call(message.userId) : options.longs === Number ? new $util.LongBits(message.userId.low >>> 0, message.userId.high >>> 0).toNumber() : message.userId;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.avatar != null && message.hasOwnProperty("avatar"))
                    object.avatar = message.avatar;
                return object;
            };

            /**
             * Converts this Talker to JSON.
             * @function toJSON
             * @memberof message.BucketInfo.Talker
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Talker.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Talker;
        })();

        return BucketInfo;
    })();

    message.PushChatMessage = (function() {

        /**
         * Properties of a PushChatMessage.
         * @memberof message
         * @interface IPushChatMessage
         * @property {number|Long|null} [bucketId] PushChatMessage bucketId
         * @property {message.IChatMessage|null} [msg] PushChatMessage msg
         */

        /**
         * Constructs a new PushChatMessage.
         * @memberof message
         * @classdesc Represents a PushChatMessage.
         * @implements IPushChatMessage
         * @constructor
         * @param {message.IPushChatMessage=} [properties] Properties to set
         */
        function PushChatMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PushChatMessage bucketId.
         * @member {number|Long} bucketId
         * @memberof message.PushChatMessage
         * @instance
         */
        PushChatMessage.prototype.bucketId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PushChatMessage msg.
         * @member {message.IChatMessage|null|undefined} msg
         * @memberof message.PushChatMessage
         * @instance
         */
        PushChatMessage.prototype.msg = null;

        /**
         * Creates a new PushChatMessage instance using the specified properties.
         * @function create
         * @memberof message.PushChatMessage
         * @static
         * @param {message.IPushChatMessage=} [properties] Properties to set
         * @returns {message.PushChatMessage} PushChatMessage instance
         */
        PushChatMessage.create = function create(properties) {
            return new PushChatMessage(properties);
        };

        /**
         * Encodes the specified PushChatMessage message. Does not implicitly {@link message.PushChatMessage.verify|verify} messages.
         * @function encode
         * @memberof message.PushChatMessage
         * @static
         * @param {message.IPushChatMessage} message PushChatMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PushChatMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.bucketId != null && Object.hasOwnProperty.call(message, "bucketId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.bucketId);
            if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                $root.message.ChatMessage.encode(message.msg, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PushChatMessage message, length delimited. Does not implicitly {@link message.PushChatMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.PushChatMessage
         * @static
         * @param {message.IPushChatMessage} message PushChatMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PushChatMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PushChatMessage message from the specified reader or buffer.
         * @function decode
         * @memberof message.PushChatMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.PushChatMessage} PushChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PushChatMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.PushChatMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.bucketId = reader.int64();
                    break;
                case 2:
                    message.msg = $root.message.ChatMessage.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PushChatMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.PushChatMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.PushChatMessage} PushChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PushChatMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PushChatMessage message.
         * @function verify
         * @memberof message.PushChatMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PushChatMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.bucketId != null && message.hasOwnProperty("bucketId"))
                if (!$util.isInteger(message.bucketId) && !(message.bucketId && $util.isInteger(message.bucketId.low) && $util.isInteger(message.bucketId.high)))
                    return "bucketId: integer|Long expected";
            if (message.msg != null && message.hasOwnProperty("msg")) {
                var error = $root.message.ChatMessage.verify(message.msg);
                if (error)
                    return "msg." + error;
            }
            return null;
        };

        /**
         * Creates a PushChatMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.PushChatMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.PushChatMessage} PushChatMessage
         */
        PushChatMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.message.PushChatMessage)
                return object;
            var message = new $root.message.PushChatMessage();
            if (object.bucketId != null)
                if ($util.Long)
                    (message.bucketId = $util.Long.fromValue(object.bucketId)).unsigned = false;
                else if (typeof object.bucketId === "string")
                    message.bucketId = parseInt(object.bucketId, 10);
                else if (typeof object.bucketId === "number")
                    message.bucketId = object.bucketId;
                else if (typeof object.bucketId === "object")
                    message.bucketId = new $util.LongBits(object.bucketId.low >>> 0, object.bucketId.high >>> 0).toNumber();
            if (object.msg != null) {
                if (typeof object.msg !== "object")
                    throw TypeError(".message.PushChatMessage.msg: object expected");
                message.msg = $root.message.ChatMessage.fromObject(object.msg);
            }
            return message;
        };

        /**
         * Creates a plain object from a PushChatMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.PushChatMessage
         * @static
         * @param {message.PushChatMessage} message PushChatMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PushChatMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.bucketId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.bucketId = options.longs === String ? "0" : 0;
                object.msg = null;
            }
            if (message.bucketId != null && message.hasOwnProperty("bucketId"))
                if (typeof message.bucketId === "number")
                    object.bucketId = options.longs === String ? String(message.bucketId) : message.bucketId;
                else
                    object.bucketId = options.longs === String ? $util.Long.prototype.toString.call(message.bucketId) : options.longs === Number ? new $util.LongBits(message.bucketId.low >>> 0, message.bucketId.high >>> 0).toNumber() : message.bucketId;
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = $root.message.ChatMessage.toObject(message.msg, options);
            return object;
        };

        /**
         * Converts this PushChatMessage to JSON.
         * @function toJSON
         * @memberof message.PushChatMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PushChatMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PushChatMessage;
    })();

    message.BackSendMessage = (function() {

        /**
         * Properties of a BackSendMessage.
         * @memberof message
         * @interface IBackSendMessage
         * @property {message.BackSendMessage.RetCode|null} [code] BackSendMessage code
         * @property {string|null} [msg] BackSendMessage msg
         */

        /**
         * Constructs a new BackSendMessage.
         * @memberof message
         * @classdesc Represents a BackSendMessage.
         * @implements IBackSendMessage
         * @constructor
         * @param {message.IBackSendMessage=} [properties] Properties to set
         */
        function BackSendMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BackSendMessage code.
         * @member {message.BackSendMessage.RetCode} code
         * @memberof message.BackSendMessage
         * @instance
         */
        BackSendMessage.prototype.code = 0;

        /**
         * BackSendMessage msg.
         * @member {string} msg
         * @memberof message.BackSendMessage
         * @instance
         */
        BackSendMessage.prototype.msg = "";

        /**
         * Creates a new BackSendMessage instance using the specified properties.
         * @function create
         * @memberof message.BackSendMessage
         * @static
         * @param {message.IBackSendMessage=} [properties] Properties to set
         * @returns {message.BackSendMessage} BackSendMessage instance
         */
        BackSendMessage.create = function create(properties) {
            return new BackSendMessage(properties);
        };

        /**
         * Encodes the specified BackSendMessage message. Does not implicitly {@link message.BackSendMessage.verify|verify} messages.
         * @function encode
         * @memberof message.BackSendMessage
         * @static
         * @param {message.IBackSendMessage} message BackSendMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BackSendMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
            if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
            return writer;
        };

        /**
         * Encodes the specified BackSendMessage message, length delimited. Does not implicitly {@link message.BackSendMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.BackSendMessage
         * @static
         * @param {message.IBackSendMessage} message BackSendMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BackSendMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BackSendMessage message from the specified reader or buffer.
         * @function decode
         * @memberof message.BackSendMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.BackSendMessage} BackSendMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BackSendMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.BackSendMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.code = reader.int32();
                    break;
                case 2:
                    message.msg = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BackSendMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.BackSendMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.BackSendMessage} BackSendMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BackSendMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BackSendMessage message.
         * @function verify
         * @memberof message.BackSendMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BackSendMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                switch (message.code) {
                default:
                    return "code: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.msg != null && message.hasOwnProperty("msg"))
                if (!$util.isString(message.msg))
                    return "msg: string expected";
            return null;
        };

        /**
         * Creates a BackSendMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.BackSendMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.BackSendMessage} BackSendMessage
         */
        BackSendMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.message.BackSendMessage)
                return object;
            var message = new $root.message.BackSendMessage();
            switch (object.code) {
            case "RC_OK":
            case 0:
                message.code = 0;
                break;
            case "RC_WRONG":
            case 1:
                message.code = 1;
                break;
            case "RC_WRONG_BUCKET":
            case 2:
                message.code = 2;
                break;
            case "RC_FORBIDEN":
            case 3:
                message.code = 3;
                break;
            case "RC_OTHER":
            case 4:
                message.code = 4;
                break;
            }
            if (object.msg != null)
                message.msg = String(object.msg);
            return message;
        };

        /**
         * Creates a plain object from a BackSendMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.BackSendMessage
         * @static
         * @param {message.BackSendMessage} message BackSendMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BackSendMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.code = options.enums === String ? "RC_OK" : 0;
                object.msg = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = options.enums === String ? $root.message.BackSendMessage.RetCode[message.code] : message.code;
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = message.msg;
            return object;
        };

        /**
         * Converts this BackSendMessage to JSON.
         * @function toJSON
         * @memberof message.BackSendMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BackSendMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * RetCode enum.
         * @name message.BackSendMessage.RetCode
         * @enum {number}
         * @property {number} RC_OK=0 RC_OK value
         * @property {number} RC_WRONG=1 RC_WRONG value
         * @property {number} RC_WRONG_BUCKET=2 RC_WRONG_BUCKET value
         * @property {number} RC_FORBIDEN=3 RC_FORBIDEN value
         * @property {number} RC_OTHER=4 RC_OTHER value
         */
        BackSendMessage.RetCode = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "RC_OK"] = 0;
            values[valuesById[1] = "RC_WRONG"] = 1;
            values[valuesById[2] = "RC_WRONG_BUCKET"] = 2;
            values[valuesById[3] = "RC_FORBIDEN"] = 3;
            values[valuesById[4] = "RC_OTHER"] = 4;
            return values;
        })();

        return BackSendMessage;
    })();

    message.RequestBidOn = (function() {

        /**
         * Properties of a RequestBidOn.
         * @memberof message
         * @interface IRequestBidOn
         * @property {string|null} [goodCode] RequestBidOn goodCode
         */

        /**
         * Constructs a new RequestBidOn.
         * @memberof message
         * @classdesc Represents a RequestBidOn.
         * @implements IRequestBidOn
         * @constructor
         * @param {message.IRequestBidOn=} [properties] Properties to set
         */
        function RequestBidOn(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RequestBidOn goodCode.
         * @member {string} goodCode
         * @memberof message.RequestBidOn
         * @instance
         */
        RequestBidOn.prototype.goodCode = "";

        /**
         * Creates a new RequestBidOn instance using the specified properties.
         * @function create
         * @memberof message.RequestBidOn
         * @static
         * @param {message.IRequestBidOn=} [properties] Properties to set
         * @returns {message.RequestBidOn} RequestBidOn instance
         */
        RequestBidOn.create = function create(properties) {
            return new RequestBidOn(properties);
        };

        /**
         * Encodes the specified RequestBidOn message. Does not implicitly {@link message.RequestBidOn.verify|verify} messages.
         * @function encode
         * @memberof message.RequestBidOn
         * @static
         * @param {message.IRequestBidOn} message RequestBidOn message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RequestBidOn.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.goodCode != null && Object.hasOwnProperty.call(message, "goodCode"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.goodCode);
            return writer;
        };

        /**
         * Encodes the specified RequestBidOn message, length delimited. Does not implicitly {@link message.RequestBidOn.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.RequestBidOn
         * @static
         * @param {message.IRequestBidOn} message RequestBidOn message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RequestBidOn.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RequestBidOn message from the specified reader or buffer.
         * @function decode
         * @memberof message.RequestBidOn
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.RequestBidOn} RequestBidOn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RequestBidOn.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.RequestBidOn();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.goodCode = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RequestBidOn message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.RequestBidOn
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.RequestBidOn} RequestBidOn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RequestBidOn.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RequestBidOn message.
         * @function verify
         * @memberof message.RequestBidOn
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RequestBidOn.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.goodCode != null && message.hasOwnProperty("goodCode"))
                if (!$util.isString(message.goodCode))
                    return "goodCode: string expected";
            return null;
        };

        /**
         * Creates a RequestBidOn message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.RequestBidOn
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.RequestBidOn} RequestBidOn
         */
        RequestBidOn.fromObject = function fromObject(object) {
            if (object instanceof $root.message.RequestBidOn)
                return object;
            var message = new $root.message.RequestBidOn();
            if (object.goodCode != null)
                message.goodCode = String(object.goodCode);
            return message;
        };

        /**
         * Creates a plain object from a RequestBidOn message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.RequestBidOn
         * @static
         * @param {message.RequestBidOn} message RequestBidOn
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RequestBidOn.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.goodCode = "";
            if (message.goodCode != null && message.hasOwnProperty("goodCode"))
                object.goodCode = message.goodCode;
            return object;
        };

        /**
         * Converts this RequestBidOn to JSON.
         * @function toJSON
         * @memberof message.RequestBidOn
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RequestBidOn.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RequestBidOn;
    })();

    message.RequestBidOff = (function() {

        /**
         * Properties of a RequestBidOff.
         * @memberof message
         * @interface IRequestBidOff
         */

        /**
         * Constructs a new RequestBidOff.
         * @memberof message
         * @classdesc Represents a RequestBidOff.
         * @implements IRequestBidOff
         * @constructor
         * @param {message.IRequestBidOff=} [properties] Properties to set
         */
        function RequestBidOff(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new RequestBidOff instance using the specified properties.
         * @function create
         * @memberof message.RequestBidOff
         * @static
         * @param {message.IRequestBidOff=} [properties] Properties to set
         * @returns {message.RequestBidOff} RequestBidOff instance
         */
        RequestBidOff.create = function create(properties) {
            return new RequestBidOff(properties);
        };

        /**
         * Encodes the specified RequestBidOff message. Does not implicitly {@link message.RequestBidOff.verify|verify} messages.
         * @function encode
         * @memberof message.RequestBidOff
         * @static
         * @param {message.IRequestBidOff} message RequestBidOff message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RequestBidOff.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified RequestBidOff message, length delimited. Does not implicitly {@link message.RequestBidOff.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.RequestBidOff
         * @static
         * @param {message.IRequestBidOff} message RequestBidOff message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RequestBidOff.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RequestBidOff message from the specified reader or buffer.
         * @function decode
         * @memberof message.RequestBidOff
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.RequestBidOff} RequestBidOff
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RequestBidOff.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.RequestBidOff();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RequestBidOff message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.RequestBidOff
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.RequestBidOff} RequestBidOff
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RequestBidOff.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RequestBidOff message.
         * @function verify
         * @memberof message.RequestBidOff
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RequestBidOff.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a RequestBidOff message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.RequestBidOff
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.RequestBidOff} RequestBidOff
         */
        RequestBidOff.fromObject = function fromObject(object) {
            if (object instanceof $root.message.RequestBidOff)
                return object;
            return new $root.message.RequestBidOff();
        };

        /**
         * Creates a plain object from a RequestBidOff message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.RequestBidOff
         * @static
         * @param {message.RequestBidOff} message RequestBidOff
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RequestBidOff.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this RequestBidOff to JSON.
         * @function toJSON
         * @memberof message.RequestBidOff
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RequestBidOff.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RequestBidOff;
    })();

    message.PushGoodBidList = (function() {

        /**
         * Properties of a PushGoodBidList.
         * @memberof message
         * @interface IPushGoodBidList
         * @property {string|null} [goodCode] PushGoodBidList goodCode
         * @property {Array.<message.PushGoodBidList.IUserBid>|null} [list] PushGoodBidList list
         */

        /**
         * Constructs a new PushGoodBidList.
         * @memberof message
         * @classdesc Represents a PushGoodBidList.
         * @implements IPushGoodBidList
         * @constructor
         * @param {message.IPushGoodBidList=} [properties] Properties to set
         */
        function PushGoodBidList(properties) {
            this.list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PushGoodBidList goodCode.
         * @member {string} goodCode
         * @memberof message.PushGoodBidList
         * @instance
         */
        PushGoodBidList.prototype.goodCode = "";

        /**
         * PushGoodBidList list.
         * @member {Array.<message.PushGoodBidList.IUserBid>} list
         * @memberof message.PushGoodBidList
         * @instance
         */
        PushGoodBidList.prototype.list = $util.emptyArray;

        /**
         * Creates a new PushGoodBidList instance using the specified properties.
         * @function create
         * @memberof message.PushGoodBidList
         * @static
         * @param {message.IPushGoodBidList=} [properties] Properties to set
         * @returns {message.PushGoodBidList} PushGoodBidList instance
         */
        PushGoodBidList.create = function create(properties) {
            return new PushGoodBidList(properties);
        };

        /**
         * Encodes the specified PushGoodBidList message. Does not implicitly {@link message.PushGoodBidList.verify|verify} messages.
         * @function encode
         * @memberof message.PushGoodBidList
         * @static
         * @param {message.IPushGoodBidList} message PushGoodBidList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PushGoodBidList.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.goodCode != null && Object.hasOwnProperty.call(message, "goodCode"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.goodCode);
            if (message.list != null && message.list.length)
                for (var i = 0; i < message.list.length; ++i)
                    $root.message.PushGoodBidList.UserBid.encode(message.list[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PushGoodBidList message, length delimited. Does not implicitly {@link message.PushGoodBidList.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.PushGoodBidList
         * @static
         * @param {message.IPushGoodBidList} message PushGoodBidList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PushGoodBidList.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PushGoodBidList message from the specified reader or buffer.
         * @function decode
         * @memberof message.PushGoodBidList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.PushGoodBidList} PushGoodBidList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PushGoodBidList.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.PushGoodBidList();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.goodCode = reader.string();
                    break;
                case 2:
                    if (!(message.list && message.list.length))
                        message.list = [];
                    message.list.push($root.message.PushGoodBidList.UserBid.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PushGoodBidList message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.PushGoodBidList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.PushGoodBidList} PushGoodBidList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PushGoodBidList.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PushGoodBidList message.
         * @function verify
         * @memberof message.PushGoodBidList
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PushGoodBidList.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.goodCode != null && message.hasOwnProperty("goodCode"))
                if (!$util.isString(message.goodCode))
                    return "goodCode: string expected";
            if (message.list != null && message.hasOwnProperty("list")) {
                if (!Array.isArray(message.list))
                    return "list: array expected";
                for (var i = 0; i < message.list.length; ++i) {
                    var error = $root.message.PushGoodBidList.UserBid.verify(message.list[i]);
                    if (error)
                        return "list." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PushGoodBidList message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.PushGoodBidList
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.PushGoodBidList} PushGoodBidList
         */
        PushGoodBidList.fromObject = function fromObject(object) {
            if (object instanceof $root.message.PushGoodBidList)
                return object;
            var message = new $root.message.PushGoodBidList();
            if (object.goodCode != null)
                message.goodCode = String(object.goodCode);
            if (object.list) {
                if (!Array.isArray(object.list))
                    throw TypeError(".message.PushGoodBidList.list: array expected");
                message.list = [];
                for (var i = 0; i < object.list.length; ++i) {
                    if (typeof object.list[i] !== "object")
                        throw TypeError(".message.PushGoodBidList.list: object expected");
                    message.list[i] = $root.message.PushGoodBidList.UserBid.fromObject(object.list[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PushGoodBidList message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.PushGoodBidList
         * @static
         * @param {message.PushGoodBidList} message PushGoodBidList
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PushGoodBidList.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.list = [];
            if (options.defaults)
                object.goodCode = "";
            if (message.goodCode != null && message.hasOwnProperty("goodCode"))
                object.goodCode = message.goodCode;
            if (message.list && message.list.length) {
                object.list = [];
                for (var j = 0; j < message.list.length; ++j)
                    object.list[j] = $root.message.PushGoodBidList.UserBid.toObject(message.list[j], options);
            }
            return object;
        };

        /**
         * Converts this PushGoodBidList to JSON.
         * @function toJSON
         * @memberof message.PushGoodBidList
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PushGoodBidList.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        PushGoodBidList.UserBid = (function() {

            /**
             * Properties of a UserBid.
             * @memberof message.PushGoodBidList
             * @interface IUserBid
             * @property {number|Long|null} [userId] UserBid userId
             * @property {string|null} [name] UserBid name
             * @property {string|null} [avatar] UserBid avatar
             * @property {number|Long|null} [bidTime] UserBid bidTime
             * @property {string|null} [price] UserBid price
             */

            /**
             * Constructs a new UserBid.
             * @memberof message.PushGoodBidList
             * @classdesc Represents a UserBid.
             * @implements IUserBid
             * @constructor
             * @param {message.PushGoodBidList.IUserBid=} [properties] Properties to set
             */
            function UserBid(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UserBid userId.
             * @member {number|Long} userId
             * @memberof message.PushGoodBidList.UserBid
             * @instance
             */
            UserBid.prototype.userId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * UserBid name.
             * @member {string} name
             * @memberof message.PushGoodBidList.UserBid
             * @instance
             */
            UserBid.prototype.name = "";

            /**
             * UserBid avatar.
             * @member {string} avatar
             * @memberof message.PushGoodBidList.UserBid
             * @instance
             */
            UserBid.prototype.avatar = "";

            /**
             * UserBid bidTime.
             * @member {number|Long} bidTime
             * @memberof message.PushGoodBidList.UserBid
             * @instance
             */
            UserBid.prototype.bidTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * UserBid price.
             * @member {string} price
             * @memberof message.PushGoodBidList.UserBid
             * @instance
             */
            UserBid.prototype.price = "";

            /**
             * Creates a new UserBid instance using the specified properties.
             * @function create
             * @memberof message.PushGoodBidList.UserBid
             * @static
             * @param {message.PushGoodBidList.IUserBid=} [properties] Properties to set
             * @returns {message.PushGoodBidList.UserBid} UserBid instance
             */
            UserBid.create = function create(properties) {
                return new UserBid(properties);
            };

            /**
             * Encodes the specified UserBid message. Does not implicitly {@link message.PushGoodBidList.UserBid.verify|verify} messages.
             * @function encode
             * @memberof message.PushGoodBidList.UserBid
             * @static
             * @param {message.PushGoodBidList.IUserBid} message UserBid message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UserBid.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.userId);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.avatar != null && Object.hasOwnProperty.call(message, "avatar"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.avatar);
                if (message.bidTime != null && Object.hasOwnProperty.call(message, "bidTime"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int64(message.bidTime);
                if (message.price != null && Object.hasOwnProperty.call(message, "price"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.price);
                return writer;
            };

            /**
             * Encodes the specified UserBid message, length delimited. Does not implicitly {@link message.PushGoodBidList.UserBid.verify|verify} messages.
             * @function encodeDelimited
             * @memberof message.PushGoodBidList.UserBid
             * @static
             * @param {message.PushGoodBidList.IUserBid} message UserBid message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UserBid.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a UserBid message from the specified reader or buffer.
             * @function decode
             * @memberof message.PushGoodBidList.UserBid
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {message.PushGoodBidList.UserBid} UserBid
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UserBid.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.PushGoodBidList.UserBid();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.userId = reader.int64();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    case 3:
                        message.avatar = reader.string();
                        break;
                    case 4:
                        message.bidTime = reader.int64();
                        break;
                    case 5:
                        message.price = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a UserBid message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof message.PushGoodBidList.UserBid
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {message.PushGoodBidList.UserBid} UserBid
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UserBid.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a UserBid message.
             * @function verify
             * @memberof message.PushGoodBidList.UserBid
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            UserBid.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.userId != null && message.hasOwnProperty("userId"))
                    if (!$util.isInteger(message.userId) && !(message.userId && $util.isInteger(message.userId.low) && $util.isInteger(message.userId.high)))
                        return "userId: integer|Long expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.avatar != null && message.hasOwnProperty("avatar"))
                    if (!$util.isString(message.avatar))
                        return "avatar: string expected";
                if (message.bidTime != null && message.hasOwnProperty("bidTime"))
                    if (!$util.isInteger(message.bidTime) && !(message.bidTime && $util.isInteger(message.bidTime.low) && $util.isInteger(message.bidTime.high)))
                        return "bidTime: integer|Long expected";
                if (message.price != null && message.hasOwnProperty("price"))
                    if (!$util.isString(message.price))
                        return "price: string expected";
                return null;
            };

            /**
             * Creates a UserBid message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof message.PushGoodBidList.UserBid
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {message.PushGoodBidList.UserBid} UserBid
             */
            UserBid.fromObject = function fromObject(object) {
                if (object instanceof $root.message.PushGoodBidList.UserBid)
                    return object;
                var message = new $root.message.PushGoodBidList.UserBid();
                if (object.userId != null)
                    if ($util.Long)
                        (message.userId = $util.Long.fromValue(object.userId)).unsigned = false;
                    else if (typeof object.userId === "string")
                        message.userId = parseInt(object.userId, 10);
                    else if (typeof object.userId === "number")
                        message.userId = object.userId;
                    else if (typeof object.userId === "object")
                        message.userId = new $util.LongBits(object.userId.low >>> 0, object.userId.high >>> 0).toNumber();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.avatar != null)
                    message.avatar = String(object.avatar);
                if (object.bidTime != null)
                    if ($util.Long)
                        (message.bidTime = $util.Long.fromValue(object.bidTime)).unsigned = false;
                    else if (typeof object.bidTime === "string")
                        message.bidTime = parseInt(object.bidTime, 10);
                    else if (typeof object.bidTime === "number")
                        message.bidTime = object.bidTime;
                    else if (typeof object.bidTime === "object")
                        message.bidTime = new $util.LongBits(object.bidTime.low >>> 0, object.bidTime.high >>> 0).toNumber();
                if (object.price != null)
                    message.price = String(object.price);
                return message;
            };

            /**
             * Creates a plain object from a UserBid message. Also converts values to other types if specified.
             * @function toObject
             * @memberof message.PushGoodBidList.UserBid
             * @static
             * @param {message.PushGoodBidList.UserBid} message UserBid
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UserBid.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.userId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.userId = options.longs === String ? "0" : 0;
                    object.name = "";
                    object.avatar = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.bidTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.bidTime = options.longs === String ? "0" : 0;
                    object.price = "";
                }
                if (message.userId != null && message.hasOwnProperty("userId"))
                    if (typeof message.userId === "number")
                        object.userId = options.longs === String ? String(message.userId) : message.userId;
                    else
                        object.userId = options.longs === String ? $util.Long.prototype.toString.call(message.userId) : options.longs === Number ? new $util.LongBits(message.userId.low >>> 0, message.userId.high >>> 0).toNumber() : message.userId;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.avatar != null && message.hasOwnProperty("avatar"))
                    object.avatar = message.avatar;
                if (message.bidTime != null && message.hasOwnProperty("bidTime"))
                    if (typeof message.bidTime === "number")
                        object.bidTime = options.longs === String ? String(message.bidTime) : message.bidTime;
                    else
                        object.bidTime = options.longs === String ? $util.Long.prototype.toString.call(message.bidTime) : options.longs === Number ? new $util.LongBits(message.bidTime.low >>> 0, message.bidTime.high >>> 0).toNumber() : message.bidTime;
                if (message.price != null && message.hasOwnProperty("price"))
                    object.price = message.price;
                return object;
            };

            /**
             * Converts this UserBid to JSON.
             * @function toJSON
             * @memberof message.PushGoodBidList.UserBid
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UserBid.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return UserBid;
        })();

        return PushGoodBidList;
    })();

    message.HeartBeat = (function() {

        /**
         * Properties of a HeartBeat.
         * @memberof message
         * @interface IHeartBeat
         * @property {number|Long|null} [time] HeartBeat time
         */

        /**
         * Constructs a new HeartBeat.
         * @memberof message
         * @classdesc Represents a HeartBeat.
         * @implements IHeartBeat
         * @constructor
         * @param {message.IHeartBeat=} [properties] Properties to set
         */
        function HeartBeat(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HeartBeat time.
         * @member {number|Long} time
         * @memberof message.HeartBeat
         * @instance
         */
        HeartBeat.prototype.time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new HeartBeat instance using the specified properties.
         * @function create
         * @memberof message.HeartBeat
         * @static
         * @param {message.IHeartBeat=} [properties] Properties to set
         * @returns {message.HeartBeat} HeartBeat instance
         */
        HeartBeat.create = function create(properties) {
            return new HeartBeat(properties);
        };

        /**
         * Encodes the specified HeartBeat message. Does not implicitly {@link message.HeartBeat.verify|verify} messages.
         * @function encode
         * @memberof message.HeartBeat
         * @static
         * @param {message.IHeartBeat} message HeartBeat message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeartBeat.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.time);
            return writer;
        };

        /**
         * Encodes the specified HeartBeat message, length delimited. Does not implicitly {@link message.HeartBeat.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.HeartBeat
         * @static
         * @param {message.IHeartBeat} message HeartBeat message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeartBeat.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HeartBeat message from the specified reader or buffer.
         * @function decode
         * @memberof message.HeartBeat
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.HeartBeat} HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeartBeat.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.HeartBeat();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.time = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a HeartBeat message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.HeartBeat
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.HeartBeat} HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeartBeat.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HeartBeat message.
         * @function verify
         * @memberof message.HeartBeat
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HeartBeat.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                    return "time: integer|Long expected";
            return null;
        };

        /**
         * Creates a HeartBeat message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.HeartBeat
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.HeartBeat} HeartBeat
         */
        HeartBeat.fromObject = function fromObject(object) {
            if (object instanceof $root.message.HeartBeat)
                return object;
            var message = new $root.message.HeartBeat();
            if (object.time != null)
                if ($util.Long)
                    (message.time = $util.Long.fromValue(object.time)).unsigned = false;
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a HeartBeat message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.HeartBeat
         * @static
         * @param {message.HeartBeat} message HeartBeat
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HeartBeat.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.time = options.longs === String ? "0" : 0;
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber() : message.time;
            return object;
        };

        /**
         * Converts this HeartBeat to JSON.
         * @function toJSON
         * @memberof message.HeartBeat
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HeartBeat.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return HeartBeat;
    })();

    message.LoginBroadCastRoom1001 = (function() {

        /**
         * Properties of a LoginBroadCastRoom1001.
         * @memberof message
         * @interface ILoginBroadCastRoom1001
         * @property {number|Long|null} [roomId] LoginBroadCastRoom1001 roomId
         * @property {string|null} [uid] LoginBroadCastRoom1001 uid
         * @property {string|null} [token] LoginBroadCastRoom1001 token
         */

        /**
         * Constructs a new LoginBroadCastRoom1001.
         * @memberof message
         * @classdesc Represents a LoginBroadCastRoom1001.
         * @implements ILoginBroadCastRoom1001
         * @constructor
         * @param {message.ILoginBroadCastRoom1001=} [properties] Properties to set
         */
        function LoginBroadCastRoom1001(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LoginBroadCastRoom1001 roomId.
         * @member {number|Long} roomId
         * @memberof message.LoginBroadCastRoom1001
         * @instance
         */
        LoginBroadCastRoom1001.prototype.roomId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * LoginBroadCastRoom1001 uid.
         * @member {string} uid
         * @memberof message.LoginBroadCastRoom1001
         * @instance
         */
        LoginBroadCastRoom1001.prototype.uid = "";

        /**
         * LoginBroadCastRoom1001 token.
         * @member {string} token
         * @memberof message.LoginBroadCastRoom1001
         * @instance
         */
        LoginBroadCastRoom1001.prototype.token = "";

        /**
         * Creates a new LoginBroadCastRoom1001 instance using the specified properties.
         * @function create
         * @memberof message.LoginBroadCastRoom1001
         * @static
         * @param {message.ILoginBroadCastRoom1001=} [properties] Properties to set
         * @returns {message.LoginBroadCastRoom1001} LoginBroadCastRoom1001 instance
         */
        LoginBroadCastRoom1001.create = function create(properties) {
            return new LoginBroadCastRoom1001(properties);
        };

        /**
         * Encodes the specified LoginBroadCastRoom1001 message. Does not implicitly {@link message.LoginBroadCastRoom1001.verify|verify} messages.
         * @function encode
         * @memberof message.LoginBroadCastRoom1001
         * @static
         * @param {message.ILoginBroadCastRoom1001} message LoginBroadCastRoom1001 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginBroadCastRoom1001.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.roomId);
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.uid);
            if (message.token != null && Object.hasOwnProperty.call(message, "token"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.token);
            return writer;
        };

        /**
         * Encodes the specified LoginBroadCastRoom1001 message, length delimited. Does not implicitly {@link message.LoginBroadCastRoom1001.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.LoginBroadCastRoom1001
         * @static
         * @param {message.ILoginBroadCastRoom1001} message LoginBroadCastRoom1001 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginBroadCastRoom1001.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LoginBroadCastRoom1001 message from the specified reader or buffer.
         * @function decode
         * @memberof message.LoginBroadCastRoom1001
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.LoginBroadCastRoom1001} LoginBroadCastRoom1001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginBroadCastRoom1001.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.LoginBroadCastRoom1001();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roomId = reader.int64();
                    break;
                case 2:
                    message.uid = reader.string();
                    break;
                case 3:
                    message.token = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LoginBroadCastRoom1001 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.LoginBroadCastRoom1001
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.LoginBroadCastRoom1001} LoginBroadCastRoom1001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginBroadCastRoom1001.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LoginBroadCastRoom1001 message.
         * @function verify
         * @memberof message.LoginBroadCastRoom1001
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LoginBroadCastRoom1001.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isInteger(message.roomId) && !(message.roomId && $util.isInteger(message.roomId.low) && $util.isInteger(message.roomId.high)))
                    return "roomId: integer|Long expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isString(message.uid))
                    return "uid: string expected";
            if (message.token != null && message.hasOwnProperty("token"))
                if (!$util.isString(message.token))
                    return "token: string expected";
            return null;
        };

        /**
         * Creates a LoginBroadCastRoom1001 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.LoginBroadCastRoom1001
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.LoginBroadCastRoom1001} LoginBroadCastRoom1001
         */
        LoginBroadCastRoom1001.fromObject = function fromObject(object) {
            if (object instanceof $root.message.LoginBroadCastRoom1001)
                return object;
            var message = new $root.message.LoginBroadCastRoom1001();
            if (object.roomId != null)
                if ($util.Long)
                    (message.roomId = $util.Long.fromValue(object.roomId)).unsigned = false;
                else if (typeof object.roomId === "string")
                    message.roomId = parseInt(object.roomId, 10);
                else if (typeof object.roomId === "number")
                    message.roomId = object.roomId;
                else if (typeof object.roomId === "object")
                    message.roomId = new $util.LongBits(object.roomId.low >>> 0, object.roomId.high >>> 0).toNumber();
            if (object.uid != null)
                message.uid = String(object.uid);
            if (object.token != null)
                message.token = String(object.token);
            return message;
        };

        /**
         * Creates a plain object from a LoginBroadCastRoom1001 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.LoginBroadCastRoom1001
         * @static
         * @param {message.LoginBroadCastRoom1001} message LoginBroadCastRoom1001
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LoginBroadCastRoom1001.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.roomId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.roomId = options.longs === String ? "0" : 0;
                object.uid = "";
                object.token = "";
            }
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (typeof message.roomId === "number")
                    object.roomId = options.longs === String ? String(message.roomId) : message.roomId;
                else
                    object.roomId = options.longs === String ? $util.Long.prototype.toString.call(message.roomId) : options.longs === Number ? new $util.LongBits(message.roomId.low >>> 0, message.roomId.high >>> 0).toNumber() : message.roomId;
            if (message.uid != null && message.hasOwnProperty("uid"))
                object.uid = message.uid;
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            return object;
        };

        /**
         * Converts this LoginBroadCastRoom1001 to JSON.
         * @function toJSON
         * @memberof message.LoginBroadCastRoom1001
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LoginBroadCastRoom1001.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LoginBroadCastRoom1001;
    })();

    message.LogoutBroadCastRoom1001 = (function() {

        /**
         * Properties of a LogoutBroadCastRoom1001.
         * @memberof message
         * @interface ILogoutBroadCastRoom1001
         * @property {number|Long|null} [roomId] LogoutBroadCastRoom1001 roomId
         */

        /**
         * Constructs a new LogoutBroadCastRoom1001.
         * @memberof message
         * @classdesc Represents a LogoutBroadCastRoom1001.
         * @implements ILogoutBroadCastRoom1001
         * @constructor
         * @param {message.ILogoutBroadCastRoom1001=} [properties] Properties to set
         */
        function LogoutBroadCastRoom1001(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LogoutBroadCastRoom1001 roomId.
         * @member {number|Long} roomId
         * @memberof message.LogoutBroadCastRoom1001
         * @instance
         */
        LogoutBroadCastRoom1001.prototype.roomId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new LogoutBroadCastRoom1001 instance using the specified properties.
         * @function create
         * @memberof message.LogoutBroadCastRoom1001
         * @static
         * @param {message.ILogoutBroadCastRoom1001=} [properties] Properties to set
         * @returns {message.LogoutBroadCastRoom1001} LogoutBroadCastRoom1001 instance
         */
        LogoutBroadCastRoom1001.create = function create(properties) {
            return new LogoutBroadCastRoom1001(properties);
        };

        /**
         * Encodes the specified LogoutBroadCastRoom1001 message. Does not implicitly {@link message.LogoutBroadCastRoom1001.verify|verify} messages.
         * @function encode
         * @memberof message.LogoutBroadCastRoom1001
         * @static
         * @param {message.ILogoutBroadCastRoom1001} message LogoutBroadCastRoom1001 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LogoutBroadCastRoom1001.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.roomId != null && Object.hasOwnProperty.call(message, "roomId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.roomId);
            return writer;
        };

        /**
         * Encodes the specified LogoutBroadCastRoom1001 message, length delimited. Does not implicitly {@link message.LogoutBroadCastRoom1001.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.LogoutBroadCastRoom1001
         * @static
         * @param {message.ILogoutBroadCastRoom1001} message LogoutBroadCastRoom1001 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LogoutBroadCastRoom1001.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LogoutBroadCastRoom1001 message from the specified reader or buffer.
         * @function decode
         * @memberof message.LogoutBroadCastRoom1001
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.LogoutBroadCastRoom1001} LogoutBroadCastRoom1001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LogoutBroadCastRoom1001.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.LogoutBroadCastRoom1001();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.roomId = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LogoutBroadCastRoom1001 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.LogoutBroadCastRoom1001
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.LogoutBroadCastRoom1001} LogoutBroadCastRoom1001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LogoutBroadCastRoom1001.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LogoutBroadCastRoom1001 message.
         * @function verify
         * @memberof message.LogoutBroadCastRoom1001
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LogoutBroadCastRoom1001.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isInteger(message.roomId) && !(message.roomId && $util.isInteger(message.roomId.low) && $util.isInteger(message.roomId.high)))
                    return "roomId: integer|Long expected";
            return null;
        };

        /**
         * Creates a LogoutBroadCastRoom1001 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.LogoutBroadCastRoom1001
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.LogoutBroadCastRoom1001} LogoutBroadCastRoom1001
         */
        LogoutBroadCastRoom1001.fromObject = function fromObject(object) {
            if (object instanceof $root.message.LogoutBroadCastRoom1001)
                return object;
            var message = new $root.message.LogoutBroadCastRoom1001();
            if (object.roomId != null)
                if ($util.Long)
                    (message.roomId = $util.Long.fromValue(object.roomId)).unsigned = false;
                else if (typeof object.roomId === "string")
                    message.roomId = parseInt(object.roomId, 10);
                else if (typeof object.roomId === "number")
                    message.roomId = object.roomId;
                else if (typeof object.roomId === "object")
                    message.roomId = new $util.LongBits(object.roomId.low >>> 0, object.roomId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a LogoutBroadCastRoom1001 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.LogoutBroadCastRoom1001
         * @static
         * @param {message.LogoutBroadCastRoom1001} message LogoutBroadCastRoom1001
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LogoutBroadCastRoom1001.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.roomId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.roomId = options.longs === String ? "0" : 0;
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (typeof message.roomId === "number")
                    object.roomId = options.longs === String ? String(message.roomId) : message.roomId;
                else
                    object.roomId = options.longs === String ? $util.Long.prototype.toString.call(message.roomId) : options.longs === Number ? new $util.LongBits(message.roomId.low >>> 0, message.roomId.high >>> 0).toNumber() : message.roomId;
            return object;
        };

        /**
         * Converts this LogoutBroadCastRoom1001 to JSON.
         * @function toJSON
         * @memberof message.LogoutBroadCastRoom1001
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LogoutBroadCastRoom1001.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LogoutBroadCastRoom1001;
    })();

    message.BackHeartBeat = (function() {

        /**
         * Properties of a BackHeartBeat.
         * @memberof message
         * @interface IBackHeartBeat
         * @property {number|Long|null} [time] BackHeartBeat time
         */

        /**
         * Constructs a new BackHeartBeat.
         * @memberof message
         * @classdesc Represents a BackHeartBeat.
         * @implements IBackHeartBeat
         * @constructor
         * @param {message.IBackHeartBeat=} [properties] Properties to set
         */
        function BackHeartBeat(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BackHeartBeat time.
         * @member {number|Long} time
         * @memberof message.BackHeartBeat
         * @instance
         */
        BackHeartBeat.prototype.time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new BackHeartBeat instance using the specified properties.
         * @function create
         * @memberof message.BackHeartBeat
         * @static
         * @param {message.IBackHeartBeat=} [properties] Properties to set
         * @returns {message.BackHeartBeat} BackHeartBeat instance
         */
        BackHeartBeat.create = function create(properties) {
            return new BackHeartBeat(properties);
        };

        /**
         * Encodes the specified BackHeartBeat message. Does not implicitly {@link message.BackHeartBeat.verify|verify} messages.
         * @function encode
         * @memberof message.BackHeartBeat
         * @static
         * @param {message.IBackHeartBeat} message BackHeartBeat message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BackHeartBeat.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.time);
            return writer;
        };

        /**
         * Encodes the specified BackHeartBeat message, length delimited. Does not implicitly {@link message.BackHeartBeat.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.BackHeartBeat
         * @static
         * @param {message.IBackHeartBeat} message BackHeartBeat message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BackHeartBeat.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BackHeartBeat message from the specified reader or buffer.
         * @function decode
         * @memberof message.BackHeartBeat
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.BackHeartBeat} BackHeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BackHeartBeat.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.BackHeartBeat();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.time = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BackHeartBeat message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.BackHeartBeat
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.BackHeartBeat} BackHeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BackHeartBeat.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BackHeartBeat message.
         * @function verify
         * @memberof message.BackHeartBeat
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BackHeartBeat.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.time != null && message.hasOwnProperty("time"))
                if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                    return "time: integer|Long expected";
            return null;
        };

        /**
         * Creates a BackHeartBeat message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.BackHeartBeat
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.BackHeartBeat} BackHeartBeat
         */
        BackHeartBeat.fromObject = function fromObject(object) {
            if (object instanceof $root.message.BackHeartBeat)
                return object;
            var message = new $root.message.BackHeartBeat();
            if (object.time != null)
                if ($util.Long)
                    (message.time = $util.Long.fromValue(object.time)).unsigned = false;
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a BackHeartBeat message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.BackHeartBeat
         * @static
         * @param {message.BackHeartBeat} message BackHeartBeat
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BackHeartBeat.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.time = options.longs === String ? "0" : 0;
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber() : message.time;
            return object;
        };

        /**
         * Converts this BackHeartBeat to JSON.
         * @function toJSON
         * @memberof message.BackHeartBeat
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BackHeartBeat.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BackHeartBeat;
    })();

    message.BackLoginBroadCastRoom1001 = (function() {

        /**
         * Properties of a BackLoginBroadCastRoom1001.
         * @memberof message
         * @interface IBackLoginBroadCastRoom1001
         * @property {message.BackLoginBroadCastRoom1001.RetCode|null} [code] BackLoginBroadCastRoom1001 code
         * @property {string|null} [msg] BackLoginBroadCastRoom1001 msg
         */

        /**
         * Constructs a new BackLoginBroadCastRoom1001.
         * @memberof message
         * @classdesc Represents a BackLoginBroadCastRoom1001.
         * @implements IBackLoginBroadCastRoom1001
         * @constructor
         * @param {message.IBackLoginBroadCastRoom1001=} [properties] Properties to set
         */
        function BackLoginBroadCastRoom1001(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BackLoginBroadCastRoom1001 code.
         * @member {message.BackLoginBroadCastRoom1001.RetCode} code
         * @memberof message.BackLoginBroadCastRoom1001
         * @instance
         */
        BackLoginBroadCastRoom1001.prototype.code = 0;

        /**
         * BackLoginBroadCastRoom1001 msg.
         * @member {string} msg
         * @memberof message.BackLoginBroadCastRoom1001
         * @instance
         */
        BackLoginBroadCastRoom1001.prototype.msg = "";

        /**
         * Creates a new BackLoginBroadCastRoom1001 instance using the specified properties.
         * @function create
         * @memberof message.BackLoginBroadCastRoom1001
         * @static
         * @param {message.IBackLoginBroadCastRoom1001=} [properties] Properties to set
         * @returns {message.BackLoginBroadCastRoom1001} BackLoginBroadCastRoom1001 instance
         */
        BackLoginBroadCastRoom1001.create = function create(properties) {
            return new BackLoginBroadCastRoom1001(properties);
        };

        /**
         * Encodes the specified BackLoginBroadCastRoom1001 message. Does not implicitly {@link message.BackLoginBroadCastRoom1001.verify|verify} messages.
         * @function encode
         * @memberof message.BackLoginBroadCastRoom1001
         * @static
         * @param {message.IBackLoginBroadCastRoom1001} message BackLoginBroadCastRoom1001 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BackLoginBroadCastRoom1001.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
            if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
            return writer;
        };

        /**
         * Encodes the specified BackLoginBroadCastRoom1001 message, length delimited. Does not implicitly {@link message.BackLoginBroadCastRoom1001.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.BackLoginBroadCastRoom1001
         * @static
         * @param {message.IBackLoginBroadCastRoom1001} message BackLoginBroadCastRoom1001 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BackLoginBroadCastRoom1001.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BackLoginBroadCastRoom1001 message from the specified reader or buffer.
         * @function decode
         * @memberof message.BackLoginBroadCastRoom1001
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.BackLoginBroadCastRoom1001} BackLoginBroadCastRoom1001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BackLoginBroadCastRoom1001.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.BackLoginBroadCastRoom1001();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.code = reader.int32();
                    break;
                case 2:
                    message.msg = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BackLoginBroadCastRoom1001 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.BackLoginBroadCastRoom1001
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.BackLoginBroadCastRoom1001} BackLoginBroadCastRoom1001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BackLoginBroadCastRoom1001.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BackLoginBroadCastRoom1001 message.
         * @function verify
         * @memberof message.BackLoginBroadCastRoom1001
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BackLoginBroadCastRoom1001.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                switch (message.code) {
                default:
                    return "code: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            if (message.msg != null && message.hasOwnProperty("msg"))
                if (!$util.isString(message.msg))
                    return "msg: string expected";
            return null;
        };

        /**
         * Creates a BackLoginBroadCastRoom1001 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.BackLoginBroadCastRoom1001
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.BackLoginBroadCastRoom1001} BackLoginBroadCastRoom1001
         */
        BackLoginBroadCastRoom1001.fromObject = function fromObject(object) {
            if (object instanceof $root.message.BackLoginBroadCastRoom1001)
                return object;
            var message = new $root.message.BackLoginBroadCastRoom1001();
            switch (object.code) {
            case "RC_OK":
            case 0:
                message.code = 0;
                break;
            case "RC_WRONG_IDENTIFIER":
            case 1:
                message.code = 1;
                break;
            case "RC_LOGIN_CLOSED":
            case 2:
                message.code = 2;
                break;
            case "RC_TOO_FAST":
            case 3:
                message.code = 3;
                break;
            }
            if (object.msg != null)
                message.msg = String(object.msg);
            return message;
        };

        /**
         * Creates a plain object from a BackLoginBroadCastRoom1001 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.BackLoginBroadCastRoom1001
         * @static
         * @param {message.BackLoginBroadCastRoom1001} message BackLoginBroadCastRoom1001
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BackLoginBroadCastRoom1001.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.code = options.enums === String ? "RC_OK" : 0;
                object.msg = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = options.enums === String ? $root.message.BackLoginBroadCastRoom1001.RetCode[message.code] : message.code;
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = message.msg;
            return object;
        };

        /**
         * Converts this BackLoginBroadCastRoom1001 to JSON.
         * @function toJSON
         * @memberof message.BackLoginBroadCastRoom1001
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BackLoginBroadCastRoom1001.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * RetCode enum.
         * @name message.BackLoginBroadCastRoom1001.RetCode
         * @enum {number}
         * @property {number} RC_OK=0 RC_OK value
         * @property {number} RC_WRONG_IDENTIFIER=1 RC_WRONG_IDENTIFIER value
         * @property {number} RC_LOGIN_CLOSED=2 RC_LOGIN_CLOSED value
         * @property {number} RC_TOO_FAST=3 RC_TOO_FAST value
         */
        BackLoginBroadCastRoom1001.RetCode = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "RC_OK"] = 0;
            values[valuesById[1] = "RC_WRONG_IDENTIFIER"] = 1;
            values[valuesById[2] = "RC_LOGIN_CLOSED"] = 2;
            values[valuesById[3] = "RC_TOO_FAST"] = 3;
            return values;
        })();

        return BackLoginBroadCastRoom1001;
    })();

    message.Message = (function() {

        /**
         * Properties of a Message.
         * @memberof message
         * @interface IMessage
         * @property {Array.<string>|null} [list] Message list
         */

        /**
         * Constructs a new Message.
         * @memberof message
         * @classdesc Represents a Message.
         * @implements IMessage
         * @constructor
         * @param {message.IMessage=} [properties] Properties to set
         */
        function Message(properties) {
            this.list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Message list.
         * @member {Array.<string>} list
         * @memberof message.Message
         * @instance
         */
        Message.prototype.list = $util.emptyArray;

        /**
         * Creates a new Message instance using the specified properties.
         * @function create
         * @memberof message.Message
         * @static
         * @param {message.IMessage=} [properties] Properties to set
         * @returns {message.Message} Message instance
         */
        Message.create = function create(properties) {
            return new Message(properties);
        };

        /**
         * Encodes the specified Message message. Does not implicitly {@link message.Message.verify|verify} messages.
         * @function encode
         * @memberof message.Message
         * @static
         * @param {message.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.list != null && message.list.length)
                for (var i = 0; i < message.list.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.list[i]);
            return writer;
        };

        /**
         * Encodes the specified Message message, length delimited. Does not implicitly {@link message.Message.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.Message
         * @static
         * @param {message.IMessage} message Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Message.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Message message from the specified reader or buffer.
         * @function decode
         * @memberof message.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.Message();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.list && message.list.length))
                        message.list = [];
                    message.list.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Message message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.Message} Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Message.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Message message.
         * @function verify
         * @memberof message.Message
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Message.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.list != null && message.hasOwnProperty("list")) {
                if (!Array.isArray(message.list))
                    return "list: array expected";
                for (var i = 0; i < message.list.length; ++i)
                    if (!$util.isString(message.list[i]))
                        return "list: string[] expected";
            }
            return null;
        };

        /**
         * Creates a Message message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.Message
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.Message} Message
         */
        Message.fromObject = function fromObject(object) {
            if (object instanceof $root.message.Message)
                return object;
            var message = new $root.message.Message();
            if (object.list) {
                if (!Array.isArray(object.list))
                    throw TypeError(".message.Message.list: array expected");
                message.list = [];
                for (var i = 0; i < object.list.length; ++i)
                    message.list[i] = String(object.list[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a Message message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.Message
         * @static
         * @param {message.Message} message Message
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Message.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.list = [];
            if (message.list && message.list.length) {
                object.list = [];
                for (var j = 0; j < message.list.length; ++j)
                    object.list[j] = message.list[j];
            }
            return object;
        };

        /**
         * Converts this Message to JSON.
         * @function toJSON
         * @memberof message.Message
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Message.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Message;
    })();

    /**
     * NODE enum.
     * @name message.NODE
     * @enum {number}
     * @property {number} NONE=0 NONE value
     * @property {number} GATESERVER=1 GATESERVER value
     * @property {number} ACCOUNTSERVER=2 ACCOUNTSERVER value
     * @property {number} WORLDSERVER=3 WORLDSERVER value
     * @property {number} CORESERVER=4 CORESERVER value
     * @property {number} FUNCSERVER=5 FUNCSERVER value
     */
    message.NODE = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NONE"] = 0;
        values[valuesById[1] = "GATESERVER"] = 1;
        values[valuesById[2] = "ACCOUNTSERVER"] = 2;
        values[valuesById[3] = "WORLDSERVER"] = 3;
        values[valuesById[4] = "CORESERVER"] = 4;
        values[valuesById[5] = "FUNCSERVER"] = 5;
        return values;
    })();

    message.Ipacket = (function() {

        /**
         * Properties of an Ipacket.
         * @memberof message
         * @interface IIpacket
         * @property {number|null} [Stx] Ipacket Stx
         * @property {message.NODE|null} [DestNodeType] Ipacket DestNodeType
         * @property {number|null} [Ckx] Ipacket Ckx
         * @property {number|null} [Id] Ipacket Id
         */

        /**
         * Constructs a new Ipacket.
         * @memberof message
         * @classdesc Represents an Ipacket.
         * @implements IIpacket
         * @constructor
         * @param {message.IIpacket=} [properties] Properties to set
         */
        function Ipacket(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Ipacket Stx.
         * @member {number} Stx
         * @memberof message.Ipacket
         * @instance
         */
        Ipacket.prototype.Stx = 0;

        /**
         * Ipacket DestNodeType.
         * @member {message.NODE} DestNodeType
         * @memberof message.Ipacket
         * @instance
         */
        Ipacket.prototype.DestNodeType = 0;

        /**
         * Ipacket Ckx.
         * @member {number} Ckx
         * @memberof message.Ipacket
         * @instance
         */
        Ipacket.prototype.Ckx = 0;

        /**
         * Ipacket Id.
         * @member {number} Id
         * @memberof message.Ipacket
         * @instance
         */
        Ipacket.prototype.Id = 0;

        /**
         * Creates a new Ipacket instance using the specified properties.
         * @function create
         * @memberof message.Ipacket
         * @static
         * @param {message.IIpacket=} [properties] Properties to set
         * @returns {message.Ipacket} Ipacket instance
         */
        Ipacket.create = function create(properties) {
            return new Ipacket(properties);
        };

        /**
         * Encodes the specified Ipacket message. Does not implicitly {@link message.Ipacket.verify|verify} messages.
         * @function encode
         * @memberof message.Ipacket
         * @static
         * @param {message.IIpacket} message Ipacket message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Ipacket.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Stx != null && Object.hasOwnProperty.call(message, "Stx"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.Stx);
            if (message.DestNodeType != null && Object.hasOwnProperty.call(message, "DestNodeType"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.DestNodeType);
            if (message.Ckx != null && Object.hasOwnProperty.call(message, "Ckx"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.Ckx);
            if (message.Id != null && Object.hasOwnProperty.call(message, "Id"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.Id);
            return writer;
        };

        /**
         * Encodes the specified Ipacket message, length delimited. Does not implicitly {@link message.Ipacket.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.Ipacket
         * @static
         * @param {message.IIpacket} message Ipacket message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Ipacket.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Ipacket message from the specified reader or buffer.
         * @function decode
         * @memberof message.Ipacket
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.Ipacket} Ipacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Ipacket.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.Ipacket();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Stx = reader.int32();
                    break;
                case 2:
                    message.DestNodeType = reader.int32();
                    break;
                case 3:
                    message.Ckx = reader.int32();
                    break;
                case 4:
                    message.Id = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Ipacket message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.Ipacket
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.Ipacket} Ipacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Ipacket.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Ipacket message.
         * @function verify
         * @memberof message.Ipacket
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Ipacket.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Stx != null && message.hasOwnProperty("Stx"))
                if (!$util.isInteger(message.Stx))
                    return "Stx: integer expected";
            if (message.DestNodeType != null && message.hasOwnProperty("DestNodeType"))
                switch (message.DestNodeType) {
                default:
                    return "DestNodeType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.Ckx != null && message.hasOwnProperty("Ckx"))
                if (!$util.isInteger(message.Ckx))
                    return "Ckx: integer expected";
            if (message.Id != null && message.hasOwnProperty("Id"))
                if (!$util.isInteger(message.Id))
                    return "Id: integer expected";
            return null;
        };

        /**
         * Creates an Ipacket message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.Ipacket
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.Ipacket} Ipacket
         */
        Ipacket.fromObject = function fromObject(object) {
            if (object instanceof $root.message.Ipacket)
                return object;
            var message = new $root.message.Ipacket();
            if (object.Stx != null)
                message.Stx = object.Stx | 0;
            switch (object.DestNodeType) {
            case "NONE":
            case 0:
                message.DestNodeType = 0;
                break;
            case "GATESERVER":
            case 1:
                message.DestNodeType = 1;
                break;
            case "ACCOUNTSERVER":
            case 2:
                message.DestNodeType = 2;
                break;
            case "WORLDSERVER":
            case 3:
                message.DestNodeType = 3;
                break;
            case "CORESERVER":
            case 4:
                message.DestNodeType = 4;
                break;
            case "FUNCSERVER":
            case 5:
                message.DestNodeType = 5;
                break;
            }
            if (object.Ckx != null)
                message.Ckx = object.Ckx | 0;
            if (object.Id != null)
                message.Id = object.Id >>> 0;
            return message;
        };

        /**
         * Creates a plain object from an Ipacket message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.Ipacket
         * @static
         * @param {message.Ipacket} message Ipacket
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Ipacket.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Stx = 0;
                object.DestNodeType = options.enums === String ? "NONE" : 0;
                object.Ckx = 0;
                object.Id = 0;
            }
            if (message.Stx != null && message.hasOwnProperty("Stx"))
                object.Stx = message.Stx;
            if (message.DestNodeType != null && message.hasOwnProperty("DestNodeType"))
                object.DestNodeType = options.enums === String ? $root.message.NODE[message.DestNodeType] : message.DestNodeType;
            if (message.Ckx != null && message.hasOwnProperty("Ckx"))
                object.Ckx = message.Ckx;
            if (message.Id != null && message.hasOwnProperty("Id"))
                object.Id = message.Id;
            return object;
        };

        /**
         * Converts this Ipacket to JSON.
         * @function toJSON
         * @memberof message.Ipacket
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Ipacket.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Ipacket;
    })();

    message.RpcHead = (function() {

        /**
         * Properties of a RpcHead.
         * @memberof message
         * @interface IRpcHead
         * @property {number|null} [ClientId] RpcHead ClientId
         * @property {string|null} [Key] RpcHead Key
         * @property {number|Long|null} [AccountId] RpcHead AccountId
         * @property {number|null} [fromNode] RpcHead fromNode
         * @property {number|null} [toNode] RpcHead toNode
         * @property {number|Long|null} [CallId] RpcHead CallId
         * @property {number|null} [SocketId] RpcHead SocketId
         */

        /**
         * Constructs a new RpcHead.
         * @memberof message
         * @classdesc Represents a RpcHead.
         * @implements IRpcHead
         * @constructor
         * @param {message.IRpcHead=} [properties] Properties to set
         */
        function RpcHead(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RpcHead ClientId.
         * @member {number} ClientId
         * @memberof message.RpcHead
         * @instance
         */
        RpcHead.prototype.ClientId = 0;

        /**
         * RpcHead Key.
         * @member {string} Key
         * @memberof message.RpcHead
         * @instance
         */
        RpcHead.prototype.Key = "";

        /**
         * RpcHead AccountId.
         * @member {number|Long} AccountId
         * @memberof message.RpcHead
         * @instance
         */
        RpcHead.prototype.AccountId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * RpcHead fromNode.
         * @member {number} fromNode
         * @memberof message.RpcHead
         * @instance
         */
        RpcHead.prototype.fromNode = 0;

        /**
         * RpcHead toNode.
         * @member {number} toNode
         * @memberof message.RpcHead
         * @instance
         */
        RpcHead.prototype.toNode = 0;

        /**
         * RpcHead CallId.
         * @member {number|Long} CallId
         * @memberof message.RpcHead
         * @instance
         */
        RpcHead.prototype.CallId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * RpcHead SocketId.
         * @member {number} SocketId
         * @memberof message.RpcHead
         * @instance
         */
        RpcHead.prototype.SocketId = 0;

        /**
         * Creates a new RpcHead instance using the specified properties.
         * @function create
         * @memberof message.RpcHead
         * @static
         * @param {message.IRpcHead=} [properties] Properties to set
         * @returns {message.RpcHead} RpcHead instance
         */
        RpcHead.create = function create(properties) {
            return new RpcHead(properties);
        };

        /**
         * Encodes the specified RpcHead message. Does not implicitly {@link message.RpcHead.verify|verify} messages.
         * @function encode
         * @memberof message.RpcHead
         * @static
         * @param {message.IRpcHead} message RpcHead message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RpcHead.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ClientId != null && Object.hasOwnProperty.call(message, "ClientId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.ClientId);
            if (message.Key != null && Object.hasOwnProperty.call(message, "Key"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.Key);
            if (message.AccountId != null && Object.hasOwnProperty.call(message, "AccountId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.AccountId);
            if (message.fromNode != null && Object.hasOwnProperty.call(message, "fromNode"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.fromNode);
            if (message.toNode != null && Object.hasOwnProperty.call(message, "toNode"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.toNode);
            if (message.CallId != null && Object.hasOwnProperty.call(message, "CallId"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.CallId);
            if (message.SocketId != null && Object.hasOwnProperty.call(message, "SocketId"))
                writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.SocketId);
            return writer;
        };

        /**
         * Encodes the specified RpcHead message, length delimited. Does not implicitly {@link message.RpcHead.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.RpcHead
         * @static
         * @param {message.IRpcHead} message RpcHead message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RpcHead.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RpcHead message from the specified reader or buffer.
         * @function decode
         * @memberof message.RpcHead
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.RpcHead} RpcHead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RpcHead.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.RpcHead();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.ClientId = reader.uint32();
                    break;
                case 2:
                    message.Key = reader.string();
                    break;
                case 3:
                    message.AccountId = reader.int64();
                    break;
                case 4:
                    message.fromNode = reader.int32();
                    break;
                case 5:
                    message.toNode = reader.int32();
                    break;
                case 6:
                    message.CallId = reader.int64();
                    break;
                case 7:
                    message.SocketId = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RpcHead message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.RpcHead
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.RpcHead} RpcHead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RpcHead.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RpcHead message.
         * @function verify
         * @memberof message.RpcHead
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RpcHead.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.ClientId != null && message.hasOwnProperty("ClientId"))
                if (!$util.isInteger(message.ClientId))
                    return "ClientId: integer expected";
            if (message.Key != null && message.hasOwnProperty("Key"))
                if (!$util.isString(message.Key))
                    return "Key: string expected";
            if (message.AccountId != null && message.hasOwnProperty("AccountId"))
                if (!$util.isInteger(message.AccountId) && !(message.AccountId && $util.isInteger(message.AccountId.low) && $util.isInteger(message.AccountId.high)))
                    return "AccountId: integer|Long expected";
            if (message.fromNode != null && message.hasOwnProperty("fromNode"))
                if (!$util.isInteger(message.fromNode))
                    return "fromNode: integer expected";
            if (message.toNode != null && message.hasOwnProperty("toNode"))
                if (!$util.isInteger(message.toNode))
                    return "toNode: integer expected";
            if (message.CallId != null && message.hasOwnProperty("CallId"))
                if (!$util.isInteger(message.CallId) && !(message.CallId && $util.isInteger(message.CallId.low) && $util.isInteger(message.CallId.high)))
                    return "CallId: integer|Long expected";
            if (message.SocketId != null && message.hasOwnProperty("SocketId"))
                if (!$util.isInteger(message.SocketId))
                    return "SocketId: integer expected";
            return null;
        };

        /**
         * Creates a RpcHead message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.RpcHead
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.RpcHead} RpcHead
         */
        RpcHead.fromObject = function fromObject(object) {
            if (object instanceof $root.message.RpcHead)
                return object;
            var message = new $root.message.RpcHead();
            if (object.ClientId != null)
                message.ClientId = object.ClientId >>> 0;
            if (object.Key != null)
                message.Key = String(object.Key);
            if (object.AccountId != null)
                if ($util.Long)
                    (message.AccountId = $util.Long.fromValue(object.AccountId)).unsigned = false;
                else if (typeof object.AccountId === "string")
                    message.AccountId = parseInt(object.AccountId, 10);
                else if (typeof object.AccountId === "number")
                    message.AccountId = object.AccountId;
                else if (typeof object.AccountId === "object")
                    message.AccountId = new $util.LongBits(object.AccountId.low >>> 0, object.AccountId.high >>> 0).toNumber();
            if (object.fromNode != null)
                message.fromNode = object.fromNode | 0;
            if (object.toNode != null)
                message.toNode = object.toNode | 0;
            if (object.CallId != null)
                if ($util.Long)
                    (message.CallId = $util.Long.fromValue(object.CallId)).unsigned = false;
                else if (typeof object.CallId === "string")
                    message.CallId = parseInt(object.CallId, 10);
                else if (typeof object.CallId === "number")
                    message.CallId = object.CallId;
                else if (typeof object.CallId === "object")
                    message.CallId = new $util.LongBits(object.CallId.low >>> 0, object.CallId.high >>> 0).toNumber();
            if (object.SocketId != null)
                message.SocketId = object.SocketId >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a RpcHead message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.RpcHead
         * @static
         * @param {message.RpcHead} message RpcHead
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RpcHead.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.ClientId = 0;
                object.Key = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.AccountId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.AccountId = options.longs === String ? "0" : 0;
                object.fromNode = 0;
                object.toNode = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.CallId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.CallId = options.longs === String ? "0" : 0;
                object.SocketId = 0;
            }
            if (message.ClientId != null && message.hasOwnProperty("ClientId"))
                object.ClientId = message.ClientId;
            if (message.Key != null && message.hasOwnProperty("Key"))
                object.Key = message.Key;
            if (message.AccountId != null && message.hasOwnProperty("AccountId"))
                if (typeof message.AccountId === "number")
                    object.AccountId = options.longs === String ? String(message.AccountId) : message.AccountId;
                else
                    object.AccountId = options.longs === String ? $util.Long.prototype.toString.call(message.AccountId) : options.longs === Number ? new $util.LongBits(message.AccountId.low >>> 0, message.AccountId.high >>> 0).toNumber() : message.AccountId;
            if (message.fromNode != null && message.hasOwnProperty("fromNode"))
                object.fromNode = message.fromNode;
            if (message.toNode != null && message.hasOwnProperty("toNode"))
                object.toNode = message.toNode;
            if (message.CallId != null && message.hasOwnProperty("CallId"))
                if (typeof message.CallId === "number")
                    object.CallId = options.longs === String ? String(message.CallId) : message.CallId;
                else
                    object.CallId = options.longs === String ? $util.Long.prototype.toString.call(message.CallId) : options.longs === Number ? new $util.LongBits(message.CallId.low >>> 0, message.CallId.high >>> 0).toNumber() : message.CallId;
            if (message.SocketId != null && message.hasOwnProperty("SocketId"))
                object.SocketId = message.SocketId;
            return object;
        };

        /**
         * Converts this RpcHead to JSON.
         * @function toJSON
         * @memberof message.RpcHead
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RpcHead.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RpcHead;
    })();

    message.RpcPacket = (function() {

        /**
         * Properties of a RpcPacket.
         * @memberof message
         * @interface IRpcPacket
         * @property {string|null} [FuncName] RpcPacket FuncName
         * @property {number|null} [ArgLen] RpcPacket ArgLen
         * @property {message.IRpcHead|null} [RpcHead] RpcPacket RpcHead
         * @property {Uint8Array|null} [RpcBody] RpcPacket RpcBody
         */

        /**
         * Constructs a new RpcPacket.
         * @memberof message
         * @classdesc Represents a RpcPacket.
         * @implements IRpcPacket
         * @constructor
         * @param {message.IRpcPacket=} [properties] Properties to set
         */
        function RpcPacket(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RpcPacket FuncName.
         * @member {string} FuncName
         * @memberof message.RpcPacket
         * @instance
         */
        RpcPacket.prototype.FuncName = "";

        /**
         * RpcPacket ArgLen.
         * @member {number} ArgLen
         * @memberof message.RpcPacket
         * @instance
         */
        RpcPacket.prototype.ArgLen = 0;

        /**
         * RpcPacket RpcHead.
         * @member {message.IRpcHead|null|undefined} RpcHead
         * @memberof message.RpcPacket
         * @instance
         */
        RpcPacket.prototype.RpcHead = null;

        /**
         * RpcPacket RpcBody.
         * @member {Uint8Array} RpcBody
         * @memberof message.RpcPacket
         * @instance
         */
        RpcPacket.prototype.RpcBody = $util.newBuffer([]);

        /**
         * Creates a new RpcPacket instance using the specified properties.
         * @function create
         * @memberof message.RpcPacket
         * @static
         * @param {message.IRpcPacket=} [properties] Properties to set
         * @returns {message.RpcPacket} RpcPacket instance
         */
        RpcPacket.create = function create(properties) {
            return new RpcPacket(properties);
        };

        /**
         * Encodes the specified RpcPacket message. Does not implicitly {@link message.RpcPacket.verify|verify} messages.
         * @function encode
         * @memberof message.RpcPacket
         * @static
         * @param {message.IRpcPacket} message RpcPacket message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RpcPacket.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.FuncName != null && Object.hasOwnProperty.call(message, "FuncName"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.FuncName);
            if (message.ArgLen != null && Object.hasOwnProperty.call(message, "ArgLen"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.ArgLen);
            if (message.RpcHead != null && Object.hasOwnProperty.call(message, "RpcHead"))
                $root.message.RpcHead.encode(message.RpcHead, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.RpcBody != null && Object.hasOwnProperty.call(message, "RpcBody"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.RpcBody);
            return writer;
        };

        /**
         * Encodes the specified RpcPacket message, length delimited. Does not implicitly {@link message.RpcPacket.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.RpcPacket
         * @static
         * @param {message.IRpcPacket} message RpcPacket message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RpcPacket.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RpcPacket message from the specified reader or buffer.
         * @function decode
         * @memberof message.RpcPacket
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.RpcPacket} RpcPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RpcPacket.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.RpcPacket();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.FuncName = reader.string();
                    break;
                case 2:
                    message.ArgLen = reader.int32();
                    break;
                case 3:
                    message.RpcHead = $root.message.RpcHead.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.RpcBody = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RpcPacket message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.RpcPacket
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.RpcPacket} RpcPacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RpcPacket.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RpcPacket message.
         * @function verify
         * @memberof message.RpcPacket
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RpcPacket.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.FuncName != null && message.hasOwnProperty("FuncName"))
                if (!$util.isString(message.FuncName))
                    return "FuncName: string expected";
            if (message.ArgLen != null && message.hasOwnProperty("ArgLen"))
                if (!$util.isInteger(message.ArgLen))
                    return "ArgLen: integer expected";
            if (message.RpcHead != null && message.hasOwnProperty("RpcHead")) {
                var error = $root.message.RpcHead.verify(message.RpcHead);
                if (error)
                    return "RpcHead." + error;
            }
            if (message.RpcBody != null && message.hasOwnProperty("RpcBody"))
                if (!(message.RpcBody && typeof message.RpcBody.length === "number" || $util.isString(message.RpcBody)))
                    return "RpcBody: buffer expected";
            return null;
        };

        /**
         * Creates a RpcPacket message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.RpcPacket
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.RpcPacket} RpcPacket
         */
        RpcPacket.fromObject = function fromObject(object) {
            if (object instanceof $root.message.RpcPacket)
                return object;
            var message = new $root.message.RpcPacket();
            if (object.FuncName != null)
                message.FuncName = String(object.FuncName);
            if (object.ArgLen != null)
                message.ArgLen = object.ArgLen | 0;
            if (object.RpcHead != null) {
                if (typeof object.RpcHead !== "object")
                    throw TypeError(".message.RpcPacket.RpcHead: object expected");
                message.RpcHead = $root.message.RpcHead.fromObject(object.RpcHead);
            }
            if (object.RpcBody != null)
                if (typeof object.RpcBody === "string")
                    $util.base64.decode(object.RpcBody, message.RpcBody = $util.newBuffer($util.base64.length(object.RpcBody)), 0);
                else if (object.RpcBody.length)
                    message.RpcBody = object.RpcBody;
            return message;
        };

        /**
         * Creates a plain object from a RpcPacket message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.RpcPacket
         * @static
         * @param {message.RpcPacket} message RpcPacket
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RpcPacket.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.FuncName = "";
                object.ArgLen = 0;
                object.RpcHead = null;
                if (options.bytes === String)
                    object.RpcBody = "";
                else {
                    object.RpcBody = [];
                    if (options.bytes !== Array)
                        object.RpcBody = $util.newBuffer(object.RpcBody);
                }
            }
            if (message.FuncName != null && message.hasOwnProperty("FuncName"))
                object.FuncName = message.FuncName;
            if (message.ArgLen != null && message.hasOwnProperty("ArgLen"))
                object.ArgLen = message.ArgLen;
            if (message.RpcHead != null && message.hasOwnProperty("RpcHead"))
                object.RpcHead = $root.message.RpcHead.toObject(message.RpcHead, options);
            if (message.RpcBody != null && message.hasOwnProperty("RpcBody"))
                object.RpcBody = options.bytes === String ? $util.base64.encode(message.RpcBody, 0, message.RpcBody.length) : options.bytes === Array ? Array.prototype.slice.call(message.RpcBody) : message.RpcBody;
            return object;
        };

        /**
         * Converts this RpcPacket to JSON.
         * @function toJSON
         * @memberof message.RpcPacket
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RpcPacket.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RpcPacket;
    })();

    message.RequestLike = (function() {

        /**
         * Properties of a RequestLike.
         * @memberof message
         * @interface IRequestLike
         * @property {number|null} [num] RequestLike num
         */

        /**
         * Constructs a new RequestLike.
         * @memberof message
         * @classdesc Represents a RequestLike.
         * @implements IRequestLike
         * @constructor
         * @param {message.IRequestLike=} [properties] Properties to set
         */
        function RequestLike(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RequestLike num.
         * @member {number} num
         * @memberof message.RequestLike
         * @instance
         */
        RequestLike.prototype.num = 0;

        /**
         * Creates a new RequestLike instance using the specified properties.
         * @function create
         * @memberof message.RequestLike
         * @static
         * @param {message.IRequestLike=} [properties] Properties to set
         * @returns {message.RequestLike} RequestLike instance
         */
        RequestLike.create = function create(properties) {
            return new RequestLike(properties);
        };

        /**
         * Encodes the specified RequestLike message. Does not implicitly {@link message.RequestLike.verify|verify} messages.
         * @function encode
         * @memberof message.RequestLike
         * @static
         * @param {message.IRequestLike} message RequestLike message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RequestLike.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.num != null && Object.hasOwnProperty.call(message, "num"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.num);
            return writer;
        };

        /**
         * Encodes the specified RequestLike message, length delimited. Does not implicitly {@link message.RequestLike.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.RequestLike
         * @static
         * @param {message.IRequestLike} message RequestLike message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RequestLike.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RequestLike message from the specified reader or buffer.
         * @function decode
         * @memberof message.RequestLike
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.RequestLike} RequestLike
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RequestLike.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.RequestLike();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.num = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RequestLike message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.RequestLike
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.RequestLike} RequestLike
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RequestLike.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RequestLike message.
         * @function verify
         * @memberof message.RequestLike
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RequestLike.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.num != null && message.hasOwnProperty("num"))
                if (!$util.isInteger(message.num))
                    return "num: integer expected";
            return null;
        };

        /**
         * Creates a RequestLike message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.RequestLike
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.RequestLike} RequestLike
         */
        RequestLike.fromObject = function fromObject(object) {
            if (object instanceof $root.message.RequestLike)
                return object;
            var message = new $root.message.RequestLike();
            if (object.num != null)
                message.num = object.num >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a RequestLike message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.RequestLike
         * @static
         * @param {message.RequestLike} message RequestLike
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RequestLike.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.num = 0;
            if (message.num != null && message.hasOwnProperty("num"))
                object.num = message.num;
            return object;
        };

        /**
         * Converts this RequestLike to JSON.
         * @function toJSON
         * @memberof message.RequestLike
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RequestLike.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RequestLike;
    })();

    message.RequestSendGift = (function() {

        /**
         * Properties of a RequestSendGift.
         * @memberof message
         * @interface IRequestSendGift
         * @property {number|Long|null} [giftTpId] RequestSendGift giftTpId
         * @property {number|null} [num] RequestSendGift num
         * @property {number|Long|null} [target] RequestSendGift target
         */

        /**
         * Constructs a new RequestSendGift.
         * @memberof message
         * @classdesc Represents a RequestSendGift.
         * @implements IRequestSendGift
         * @constructor
         * @param {message.IRequestSendGift=} [properties] Properties to set
         */
        function RequestSendGift(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RequestSendGift giftTpId.
         * @member {number|Long} giftTpId
         * @memberof message.RequestSendGift
         * @instance
         */
        RequestSendGift.prototype.giftTpId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * RequestSendGift num.
         * @member {number} num
         * @memberof message.RequestSendGift
         * @instance
         */
        RequestSendGift.prototype.num = 0;

        /**
         * RequestSendGift target.
         * @member {number|Long} target
         * @memberof message.RequestSendGift
         * @instance
         */
        RequestSendGift.prototype.target = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new RequestSendGift instance using the specified properties.
         * @function create
         * @memberof message.RequestSendGift
         * @static
         * @param {message.IRequestSendGift=} [properties] Properties to set
         * @returns {message.RequestSendGift} RequestSendGift instance
         */
        RequestSendGift.create = function create(properties) {
            return new RequestSendGift(properties);
        };

        /**
         * Encodes the specified RequestSendGift message. Does not implicitly {@link message.RequestSendGift.verify|verify} messages.
         * @function encode
         * @memberof message.RequestSendGift
         * @static
         * @param {message.IRequestSendGift} message RequestSendGift message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RequestSendGift.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.giftTpId != null && Object.hasOwnProperty.call(message, "giftTpId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.giftTpId);
            if (message.num != null && Object.hasOwnProperty.call(message, "num"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.num);
            if (message.target != null && Object.hasOwnProperty.call(message, "target"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.target);
            return writer;
        };

        /**
         * Encodes the specified RequestSendGift message, length delimited. Does not implicitly {@link message.RequestSendGift.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.RequestSendGift
         * @static
         * @param {message.IRequestSendGift} message RequestSendGift message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RequestSendGift.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RequestSendGift message from the specified reader or buffer.
         * @function decode
         * @memberof message.RequestSendGift
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.RequestSendGift} RequestSendGift
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RequestSendGift.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.RequestSendGift();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.giftTpId = reader.int64();
                    break;
                case 2:
                    message.num = reader.uint32();
                    break;
                case 3:
                    message.target = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RequestSendGift message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.RequestSendGift
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.RequestSendGift} RequestSendGift
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RequestSendGift.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RequestSendGift message.
         * @function verify
         * @memberof message.RequestSendGift
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RequestSendGift.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.giftTpId != null && message.hasOwnProperty("giftTpId"))
                if (!$util.isInteger(message.giftTpId) && !(message.giftTpId && $util.isInteger(message.giftTpId.low) && $util.isInteger(message.giftTpId.high)))
                    return "giftTpId: integer|Long expected";
            if (message.num != null && message.hasOwnProperty("num"))
                if (!$util.isInteger(message.num))
                    return "num: integer expected";
            if (message.target != null && message.hasOwnProperty("target"))
                if (!$util.isInteger(message.target) && !(message.target && $util.isInteger(message.target.low) && $util.isInteger(message.target.high)))
                    return "target: integer|Long expected";
            return null;
        };

        /**
         * Creates a RequestSendGift message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.RequestSendGift
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.RequestSendGift} RequestSendGift
         */
        RequestSendGift.fromObject = function fromObject(object) {
            if (object instanceof $root.message.RequestSendGift)
                return object;
            var message = new $root.message.RequestSendGift();
            if (object.giftTpId != null)
                if ($util.Long)
                    (message.giftTpId = $util.Long.fromValue(object.giftTpId)).unsigned = false;
                else if (typeof object.giftTpId === "string")
                    message.giftTpId = parseInt(object.giftTpId, 10);
                else if (typeof object.giftTpId === "number")
                    message.giftTpId = object.giftTpId;
                else if (typeof object.giftTpId === "object")
                    message.giftTpId = new $util.LongBits(object.giftTpId.low >>> 0, object.giftTpId.high >>> 0).toNumber();
            if (object.num != null)
                message.num = object.num >>> 0;
            if (object.target != null)
                if ($util.Long)
                    (message.target = $util.Long.fromValue(object.target)).unsigned = false;
                else if (typeof object.target === "string")
                    message.target = parseInt(object.target, 10);
                else if (typeof object.target === "number")
                    message.target = object.target;
                else if (typeof object.target === "object")
                    message.target = new $util.LongBits(object.target.low >>> 0, object.target.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a RequestSendGift message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.RequestSendGift
         * @static
         * @param {message.RequestSendGift} message RequestSendGift
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RequestSendGift.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.giftTpId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.giftTpId = options.longs === String ? "0" : 0;
                object.num = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.target = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.target = options.longs === String ? "0" : 0;
            }
            if (message.giftTpId != null && message.hasOwnProperty("giftTpId"))
                if (typeof message.giftTpId === "number")
                    object.giftTpId = options.longs === String ? String(message.giftTpId) : message.giftTpId;
                else
                    object.giftTpId = options.longs === String ? $util.Long.prototype.toString.call(message.giftTpId) : options.longs === Number ? new $util.LongBits(message.giftTpId.low >>> 0, message.giftTpId.high >>> 0).toNumber() : message.giftTpId;
            if (message.num != null && message.hasOwnProperty("num"))
                object.num = message.num;
            if (message.target != null && message.hasOwnProperty("target"))
                if (typeof message.target === "number")
                    object.target = options.longs === String ? String(message.target) : message.target;
                else
                    object.target = options.longs === String ? $util.Long.prototype.toString.call(message.target) : options.longs === Number ? new $util.LongBits(message.target.low >>> 0, message.target.high >>> 0).toNumber() : message.target;
            return object;
        };

        /**
         * Converts this RequestSendGift to JSON.
         * @function toJSON
         * @memberof message.RequestSendGift
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RequestSendGift.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RequestSendGift;
    })();

    message.RequestSendHongbao = (function() {

        /**
         * Properties of a RequestSendHongbao.
         * @memberof message
         * @interface IRequestSendHongbao
         * @property {number|Long|null} [giftTpId] RequestSendHongbao giftTpId
         * @property {number|null} [delayMinute] RequestSendHongbao delayMinute
         */

        /**
         * Constructs a new RequestSendHongbao.
         * @memberof message
         * @classdesc Represents a RequestSendHongbao.
         * @implements IRequestSendHongbao
         * @constructor
         * @param {message.IRequestSendHongbao=} [properties] Properties to set
         */
        function RequestSendHongbao(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RequestSendHongbao giftTpId.
         * @member {number|Long} giftTpId
         * @memberof message.RequestSendHongbao
         * @instance
         */
        RequestSendHongbao.prototype.giftTpId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * RequestSendHongbao delayMinute.
         * @member {number} delayMinute
         * @memberof message.RequestSendHongbao
         * @instance
         */
        RequestSendHongbao.prototype.delayMinute = 0;

        /**
         * Creates a new RequestSendHongbao instance using the specified properties.
         * @function create
         * @memberof message.RequestSendHongbao
         * @static
         * @param {message.IRequestSendHongbao=} [properties] Properties to set
         * @returns {message.RequestSendHongbao} RequestSendHongbao instance
         */
        RequestSendHongbao.create = function create(properties) {
            return new RequestSendHongbao(properties);
        };

        /**
         * Encodes the specified RequestSendHongbao message. Does not implicitly {@link message.RequestSendHongbao.verify|verify} messages.
         * @function encode
         * @memberof message.RequestSendHongbao
         * @static
         * @param {message.IRequestSendHongbao} message RequestSendHongbao message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RequestSendHongbao.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.giftTpId != null && Object.hasOwnProperty.call(message, "giftTpId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.giftTpId);
            if (message.delayMinute != null && Object.hasOwnProperty.call(message, "delayMinute"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.delayMinute);
            return writer;
        };

        /**
         * Encodes the specified RequestSendHongbao message, length delimited. Does not implicitly {@link message.RequestSendHongbao.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.RequestSendHongbao
         * @static
         * @param {message.IRequestSendHongbao} message RequestSendHongbao message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RequestSendHongbao.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RequestSendHongbao message from the specified reader or buffer.
         * @function decode
         * @memberof message.RequestSendHongbao
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.RequestSendHongbao} RequestSendHongbao
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RequestSendHongbao.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.RequestSendHongbao();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.giftTpId = reader.int64();
                    break;
                case 2:
                    message.delayMinute = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RequestSendHongbao message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.RequestSendHongbao
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.RequestSendHongbao} RequestSendHongbao
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RequestSendHongbao.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RequestSendHongbao message.
         * @function verify
         * @memberof message.RequestSendHongbao
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RequestSendHongbao.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.giftTpId != null && message.hasOwnProperty("giftTpId"))
                if (!$util.isInteger(message.giftTpId) && !(message.giftTpId && $util.isInteger(message.giftTpId.low) && $util.isInteger(message.giftTpId.high)))
                    return "giftTpId: integer|Long expected";
            if (message.delayMinute != null && message.hasOwnProperty("delayMinute"))
                if (!$util.isInteger(message.delayMinute))
                    return "delayMinute: integer expected";
            return null;
        };

        /**
         * Creates a RequestSendHongbao message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.RequestSendHongbao
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.RequestSendHongbao} RequestSendHongbao
         */
        RequestSendHongbao.fromObject = function fromObject(object) {
            if (object instanceof $root.message.RequestSendHongbao)
                return object;
            var message = new $root.message.RequestSendHongbao();
            if (object.giftTpId != null)
                if ($util.Long)
                    (message.giftTpId = $util.Long.fromValue(object.giftTpId)).unsigned = false;
                else if (typeof object.giftTpId === "string")
                    message.giftTpId = parseInt(object.giftTpId, 10);
                else if (typeof object.giftTpId === "number")
                    message.giftTpId = object.giftTpId;
                else if (typeof object.giftTpId === "object")
                    message.giftTpId = new $util.LongBits(object.giftTpId.low >>> 0, object.giftTpId.high >>> 0).toNumber();
            if (object.delayMinute != null)
                message.delayMinute = object.delayMinute >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a RequestSendHongbao message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.RequestSendHongbao
         * @static
         * @param {message.RequestSendHongbao} message RequestSendHongbao
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RequestSendHongbao.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.giftTpId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.giftTpId = options.longs === String ? "0" : 0;
                object.delayMinute = 0;
            }
            if (message.giftTpId != null && message.hasOwnProperty("giftTpId"))
                if (typeof message.giftTpId === "number")
                    object.giftTpId = options.longs === String ? String(message.giftTpId) : message.giftTpId;
                else
                    object.giftTpId = options.longs === String ? $util.Long.prototype.toString.call(message.giftTpId) : options.longs === Number ? new $util.LongBits(message.giftTpId.low >>> 0, message.giftTpId.high >>> 0).toNumber() : message.giftTpId;
            if (message.delayMinute != null && message.hasOwnProperty("delayMinute"))
                object.delayMinute = message.delayMinute;
            return object;
        };

        /**
         * Converts this RequestSendHongbao to JSON.
         * @function toJSON
         * @memberof message.RequestSendHongbao
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RequestSendHongbao.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RequestSendHongbao;
    })();

    message.RequestGrabHongbao = (function() {

        /**
         * Properties of a RequestGrabHongbao.
         * @memberof message
         * @interface IRequestGrabHongbao
         * @property {number|Long|null} [hongbaoId] RequestGrabHongbao hongbaoId
         */

        /**
         * Constructs a new RequestGrabHongbao.
         * @memberof message
         * @classdesc Represents a RequestGrabHongbao.
         * @implements IRequestGrabHongbao
         * @constructor
         * @param {message.IRequestGrabHongbao=} [properties] Properties to set
         */
        function RequestGrabHongbao(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RequestGrabHongbao hongbaoId.
         * @member {number|Long} hongbaoId
         * @memberof message.RequestGrabHongbao
         * @instance
         */
        RequestGrabHongbao.prototype.hongbaoId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new RequestGrabHongbao instance using the specified properties.
         * @function create
         * @memberof message.RequestGrabHongbao
         * @static
         * @param {message.IRequestGrabHongbao=} [properties] Properties to set
         * @returns {message.RequestGrabHongbao} RequestGrabHongbao instance
         */
        RequestGrabHongbao.create = function create(properties) {
            return new RequestGrabHongbao(properties);
        };

        /**
         * Encodes the specified RequestGrabHongbao message. Does not implicitly {@link message.RequestGrabHongbao.verify|verify} messages.
         * @function encode
         * @memberof message.RequestGrabHongbao
         * @static
         * @param {message.IRequestGrabHongbao} message RequestGrabHongbao message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RequestGrabHongbao.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.hongbaoId != null && Object.hasOwnProperty.call(message, "hongbaoId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.hongbaoId);
            return writer;
        };

        /**
         * Encodes the specified RequestGrabHongbao message, length delimited. Does not implicitly {@link message.RequestGrabHongbao.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.RequestGrabHongbao
         * @static
         * @param {message.IRequestGrabHongbao} message RequestGrabHongbao message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RequestGrabHongbao.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RequestGrabHongbao message from the specified reader or buffer.
         * @function decode
         * @memberof message.RequestGrabHongbao
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.RequestGrabHongbao} RequestGrabHongbao
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RequestGrabHongbao.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.RequestGrabHongbao();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.hongbaoId = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RequestGrabHongbao message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.RequestGrabHongbao
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.RequestGrabHongbao} RequestGrabHongbao
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RequestGrabHongbao.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RequestGrabHongbao message.
         * @function verify
         * @memberof message.RequestGrabHongbao
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RequestGrabHongbao.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.hongbaoId != null && message.hasOwnProperty("hongbaoId"))
                if (!$util.isInteger(message.hongbaoId) && !(message.hongbaoId && $util.isInteger(message.hongbaoId.low) && $util.isInteger(message.hongbaoId.high)))
                    return "hongbaoId: integer|Long expected";
            return null;
        };

        /**
         * Creates a RequestGrabHongbao message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.RequestGrabHongbao
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.RequestGrabHongbao} RequestGrabHongbao
         */
        RequestGrabHongbao.fromObject = function fromObject(object) {
            if (object instanceof $root.message.RequestGrabHongbao)
                return object;
            var message = new $root.message.RequestGrabHongbao();
            if (object.hongbaoId != null)
                if ($util.Long)
                    (message.hongbaoId = $util.Long.fromValue(object.hongbaoId)).unsigned = false;
                else if (typeof object.hongbaoId === "string")
                    message.hongbaoId = parseInt(object.hongbaoId, 10);
                else if (typeof object.hongbaoId === "number")
                    message.hongbaoId = object.hongbaoId;
                else if (typeof object.hongbaoId === "object")
                    message.hongbaoId = new $util.LongBits(object.hongbaoId.low >>> 0, object.hongbaoId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a RequestGrabHongbao message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.RequestGrabHongbao
         * @static
         * @param {message.RequestGrabHongbao} message RequestGrabHongbao
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RequestGrabHongbao.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.hongbaoId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.hongbaoId = options.longs === String ? "0" : 0;
            if (message.hongbaoId != null && message.hasOwnProperty("hongbaoId"))
                if (typeof message.hongbaoId === "number")
                    object.hongbaoId = options.longs === String ? String(message.hongbaoId) : message.hongbaoId;
                else
                    object.hongbaoId = options.longs === String ? $util.Long.prototype.toString.call(message.hongbaoId) : options.longs === Number ? new $util.LongBits(message.hongbaoId.low >>> 0, message.hongbaoId.high >>> 0).toNumber() : message.hongbaoId;
            return object;
        };

        /**
         * Converts this RequestGrabHongbao to JSON.
         * @function toJSON
         * @memberof message.RequestGrabHongbao
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RequestGrabHongbao.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RequestGrabHongbao;
    })();

    message.RequestSendChatMessage = (function() {

        /**
         * Properties of a RequestSendChatMessage.
         * @memberof message
         * @interface IRequestSendChatMessage
         * @property {string|null} [content] RequestSendChatMessage content
         */

        /**
         * Constructs a new RequestSendChatMessage.
         * @memberof message
         * @classdesc Represents a RequestSendChatMessage.
         * @implements IRequestSendChatMessage
         * @constructor
         * @param {message.IRequestSendChatMessage=} [properties] Properties to set
         */
        function RequestSendChatMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RequestSendChatMessage content.
         * @member {string} content
         * @memberof message.RequestSendChatMessage
         * @instance
         */
        RequestSendChatMessage.prototype.content = "";

        /**
         * Creates a new RequestSendChatMessage instance using the specified properties.
         * @function create
         * @memberof message.RequestSendChatMessage
         * @static
         * @param {message.IRequestSendChatMessage=} [properties] Properties to set
         * @returns {message.RequestSendChatMessage} RequestSendChatMessage instance
         */
        RequestSendChatMessage.create = function create(properties) {
            return new RequestSendChatMessage(properties);
        };

        /**
         * Encodes the specified RequestSendChatMessage message. Does not implicitly {@link message.RequestSendChatMessage.verify|verify} messages.
         * @function encode
         * @memberof message.RequestSendChatMessage
         * @static
         * @param {message.IRequestSendChatMessage} message RequestSendChatMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RequestSendChatMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.content);
            return writer;
        };

        /**
         * Encodes the specified RequestSendChatMessage message, length delimited. Does not implicitly {@link message.RequestSendChatMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.RequestSendChatMessage
         * @static
         * @param {message.IRequestSendChatMessage} message RequestSendChatMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RequestSendChatMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RequestSendChatMessage message from the specified reader or buffer.
         * @function decode
         * @memberof message.RequestSendChatMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.RequestSendChatMessage} RequestSendChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RequestSendChatMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.RequestSendChatMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.content = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RequestSendChatMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.RequestSendChatMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.RequestSendChatMessage} RequestSendChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RequestSendChatMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RequestSendChatMessage message.
         * @function verify
         * @memberof message.RequestSendChatMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RequestSendChatMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.content != null && message.hasOwnProperty("content"))
                if (!$util.isString(message.content))
                    return "content: string expected";
            return null;
        };

        /**
         * Creates a RequestSendChatMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.RequestSendChatMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.RequestSendChatMessage} RequestSendChatMessage
         */
        RequestSendChatMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.message.RequestSendChatMessage)
                return object;
            var message = new $root.message.RequestSendChatMessage();
            if (object.content != null)
                message.content = String(object.content);
            return message;
        };

        /**
         * Creates a plain object from a RequestSendChatMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.RequestSendChatMessage
         * @static
         * @param {message.RequestSendChatMessage} message RequestSendChatMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RequestSendChatMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.content = "";
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = message.content;
            return object;
        };

        /**
         * Converts this RequestSendChatMessage to JSON.
         * @function toJSON
         * @memberof message.RequestSendChatMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RequestSendChatMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RequestSendChatMessage;
    })();

    message.BackLike = (function() {

        /**
         * Properties of a BackLike.
         * @memberof message
         * @interface IBackLike
         * @property {string|null} [msg] BackLike msg
         */

        /**
         * Constructs a new BackLike.
         * @memberof message
         * @classdesc Represents a BackLike.
         * @implements IBackLike
         * @constructor
         * @param {message.IBackLike=} [properties] Properties to set
         */
        function BackLike(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BackLike msg.
         * @member {string} msg
         * @memberof message.BackLike
         * @instance
         */
        BackLike.prototype.msg = "";

        /**
         * Creates a new BackLike instance using the specified properties.
         * @function create
         * @memberof message.BackLike
         * @static
         * @param {message.IBackLike=} [properties] Properties to set
         * @returns {message.BackLike} BackLike instance
         */
        BackLike.create = function create(properties) {
            return new BackLike(properties);
        };

        /**
         * Encodes the specified BackLike message. Does not implicitly {@link message.BackLike.verify|verify} messages.
         * @function encode
         * @memberof message.BackLike
         * @static
         * @param {message.IBackLike} message BackLike message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BackLike.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.msg);
            return writer;
        };

        /**
         * Encodes the specified BackLike message, length delimited. Does not implicitly {@link message.BackLike.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.BackLike
         * @static
         * @param {message.IBackLike} message BackLike message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BackLike.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BackLike message from the specified reader or buffer.
         * @function decode
         * @memberof message.BackLike
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.BackLike} BackLike
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BackLike.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.BackLike();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.msg = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BackLike message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.BackLike
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.BackLike} BackLike
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BackLike.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BackLike message.
         * @function verify
         * @memberof message.BackLike
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BackLike.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.msg != null && message.hasOwnProperty("msg"))
                if (!$util.isString(message.msg))
                    return "msg: string expected";
            return null;
        };

        /**
         * Creates a BackLike message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.BackLike
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.BackLike} BackLike
         */
        BackLike.fromObject = function fromObject(object) {
            if (object instanceof $root.message.BackLike)
                return object;
            var message = new $root.message.BackLike();
            if (object.msg != null)
                message.msg = String(object.msg);
            return message;
        };

        /**
         * Creates a plain object from a BackLike message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.BackLike
         * @static
         * @param {message.BackLike} message BackLike
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BackLike.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.msg = "";
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = message.msg;
            return object;
        };

        /**
         * Converts this BackLike to JSON.
         * @function toJSON
         * @memberof message.BackLike
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BackLike.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BackLike;
    })();

    message.BroadCastLike = (function() {

        /**
         * Properties of a BroadCastLike.
         * @memberof message
         * @interface IBroadCastLike
         * @property {Array.<message.BroadCastLike.IUserLike>|null} [list] BroadCastLike list
         * @property {number|null} [finalLikeNum] BroadCastLike finalLikeNum
         */

        /**
         * Constructs a new BroadCastLike.
         * @memberof message
         * @classdesc Represents a BroadCastLike.
         * @implements IBroadCastLike
         * @constructor
         * @param {message.IBroadCastLike=} [properties] Properties to set
         */
        function BroadCastLike(properties) {
            this.list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BroadCastLike list.
         * @member {Array.<message.BroadCastLike.IUserLike>} list
         * @memberof message.BroadCastLike
         * @instance
         */
        BroadCastLike.prototype.list = $util.emptyArray;

        /**
         * BroadCastLike finalLikeNum.
         * @member {number} finalLikeNum
         * @memberof message.BroadCastLike
         * @instance
         */
        BroadCastLike.prototype.finalLikeNum = 0;

        /**
         * Creates a new BroadCastLike instance using the specified properties.
         * @function create
         * @memberof message.BroadCastLike
         * @static
         * @param {message.IBroadCastLike=} [properties] Properties to set
         * @returns {message.BroadCastLike} BroadCastLike instance
         */
        BroadCastLike.create = function create(properties) {
            return new BroadCastLike(properties);
        };

        /**
         * Encodes the specified BroadCastLike message. Does not implicitly {@link message.BroadCastLike.verify|verify} messages.
         * @function encode
         * @memberof message.BroadCastLike
         * @static
         * @param {message.IBroadCastLike} message BroadCastLike message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BroadCastLike.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.list != null && message.list.length)
                for (var i = 0; i < message.list.length; ++i)
                    $root.message.BroadCastLike.UserLike.encode(message.list[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.finalLikeNum != null && Object.hasOwnProperty.call(message, "finalLikeNum"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.finalLikeNum);
            return writer;
        };

        /**
         * Encodes the specified BroadCastLike message, length delimited. Does not implicitly {@link message.BroadCastLike.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.BroadCastLike
         * @static
         * @param {message.IBroadCastLike} message BroadCastLike message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BroadCastLike.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BroadCastLike message from the specified reader or buffer.
         * @function decode
         * @memberof message.BroadCastLike
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.BroadCastLike} BroadCastLike
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BroadCastLike.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.BroadCastLike();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.list && message.list.length))
                        message.list = [];
                    message.list.push($root.message.BroadCastLike.UserLike.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.finalLikeNum = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BroadCastLike message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.BroadCastLike
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.BroadCastLike} BroadCastLike
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BroadCastLike.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BroadCastLike message.
         * @function verify
         * @memberof message.BroadCastLike
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BroadCastLike.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.list != null && message.hasOwnProperty("list")) {
                if (!Array.isArray(message.list))
                    return "list: array expected";
                for (var i = 0; i < message.list.length; ++i) {
                    var error = $root.message.BroadCastLike.UserLike.verify(message.list[i]);
                    if (error)
                        return "list." + error;
                }
            }
            if (message.finalLikeNum != null && message.hasOwnProperty("finalLikeNum"))
                if (!$util.isInteger(message.finalLikeNum))
                    return "finalLikeNum: integer expected";
            return null;
        };

        /**
         * Creates a BroadCastLike message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.BroadCastLike
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.BroadCastLike} BroadCastLike
         */
        BroadCastLike.fromObject = function fromObject(object) {
            if (object instanceof $root.message.BroadCastLike)
                return object;
            var message = new $root.message.BroadCastLike();
            if (object.list) {
                if (!Array.isArray(object.list))
                    throw TypeError(".message.BroadCastLike.list: array expected");
                message.list = [];
                for (var i = 0; i < object.list.length; ++i) {
                    if (typeof object.list[i] !== "object")
                        throw TypeError(".message.BroadCastLike.list: object expected");
                    message.list[i] = $root.message.BroadCastLike.UserLike.fromObject(object.list[i]);
                }
            }
            if (object.finalLikeNum != null)
                message.finalLikeNum = object.finalLikeNum >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a BroadCastLike message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.BroadCastLike
         * @static
         * @param {message.BroadCastLike} message BroadCastLike
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BroadCastLike.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.list = [];
            if (options.defaults)
                object.finalLikeNum = 0;
            if (message.list && message.list.length) {
                object.list = [];
                for (var j = 0; j < message.list.length; ++j)
                    object.list[j] = $root.message.BroadCastLike.UserLike.toObject(message.list[j], options);
            }
            if (message.finalLikeNum != null && message.hasOwnProperty("finalLikeNum"))
                object.finalLikeNum = message.finalLikeNum;
            return object;
        };

        /**
         * Converts this BroadCastLike to JSON.
         * @function toJSON
         * @memberof message.BroadCastLike
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BroadCastLike.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        BroadCastLike.UserLike = (function() {

            /**
             * Properties of a UserLike.
             * @memberof message.BroadCastLike
             * @interface IUserLike
             * @property {string|null} [tp] UserLike tp
             * @property {number|null} [num] UserLike num
             * @property {string|null} [avatar] UserLike avatar
             */

            /**
             * Constructs a new UserLike.
             * @memberof message.BroadCastLike
             * @classdesc Represents a UserLike.
             * @implements IUserLike
             * @constructor
             * @param {message.BroadCastLike.IUserLike=} [properties] Properties to set
             */
            function UserLike(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UserLike tp.
             * @member {string} tp
             * @memberof message.BroadCastLike.UserLike
             * @instance
             */
            UserLike.prototype.tp = "";

            /**
             * UserLike num.
             * @member {number} num
             * @memberof message.BroadCastLike.UserLike
             * @instance
             */
            UserLike.prototype.num = 0;

            /**
             * UserLike avatar.
             * @member {string} avatar
             * @memberof message.BroadCastLike.UserLike
             * @instance
             */
            UserLike.prototype.avatar = "";

            /**
             * Creates a new UserLike instance using the specified properties.
             * @function create
             * @memberof message.BroadCastLike.UserLike
             * @static
             * @param {message.BroadCastLike.IUserLike=} [properties] Properties to set
             * @returns {message.BroadCastLike.UserLike} UserLike instance
             */
            UserLike.create = function create(properties) {
                return new UserLike(properties);
            };

            /**
             * Encodes the specified UserLike message. Does not implicitly {@link message.BroadCastLike.UserLike.verify|verify} messages.
             * @function encode
             * @memberof message.BroadCastLike.UserLike
             * @static
             * @param {message.BroadCastLike.IUserLike} message UserLike message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UserLike.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.tp != null && Object.hasOwnProperty.call(message, "tp"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.tp);
                if (message.num != null && Object.hasOwnProperty.call(message, "num"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.num);
                if (message.avatar != null && Object.hasOwnProperty.call(message, "avatar"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.avatar);
                return writer;
            };

            /**
             * Encodes the specified UserLike message, length delimited. Does not implicitly {@link message.BroadCastLike.UserLike.verify|verify} messages.
             * @function encodeDelimited
             * @memberof message.BroadCastLike.UserLike
             * @static
             * @param {message.BroadCastLike.IUserLike} message UserLike message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UserLike.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a UserLike message from the specified reader or buffer.
             * @function decode
             * @memberof message.BroadCastLike.UserLike
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {message.BroadCastLike.UserLike} UserLike
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UserLike.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.BroadCastLike.UserLike();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.tp = reader.string();
                        break;
                    case 2:
                        message.num = reader.uint32();
                        break;
                    case 3:
                        message.avatar = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a UserLike message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof message.BroadCastLike.UserLike
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {message.BroadCastLike.UserLike} UserLike
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UserLike.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a UserLike message.
             * @function verify
             * @memberof message.BroadCastLike.UserLike
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            UserLike.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.tp != null && message.hasOwnProperty("tp"))
                    if (!$util.isString(message.tp))
                        return "tp: string expected";
                if (message.num != null && message.hasOwnProperty("num"))
                    if (!$util.isInteger(message.num))
                        return "num: integer expected";
                if (message.avatar != null && message.hasOwnProperty("avatar"))
                    if (!$util.isString(message.avatar))
                        return "avatar: string expected";
                return null;
            };

            /**
             * Creates a UserLike message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof message.BroadCastLike.UserLike
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {message.BroadCastLike.UserLike} UserLike
             */
            UserLike.fromObject = function fromObject(object) {
                if (object instanceof $root.message.BroadCastLike.UserLike)
                    return object;
                var message = new $root.message.BroadCastLike.UserLike();
                if (object.tp != null)
                    message.tp = String(object.tp);
                if (object.num != null)
                    message.num = object.num >>> 0;
                if (object.avatar != null)
                    message.avatar = String(object.avatar);
                return message;
            };

            /**
             * Creates a plain object from a UserLike message. Also converts values to other types if specified.
             * @function toObject
             * @memberof message.BroadCastLike.UserLike
             * @static
             * @param {message.BroadCastLike.UserLike} message UserLike
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UserLike.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.tp = "";
                    object.num = 0;
                    object.avatar = "";
                }
                if (message.tp != null && message.hasOwnProperty("tp"))
                    object.tp = message.tp;
                if (message.num != null && message.hasOwnProperty("num"))
                    object.num = message.num;
                if (message.avatar != null && message.hasOwnProperty("avatar"))
                    object.avatar = message.avatar;
                return object;
            };

            /**
             * Converts this UserLike to JSON.
             * @function toJSON
             * @memberof message.BroadCastLike.UserLike
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UserLike.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return UserLike;
        })();

        return BroadCastLike;
    })();

    message.BroadCastBilibili_Send = (function() {

        /**
         * Properties of a BroadCastBilibili_Send.
         * @memberof message
         * @interface IBroadCastBilibili_Send
         * @property {Array.<message.BroadCastBilibili_Send.IBilibili_Send>|null} [list] BroadCastBilibili_Send list
         */

        /**
         * Constructs a new BroadCastBilibili_Send.
         * @memberof message
         * @classdesc Represents a BroadCastBilibili_Send.
         * @implements IBroadCastBilibili_Send
         * @constructor
         * @param {message.IBroadCastBilibili_Send=} [properties] Properties to set
         */
        function BroadCastBilibili_Send(properties) {
            this.list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BroadCastBilibili_Send list.
         * @member {Array.<message.BroadCastBilibili_Send.IBilibili_Send>} list
         * @memberof message.BroadCastBilibili_Send
         * @instance
         */
        BroadCastBilibili_Send.prototype.list = $util.emptyArray;

        /**
         * Creates a new BroadCastBilibili_Send instance using the specified properties.
         * @function create
         * @memberof message.BroadCastBilibili_Send
         * @static
         * @param {message.IBroadCastBilibili_Send=} [properties] Properties to set
         * @returns {message.BroadCastBilibili_Send} BroadCastBilibili_Send instance
         */
        BroadCastBilibili_Send.create = function create(properties) {
            return new BroadCastBilibili_Send(properties);
        };

        /**
         * Encodes the specified BroadCastBilibili_Send message. Does not implicitly {@link message.BroadCastBilibili_Send.verify|verify} messages.
         * @function encode
         * @memberof message.BroadCastBilibili_Send
         * @static
         * @param {message.IBroadCastBilibili_Send} message BroadCastBilibili_Send message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BroadCastBilibili_Send.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.list != null && message.list.length)
                for (var i = 0; i < message.list.length; ++i)
                    $root.message.BroadCastBilibili_Send.Bilibili_Send.encode(message.list[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified BroadCastBilibili_Send message, length delimited. Does not implicitly {@link message.BroadCastBilibili_Send.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.BroadCastBilibili_Send
         * @static
         * @param {message.IBroadCastBilibili_Send} message BroadCastBilibili_Send message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BroadCastBilibili_Send.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BroadCastBilibili_Send message from the specified reader or buffer.
         * @function decode
         * @memberof message.BroadCastBilibili_Send
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.BroadCastBilibili_Send} BroadCastBilibili_Send
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BroadCastBilibili_Send.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.BroadCastBilibili_Send();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.list && message.list.length))
                        message.list = [];
                    message.list.push($root.message.BroadCastBilibili_Send.Bilibili_Send.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BroadCastBilibili_Send message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.BroadCastBilibili_Send
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.BroadCastBilibili_Send} BroadCastBilibili_Send
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BroadCastBilibili_Send.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BroadCastBilibili_Send message.
         * @function verify
         * @memberof message.BroadCastBilibili_Send
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BroadCastBilibili_Send.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.list != null && message.hasOwnProperty("list")) {
                if (!Array.isArray(message.list))
                    return "list: array expected";
                for (var i = 0; i < message.list.length; ++i) {
                    var error = $root.message.BroadCastBilibili_Send.Bilibili_Send.verify(message.list[i]);
                    if (error)
                        return "list." + error;
                }
            }
            return null;
        };

        /**
         * Creates a BroadCastBilibili_Send message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.BroadCastBilibili_Send
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.BroadCastBilibili_Send} BroadCastBilibili_Send
         */
        BroadCastBilibili_Send.fromObject = function fromObject(object) {
            if (object instanceof $root.message.BroadCastBilibili_Send)
                return object;
            var message = new $root.message.BroadCastBilibili_Send();
            if (object.list) {
                if (!Array.isArray(object.list))
                    throw TypeError(".message.BroadCastBilibili_Send.list: array expected");
                message.list = [];
                for (var i = 0; i < object.list.length; ++i) {
                    if (typeof object.list[i] !== "object")
                        throw TypeError(".message.BroadCastBilibili_Send.list: object expected");
                    message.list[i] = $root.message.BroadCastBilibili_Send.Bilibili_Send.fromObject(object.list[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a BroadCastBilibili_Send message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.BroadCastBilibili_Send
         * @static
         * @param {message.BroadCastBilibili_Send} message BroadCastBilibili_Send
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BroadCastBilibili_Send.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.list = [];
            if (message.list && message.list.length) {
                object.list = [];
                for (var j = 0; j < message.list.length; ++j)
                    object.list[j] = $root.message.BroadCastBilibili_Send.Bilibili_Send.toObject(message.list[j], options);
            }
            return object;
        };

        /**
         * Converts this BroadCastBilibili_Send to JSON.
         * @function toJSON
         * @memberof message.BroadCastBilibili_Send
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BroadCastBilibili_Send.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        BroadCastBilibili_Send.Bilibili_Send = (function() {

            /**
             * Properties of a Bilibili_Send.
             * @memberof message.BroadCastBilibili_Send
             * @interface IBilibili_Send
             * @property {string|null} [sender] Bilibili_Send sender
             * @property {string|null} [senderAvatar] Bilibili_Send senderAvatar
             * @property {string|null} [name] Bilibili_Send name
             * @property {number|null} [num] Bilibili_Send num
             * @property {number|null} [continuityNum] Bilibili_Send continuityNum
             */

            /**
             * Constructs a new Bilibili_Send.
             * @memberof message.BroadCastBilibili_Send
             * @classdesc Represents a Bilibili_Send.
             * @implements IBilibili_Send
             * @constructor
             * @param {message.BroadCastBilibili_Send.IBilibili_Send=} [properties] Properties to set
             */
            function Bilibili_Send(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Bilibili_Send sender.
             * @member {string} sender
             * @memberof message.BroadCastBilibili_Send.Bilibili_Send
             * @instance
             */
            Bilibili_Send.prototype.sender = "";

            /**
             * Bilibili_Send senderAvatar.
             * @member {string} senderAvatar
             * @memberof message.BroadCastBilibili_Send.Bilibili_Send
             * @instance
             */
            Bilibili_Send.prototype.senderAvatar = "";

            /**
             * Bilibili_Send name.
             * @member {string} name
             * @memberof message.BroadCastBilibili_Send.Bilibili_Send
             * @instance
             */
            Bilibili_Send.prototype.name = "";

            /**
             * Bilibili_Send num.
             * @member {number} num
             * @memberof message.BroadCastBilibili_Send.Bilibili_Send
             * @instance
             */
            Bilibili_Send.prototype.num = 0;

            /**
             * Bilibili_Send continuityNum.
             * @member {number} continuityNum
             * @memberof message.BroadCastBilibili_Send.Bilibili_Send
             * @instance
             */
            Bilibili_Send.prototype.continuityNum = 0;

            /**
             * Creates a new Bilibili_Send instance using the specified properties.
             * @function create
             * @memberof message.BroadCastBilibili_Send.Bilibili_Send
             * @static
             * @param {message.BroadCastBilibili_Send.IBilibili_Send=} [properties] Properties to set
             * @returns {message.BroadCastBilibili_Send.Bilibili_Send} Bilibili_Send instance
             */
            Bilibili_Send.create = function create(properties) {
                return new Bilibili_Send(properties);
            };

            /**
             * Encodes the specified Bilibili_Send message. Does not implicitly {@link message.BroadCastBilibili_Send.Bilibili_Send.verify|verify} messages.
             * @function encode
             * @memberof message.BroadCastBilibili_Send.Bilibili_Send
             * @static
             * @param {message.BroadCastBilibili_Send.IBilibili_Send} message Bilibili_Send message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Bilibili_Send.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.sender != null && Object.hasOwnProperty.call(message, "sender"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.sender);
                if (message.senderAvatar != null && Object.hasOwnProperty.call(message, "senderAvatar"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.senderAvatar);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
                if (message.num != null && Object.hasOwnProperty.call(message, "num"))
                    writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.num);
                if (message.continuityNum != null && Object.hasOwnProperty.call(message, "continuityNum"))
                    writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.continuityNum);
                return writer;
            };

            /**
             * Encodes the specified Bilibili_Send message, length delimited. Does not implicitly {@link message.BroadCastBilibili_Send.Bilibili_Send.verify|verify} messages.
             * @function encodeDelimited
             * @memberof message.BroadCastBilibili_Send.Bilibili_Send
             * @static
             * @param {message.BroadCastBilibili_Send.IBilibili_Send} message Bilibili_Send message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Bilibili_Send.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Bilibili_Send message from the specified reader or buffer.
             * @function decode
             * @memberof message.BroadCastBilibili_Send.Bilibili_Send
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {message.BroadCastBilibili_Send.Bilibili_Send} Bilibili_Send
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Bilibili_Send.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.BroadCastBilibili_Send.Bilibili_Send();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.sender = reader.string();
                        break;
                    case 2:
                        message.senderAvatar = reader.string();
                        break;
                    case 3:
                        message.name = reader.string();
                        break;
                    case 4:
                        message.num = reader.uint32();
                        break;
                    case 5:
                        message.continuityNum = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Bilibili_Send message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof message.BroadCastBilibili_Send.Bilibili_Send
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {message.BroadCastBilibili_Send.Bilibili_Send} Bilibili_Send
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Bilibili_Send.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Bilibili_Send message.
             * @function verify
             * @memberof message.BroadCastBilibili_Send.Bilibili_Send
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Bilibili_Send.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.sender != null && message.hasOwnProperty("sender"))
                    if (!$util.isString(message.sender))
                        return "sender: string expected";
                if (message.senderAvatar != null && message.hasOwnProperty("senderAvatar"))
                    if (!$util.isString(message.senderAvatar))
                        return "senderAvatar: string expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.num != null && message.hasOwnProperty("num"))
                    if (!$util.isInteger(message.num))
                        return "num: integer expected";
                if (message.continuityNum != null && message.hasOwnProperty("continuityNum"))
                    if (!$util.isInteger(message.continuityNum))
                        return "continuityNum: integer expected";
                return null;
            };

            /**
             * Creates a Bilibili_Send message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof message.BroadCastBilibili_Send.Bilibili_Send
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {message.BroadCastBilibili_Send.Bilibili_Send} Bilibili_Send
             */
            Bilibili_Send.fromObject = function fromObject(object) {
                if (object instanceof $root.message.BroadCastBilibili_Send.Bilibili_Send)
                    return object;
                var message = new $root.message.BroadCastBilibili_Send.Bilibili_Send();
                if (object.sender != null)
                    message.sender = String(object.sender);
                if (object.senderAvatar != null)
                    message.senderAvatar = String(object.senderAvatar);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.num != null)
                    message.num = object.num >>> 0;
                if (object.continuityNum != null)
                    message.continuityNum = object.continuityNum >>> 0;
                return message;
            };

            /**
             * Creates a plain object from a Bilibili_Send message. Also converts values to other types if specified.
             * @function toObject
             * @memberof message.BroadCastBilibili_Send.Bilibili_Send
             * @static
             * @param {message.BroadCastBilibili_Send.Bilibili_Send} message Bilibili_Send
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Bilibili_Send.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.sender = "";
                    object.senderAvatar = "";
                    object.name = "";
                    object.num = 0;
                    object.continuityNum = 0;
                }
                if (message.sender != null && message.hasOwnProperty("sender"))
                    object.sender = message.sender;
                if (message.senderAvatar != null && message.hasOwnProperty("senderAvatar"))
                    object.senderAvatar = message.senderAvatar;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.num != null && message.hasOwnProperty("num"))
                    object.num = message.num;
                if (message.continuityNum != null && message.hasOwnProperty("continuityNum"))
                    object.continuityNum = message.continuityNum;
                return object;
            };

            /**
             * Converts this Bilibili_Send to JSON.
             * @function toJSON
             * @memberof message.BroadCastBilibili_Send.Bilibili_Send
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Bilibili_Send.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Bilibili_Send;
        })();

        return BroadCastBilibili_Send;
    })();

    message.BackSendGift = (function() {

        /**
         * Properties of a BackSendGift.
         * @memberof message
         * @interface IBackSendGift
         * @property {string|null} [msg] BackSendGift msg
         */

        /**
         * Constructs a new BackSendGift.
         * @memberof message
         * @classdesc Represents a BackSendGift.
         * @implements IBackSendGift
         * @constructor
         * @param {message.IBackSendGift=} [properties] Properties to set
         */
        function BackSendGift(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BackSendGift msg.
         * @member {string} msg
         * @memberof message.BackSendGift
         * @instance
         */
        BackSendGift.prototype.msg = "";

        /**
         * Creates a new BackSendGift instance using the specified properties.
         * @function create
         * @memberof message.BackSendGift
         * @static
         * @param {message.IBackSendGift=} [properties] Properties to set
         * @returns {message.BackSendGift} BackSendGift instance
         */
        BackSendGift.create = function create(properties) {
            return new BackSendGift(properties);
        };

        /**
         * Encodes the specified BackSendGift message. Does not implicitly {@link message.BackSendGift.verify|verify} messages.
         * @function encode
         * @memberof message.BackSendGift
         * @static
         * @param {message.IBackSendGift} message BackSendGift message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BackSendGift.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.msg);
            return writer;
        };

        /**
         * Encodes the specified BackSendGift message, length delimited. Does not implicitly {@link message.BackSendGift.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.BackSendGift
         * @static
         * @param {message.IBackSendGift} message BackSendGift message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BackSendGift.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BackSendGift message from the specified reader or buffer.
         * @function decode
         * @memberof message.BackSendGift
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.BackSendGift} BackSendGift
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BackSendGift.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.BackSendGift();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.msg = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BackSendGift message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.BackSendGift
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.BackSendGift} BackSendGift
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BackSendGift.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BackSendGift message.
         * @function verify
         * @memberof message.BackSendGift
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BackSendGift.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.msg != null && message.hasOwnProperty("msg"))
                if (!$util.isString(message.msg))
                    return "msg: string expected";
            return null;
        };

        /**
         * Creates a BackSendGift message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.BackSendGift
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.BackSendGift} BackSendGift
         */
        BackSendGift.fromObject = function fromObject(object) {
            if (object instanceof $root.message.BackSendGift)
                return object;
            var message = new $root.message.BackSendGift();
            if (object.msg != null)
                message.msg = String(object.msg);
            return message;
        };

        /**
         * Creates a plain object from a BackSendGift message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.BackSendGift
         * @static
         * @param {message.BackSendGift} message BackSendGift
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BackSendGift.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.msg = "";
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = message.msg;
            return object;
        };

        /**
         * Converts this BackSendGift to JSON.
         * @function toJSON
         * @memberof message.BackSendGift
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BackSendGift.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BackSendGift;
    })();

    message.BackSendHongbao = (function() {

        /**
         * Properties of a BackSendHongbao.
         * @memberof message
         * @interface IBackSendHongbao
         * @property {string|null} [msg] BackSendHongbao msg
         */

        /**
         * Constructs a new BackSendHongbao.
         * @memberof message
         * @classdesc Represents a BackSendHongbao.
         * @implements IBackSendHongbao
         * @constructor
         * @param {message.IBackSendHongbao=} [properties] Properties to set
         */
        function BackSendHongbao(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BackSendHongbao msg.
         * @member {string} msg
         * @memberof message.BackSendHongbao
         * @instance
         */
        BackSendHongbao.prototype.msg = "";

        /**
         * Creates a new BackSendHongbao instance using the specified properties.
         * @function create
         * @memberof message.BackSendHongbao
         * @static
         * @param {message.IBackSendHongbao=} [properties] Properties to set
         * @returns {message.BackSendHongbao} BackSendHongbao instance
         */
        BackSendHongbao.create = function create(properties) {
            return new BackSendHongbao(properties);
        };

        /**
         * Encodes the specified BackSendHongbao message. Does not implicitly {@link message.BackSendHongbao.verify|verify} messages.
         * @function encode
         * @memberof message.BackSendHongbao
         * @static
         * @param {message.IBackSendHongbao} message BackSendHongbao message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BackSendHongbao.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.msg);
            return writer;
        };

        /**
         * Encodes the specified BackSendHongbao message, length delimited. Does not implicitly {@link message.BackSendHongbao.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.BackSendHongbao
         * @static
         * @param {message.IBackSendHongbao} message BackSendHongbao message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BackSendHongbao.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BackSendHongbao message from the specified reader or buffer.
         * @function decode
         * @memberof message.BackSendHongbao
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.BackSendHongbao} BackSendHongbao
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BackSendHongbao.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.BackSendHongbao();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.msg = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BackSendHongbao message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.BackSendHongbao
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.BackSendHongbao} BackSendHongbao
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BackSendHongbao.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BackSendHongbao message.
         * @function verify
         * @memberof message.BackSendHongbao
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BackSendHongbao.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.msg != null && message.hasOwnProperty("msg"))
                if (!$util.isString(message.msg))
                    return "msg: string expected";
            return null;
        };

        /**
         * Creates a BackSendHongbao message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.BackSendHongbao
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.BackSendHongbao} BackSendHongbao
         */
        BackSendHongbao.fromObject = function fromObject(object) {
            if (object instanceof $root.message.BackSendHongbao)
                return object;
            var message = new $root.message.BackSendHongbao();
            if (object.msg != null)
                message.msg = String(object.msg);
            return message;
        };

        /**
         * Creates a plain object from a BackSendHongbao message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.BackSendHongbao
         * @static
         * @param {message.BackSendHongbao} message BackSendHongbao
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BackSendHongbao.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.msg = "";
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = message.msg;
            return object;
        };

        /**
         * Converts this BackSendHongbao to JSON.
         * @function toJSON
         * @memberof message.BackSendHongbao
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BackSendHongbao.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BackSendHongbao;
    })();

    /**
     * HongbaoState enum.
     * @name message.HongbaoState
     * @enum {number}
     * @property {number} RC_COUNTDOWN=0 RC_COUNTDOWN value
     * @property {number} RC_READY=1 RC_READY value
     * @property {number} RC_FINISH=2 RC_FINISH value
     * @property {number} RC_OTHER=3 RC_OTHER value
     */
    message.HongbaoState = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "RC_COUNTDOWN"] = 0;
        values[valuesById[1] = "RC_READY"] = 1;
        values[valuesById[2] = "RC_FINISH"] = 2;
        values[valuesById[3] = "RC_OTHER"] = 3;
        return values;
    })();

    message.BroadCastHongbao = (function() {

        /**
         * Properties of a BroadCastHongbao.
         * @memberof message
         * @interface IBroadCastHongbao
         * @property {Array.<message.BroadCastHongbao.IHongbao>|null} [list] BroadCastHongbao list
         */

        /**
         * Constructs a new BroadCastHongbao.
         * @memberof message
         * @classdesc Represents a BroadCastHongbao.
         * @implements IBroadCastHongbao
         * @constructor
         * @param {message.IBroadCastHongbao=} [properties] Properties to set
         */
        function BroadCastHongbao(properties) {
            this.list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BroadCastHongbao list.
         * @member {Array.<message.BroadCastHongbao.IHongbao>} list
         * @memberof message.BroadCastHongbao
         * @instance
         */
        BroadCastHongbao.prototype.list = $util.emptyArray;

        /**
         * Creates a new BroadCastHongbao instance using the specified properties.
         * @function create
         * @memberof message.BroadCastHongbao
         * @static
         * @param {message.IBroadCastHongbao=} [properties] Properties to set
         * @returns {message.BroadCastHongbao} BroadCastHongbao instance
         */
        BroadCastHongbao.create = function create(properties) {
            return new BroadCastHongbao(properties);
        };

        /**
         * Encodes the specified BroadCastHongbao message. Does not implicitly {@link message.BroadCastHongbao.verify|verify} messages.
         * @function encode
         * @memberof message.BroadCastHongbao
         * @static
         * @param {message.IBroadCastHongbao} message BroadCastHongbao message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BroadCastHongbao.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.list != null && message.list.length)
                for (var i = 0; i < message.list.length; ++i)
                    $root.message.BroadCastHongbao.Hongbao.encode(message.list[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified BroadCastHongbao message, length delimited. Does not implicitly {@link message.BroadCastHongbao.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.BroadCastHongbao
         * @static
         * @param {message.IBroadCastHongbao} message BroadCastHongbao message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BroadCastHongbao.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BroadCastHongbao message from the specified reader or buffer.
         * @function decode
         * @memberof message.BroadCastHongbao
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.BroadCastHongbao} BroadCastHongbao
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BroadCastHongbao.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.BroadCastHongbao();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.list && message.list.length))
                        message.list = [];
                    message.list.push($root.message.BroadCastHongbao.Hongbao.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BroadCastHongbao message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.BroadCastHongbao
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.BroadCastHongbao} BroadCastHongbao
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BroadCastHongbao.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BroadCastHongbao message.
         * @function verify
         * @memberof message.BroadCastHongbao
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BroadCastHongbao.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.list != null && message.hasOwnProperty("list")) {
                if (!Array.isArray(message.list))
                    return "list: array expected";
                for (var i = 0; i < message.list.length; ++i) {
                    var error = $root.message.BroadCastHongbao.Hongbao.verify(message.list[i]);
                    if (error)
                        return "list." + error;
                }
            }
            return null;
        };

        /**
         * Creates a BroadCastHongbao message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.BroadCastHongbao
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.BroadCastHongbao} BroadCastHongbao
         */
        BroadCastHongbao.fromObject = function fromObject(object) {
            if (object instanceof $root.message.BroadCastHongbao)
                return object;
            var message = new $root.message.BroadCastHongbao();
            if (object.list) {
                if (!Array.isArray(object.list))
                    throw TypeError(".message.BroadCastHongbao.list: array expected");
                message.list = [];
                for (var i = 0; i < object.list.length; ++i) {
                    if (typeof object.list[i] !== "object")
                        throw TypeError(".message.BroadCastHongbao.list: object expected");
                    message.list[i] = $root.message.BroadCastHongbao.Hongbao.fromObject(object.list[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a BroadCastHongbao message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.BroadCastHongbao
         * @static
         * @param {message.BroadCastHongbao} message BroadCastHongbao
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BroadCastHongbao.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.list = [];
            if (message.list && message.list.length) {
                object.list = [];
                for (var j = 0; j < message.list.length; ++j)
                    object.list[j] = $root.message.BroadCastHongbao.Hongbao.toObject(message.list[j], options);
            }
            return object;
        };

        /**
         * Converts this BroadCastHongbao to JSON.
         * @function toJSON
         * @memberof message.BroadCastHongbao
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BroadCastHongbao.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        BroadCastHongbao.Hongbao = (function() {

            /**
             * Properties of an Hongbao.
             * @memberof message.BroadCastHongbao
             * @interface IHongbao
             * @property {number|Long|null} [id] Hongbao id
             * @property {message.HongbaoState|null} [state] Hongbao state
             * @property {string|null} [sender] Hongbao sender
             * @property {string|null} [senderAvatar] Hongbao senderAvatar
             * @property {number|null} [point] Hongbao point
             * @property {number|null} [sec] Hongbao sec
             * @property {number|null} [leftNum] Hongbao leftNum
             */

            /**
             * Constructs a new Hongbao.
             * @memberof message.BroadCastHongbao
             * @classdesc Represents an Hongbao.
             * @implements IHongbao
             * @constructor
             * @param {message.BroadCastHongbao.IHongbao=} [properties] Properties to set
             */
            function Hongbao(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Hongbao id.
             * @member {number|Long} id
             * @memberof message.BroadCastHongbao.Hongbao
             * @instance
             */
            Hongbao.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Hongbao state.
             * @member {message.HongbaoState} state
             * @memberof message.BroadCastHongbao.Hongbao
             * @instance
             */
            Hongbao.prototype.state = 0;

            /**
             * Hongbao sender.
             * @member {string} sender
             * @memberof message.BroadCastHongbao.Hongbao
             * @instance
             */
            Hongbao.prototype.sender = "";

            /**
             * Hongbao senderAvatar.
             * @member {string} senderAvatar
             * @memberof message.BroadCastHongbao.Hongbao
             * @instance
             */
            Hongbao.prototype.senderAvatar = "";

            /**
             * Hongbao point.
             * @member {number} point
             * @memberof message.BroadCastHongbao.Hongbao
             * @instance
             */
            Hongbao.prototype.point = 0;

            /**
             * Hongbao sec.
             * @member {number} sec
             * @memberof message.BroadCastHongbao.Hongbao
             * @instance
             */
            Hongbao.prototype.sec = 0;

            /**
             * Hongbao leftNum.
             * @member {number} leftNum
             * @memberof message.BroadCastHongbao.Hongbao
             * @instance
             */
            Hongbao.prototype.leftNum = 0;

            /**
             * Creates a new Hongbao instance using the specified properties.
             * @function create
             * @memberof message.BroadCastHongbao.Hongbao
             * @static
             * @param {message.BroadCastHongbao.IHongbao=} [properties] Properties to set
             * @returns {message.BroadCastHongbao.Hongbao} Hongbao instance
             */
            Hongbao.create = function create(properties) {
                return new Hongbao(properties);
            };

            /**
             * Encodes the specified Hongbao message. Does not implicitly {@link message.BroadCastHongbao.Hongbao.verify|verify} messages.
             * @function encode
             * @memberof message.BroadCastHongbao.Hongbao
             * @static
             * @param {message.BroadCastHongbao.IHongbao} message Hongbao message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Hongbao.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
                if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.state);
                if (message.sender != null && Object.hasOwnProperty.call(message, "sender"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.sender);
                if (message.senderAvatar != null && Object.hasOwnProperty.call(message, "senderAvatar"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.senderAvatar);
                if (message.point != null && Object.hasOwnProperty.call(message, "point"))
                    writer.uint32(/* id 5, wireType 5 =*/45).float(message.point);
                if (message.sec != null && Object.hasOwnProperty.call(message, "sec"))
                    writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.sec);
                if (message.leftNum != null && Object.hasOwnProperty.call(message, "leftNum"))
                    writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.leftNum);
                return writer;
            };

            /**
             * Encodes the specified Hongbao message, length delimited. Does not implicitly {@link message.BroadCastHongbao.Hongbao.verify|verify} messages.
             * @function encodeDelimited
             * @memberof message.BroadCastHongbao.Hongbao
             * @static
             * @param {message.BroadCastHongbao.IHongbao} message Hongbao message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Hongbao.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Hongbao message from the specified reader or buffer.
             * @function decode
             * @memberof message.BroadCastHongbao.Hongbao
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {message.BroadCastHongbao.Hongbao} Hongbao
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Hongbao.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.BroadCastHongbao.Hongbao();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.int64();
                        break;
                    case 2:
                        message.state = reader.int32();
                        break;
                    case 3:
                        message.sender = reader.string();
                        break;
                    case 4:
                        message.senderAvatar = reader.string();
                        break;
                    case 5:
                        message.point = reader.float();
                        break;
                    case 6:
                        message.sec = reader.uint32();
                        break;
                    case 7:
                        message.leftNum = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Hongbao message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof message.BroadCastHongbao.Hongbao
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {message.BroadCastHongbao.Hongbao} Hongbao
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Hongbao.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Hongbao message.
             * @function verify
             * @memberof message.BroadCastHongbao.Hongbao
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Hongbao.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                        return "id: integer|Long expected";
                if (message.state != null && message.hasOwnProperty("state"))
                    switch (message.state) {
                    default:
                        return "state: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                if (message.sender != null && message.hasOwnProperty("sender"))
                    if (!$util.isString(message.sender))
                        return "sender: string expected";
                if (message.senderAvatar != null && message.hasOwnProperty("senderAvatar"))
                    if (!$util.isString(message.senderAvatar))
                        return "senderAvatar: string expected";
                if (message.point != null && message.hasOwnProperty("point"))
                    if (typeof message.point !== "number")
                        return "point: number expected";
                if (message.sec != null && message.hasOwnProperty("sec"))
                    if (!$util.isInteger(message.sec))
                        return "sec: integer expected";
                if (message.leftNum != null && message.hasOwnProperty("leftNum"))
                    if (!$util.isInteger(message.leftNum))
                        return "leftNum: integer expected";
                return null;
            };

            /**
             * Creates an Hongbao message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof message.BroadCastHongbao.Hongbao
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {message.BroadCastHongbao.Hongbao} Hongbao
             */
            Hongbao.fromObject = function fromObject(object) {
                if (object instanceof $root.message.BroadCastHongbao.Hongbao)
                    return object;
                var message = new $root.message.BroadCastHongbao.Hongbao();
                if (object.id != null)
                    if ($util.Long)
                        (message.id = $util.Long.fromValue(object.id)).unsigned = false;
                    else if (typeof object.id === "string")
                        message.id = parseInt(object.id, 10);
                    else if (typeof object.id === "number")
                        message.id = object.id;
                    else if (typeof object.id === "object")
                        message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
                switch (object.state) {
                case "RC_COUNTDOWN":
                case 0:
                    message.state = 0;
                    break;
                case "RC_READY":
                case 1:
                    message.state = 1;
                    break;
                case "RC_FINISH":
                case 2:
                    message.state = 2;
                    break;
                case "RC_OTHER":
                case 3:
                    message.state = 3;
                    break;
                }
                if (object.sender != null)
                    message.sender = String(object.sender);
                if (object.senderAvatar != null)
                    message.senderAvatar = String(object.senderAvatar);
                if (object.point != null)
                    message.point = Number(object.point);
                if (object.sec != null)
                    message.sec = object.sec >>> 0;
                if (object.leftNum != null)
                    message.leftNum = object.leftNum >>> 0;
                return message;
            };

            /**
             * Creates a plain object from an Hongbao message. Also converts values to other types if specified.
             * @function toObject
             * @memberof message.BroadCastHongbao.Hongbao
             * @static
             * @param {message.BroadCastHongbao.Hongbao} message Hongbao
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Hongbao.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.id = options.longs === String ? "0" : 0;
                    object.state = options.enums === String ? "RC_COUNTDOWN" : 0;
                    object.sender = "";
                    object.senderAvatar = "";
                    object.point = 0;
                    object.sec = 0;
                    object.leftNum = 0;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    if (typeof message.id === "number")
                        object.id = options.longs === String ? String(message.id) : message.id;
                    else
                        object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
                if (message.state != null && message.hasOwnProperty("state"))
                    object.state = options.enums === String ? $root.message.HongbaoState[message.state] : message.state;
                if (message.sender != null && message.hasOwnProperty("sender"))
                    object.sender = message.sender;
                if (message.senderAvatar != null && message.hasOwnProperty("senderAvatar"))
                    object.senderAvatar = message.senderAvatar;
                if (message.point != null && message.hasOwnProperty("point"))
                    object.point = options.json && !isFinite(message.point) ? String(message.point) : message.point;
                if (message.sec != null && message.hasOwnProperty("sec"))
                    object.sec = message.sec;
                if (message.leftNum != null && message.hasOwnProperty("leftNum"))
                    object.leftNum = message.leftNum;
                return object;
            };

            /**
             * Converts this Hongbao to JSON.
             * @function toJSON
             * @memberof message.BroadCastHongbao.Hongbao
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Hongbao.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Hongbao;
        })();

        return BroadCastHongbao;
    })();

    message.BroadCastHongbaoUpdated = (function() {

        /**
         * Properties of a BroadCastHongbaoUpdated.
         * @memberof message
         * @interface IBroadCastHongbaoUpdated
         * @property {Array.<message.BroadCastHongbaoUpdated.IHongbaoUpdated>|null} [list] BroadCastHongbaoUpdated list
         */

        /**
         * Constructs a new BroadCastHongbaoUpdated.
         * @memberof message
         * @classdesc Represents a BroadCastHongbaoUpdated.
         * @implements IBroadCastHongbaoUpdated
         * @constructor
         * @param {message.IBroadCastHongbaoUpdated=} [properties] Properties to set
         */
        function BroadCastHongbaoUpdated(properties) {
            this.list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BroadCastHongbaoUpdated list.
         * @member {Array.<message.BroadCastHongbaoUpdated.IHongbaoUpdated>} list
         * @memberof message.BroadCastHongbaoUpdated
         * @instance
         */
        BroadCastHongbaoUpdated.prototype.list = $util.emptyArray;

        /**
         * Creates a new BroadCastHongbaoUpdated instance using the specified properties.
         * @function create
         * @memberof message.BroadCastHongbaoUpdated
         * @static
         * @param {message.IBroadCastHongbaoUpdated=} [properties] Properties to set
         * @returns {message.BroadCastHongbaoUpdated} BroadCastHongbaoUpdated instance
         */
        BroadCastHongbaoUpdated.create = function create(properties) {
            return new BroadCastHongbaoUpdated(properties);
        };

        /**
         * Encodes the specified BroadCastHongbaoUpdated message. Does not implicitly {@link message.BroadCastHongbaoUpdated.verify|verify} messages.
         * @function encode
         * @memberof message.BroadCastHongbaoUpdated
         * @static
         * @param {message.IBroadCastHongbaoUpdated} message BroadCastHongbaoUpdated message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BroadCastHongbaoUpdated.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.list != null && message.list.length)
                for (var i = 0; i < message.list.length; ++i)
                    $root.message.BroadCastHongbaoUpdated.HongbaoUpdated.encode(message.list[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified BroadCastHongbaoUpdated message, length delimited. Does not implicitly {@link message.BroadCastHongbaoUpdated.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.BroadCastHongbaoUpdated
         * @static
         * @param {message.IBroadCastHongbaoUpdated} message BroadCastHongbaoUpdated message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BroadCastHongbaoUpdated.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BroadCastHongbaoUpdated message from the specified reader or buffer.
         * @function decode
         * @memberof message.BroadCastHongbaoUpdated
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.BroadCastHongbaoUpdated} BroadCastHongbaoUpdated
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BroadCastHongbaoUpdated.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.BroadCastHongbaoUpdated();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.list && message.list.length))
                        message.list = [];
                    message.list.push($root.message.BroadCastHongbaoUpdated.HongbaoUpdated.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BroadCastHongbaoUpdated message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.BroadCastHongbaoUpdated
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.BroadCastHongbaoUpdated} BroadCastHongbaoUpdated
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BroadCastHongbaoUpdated.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BroadCastHongbaoUpdated message.
         * @function verify
         * @memberof message.BroadCastHongbaoUpdated
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BroadCastHongbaoUpdated.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.list != null && message.hasOwnProperty("list")) {
                if (!Array.isArray(message.list))
                    return "list: array expected";
                for (var i = 0; i < message.list.length; ++i) {
                    var error = $root.message.BroadCastHongbaoUpdated.HongbaoUpdated.verify(message.list[i]);
                    if (error)
                        return "list." + error;
                }
            }
            return null;
        };

        /**
         * Creates a BroadCastHongbaoUpdated message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.BroadCastHongbaoUpdated
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.BroadCastHongbaoUpdated} BroadCastHongbaoUpdated
         */
        BroadCastHongbaoUpdated.fromObject = function fromObject(object) {
            if (object instanceof $root.message.BroadCastHongbaoUpdated)
                return object;
            var message = new $root.message.BroadCastHongbaoUpdated();
            if (object.list) {
                if (!Array.isArray(object.list))
                    throw TypeError(".message.BroadCastHongbaoUpdated.list: array expected");
                message.list = [];
                for (var i = 0; i < object.list.length; ++i) {
                    if (typeof object.list[i] !== "object")
                        throw TypeError(".message.BroadCastHongbaoUpdated.list: object expected");
                    message.list[i] = $root.message.BroadCastHongbaoUpdated.HongbaoUpdated.fromObject(object.list[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a BroadCastHongbaoUpdated message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.BroadCastHongbaoUpdated
         * @static
         * @param {message.BroadCastHongbaoUpdated} message BroadCastHongbaoUpdated
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BroadCastHongbaoUpdated.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.list = [];
            if (message.list && message.list.length) {
                object.list = [];
                for (var j = 0; j < message.list.length; ++j)
                    object.list[j] = $root.message.BroadCastHongbaoUpdated.HongbaoUpdated.toObject(message.list[j], options);
            }
            return object;
        };

        /**
         * Converts this BroadCastHongbaoUpdated to JSON.
         * @function toJSON
         * @memberof message.BroadCastHongbaoUpdated
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BroadCastHongbaoUpdated.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        BroadCastHongbaoUpdated.HongbaoUpdated = (function() {

            /**
             * Properties of an HongbaoUpdated.
             * @memberof message.BroadCastHongbaoUpdated
             * @interface IHongbaoUpdated
             * @property {number|Long|null} [id] HongbaoUpdated id
             * @property {message.HongbaoState|null} [newState] HongbaoUpdated newState
             * @property {number|null} [leftNum] HongbaoUpdated leftNum
             */

            /**
             * Constructs a new HongbaoUpdated.
             * @memberof message.BroadCastHongbaoUpdated
             * @classdesc Represents an HongbaoUpdated.
             * @implements IHongbaoUpdated
             * @constructor
             * @param {message.BroadCastHongbaoUpdated.IHongbaoUpdated=} [properties] Properties to set
             */
            function HongbaoUpdated(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * HongbaoUpdated id.
             * @member {number|Long} id
             * @memberof message.BroadCastHongbaoUpdated.HongbaoUpdated
             * @instance
             */
            HongbaoUpdated.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * HongbaoUpdated newState.
             * @member {message.HongbaoState} newState
             * @memberof message.BroadCastHongbaoUpdated.HongbaoUpdated
             * @instance
             */
            HongbaoUpdated.prototype.newState = 0;

            /**
             * HongbaoUpdated leftNum.
             * @member {number} leftNum
             * @memberof message.BroadCastHongbaoUpdated.HongbaoUpdated
             * @instance
             */
            HongbaoUpdated.prototype.leftNum = 0;

            /**
             * Creates a new HongbaoUpdated instance using the specified properties.
             * @function create
             * @memberof message.BroadCastHongbaoUpdated.HongbaoUpdated
             * @static
             * @param {message.BroadCastHongbaoUpdated.IHongbaoUpdated=} [properties] Properties to set
             * @returns {message.BroadCastHongbaoUpdated.HongbaoUpdated} HongbaoUpdated instance
             */
            HongbaoUpdated.create = function create(properties) {
                return new HongbaoUpdated(properties);
            };

            /**
             * Encodes the specified HongbaoUpdated message. Does not implicitly {@link message.BroadCastHongbaoUpdated.HongbaoUpdated.verify|verify} messages.
             * @function encode
             * @memberof message.BroadCastHongbaoUpdated.HongbaoUpdated
             * @static
             * @param {message.BroadCastHongbaoUpdated.IHongbaoUpdated} message HongbaoUpdated message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HongbaoUpdated.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
                if (message.newState != null && Object.hasOwnProperty.call(message, "newState"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.newState);
                if (message.leftNum != null && Object.hasOwnProperty.call(message, "leftNum"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.leftNum);
                return writer;
            };

            /**
             * Encodes the specified HongbaoUpdated message, length delimited. Does not implicitly {@link message.BroadCastHongbaoUpdated.HongbaoUpdated.verify|verify} messages.
             * @function encodeDelimited
             * @memberof message.BroadCastHongbaoUpdated.HongbaoUpdated
             * @static
             * @param {message.BroadCastHongbaoUpdated.IHongbaoUpdated} message HongbaoUpdated message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HongbaoUpdated.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an HongbaoUpdated message from the specified reader or buffer.
             * @function decode
             * @memberof message.BroadCastHongbaoUpdated.HongbaoUpdated
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {message.BroadCastHongbaoUpdated.HongbaoUpdated} HongbaoUpdated
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            HongbaoUpdated.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.BroadCastHongbaoUpdated.HongbaoUpdated();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.int64();
                        break;
                    case 2:
                        message.newState = reader.int32();
                        break;
                    case 3:
                        message.leftNum = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an HongbaoUpdated message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof message.BroadCastHongbaoUpdated.HongbaoUpdated
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {message.BroadCastHongbaoUpdated.HongbaoUpdated} HongbaoUpdated
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            HongbaoUpdated.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an HongbaoUpdated message.
             * @function verify
             * @memberof message.BroadCastHongbaoUpdated.HongbaoUpdated
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            HongbaoUpdated.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                        return "id: integer|Long expected";
                if (message.newState != null && message.hasOwnProperty("newState"))
                    switch (message.newState) {
                    default:
                        return "newState: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                if (message.leftNum != null && message.hasOwnProperty("leftNum"))
                    if (!$util.isInteger(message.leftNum))
                        return "leftNum: integer expected";
                return null;
            };

            /**
             * Creates an HongbaoUpdated message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof message.BroadCastHongbaoUpdated.HongbaoUpdated
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {message.BroadCastHongbaoUpdated.HongbaoUpdated} HongbaoUpdated
             */
            HongbaoUpdated.fromObject = function fromObject(object) {
                if (object instanceof $root.message.BroadCastHongbaoUpdated.HongbaoUpdated)
                    return object;
                var message = new $root.message.BroadCastHongbaoUpdated.HongbaoUpdated();
                if (object.id != null)
                    if ($util.Long)
                        (message.id = $util.Long.fromValue(object.id)).unsigned = false;
                    else if (typeof object.id === "string")
                        message.id = parseInt(object.id, 10);
                    else if (typeof object.id === "number")
                        message.id = object.id;
                    else if (typeof object.id === "object")
                        message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
                switch (object.newState) {
                case "RC_COUNTDOWN":
                case 0:
                    message.newState = 0;
                    break;
                case "RC_READY":
                case 1:
                    message.newState = 1;
                    break;
                case "RC_FINISH":
                case 2:
                    message.newState = 2;
                    break;
                case "RC_OTHER":
                case 3:
                    message.newState = 3;
                    break;
                }
                if (object.leftNum != null)
                    message.leftNum = object.leftNum >>> 0;
                return message;
            };

            /**
             * Creates a plain object from an HongbaoUpdated message. Also converts values to other types if specified.
             * @function toObject
             * @memberof message.BroadCastHongbaoUpdated.HongbaoUpdated
             * @static
             * @param {message.BroadCastHongbaoUpdated.HongbaoUpdated} message HongbaoUpdated
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            HongbaoUpdated.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.id = options.longs === String ? "0" : 0;
                    object.newState = options.enums === String ? "RC_COUNTDOWN" : 0;
                    object.leftNum = 0;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    if (typeof message.id === "number")
                        object.id = options.longs === String ? String(message.id) : message.id;
                    else
                        object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
                if (message.newState != null && message.hasOwnProperty("newState"))
                    object.newState = options.enums === String ? $root.message.HongbaoState[message.newState] : message.newState;
                if (message.leftNum != null && message.hasOwnProperty("leftNum"))
                    object.leftNum = message.leftNum;
                return object;
            };

            /**
             * Converts this HongbaoUpdated to JSON.
             * @function toJSON
             * @memberof message.BroadCastHongbaoUpdated.HongbaoUpdated
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            HongbaoUpdated.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return HongbaoUpdated;
        })();

        return BroadCastHongbaoUpdated;
    })();

    message.BackGrabHongbao = (function() {

        /**
         * Properties of a BackGrabHongbao.
         * @memberof message
         * @interface IBackGrabHongbao
         * @property {number|null} [point] BackGrabHongbao point
         * @property {string|null} [msg] BackGrabHongbao msg
         */

        /**
         * Constructs a new BackGrabHongbao.
         * @memberof message
         * @classdesc Represents a BackGrabHongbao.
         * @implements IBackGrabHongbao
         * @constructor
         * @param {message.IBackGrabHongbao=} [properties] Properties to set
         */
        function BackGrabHongbao(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BackGrabHongbao point.
         * @member {number} point
         * @memberof message.BackGrabHongbao
         * @instance
         */
        BackGrabHongbao.prototype.point = 0;

        /**
         * BackGrabHongbao msg.
         * @member {string} msg
         * @memberof message.BackGrabHongbao
         * @instance
         */
        BackGrabHongbao.prototype.msg = "";

        /**
         * Creates a new BackGrabHongbao instance using the specified properties.
         * @function create
         * @memberof message.BackGrabHongbao
         * @static
         * @param {message.IBackGrabHongbao=} [properties] Properties to set
         * @returns {message.BackGrabHongbao} BackGrabHongbao instance
         */
        BackGrabHongbao.create = function create(properties) {
            return new BackGrabHongbao(properties);
        };

        /**
         * Encodes the specified BackGrabHongbao message. Does not implicitly {@link message.BackGrabHongbao.verify|verify} messages.
         * @function encode
         * @memberof message.BackGrabHongbao
         * @static
         * @param {message.IBackGrabHongbao} message BackGrabHongbao message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BackGrabHongbao.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.point != null && Object.hasOwnProperty.call(message, "point"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.point);
            if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
            return writer;
        };

        /**
         * Encodes the specified BackGrabHongbao message, length delimited. Does not implicitly {@link message.BackGrabHongbao.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.BackGrabHongbao
         * @static
         * @param {message.IBackGrabHongbao} message BackGrabHongbao message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BackGrabHongbao.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BackGrabHongbao message from the specified reader or buffer.
         * @function decode
         * @memberof message.BackGrabHongbao
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.BackGrabHongbao} BackGrabHongbao
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BackGrabHongbao.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.BackGrabHongbao();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.point = reader.float();
                    break;
                case 2:
                    message.msg = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BackGrabHongbao message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.BackGrabHongbao
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.BackGrabHongbao} BackGrabHongbao
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BackGrabHongbao.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BackGrabHongbao message.
         * @function verify
         * @memberof message.BackGrabHongbao
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BackGrabHongbao.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.point != null && message.hasOwnProperty("point"))
                if (typeof message.point !== "number")
                    return "point: number expected";
            if (message.msg != null && message.hasOwnProperty("msg"))
                if (!$util.isString(message.msg))
                    return "msg: string expected";
            return null;
        };

        /**
         * Creates a BackGrabHongbao message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.BackGrabHongbao
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.BackGrabHongbao} BackGrabHongbao
         */
        BackGrabHongbao.fromObject = function fromObject(object) {
            if (object instanceof $root.message.BackGrabHongbao)
                return object;
            var message = new $root.message.BackGrabHongbao();
            if (object.point != null)
                message.point = Number(object.point);
            if (object.msg != null)
                message.msg = String(object.msg);
            return message;
        };

        /**
         * Creates a plain object from a BackGrabHongbao message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.BackGrabHongbao
         * @static
         * @param {message.BackGrabHongbao} message BackGrabHongbao
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BackGrabHongbao.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.point = 0;
                object.msg = "";
            }
            if (message.point != null && message.hasOwnProperty("point"))
                object.point = options.json && !isFinite(message.point) ? String(message.point) : message.point;
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = message.msg;
            return object;
        };

        /**
         * Converts this BackGrabHongbao to JSON.
         * @function toJSON
         * @memberof message.BackGrabHongbao
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BackGrabHongbao.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BackGrabHongbao;
    })();

    message.BackSendChatMessage = (function() {

        /**
         * Properties of a BackSendChatMessage.
         * @memberof message
         * @interface IBackSendChatMessage
         * @property {string|null} [msg] BackSendChatMessage msg
         */

        /**
         * Constructs a new BackSendChatMessage.
         * @memberof message
         * @classdesc Represents a BackSendChatMessage.
         * @implements IBackSendChatMessage
         * @constructor
         * @param {message.IBackSendChatMessage=} [properties] Properties to set
         */
        function BackSendChatMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BackSendChatMessage msg.
         * @member {string} msg
         * @memberof message.BackSendChatMessage
         * @instance
         */
        BackSendChatMessage.prototype.msg = "";

        /**
         * Creates a new BackSendChatMessage instance using the specified properties.
         * @function create
         * @memberof message.BackSendChatMessage
         * @static
         * @param {message.IBackSendChatMessage=} [properties] Properties to set
         * @returns {message.BackSendChatMessage} BackSendChatMessage instance
         */
        BackSendChatMessage.create = function create(properties) {
            return new BackSendChatMessage(properties);
        };

        /**
         * Encodes the specified BackSendChatMessage message. Does not implicitly {@link message.BackSendChatMessage.verify|verify} messages.
         * @function encode
         * @memberof message.BackSendChatMessage
         * @static
         * @param {message.IBackSendChatMessage} message BackSendChatMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BackSendChatMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.msg);
            return writer;
        };

        /**
         * Encodes the specified BackSendChatMessage message, length delimited. Does not implicitly {@link message.BackSendChatMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.BackSendChatMessage
         * @static
         * @param {message.IBackSendChatMessage} message BackSendChatMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BackSendChatMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BackSendChatMessage message from the specified reader or buffer.
         * @function decode
         * @memberof message.BackSendChatMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.BackSendChatMessage} BackSendChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BackSendChatMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.BackSendChatMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.msg = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BackSendChatMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.BackSendChatMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.BackSendChatMessage} BackSendChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BackSendChatMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BackSendChatMessage message.
         * @function verify
         * @memberof message.BackSendChatMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BackSendChatMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.msg != null && message.hasOwnProperty("msg"))
                if (!$util.isString(message.msg))
                    return "msg: string expected";
            return null;
        };

        /**
         * Creates a BackSendChatMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.BackSendChatMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.BackSendChatMessage} BackSendChatMessage
         */
        BackSendChatMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.message.BackSendChatMessage)
                return object;
            var message = new $root.message.BackSendChatMessage();
            if (object.msg != null)
                message.msg = String(object.msg);
            return message;
        };

        /**
         * Creates a plain object from a BackSendChatMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.BackSendChatMessage
         * @static
         * @param {message.BackSendChatMessage} message BackSendChatMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BackSendChatMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.msg = "";
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = message.msg;
            return object;
        };

        /**
         * Converts this BackSendChatMessage to JSON.
         * @function toJSON
         * @memberof message.BackSendChatMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BackSendChatMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BackSendChatMessage;
    })();

    message.BroadCastChatMessage = (function() {

        /**
         * Properties of a BroadCastChatMessage.
         * @memberof message
         * @interface IBroadCastChatMessage
         * @property {Array.<message.BroadCastChatMessage.IChat>|null} [list] BroadCastChatMessage list
         */

        /**
         * Constructs a new BroadCastChatMessage.
         * @memberof message
         * @classdesc Represents a BroadCastChatMessage.
         * @implements IBroadCastChatMessage
         * @constructor
         * @param {message.IBroadCastChatMessage=} [properties] Properties to set
         */
        function BroadCastChatMessage(properties) {
            this.list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BroadCastChatMessage list.
         * @member {Array.<message.BroadCastChatMessage.IChat>} list
         * @memberof message.BroadCastChatMessage
         * @instance
         */
        BroadCastChatMessage.prototype.list = $util.emptyArray;

        /**
         * Creates a new BroadCastChatMessage instance using the specified properties.
         * @function create
         * @memberof message.BroadCastChatMessage
         * @static
         * @param {message.IBroadCastChatMessage=} [properties] Properties to set
         * @returns {message.BroadCastChatMessage} BroadCastChatMessage instance
         */
        BroadCastChatMessage.create = function create(properties) {
            return new BroadCastChatMessage(properties);
        };

        /**
         * Encodes the specified BroadCastChatMessage message. Does not implicitly {@link message.BroadCastChatMessage.verify|verify} messages.
         * @function encode
         * @memberof message.BroadCastChatMessage
         * @static
         * @param {message.IBroadCastChatMessage} message BroadCastChatMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BroadCastChatMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.list != null && message.list.length)
                for (var i = 0; i < message.list.length; ++i)
                    $root.message.BroadCastChatMessage.Chat.encode(message.list[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified BroadCastChatMessage message, length delimited. Does not implicitly {@link message.BroadCastChatMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.BroadCastChatMessage
         * @static
         * @param {message.IBroadCastChatMessage} message BroadCastChatMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BroadCastChatMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BroadCastChatMessage message from the specified reader or buffer.
         * @function decode
         * @memberof message.BroadCastChatMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.BroadCastChatMessage} BroadCastChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BroadCastChatMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.BroadCastChatMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.list && message.list.length))
                        message.list = [];
                    message.list.push($root.message.BroadCastChatMessage.Chat.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BroadCastChatMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.BroadCastChatMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.BroadCastChatMessage} BroadCastChatMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BroadCastChatMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BroadCastChatMessage message.
         * @function verify
         * @memberof message.BroadCastChatMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BroadCastChatMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.list != null && message.hasOwnProperty("list")) {
                if (!Array.isArray(message.list))
                    return "list: array expected";
                for (var i = 0; i < message.list.length; ++i) {
                    var error = $root.message.BroadCastChatMessage.Chat.verify(message.list[i]);
                    if (error)
                        return "list." + error;
                }
            }
            return null;
        };

        /**
         * Creates a BroadCastChatMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.BroadCastChatMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.BroadCastChatMessage} BroadCastChatMessage
         */
        BroadCastChatMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.message.BroadCastChatMessage)
                return object;
            var message = new $root.message.BroadCastChatMessage();
            if (object.list) {
                if (!Array.isArray(object.list))
                    throw TypeError(".message.BroadCastChatMessage.list: array expected");
                message.list = [];
                for (var i = 0; i < object.list.length; ++i) {
                    if (typeof object.list[i] !== "object")
                        throw TypeError(".message.BroadCastChatMessage.list: object expected");
                    message.list[i] = $root.message.BroadCastChatMessage.Chat.fromObject(object.list[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a BroadCastChatMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.BroadCastChatMessage
         * @static
         * @param {message.BroadCastChatMessage} message BroadCastChatMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BroadCastChatMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.list = [];
            if (message.list && message.list.length) {
                object.list = [];
                for (var j = 0; j < message.list.length; ++j)
                    object.list[j] = $root.message.BroadCastChatMessage.Chat.toObject(message.list[j], options);
            }
            return object;
        };

        /**
         * Converts this BroadCastChatMessage to JSON.
         * @function toJSON
         * @memberof message.BroadCastChatMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BroadCastChatMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        BroadCastChatMessage.Chat = (function() {

            /**
             * Properties of a Chat.
             * @memberof message.BroadCastChatMessage
             * @interface IChat
             * @property {string|null} [uid] Chat uid
             * @property {string|null} [sender] Chat sender
             * @property {string|null} [senderAvatar] Chat senderAvatar
             * @property {string|null} [content] Chat content
             * @property {string|null} [action] Chat action
             */

            /**
             * Constructs a new Chat.
             * @memberof message.BroadCastChatMessage
             * @classdesc Represents a Chat.
             * @implements IChat
             * @constructor
             * @param {message.BroadCastChatMessage.IChat=} [properties] Properties to set
             */
            function Chat(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Chat uid.
             * @member {string} uid
             * @memberof message.BroadCastChatMessage.Chat
             * @instance
             */
            Chat.prototype.uid = "";

            /**
             * Chat sender.
             * @member {string} sender
             * @memberof message.BroadCastChatMessage.Chat
             * @instance
             */
            Chat.prototype.sender = "";

            /**
             * Chat senderAvatar.
             * @member {string} senderAvatar
             * @memberof message.BroadCastChatMessage.Chat
             * @instance
             */
            Chat.prototype.senderAvatar = "";

            /**
             * Chat content.
             * @member {string} content
             * @memberof message.BroadCastChatMessage.Chat
             * @instance
             */
            Chat.prototype.content = "";

            /**
             * Chat action.
             * @member {string} action
             * @memberof message.BroadCastChatMessage.Chat
             * @instance
             */
            Chat.prototype.action = "";

            /**
             * Creates a new Chat instance using the specified properties.
             * @function create
             * @memberof message.BroadCastChatMessage.Chat
             * @static
             * @param {message.BroadCastChatMessage.IChat=} [properties] Properties to set
             * @returns {message.BroadCastChatMessage.Chat} Chat instance
             */
            Chat.create = function create(properties) {
                return new Chat(properties);
            };

            /**
             * Encodes the specified Chat message. Does not implicitly {@link message.BroadCastChatMessage.Chat.verify|verify} messages.
             * @function encode
             * @memberof message.BroadCastChatMessage.Chat
             * @static
             * @param {message.BroadCastChatMessage.IChat} message Chat message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Chat.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.uid);
                if (message.sender != null && Object.hasOwnProperty.call(message, "sender"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.sender);
                if (message.senderAvatar != null && Object.hasOwnProperty.call(message, "senderAvatar"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.senderAvatar);
                if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.content);
                if (message.action != null && Object.hasOwnProperty.call(message, "action"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.action);
                return writer;
            };

            /**
             * Encodes the specified Chat message, length delimited. Does not implicitly {@link message.BroadCastChatMessage.Chat.verify|verify} messages.
             * @function encodeDelimited
             * @memberof message.BroadCastChatMessage.Chat
             * @static
             * @param {message.BroadCastChatMessage.IChat} message Chat message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Chat.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Chat message from the specified reader or buffer.
             * @function decode
             * @memberof message.BroadCastChatMessage.Chat
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {message.BroadCastChatMessage.Chat} Chat
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Chat.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.BroadCastChatMessage.Chat();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.uid = reader.string();
                        break;
                    case 2:
                        message.sender = reader.string();
                        break;
                    case 3:
                        message.senderAvatar = reader.string();
                        break;
                    case 4:
                        message.content = reader.string();
                        break;
                    case 5:
                        message.action = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Chat message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof message.BroadCastChatMessage.Chat
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {message.BroadCastChatMessage.Chat} Chat
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Chat.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Chat message.
             * @function verify
             * @memberof message.BroadCastChatMessage.Chat
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Chat.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (!$util.isString(message.uid))
                        return "uid: string expected";
                if (message.sender != null && message.hasOwnProperty("sender"))
                    if (!$util.isString(message.sender))
                        return "sender: string expected";
                if (message.senderAvatar != null && message.hasOwnProperty("senderAvatar"))
                    if (!$util.isString(message.senderAvatar))
                        return "senderAvatar: string expected";
                if (message.content != null && message.hasOwnProperty("content"))
                    if (!$util.isString(message.content))
                        return "content: string expected";
                if (message.action != null && message.hasOwnProperty("action"))
                    if (!$util.isString(message.action))
                        return "action: string expected";
                return null;
            };

            /**
             * Creates a Chat message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof message.BroadCastChatMessage.Chat
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {message.BroadCastChatMessage.Chat} Chat
             */
            Chat.fromObject = function fromObject(object) {
                if (object instanceof $root.message.BroadCastChatMessage.Chat)
                    return object;
                var message = new $root.message.BroadCastChatMessage.Chat();
                if (object.uid != null)
                    message.uid = String(object.uid);
                if (object.sender != null)
                    message.sender = String(object.sender);
                if (object.senderAvatar != null)
                    message.senderAvatar = String(object.senderAvatar);
                if (object.content != null)
                    message.content = String(object.content);
                if (object.action != null)
                    message.action = String(object.action);
                return message;
            };

            /**
             * Creates a plain object from a Chat message. Also converts values to other types if specified.
             * @function toObject
             * @memberof message.BroadCastChatMessage.Chat
             * @static
             * @param {message.BroadCastChatMessage.Chat} message Chat
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Chat.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.uid = "";
                    object.sender = "";
                    object.senderAvatar = "";
                    object.content = "";
                    object.action = "";
                }
                if (message.uid != null && message.hasOwnProperty("uid"))
                    object.uid = message.uid;
                if (message.sender != null && message.hasOwnProperty("sender"))
                    object.sender = message.sender;
                if (message.senderAvatar != null && message.hasOwnProperty("senderAvatar"))
                    object.senderAvatar = message.senderAvatar;
                if (message.content != null && message.hasOwnProperty("content"))
                    object.content = message.content;
                if (message.action != null && message.hasOwnProperty("action"))
                    object.action = message.action;
                return object;
            };

            /**
             * Converts this Chat to JSON.
             * @function toJSON
             * @memberof message.BroadCastChatMessage.Chat
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Chat.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Chat;
        })();

        return BroadCastChatMessage;
    })();

    return message;
})();

module.exports = $root;
