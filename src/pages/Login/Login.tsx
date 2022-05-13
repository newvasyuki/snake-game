import React, {
  useState, useEffect, ChangeEvent, FormEvent,
} from 'react';
import './Login.pcss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import ProfileImage from '../../../assets/noProfileImage.react.svg';
import { Button } from '../../components/Button';
import Profile from "../Profile/Profile";

const Login = () => {
  //TODO
};

export default Login;
