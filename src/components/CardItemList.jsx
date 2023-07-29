import { CardItem } from "./CardItem";
import GameData from "../pictures";
import { useEffect, useState } from "react";

export const CardItemList = () => {
  const [cardList, setCardList] = useState([...GameData]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  useEffect(() => {
    if (firstCard && secondCard) {
      setTimeout(() => {
        if (firstCard.pic !== secondCard.pic) {
          setCardList(
            cardList.map((item) =>
              item.id === firstCard.id || item.id === secondCard.id
                ? {
                    ...item,
                    isOpen: false,
                  }
                : item
            )
          );
        }
        setFirstCard(null);
        setSecondCard(null);
      }, 1000);
    }
  }, [firstCard, secondCard]);

  const onClickHandler = (currentId) => {
    const card = cardList.find((item) => item.id === currentId);

    if (card.isOpen) return;

    if (!firstCard) {
      setFirstCard(card);
    } else if (!secondCard) {
      setSecondCard(card);
    } else {
      return;
    }

    setCardList(
      cardList.map((item) =>
        item.id === currentId
          ? {
              ...item,
              isOpen: true,
            }
          : item
      )
    );
  };

  return (
    <div className="card-item-list">
      {cardList.map((item) => {
        return (
          <CardItem
            key={item.id}
            id={item.id}
            image={item.pic}
            onClick={onClickHandler}
            isOpen={item.isOpen}
          ></CardItem>
        );
      })}
    </div>
  );
};
