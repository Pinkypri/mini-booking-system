import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Space } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { requestRegister, clearRegisterState } from "../store/auth/register/regiterReducer"
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/index';

const { Title, Text } = Typography;

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupPage: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const [isRedirecting, setIsRedirecting] = useState(false);
  const register = useSelector((state: RootState) => state.register);
  const { isLoading, successMessage, error } = register;

  useEffect(() => {
    dispatch(clearRegisterState());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage && !isRedirecting) {
      setIsRedirecting(true);
      message.success(successMessage);
      
      // Add a 3-second delay before redirect
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
    if (error) {
      message.error(error);
      setIsRedirecting(false); // Reset redirecting state on error
    }
  }, [successMessage, error, navigate, isRedirecting]);

  const onFinish = (values: SignupFormData) => {
    const { name, email, password } = values;
    
    dispatch(requestRegister({
      email, password, name
    }));

    console.log('Registration payload:', {
      email,
      user_id: name,
      requesttype: 'register'
    });
  };
  
  const validatePassword = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error('Please input your password!'));
    }
    if (value.length < 8) {
      return Promise.reject(new Error('Password must be at least 8 characters long!'));
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return Promise.reject(new Error('Password must contain at least one uppercase letter, one lowercase letter, and one number!'));
    }
    return Promise.resolve();
  };

  const validateConfirmPassword = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error('Please confirm your password!'));
    }
    if (value !== form.getFieldValue('password')) {
      return Promise.reject(new Error('Passwords do not match!'));
    }
    return Promise.resolve();
  };

  const validateEmail = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error('Please input your email!'));
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return Promise.reject(new Error('Please enter a valid email address!'));
    }
    return Promise.resolve();
  };

  const validateName = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error('Please input your name!'));
    }
    if (value.trim().length < 2) {
      return Promise.reject(new Error('Name must be at least 2 characters long!'));
    }
    if (!/^[a-zA-Z\s]+$/.test(value)) {
      return Promise.reject(new Error('Name should only contain letters and spaces!'));
    }
    return Promise.resolve();
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleForgetPasswordRedirect = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative w-full max-w-md">
        <Card
          className="w-full backdrop-blur-sm bg-white/95 shadow-2xl border-0 overflow-hidden"
          style={{
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.8)'
          }}
          bodyStyle={{ padding: 0 }}
        >
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-red-600 to-red-700 px-8 py-10 text-center">
            <div className="absolute inset-0 bg-black/5"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <UserOutlined className="text-2xl text-white" />
              </div>
              <Title level={2} className="!text-white !mb-2 !font-bold">
                Create Account
              </Title>
              <Text className="text-red-100 text-base">
                Join us today and get started
              </Text>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <Form
              form={form}
              name="signup"
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
              size="large"
              className="space-y-1"
            >
              <Form.Item
                name="name"
                label={<span className="text-gray-800 font-semibold text-sm">Full Name</span>}
                rules={[{ validator: validateName }]}
                className="mb-5"
              >
                <Input
                  prefix={<UserOutlined className="text-red-500 text-lg" />}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className="h-12 rounded-xl border-2 border-gray-200 hover:border-red-300 focus:border-red-500 transition-all duration-200 bg-gray-50/50"
                  disabled={isRedirecting}
                />
              </Form.Item>

              <Form.Item
                name="email"
                label={<span className="text-gray-800 font-semibold text-sm">Email Address</span>}
                rules={[{ validator: validateEmail }]}
                className="mb-5"
              >
                <Input
                  prefix={<MailOutlined className="text-red-500 text-lg" />}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  className="h-12 rounded-xl border-2 border-gray-200 hover:border-red-300 focus:border-red-500 transition-all duration-200 bg-gray-50/50"
                  disabled={isRedirecting}
                />
              </Form.Item>

              <Form.Item
                name="password"
                label={<span className="text-gray-800 font-semibold text-sm">Password</span>}
                rules={[{ validator: validatePassword }]}
                className="mb-5"
              >
                <Input.Password
                  prefix={<LockOutlined className="text-red-500 text-lg" />}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  className="h-12 rounded-xl border-2 border-gray-200 hover:border-red-300 focus:border-red-500 transition-all duration-200 bg-gray-50/50"
                  disabled={isRedirecting}
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label={<span className="text-gray-800 font-semibold text-sm">Confirm Password</span>}
                rules={[{ validator: validateConfirmPassword }]}
                dependencies={['password']}
                className="mb-6"
              >
                <Input.Password
                  prefix={<LockOutlined className="text-red-500 text-lg" />}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  className="h-12 rounded-xl border-2 border-gray-200 hover:border-red-300 focus:border-red-500 transition-all duration-200 bg-gray-50/50"
                  disabled={isRedirecting}
                />
              </Form.Item>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-center animate-pulse">
                  <Text className="text-red-700 font-semibold">
                    {error}
                  </Text>
                </div>
              )}

              {successMessage && (
                <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl text-center animate-pulse">
                  <Text className="text-green-700 font-semibold">
                    {successMessage}
                  </Text>
                  <br />
                  <Text className="text-gray-500 text-sm mt-1">
                    Redirecting to login page in 3 seconds...
                  </Text>
                </div>
              )}

              <Form.Item className="!mb-6">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  disabled={isRedirecting}
                  block
                  className="!h-14 !text-lg !font-semibold !rounded-xl !bg-gradient-to-r !from-red-600 !to-red-700 !border-0 hover:!from-red-700 hover:!to-red-800 !shadow-lg hover:!shadow-xl !transition-all !duration-200 transform hover:!scale-[1.02]"
                >
                  {isLoading ? 'Creating Account...' : isRedirecting ? 'Account Created!' : 'Create Account'}
                </Button>
              </Form.Item>

              <div className="text-center space-y-4 pt-4 border-t border-gray-100">
                <div>
                  <Text className="text-gray-600">Already have an account? </Text>
                  <Button
                    type="link"
                    onClick={handleLoginRedirect}
                    disabled={isRedirecting}
                    className="!p-0 !font-semibold !text-red-600 hover:!text-red-700 !text-base hover:!underline"
                  >
                    Sign In
                  </Button>
                </div>
                
                <div>
                  <Button
                    type="link"
                    onClick={handleForgetPasswordRedirect}
                    disabled={isRedirecting}
                    className="!p-0 !font-medium !text-gray-500 hover:!text-red-600 !text-sm hover:!underline"
                  >
                    Forgot Password?
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </Card>

        {/* Bottom decorative text */}
        <div className="text-center mt-8">
          <Text className="text-gray-400 text-sm">
            Secure • Encrypted • Trusted
          </Text>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;