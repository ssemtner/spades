<script>
	import { db } from '$lib/firebase';
	import { collection, getDocs } from 'firebase/firestore';

	const q = getDocs(collection(db, 'games'));

	q.then((d) => d.forEach((a) => console.log(a.data())));
	let t = 0;
</script>

<h1>Testing Firebase</h1>
<p>{t}</p>
<button on:click={() => (t += 3)}>Inc</button>
