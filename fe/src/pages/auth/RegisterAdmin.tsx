import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import LoadingScreen from '../../components/LoadingScreen';
import authAPI from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';

export default function RegisterAdmin() {
    const { addToast } = useToast()
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        role: 'ADMIN',
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setLoading(true);
        authAPI.post('/register', formData)
            .then(async (r) => {
                const res = await r.data;

                if (res.status === 'error') {
                    addToast({ type: 'error', title: 'Failed!', description: 'Something went wrong, try again later.' });
                    return;
                };
                
                addToast({ type: 'success', title: 'Registered!', description: 'Your account successfully registered.' });
                navigate('/login')
            })
            .catch((e) => {
                console.log(e)
                addToast({ type: 'error', title: 'Failed!', description: 'Something went wrong, try again later.' });
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
                                <Label htmlFor="name" className='mb-1 font-semibold text-slate-700'>Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                />
                            </div>
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
