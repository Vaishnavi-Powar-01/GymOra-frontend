'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function AddressPage() {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({ street: '', city: '', state: '', zip: '' });
  const [editId, setEditId] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log('🔍 Token from localStorage:', storedToken ? 'Token exists' : 'No token found');
    if (storedToken) {
      setToken(storedToken);
      console.log('✅ Token set in state');
    } else {
      console.error('❌ No token found in localStorage');
      toast.error('Please login again');
    }
  }, []);

  useEffect(() => {
    if (token) {
      console.log('🚀 Token available, testing auth first...');
      testAuth();
    }
  }, [token]);

  const testAuth = async () => {
    try {
      console.log('🧪 Testing authentication...');
      const res = await axios.get(`${baseURL}/address/test-auth`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      console.log('✅ Auth test successful:', res.data);
      fetchAddresses();
    } catch (error) {
      console.error('❌ Auth test failed:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
  };

  const fetchAddresses = async () => {
    if (!token) {
      console.error('❌ No token available for fetchAddresses');
      return;
    }

    try {
      setLoading(true);
      console.log('📡 Making request to:', `${baseURL}/address/`);
      
      const res = await axios.get(`${baseURL}/address/`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      
      console.log('✅ Addresses fetched successfully:', res.data);
      setAddresses(res.data);
    } catch (error) {
      console.error('❌ Failed to fetch addresses:', error);
      console.error('❌ Error response:', error.response?.data);
      
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        toast.error('Failed to load addresses');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.street || !form.city || !form.state || !form.zip) {
      toast.error('All address fields are required');
      return;
    }

    if (!token) {
      console.error('❌ No token available for handleSubmit');
      toast.error('Please login again');
      return;
    }

    try {
      setLoading(true);
      const method = editId ? 'put' : 'post';
      const endpoint = editId 
        ? `address/${editId}`
        : 'address/';

      console.log('📡 Making request:', method.toUpperCase(), `${baseURL}/${endpoint}`);
      console.log('📝 Request data:', {
        street: form.street,
        city: form.city,
        state: form.state,
        zip: form.zip
      });

      const { data } = await axios[method](
        `${baseURL}/${endpoint}`,
        {
          street: form.street,
          city: form.city,
          state: form.state,
          zip: form.zip
        },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('✅ Request successful:', data);

      if (data.success !== false) {
        toast.success(data.message || (editId ? 'Address updated!' : 'Address added!'));
        setOpen(false);
        setForm({ street: '', city: '', state: '', zip: '' });
        setEditId(null);
        fetchAddresses();
      } else {
        throw new Error(data.message || 'Operation failed');
      }
    } catch (error) {
      console.error('❌ Save error:', error);
      console.error('❌ Error response:', error.response?.data);
      
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        toast.error(error.response?.data?.message || error.message || 'Failed to save address');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!token) {
      console.error('❌ No token available for handleDelete');
      toast.error('Please login again');
      return;
    }

    try {
      setLoading(true);
      console.log('🗑️ Deleting address:', id);
      
      await axios.delete(`${baseURL}/address/${id}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      
      console.log('✅ Address deleted successfully');
      toast.success('Address deleted!');
      fetchAddresses();
    } catch (error) {
      console.error('❌ Failed to delete address:', error);
      
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        toast.error('Failed to delete address');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (address) => {
    setForm({
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
    });
    setEditId(address._id);
    setOpen(true);
  };

  if (!token) {
    return (
      <div className="p-6 bg-white text-gray-900 min-h-screen">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white text-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-blue-600">Manage Addresses</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-5"
              onClick={() => {
                setForm({ street: '', city: '', state: '', zip: '' });
                setEditId(null);
              }}
              disabled={loading}
            >
              Add Address
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md rounded-lg shadow-xl bg-white text-gray-900 border border-gray-200">
            <DialogHeader>
              <DialogTitle className="text-blue-600 text-lg font-semibold">
                {editId ? 'Edit Address' : 'Add Address'}
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 mt-4">
              {['street', 'city', 'state', 'zip'].map((field) => (
                <input
                  key={field}
                  placeholder={field[0].toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="bg-gray-50 text-gray-900 border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  disabled={loading}
                />
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? 'Processing...' : editId ? 'Update' : 'Add'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading && !addresses.length ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600">Loading addresses...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addresses.length === 0 ? (
            <p className="text-gray-600 col-span-full">No addresses yet. Add your first one!</p>
          ) : (
            addresses.map((addr) => (
              <div
                key={addr._id}
                className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <p className="text-gray-700">
                    <span className="font-semibold text-blue-600">Address:</span><br />
                    {addr.street}, {addr.city}, {addr.state} - {addr.zip}
                  </p>
                </div>

                <div className="flex gap-3 mt-4">
                  <Button
                    variant="outline"
                    className="flex items-center gap-1 border-blue-500 text-blue-600 hover:bg-blue-50"
                    onClick={() => handleEdit(addr)}
                    disabled={loading}
                  >
                    <Pencil size={16} /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => handleDelete(addr._id)}
                    disabled={loading}
                  >
                    <Trash2 size={16} /> Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}