import React, { useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface CardProps {
  title: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const Card: React.FC<CardProps> = ({ title, index, moveCard }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { title, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "CARD",
    hover: (item: any) => {
      if (item.index !== index) {
        moveCard(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{
        opacity: isDragging ? 0.5 : 1,
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        cursor: "move",
      }}
    >
      {title}
    </div>
  );
};

interface ReviewProps {}

const Review: React.FC<ReviewProps> = () => {
  const [cards, setCards] = useState<string[]>(["Card 1", "Card 2", "Card 3"]);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const dragCard = cards[dragIndex];
    const newCards = [...cards];
    newCards.splice(dragIndex, 1);
    newCards.splice(hoverIndex, 0, dragCard);
    setCards(newCards);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen">
        <div>
          {cards.map((title, index) => (
            <Card key={index} title={title} index={index} moveCard={moveCard} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default Review;
