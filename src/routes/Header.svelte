<script>
	import logo from '$lib/images/svelte-logo.svg';
</script>

<header>
	<nav class='bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900'>
		<div class='container flex flex-wrap items-center justify-between mx-auto'>
			<a class='flex items-center' href='/'>
				<img alt='Logo' class='h-6 mr-3 sm:h-9' src={logo} />
				<span class='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>Play Spades</span>
			</a>
			<div class='block w-auto' id='nav-content'>
				<ul
					class='flex flex-row p-4 mt-4 rounded-lg space-x-8 mt-0 text-sm font-medium'>
					<li>
						<a class='block text-white rounded text-blue-700 p-0' href='https://bicyclecards.com/how-to-play/spades'
							 rel='noreferrer' target='_blank'>
							Rules
						</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</header>
