import { useState } from 'react';
import { db } from '../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { Pencil, Check, X } from 'lucide-react';
import { toast } from 'sonner';

const EditableText = ({ user, docId, field, initialValue, className }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            const docRef = doc(db, "content", docId);
            await updateDoc(docRef, { [field]: value });
            setIsEditing(false);
            toast.success("Cambio guardado");
        } catch (error) {
            toast.error("Error al guardar");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <span className={className}>{initialValue}</span>;

    return (
        <div className={`relative group/edit ${className}`}>
            {isEditing ? (
                <div className="flex items-center gap-2 w-full">
                    <textarea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="bg-slate-800 border border-cyan-500 rounded p-2 w-full text-white outline-none"
                        rows={2}
                    />
                    <button onClick={handleSave} disabled={loading} className="text-green-400 hover:text-green-300">
                        <Check size={20} />
                    </button>
                    <button onClick={() => setIsEditing(false)} className="text-red-400 hover:text-red-300">
                        <X size={20} />
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <span>{value}</span>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="opacity-0 group-hover/edit:opacity-100 transition-opacity text-cyan-400"
                    >
                        <Pencil size={16} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditableText;