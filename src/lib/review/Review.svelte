<script lang="ts">
	import { page } from '$app/state'
	import { afterNavigate } from '$app/navigation'
	import { onMount, tick } from 'svelte'
	import { Copy, Check, X } from '@lucide/svelte'
	import { load, save, serialize, type Comment } from './storage'
	import { context, wrapRange, unwrap, locateAndWrap } from './range'

	let comments = $state<Comment[]>([])
	let draft = $state('')
	let editing = $state<string | null>(null)
	let box = $state<{ top: number; left: number } | null>(null)
	let copied = $state(false)
	let ta = $state<HTMLTextAreaElement | undefined>()

	let pending: { id: string; quote: string; prefix: string; suffix: string } | null = null

	const path = $derived(page.url.pathname)

	const reload = async () => {
		close()
		comments = load(path)
		await tick()
		const el = root()
		if (el === null) return
		for (const comment of comments) locateAndWrap(el, comment)
	}

	onMount(() => {
		const abort = new AbortController()
		document.addEventListener('pointerup', onpointerup, { signal: abort.signal })
		void reload()
		return () => abort.abort()
	})

	afterNavigate(() => {
		void reload()
	})

	const onpointerup = (event: PointerEvent) => {
		const target = event.target
		if (!(target instanceof Element)) return
		if (target.closest('[data-review-ui]')) return
		if (target.closest('a, button, input, textarea')) return

		const mark = target.closest('mark.review-mark')
		const el = root()
		const selection = document.getSelection()
		const range =
			el !== null &&
			selection !== null &&
			!selection.isCollapsed &&
			selection.rangeCount > 0 &&
			el.contains(selection.getRangeAt(0).commonAncestorContainer)
				? selection.getRangeAt(0).cloneRange()
				: null
		const quote = range?.toString().trim() ?? ''
		const rect = range?.getBoundingClientRect()
		const markId = mark instanceof HTMLElement ? mark.dataset.review : undefined
		const markRect = mark instanceof HTMLElement ? mark.getBoundingClientRect() : null

		queueMicrotask(() => {
			if (markId !== undefined && markRect !== null) {
				if (pending !== null && markId === pending.id) return
				if (editing !== null) persist()
				openExisting(markId, markRect)
				return
			}

			if (range !== null && quote !== '' && rect !== undefined && el !== null) {
				if (editing !== null) persist()
				const id = crypto.randomUUID()
				const selected = range.toString()
				const { prefix, suffix } = context(range, el)
				wrapRange(range, id, true)
				document.getSelection()?.removeAllRanges()
				pending = { id, quote: selected, prefix, suffix }
				editing = 'new'
				draft = ''
				box = place(rect)
				void focus()
				return
			}

			if (editing !== null) {
				if (draft.trim() === '') close()
				else persist()
			}
		})
	}

	const openExisting = (id: string, rect: DOMRect) => {
		const comment = comments.find((c) => c.id === id)
		if (comment === undefined) return

		pending = null
		editing = id
		draft = comment.comment
		box = place(rect)
		void focus()
	}

	const persist = () => {
		const text = draft.trim()

		if (editing !== null && editing !== 'new') {
			if (text === '') remove(editing)
			else {
				comments = comments.map((c) => (c.id === editing ? { ...c, comment: text } : c))
				save(path, comments)
				void copy()
			}
			close()
			return
		}

		if (text === '' || pending === null) {
			close()
			return
		}

		comments = [...comments, { ...pending, comment: text }]
		save(path, comments)
		for (const mark of document.querySelectorAll(
			`mark[data-review="${CSS.escape(pending.id)}"]`
		))
			mark.classList.remove('pending')
		pending = null
		close()
		void copy()
	}

	const remove = (id: string) => {
		unwrap(id)
		comments = comments.filter((c) => c.id !== id)
		save(path, comments)
		close()
		void copy()
	}

	const close = () => {
		if (pending !== null) unwrap(pending.id)
		editing = null
		draft = ''
		box = null
		pending = null
	}

	const onkeydown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			event.preventDefault()
			close()
			return
		}

		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault()
			persist()
		}
	}

	const reset = () => {
		close()
		for (const comment of comments) unwrap(comment.id)
		comments = []
		save(path, [])
		void copy()
	}

	const copy = async () => {
		const text = serialize(comments)
		try {
			await navigator.clipboard.writeText(text)
		} catch {
			const input = document.createElement('textarea')
			input.value = text
			input.setAttribute('data-review-ui', '')
			document.body.appendChild(input)
			input.select()
			document.execCommand('copy')
			input.remove()
		}
		copied = true
		setTimeout(() => (copied = false), 1200)
	}

	const focus = async () => {
		await tick()
		ta?.focus()
	}

	const place = (rect: DOMRect) => {
		const width = 288
		const left = Math.min(Math.max(8, rect.left), window.innerWidth - width - 8)
		const below = rect.bottom + 8
		const top = below + 96 > window.innerHeight ? Math.max(8, rect.top - 104) : below
		return { top, left }
	}

	const root = () => document.querySelector<HTMLElement>('[data-review-root]')
</script>

{#if box}
	<div
		data-review-ui
		class="border-muted-foreground/25 bg-background fixed z-50 w-72 rounded-md border p-2 shadow-sm"
		style:top="{box.top}px"
		style:left="{box.left}px"
	>
		<textarea
			bind:this={ta}
			bind:value={draft}
			{onkeydown}
			rows="3"
			placeholder="Comment"
			class="placeholder:text-muted-foreground/50 w-full resize-none bg-transparent text-sm outline-none"
		></textarea>
		{#if editing !== null && editing !== 'new'}
			<button
				type="button"
				class="text-muted-foreground text-xs"
				onclick={() => editing !== null && editing !== 'new' && remove(editing)}
			>
				Remove
			</button>
		{/if}
	</div>
{/if}

{#if comments.length > 0}
	<button
		type="button"
		data-review-ui
		aria-label="Reset"
		class="border-muted-foreground/25 bg-background text-muted-foreground hover:text-foreground fixed bottom-4 left-4 z-50 rounded-md border p-2"
		onclick={reset}
	>
		<X class="size-4" />
	</button>
{/if}

<button
	type="button"
	data-review-ui
	aria-label={copied ? 'Copied' : 'Copy'}
	class="border-muted-foreground/25 bg-background text-muted-foreground hover:text-foreground fixed right-4 bottom-4 z-50 rounded-md border p-2"
	onclick={copy}
>
	{#if copied}
		<Check class="size-4" />
	{:else}
		<Copy class="size-4" />
	{/if}
</button>
