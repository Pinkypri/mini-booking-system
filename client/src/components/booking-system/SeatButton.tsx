import React from 'react';
import { Tooltip } from 'antd';
import { Seat } from './types';

interface SeatButtonProps {
  seat: Seat;
  onClick: () => void;
  disabled?: boolean;
}

const SeatButton: React.FC<SeatButtonProps> = ({ seat, onClick }) => {
  const getSeatColor = (): string => {
    if (seat.isBooked) return '#ff4d4f';
    if (seat.isSelected) return '#52c41a';
    
    switch (seat.type) {
      case 'vip': return '#722ed1';
      case 'premium': return '#1890ff';
      default: return '#d9d9d9';
    }
  };

  return (
    <Tooltip
      title={
        seat.isBooked 
          ? 'Seat is booked' 
          : `${seat.id} - ${seat.type.toUpperCase()} - ₹${seat.price}`
      }
    >
      <button
        className={`
          w-8 h-8 rounded-md text-xs font-bold text-white
          transition-all duration-200 hover:scale-110 border-2 border-transparent
          ${seat.isBooked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          ${seat.isSelected ? 'ring-2 ring-green-400 ring-offset-1' : ''}
        `}
        style={{ backgroundColor: getSeatColor() }}
        onClick={onClick}
        disabled={seat.isBooked}
      >
        {seat.number}
      </button>
    </Tooltip>
  );
};

export default SeatButton;