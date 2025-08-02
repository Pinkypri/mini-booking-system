import React, { useState, useEffect } from 'react';
import { Typography, Tag, Divider, Tooltip, Card } from 'antd';
import { CrownOutlined, StarOutlined, UserOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import SeatButton from './SeatButton';
import { Seat } from './types';

const { Text, Title } = Typography;

interface SeatLayoutProps {
  onSeatSelect: (seats: string[]) => void;
  selectedSeats: string[];
  maxSeats?: number;
  slotId?: string;
  bookedSeats?: string[];
  bookings?: any[];
  capacity?: number;
}

const SeatLayout: React.FC<SeatLayoutProps> = ({ 
  onSeatSelect, 
  selectedSeats, 
  maxSeats = 6,
  slotId,
  bookedSeats = [],
  bookings = [],
  capacity = 96
}) => {
  const [finalBookedSeats, setFinalBookedSeats] = useState<string[]>([]);

  useEffect(() => {
    let combinedBookedSeats: string[] = [];
    
    if (bookedSeats && bookedSeats.length > 0) {
      combinedBookedSeats = [...bookedSeats];
    } else {
      const slotsBookedSeats: string[] = [];
      
      bookings.forEach(booking => {
        if (booking.slot?.slot_ucode === slotId && booking.status === 'confirmed') {
          slotsBookedSeats.push(...booking.seats);
        }
      });
      
      combinedBookedSeats = slotsBookedSeats;
    }
    
    const uniqueBookedSeats = combinedBookedSeats.filter((seat, index, array) => 
      array.indexOf(seat) === index
    );
    setFinalBookedSeats(uniqueBookedSeats);
    
    console.log('Final booked seats for slot', slotId, ':', uniqueBookedSeats);
  }, [bookedSeats, bookings, slotId]);

  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const seatsPerRow = 12;
    const totalRows = Math.ceil(capacity / seatsPerRow);
    const rows = Array.from({ length: totalRows }, (_, i) => String.fromCharCode(65 + i)); // A, B, C, ...
    
    let seatCount = 0;
    rows.forEach(row => {
      const seatsInThisRow = Math.min(seatsPerRow, capacity - seatCount);
      for (let i = 1; i <= seatsInThisRow; i++) {
        const seatId = `${row}${i}`;
        const type = row <= 'C' ? 'vip' : row <= 'F' ? 'premium' : 'regular';
        const price = type === 'vip' ? 500 : type === 'premium' ? 350 : 250;
        
        seats.push({
          id: seatId,
          row,
          number: i,
          isBooked: finalBookedSeats.includes(seatId),
          isSelected: selectedSeats.includes(seatId),
          type,
          price
        });
        seatCount++;
      }
    });
    
    return seats;
  };

  const seats = generateSeats();

  const handleSeatClick = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    
    if (seat?.isBooked) {
      console.log(`Seat ${seatId} is already booked`);
      return;
    }

    let newSelectedSeats: string[];
    if (selectedSeats.includes(seatId)) {
      newSelectedSeats = selectedSeats.filter(id => id !== seatId);
    } else {
      if (selectedSeats.length >= maxSeats) {
        return;
      }
      newSelectedSeats = [...selectedSeats, seatId];
    }
    onSeatSelect(newSelectedSeats);
  };

  const getTotalAmount = () => {
    return selectedSeats.reduce((total, seatId) => {
      const seat = seats.find(s => s.id === seatId);
      return total + (seat?.price || 0);
    }, 0);
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white px-2 sm:px-4 lg:px-6">
      {/* Enhanced Screen Section - Responsive */}
      <div className="mb-8 sm:mb-12">
        <div className="relative">
          <div className="bg-gradient-to-r from-red-500  to-red-600 text-white text-center py-4 sm:py-6 lg:py-8 rounded-lg sm:rounded-2xl shadow-2xl transform perspective-1000 rotateX-2">
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <StarOutlined className="text-lg sm:text-xl lg:text-2xl animate-pulse" />
                <Title level={3} className="sm:!text-2xl lg:!text-3xl text-white m-0 font-bold tracking-wide !mb-0">
                  SCREEN / STAGE
                </Title>
                <StarOutlined className="text-lg sm:text-xl lg:text-2xl animate-pulse" />
              </div>
              <Text className="text-red-100 text-sm sm:text-base lg:text-lg">Premium Viewing Experience</Text>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg sm:rounded-2xl"></div>
          </div>
          {/* Screen reflection effect */}
          <div className="h-2 sm:h-4 bg-gradient-to-b from-red-200/30 to-transparent rounded-b-lg sm:rounded-b-2xl transform scale-95"></div>
        </div>
      </div>

      {/* Enhanced Legend - Responsive */}
      <Card className="mb-6 sm:mb-8 shadow-xl rounded-lg sm:rounded-2xl border-0 bg-gradient-to-br from-white to-gray-50">
        <Title level={5} className="sm:!text-lg lg:!text-xl text-center mb-4 sm:mb-6 text-gray-800 !mb-4">
          Seat Categories & Legend
        </Title>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {[
            { 
              color: '#d9d9d9', 
              label: 'Regular', 
              price: '₹250', 
              icon: <UserOutlined />,
              bgClass: 'from-gray-100 to-gray-200'
            },
            { 
              color: '#1890ff', 
              label: 'Premium', 
              price: '₹350', 
              icon: <StarOutlined />,
              bgClass: 'from-blue-100 to-blue-200'
            },
            { 
              color: '#722ed1', 
              label: 'VIP', 
              price: '₹500', 
              icon: <CrownOutlined />,
              bgClass: 'from-purple-100 to-purple-200'
            },
            { 
              color: '#52c41a', 
              label: 'Selected', 
              price: '', 
              icon: <CheckCircleOutlined />,
              bgClass: 'from-green-100 to-green-200'
            },
            { 
              color: '#ff4d4f', 
              label: 'Booked', 
              price: '', 
              icon: <CloseCircleOutlined />,
              bgClass: 'from-red-100 to-red-200'
            }
          ].map((item, index) => (
            <div key={index} className={`bg-gradient-to-br ${item.bgClass} p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300`}>
              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <div 
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg border-2 border-white shadow-sm flex items-center justify-center text-white text-xs"
                  style={{ backgroundColor: item.color }}
                >
                  {item.icon}
                </div>
                <Text className="font-semibold text-gray-800 text-sm sm:text-base">{item.label}</Text>
              </div>
              {item.price && (
                <Text className="text-xs sm:text-sm font-bold text-gray-600 ml-7 sm:ml-9">
                  {item.price}
                </Text>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Enhanced Seats Grid - Responsive */}
      <Card className="mb-6 sm:mb-8 shadow-xl rounded-lg sm:rounded-2xl border-0 bg-gradient-to-br from-gray-50 to-white">
        <div className="p-3 sm:p-6 lg:p-8">
          <Title level={5} className="sm:!text-lg lg:!text-xl text-center mb-6 sm:mb-8 text-gray-800 !mb-6">
            Select Your Seats
          </Title>
          
          {/* Mobile View - Stacked Layout */}
          <div className="block sm:hidden">
            {Array.from(new Set(seats.map(seat => seat.row))).map(row => (
              <div key={row} className="mb-4">
                <div className="text-center font-bold text-red-600 mb-2 bg-red-50 py-1 px-2 rounded-lg border border-red-200 inline-block">
                  Row {row}
                </div>
                <div className="grid grid-cols-6 gap-1 mb-2">
                  {seats.filter(seat => seat.row === row).slice(0, 6).map(seat => (
                    <Tooltip 
                      key={seat.id}
                      title={
                        seat.isBooked 
                          ? `Seat ${seat.id} is already booked` 
                          : `${seat.id} - ${seat.type.toUpperCase()} - ₹${seat.price}`
                      }
                      color={seat.isBooked ? '#ff4d4f' : '#1890ff'}
                    >
                      <div>
                        <SeatButton
                          seat={seat}
                          onClick={() => handleSeatClick(seat.id)}
                          disabled={seat.isBooked}
                        />
                      </div>
                    </Tooltip>
                  ))}
                </div>
                <div className="grid grid-cols-6 gap-1">
                  {seats.filter(seat => seat.row === row).slice(6, 12).map(seat => (
                    <Tooltip 
                      key={seat.id}
                      title={
                        seat.isBooked 
                          ? `Seat ${seat.id} is already booked` 
                          : `${seat.id} - ${seat.type.toUpperCase()} - ₹${seat.price}`
                      }
                      color={seat.isBooked ? '#ff4d4f' : '#1890ff'}
                    >
                      <div>
                        <SeatButton
                          seat={seat}
                          onClick={() => handleSeatClick(seat.id)}
                          disabled={seat.isBooked}
                        />
                      </div>
                    </Tooltip>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tablet and Desktop View - Original Layout */}
          <div className="hidden sm:block">
            {Array.from(new Set(seats.map(seat => seat.row))).map(row => (
              <div key={row} className="flex items-center justify-center mb-4 sm:mb-6">
                <div className="w-8 sm:w-12 text-center font-bold text-red-600 mr-3 sm:mr-6 bg-red-50 py-1 sm:py-2 px-2 sm:px-3 rounded-lg border border-red-200 text-sm sm:text-base">
                  {row}
                </div>
                <div className="flex gap-1 sm:gap-2 lg:gap-3">
                  {(() => {
                    const rowSeats = seats.filter(seat => seat.row === row);
                    const midPoint = Math.ceil(rowSeats.length / 2);
                    return (
                      <>
                        {rowSeats.slice(0, midPoint).map(seat => (
                          <Tooltip 
                            key={seat.id}
                            title={
                              seat.isBooked 
                                ? `Seat ${seat.id} is already booked` 
                                : `${seat.id} - ${seat.type.toUpperCase()} - ₹${seat.price}`
                            }
                            color={seat.isBooked ? '#ff4d4f' : '#1890ff'}
                          >
                            <div>
                              <SeatButton
                                seat={seat}
                                onClick={() => handleSeatClick(seat.id)}
                                disabled={seat.isBooked}
                              />
                            </div>
                          </Tooltip>
                        ))}
                        {rowSeats.length > 6 && (
                          <div className="w-6 sm:w-12 flex items-center justify-center">
                            <div className="w-4 sm:w-8 h-0.5 sm:h-1 bg-red-300 rounded-full"></div>
                          </div>
                        )}
                        {rowSeats.slice(midPoint).map(seat => (
                          <Tooltip 
                            key={seat.id}
                            title={
                              seat.isBooked 
                                ? `Seat ${seat.id} is already booked` 
                                : `${seat.id} - ${seat.type.toUpperCase()} - ₹${seat.price}`
                            }
                            color={seat.isBooked ? '#ff4d4f' : '#1890ff'}
                          >
                            <div>
                              <SeatButton
                                seat={seat}
                                onClick={() => handleSeatClick(seat.id)}
                                disabled={seat.isBooked}
                              />
                            </div>
                          </Tooltip>
                        ))}
                      </>
                    );
                  })()
                  }
                </div>
                <div className="w-8 sm:w-12 text-center font-bold text-red-600 ml-3 sm:ml-6 bg-red-50 py-1 sm:py-2 px-2 sm:px-3 rounded-lg border border-red-200 text-sm sm:text-base">
                  {row}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Simplified Booked Seats Info */}
      {finalBookedSeats.length > 0 && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CloseCircleOutlined className="text-red-500" />
            <Text className="font-semibold text-red-700">Booked Seats: {finalBookedSeats.length}</Text>
          </div>
          <div className="flex flex-wrap gap-1">
            {finalBookedSeats.map(seatId => (
              <span key={seatId} className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-medium">
                {seatId}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Simple & Attractive Selected Seats */}
      {selectedSeats.length > 0 && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CheckCircleOutlined className="text-green-600 text-lg" />
              <Text className="font-bold text-green-700 text-lg">Selected Seats</Text>
            </div>
            <div className="text-right">
              <Text className="text-2xl font-bold text-green-600">₹{getTotalAmount()}</Text>
              <Text className="text-xs text-green-600 block">{selectedSeats.length} seats</Text>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {selectedSeats.map(seatId => {
              const seat = seats.find(s => s.id === seatId);
              return (
                <div
                  key={seatId}
                  className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm hover:bg-green-600 transition-colors"
                >
                  {seatId} • ₹{seat?.price}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Development Debug Info - Responsive */}
      {process.env.NODE_ENV === 'development' && (
        <Card className="mt-4 sm:mt-6 bg-gray-50 border border-gray-200">
          <Text className="text-gray-600 text-xs sm:text-sm">
            Booked Seats: {bookedSeats?.length || 0}, 
            Fallback Booked Seats: {bookings?.length || 0}, 
            Final Booked Seats: {finalBookedSeats.length}
          </Text>
        </Card>
      )}
    </div>
  );
};

export default SeatLayout;