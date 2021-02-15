import callApi from './callApi'

class Spotify {
	setAccessToken(token) {
		callApi.setAccessToken(token)
	}

	async getMe() {
		return callApi.get('/me')
	}

	async getSavedTracks({offset = 0}) {
		const data = await callApi.get(`/me/tracks?offset=${offset}&limit=50&market=US`)

		const tracks = data.items.map(item => ({
			added_at: item.added_at,
			...item.track,
			uid: item.added_at + item.track.id,
		}))

		return tracks
	}

	async getFollowedArtists({after}) {
		let data

		if (after) {
			data = await callApi.get(`/me/following?type=artist&after=${after}&limit=50`)
		} else {
			data = await callApi.get(`/me/following?type=artist&limit=50`)
		}

		return data.artists.items
	}

	async getUsersTop({type = 'tracks', offset = 0, timeRange = 'short_term'}) {
		const data = await callApi.get(
			`https://api.spotify.com/v1/me/top/${type}?offset=${offset}&limit=50&time_range=${timeRange}`,
		)

		return data.items
	}

	async getNewReleases({offset}) {
		const data = await callApi.get(`browse/new-releases?offset=${offset}&limit=50&country=US`)

		return data.albums.items
	}
}

export default new Spotify()
