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
        <div className={`relative group/edit ${className} max-w-full`}>
            {isEditing ? (
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 w-full">
                    <textarea
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="bg-slate-800 border border-cyan-500 rounded p-2 w-full text-white outline-none min-h-[80px] sm:min-h-0 text-base shadow-lg"
                        autoFocus
                    />
                    <div className="flex gap-2">
                        <button onClick={handleSave} disabled={loading} className="p-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors">
                            <Check size={20} />
                        </button>
                        <button onClick={() => setIsEditing(false)} className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors">
                            <X size={20} />
                        </button>
                    </div>
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