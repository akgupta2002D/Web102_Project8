import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { supabase } from '../utils/supabaseClient'; // Adjust the pat
import axios from 'axios';
import './CreateCrew.css';
const CreateCrew = () => {
    const clashRoyaleCharacters = [
        'Knight',
        'Archers',
        'Baby Dragon',
        'Skeleton Army',
        'Mini P.E.K.K.A',
        'Wizard',
        'Hog Rider'
    ];

    const [formData, setFormData] = useState({
        name: '',
        power: '',
        role: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data, error } = await supabase.from('Crew').insert([formData]);

            if (error) throw error;

            alert('Crew added successfully!');
            setCrewList((prev) => [...prev, ...data]);
            setFormData({ name: '', power: '', role: '' }); // reset form
        } catch (error) {
            console.error('Error adding crew:', error.message);
            // alert('Failed to add crew. Please try again.');
        }
    };

    return (
        <>
            <Sidebar />
            <div>
                <h1>This is the CreateCrew page</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="power">Power:</label>
                        <input
                            type="text"
                            id="power"
                            name="power"
                            value={formData.power}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Characters (Role):</label>
                        {clashRoyaleCharacters.map((character, index) => (
                            <div key={index}>
                                <input
                                    type="radio"
                                    id={character}
                                    name="role"
                                    value={character}
                                    checked={formData.role === character}
                                    onChange={handleChange}
                                />
                                <label htmlFor={character}>{character}</label>
                            </div>
                        ))}
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
};

export default CreateCrew;