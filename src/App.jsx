import styles from "./App.module.scss";
import { Table } from "./components/Cards/Table";

function App() {
	return (
		<>
			<header className={styles.header}>
				<h1>Memory Game</h1>
				<p>Odnajdź wszystkie pary!</p>
			</header>
			<main className={styles.main}>
				<section className={styles.board}>
					<Table />
				</section>
			</main>
		</>
	);
}

export default App;
