import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import LoadingScreen from '../../components/LoadingScreen';
import authAPI from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth()
    const { addToast } = useToast()
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setLoading(true);
        authAPI.post('/login', formData)
            .then(async (r) => {
                const res = await r.data;
                const data = res.data;

                if (res.status === 'error') {
                    addToast({ type: 'error', title: 'Failed!', description: 'Failed to login.' });
                    navigate('/login')
                };

                login(data.user, data.token);
                addToast({ type: 'success', title: 'Success!', description: `Welcome ${data.user.name}.` })
                navigate('/')
            })
            .catch((e) => {
                console.log(e)
                addToast({ type: 'error', title: 'Failed!', description: 'Failed to login.' });
            })
            .finally(() => setLoading(false));
    };

    return (
        <>
            {loading && <LoadingScreen />}
            <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
                <Card className="w-full max-w-md shadow-2xl rounded-2xl">
                    <CardContent className="p-6 space-y-4">
                        <h2 className="text-2xl font-semibold text-center">Create Account</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="email" className='mb-1 font-semibold text-slate-700'>Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@mail.com"
                                />
                            </div>
                            <div>
                                <Label htmlFor="password" className='mb-1 font-semibold text-slate-700'>Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="********"
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Register
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};
