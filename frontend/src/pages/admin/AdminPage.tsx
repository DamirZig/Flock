import React, { useState } from 'react';
import { AdminAuth } from './AdminAuth';
import { AdminLayout } from './AdminLayout';
import { AdminDashboard } from './AdminDashboard';
import { useNavigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();

    if (!isVerified) {
        return (
            <AdminAuth
                onVerified={() => setIsVerified(true)}
                onBack={() => navigate('/dashboard')}
            />
        );
    }

    return (
        <AdminLayout>
            <AdminDashboard />
        </AdminLayout>
    );
};

export default AdminPage;
