import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import "../styles/Publicholiday.css";

const initialCards = [
  {
    title: 'Ganesh Chaturthi',
    description: new Date(2023, 8, 19),
    image: 'assets/images/ganesh-chaturthi.jpg',
  },
  {
    title: 'Away-Day',
    description: new Date(2023, 9, 19),
    image: 'assets/images/trip.jpg',
  },
  {
    title:'Dussehra',
    description:new Date(2023, 10, 9),
    image:'assets/images/dussehra.webp',
  }
  // Add more card data as needed
];

export default function PublicHoliday() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const card = initialCards[currentCardIndex];
  const [selectedDate, setSelectedDate] = useState(null);

  const handleNextClick = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % initialCards.length);
    setSelectedDate(null); // Reset the selected date when changing cards
  };

  const handlePreviousClick = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? initialCards.length - 1 : prevIndex - 1
    );
    setSelectedDate(null); // Reset the selected date when changing cards
  };

  const formattedDate = format(new Date(card.description), 'dd MMM yyyy');

  return (
    <div className='card'>
    <Card sx={{  width: '100%' ,overflow:'hidden'}}>
        <div style={{ width: '100%' }}>
        <CardMedia component="img" alt={card.title} height="160" image={card.image} />
      </div>
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {card.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formattedDate}
        </Typography>
        {selectedDate && (
          <Typography variant="body2" color="text.secondary">
            Selected Date: {format(selectedDate, 'dd MMM yyyy')}
          </Typography>
        )}
        {/* <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon /> */}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handlePreviousClick}>
          Previous
        </Button>
        <Button size="small" onClick={handleNextClick}>
          Next
        </Button>
      </CardActions>
    </Card>
    </div>
  );
}
