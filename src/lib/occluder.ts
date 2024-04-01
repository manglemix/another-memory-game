export interface Occluder {
	keyDown: boolean | undefined;
	pressed: boolean | undefined;
	done: boolean | undefined;
	pressedAudio: HTMLAudioElement | undefined;
	doneAudio: HTMLAudioElement | undefined;
}
