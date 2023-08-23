export const formatTime = (songdt) => {
	let min = parseInt(songdt / 1000 / 60)
	let sec = parseInt((songdt / 1000) % 60)
	if (min < 10) {
		min = '0' + min
	}
	if (sec < 10) {
		sec = '0' + sec
	}
	return min + ":" + sec;
}
