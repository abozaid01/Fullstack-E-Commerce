<script>
	// @ts-nocheck

	const getMaxCharacters = (maxCharacters, isOpen, children, text) => {
		if (maxCharacters) {
			if (isOpen) {
				text = children;
			} else {
				text = children.substring(0, maxCharacters);
			}
			return text;
		} else {
			return children;
		}
	};

	const isFullText = (truncatedText, text) => {
		return (
			truncatedText &&
			truncatedText.split('').filter((c) => c !== ' ').length ===
				text.split('').filter((c) => c !== ' ').length
		);
	};

	const getMaxWords = (maxWords, isOpen, children, text) => {
		if (maxWords) {
			if (isOpen) {
				text = children;
			} else {
				const words = children.split(' ').filter((c) => c !== '');
				text = words.slice(0, maxWords).join(' ');
			}
			return text;
		} else {
			return children;
		}
	};
	export let textContent;
	export let readMoreLabel = ' Read more';
	export let readLessLabel = ' Read less';
	export let maxChars;
	export let maxWords;
	export let dotDotDot = '...';

	let text;
	let isOpen = false;
	const cleanText = textContent.replace(/\s+/g, ' ').trim();
	$: finalLabel = isOpen ? readLessLabel : readMoreLabel;
	$: maxCharsText = getMaxCharacters(maxChars, isOpen, cleanText, text);
	$: finalText = getMaxWords(maxWords, isOpen, maxCharsText, text);
	$: finalSymbol = isOpen ? '' : dotDotDot;
	$: showButton = !isOpen && isFullText(finalText, cleanText) ? false : true;

	const handleClick = () => {
		isOpen = !isOpen;
	};
</script>

<div data-testid="wrapper">
	{finalText}
	<span
		data-testid="button-wrapper"
		data-visible={`${showButton}`}
		class="button-wrapper"
	>
		{!isOpen ? finalSymbol : ''}
		<button data-testid="button" on:click={handleClick} class="button">
			{finalLabel}
		</button>
	</span>
</div>

<style>
	/* custom styles */
	.button-wrapper {
		white-space: nowrap;
		margin-left: -4px;
	}
	span[data-visible='false'] {
		visibility: hidden;
	}
	.button {
		border: 0;
		background-color: transparent;
		text-decoration: underline;
		cursor: pointer;
	}
	.button::first-letter {
		text-transform: uppercase;
	}
	.button:hover {
		text-decoration: none;
	}
</style>
