//
//  ZegoExpressEngine+Device.h
//  ZegoExpressEngine
//
//  Copyright © 2019 Zego. All rights reserved.
//

#import "ZegoExpressEngine.h"

NS_ASSUME_NONNULL_BEGIN

@interface ZegoExpressEngine (Device)

/// Mutes or unmutes the microphone.
///
/// Available since: 1.1.0
/// Description: This function is used to control whether to use the collected audio data. Mute (turn off the microphone) will use the muted data to replace the audio data collected by the device for streaming. At this time, the microphone device will still be occupied.
/// Default value: The default is `NO`, which means no muting.
/// When to call: After creating the engine [createEngine].
/// Restrictions: None.
/// Related APIs: Developers who want to control whether to use microphone on the UI should use this function to avoid unnecessary performance overhead by using the [enableAudioCaptureDevice]. You can use [isMicrophoneMuted] to check if the microphone is muted.
///
/// @param mute Whether to mute (disable) the microphone, `YES`: mute (disable) microphone, `NO`: enable microphone.
- (void)muteMicrophone:(BOOL)mute;

/// Checks whether the microphone is muted.
///
/// Available since: 1.1.0
/// Description: Used to determine whether the microphone is set to mute.
/// When to call: After creating the engine [createEngine].
/// Restrictions: None.
/// Related APIs: [muteMicrophone].
///
/// @return Whether the microphone is muted; YES: the microphone is muted; `NO`: the microphone is enable (not muted).
- (BOOL)isMicrophoneMuted;

/// Mutes or unmutes the audio output speaker.
///
/// Available since: 1.1.0
/// Description: After mute speaker, all the SDK sounds will not play, including playing stream, mediaplayer, etc. But the SDK will still occupy the output device.
/// Default value: The default is `NO`, which means no muting.
/// When to call: After creating the engine [createEngine].
/// Restrictions: None.
///
/// @param mute Whether to mute (disable) speaker audio output, `YES`: mute (disable) speaker audio output, `NO`: enable speaker audio output.
- (void)muteSpeaker:(BOOL)mute;

/// Checks whether the audio output speaker is muted.
///
/// Available since: 1.1.0
/// Description: Used to determine whether the audio output is muted.
/// When to call: After creating the engine [createEngine].
/// Restrictions: None.
/// Related APIs: [muteSpeaker].
///
/// @return Whether the speaker is muted; `YES`: the speaker is muted; `NO`: the speaker is enable (not muted).
- (BOOL)isSpeakerMuted;

#if TARGET_OS_OSX
/// Gets a list of audio devices.
///
/// Only supports desktop.
///
/// @param deviceType Audio device type
/// @return Audo device List
- (NSArray<ZegoDeviceInfo *> *)getAudioDeviceList:(ZegoAudioDeviceType)deviceType;
#endif

#if TARGET_OS_OSX
/// Get the device ID of the default audio device.
///
/// Only supports desktop.
///
/// @param deviceType Audio device type
/// @return Default Audio device ID
- (NSString *)getDefaultAudioDeviceID:(ZegoAudioDeviceType)deviceType;
#endif

#if TARGET_OS_OSX
/// Chooses to use the specified audio device.
///
/// Available since: 1.0.0
/// Description: Chooses to use the specified audio device.
/// When to call: After creating the engine [createEngine] and before call [startPublishingStream] or [startPlayingStream].
/// Restrictions: Only supports macOS.
///
/// @param deviceID ID of a device obtained by [getAudioDeviceList]
/// @param deviceType Audio device type
- (void)useAudioDevice:(NSString *)deviceID deviceType:(ZegoAudioDeviceType)deviceType;
#endif

#if TARGET_OS_OSX
/// Get volume for the specified audio device.
///
/// Get volume for the specified audio device. Only for macOS.
///
/// @param deviceID ID of a device obtained by [getAudioDeviceList]
/// @param deviceType Audio device type
/// @return Device volume
- (int)getAudioDeviceVolume:(NSString *)deviceID deviceType:(ZegoAudioDeviceType)deviceType;
#endif

#if TARGET_OS_OSX
/// Set volume for the specified audio device.
///
/// Only for macOS. The direct operating system device may fail due to system restrictions. Please use [setCaptureVolume] and [setPlayVolume] first to adjust the volume of publish and play streams.
///
/// @param deviceID ID of a device obtained by [getAudioDeviceList]
/// @param deviceType Audio device type
/// @param volume Device volume
- (void)setAudioDeviceVolume:(NSString *)deviceID deviceType:(ZegoAudioDeviceType)deviceType volume:(int)volume;
#endif

#if TARGET_OS_OSX
/// Turn on audio device volume monitoring.
///
/// Only for macOS.
///
/// @param deviceID ID of a device obtained by [getAudioDeviceList]
/// @param deviceType Audio device type
- (void)startAudioDeviceVolumeMonitor:(NSString *)deviceID deviceType:(ZegoAudioDeviceType)deviceType;
#endif

#if TARGET_OS_OSX
/// Turn off audio device volume monitoring.
///
/// Only for macOS.
///
/// @param deviceID ID of a device obtained by [getAudioDeviceList]
/// @param deviceType Audio device type
- (void)stopAudioDeviceVolumeMonitor:(NSString *)deviceID deviceType:(ZegoAudioDeviceType)deviceType;
#endif

#if TARGET_OS_OSX
/// Mutes or unmutes the audio device.
///
/// Only for macOS.
///
/// @param deviceID ID of a device obtained by [getAudioDeviceList]
/// @param deviceType Audio device type
/// @param mute Whether to mute the audio device; YES means to mute the audio device; NO means to unmute the audio device.
- (void)muteAudioDevice:(NSString *)deviceID deviceType:(ZegoAudioDeviceType)deviceType mute:(BOOL)mute;
#endif

#if TARGET_OS_OSX
/// Check if the audio device is muted.
///
/// Check if the audio device is muted. Only for macOS.
///
/// @param deviceID ID of a device obtained by [getAudioDeviceList]
/// @param deviceType Audio device type
/// @return Whether the audio device is muted; YES means the audio device is muted; NO means the audio device is not muted.
- (BOOL)isAudioDeviceMuted:(NSString *)deviceID deviceType:(ZegoAudioDeviceType)deviceType;
#endif

/// Enables or disables the audio capture device.
///
/// Available since: 1.1.0
/// Description: This function is used to control whether to release the audio collection device. When the audio collection device is turned off, the SDK will no longer occupy the audio device. Of course, if the stream is being published at this time, there is no audio data.
/// Use cases: When the user never needs to use the audio, you can call this function to close the audio collection.
/// Default value: The default is `NO`.
/// When to call: After creating the engine [createEngine].
/// Restrictions: None.
/// Related APIs: Turning off or turning on the microphone on the hardware is a time-consuming operation, and there is a certain performance overhead when the user performs frequent operations. [muteMicrophone] is generally recommended.
///
/// @param enable Whether to enable the audio capture device, `YES`: disable audio capture device, `NO`: enable audio capture device.
- (void)enableAudioCaptureDevice:(BOOL)enable;

#if TARGET_OS_IPHONE
/// get current audio route type.
///
/// Available since: 1.1.0
/// Description: Audio routing refers to the audio output device that an app uses to play audio, and common audio routes are: speakers, handsets, headphones, Bluetooth devices, and so on.
/// When to call: After creating the engine [createEngine].
/// Restrictions: None.
/// Related APIs: Set audio route to speaker [setAudioRouteToSpeaker].
- (ZegoAudioRoute)getAudioRouteType;
#endif

#if TARGET_OS_IPHONE
/// Whether to use the built-in speaker to play audio.
///
/// Available since: 1.1.0
/// Description: Whether to use the speaker to play audio, when you choose not to use the built-in speaker to play the sound, the SDK will select the audio output device with the highest current priority to play the sound according to the system schedule, and common audio routes are: handsets, headphones, Bluetooth devices, and so on.
/// When to call: After creating the engine [createEngine].
/// Restrictions: None.
/// Related APIs: Get the current audio route [getAudioRouteType].
///
/// @param defaultToSpeaker Whether to use the built-in speaker to play sound, `YES`: use the built-in speaker to play sound, `NO`: use the highest priority audio output device scheduled by the current system to play sound
- (void)setAudioRouteToSpeaker:(BOOL)defaultToSpeaker;
#endif

/// Turns on/off the camera.
///
/// Available since: 1.1.0
/// Description: This function is used to control whether to start the camera acquisition. After the camera is turned off, video capture will not be performed. At this time, the publish stream will also have no video data.
/// Default value: The default is `YES` which means the camera is turned on.
/// When to call: After creating the engine [createEngine].
/// Restrictions: None.
/// Caution: In the case of using the custom video capture function [enableCustomVideoCapture], since the developer has taken over the video data capture, the SDK is no longer responsible for the video data capture, but this function still affects whether to encode or not. Therefore, when developers use custom video capture, please ensure that the value of this function is `YES`.
///
/// @param enable Whether to turn on the camera, `YES`: turn on camera, `NO`: turn off camera
- (void)enableCamera:(BOOL)enable;

/// Turns on/off the camera (for the specified channel).
///
/// Available since: 1.1.0
/// Description: This function is used to control whether to start the camera acquisition. After the camera is turned off, video capture will not be performed. At this time, the publish stream will also have no video data.
/// Default value: The default is `YES` which means the camera is turned on.
/// When to call: After creating the engine [createEngine].
/// Restrictions: None.
/// Caution: In the case of using the custom video capture function [enableCustomVideoCapture], since the developer has taken over the video data capture, the SDK is no longer responsible for the video data capture, but this function still affects whether to encode or not. Therefore, when developers use custom video capture, please ensure that the value of this function is `YES`.
///
/// @param enable Whether to turn on the camera, `YES`: turn on camera, `NO`: turn off camera
/// @param channel Publishing stream channel
- (void)enableCamera:(BOOL)enable channel:(ZegoPublishChannel)channel;

#if TARGET_OS_IPHONE
/// Switches to the front or the rear camera.
///
/// Available since: 1.1.0
/// Description: This function is used to control the use of the front camera or the rear camera (only supported by Android and iOS).
/// Default value: The default is `YES` which means the front camera is used.
/// When to call: After creating the engine [createEngine].
/// Restrictions: None.
/// Caution: When the custom video capture function [enableCustomVideoCapture] is turned on, since the developer has taken over the video data capture, the SDK is no longer responsible for the video data capture, and this function is no longer valid.
///
/// @param enable Whether to use the front camera, `YES`: use the front camera, `NO`: use the the rear camera.
- (void)useFrontCamera:(BOOL)enable;
#endif

#if TARGET_OS_IPHONE
/// Switches to the front or the rear camera (for the specified channel).
///
/// Available since: 1.1.0
/// Description: This function is used to control the use of the front camera or the rear camera (only supported by Android and iOS).
/// Default value: The default is `YES` which means the front camera is used.
/// When to call: After creating the engine [createEngine].
/// Restrictions: None.
/// Caution: When the custom video capture function [enableCustomVideoCapture] is turned on, since the developer has taken over the video data capture, the SDK is no longer responsible for the video data capture, and this function is no longer valid.
///
/// @param enable Whether to use the front camera, `YES`: use the front camera, `NO`: use the the rear camera.
/// @param channel Publishing stream channel
- (void)useFrontCamera:(BOOL)enable channel:(ZegoPublishChannel)channel;
#endif

#if TARGET_OS_IPHONE
/// Whether the camera supports focusing.
///
/// Available since: 2.14.0
/// Description: Whether the camera supports focusing.
/// Trigger: Called after turn on preview [startPreivew].
/// Caution: Need to start the camera successfully.
///
/// @param channel Publishing stream channel
/// @return Whether to support focus, support is YES, not support is NO.
- (BOOL)isCameraFocusSupported:(ZegoPublishChannel)channel;
#endif

#if TARGET_OS_IPHONE
/// Set the camera focus mode.
///
/// Available since: 2.14.0
/// Description: Set the camera focus mode.
/// Trigger: Called after turn on preview [startPreivew].
/// Restrictions: Currently only supports iOS and Android platforms.
///
/// @param mode focus mode.
/// @param channel Publishing stream channel
- (void)setCameraFocusMode:(ZegoCameraFocusMode)mode channel:(ZegoPublishChannel)channel;
#endif

#if TARGET_OS_IPHONE
/// Set the focus point in the preview view.
///
/// Available since: 2.14.0
/// Description: Set the focus point in the preview view. (x, y) are the normalized coordinates in the preview view, that is, the ratio of the position of the focus point relative to the preview view and the width and height of the preview view. The upper left corner is (0, 0).
/// Trigger: Called after turn on preview [startPreivew].
/// Restrictions: Currently only supports iOS and Android platforms.
/// Caution: Every time the camera restarts the acquisition, the settings will become invalid and need to be reset.
///
/// @param x Normalized X axis coordinate value, effective value [0,1].
/// @param y Normalized Y axis coordinate value, effective value [0,1].
/// @param channel Publishing stream channel
- (void)setCameraFocusPointInPreviewX:(float)x y:(float)y channel:(ZegoPublishChannel)channel;
#endif

#if TARGET_OS_IPHONE
/// Set the camera exposure mode.
///
/// Available since: 2.14.0
/// Description: Set the camera exposure mode.
/// Trigger: Called after turn on preview [startPreivew].
/// Restrictions: Currently only supports iOS and Android platforms.
///
/// @param mode Exposure mode.
/// @param channel Publishing stream channel
- (void)setCameraExposureMode:(ZegoCameraExposureMode)mode channel:(ZegoPublishChannel)channel;
#endif

#if TARGET_OS_IPHONE
/// Set the exposure point in the preview view.
///
/// Available since: 2.14.0
/// Description: Set the exposure point in the preview view. (x, y) are the normalized coordinates in the preview view, that is, the ratio of the position of the exposure point relative to the preview view and the width and height of the preview view. The upper left corner is (0, 0).
/// Trigger: Called after turn on preview [startPreivew].
/// Restrictions: Currently only supports iOS and Android platforms.
/// Caution: Every time the camera restarts the acquisition, the settings will become invalid and need to be reset.
///
/// @param x Normalized X axis coordinate value, effective value [0,1].
/// @param y Normalized Y axis coordinate value, effective value [0,1].
/// @param channel Publishing stream channel
- (void)setCameraExposurePointInPreviewX:(float)x y:(float)y channel:(ZegoPublishChannel)channel;
#endif

#if TARGET_OS_IPHONE
/// Set the camera exposure compensation value.
///
/// Available since: 2.10.0
/// Description: Set the camera exposure compensation value.
/// Use cases: User can call this function to set the camera exposure compensation value.
/// When to call /Trigger: Called this function after calling [startPublishingStream] or [startPreview].
/// Restrictions: None.
/// Caution: The setting will be invalid when the camera is restarted.
/// Platform differences: Only supports iOS and Android.
///
/// @param value Camera exposure, the value range is [-1,1], the default 0, -1 tends to darken, 1 tends to brighten.
- (void)setCameraExposureCompensation:(float)value;
#endif

#if TARGET_OS_IPHONE
/// Set the camera exposure compensation value.
///
/// Available since: 2.10.0
/// Description: Set the camera exposure compensation value.
/// Use cases: User can call this function to set the camera exposure compensation value.
/// When to call /Trigger: Called this function after calling [startPublishingStream] or [startPreview].
/// Restrictions: None.
/// Caution: The setting will be invalid when the camera is restarted.
/// Platform differences: Only supports iOS and Android.
///
/// @param value Camera exposure, the value range is [-1,1], the default 0, -1 tends to darken, 1 tends to brighten.
/// @param channel Publishing stream channel
- (void)setCameraExposureCompensation:(float)value channel:(ZegoPublishChannel)channel;
#endif

#if TARGET_OS_IPHONE
/// Set the zoom factor of the camera. Every time the camera is restarted, the camera zoom factor will return to the initial value (1.0).
///
/// Available since: 1.20.0
/// Description: Set the camera zoom factor. Every time the camera is restarted, the camera zoom factor will be restored to its initial value.
/// When to call: After creating the engine [createEngine].
/// Restrictions: The settings will not take effect until the camera is started.
///
/// @param factor The zoom factor of the camera, the minimum value is 1.0, and the maximum value is the return value of [getCameraMaxZoomFactor].
- (void)setCameraZoomFactor:(float)factor;
#endif

#if TARGET_OS_IPHONE
/// Set the zoom factor of the camera. Every time the camera is restarted, the camera zoom factor will return to the initial value (1.0).
///
/// Available since: 1.20.0
/// Description: Set the camera zoom factor. Every time the camera is restarted, the camera zoom factor will be restored to its initial value.
/// When to call: After creating the engine [createEngine].
/// Restrictions: The settings will not take effect until the camera is started.
///
/// @param factor The zoom factor of the camera, the minimum value is 1.0, and the maximum value is the return value of [getCameraMaxZoomFactor].
/// @param channel Publishing stream channel
- (void)setCameraZoomFactor:(float)factor channel:(ZegoPublishChannel)channel;
#endif

#if TARGET_OS_IPHONE
/// Get the maximum zoom factor of the camera.
///
/// Available since: 1.20.0
/// Description: Set the camera zoom factor. Every time the camera is restarted, the camera zoom factor will be restored to its initial value.
/// When to call: This is only available after the camera has been successfully started, and can generally be called when the captured first frame is received [onPublisherCapturedVideoFirstFrame] callback.
/// Restrictions: None.
///
/// @return The maximum zoom factor of the camera.
- (float)getCameraMaxZoomFactor;
#endif

#if TARGET_OS_IPHONE
/// Get the maximum zoom factor of the camera.
///
/// Available since: 1.20.0
/// Description: Set the camera zoom factor. Every time the camera is restarted, the camera zoom factor will be restored to its initial value.
/// When to call: This is only available after the camera has been successfully started, and can generally be called when the captured first frame is received [onPublisherCapturedVideoFirstFrame] callback.
/// Restrictions: None.
///
/// @param channel Publishing stream channel
/// @return The maximum zoom factor of the camera.
- (float)getCameraMaxZoomFactor:(ZegoPublishChannel)channel;
#endif

#if TARGET_OS_OSX
/// Chooses to use the specified video device.
///
/// Choose to use a video device. Only for macOS.
///
/// @param deviceID ID of a device obtained by getVideoDeviceList
- (void)useVideoDevice:(NSString *)deviceID;
#endif

#if TARGET_OS_OSX
/// Chooses to use the specified video device (for the specified channel).
///
/// Choose to use a video device. Only for macOS
///
/// @param deviceID ID of a device obtained by getVideoDeviceList
/// @param channel Publishing stream channel
- (void)useVideoDevice:(NSString *)deviceID channel:(ZegoPublishChannel)channel;
#endif

#if TARGET_OS_OSX
/// Gets a list of video devices.
///
/// Choose to use a video device. Only for macOS. Only for macOS
///
/// @return Video device List
- (NSArray<ZegoDeviceInfo *> *)getVideoDeviceList;
#endif

#if TARGET_OS_OSX
/// Get the deviceID of the default video device.
///
/// Get the deviceID of the default video device. Only for macOS
///
/// @return Default video device ID
- (NSString *)getDefaultVideoDeviceID;
#endif

/// Starts sound level monitoring.
///
/// Available since: 1.1.0
/// Description: After starting monitoring, you can receive local audio sound level via [onCapturedSoundLevelUpdate] callback, and receive remote audio sound level via [onRemoteSoundLevelUpdate] callback. Before entering the room, you can call [startPreview] with this function and combine it with [onCapturedSoundLevelUpdate] callback to determine whether the audio device is working properly.
/// Use cases: During the publishing and playing process, determine who is talking on the wheat and do a UI presentation, in the host K song scene, has been published or played under the premise that the host or audience to see the tone and volume change animation.
/// When to call: After the engine is created [createEngine].
/// Caution: [onCapturedSoundLevelUpdate] and [onRemoteSoundLevelUpdate] callback notification period is 100 ms.
- (void)startSoundLevelMonitor;

/// Starts sound level monitoring. Support setting the listening interval.
///
/// Available since: 1.15.0
/// Description: After starting monitoring, you can receive local audio sound level via [onCapturedSoundLevelUpdate] callback, and receive remote audio sound level via [onRemoteSoundLevelUpdate] callback. Before entering the room, you can call [startPreview] with this function and combine it with [onCapturedSoundLevelUpdate] callback to determine whether the audio device is working properly.
/// Use cases: During the publishing and playing process, determine who is talking on the wheat and do a UI presentation.
/// When to call: After the engine is created [createEngine].
/// Caution: [onCapturedSoundLevelUpdate] and [onRemoteSoundLevelUpdate] callback notification period is the value set by the parameter. If you want to use advanced feature of sound level, please use the function of the same name (the parameter type is ZegoSoundLevelConfig) instead.
///
/// @param millisecond Monitoring time period of the sound level, in milliseconds, has a value range of [100, 3000]. Default is 100 ms.
- (void)startSoundLevelMonitor:(unsigned int)millisecond;

/// Starts sound level monitoring. Support enable some advanced feature.
///
/// Available since: 2.10.0
/// Description: After starting monitoring, you can receive local audio sound level via [onCapturedSoundLevelUpdate] callback, and receive remote audio sound level via [onRemoteSoundLevelUpdate] callback. Before entering the room, you can call [startPreview] with this function and combine it with [onCapturedSoundLevelUpdate] callback to determine whether the audio device is working properly.
/// Use cases: During the publishing and playing process, determine who is talking on the wheat and do a UI presentation.
/// When to call: After the engine is created [createEngine].
/// Caution: [onCapturedSoundLevelUpdate] and [onRemoteSoundLevelUpdate] callback notification period is the value set by the parameter.
///
/// @param config Configuration for starts the sound level monitor.
- (void)startSoundLevelMonitorWithConfig:(ZegoSoundLevelConfig *)config;

/// Stops sound level monitoring.
///
/// Available since: 1.1.0
/// Description: After the monitoring is stopped, the callback of the local/remote audio sound level will be stopped.
/// When to call: After the engine is created [createEngine].
/// Related APIs: Soundwave monitoring can be initiated via [startSoundLevelMonitor].
- (void)stopSoundLevelMonitor;

/// Starts audio spectrum monitoring.
///
/// Available since: 1.1.0
/// Description: After starting monitoring, you can receive local audio spectrum via [onCapturedAudioSpectrumUpdate] callback, and receive remote audio spectrum via [onRemoteAudioSpectrumUpdate] callback.
/// Use cases: In the host K song scene, has been published or played under the premise that the host or audience to see the tone and volume change animation.
/// When to call: After the engine is created [createEngine].
/// Caution: [onCapturedAudioSpectrumUpdate] and [onRemoteAudioSpectrumUpdate] callback notification period is 100 ms.
- (void)startAudioSpectrumMonitor;

/// Starts audio spectrum monitoring. Support setting the listening interval.
///
/// Available since: 1.15.0
/// Description: After starting monitoring, you can receive local audio spectrum via [onCapturedAudioSpectrumUpdate] callback, and receive remote audio spectrum via [onRemoteAudioSpectrumUpdate] callback.
/// Use cases: In the host K song scene, has been published or played under the premise that the host or audience to see the tone and volume change animation.
/// When to call: After the engine is created [createEngine].
/// Caution: [onCapturedAudioSpectrumUpdate] and [onRemoteAudioSpectrumUpdate] callback notification period is the value set by the parameter.
///
/// @param millisecond Monitoring time period of the audio spectrum, in milliseconds, has a value range of [100, 3000]. Default is 100 ms.
- (void)startAudioSpectrumMonitor:(unsigned int)millisecond;

/// Stops audio spectrum monitoring.
///
/// Available since: 1.1.0
/// Description: After the monitoring is stopped, the callback of the local/remote audio spectrum will be stopped.
/// When to call: After the engine is created [createEngine].
/// Related APIs: Audio spectrum monitoring can be initiated via [startAudioSpectrumMonitor].
- (void)stopAudioSpectrumMonitor;

/// Enables or disables headphone monitoring.
///
/// Available since: 1.9.0
/// Description: Enable/Disable headphone monitor, and users hear their own voices as they use the microphone to capture sounds.
/// When to call: After the engine is created [createEngine].
/// Default value: Disable.
/// Caution: This setting does not actually take effect until both the headset and microphone are connected.
///
/// @param enable Whether to use headphone monitor, YES: enable, NO: disable
- (void)enableHeadphoneMonitor:(BOOL)enable;

/// Sets the headphone monitor volume.
///
/// Available since: 1.9.0
/// Description: set headphone monitor volume.
/// When to call: After the engine is created [createEngine].
/// Caution: This setting does not actually take effect until both the headset and microphone are connected.
/// Related APIs: Enables or disables headphone monitoring via [enableHeadphoneMonitor].
///
/// @param volume headphone monitor volume, range from 0 to 200, 60 as default.
- (void)setHeadphoneMonitorVolume:(int)volume;

#if TARGET_OS_OSX
/// Enable or disable system audio capture.
///
/// Available since: 1.9.0
/// Description: Enable sound card capture to mix sounds played by the system into the publishing stream, such as sounds played by the browser, sounds played by the third-party player, etc.
/// Default value: Default is disable.
/// When to call: Called this function after calling [startPublishingStream] or [startPreview].
/// Restrictions: None.
/// Caution: The system sound card sound does not include streaming sound, media player sound and sound effect player sound.
/// Related APIs: [setMixSystemPlayoutVolume] function can set system audio capture volume.
/// Platform differences: Only supports Windows and macOS.
///
/// @param enable Whether to mix system playout.
- (void)enableMixSystemPlayout:(BOOL)enable;
#endif

#if TARGET_OS_OSX
/// set system audio capture volume.
///
/// only for macOS
///
/// @param volume the volume. Valid range [0, 200], default is 100.
- (void)setMixSystemPlayoutVolume:(int)volume;
#endif

#if TARGET_OS_OSX
/// Enable or disable mix SDK playout to stream publishing.
///
/// Enable mix SDK playout sounds into the stream publishing... only for macOS.
///
/// @param enable Whether to mix engine playout
- (void)enableMixEnginePlayout:(BOOL)enable;
#endif

/// Start audio VAD stable state monitoring.
///
/// Available: since 2.14.0
/// Description: After monitoring is started, you can use the [onAudioVADStateUpdate] callback to receive the specified type of audio VAD callback.
/// Use cases: For example, when you specify the type of collection and use the microphone to collect, you can check whether the host has continuous and stable voice input through this interface.
/// When to call: Before publish stream, you can call [startPreview] with this function and combine it with [onAudioVADStateUpdate] callback to determine whether the audio device is working properly.
/// Restrictions: [onAudioVADStateUpdate] callback notification period is 3 seconds.
/// Related APIs: [stopAudioVADStableStateMonitor].
///
/// @param type audio VAD monitor type.
- (void)startAudioVADStableStateMonitor:(ZegoAudioVADStableStateMonitorType)type;

/// Start audio VAD stable state monitoring, and the monitoring period can be set.
///
/// Available: since 2.17.0
/// Description: After monitoring is started, you can use the [onAudioVADStateUpdate] callback to receive the specified type of audio VAD callback.
/// Use cases: For example, when you specify the type of collection and use the microphone to collect, you can check whether the host has continuous and stable voice input through this interface.
/// When to call: Before publish stream, you can call [startPreview] with this function and combine it with [onAudioVADStateUpdate] callback to determine whether the audio device is working properly.
/// Restrictions: None.
/// Related APIs: [stopAudioVADStableStateMonitor].
///
/// @param type audio VAD monitor type.
/// @param millisecond monitoring period
- (void)startAudioVADStableStateMonitor:(ZegoAudioVADStableStateMonitorType)type millisecond:(int)millisecond;

/// Stop audio VAD stable state monitoring.
///
/// Available: since 2.14.0
/// Description: After calling this interface, the specified type of [onAudioVADStateUpdate] callback can no longer be received.
/// When to call: None.
/// Restrictions: None.
/// Related APIs: [startAudioVADStableStateMonitor].
///
/// @param type audio VAD monitor type.
- (void)stopAudioVADStableStateMonitor:(ZegoAudioVADStableStateMonitorType)type;

#if TARGET_OS_OSX
/// Get the audio device information currently in use.
///
/// Available since: 2.12.0
/// Description: Get the audio device information currently in use.
/// Use cases: Used for scenes that need to manually switch between multiple audio devices.
/// When to call: Called this function after calling [startPublishingStream] or [startPreview].
/// Restrictions: Only supports Windows and macOS.
/// Related APIs: The default audio device ID can be obtained through [getDefaultAudioDeviceID].
///
/// @param deviceType Audio device type.Required:Yes.
/// @return Audio device information.
- (ZegoDeviceInfo *)getCurrentAudioDevice:(ZegoAudioDeviceType)deviceType;
#endif

#if TARGET_OS_IPHONE
/// [Deprecated] Whether to use the built-in speaker to play audio.This function has been deprecated since version 2.3.0 Please use [setAudioRouteToSpeaker] instead.
///
/// This function has been deprecated since version 2.3.0 Please use [setAudioRouteToSpeaker] instead.
/// When you choose not to use the built-in speaker to play sound, that is, set to NO, the SDK will select the currently highest priority audio output device to play the sound according to the system schedule
///
/// @deprecated This function has been deprecated since version 2.3.0 Please use [setAudioRouteToSpeaker] instead.
/// @param enable Whether to use the built-in speaker to play sound, YES: use the built-in speaker to play sound, NO: use the highest priority audio output device scheduled by the current system to play sound
- (void)setBuiltInSpeakerOn:(BOOL)enable DEPRECATED_ATTRIBUTE;
#endif

@end

NS_ASSUME_NONNULL_END
