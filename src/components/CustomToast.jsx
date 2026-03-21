import React from 'react';

const CustomToast = ({ message, type = 'success', label = 'SISTEMA' }) => {
    return (
         <div className="bg-white border border-slate-100 shadow-xl rounded-full p-2 pr-6 flex items-center gap-3 w-[fit-content] max-w-[calc(100vw-40px)] mx-auto relative overflow-hidden mt-4">
            <div className={`w-7 h-7 flex-shrink-0 rounded-full flex items-center justify-center ${type === 'success' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'
                }`}>
                <span className="material-symbols-outlined text-lg">
                    {type === 'success' ? 'check_circle' : 'delete'}
                </span>
            </div>

            <p className="text-[11px] font-bold uppercase tracking-tight text-slate-700 whitespace-nowrap">
                {message}
            </p>

            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-slate-50">
                <div className={`h-full ${type === 'success' ? 'bg-emerald-500' : 'bg-red-500'} animate-progress-bar`} />
            </div>
        </div>
    );
};

export default CustomToast;