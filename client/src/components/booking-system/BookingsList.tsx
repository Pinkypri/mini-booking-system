import React from 'react';
import { Table, Tag, Typography, Empty, Card } from 'antd';
import { BookOutlined, CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined, TeamOutlined, DollarOutlined, CheckCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Booking, Slot } from './types';

const { Title, Text } = Typography;

interface BookingsListProps {
  bookings: Booking[];
  loading: boolean;
}

const BookingsList: React.FC<BookingsListProps> = ({ bookings, loading }) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return '#52c41a';
      case 'pending': return '#fa8c16';
      case 'cancelled': return '#ff4d4f';
      default: return '#d9d9d9';
    }
  };

  const columns = [
    {
      title: (
        <div className="flex items-center gap-2 font-semibold text-gray-700">
          <BookOutlined className="text-red-500" />
          Booking Reference
        </div>
      ),
      dataIndex: 'bookingReference',
      key: 'bookingReference',
      render: (ref: string) => (
        <div className="bg-red-50 px-3 py-2 rounded-lg border-l-4 border-red-500">
          <Text strong className="text-red-600 font-mono text-sm">
            {ref || 'N/A'}
          </Text>
        </div>
      )
    },
    {
      title: (
        <div className="flex items-center gap-2 font-semibold text-gray-700">
          <CalendarOutlined className="text-red-500" />
          Event Details
        </div>
      ),
      dataIndex: 'slot',
      key: 'event',
      render: (slot: Slot) => (
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <Text strong className="text-gray-800 text-base">
                {slot?.title || 'Unknown Event'}
              </Text>
              <div className="flex items-center gap-1 mt-1">
                <EnvironmentOutlined className="text-gray-400 text-xs" />
                <Text className="text-sm text-gray-500">
                  {slot?.venue || 'Venue TBD'}
                </Text>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: (
        <div className="flex items-center gap-2 font-semibold text-gray-700">
          <ClockCircleOutlined className="text-red-500" />
          Date & Time
        </div>
      ),
      dataIndex: 'slot',
      key: 'datetime',
      render: (slot: Slot) => {
        const startTime = slot?.startTime;
        const endTime = slot?.endTime;
        
        if (!startTime) {
          return (
            <div className="bg-gray-50 px-3 py-2 rounded-lg">
              <Text className="text-gray-500 italic">Time TBD</Text>
            </div>
          );
        }

        return (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 px-3 py-2 rounded-lg border border-red-100">
            <div className="flex flex-col space-y-1">
              <Text className="font-semibold text-gray-800">
                {dayjs(startTime).format('MMM DD, YYYY')}
              </Text>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                <Text className="text-sm text-gray-600">
                  {dayjs(startTime).format('h:mm A')} 
                  {endTime && ` - ${dayjs(endTime).format('h:mm A')}`}
                </Text>
              </div>
            </div>
          </div>
        );
      }
    },
    {
      title: (
        <div className="flex items-center gap-2 font-semibold text-gray-700">
          <TeamOutlined className="text-red-500" />
          Seats
        </div>
      ),
      dataIndex: 'seats',
      key: 'seats',
      render: (seats: string[]) => {
        if (!seats || !Array.isArray(seats) || seats.length === 0) {
          return (
            <div className="bg-gray-50 px-3 py-1 rounded-full">
              <Text className="text-gray-500 text-sm">No seats</Text>
            </div>
          );
        }
        
        return (
          <div className="flex flex-wrap gap-1">
            {seats.map((seat, index) => (
              <div
                key={`${seat}-${index}`}
                className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-sm hover:bg-red-600 transition-colors"
              >
                {seat}
              </div>
            ))}
          </div>
        );
      }
    },
    {
      title: (
        <div className="flex items-center gap-2 font-semibold text-gray-700">
          <DollarOutlined className="text-red-500" />
          Amount
        </div>
      ),
      dataIndex: 'totalAmount',
      key: 'amount',
      render: (amount: number) => (
        <div className="bg-green-50 px-3 py-2 rounded-lg border border-green-200">
          <Text strong className="text-green-600 text-lg">
            ₹{amount || 0}
          </Text>
        </div>
      )
    },
    {
      title: (
        <div className="flex items-center gap-2 font-semibold text-gray-700">
          <CheckCircleOutlined className="text-red-500" />
          Status
        </div>
      ),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <div
          className="px-4 py-2 rounded-full text-white font-semibold text-xs uppercase tracking-wide shadow-sm"
          style={{ backgroundColor: getStatusColor(status) }}
        >
          {status || 'UNKNOWN'}
        </div>
      )
    }
  ];

  const safeBookings = Array.isArray(bookings) ? bookings : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white p-8 rounded-2xl mb-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <BookOutlined className="text-2xl" />
              </div>
              <Title level={4} className="text-white m-0">
                My Bookings
              </Title>
            </div>
            <Text className="text-red-100 text-lg">
              View and manage all your bookings in one place
            </Text>
          </div>
          <div className="hidden md:block">
            <div className="bg-white bg-opacity-10 px-6 py-4 rounded-xl backdrop-blur-sm">
              <Text className="text-white font-semibold">
                Total Bookings: {safeBookings.length}
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* Show empty state when no bookings */}
      {!loading && safeBookings.length === 0 ? (
        <Card className="text-center py-16 border-0 shadow-xl rounded-2xl bg-gradient-to-br from-gray-50 to-red-50">
          <div className="max-w-md mx-auto">
            <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CalendarOutlined className="text-red-500 text-4xl" />
            </div>
            <Title level={4} className="text-gray-600 mb-4">
              No bookings found
            </Title>
            <Text className="text-gray-500 text-lg leading-relaxed">
              You haven't made any bookings yet. Start by exploring available slots and book your perfect event experience!
            </Text>
            <div className="mt-8">
              <div className="bg-white px-8 py-4 rounded-xl shadow-sm border border-red-100">
                <Text className="text-red-600 font-semibold">
                  Ready to book? Browse our exciting events!
                </Text>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <Table
            columns={columns}
            dataSource={safeBookings}
            rowKey={(record, index) => record?.id ?? record?.bookingReference ?? index?.toString() ?? `${Math.random()}`}
            loading={loading}
            pagination={{ 
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} of ${total} bookings`,
              className: "px-6 py-4"
            }}
            scroll={{ x: 800 }}
            className="shadow-none"
            size="large"
            rowClassName="hover:bg-red-50 transition-colors duration-200"
            locale={{
              emptyText: (
                <div className="py-12">
                  <CalendarOutlined className="text-gray-300 text-6xl mb-4" />
                  <Text className="text-gray-400 text-lg">No booking data available</Text>
                </div>
              )
            }}
          />
        </div>
      )}
    </div>
  );
};

export default BookingsList;