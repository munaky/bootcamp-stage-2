import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import userAPI from "../../api/user";
import { useToast } from "../../hooks/useToast";
import authAPI from "../../api/auth";



export default function EditProfileDialog() {
  const { addToast } = useToast();
  const { user, login } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
    password: '',
    address: user?.customer?.address,
    phone: user?.customer?.phone,
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    userAPI.patch('/account/update', {
      ...(formData?.name ? { name: formData.name } : {}),
      ...(formData?.email ? { email: formData.email } : {}),
      ...(formData?.password ? { password: formData.password } : {}),
      ...(formData?.address ? { address: formData.address } : {}),
      ...(formData?.phone ? { phone: formData.phone } : {}),
    })
      .then(async (r) => {
        const res = await r.data;
        const data = res.data;

        console.log(res)

        if (res.status === 'success') {

          login(data.user, data.token);

          addToast({ type: 'success', title: 'Updated!', description: 'Profile updated.', duration: 1000 });
        }
      })
      .catch(e => console.log(e))

  };

  return (
    <Dialog>
      <DialogTrigger>
        Edit Profile
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={e => handleSubmit(e)} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={e => handleChange(e)} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={e => handleChange(e)} />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" value={formData.password} onChange={e => handleChange(e)} />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" value={formData.address} onChange={e => handleChange(e)} />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" value={formData.phone} onChange={e => handleChange(e)} />
          </div>
          <DialogFooter>
            <DialogTrigger asChild>
              <Button type="submit">
                Save Changes
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}