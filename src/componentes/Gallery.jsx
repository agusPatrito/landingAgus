import { useState, useEffect, useCallback, useRef } from 'react';
import { db, storage } from '../firebase/config';
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
} from 'firebase/firestore';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
} from 'firebase/storage';
import { X, ChevronLeft, ChevronRight, Upload, Trash2, Loader2, ImagePlus, Images } from 'lucide-react';
import { toast } from 'sonner';

const Gallery = ({ isOpen, onClose, user }) => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const fileInputRef = useRef(null);

    // Listen to gallery collection in real-time
    useEffect(() => {
        if (!isOpen) return;

        const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const photoList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPhotos(photoList);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [isOpen]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKey = (e) => {
            if (e.key === 'Escape') {
                if (lightboxIndex !== null) {
                    setLightboxIndex(null);
                } else {
                    onClose();
                }
            }
            if (lightboxIndex !== null) {
                if (e.key === 'ArrowLeft') navigateLightbox(-1);
                if (e.key === 'ArrowRight') navigateLightbox(1);
            }
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen, lightboxIndex, photos.length]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const navigateLightbox = useCallback((direction) => {
        setLightboxIndex((prev) => {
            const next = prev + direction;
            if (next < 0) return photos.length - 1;
            if (next >= photos.length) return 0;
            return next;
        });
    }, [photos.length]);

    const handleUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);
        let uploaded = 0;

        try {
            for (const file of files) {
                // Validate file type
                if (!file.type.startsWith('image/')) {
                    toast.error(`"${file.name}" no es una imagen válida`);
                    continue;
                }

                // Max 10MB
                if (file.size > 10 * 1024 * 1024) {
                    toast.error(`"${file.name}" supera los 10MB`);
                    continue;
                }

                const fileName = `${Date.now()}_${file.name}`;
                const storageRef = ref(storage, `gallery/${fileName}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                await new Promise((resolve, reject) => {
                    uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            setUploadProgress(Math.round(progress));
                        },
                        (error) => {
                            console.error('Upload error:', error);
                            toast.error(`Error subiendo "${file.name}"`);
                            reject(error);
                        },
                        async () => {
                            const url = await getDownloadURL(uploadTask.snapshot.ref);
                            await addDoc(collection(db, 'gallery'), {
                                url,
                                fileName,
                                storagePath: `gallery/${fileName}`,
                                createdAt: serverTimestamp(),
                            });
                            uploaded++;
                            resolve();
                        }
                    );
                });
            }

            if (uploaded > 0) {
                toast.success(`${uploaded} foto${uploaded > 1 ? 's' : ''} subida${uploaded > 1 ? 's' : ''} con éxito`);
            }
        } catch (err) {
            console.error('Upload error:', err);
        } finally {
            setUploading(false);
            setUploadProgress(0);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleDelete = async (photo) => {
        if (!confirm('¿Seguro que querés eliminar esta foto?')) return;

        try {
            // Delete from Storage
            const storageRef = ref(storage, photo.storagePath);
            await deleteObject(storageRef);

            // Delete from Firestore
            await deleteDoc(doc(db, 'gallery', photo.id));
            toast.success('Foto eliminada');

            // If lightbox was showing this photo, close it
            if (lightboxIndex !== null) {
                if (photos.length <= 1) {
                    setLightboxIndex(null);
                } else if (lightboxIndex >= photos.length - 1) {
                    setLightboxIndex(photos.length - 2);
                }
            }
        } catch (err) {
            console.error('Delete error:', err);
            toast.error('Error al eliminar la foto');
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* MODAL OVERLAY */}
            <div
                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col"
                onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            >
                {/* HEADER */}
                <div className="flex items-center justify-between p-4 md:p-6 shrink-0">
                    <div className="flex items-center gap-3">
                        <Images className="text-purple-400" size={24} />
                        <h2 className="text-xl md:text-2xl font-bold text-white">Lifestyle Portfolio</h2>
                        <span className="text-slate-500 text-sm">({photos.length} fotos)</span>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* UPLOAD BUTTON (admin only) */}
                        {user && (
                            <label className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm cursor-pointer transition-all ${uploading ? 'bg-slate-700 text-slate-400 cursor-wait' : 'bg-purple-600 hover:bg-purple-500 text-white'}`}>
                                {uploading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={16} />
                                        {uploadProgress}%
                                    </>
                                ) : (
                                    <>
                                        <ImagePlus size={16} />
                                        Subir fotos
                                    </>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={handleUpload}
                                    disabled={uploading}
                                />
                            </label>
                        )}

                        {/* CLOSE */}
                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* PHOTO GRID */}
                <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-6">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <Loader2 className="animate-spin text-purple-400" size={40} />
                        </div>
                    ) : photos.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                            <Images size={48} className="mb-4 opacity-50" />
                            <p className="text-lg font-medium">No hay fotos todavía</p>
                            {user && <p className="text-sm mt-1">Usá el botón "Subir fotos" para agregar.</p>}
                        </div>
                    ) : (
                        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
                            {photos.map((photo, index) => (
                                <div
                                    key={photo.id}
                                    className="relative group break-inside-avoid rounded-2xl overflow-hidden cursor-pointer"
                                    onClick={() => setLightboxIndex(index)}
                                >
                                    <img
                                        src={photo.url}
                                        alt=""
                                        loading="lazy"
                                        className="w-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-2xl" />

                                    {/* Delete button (admin only) */}
                                    {user && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(photo);
                                            }}
                                            className="absolute top-2 right-2 p-2 bg-red-600/80 hover:bg-red-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* LIGHTBOX */}
            {lightboxIndex !== null && photos[lightboxIndex] && (
                <div
                    className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center"
                    onClick={() => setLightboxIndex(null)}
                >
                    {/* Close */}
                    <button
                        onClick={() => setLightboxIndex(null)}
                        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors z-10"
                    >
                        <X size={28} />
                    </button>

                    {/* Counter */}
                    <div className="absolute top-4 left-4 text-slate-400 text-sm font-medium">
                        {lightboxIndex + 1} / {photos.length}
                    </div>

                    {/* Prev */}
                    {photos.length > 1 && (
                        <button
                            onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
                            className="absolute left-2 md:left-6 p-3 rounded-full bg-slate-800/60 hover:bg-slate-700 text-white transition-all backdrop-blur-sm z-10"
                        >
                            <ChevronLeft size={24} />
                        </button>
                    )}

                    {/* Image */}
                    <img
                        src={photos[lightboxIndex].url}
                        alt=""
                        className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />

                    {/* Next */}
                    {photos.length > 1 && (
                        <button
                            onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
                            className="absolute right-2 md:right-6 p-3 rounded-full bg-slate-800/60 hover:bg-slate-700 text-white transition-all backdrop-blur-sm z-10"
                        >
                            <ChevronRight size={24} />
                        </button>
                    )}

                    {/* Admin delete in lightbox */}
                    {user && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(photos[lightboxIndex]);
                            }}
                            className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 bg-red-600/80 hover:bg-red-500 text-white rounded-xl transition-all backdrop-blur-sm"
                        >
                            <Trash2 size={16} />
                            Eliminar
                        </button>
                    )}
                </div>
            )}
        </>
    );
};

export default Gallery;
