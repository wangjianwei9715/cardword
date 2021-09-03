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

    message.Login = (function() {

        /**
         * Properties of a Login.
         * @memberof message
         * @interface ILogin
         * @property {string|null} [BuildNo] Login BuildNo
         * @property {number|Long|null} [accountId] Login accountId
         * @property {string|null} [token] Login token
         */

        /**
         * Constructs a new Login.
         * @memberof message
         * @classdesc Represents a Login.
         * @implements ILogin
         * @constructor
         * @param {message.ILogin=} [properties] Properties to set
         */
        function Login(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Login BuildNo.
         * @member {string} BuildNo
         * @memberof message.Login
         * @instance
         */
        Login.prototype.BuildNo = "";

        /**
         * Login accountId.
         * @member {number|Long} accountId
         * @memberof message.Login
         * @instance
         */
        Login.prototype.accountId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Login token.
         * @member {string} token
         * @memberof message.Login
         * @instance
         */
        Login.prototype.token = "";

        /**
         * Creates a new Login instance using the specified properties.
         * @function create
         * @memberof message.Login
         * @static
         * @param {message.ILogin=} [properties] Properties to set
         * @returns {message.Login} Login instance
         */
        Login.create = function create(properties) {
            return new Login(properties);
        };

        /**
         * Encodes the specified Login message. Does not implicitly {@link message.Login.verify|verify} messages.
         * @function encode
         * @memberof message.Login
         * @static
         * @param {message.ILogin} message Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Login.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.BuildNo != null && Object.hasOwnProperty.call(message, "BuildNo"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.BuildNo);
            if (message.accountId != null && Object.hasOwnProperty.call(message, "accountId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.accountId);
            if (message.token != null && Object.hasOwnProperty.call(message, "token"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.token);
            return writer;
        };

        /**
         * Encodes the specified Login message, length delimited. Does not implicitly {@link message.Login.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.Login
         * @static
         * @param {message.ILogin} message Login message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Login.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Login message from the specified reader or buffer.
         * @function decode
         * @memberof message.Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.Login} Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Login.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.Login();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.BuildNo = reader.string();
                    break;
                case 2:
                    message.accountId = reader.int64();
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
         * Decodes a Login message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.Login
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.Login} Login
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Login.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Login message.
         * @function verify
         * @memberof message.Login
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Login.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.BuildNo != null && message.hasOwnProperty("BuildNo"))
                if (!$util.isString(message.BuildNo))
                    return "BuildNo: string expected";
            if (message.accountId != null && message.hasOwnProperty("accountId"))
                if (!$util.isInteger(message.accountId) && !(message.accountId && $util.isInteger(message.accountId.low) && $util.isInteger(message.accountId.high)))
                    return "accountId: integer|Long expected";
            if (message.token != null && message.hasOwnProperty("token"))
                if (!$util.isString(message.token))
                    return "token: string expected";
            return null;
        };

        /**
         * Creates a Login message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.Login
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.Login} Login
         */
        Login.fromObject = function fromObject(object) {
            if (object instanceof $root.message.Login)
                return object;
            var message = new $root.message.Login();
            if (object.BuildNo != null)
                message.BuildNo = String(object.BuildNo);
            if (object.accountId != null)
                if ($util.Long)
                    (message.accountId = $util.Long.fromValue(object.accountId)).unsigned = false;
                else if (typeof object.accountId === "string")
                    message.accountId = parseInt(object.accountId, 10);
                else if (typeof object.accountId === "number")
                    message.accountId = object.accountId;
                else if (typeof object.accountId === "object")
                    message.accountId = new $util.LongBits(object.accountId.low >>> 0, object.accountId.high >>> 0).toNumber();
            if (object.token != null)
                message.token = String(object.token);
            return message;
        };

        /**
         * Creates a plain object from a Login message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.Login
         * @static
         * @param {message.Login} message Login
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Login.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.BuildNo = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.accountId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.accountId = options.longs === String ? "0" : 0;
                object.token = "";
            }
            if (message.BuildNo != null && message.hasOwnProperty("BuildNo"))
                object.BuildNo = message.BuildNo;
            if (message.accountId != null && message.hasOwnProperty("accountId"))
                if (typeof message.accountId === "number")
                    object.accountId = options.longs === String ? String(message.accountId) : message.accountId;
                else
                    object.accountId = options.longs === String ? $util.Long.prototype.toString.call(message.accountId) : options.longs === Number ? new $util.LongBits(message.accountId.low >>> 0, message.accountId.high >>> 0).toNumber() : message.accountId;
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            return object;
        };

        /**
         * Converts this Login to JSON.
         * @function toJSON
         * @memberof message.Login
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Login.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Login;
    })();

    message.PageLocation = (function() {

        /**
         * Properties of a PageLocation.
         * @memberof message
         * @interface IPageLocation
         * @property {string|null} [page] PageLocation page
         */

        /**
         * Constructs a new PageLocation.
         * @memberof message
         * @classdesc Represents a PageLocation.
         * @implements IPageLocation
         * @constructor
         * @param {message.IPageLocation=} [properties] Properties to set
         */
        function PageLocation(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PageLocation page.
         * @member {string} page
         * @memberof message.PageLocation
         * @instance
         */
        PageLocation.prototype.page = "";

        /**
         * Creates a new PageLocation instance using the specified properties.
         * @function create
         * @memberof message.PageLocation
         * @static
         * @param {message.IPageLocation=} [properties] Properties to set
         * @returns {message.PageLocation} PageLocation instance
         */
        PageLocation.create = function create(properties) {
            return new PageLocation(properties);
        };

        /**
         * Encodes the specified PageLocation message. Does not implicitly {@link message.PageLocation.verify|verify} messages.
         * @function encode
         * @memberof message.PageLocation
         * @static
         * @param {message.IPageLocation} message PageLocation message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PageLocation.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.page != null && Object.hasOwnProperty.call(message, "page"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.page);
            return writer;
        };

        /**
         * Encodes the specified PageLocation message, length delimited. Does not implicitly {@link message.PageLocation.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.PageLocation
         * @static
         * @param {message.IPageLocation} message PageLocation message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PageLocation.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PageLocation message from the specified reader or buffer.
         * @function decode
         * @memberof message.PageLocation
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.PageLocation} PageLocation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PageLocation.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.PageLocation();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.page = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PageLocation message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.PageLocation
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.PageLocation} PageLocation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PageLocation.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PageLocation message.
         * @function verify
         * @memberof message.PageLocation
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PageLocation.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.page != null && message.hasOwnProperty("page"))
                if (!$util.isString(message.page))
                    return "page: string expected";
            return null;
        };

        /**
         * Creates a PageLocation message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.PageLocation
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.PageLocation} PageLocation
         */
        PageLocation.fromObject = function fromObject(object) {
            if (object instanceof $root.message.PageLocation)
                return object;
            var message = new $root.message.PageLocation();
            if (object.page != null)
                message.page = String(object.page);
            return message;
        };

        /**
         * Creates a plain object from a PageLocation message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.PageLocation
         * @static
         * @param {message.PageLocation} message PageLocation
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PageLocation.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.page = "";
            if (message.page != null && message.hasOwnProperty("page"))
                object.page = message.page;
            return object;
        };

        /**
         * Converts this PageLocation to JSON.
         * @function toJSON
         * @memberof message.PageLocation
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PageLocation.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PageLocation;
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

    message.BackLogin = (function() {

        /**
         * Properties of a BackLogin.
         * @memberof message
         * @interface IBackLogin
         * @property {message.BackLogin.RetCode|null} [code] BackLogin code
         * @property {string|null} [msg] BackLogin msg
         */

        /**
         * Constructs a new BackLogin.
         * @memberof message
         * @classdesc Represents a BackLogin.
         * @implements IBackLogin
         * @constructor
         * @param {message.IBackLogin=} [properties] Properties to set
         */
        function BackLogin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BackLogin code.
         * @member {message.BackLogin.RetCode} code
         * @memberof message.BackLogin
         * @instance
         */
        BackLogin.prototype.code = 0;

        /**
         * BackLogin msg.
         * @member {string} msg
         * @memberof message.BackLogin
         * @instance
         */
        BackLogin.prototype.msg = "";

        /**
         * Creates a new BackLogin instance using the specified properties.
         * @function create
         * @memberof message.BackLogin
         * @static
         * @param {message.IBackLogin=} [properties] Properties to set
         * @returns {message.BackLogin} BackLogin instance
         */
        BackLogin.create = function create(properties) {
            return new BackLogin(properties);
        };

        /**
         * Encodes the specified BackLogin message. Does not implicitly {@link message.BackLogin.verify|verify} messages.
         * @function encode
         * @memberof message.BackLogin
         * @static
         * @param {message.IBackLogin} message BackLogin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BackLogin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
            if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
            return writer;
        };

        /**
         * Encodes the specified BackLogin message, length delimited. Does not implicitly {@link message.BackLogin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.BackLogin
         * @static
         * @param {message.IBackLogin} message BackLogin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BackLogin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BackLogin message from the specified reader or buffer.
         * @function decode
         * @memberof message.BackLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.BackLogin} BackLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BackLogin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.BackLogin();
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
         * Decodes a BackLogin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.BackLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.BackLogin} BackLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BackLogin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BackLogin message.
         * @function verify
         * @memberof message.BackLogin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BackLogin.verify = function verify(message) {
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
         * Creates a BackLogin message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.BackLogin
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.BackLogin} BackLogin
         */
        BackLogin.fromObject = function fromObject(object) {
            if (object instanceof $root.message.BackLogin)
                return object;
            var message = new $root.message.BackLogin();
            switch (object.code) {
            case "RC_OK":
            case 0:
                message.code = 0;
                break;
            case "RC_UNLOGINED":
            case 1:
                message.code = 1;
                break;
            case "RC_WRONG_TOKEN":
            case 2:
                message.code = 2;
                break;
            case "RC_LOGIN_CLOSED":
            case 3:
                message.code = 3;
                break;
            case "RC_TOO_FAST":
            case 4:
                message.code = 4;
                break;
            }
            if (object.msg != null)
                message.msg = String(object.msg);
            return message;
        };

        /**
         * Creates a plain object from a BackLogin message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.BackLogin
         * @static
         * @param {message.BackLogin} message BackLogin
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BackLogin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.code = options.enums === String ? "RC_OK" : 0;
                object.msg = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = options.enums === String ? $root.message.BackLogin.RetCode[message.code] : message.code;
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = message.msg;
            return object;
        };

        /**
         * Converts this BackLogin to JSON.
         * @function toJSON
         * @memberof message.BackLogin
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BackLogin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * RetCode enum.
         * @name message.BackLogin.RetCode
         * @enum {number}
         * @property {number} RC_OK=0 RC_OK value
         * @property {number} RC_UNLOGINED=1 RC_UNLOGINED value
         * @property {number} RC_WRONG_TOKEN=2 RC_WRONG_TOKEN value
         * @property {number} RC_LOGIN_CLOSED=3 RC_LOGIN_CLOSED value
         * @property {number} RC_TOO_FAST=4 RC_TOO_FAST value
         */
        BackLogin.RetCode = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "RC_OK"] = 0;
            values[valuesById[1] = "RC_UNLOGINED"] = 1;
            values[valuesById[2] = "RC_WRONG_TOKEN"] = 2;
            values[valuesById[3] = "RC_LOGIN_CLOSED"] = 3;
            values[valuesById[4] = "RC_TOO_FAST"] = 4;
            return values;
        })();

        return BackLogin;
    })();

    message.UserAttr = (function() {

        /**
         * Properties of a UserAttr.
         * @memberof message
         * @interface IUserAttr
         * @property {Array.<message.UserAttr.Iattr>|null} [list] UserAttr list
         */

        /**
         * Constructs a new UserAttr.
         * @memberof message
         * @classdesc Represents a UserAttr.
         * @implements IUserAttr
         * @constructor
         * @param {message.IUserAttr=} [properties] Properties to set
         */
        function UserAttr(properties) {
            this.list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserAttr list.
         * @member {Array.<message.UserAttr.Iattr>} list
         * @memberof message.UserAttr
         * @instance
         */
        UserAttr.prototype.list = $util.emptyArray;

        /**
         * Creates a new UserAttr instance using the specified properties.
         * @function create
         * @memberof message.UserAttr
         * @static
         * @param {message.IUserAttr=} [properties] Properties to set
         * @returns {message.UserAttr} UserAttr instance
         */
        UserAttr.create = function create(properties) {
            return new UserAttr(properties);
        };

        /**
         * Encodes the specified UserAttr message. Does not implicitly {@link message.UserAttr.verify|verify} messages.
         * @function encode
         * @memberof message.UserAttr
         * @static
         * @param {message.IUserAttr} message UserAttr message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserAttr.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.list != null && message.list.length)
                for (var i = 0; i < message.list.length; ++i)
                    $root.message.UserAttr.attr.encode(message.list[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified UserAttr message, length delimited. Does not implicitly {@link message.UserAttr.verify|verify} messages.
         * @function encodeDelimited
         * @memberof message.UserAttr
         * @static
         * @param {message.IUserAttr} message UserAttr message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserAttr.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserAttr message from the specified reader or buffer.
         * @function decode
         * @memberof message.UserAttr
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {message.UserAttr} UserAttr
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserAttr.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.UserAttr();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.list && message.list.length))
                        message.list = [];
                    message.list.push($root.message.UserAttr.attr.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserAttr message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof message.UserAttr
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {message.UserAttr} UserAttr
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserAttr.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserAttr message.
         * @function verify
         * @memberof message.UserAttr
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserAttr.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.list != null && message.hasOwnProperty("list")) {
                if (!Array.isArray(message.list))
                    return "list: array expected";
                for (var i = 0; i < message.list.length; ++i) {
                    var error = $root.message.UserAttr.attr.verify(message.list[i]);
                    if (error)
                        return "list." + error;
                }
            }
            return null;
        };

        /**
         * Creates a UserAttr message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof message.UserAttr
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {message.UserAttr} UserAttr
         */
        UserAttr.fromObject = function fromObject(object) {
            if (object instanceof $root.message.UserAttr)
                return object;
            var message = new $root.message.UserAttr();
            if (object.list) {
                if (!Array.isArray(object.list))
                    throw TypeError(".message.UserAttr.list: array expected");
                message.list = [];
                for (var i = 0; i < object.list.length; ++i) {
                    if (typeof object.list[i] !== "object")
                        throw TypeError(".message.UserAttr.list: object expected");
                    message.list[i] = $root.message.UserAttr.attr.fromObject(object.list[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a UserAttr message. Also converts values to other types if specified.
         * @function toObject
         * @memberof message.UserAttr
         * @static
         * @param {message.UserAttr} message UserAttr
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserAttr.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.list = [];
            if (message.list && message.list.length) {
                object.list = [];
                for (var j = 0; j < message.list.length; ++j)
                    object.list[j] = $root.message.UserAttr.attr.toObject(message.list[j], options);
            }
            return object;
        };

        /**
         * Converts this UserAttr to JSON.
         * @function toJSON
         * @memberof message.UserAttr
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserAttr.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        UserAttr.attr = (function() {

            /**
             * Properties of an attr.
             * @memberof message.UserAttr
             * @interface Iattr
             * @property {string|null} [name] attr name
             * @property {number|null} [numberVal] attr numberVal
             * @property {string|null} [strVal] attr strVal
             * @property {boolean|null} [boolVal] attr boolVal
             */

            /**
             * Constructs a new attr.
             * @memberof message.UserAttr
             * @classdesc Represents an attr.
             * @implements Iattr
             * @constructor
             * @param {message.UserAttr.Iattr=} [properties] Properties to set
             */
            function attr(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * attr name.
             * @member {string} name
             * @memberof message.UserAttr.attr
             * @instance
             */
            attr.prototype.name = "";

            /**
             * attr numberVal.
             * @member {number} numberVal
             * @memberof message.UserAttr.attr
             * @instance
             */
            attr.prototype.numberVal = 0;

            /**
             * attr strVal.
             * @member {string} strVal
             * @memberof message.UserAttr.attr
             * @instance
             */
            attr.prototype.strVal = "";

            /**
             * attr boolVal.
             * @member {boolean} boolVal
             * @memberof message.UserAttr.attr
             * @instance
             */
            attr.prototype.boolVal = false;

            /**
             * Creates a new attr instance using the specified properties.
             * @function create
             * @memberof message.UserAttr.attr
             * @static
             * @param {message.UserAttr.Iattr=} [properties] Properties to set
             * @returns {message.UserAttr.attr} attr instance
             */
            attr.create = function create(properties) {
                return new attr(properties);
            };

            /**
             * Encodes the specified attr message. Does not implicitly {@link message.UserAttr.attr.verify|verify} messages.
             * @function encode
             * @memberof message.UserAttr.attr
             * @static
             * @param {message.UserAttr.Iattr} message attr message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            attr.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                if (message.numberVal != null && Object.hasOwnProperty.call(message, "numberVal"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.numberVal);
                if (message.strVal != null && Object.hasOwnProperty.call(message, "strVal"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.strVal);
                if (message.boolVal != null && Object.hasOwnProperty.call(message, "boolVal"))
                    writer.uint32(/* id 4, wireType 0 =*/32).bool(message.boolVal);
                return writer;
            };

            /**
             * Encodes the specified attr message, length delimited. Does not implicitly {@link message.UserAttr.attr.verify|verify} messages.
             * @function encodeDelimited
             * @memberof message.UserAttr.attr
             * @static
             * @param {message.UserAttr.Iattr} message attr message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            attr.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an attr message from the specified reader or buffer.
             * @function decode
             * @memberof message.UserAttr.attr
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {message.UserAttr.attr} attr
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            attr.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.message.UserAttr.attr();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    case 2:
                        message.numberVal = reader.uint32();
                        break;
                    case 3:
                        message.strVal = reader.string();
                        break;
                    case 4:
                        message.boolVal = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an attr message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof message.UserAttr.attr
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {message.UserAttr.attr} attr
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            attr.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an attr message.
             * @function verify
             * @memberof message.UserAttr.attr
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            attr.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.numberVal != null && message.hasOwnProperty("numberVal"))
                    if (!$util.isInteger(message.numberVal))
                        return "numberVal: integer expected";
                if (message.strVal != null && message.hasOwnProperty("strVal"))
                    if (!$util.isString(message.strVal))
                        return "strVal: string expected";
                if (message.boolVal != null && message.hasOwnProperty("boolVal"))
                    if (typeof message.boolVal !== "boolean")
                        return "boolVal: boolean expected";
                return null;
            };

            /**
             * Creates an attr message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof message.UserAttr.attr
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {message.UserAttr.attr} attr
             */
            attr.fromObject = function fromObject(object) {
                if (object instanceof $root.message.UserAttr.attr)
                    return object;
                var message = new $root.message.UserAttr.attr();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.numberVal != null)
                    message.numberVal = object.numberVal >>> 0;
                if (object.strVal != null)
                    message.strVal = String(object.strVal);
                if (object.boolVal != null)
                    message.boolVal = Boolean(object.boolVal);
                return message;
            };

            /**
             * Creates a plain object from an attr message. Also converts values to other types if specified.
             * @function toObject
             * @memberof message.UserAttr.attr
             * @static
             * @param {message.UserAttr.attr} message attr
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            attr.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.name = "";
                    object.numberVal = 0;
                    object.strVal = "";
                    object.boolVal = false;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.numberVal != null && message.hasOwnProperty("numberVal"))
                    object.numberVal = message.numberVal;
                if (message.strVal != null && message.hasOwnProperty("strVal"))
                    object.strVal = message.strVal;
                if (message.boolVal != null && message.hasOwnProperty("boolVal"))
                    object.boolVal = message.boolVal;
                return object;
            };

            /**
             * Converts this attr to JSON.
             * @function toJSON
             * @memberof message.UserAttr.attr
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            attr.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return attr;
        })();

        return UserAttr;
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
     * @property {number} ASSISTSERVER=5 ASSISTSERVER value
     */
    message.NODE = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NONE"] = 0;
        values[valuesById[1] = "GATESERVER"] = 1;
        values[valuesById[2] = "ACCOUNTSERVER"] = 2;
        values[valuesById[3] = "WORLDSERVER"] = 3;
        values[valuesById[4] = "CORESERVER"] = 4;
        values[valuesById[5] = "ASSISTSERVER"] = 5;
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
            case "ASSISTSERVER":
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
            if (message.AccountId != null && Object.hasOwnProperty.call(message, "AccountId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.AccountId);
            if (message.fromNode != null && Object.hasOwnProperty.call(message, "fromNode"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.fromNode);
            if (message.toNode != null && Object.hasOwnProperty.call(message, "toNode"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.toNode);
            if (message.CallId != null && Object.hasOwnProperty.call(message, "CallId"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.CallId);
            if (message.SocketId != null && Object.hasOwnProperty.call(message, "SocketId"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.SocketId);
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
                    message.AccountId = reader.int64();
                    break;
                case 3:
                    message.fromNode = reader.int32();
                    break;
                case 4:
                    message.toNode = reader.int32();
                    break;
                case 5:
                    message.CallId = reader.int64();
                    break;
                case 6:
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

    return message;
})();

module.exports = $root;
