import React, { useEffect } from 'react';
import { Form, Input, Button, Card, Typography, message, Space, Checkbox } from 'antd';
import { MailOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { requestLoginDetails, clearLoginState } from "../store/auth/login/loginReducer";
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/index';

const { Title, Text } = Typography;

interface LoginFormData {
  email: string;
  password: string;
  remember?: boolean;
}

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const login = useSelector((state: RootState) => state.login);
  const { isLoading, successMessage, error } = login;

  useEffect(() => {
    dispatch(clearLoginState());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      message.success(successMessage);
      setTimeout(() => {
        navigate('/booking'); // Redirect to dashboard or home page
      }, 1500);
    }
    if (error) {
      message.error(error);
    }
  }, [successMessage, error, navigate]);

  const onFinish = (values: LoginFormData) => {
    const { email, password } = values;
    
    dispatch(requestLoginDetails({
      email,
      password
    }));

    console.log('Login payload:', {
      email,
      password
    });
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

  const validatePassword = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error('Please input your password!'));
    }
    if (value.length < 6) {
      return Promise.reject(new Error('Password must be at least 6 characters long!'));
    }
    return Promise.resolve();
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  const handleForgotPassword = () => {
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
                <LoginOutlined className="text-2xl text-white" />
              </div>
              <Title level={2} className="!text-white !mb-2 !font-bold">
                Welcome Back
              </Title>
              <Text className="text-red-100 text-base">
                Sign in to continue your journey
              </Text>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <Form
              form={form}
              name="login"
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
              size="large"
              initialValues={{ remember: true }}
              className="space-y-1"
            >
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
                />
              </Form.Item>

              <Form.Item
                name="password"
                label={<span className="text-gray-800 font-semibold text-sm">Password</span>}
                rules={[{ validator: validatePassword }]}
                className="mb-6"
              >
                <Input.Password
                  prefix={<LockOutlined className="text-red-500 text-lg" />}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="h-12 rounded-xl border-2 border-gray-200 hover:border-red-300 focus:border-red-500 transition-all duration-200 bg-gray-50/50"
                />
              </Form.Item>

              <div className="flex justify-between items-center mb-6">
                <Form.Item name="remember" valuePropName="checked" className="!mb-0">
                  <Checkbox className="text-gray-700 font-medium">
                    <span className="text-sm">Remember me</span>
                  </Checkbox>
                </Form.Item>
                
                <Button
                  type="link"
                  onClick={handleForgotPassword}
                  className="!p-0 !text-red-600 hover:!text-red-700 !font-semibold !text-sm hover:!underline"
                >
                  Forgot Password?
                </Button>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-center animate-pulse">
                  <Text className="text-red-700 font-semibold">
                    {error}
                  </Text>
                </div>
              )}

              <Form.Item className="!mb-6">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  block
                  className="!h-14 !text-lg !font-semibold !rounded-xl !bg-gradient-to-r !from-red-600 !to-red-700 !border-0 hover:!from-red-700 hover:!to-red-800 !shadow-lg hover:!shadow-xl !transition-all !duration-200 transform hover:!scale-[1.02]"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </Form.Item>

              <div className="text-center pt-4 border-t border-gray-100">
                <Text className="text-gray-600">Don't have an account? </Text>
                <Button
                  type="link"
                  onClick={handleSignupRedirect}
                  className="!p-0 !font-semibold !text-red-600 hover:!text-red-700 !text-base hover:!underline"
                >
                  Sign Up
                </Button>
              </div>
            </Form>
          </div>

          {/* Success Message Display */}
          {successMessage && (
            <div className="mx-8 mb-8 p-4 bg-green-50 border-2 border-green-200 rounded-xl text-center animate-pulse">
              <Text className="text-green-700 font-semibold">
                {successMessage}
              </Text>
              <br />
              <Text className="text-gray-500 text-sm mt-1">
                Redirecting to dashboard...
              </Text>
            </div>
          )}
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

export default LoginPage;