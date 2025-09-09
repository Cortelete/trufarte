import React, { useState } from 'react';
import { generateCustomOrderWhatsAppLink } from '../utils/whatsapp';
import { Send } from '../components/icons/SocialIcons';
import BackButton from '../components/BackButton';

const FormInput: React.FC<{
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}> = ({ id, label, type = 'text', value, onChange, required = false }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-text-light dark:text-gray-300 mb-1">
            {label}
        </label>
        <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full px-4 py-2 bg-white/50 dark:bg-gray-700/50 border border-primary-light dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary transition-colors"
        />
    </div>
);

const FormTextarea: React.FC<{
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
}> = ({ id, label, value, onChange, required = false }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-text-light dark:text-gray-300 mb-1">
            {label}
        </label>
        <textarea
            id={id}
            value={value}
            onChange={onChange}
            required={required}
            rows={5}
            className="w-full px-4 py-2 bg-white/50 dark:bg-gray-700/50 border border-primary-light dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary transition-colors"
        />
    </div>
);


export default function EncomendasPage(): React.ReactNode {
    const [formData, setFormData] = useState({
        name: '',
        whatsapp: '',
        eventDate: '',
        eventType: '',
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let formattedDate = '';
        if (formData.eventDate) {
            const [year, month, day] = formData.eventDate.split('-');
            if (day && month && year) {
                formattedDate = `${day}/${month}/${year}`;
            }
        }
        
        const submissionData = {
            ...formData,
            eventDate: formattedDate,
        };

        const link = generateCustomOrderWhatsAppLink(submissionData);
        window.open(link, '_blank');
        // Optionally reset form
        // setFormData({ name: '', whatsapp: '', eventDate: '', eventType: '', description: '' });
    };

    return (
        <div className="max-w-2xl mx-auto">
            <BackButton />
            <h1 className="text-4xl sm:text-5xl font-display text-center mb-4 text-primary dark:text-accent">
                Encomendas Especiais
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-8 sm:mb-10">
                Para eventos, sabores personalizados ou grandes quantidades, preencha o formulário abaixo e montaremos um pedido perfeito para você!
            </p>

            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <FormInput id="name" label="Nome Completo" value={formData.name} onChange={handleChange} required />
                    <FormInput id="whatsapp" label="Seu WhatsApp (com DDD)" type="tel" value={formData.whatsapp} onChange={handleChange} required />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="eventDate" className="block text-sm font-medium text-text-light dark:text-gray-300 mb-1">
                                Data do Evento/Entrega (Opcional)
                            </label>
                            <input
                                type="date"
                                id="eventDate"
                                value={formData.eventDate}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-white/50 dark:bg-gray-700/50 border border-primary-light dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary transition-colors"
                            />
                        </div>
                        <FormInput id="eventType" label="Tipo de Evento (Opcional)" value={formData.eventType} onChange={handleChange} />
                    </div>

                    <FormTextarea id="description" label="Descreva sua encomenda" value={formData.description} onChange={handleChange} required />
                    
                    <button
                      type="submit"
                      className="w-full group relative flex items-center justify-center space-x-2 py-3 px-4 border border-transparent rounded-full shadow-sm text-base sm:text-lg font-medium text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transform hover:scale-105 transition-transform duration-300 overflow-hidden"
                    >
                      <span className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full transition-transform duration-700 ease-in-out group-hover:translate-x-full"></span>
                      <Send className="w-5 h-5" />
                      <span>Enviar Pedido por WhatsApp ✨</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
