export type EmbedProvider = 'youtube' | 'spotify' | 'vimeo';

/** The result of parsing a pasted URL — not the field's stored value, see `EmbedValue` in `../index.ts`. */
export type ParsedEmbed = {
	provider: EmbedProvider;
	kind: string;
	embedId: string;
	/** Vimeo-only: unlisted videos require this hash (from the share link) to play in the embed. */
	hash?: string;
};

const YOUTUBE_PATTERNS = [
	/youtu\.be\/([a-zA-Z0-9_-]+)/,
	/youtube\.com\/watch\?(?:.*&)?v=([a-zA-Z0-9_-]+)/,
	/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/
];

// Web-copied share links insert a locale segment before the type, e.g. `open.spotify.com/intl-fr/track/...`
// (varies by country — `intl-fr`, `intl-de`, ... ); links copied from the app don't have it. Optional group.
const SPOTIFY_PATTERN =
	/open\.spotify\.com\/(?:intl-[a-zA-Z-]+\/)?(episode|show|track|album|playlist|artist)\/([a-zA-Z0-9]+)/;

// Ordered from most to least specific. The last pattern also matches the trailing `/<hash>` that
// share links for unlisted videos append after the id (`vimeo.com/123456789/abcdef1234`).
const VIMEO_PATTERNS = [
	/player\.vimeo\.com\/video\/(\d+)(?:\?(?:.*&)?h=([a-zA-Z0-9]+))?/,
	/vimeo\.com\/channels\/[a-zA-Z0-9_-]+\/(\d+)/,
	/vimeo\.com\/groups\/[a-zA-Z0-9_-]+\/videos\/(\d+)/,
	/vimeo\.com\/(\d+)(?:\/([a-zA-Z0-9]+))?/
];

/**
 * Detects the provider (YouTube/Spotify/Vimeo) and the id needed to build an embed src.
 * Pure/dependency-free on purpose — no oEmbed network call, no cookies involved.
 */
export function parseEmbedUrl(url: string): ParsedEmbed | null {
	if (!url) return null;

	for (const pattern of YOUTUBE_PATTERNS) {
		const match = url.match(pattern);
		if (match) {
			return { provider: 'youtube', kind: 'video', embedId: match[1] };
		}
	}

	const spotifyMatch = url.match(SPOTIFY_PATTERN);
	if (spotifyMatch) {
		return { provider: 'spotify', kind: spotifyMatch[1], embedId: spotifyMatch[2] };
	}

	for (const pattern of VIMEO_PATTERNS) {
		const match = url.match(pattern);
		if (match) {
			return { provider: 'vimeo', kind: 'video', embedId: match[1], hash: match[2] || undefined };
		}
	}

	return null;
}

/** Shared by the panel preview and the public render so they can never drift. */
export function embedSrc(value: ParsedEmbed): string {
	if (value.provider === 'youtube') {
		return `https://www.youtube-nocookie.com/embed/${value.embedId}`;
	}
	if (value.provider === 'vimeo') {
		// `dnt=1` (do-not-track) is Vimeo's equivalent of youtube-nocookie. `h` is required to
		// play unlisted videos and is only present when the source URL carried a hash.
		const params = new URLSearchParams({ dnt: '1' });
		if (value.hash) params.set('h', value.hash);
		return `https://player.vimeo.com/video/${value.embedId}?${params}`;
	}
	// Spotify has no dedicated no-cookie embed domain — this is the closest available:
	// no third-party cookies are set until the listener interacts with the player.
	return `https://open.spotify.com/embed/${value.kind}/${value.embedId}`;
}
