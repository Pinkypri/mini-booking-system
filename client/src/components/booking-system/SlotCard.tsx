import React from 'react';
import { Card, Tag, Typography, Button, Progress } from 'antd';
import { ClockCircleOutlined, TeamOutlined, DollarOutlined, BookOutlined, EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Slot } from './types';

const { Title, Text } = Typography;

interface SlotCardProps {
  slot: Slot;
  onBook: (slot: Slot) => void;
}

const SlotCard: React.FC<SlotCardProps> = ({ slot, onBook }) => {
  const startTime = dayjs(slot.startTime);
  const endTime = dayjs(slot.endTime);
  const availableSeats = slot.capacity - slot.bookedSeats;
  const occupancyPercentage = (slot.bookedSeats / slot.capacity) * 100;

  const getOccupancyColor = () => {
    if (occupancyPercentage >= 90) return '#ff4d4f';
    if (occupancyPercentage >= 70) return '#fa8c16';
    return '#52c41a';
  };

  const getAvailabilityStatus = () => {
    if (!slot.isAvailable) return { text: 'SOLD OUT', color: '#ff4d4f', bgColor: 'from-red-500 to-red-600' };
    if (occupancyPercentage >= 90) return { text: 'FILLING FAST', color: '#fa8c16', bgColor: 'from-orange-500 to-orange-600' };
    if (occupancyPercentage >= 70) return { text: 'LIMITED SEATS', color: '#fa8c16', bgColor: 'from-yellow-500 to-orange-500' };
    return { text: 'AVAILABLE', color: '#52c41a', bgColor: 'from-green-500 to-green-600' };
  };

  const status = getAvailabilityStatus();

  return (
    <Card
      className={`h-full transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2 border-0 rounded-2xl overflow-hidden ${
        !slot.isAvailable ? 'opacity-80' : 'hover:scale-105'
      }`}
      bodyStyle={{ padding: 0 }}
    >
      {/* Enhanced Header with Gradient */}
      <div className={`bg-gradient-to-br ${status.bgColor} p-6 text-white relative overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full transform translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full transform -translate-x-12 translate-y-12"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <Title level={3} className="text-white mb-2 font-bold">
                {slot.title}
              </Title>
              <div className="flex items-center gap-2 text-white/90">
                <EnvironmentOutlined className="text-sm" />
                <Text className="text-white/90 font-medium">{slot.venue}</Text>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <Text className="text-white font-bold text-xs tracking-wide">
                {status.text}
              </Text>
            </div>
          </div>
          
          {/* Date Badge */}
          <div className="bg-white/15 backdrop-blur-sm px-4 py-2 rounded-xl inline-flex items-center gap-2">
            <CalendarOutlined />
            <Text className="text-white font-semibold">
              {startTime.format('MMM DD, YYYY')}
            </Text>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 bg-white space-y-6">
        {/* Time Section */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-xl border border-red-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-red-100 p-2 rounded-full">
              <ClockCircleOutlined className="text-red-600" />
            </div>
            <Text className="font-semibold text-gray-700">Event Time</Text>
          </div>
          <Text className="text-gray-800 font-bold text-lg ml-11">
            {startTime.format('h:mm A')} - {endTime.format('h:mm A')}
          </Text>
        </div>

        {/* Capacity Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <TeamOutlined className="text-blue-600" />
            </div>
            <Text className="font-semibold text-gray-700">Seat Availability</Text>
          </div>
          <div className="ml-11 space-y-3">
            <div className="flex justify-between items-center">
              <Text className="text-gray-600">Available</Text>
              <Text className="font-bold text-blue-600">
                {availableSeats} of {slot.capacity}
              </Text>
            </div>
            <Progress
              percent={occupancyPercentage}
              strokeColor={getOccupancyColor()}
              trailColor="#f0f0f0"
              strokeWidth={8}
              className="mb-0"
            />
            <Text className="text-xs text-gray-500">
              {occupancyPercentage.toFixed(1)}% occupied
            </Text>
          </div>
        </div>

        {/* Price Section */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <DollarOutlined className="text-green-600" />
              </div>
              <div>
                <Text className="font-semibold text-gray-700 block">Starting Price</Text>
                <Text className="text-xs text-gray-500">per seat</Text>
              </div>
            </div>
            <Text className="font-bold text-2xl text-green-600">
              ₹{slot.price}
            </Text>
          </div>
        </div>

        {/* Description */}
        {slot.description && (
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <Text className="text-gray-600 leading-relaxed">
              {slot.description}
            </Text>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <Button
            type="primary"
            size="large"
            block
            icon={<BookOutlined />}
            disabled={!slot.isAvailable}
            onClick={() => onBook(slot)}
            className={`h-14 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-0 ${
              slot.isAvailable 
                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transform hover:scale-105' 
                : 'bg-gray-400'
            }`}
            style={{
              background: slot.isAvailable ? 'linear-gradient(to right, #ef4444, #dc2626)' : undefined
            }}
          >
            {slot.isAvailable ? (
              <span className="flex items-center justify-center gap-3">
                <BookOutlined />
                Book Now - Starting ₹{slot.price}
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                <ClockCircleOutlined />
                Fully Booked
              </span>
            )}
          </Button>
        </div>

        {/* Urgency Indicator */}
        {slot.isAvailable && occupancyPercentage >= 70 && (
          <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <Text className="text-orange-700 font-semibold text-sm">
                {occupancyPercentage >= 90 ? 'Only a few seats left!' : 'Booking fast - secure your spot!'}
              </Text>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SlotCard;