export interface Occluder {
	keyDown: boolean | undefined;
	pressed: boolean | undefined;
	x: number | undefined;
	y: number | undefined;
	done: boolean | undefined;
	pressedAudio: HTMLAudioElement | undefined;
	doneAudio: HTMLAudioElement | undefined;
}
