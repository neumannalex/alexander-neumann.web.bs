import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AzureAD } from 'react-aad-msal';
import { authProvider } from '../authProvider';

const ProfilePage = () => {
    return (
        <h1>Profile</h1>
    );
}

export default ProfilePage;