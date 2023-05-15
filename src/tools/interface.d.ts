export namespace pay{
    export interface payChannel {
		android: boolean,
		channel: string,
		channelId: number,
		ios: boolean,
		name: string,
		[x:string]:any
	}
}