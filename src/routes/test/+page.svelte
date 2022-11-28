<script>
	import { db } from '$lib/firebase';
	import { collection, getDocs } from 'firebase/firestore';

	const q = getDocs(collection(db, 'games'));

	q.then((d) => d.forEach(a => console.log(a.data())));

</script>

<h1>Testing Firebase</h1>

{#await q then x}
	<pre>{x}</pre>
{/await}

