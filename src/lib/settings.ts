const hosts = new Set(['localhost', '127.0.0.1', '::1'])

export const settings = {
	review: () => hosts.has(location.hostname)
}
