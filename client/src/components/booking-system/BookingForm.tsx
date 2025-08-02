import React from 'react';
import { Form, Input, Button, Card, Typography, Divider } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined, CreditCardOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Slot, BookingFormData } from './types';

const { Title, Text } = Typography;

interface BookingFormProps {
  slot: Slot;
  selectedSeats: string[];
  onSubmit: (formData: BookingFormData) => void;
  loading: boolean;
}

const BookingForm: React.FC<BookingFormProps> = ({ slot, selectedSeats, onSubmit, loading }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: BookingFormData) => {
    onSubmit(values);
  };

  const getTotalAmount = () => {
    return selectedSeats.reduce((total, seatId) => {
      const row = seatId.charAt(0);
      const price = row <= 'C' ? 500 : row <= 'F' ? 350 : 250;
      return total + price;
    }, 0);
  };

  return (
    <div className="max-w-lg mx-auto bg-white">
      <Card 
        className="shadow-2xl rounded-2xl border-0 overflow-hidden"
        bodyStyle={{ padding: 0 }}
      >
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white bg-opacity-20 p-2 rounded-full">
              <CreditCardOutlined className="text-xl" />
            </div>
            <Title level={3} className="text-white m-0">
              Booking Details
            </Title>
          </div>
          <Text className="text-red-100">
            Complete your reservation below
          </Text>
        </div>

        {/* Event Summary Card */}
       <div className="bg-gray-50 p-3 rounded-lg mb-4 space-y-2">
         <Title level={5} className="text-red-700 mb-3 text-center">
            {slot.title}
          </Title>
          
          <div className="text-sm text-gray-600 text-center">
            {dayjs(slot.startTime).format('MMM DD, YYYY')} • {dayjs(slot.startTime).format('h:mm A')} • {slot.venue}
          </div>
          
          <div className="text-center">
            <Text className="text-xs text-gray-500">Seats: </Text>
            {selectedSeats.map((seat, index) => (
              <span key={seat} className="text-red-600 font-medium text-sm">
                {seat}{index < selectedSeats.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
          
     
        </div>

        {/* Booking Form */}
        <div className="p-6 pt-0">
          <Title level={4} className="text-gray-800 mb-6 text-center">
            Personal Information
          </Title>
          
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
            className="space-y-2"
          >
            <Form.Item
              name="name"
              label={
                <span className="flex items-center gap-2 font-semibold text-gray-700">
                  <UserOutlined className="text-red-500" />
                  Full Name
                </span>
              }
              rules={[
                { required: true, message: 'Please enter your name' },
                { min: 2, message: 'Name must be at least 2 characters' }
              ]}
            >
              <Input 
                placeholder="Enter your full name"
                size="large"
                className="rounded-xl border-2 border-gray-200 hover:border-red-300 focus:border-red-500 transition-colors"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label={
                <span className="flex items-center gap-2 font-semibold text-gray-700">
                  <MailOutlined className="text-red-500" />
                  Email Address
                </span>
              }
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input 
                placeholder="Enter your email address"
                size="large"
                className="rounded-xl border-2 border-gray-200 hover:border-red-300 focus:border-red-500 transition-colors"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label={
                <span className="flex items-center gap-2 font-semibold text-gray-700">
                  <PhoneOutlined className="text-red-500" />
                  Phone Number
                </span>
              }
              rules={[
                { required: true, message: 'Please enter your phone number' },
                { pattern: /^[0-9+\-\s()]+$/, message: 'Please enter a valid phone number' }
              ]}
            >
              <Input 
                placeholder="Enter your phone number"
                size="large"
                className="rounded-xl border-2 border-gray-200 hover:border-red-300 focus:border-red-500 transition-colors"
              />
            </Form.Item>

            <div className="pt-4">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
                className="h-14 rounded-xl bg-gradient-to-r from-red-500 to-red-600 border-0 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300 font-bold text-lg"
                style={{ 
                  background: loading ? undefined : 'linear-gradient(to right, #ef4444, #dc2626)' 
                }}
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    Processing Your Booking...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <CreditCardOutlined />
                    Confirm Booking - ₹{getTotalAmount()}
                  </span>
                )}
              </Button>
            </div>
          </Form>
        </div>

        {/* Security Notice */}
        <div className="bg-gray-50 p-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-center justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <Text className="text-gray-600 text-sm">
              Your information is secure and encrypted
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BookingForm;