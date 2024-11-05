import styles from "./Table.module.scss";
import { doubleShuffledSymbols } from "../Symbols/Symbols";
import { useState } from "react";

function createCards(arr) {
	return arr.map((symbol, index) => {
		return {
			id: index,
			content: symbol,
			shown: false,
			isAvailiable: true,
			matched: false,
		};
	});
}

const cards = createCards(doubleShuffledSymbols);

export function Table() {
	const [gameBoard, setGameBoard] = useState(cards);

	const [firstSelectedCard, setFirstSelectedCard] = useState(null);
	const [secondSelectedCard, setSecondSelectedCard] = useState(null);

	const [pointsCounter, setPointsCounter] = useState(0);

	function selectCard(index) {
		setGameBoard((prevGameBoard) =>
			prevGameBoard.map((card) => {
				if (card === gameBoard[index]) {
					return { ...card, shown: true };
				}
				return card;
			})
		);

		if (firstSelectedCard === null) {
			setFirstSelectedCard(gameBoard[index].id);
		} else {
			setSecondSelectedCard(gameBoard[index].id);
			setGameBoard((prevGameBoard) =>
				prevGameBoard.map((card) => {
					return { ...card, isAvailiable: false };
				})
			);
			setTimeout(() => {
				setGameBoard((prevGameBoard) =>
					prevGameBoard.map((card) => {
						return { ...card, isAvailiable: true };
					})
				);
			}, 1000);
		}
	}

	function compareSelectedCards(firstCard, secondCard) {
		if (
			secondCard !== null &&
			gameBoard[firstCard].content !== gameBoard[secondCard].content
		) {
			setTimeout(() => {
				setGameBoard((prevGameBoard) =>
					prevGameBoard.map((card) => {
						if (card.id === firstCard || card.id === secondCard) {
							return { ...card, shown: false };
						}
						return card;
					})
				);
			}, 1000);

			setFirstSelectedCard(null);
			setSecondSelectedCard(null);
		}

		if (
			secondCard !== null &&
			gameBoard[firstCard].content === gameBoard[secondCard].content
		) {
			setGameBoard((prevGameBoard) =>
				prevGameBoard.map((card) => {
					if (card.id === firstCard || card.id === secondCard) {
						return { ...card, matched: true };
					}
					return card;
				})
			);

			setFirstSelectedCard(null);
			setSecondSelectedCard(null);
			setPointsCounter((prevPointsCounter) => prevPointsCounter + 1);
		}
	}

	compareSelectedCards(firstSelectedCard, secondSelectedCard);

	return (
		<>
			{gameBoard.map((card, index) => {
				return (
					<button
						onClick={() => selectCard(index)}
						className={styles.card}
						key={index}
						disabled={card.matched || !card.isAvailiable}>
						{card.shown === true ? card.content : "❓"}
					</button>
				);
			})}

			{
				<div className={styles.bottom_info}>
					<h2 className={styles.bottom_info__score}>
						Znalezione pary: <span>{pointsCounter}</span>/8
					</h2>
					<button
						onClick={() => window.location.reload()}
						className={styles.bottom_info__reset_btn}>
						Zacznij od nowa
					</button>
				</div>
			}
		</>
	);
}
