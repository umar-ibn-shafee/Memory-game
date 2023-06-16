import { CardItem } from "./CardItem";
import GameData from "../app.mock";
import { useEffect, useRef, useState } from "react";

export const CardItemList = () => {
  const [cardList, setCardList] = useState([...GameData]);
  const [clickedItem, setClickedItem] = useState(null);
  const matchedItemsRef = useRef(new Set());

  const onClickHandler = (currentId) => {
    const currentItem = cardList.filter((item) => item.id === currentId);

    if (checkIfAlreadyMatched(currentItem)) {
      console.log("Already Matched......!");
      return;
    }

    setCardList((prev) => {
      if (!clickedItem) {
        const newState = cardList.map((item) => {
          if (item.id === currentId) {
            item.isOpen = true;
            return item;
          }
          return item;
        });
        return newState;
      } else {
        if (clickedItem.id === currentId) {
          console.log("Already Selected......!");
          return prev;
        }
        const newState = cardList.map((item) => {
          if (item.id === currentId) {
            item.isOpen = true;
            return item;
          }
          return item;
        });

        return newState;
      }
    });

    setClickedItem(currentItem[0]);
  };

  const checkIfAlreadyMatched = (currentItem) => {
    return (
      matchedItemsRef.current.size !== 0 &&
      matchedItemsRef.current.has(currentItem[0].name)
    );
  };

  const checkIfMatched = (openItems, length) => {
    if (openItems[length - 2].name === openItems[length - 1].name) {
      matchedItemsRef.current.add(openItems[0].name);
      console.log("Matched-Items-Updated:", matchedItemsRef.current);
      console.log("Matched....!");
      return true;
    }
    return false;
  };

  const toggleImages = (openItems) => {
    const openItemsLength = openItems.length;

    setTimeout(() => {
      if (openItemsLength >= 2) {
        const isMatched = checkIfMatched(openItems, openItemsLength);
        if (!isMatched) {
          console.log("Not Matching....!");
          setCardList(() => {
            return cardList.map((item) => {
              if (
                matchedItemsRef.current.size !== 0 &&
                matchedItemsRef.current.has(item.name)
              ) {
                item.isOpen = true;
                return item;
              }
              item.isOpen = false;
              setClickedItem(null);
              return item;
            });
          });
        }
      }
    }, 500);
  };

  useEffect(() => {
    const openItems = cardList
      .filter((item) => item.isOpen === true)
      .filter((item) => {
        if (matchedItemsRef.current.size !== 0) {
          return !matchedItemsRef.current.has(item.name);
        }
        return item;
      });

    if (openItems.length > 0) {
      toggleImages(openItems);
    }
  }, [cardList]);

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
