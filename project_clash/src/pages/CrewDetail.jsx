import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';

const CrewDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [crewMember, setCrewMember] = useState(null);
    const [formData, setFormData] = useState({ name: '', role: '', power: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMember = async () => {
            const { data, error } = await supabase
                .from('Crew')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching crew member:', error);
            } else {
                setCrewMember(data);
                setFormData({
                    name: data.name || '',
                    role: data.role || '',
                    power: data.power || ''
                });
            }

            setLoading(false);
        };

        fetchMember();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        const { error } = await supabase
            .from('Crew')
            .update(formData)
            .eq('id', id);

        if (error) {
            console.error('Error updating crew member:', error);
        } else {
            alert('Crew member updated!');
            navigate('/');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Edit Crew Member</h2>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ width: '100%', marginBottom: '10px' }}
                />
            </label>
            <label>
                Role:
                <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    style={{ width: '100%', marginBottom: '10px' }}
                />
            </label>
            <label>
                Power:
                <input
                    type="text"
                    name="power"
                    value={formData.power}
                    onChange={handleChange}
                    style={{ width: '100%', marginBottom: '10px' }}
                />
            </label>
            <button onClick={handleSave} style={{ marginRight: '10px' }}>
                Save
            </button>
            <button onClick={() => navigate('/')}>Cancel</button>
        </div>
    );
};

export default CrewDetail;