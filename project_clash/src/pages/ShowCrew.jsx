import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { supabase } from '../utils/supabaseClient';
import './ShowCrew.css';

const ShowCrew = () => {
    const [crew, setCrew] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCrew = async () => {
            const { data, error } = await supabase
                .from('Crew')
                .select('id, name, role, power');

            if (error) {
                console.error('Error fetching crew:', error);
            } else {
                setCrew(data);
            }
        };

        fetchCrew();
    }, []);

    const handleDelete = async (e, id) => {
        e.stopPropagation(); // prevent card click
        const confirmed = window.confirm('Are you sure you want to delete this crew member?');
        if (!confirmed) return;

        const { error } = await supabase
            .from('Crew')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Delete failed:', error);
        } else {
            setCrew(prev => prev.filter(member => member.id !== id));
        }
    };

    const handleCardClick = (id) => {
        navigate(`/crew/${id}`);
    };

    return (
        <>
            <Sidebar />
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', margin: '20px' }}>
                {crew.map(member => (
                    <div
                        key={member.id}
                        onClick={() => handleCardClick(member.id)}
                        style={{
                            border: '1px solid #ccc',
                            padding: '20px',
                            borderRadius: '8px',
                            width: '200px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            backgroundColor: 'black',
                            color: 'white',
                            position: 'relative'
                        }}
                    >
                        <h3>{member.name}</h3>
                        <p><strong>Role:</strong> {member.role}</p>
                        <p><strong>Power:</strong> {member.power}</p>
                        <button
                            onClick={(e) => handleDelete(e, member.id)}
                            style={{
                                marginTop: '10px',
                                backgroundColor: 'transparent',
                                border: '1px solid red',
                                color: 'red',
                                padding: '5px 10px',
                                cursor: 'pointer'
                            }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ShowCrew;