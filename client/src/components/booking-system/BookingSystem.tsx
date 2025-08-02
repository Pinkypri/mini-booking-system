// Enhanced BookingSystem Component
import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Menu, Row, Col, Spin, message, Typography, Steps, Button, DatePicker, Select, Input, Card, Space, Badge, Divider, Result, Progress } from 'antd';
import { CalendarOutlined, BookOutlined, SearchOutlined, FilterOutlined, ClockCircleOutlined, TeamOutlined, DollarOutlined, EnvironmentOutlined, CheckCircleOutlined, StarOutlined, CrownOutlined, HomeOutlined, UserOutlined, MenuOutlined, ReloadOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';

import SlotCard from './SlotCard';
import SeatLayout from './SeatLayout';
import BookingForm from './BookingForm';
import BookingsList from './BookingsList';
import { useDispatch, useSelector } from "react-redux";
import { requestSlotData, clearSlotState } from "../../store/slot/slotReducer"; 
import { Slot, Booking, BookingFormData } from './types';
import { ISlotResponse } from "../../interfaces/slot.interface";
import {
  createBookingRequest,
  getBookingsRequest,
  clearBookingState,
} from "../../store/booking/bookingReducer";
import {
  requestBookedSeats,
  clearBookedSeats,
} from "../../store/booking/bookedSlotReducer"

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;
const { Step } = Steps;
const { RangePicker } = DatePicker;
const { Option } = Select;

// Enhanced SlotCard Component with Red Theme
const EnhancedSlotCard: React.FC<{
  slot: ISlotResponse;
  onBook: (slot: ISlotResponse) => void;
}> = ({ slot, onBook }) => {
  const startTime = dayjs(slot.startTime || slot.start_time);
  const endTime = dayjs(slot.endTime);
  const availableSeats = slot.capacity - (slot.bookedSeats || 0);
  const occupancyPercentage = ((slot.bookedSeats || 0) / slot.capacity) * 100;

  const getOccupancyColor = () => {
    if (occupancyPercentage >= 90) return '#ff4d4f';
    if (occupancyPercentage >= 70) return '#fa8c16';
    return '#52c41a';
  };

  const getPriorityBadge = () => {
    if (occupancyPercentage >= 80) return { text: 'Almost Full', color: '#ff4d4f', bgColor: 'from-red-500 to-red-600' };
    if (availableSeats <= 10) return { text: 'Limited Seats', color: '#fa8c16', bgColor: 'from-orange-500 to-orange-600' };
    return { text: 'Available', color: '#52c41a', bgColor: 'from-green-500 to-green-600' };
  };

  const badge = getPriorityBadge();

  return (
    <Card
      className="h-full transition-all duration-500 hover:shadow-2xl hover:scale-105 border-0 overflow-hidden relative group"
      bodyStyle={{ padding: 0 }}
    >
      {/* Status Badge */}
      <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-white text-xs font-bold shadow-lg bg-gradient-to-r ${badge.bgColor}`}>
        {badge.text}
      </div>

      {/* Header with Red Gradient */}
      <div className="bg-gradient-to-br from-red-500 via-red-600 to-red-700 p-6 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full transform translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full transform -translate-x-12 translate-y-12"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <StarOutlined className="text-white" />
                </div>
                <Title level={4} className="text-white mb-0 font-bold">
                  {slot.title}
                </Title>
              </div>
              <div className="flex items-center gap-2 text-red-100">
                <EnvironmentOutlined />
                <Text className="text-red-100 font-medium">{slot.venue}</Text>
              </div>
            </div>
          </div>
          
          {/* Date & Time Card */}
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <CalendarOutlined className="text-white" />
                </div>
                <div>
                  <Text className="text-white/80 text-xs block">Date</Text>
                  <Text className="text-white font-semibold">
                    {startTime.format('MMM DD, YYYY')}
                  </Text>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <ClockCircleOutlined className="text-white" />
                </div>
                <div>
                  <Text className="text-white/80 text-xs block">Time</Text>
                  <Text className="text-white font-semibold">
                    {startTime.format('h:mm A')} - {endTime.format('h:mm A')}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 bg-white">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-500 p-2 rounded-full">
                <TeamOutlined className="text-white text-sm" />
              </div>
              <div>
                <Text className="text-blue-600 text-xs font-semibold block">Available Seats</Text>
                <Text className="text-blue-800 font-bold text-lg">
                  {availableSeats}/{slot.capacity}
                </Text>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-500 p-2 rounded-full">
                <DollarOutlined className="text-white text-sm" />
              </div>
              <div>
                <Text className="text-green-600 text-xs font-semibold block">Starting From</Text>
                <Text className="text-green-800 font-bold text-lg">
                  ₹{slot.price}
                </Text>
              </div>
            </div>
          </div>
        </div>

        {/* Occupancy Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <Text className="text-gray-600 font-semibold">Seat Occupancy</Text>
            <Text className="text-gray-800 font-bold">{occupancyPercentage.toFixed(0)}%</Text>
          </div>
          <Progress
            percent={occupancyPercentage}
            strokeColor={getOccupancyColor()}
            trailColor="#f0f0f0"
            strokeWidth={8}
            className="mb-0"
          />
        </div>

        {/* Description */}
        {slot.description && (
          <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-200">
            <Text className="text-gray-600 leading-relaxed">
              {slot.description}
            </Text>
          </div>
        )}

        {/* Action Button */}
        <Button
          type="primary"
          size="large"
          block
          icon={<BookOutlined />}
          disabled={!slot.isAvailable || availableSeats <= 0}
          onClick={() => onBook(slot)}
          className="h-12 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 border-0"
          style={{
            background: (slot.isAvailable && availableSeats > 0) 
              ? 'linear-gradient(to right, #ef4444, #dc2626)' 
              : '#d1d5db',
            color: 'white'
          }}
        >
          {slot.isAvailable && availableSeats > 0 
            ? `Book Now (${availableSeats} seats left)` 
            : 'Fully Booked'
          }
        </Button>

        {/* Urgency Indicator */}
        {slot.isAvailable && availableSeats > 0 && occupancyPercentage >= 70 && (
          <div className="mt-4 bg-orange-50 border border-orange-200 p-3 rounded-xl">
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

const BookingSystem: React.FC = () => {
  const dispatch = useDispatch();
  const [currentScreen, setCurrentScreen] = useState<'slots' | 'booking' | 'my-bookings'>('slots');
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Filter states
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState<'time' | 'price' | 'availability'>('time');
  const [filterByAvailability, setFilterByAvailability] = useState<'all' | 'available' | 'limited'>('all');

  // Redux state selectors
  const {
    slots = [],
    isLoading: slotLoading = false,
    error: slotError = null
  } = useSelector((state: any) => state.slot || {});

  const {
    bookings = [],
    isLoading: bookingLoading = false,
    error: bookingError = null,
    successMessage = null
  } = useSelector((state: any) => state.booking || {});

  const {
    seats: bookedSeats = [],
    isLoading: bookedSeatsLoading = false,
    error: bookedSeatsError = null,
    slot_ucode: currentSlotUcode = null
  } = useSelector((state: any) => state.bookedSlot || {});
  
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookingStep, setBookingStep] = useState(0);
  const [lastBookingDetails, setLastBookingDetails] = useState<any>(null);

  // Check for mobile screen
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setCollapsed(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Filtered and sorted slots
  const filteredSlots = useMemo(() => {
    let filtered = [...slots];

    if (searchText) {
      filtered = filtered.filter(slot => 
        (slot.title || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (slot.venue || '').toLowerCase().includes(searchText.toLowerCase()) ||
        (slot.description || '').toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedDate) {
      filtered = filtered.filter(slot => 
        dayjs(slot.startTime || slot.start_time).isSame(selectedDate, 'day')
      );
    }

    if (dateRange && dateRange[0] && dateRange[1]) {
      filtered = filtered.filter(slot => {
        const slotDate = dayjs(slot.startTime || slot.start_time);
        return slotDate.isAfter(dateRange[0]) && slotDate.isBefore(dateRange[1]);
      });
    }

    if (filterByAvailability !== 'all') {
      filtered = filtered.filter(slot => {
        const availableSeats = slot.capacity - (slot.bookedSeats || 0);
        if (filterByAvailability === 'available') return availableSeats > 10 && slot.isAvailable;
        if (filterByAvailability === 'limited') return availableSeats <= 10 && availableSeats > 0 && slot.isAvailable;
        return true;
      });
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'time':
          return dayjs(a.startTime || a.start_time).unix() - dayjs(b.startTime || b.start_time).unix();
        case 'price':
          return a.price - b.price;
        case 'availability':
          const aAvailable = a.capacity - (a.bookedSeats || 0);
          const bAvailable = b.capacity - (b.bookedSeats || 0);
          return bAvailable - aAvailable;
        default:
          return 0;
      }
    });

    return filtered;
  }, [slots, searchText, selectedDate, dateRange, sortBy, filterByAvailability]);

  const loadData = async () => {
    setLoading(true);
    try {
      dispatch(getBookingsRequest());
    } catch (error) {
      message.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(requestSlotData({
      searchText,
      selectedDate: selectedDate?.toISOString() || null,
      dateRange: {
        start: dateRange?.[0]?.toISOString() || null,
        end: dateRange?.[1]?.toISOString() || null,
      },
      sortBy,
      filterByAvailability,
    }));
  }, [dispatch, searchText, selectedDate, dateRange, sortBy, filterByAvailability]);

  useEffect(() => {
    if (bookedSeatsError) {
      message.error(`Failed to load booked seats: ${bookedSeatsError}`);
    }
  }, [bookedSeatsError]);

  useEffect(() => {
    console.log('Booking state:', { successMessage, bookingError, bookingLoading, bookings });
    
    if (successMessage) {
      message.success(successMessage);
      setBookingStep(2);
      
      if (selectedSlot && selectedSeats.length > 0) {
        setLastBookingDetails({
          slot: selectedSlot,
          seats: selectedSeats,
          totalAmount: selectedSeats.reduce((total, seatId) => {
            const row = seatId.charAt(0);
            const price = row <= 'C' ? 500 : row <= 'F' ? 350 : 250;
            return total + price;
          }, 0)
        });
      }

      const timer = setTimeout(() => {
        dispatch(clearBookingState());
        dispatch(getBookingsRequest());
        setCurrentScreen("my-bookings");
        setSelectedSlot(null);
        setSelectedSeats([]);
        setBookingStep(0);
        setLastBookingDetails(null);
        dispatch(clearBookedSeats());
      }, 3000);

      return () => clearTimeout(timer);
    }

    if (bookingError) {
      message.error(bookingError);
      dispatch(clearBookingState());
    }
  }, [successMessage, bookingError, dispatch, selectedSlot, selectedSeats, bookings]);

  const handleSlotSelect = (slot: ISlotResponse) => {
    setSelectedSlot(slot as any);
    setCurrentScreen('booking');
    setBookingStep(0);
    setSelectedSeats([]);
    
    if (slot.slot_ucode) {
      dispatch(requestBookedSeats(slot.slot_ucode));
    }
  };

  const handleSeatSelect = (seats: string[]) => {
    setSelectedSeats(seats);
  };

  const handleBookingSubmit = async (formData: BookingFormData) => {
    if (!selectedSlot || selectedSeats.length === 0) {
      message.error('Please select seats before booking');
      return;
    }

    try {
      const totalAmount = selectedSeats.reduce((total, seatId) => {
        const row = seatId.charAt(0);
        const price = row <= 'C' ? 500 : row <= 'F' ? 350 : 250;
        return total + price;
      }, 0);
      
      const user_id = localStorage.getItem('user');
      const payload = {
        user: formData,
        userId: user_id,
        slotId: selectedSlot.slot_ucode,
        seats: selectedSeats,
        totalAmount,
      };

      console.log('Dispatching booking request:', payload);
      dispatch(createBookingRequest(payload));
    } catch (error) {
      console.error('Booking submission error:', error);
      message.error('Booking failed. Please try again.');
    }
  };

const renderFilterBar = () => (
  <Card className="mb-8 border-0 shadow-xl rounded-2xl overflow-hidden">
    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 mb-6 -m-6 mb-6">
      <div className="flex items-center gap-3">
        <div className="bg-white bg-opacity-20 p-2 rounded-full">
          <FilterOutlined className="text-white" />
        </div>
        <div>
          <Title level={4} className="text-white m-0">Filter & Search</Title>
          <Text className="text-red-100">Find your perfect slot</Text>
        </div>
      </div>
    </div>

    <div className="space-y-4">
      {/* Row 1: Search + Availability + Sort */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
            <Input
              placeholder="Search events, venues, descriptions..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-10 h-12 rounded-xl border-2 border-gray-200 hover:border-red-300 focus:border-red-500"
              allowClear
            />
          </div>
        </div>

        <div className="flex-1 flex items-center gap-3">
          <FilterOutlined className="text-red-500 text-lg" />
          <Select
            value={filterByAvailability}
            onChange={setFilterByAvailability}
            className="flex-1 h-12"
            placeholder="Filter by availability"
          >
            <Option value="all">All Slots</Option>
            <Option value="available">Plenty Available</Option>
            <Option value="limited">Limited Seats</Option>
          </Select>
        </div>

        <div className="flex-1 flex items-center gap-3">
          <Text className="text-gray-500 font-semibold whitespace-nowrap">Sort by:</Text>
          <Select
            value={sortBy}
            onChange={setSortBy}
            className="flex-1 h-12"
            placeholder="Sort options"
          >
            <Option value="time">Event Time</Option>
            <Option value="price">Price (Low to High)</Option>
            <Option value="availability">Most Available</Option>
          </Select>
        </div>
      </div>

      {/* Row 2: Dates + Reset Button */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex items-center gap-3 flex-1">
          <CalendarOutlined className="text-red-500 text-lg" />
          <DatePicker
            placeholder="Select specific date"
            value={selectedDate}
            onChange={setSelectedDate}
            className="flex-1 h-12 rounded-xl border-2 border-gray-200 hover:border-red-300 focus:border-red-500"
            allowClear
          />
        </div>

        <div className="flex items-center gap-3 flex-1">
          <Text className="text-gray-500 font-semibold whitespace-nowrap">Date Range:</Text>
          <RangePicker
            placeholder={['Start date', 'End date']}
            value={dateRange}
            onChange={(dates) => setDateRange(dates)}
            className="flex-1 h-12 rounded-xl border-2 border-gray-200 hover:border-red-300 focus:border-red-500"
            allowClear
          />
        </div>

        {/* Moved Reset Here */}
        <div className="flex justify-end flex-1">
          <Button
            icon={<ReloadOutlined />}
            onClick={() => {
              setSearchText('');
              setSelectedDate(null);
              setDateRange(null);
              setFilterByAvailability('all');
              setSortBy('time');
            }}
            className="h-12 px-6 rounded-xl border-2 border-gray-200 hover:border-red-300"
          >
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Result Counter */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <CheckCircleOutlined className="text-green-500" />
          <Text className="text-gray-600">
            <span className="font-semibold text-red-600">{filteredSlots.length}</span> slots found
          </Text>
        </div>

        {(searchText || selectedDate || dateRange || filterByAvailability !== 'all' || sortBy !== 'time') && (
          <Badge count="Active" style={{ backgroundColor: '#ef4444' }}>
            <Button
              type="default"
              icon={<FilterOutlined />}
              className="border-red-300 text-red-600 hover:border-red-500"
            >
              Filters Applied
            </Button>
          </Badge>
        )}
      </div>
    </div>
  </Card>
);

  const renderBookingConfirmation = () => (
    <div className="text-center max-w-4xl mx-auto">
      <Result
        status="success"
        title={
          <div>
            <CheckCircleOutlined className="text-green-500 text-6xl mb-4" />
            <Title level={2} className="text-green-600 mb-2">
              Booking Confirmed Successfully!
            </Title>
          </div>
        }
        subTitle={
          <Text className="text-gray-600 text-lg">
            Your booking for <span className="font-semibold text-red-600">{lastBookingDetails?.slot?.title}</span> has been confirmed. 
            You will be redirected to your bookings in a few seconds.
          </Text>
        }
        extra={[
          <Card key="details" className="inline-block text-left mb-6 shadow-xl rounded-2xl border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 -m-6 mb-4">
              <Title level={4} className="text-white m-0">Booking Details</Title>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <Text className="text-gray-500 text-sm block mb-1">Event</Text>
                  <Text className="font-bold text-gray-800">{lastBookingDetails?.slot?.title}</Text>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <Text className="text-gray-500 text-sm block mb-1">Venue</Text>
                  <Text className="font-bold text-gray-800">{lastBookingDetails?.slot?.venue}</Text>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <Text className="text-gray-500 text-sm block mb-1">Date</Text>
                  <Text className="font-bold text-gray-800">
                    {dayjs(lastBookingDetails?.slot?.startTime || lastBookingDetails?.slot?.start_time).format('MMM DD, YYYY')}
                  </Text>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <Text className="text-gray-500 text-sm block mb-1">Time</Text>
                  <Text className="font-bold text-gray-800">
                    {dayjs(lastBookingDetails?.slot?.startTime || lastBookingDetails?.slot?.start_time).format('h:mm A')} - 
                    {dayjs(lastBookingDetails?.slot?.endTime).format('h:mm A')}
                  </Text>
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                <Text className="text-gray-500 text-sm block mb-2">Selected Seats</Text>
                <div className="flex flex-wrap gap-2 mb-3">
                  {lastBookingDetails?.seats?.map((seat: string) => (
                    <span key={seat} className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {seat}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <div className="flex justify-between items-center">
                  <Text className="text-gray-600 font-semibold">Total Amount</Text>
                  <Text className="text-2xl font-bold text-green-600">₹{lastBookingDetails?.totalAmount}</Text>
                </div>
              </div>
            </div>
          </Card>,
          <div key="actions" className="space-x-4">
            <Button 
              type="primary" 
              size="large"
              icon={<BookOutlined />}
              className="h-12 px-8 rounded-xl bg-gradient-to-r from-red-500 to-red-600 border-0 font-semibold"
              onClick={() => {
                dispatch(clearBookingState());
                dispatch(clearBookedSeats());
                setCurrentScreen("my-bookings");
                setSelectedSlot(null);
                setSelectedSeats([]);
                setBookingStep(0);
                setLastBookingDetails(null);
                loadData();
              }}
            >
              View My Bookings
            </Button>
            <Button 
              size="large"
              icon={<CalendarOutlined />}
              className="h-12 px-8 rounded-xl border-2 border-red-300 text-red-600 hover:border-red-500 font-semibold"
              onClick={() => {
                dispatch(clearBookingState());
                dispatch(clearBookedSeats());
                setCurrentScreen("slots");
                setSelectedSlot(null);
                setSelectedSeats([]);
                setBookingStep(0);
                setLastBookingDetails(null);
              }}
            >
              Book More Slots
            </Button>
          </div>
        ]}
      />
    </div>
  );


  const renderContent = () => {
    switch (currentScreen) {
      case 'slots':
        return (
          <div>
            <div className="mb-6">
              <Title level={4} className="text-gray-800 mb-2">
                <CalendarOutlined className="mr-3 text-blue-600" />
                Available Slots
              </Title>
              <Text className="text-gray-600 text-lg">
                Choose from our available time slots and book your perfect experience
              </Text>
            </div>
            
            {renderFilterBar()}
            
            <Spin spinning={slotLoading}>
              {filteredSlots.length === 0 ? (
                <Card className="text-center py-12" style={{ borderRadius: '12px' }}>
                  <CalendarOutlined className="text-gray-300 text-6xl mb-4" />
                  <Title level={4} className="text-gray-500 mb-2">No slots found</Title>
                  <Text className="text-gray-400">
                    Try adjusting your filters or search criteria
                  </Text>
                </Card>
              ) : (
                <Row gutter={[24, 24]}>
                  {filteredSlots.map((slot: ISlotResponse) => (
                    <Col xs={24} sm={12} lg={8} key={slot.id}>
                      <EnhancedSlotCard
                        slot={slot}
                        onBook={handleSlotSelect}
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </Spin>
          </div>
        );

      case 'booking':
        return selectedSlot ? (
          <div>
            <div className="mb-6">
              <Title level={4}>Book Your Seats</Title>
              <Text className="text-gray-600">
                Select your preferred seats for {selectedSlot.title}
              </Text>
            </div>

            <Steps current={bookingStep} className="mb-8">
              <Step title="Select Seats" />
              <Step title="Enter Details" />
              <Step title="Confirm Booking" />
            </Steps>

            {bookingStep === 0 && (
              <div>
                <Spin spinning={bookedSeatsLoading} tip="Loading seat availability...">
                  <SeatLayout
                    onSeatSelect={handleSeatSelect}
                    selectedSeats={selectedSeats}
                    slotId={selectedSlot?.slot_ucode}
                    bookedSeats={bookedSeats} // Pass the booked seats from API
                    bookings={bookings} // Keep existing bookings for compatibility
                  />
                </Spin>
                <div className="text-center mt-6">
                  <Button
                    type="primary"
                    size="large"
                    disabled={selectedSeats.length === 0}
                    onClick={() => setBookingStep(1)}
                  >
                    Continue to Details ({selectedSeats.length} seats)
                  </Button>
                </div>
              </div>
            )}

            {bookingStep === 1 && (
              <div>
                <BookingForm
                  slot={selectedSlot}
                  selectedSeats={selectedSeats}
                  onSubmit={handleBookingSubmit}
                  loading={bookingLoading}
                />
                <div className="text-center mt-6">
                  <Button onClick={() => setBookingStep(0)} className="mr-4">
                    Back to Seats
                  </Button>
                </div>
              </div>
            )}

            {bookingStep === 2 && lastBookingDetails && renderBookingConfirmation()}
          </div>
        ) : null;

      case 'my-bookings':
        return (
          <Spin spinning={loading}>
            <BookingsList
              bookings={bookings}
              loading={bookingLoading}
            />
          </Spin>
        );

      default:
        return null;
    }
  };

  // Clear booked seats when leaving booking screen
  useEffect(() => {
    return () => {
      if (currentScreen !== 'booking') {
        dispatch(clearBookedSeats());
      }
    };
  }, [currentScreen, dispatch]);

  return (
   <Layout className="min-h-screen bg-white">
      <Header 
        className="bg-white shadow-lg sticky top-0 z-10" 
        style={{ 
          borderRadius: '0 0 24px 24px',
          padding: '0 16px'
        }}
      >
        <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <StarOutlined className="text-white text-lg" />
            </div>
            <Title level={4} className="mb-0 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              Premium Booking System
            </Title>
          </div>
          
          <Menu
            mode="horizontal"
            selectedKeys={[currentScreen]}
            className="border-none bg-transparent flex-1 justify-end max-w-md"
            style={{ lineHeight: '64px' }}
            items={[
              {
                key: 'slots',
                icon: <CalendarOutlined />,
                label: <span className="hidden sm:inline">Available Slots</span>,
                onClick: () => setCurrentScreen('slots'),
                className: currentScreen === 'slots' ? 'text-red-600' : ''
              },
              {
                key: 'my-bookings',
                icon: <BookOutlined />,
                label: <span className="hidden sm:inline">My Bookings</span>,
                onClick: () => setCurrentScreen('my-bookings'),
                className: currentScreen === 'my-bookings' ? 'text-red-600' : ''
              }
            ]}
          />
        </div>
      </Header>

      <Content className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </Content>
    </Layout>
  );
};

export default BookingSystem;