import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
// import './SliderCard.css'; // Create this CSS file for styling

interface Holiday {
  id: number;
  title: string;
  image: string;
}

const holidayData: Holiday[] = [
  {
    id: 1,
    title: 'Summer Vacation',
    image: 'url_to_image_1.jpg',
  },
  {
    id: 2,
    title: 'Thanksgiving',
    image: 'url_to_image_2.jpg',
  },
  {
    id: 3,
    title: 'Christmas',
    image: 'url_to_image_3.jpg',
  },
  // Add more holiday data
];

const HolidayCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Automatically advance the slider every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === holidayData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentHoliday = holidayData[currentIndex];

  return (
    <Card className="slider-card">
      <CardMedia
        component="img"
        alt={currentHoliday.title}
        height="105"
        image={currentHoliday.image}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {currentHoliday.title} 
        </Typography>
        <Typography variant="subtitle2" component="div">
          Date:{currentHoliday.title} 
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HolidayCard;
